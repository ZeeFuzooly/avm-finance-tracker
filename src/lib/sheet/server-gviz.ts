import { RawRow, MonthKey } from '@/types/sheet';
import { getMockSheetData } from './mock-data';

const SHEET_ID = '1WhSc3ogSSTlSfvp7HlJLPZ4fiKFEyhUDSRhAwz8Cm8w';
const SHEET_NAME = 'MONTHLY COLLECTION AVM';
const GVIZ_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`;

interface GvizResponse {
  table: {
    cols: Array<{ label: string; type: string }>;
    rows: Array<{
      c: Array<{ v: any; f?: string } | null>;
    }>;
  };
}

export async function fetchSheetDataServer(): Promise<RawRow[]> {
  try {
    console.log('Fetching from Google Sheets URL:', GVIZ_URL);
    
    const response = await fetch(GVIZ_URL, { 
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      console.error('Google Sheets response not ok:', response.status, response.statusText);
      throw new Error(`Failed to fetch sheet data: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    console.log('Response text length:', text.length);
    console.log('Response text preview:', text.substring(0, 200));
    
    // Remove the gviz wrapper: /**/ google.visualization.Query.setResponse(...)
    const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\((.*)\)/);
    if (!jsonMatch) {
      console.error('No gviz response pattern found in text');
      throw new Error('Invalid gviz response format');
    }

    const data: GvizResponse = JSON.parse(jsonMatch[1]);
    
    if (!data.table || !data.table.cols || !data.table.rows) {
      console.error('Invalid table structure:', data);
      throw new Error('Invalid table structure in gviz response');
    }

    return parseTableData(data.table);
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    console.log('Falling back to mock data...');
    return getMockSheetData();
  }
}

function parseTableData(table: GvizResponse['table']): RawRow[] {
  const { cols, rows } = table;
  
  // Find header row by looking for "Family Members" and "Jan"
  const headerRowIndex = findHeaderRow(rows, cols);
  if (headerRowIndex === -1) {
    throw new Error('Could not find header row containing "Family Members" and "Jan"');
  }

  // Extract column indices
  const columnIndices = extractColumnIndices(cols, rows[headerRowIndex]);
  
  // Parse data rows (skip header row)
  const dataRows = rows.slice(headerRowIndex + 1);
  
  return dataRows
    .map((row, index) => parseRow(row, columnIndices, index + headerRowIndex + 1))
    .filter((row): row is RawRow => row.familyMembers.trim() !== ''); // Filter out empty rows
}

function findHeaderRow(rows: GvizResponse['table']['rows'], cols: GvizResponse['table']['cols']): number {
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const hasFamilyMembers = row.c.some((cell, index) => 
      cell?.v && typeof cell.v === 'string' && 
      cell.v.toLowerCase().includes('family members')
    );
    const hasJan = row.c.some((cell, index) => 
      cell?.v && typeof cell.v === 'string' && 
      cell.v.toLowerCase().includes('jan')
    );
    
    if (hasFamilyMembers && hasJan) {
      return i;
    }
  }
  return -1;
}

interface ColumnIndices {
  no: number;
  familyMembers: number;
  monthlyAmount: number;
  months: Record<MonthKey, number>;
  totalYear?: number;
}

function extractColumnIndices(cols: GvizResponse['table']['cols'], headerRow: GvizResponse['table']['rows'][0]): ColumnIndices {
  const indices: Partial<ColumnIndices> = {
    months: {} as Record<MonthKey, number>,
  };

  const monthKeys: MonthKey[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  headerRow.c.forEach((cell, index) => {
    if (!cell?.v) return;
    
    const value = String(cell.v).toLowerCase().trim();
    
    if (value.includes('no') || value === '#') {
      indices.no = index;
    } else if (value.includes('family members')) {
      indices.familyMembers = index;
    } else if (value.includes('monthly amount')) {
      indices.monthlyAmount = index;
    } else if (value.includes('total') && value.includes('year')) {
      indices.totalYear = index;
    } else {
      // Check if it's a month
      const monthKey = monthKeys.find(month => 
        value.includes(month.toLowerCase())
      );
      if (monthKey) {
        indices.months![monthKey] = index;
      }
    }
  });

  // Validate required columns
  if (indices.familyMembers === undefined) {
    throw new Error('Could not find "Family Members" column');
  }

  return indices as ColumnIndices;
}

function parseRow(row: GvizResponse['table']['rows'][0], indices: ColumnIndices, rowNumber: number): RawRow {
  const getCellValue = (index: number): any => {
    const cell = row.c[index];
    return cell?.v ?? null;
  };

  const parseNumber = (value: any): number | null => {
    if (value === null || value === undefined || value === '') return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  };

  const months: Partial<Record<MonthKey, number | null>> = {};
  Object.entries(indices.months).forEach(([month, index]) => {
    months[month as MonthKey] = parseNumber(getCellValue(index));
  });

  return {
    no: parseNumber(getCellValue(indices.no)) ?? rowNumber,
    familyMembers: String(getCellValue(indices.familyMembers) ?? '').trim(),
    monthlyAmount: parseNumber(getCellValue(indices.monthlyAmount)),
    months,
    totalYear: indices.totalYear !== undefined ? parseNumber(getCellValue(indices.totalYear)) : undefined,
  };
}
