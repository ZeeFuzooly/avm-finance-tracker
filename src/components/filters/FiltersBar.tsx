import { Button, Input, Select } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { useFilterStore } from '@/lib/store';

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
        <Input
          placeholder="Search by family member..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          prefix={<SearchOutlined />}
          className="pl-10"
        />
      </div>
      
      <Select 
        value={status} 
        onChange={(value: 'All' | 'Fully Paid' | 'Partial' | 'Unpaid') => setStatus(value)}
        style={{ width: '100%', maxWidth: '180px' }}
        placeholder="Filter by status"
      >
        <Select.Option value="All">All Status</Select.Option>
        <Select.Option value="Fully Paid">Fully Paid</Select.Option>
        <Select.Option value="Partial">Partial</Select.Option>
        <Select.Option value="Unpaid">Unpaid</Select.Option>
      </Select>

      <div className="flex gap-2">
        <Button
          onClick={resetFilters}
          disabled={search === '' && status === 'All' || false}
        >
          Clear
        </Button>
        
        {onRefresh && (
          <Button
            onClick={onRefresh}
            loading={isLoading || false}
            icon={<ReloadOutlined />}
          >
            Refresh
          </Button>
        )}
      </div>
    </div>
  );
}
