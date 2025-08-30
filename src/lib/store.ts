import { create } from 'zustand';
import { EnrichedRow } from '@/types/sheet';

interface FilterState {
  search: string;
  status: 'All' | 'Fully Paid' | 'Partial' | 'Unpaid';
  setSearch: (search: string) => void;
  setStatus: (status: 'All' | 'Fully Paid' | 'Partial' | 'Unpaid') => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  search: '',
  status: 'All',
  setSearch: (search) => set({ search }),
  setStatus: (status) => set({ status }),
  resetFilters: () => set({ search: '', status: 'All' }),
}));

// Utility function to filter rows based on current filters
export function getFilteredRows(rows: EnrichedRow[], search: string, status: 'All' | 'Fully Paid' | 'Partial' | 'Unpaid'): EnrichedRow[] {
  return rows.filter((row) => {
    // Search filter
    const matchesSearch = search === '' || 
      row.familyMembers.toLowerCase().includes(search.toLowerCase());
    
    // Status filter
    const matchesStatus = status === 'All' || row.status === status;
    
    return matchesSearch && matchesStatus;
  });
}
