import { NextRequest, NextResponse } from 'next/server';

// Financial summary data based on the Google Sheets
const financialSummaryData = {
  cashOnHand: {
    existingBalance2024: 27726.57,
    artCompetitionBalance2025: 5100.00,
    monthlyCollectionBalance: 52200.00,
    accountOpeningBalance: 1000.00,
    sadaka: 18000.00,
    totalCollectionInHand: 104026.57
  },
  monthlyCollections: {
    jan: 6200.00,
    feb: 5200.00,
    mar: 4600.00,
    apr: 4600.00,
    may: 4600.00,
    jun: 4600.00,
    jul: 4000.00,
    aug: 4000.00,
    sep: 3800.00,
    oct: 3800.00,
    nov: 3400.00,
    dec: 3400.00,
    totalYear: 52200.00
  },
  expectedTotals: {
    totalPerMonth: 8000.00,
    totalYearExpected: 96000.00
  },
  collectionProgress: {
    collectedVsExpected: 54.4,
    monthlyAverage: 4350.00
  }
};

export async function GET(_request: NextRequest) {
  try {
    return NextResponse.json(financialSummaryData, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('API Error fetching financial summary:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch financial summary',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
