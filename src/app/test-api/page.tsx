'use client';

import { useEffect, useState } from 'react';
import { Card, Typography, Button, Alert, Spin } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function TestApiPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testApi = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/financial-balance');
      const result = await response.json();
      
      console.log('API Response:', result);
      setData(result);
    } catch (err) {
      console.error('API Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testApi();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>API Test Page</Title>
      
      <Card title="Financial Balance API Test" style={{ marginBottom: '20px' }}>
        <Button 
          type="primary" 
          icon={<ReloadOutlined />} 
          onClick={testApi}
          loading={loading}
          style={{ marginBottom: '16px' }}
        >
          Test API
        </Button>
        
        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: '16px' }}
          />
        )}
        
        {loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Spin size="large" />
            <div style={{ marginTop: '16px' }}>
              <Text>Testing API...</Text>
            </div>
          </div>
        )}
        
        {data && (
          <div>
            <Title level={4}>API Response:</Title>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '16px', 
              borderRadius: '4px', 
              overflow: 'auto',
              fontSize: '12px'
            }}>
              {JSON.stringify(data, null, 2)}
            </pre>
            
            <Title level={4} style={{ marginTop: '20px' }}>Parsed Values:</Title>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <Card size="small" title="Existing Balance (2024)">
                <Text strong>Rs. {data.existingBalance2024?.toLocaleString()}</Text>
              </Card>
              <Card size="small" title="Art Competition Balance (2025)">
                <Text strong>Rs. {data.artCompetitionBalance2025?.toLocaleString()}</Text>
              </Card>
              <Card size="small" title="Monthly Collection Balance">
                <Text strong>Rs. {data.monthlyCollectionBalance?.toLocaleString()}</Text>
              </Card>
              <Card size="small" title="Account Opening Balance">
                <Text strong>Rs. {data.accountOpeningBalance?.toLocaleString()}</Text>
              </Card>
              <Card size="small" title="Sadaka">
                <Text strong>Rs. {data.sadaka?.toLocaleString()}</Text>
              </Card>
              <Card size="small" title="Total Collection in Hand">
                <Text strong>Rs. {data.totalCollectionInHand?.toLocaleString()}</Text>
              </Card>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
