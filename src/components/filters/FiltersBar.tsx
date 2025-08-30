import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFilterStore } from '@/lib/store';
import { Search, RefreshCw } from 'lucide-react';

interface FiltersBarProps {
  onRefresh?: () => void;
  isLoading?: boolean;
  className?: string;
}

export function FiltersBar({ onRefresh, isLoading, className }: FiltersBarProps) {
  const { search, status, setSearch, setStatus, resetFilters } = useFilterStore();

  return (
    <div className={`flex flex-col sm:flex-row gap-4 items-center ${className}`}>
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search by family member..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Select value={status} onValueChange={(value: any) => setStatus(value)}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Status</SelectItem>
          <SelectItem value="Fully Paid">Fully Paid</SelectItem>
          <SelectItem value="Partial">Partial</SelectItem>
          <SelectItem value="Unpaid">Unpaid</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={resetFilters}
          disabled={search === '' && status === 'All'}
        >
          Clear
        </Button>
        
        {onRefresh && (
          <Button
            variant="outline"
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        )}
      </div>
    </div>
  );
}
