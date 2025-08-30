export type MonthKey =
  | "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun"
  | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec";

export interface RawRow {
  no?: string | number | null;
  familyMembers: string;
  monthlyAmount?: number | null;
  months: Partial<Record<MonthKey, number | null>>;
  totalYear?: number | null; // may be present but ignore in favor of computed
}

export interface EnrichedRow extends RawRow {
  collectedYear: number;          // sum of months
  expectedYear: number;           // (monthlyAmount ?? 0) * 12
  paidMonthsCount: number;        // count of non-null month cells
  fullyPaid: boolean;             // paidMonthsCount === 12
  pendingMonths: MonthKey[];      // months with null/0
  status: "Fully Paid" | "Partial" | "Unpaid";
}

export type MonthlyTotals = Record<MonthKey, number>;

export interface DashboardKPIs {
  contributors: number;
  fullyPaid: number;
  partiallyUnpaid: number;
  fullyPaidPercentage: number;
  expectedTotal: number;
  collectedTotal: number;
  collectedPercentage: number;
}

export interface StatusDistribution {
  "Fully Paid": number;
  "Partial": number;
  "Unpaid": number;
}
