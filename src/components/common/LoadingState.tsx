import { Card, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({ 
  message = "Loading data...", 
  className 
}: LoadingStateProps) {
  return (
    <Card className={className || ''}>
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <Spin 
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} 
          size="large"
        />
        <p className="text-gray-600 mt-4">{message}</p>
      </div>
    </Card>
  );
}
