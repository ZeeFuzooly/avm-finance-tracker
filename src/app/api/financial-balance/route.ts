import { NextRequest, NextResponse } from 'next/server';

const SHEET_ID = '1WhSc3ogSSTlSfvp7HlJLPZ4fiKFEyhUDSRhAwz8Cm8w';
const SHEET_NAME = 'MONTHLY COLLECTION AVM';

interface FinancialBalanceData {
  existingBalance2024: number;
  artCompetitionBalance2025: number;
  monthlyCollectionBalance: number;
  accountOpeningBalance: number;
  sadaka: number;
  totalCollectionInHand: number;
}

async function fetchFinancialBalanceFromSheet(): Promise<FinancialBalanceData> {
  // For now, return the static data from the image
  // This ensures the frontend always gets the correct data structure
  const financialBalanceData: FinancialBalanceData = {
    existingBalance2024: 27726.57,
    artCompetitionBalance2025: 5100.00,
    monthlyCollectionBalance: 52200.00,
    accountOpeningBalance: 1000.00,
    sadaka: 18000.00,
    totalCollectionInHand: 104026.57
  };
  
  console.log('Returning financial balance data:', financialBalanceData);
  
  return financialBalanceData;
}

export async function GET(request: NextRequest) {
  try {
    const financialBalance = await fetchFinancialBalanceFromSheet();
    
    return NextResponse.json(financialBalance, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('API Error fetching financial balance:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch financial balance',
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
