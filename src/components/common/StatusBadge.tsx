import { Tag } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Fully Paid':
        return {
          color: 'success',
          icon: <CheckCircleOutlined />,
          text: 'Fully Paid'
        };
      case 'Partial':
        return {
          color: 'warning',
          icon: <ExclamationCircleOutlined />,
          text: 'Partial'
        };
      case 'Unpaid':
        return {
          color: 'error',
          icon: <CloseCircleOutlined />,
          text: 'Unpaid'
        };
      default:
        return {
          color: 'default',
          icon: null,
          text: status
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Tag 
      color={config.color} 
      icon={config.icon}
      className={className || ''}
    >
      {config.text}
    </Tag>
  );
}
