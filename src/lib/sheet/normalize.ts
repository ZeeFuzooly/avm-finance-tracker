import { RawRow, EnrichedRow, MonthKey, MonthlyTotals } from '@/types/sheet';

export function normalizeSheetData(rawRows: RawRow[]): EnrichedRow[] {
  return rawRows.map(normalizeRow);
}

export function normalizeRow(rawRow: RawRow): EnrichedRow {
  const monthKeys: MonthKey[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Calculate collected year (sum of all months)
  const collectedYear = monthKeys.reduce((sum, month) => {
    const value = rawRow.months[month];
    return sum + (value ?? 0);
  }, 0);

  // Calculate expected year (monthly amount * 12)
  const expectedYear = (rawRow.monthlyAmount ?? 0) * 12;

  // Count paid months (non-null and non-zero values)
  const paidMonthsCount = monthKeys.reduce((count, month) => {
    const value = rawRow.months[month];
    return count + (value && value > 0 ? 1 : 0);
  }, 0);

  // Determine if fully paid (all 12 months have values > 0)
  const fullyPaid = paidMonthsCount === 12;

  // Find pending months (null or zero values)
  const pendingMonths = monthKeys.filter(month => {
    const value = rawRow.months[month];
    return !value || value === 0;
  });

  // Determine status
  let status: "Fully Paid" | "Partial" | "Unpaid";
  if (paidMonthsCount === 0) {
    status = "Unpaid";
  } else if (fullyPaid) {
    status = "Fully Paid";
  } else {
    status = "Partial";
  }

  return {
    ...rawRow,
    collectedYear,
    expectedYear,
    paidMonthsCount,
    fullyPaid,
    pendingMonths,
    status,
  };
}

export function calculateMonthlyTotals(enrichedRows: EnrichedRow[]): MonthlyTotals {
  const monthKeys: MonthKey[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const totals = {} as MonthlyTotals;
  
  monthKeys.forEach(month => {
    const monthTotal = enrichedRows.reduce((sum, row) => {
      const value = row.months[month];
      return sum + (value ?? 0);
    }, 0);
    
    (totals as any)[month] = monthTotal;
  });

  return totals;
}

export function calculateKPIs(enrichedRows: EnrichedRow[]): {
  contributors: number;
  fullyPaid: number;
  partiallyUnpaid: number;
  fullyPaidPercentage: number;
  expectedTotal: number;
  collectedTotal: number;
  collectedPercentage: number;
} {
  const contributors = enrichedRows.length;
  const fullyPaid = enrichedRows.filter(row => row.status === "Fully Paid").length;
  const partiallyUnpaid = enrichedRows.filter(row => row.status !== "Fully Paid").length;
  const fullyPaidPercentage = contributors > 0 ? (fullyPaid / contributors) * 100 : 0;
  
  const expectedTotal = enrichedRows.reduce((sum, row) => sum + row.expectedYear, 0);
  const collectedTotal = enrichedRows.reduce((sum, row) => sum + row.collectedYear, 0);
  const collectedPercentage = expectedTotal > 0 ? (collectedTotal / expectedTotal) * 100 : 0;

  return {
    contributors,
    fullyPaid,
    partiallyUnpaid,
    fullyPaidPercentage,
    expectedTotal,
    collectedTotal,
    collectedPercentage,
  };
}

export function calculateStatusDistribution(enrichedRows: EnrichedRow[]): {
  "Fully Paid": number;
  "Partial": number;
  "Unpaid": number;
} {
  return {
    "Fully Paid": enrichedRows.filter(row => row.status === "Fully Paid").length,
    "Partial": enrichedRows.filter(row => row.status === "Partial").length,
    "Unpaid": enrichedRows.filter(row => row.status === "Unpaid").length,
  };
}
