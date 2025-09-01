import { RawRow, MonthKey } from '@/types/sheet';
import { getMockSheetData } from './mock-data';

const SHEET_ID = '1WhSc3ogSSTlSfvp7HlJLPZ4fiKFEyhUDSRhAwz8Cm8w';
const SHEET_NAME = 'MONTHLY COLLECTION AVM';



interface GvizResponse {
  table: {
    cols: Array<{ label: string; type: string }>;
    rows: Array<{
      c: Array<{ v: any; f?: string } | null>;
    }>;
  };
}

export async function fetchSheetDataAlternative(): Promise<RawRow[]> {
  
  // URL formats to try - prioritize CSV since it's working
  const urlFormats = [
    // Try CSV first since it's working
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}`,
    // Fallback to JSON if needed
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`,
  ];

  for (const url of urlFormats) {
    try {
      console.log('Trying URL format:', url);
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error('Response not ok:', response.status, response.statusText);
        continue;
      }

      const responseText = await response.text();
      console.log('Response text length:', responseText.length);
      console.log('Response text preview:', responseText.substring(0, 100));

      // Check if it's CSV format (starts with quoted text)
      if (responseText.startsWith('"') || responseText.includes('"AVM FAMILY FUND COLLECTION')) {
        console.log('Detected CSV format, parsing as CSV');
        const csvData = parseCSV(responseText);
        if (csvData.length > 0) {
          console.log(`Successfully parsed ${csvData.length} rows from CSV`);
          return csvData;
        }
      } else {
        // Try JSON parsing
        console.log('Attempting JSON parsing');
        const jsonMatch = responseText.match(/google\.visualization\.Query\.setResponse\((.*)\)/);
        if (jsonMatch && jsonMatch[1]) {
          const jsonData = JSON.parse(jsonMatch[1]);
          const tableData = parseTableData(jsonData.table);
          if (tableData.length > 0) {
            console.log(`Successfully parsed ${tableData.length} rows from JSON`);
            return tableData;
          }
        }
      }
      
    } catch (error) {
      console.error('Error with URL:', url, error);
      continue;
    }
  }
  
  console.log('All URL formats failed, using mock data');
  return getMockSheetData();
}

function parseTableData(table: GvizResponse['table']): RawRow[] {
  const { cols, rows } = table;
  
  console.log('Parsing table data:', {
    totalRows: rows.length,
    totalCols: cols.length,
    firstFewRows: rows.slice(0, 3).map(row => row.c.map(c => c?.v))
  });
  
  // Find header row by looking for "Family Members" and "Jan"
  const headerRowIndex = findHeaderRow(rows);
  if (headerRowIndex === -1) {
    console.error('Could not find header row. Available rows:', rows.slice(0, 5).map((row, i) => ({
      index: i,
      values: row.c.map(c => c?.v)
    })));
    throw new Error('Could not find header row containing "Family Members" and "Jan"');
  }

  // Extract column indices
  const headerRow = rows[headerRowIndex];
  if (!headerRow) {
    throw new Error('Header row not found');
  }
  const columnIndices = extractColumnIndices(headerRow);
  
  // Parse data rows (skip header row)
  const dataRows = rows.slice(headerRowIndex + 1);
  
  console.log(`Parsing ${dataRows.length} data rows starting from index ${headerRowIndex + 1}`);
  
  const parsedRows = dataRows
    .map((row, index) => parseRow(row, columnIndices, index + headerRowIndex + 1))
    .filter((row) => row.familyMembers.trim() !== ''); // Filter out empty rows
    
  console.log(`Successfully parsed ${parsedRows.length} rows with family data`);
  
  return parsedRows;
}

