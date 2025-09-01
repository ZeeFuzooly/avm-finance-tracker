import { fetchSheetData } from './sheet/gviz';
import { normalizeSheetData, calculateMonthlyTotals, calculateKPIs, calculateStatusDistribution } from './sheet/normalize';
import { EnrichedRow, MonthlyTotals, DashboardKPIs, StatusDistribution } from '@/types/sheet';
import { getMockSheetData } from './sheet/mock-data';

export async function getSheetData(): Promise<EnrichedRow[]> {
  try {
    const rawRows = await fetchSheetData();
    return normalizeSheetData(rawRows);
  } catch (error) {
    console.error('Error getting sheet data, falling back to mock data:', error);
    // Fallback to mock data if API fails
    const mockRows = getMockSheetData();
    return normalizeSheetData(mockRows);
  }
}

export async function getDashboardData(): Promise<{
  rows: EnrichedRow[];
  monthlyTotals: MonthlyTotals;
  kpis: DashboardKPIs;
  statusDistribution: StatusDistribution;
}> {
  try {
    const rows = await getSheetData();
    const monthlyTotals = calculateMonthlyTotals(rows);
    const kpis = calculateKPIs(rows);
    const statusDistribution = calculateStatusDistribution(rows);

    return {
      rows,
      monthlyTotals,
      kpis,
      statusDistribution,
    };
  } catch (error) {
    console.error('Error getting dashboard data, using fallback:', error);
    // Return fallback data structure
    const mockRows = getMockSheetData();
    const normalizedRows = normalizeSheetData(mockRows);
    const monthlyTotals = calculateMonthlyTotals(normalizedRows);
    const kpis = calculateKPIs(normalizedRows);
    const statusDistribution = calculateStatusDistribution(normalizedRows);

    return {
      rows: normalizedRows,
      monthlyTotals,
      kpis,
      statusDistribution,
    };
  }
}
