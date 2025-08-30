import { fetchSheetData } from './sheet/gviz';
import { normalizeSheetData, calculateMonthlyTotals, calculateKPIs, calculateStatusDistribution } from './sheet/normalize';
import { EnrichedRow, MonthlyTotals, DashboardKPIs, StatusDistribution } from '@/types/sheet';

export async function getSheetData(): Promise<EnrichedRow[]> {
  try {
    const rawRows = await fetchSheetData();
    return normalizeSheetData(rawRows);
  } catch (error) {
    console.error('Error getting sheet data:', error);
    throw error;
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
    console.error('Error getting dashboard data:', error);
    throw error;
  }
}
