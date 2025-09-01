import { Card, Button } from 'antd';
import { ExclamationCircleOutlined, ReloadOutlined } from '@ant-design/icons';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ 
  title = "Something went wrong", 
  message = "An error occurred while loading the data. Please try again.", 
  onRetry, 
  className 
}: ErrorStateProps) {
  return (
    <Card className={className || ''}>
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <ExclamationCircleOutlined className="text-red-500 text-4xl mb-4" />
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{message}</p>
        {onRetry && (
          <Button 
            type="primary" 
            onClick={onRetry}
            icon={<ReloadOutlined />}
          >
            Try Again
          </Button>
        )}
      </div>
    </Card>
  );
}
