import { describe, it, expect } from 'vitest';
import { normalizeRow, calculateMonthlyTotals, calculateKPIs, calculateStatusDistribution } from '../normalize';
import { RawRow, EnrichedRow } from '@/types/sheet';

describe('normalizeRow', () => {
  it('should normalize a fully paid row correctly', () => {
    const rawRow: RawRow = {
      familyMembers: 'John Doe',
      monthlyAmount: 100,
      months: {
        Jan: 100, Feb: 100, Mar: 100, Apr: 100, May: 100, Jun: 100,
        Jul: 100, Aug: 100, Sep: 100, Oct: 100, Nov: 100, Dec: 100
      }
    };

    const result = normalizeRow(rawRow);

    expect(result.collectedYear).toBe(1200);
    expect(result.expectedYear).toBe(1200);
    expect(result.paidMonthsCount).toBe(12);
    expect(result.fullyPaid).toBe(true);
    expect(result.status).toBe('Fully Paid');
    expect(result.pendingMonths).toEqual([]);
  });

  it('should normalize a partial payment row correctly', () => {
    const rawRow: RawRow = {
      familyMembers: 'Jane Smith',
      monthlyAmount: 100,
      months: {
        Jan: 100, Feb: 100, Mar: 100, Apr: 100, May: 100, Jun: 100,
        Jul: 100, Aug: 100, Sep: null, Oct: null, Nov: null, Dec: null
      }
    };

    const result = normalizeRow(rawRow);

    expect(result.collectedYear).toBe(800);
    expect(result.expectedYear).toBe(1200);
    expect(result.paidMonthsCount).toBe(8);
    expect(result.fullyPaid).toBe(false);
    expect(result.status).toBe('Partial');
    expect(result.pendingMonths).toEqual(['Sep', 'Oct', 'Nov', 'Dec']);
  });

  it('should normalize an unpaid row correctly', () => {
    const rawRow: RawRow = {
      familyMembers: 'Bob Wilson',
      monthlyAmount: 100,
      months: {
        Jan: null, Feb: null, Mar: null, Apr: null, May: null, Jun: null,
        Jul: null, Aug: null, Sep: null, Oct: null, Nov: null, Dec: null
      }
    };

    const result = normalizeRow(rawRow);

    expect(result.collectedYear).toBe(0);
    expect(result.expectedYear).toBe(1200);
    expect(result.paidMonthsCount).toBe(0);
    expect(result.fullyPaid).toBe(false);
    expect(result.status).toBe('Unpaid');
    expect(result.pendingMonths).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
  });

  it('should handle missing monthly amount', () => {
    const rawRow: RawRow = {
      familyMembers: 'Alice Brown',
      monthlyAmount: null,
      months: {
        Jan: 50, Feb: 50, Mar: 50, Apr: 50, May: 50, Jun: 50,
        Jul: 50, Aug: 50, Sep: 50, Oct: 50, Nov: 50, Dec: 50
      }
    };

    const result = normalizeRow(rawRow);

    expect(result.collectedYear).toBe(600);
    expect(result.expectedYear).toBe(0);
    expect(result.paidMonthsCount).toBe(12);
    expect(result.fullyPaid).toBe(true);
    expect(result.status).toBe('Fully Paid');
  });
});

describe('calculateMonthlyTotals', () => {
  it('should calculate monthly totals correctly', () => {
    const enrichedRows: EnrichedRow[] = [
      {
        familyMembers: 'John Doe',
        monthlyAmount: 100,
        months: { Jan: 100, Feb: 100, Mar: 100 },
        collectedYear: 300,
        expectedYear: 1200,
        paidMonthsCount: 3,
        fullyPaid: false,
        pendingMonths: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        status: 'Partial'
      },
      {
        familyMembers: 'Jane Smith',
        monthlyAmount: 100,
        months: { Jan: 100, Feb: 100, Mar: 100 },
        collectedYear: 300,
        expectedYear: 1200,
        paidMonthsCount: 3,
        fullyPaid: false,
        pendingMonths: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        status: 'Partial'
      }
    ];

    const result = calculateMonthlyTotals(enrichedRows);

    expect(result.Jan).toBe(200);
    expect(result.Feb).toBe(200);
    expect(result.Mar).toBe(200);
    expect(result.Apr).toBe(0);
  });
});

describe('calculateKPIs', () => {
  it('should calculate KPIs correctly', () => {
    const enrichedRows: EnrichedRow[] = [
      {
        familyMembers: 'John Doe',
        monthlyAmount: 100,
        months: { Jan: 100, Feb: 100, Mar: 100 },
        collectedYear: 300,
        expectedYear: 1200,
        paidMonthsCount: 3,
        fullyPaid: false,
        pendingMonths: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        status: 'Partial'
      },
      {
        familyMembers: 'Jane Smith',
        monthlyAmount: 100,
        months: { Jan: 100, Feb: 100, Mar: 100, Apr: 100, May: 100, Jun: 100, Jul: 100, Aug: 100, Sep: 100, Oct: 100, Nov: 100, Dec: 100 },
        collectedYear: 1200,
        expectedYear: 1200,
        paidMonthsCount: 12,
        fullyPaid: true,
        pendingMonths: [],
        status: 'Fully Paid'
      }
    ];

    const result = calculateKPIs(enrichedRows);

    expect(result.contributors).toBe(2);
    expect(result.fullyPaid).toBe(1);
    expect(result.partiallyUnpaid).toBe(1);
    expect(result.fullyPaidPercentage).toBe(50);
    expect(result.expectedTotal).toBe(2400);
    expect(result.collectedTotal).toBe(1500);
    expect(result.collectedPercentage).toBe(62.5);
  });
});

describe('calculateStatusDistribution', () => {
  it('should calculate status distribution correctly', () => {
    const enrichedRows: EnrichedRow[] = [
      { familyMembers: 'John', status: 'Fully Paid' } as EnrichedRow,
      { familyMembers: 'Jane', status: 'Partial' } as EnrichedRow,
      { familyMembers: 'Bob', status: 'Unpaid' } as EnrichedRow,
      { familyMembers: 'Alice', status: 'Fully Paid' } as EnrichedRow,
    ];

    const result = calculateStatusDistribution(enrichedRows);

    expect(result['Fully Paid']).toBe(2);
    expect(result['Partial']).toBe(1);
    expect(result['Unpaid']).toBe(1);
  });
});