function findHeaderRow(rows: GvizResponse['table']['rows']): number {
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row || !row.c || row.c.length === 0) continue;
    
    // Get all cell values as strings
    const cellValues = row.c.map(cell => String(cell?.v || '').toLowerCase().trim());
    
    // Check for the specific header pattern from the sheet
    const hasFamilyMembers = cellValues.some(value => 
      value.includes('family members') || value.includes('family')
    );
    const hasJan = cellValues.some(value => 
      value.includes('jan') || value === 'jan'
    );
    const hasNo = cellValues.some(value => 
      value.includes('no') || value === 'no' || value === '#'
    );
    const hasMonthlyAmount = cellValues.some(value => 
      value.includes('monthly amount') || value.includes('monthly')
    );
    
    // More flexible matching - need at least 3 of the key headers
    const matches = [hasFamilyMembers, hasJan, hasNo, hasMonthlyAmount].filter(Boolean).length;
    
    if (matches >= 3) {
      console.log(`Found header row at index ${i}:`, cellValues);
      return i;
    }
  }
  
  // If not found, try a more aggressive search
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row || !row.c || row.c.length === 0) continue;
    
    const cellValues = row.c.map(cell => String(cell?.v || '').toLowerCase().trim());
    
    // Look for any row that has both "family" and a month name
    const hasFamily = cellValues.some(value => value.includes('family'));
    const hasMonth = cellValues.some(value => 
      ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].some(month => 
        value.includes(month)
      )
    );
    
    if (hasFamily && hasMonth) {
      console.log(`Found potential header row at index ${i} (fallback):`, cellValues);
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

function extractColumnIndices(headerRow: GvizResponse['table']['rows'][0]): ColumnIndices {
  const indices: Partial<ColumnIndices> = {
    months: {} as Record<MonthKey, number>,
  };

  const monthKeys: MonthKey[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  headerRow.c.forEach((cell, index) => {
    if (!cell?.v) return;
    
    const value = String(cell.v).toLowerCase().trim();
    
    if (value.includes('no') || value === '#') {
      indices.no = index;
    } else if (value.includes('family members') || value.includes('family')) {
      indices.familyMembers = index;
    } else if (value.includes('monthly amount') || value.includes('monthly')) {
      indices.monthlyAmount = index;
    } else if (value.includes('total') && value.includes('year')) {
      indices.totalYear = index;
    } else {
      // Check if it's a month
      const monthKey = monthKeys.find(month => 
        value.includes(month.toLowerCase()) || value === month.toLowerCase()
      );
      if (monthKey) {
        indices.months![monthKey] = index;
      }
    }
  });

  // Validate required columns
  if (indices.familyMembers === undefined) {
    console.error('Could not find "Family Members" column in headers:', headerRow.c.map(c => c?.v));
    throw new Error('Could not find "Family Members" column');
  }

  // Log found indices for debugging
  console.log('Found column indices:', {
    no: indices.no,
    familyMembers: indices.familyMembers,
    monthlyAmount: indices.monthlyAmount,
    months: indices.months,
    totalYear: indices.totalYear
  });

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
    totalYear: indices.totalYear !== undefined ? parseNumber(getCellValue(indices.totalYear)) : null,
  };
}

function parseCSV(csvText: string): RawRow[] {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length < 2) return [];

  // Find header row with more flexible matching
  let headerRowIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    const lineLower = line.toLowerCase();
    const hasFamily = lineLower.includes('family members') || lineLower.includes('family');
    const hasJan = lineLower.includes('jan');
    const hasNo = lineLower.includes('no') || lineLower.includes('#');
    const hasMonthlyAmount = lineLower.includes('monthly amount') || lineLower.includes('monthly');
    
    // Need at least 3 of the key headers
    const matches = [hasFamily, hasJan, hasNo, hasMonthlyAmount].filter(Boolean).length;
    
    if (matches >= 3) {
      console.log(`Found CSV header row at index ${i}`);
      headerRowIndex = i;
      break;
    }
  }

  // Fallback: look for any row with both "family" and a month
  if (headerRowIndex === -1) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line) continue;
      const lineLower = line.toLowerCase();
      const hasFamily = lineLower.includes('family');
      const hasMonth = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].some(month => 
        lineLower.includes(month)
      );
      
      if (hasFamily && hasMonth) {
        console.log(`Found CSV header row at index ${i} (fallback)`);
        headerRowIndex = i;
        break;
      }
    }
  }

  if (headerRowIndex === -1) {
    console.error('Could not find header row in CSV data');
    return [];
  }

  const headerLine = lines[headerRowIndex];
  if (!headerLine) {
    console.error('Header line not found');
    return [];
  }
  const headers = headerLine.split(',').map(h => h.trim().toLowerCase().replace(/^"|"$/g, ''));
  
  const monthKeys: MonthKey[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Find column indices
  const indices: Partial<ColumnIndices> = {
    months: {} as Record<MonthKey, number>,
  };

  headers.forEach((header, index) => {
    // Check for exact month matches first (before other checks)
    const monthKey = monthKeys.find(month => {
      const monthLower = month.toLowerCase();
      const headerLower = header.toLowerCase();
      return headerLower === monthLower;
    });
    
    if (monthKey) {
      indices.months![monthKey] = index;
      return; // Skip other checks for months
    }
    
    if (header.includes('no') || header === '#') {
      indices.no = index;
    } else if (header.includes('family members') || header.includes('family')) {
      indices.familyMembers = index;
    } else if (header.includes('monthly amount') || header.includes('monthly')) {
      indices.monthlyAmount = index;
    } else if (header.includes('total') && header.includes('year')) {
      indices.totalYear = index;
    }
  });

  if (indices.familyMembers === undefined) {
    console.error('Could not find "Family Members" column in CSV headers');
    return [];
  }

  // Parse data rows
  const dataRows = lines.slice(headerRowIndex + 1);
  
  const parsedRows = dataRows
    .map((line, index) => {
      const values = line.split(',').map(v => v.trim());
      const parseNumber = (value: string): number | null => {
        if (!value || value === '') return null;
        const num = Number(value.replace(/[^\d.-]/g, '')); // Remove non-numeric characters except digits, dots, and minus
        return isNaN(num) ? null : num;
      };

      const months: Partial<Record<MonthKey, number | null>> = {};
      Object.entries(indices.months!).forEach(([month, colIndex]) => {
        months[month as MonthKey] = parseNumber(values[colIndex] || '');
      });

      const row = {
        no: parseNumber(values[indices.no!] || '') ?? index + headerRowIndex + 1,
        familyMembers: (values[indices.familyMembers!] || '').replace(/^"|"$/g, '').trim(),
        monthlyAmount: parseNumber(values[indices.monthlyAmount!] || ''),
        months,
        totalYear: indices.totalYear !== undefined ? parseNumber(values[indices.totalYear] || '') : null,
      };

      return row;
    })
    .filter((row) => row.familyMembers.trim() !== '' && row.familyMembers !== '""');

  console.log(`Successfully parsed ${parsedRows.length} rows from CSV`);
  return parsedRows;
}
