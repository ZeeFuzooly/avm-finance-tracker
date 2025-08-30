import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'Fully Paid' | 'Partial' | 'Unpaid';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusConfig = (status: StatusBadgeProps['status']) => {
    switch (status) {
      case 'Fully Paid':
        return {
          className: 'bg-green-100 text-green-800 border-green-200',
          text: 'Fully Paid'
        };
      case 'Partial':
        return {
          className: 'bg-amber-100 text-amber-800 border-amber-200',
          text: 'Partial'
        };
      case 'Unpaid':
        return {
          className: 'bg-red-100 text-red-800 border-red-200',
          text: 'Unpaid'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge 
      className={cn(
        'border font-medium',
        config.className,
        className
      )}
    >
      {config.text}
    </Badge>
  );
}
