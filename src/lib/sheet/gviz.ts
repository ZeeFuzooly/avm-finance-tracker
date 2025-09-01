import { RawRow } from '@/types/sheet';

export async function fetchSheetData(): Promise<RawRow[]> {
  try {
    // Use the API route instead of direct Google Sheets URL to avoid CORS issues
    const response = await fetch('/api/sheet-data', { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw new Error(`Failed to fetch sheet data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
