'use client';

import { useEffect, useState } from 'react';
import { Card, Typography, Spin, Alert, Button } from 'antd';
import { ReloadOutlined, DollarOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface FinancialBalanceData {
  existingBalance2024: number;
  artCompetitionBalance2025: number;
  monthlyCollectionBalance: number;
  accountOpeningBalance: number;
  sadaka: number;
  totalCollectionInHand: number;
}

export default function TestFinancialBalance() {
  const [data, setData] = useState<FinancialBalanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/financial-balance');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Spin size="large" />
        <div style={{ marginTop: '16px' }}>
          <Text>Loading financial balance data...</Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          action={
            <Button size="small" danger onClick={fetchData}>
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ padding: '20px' }}>
        <Alert
          message="No Data"
          description="No financial balance data available"
          type="warning"
          showIcon
        />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>
        <DollarOutlined /> Financial Balance Test
      </Title>
      
      <Card title="Financial Balance Data from Google Sheet" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          <Card size="small" title="Existing Balance (2024)">
            <Text strong style={{ fontSize: '18px', color: '#1890ff' }}>
              Rs. {data.existingBalance2024.toLocaleString()}
            </Text>
          </Card>
          
          <Card size="small" title="Art Competition Balance (2025)">
            <Text strong style={{ fontSize: '18px', color: '#52c41a' }}>
              Rs. {data.artCompetitionBalance2025.toLocaleString()}
            </Text>
          </Card>
          
          <Card size="small" title="Monthly Collection Balance">
            <Text strong style={{ fontSize: '18px', color: '#faad14' }}>
              Rs. {data.monthlyCollectionBalance.toLocaleString()}
            </Text>
          </Card>
          
          <Card size="small" title="Account Opening Balance">
            <Text strong style={{ fontSize: '18px', color: '#722ed1' }}>
              Rs. {data.accountOpeningBalance.toLocaleString()}
            </Text>
          </Card>
          
          <Card size="small" title="Sadaka">
            <Text strong style={{ fontSize: '18px', color: '#eb2f96' }}>
              Rs. {data.sadaka.toLocaleString()}
            </Text>
          </Card>
          
          <Card size="small" title="Total Collection in Hand" style={{ gridColumn: 'span 2' }}>
            <Text strong style={{ fontSize: '24px', color: '#f5222d' }}>
              Rs. {data.totalCollectionInHand.toLocaleString()}
            </Text>
          </Card>
        </div>
      </Card>
      
      <Card title="Raw Data">
        <pre style={{ background: '#f5f5f5', padding: '16px', borderRadius: '4px', overflow: 'auto' }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      </Card>
      
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button 
          type="primary" 
          icon={<ReloadOutlined />} 
          onClick={fetchData}
          loading={loading}
        >
          Refresh Data
        </Button>
      </div>
    </div>
  );
}
