'use client';

import { useEffect, useState } from 'react';
import { getDashboardData } from '@/lib/data';
import { EnrichedRow } from '@/types/sheet';
import { CollectionTable } from '@/components/table/CollectionTable';
import { 
  Layout, 
  Typography, 
  Space, 
  Button, 
  Statistic, 
  Card,
  Spin,
  Alert,
  Empty,
  Breadcrumb,
  Row,
  Col
} from 'antd';
import { 
  ReloadOutlined, 
  TableOutlined, 
  ArrowLeftOutlined,
  HomeOutlined,
  BarChartOutlined,
  DollarOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CrownOutlined
} from '@ant-design/icons';
import Link from 'next/link';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function TablePage() {
  const [data, setData] = useState<EnrichedRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const dashboardData = await getDashboardData();
      setData(dashboardData.rows);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const breadcrumbItems = [
    {
      title: (
        <Link href="/" style={{ color: '#666', textDecoration: 'none' }}>
          <HomeOutlined />
          <span style={{ marginLeft: '8px' }}>Dashboard</span>
        </Link>
      )
    },
    {
      title: (
        <span style={{ color: '#1890ff', fontWeight: '500' }}>
          <TableOutlined />
          <span style={{ marginLeft: '8px' }}>Collection Table</span>
        </span>
      )
    }
  ];

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '400px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        margin: '24px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <TableOutlined style={{ fontSize: '32px', color: 'white' }} />
          </div>
          <div style={{ fontSize: '18px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>
            Loading collection data...
          </div>
          <div style={{ fontSize: '14px', color: '#999' }}>
            Preparing detailed table view
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '32px' }}>
        <Card className="premium-card">
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <ExclamationCircleOutlined style={{ fontSize: '32px', color: 'white' }} />
            </div>
            <Title level={3} style={{ color: '#ff4d4f', marginBottom: '8px' }}>
              Oops! Something went wrong
            </Title>
            <Text style={{ color: '#666', marginBottom: '24px', display: 'block' }}>
              {error}
            </Text>
            <Button 
              type="primary" 
              size="large" 
              icon={<ReloadOutlined />} 
              onClick={fetchData}
            >
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div style={{ padding: '32px' }}>
        <Card className="premium-card">
          <Empty 
            description="No collection data available" 
            image={
              <div style={{ 
                width: '64px', 
                height: '64px', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <TableOutlined style={{ fontSize: '32px', color: 'white' }} />
              </div>
            }
          />
        </Card>
      </div>
    );
  }

  // Calculate summary statistics
  const totalExpected = data.reduce((sum, item) => sum + (item.monthlyAmount || 0) * 12, 0);
  const totalCollected = data.reduce((sum, item) => sum + (item.collectedYear || 0), 0);
  const totalOutstanding = totalExpected - totalCollected;
  const fullyPaidCount = data.filter(item => item.status === 'Fully Paid').length;
  const partiallyPaidCount = data.filter(item => item.status === 'Partial').length;
  const unpaidCount = data.filter(item => item.status === 'Unpaid').length;

  return (
    <Content className="premium-content">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Premium Header Section */}
        <Card className="premium-card" style={{ marginBottom: '24px' }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '24px',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              marginBottom: '8px'
            }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
              }}>
                <TableOutlined style={{ fontSize: '20px', color: 'white' }} />
              </div>
              <Title level={1} style={{ 
                margin: 0, 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '32px',
                fontWeight: 'bold'
              }}>
                Collection Table
              </Title>
            </div>
            <Text style={{ fontSize: '16px', color: '#666' }}>
              Detailed view of all family collections and payment status
            </Text>
            <Space size="middle">
              <Link href="/">
                <Button 
                  icon={<ArrowLeftOutlined />} 
                  size="large"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#666'
                  }}
                >
                  Back to Dashboard
                </Button>
              </Link>
              <Button 
                type="primary" 
                icon={<ReloadOutlined />} 
                onClick={fetchData}
                loading={loading}
                size="large"
                style={{
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  border: 'none',
                  color: 'white'
                }}
              >
                Refresh Data
              </Button>
            </Space>
          </div>
        </Card>

        {/* Premium KPI Summary Cards */}
        <div style={{ marginBottom: '24px' }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} lg={6}>
              <Card className="premium-card">
                <div className="premium-statistic">
                  <div className="premium-icon">
                    <DollarOutlined />
                  </div>
                  <Statistic
                    title="Expected Total"
                    value={totalExpected}
                    prefix="Rs. "
                    precision={0}
                    valueStyle={{ 
                      color: '#667eea',
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }}
                  />
                  <Text style={{ color: '#999', fontSize: '12px' }}>Total expected amount</Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="premium-card">
                <div className="premium-statistic">
                  <div className="premium-success-icon">
                    <CheckCircleOutlined />
                  </div>
                  <Statistic
                    title="Collected Total"
                    value={totalCollected}
                    prefix="Rs. "
                    precision={0}
                    valueStyle={{ 
                      color: '#4facfe',
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }}
                  />
                  <Text style={{ color: '#999', fontSize: '12px' }}>Total collected amount</Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="premium-card">
                <div className="premium-statistic">
                  <div className="premium-warning-icon">
                    <ExclamationCircleOutlined />
                  </div>
                  <Statistic
                    title="Outstanding"
                    value={totalOutstanding}
                    prefix="Rs. "
                    precision={0}
                    valueStyle={{ 
                      color: '#fa709a',
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }}
                  />
                  <Text style={{ color: '#999', fontSize: '12px' }}>Remaining amount</Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="premium-card">
                <div className="premium-statistic">
                  <div className="premium-danger-icon">
                    <UserOutlined />
                  </div>
                  <Statistic
                    title="Total Families"
                    value={data.length}
                    suffix="families"
                    valueStyle={{ 
                      color: '#ff9a9e',
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }}
                  />
                  <Text style={{ color: '#999', fontSize: '12px' }}>Registered families</Text>
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Premium Table Container */}
        <Card 
          className="premium-card"
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ 
                width: '24px', 
                height: '24px', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <BarChartOutlined style={{ fontSize: '12px', color: 'white' }} />
              </div>
              <span>Family Collection Details</span>
            </div>
          }
        >
          <CollectionTable 
            data={data} 
            loading={loading} 
            onRefresh={fetchData}
          />
        </Card>

        {/* Premium Bottom Section */}
        <Card className="premium-card" style={{ marginTop: '24px', textAlign: 'center' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '16px',
            marginBottom: '16px'
          }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CrownOutlined style={{ fontSize: '20px', color: 'white' }} />
            </div>
            <Title level={3} style={{ 
              margin: 0,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 'bold'
            }}>
              Collection Summary
            </Title>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '32px',
            marginBottom: '16px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                borderRadius: '50%'
              }} />
              <Text style={{ color: '#666', fontWeight: '500' }}>
                Fully Paid: {fullyPaidCount}
              </Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                borderRadius: '50%'
              }} />
              <Text style={{ color: '#666', fontWeight: '500' }}>
                Partial: {partiallyPaidCount}
              </Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                borderRadius: '50%'
              }} />
              <Text style={{ color: '#666', fontWeight: '500' }}>
                Unpaid: {unpaidCount}
              </Text>
            </div>
          </div>
          <Text style={{ color: '#666', fontSize: '14px' }}>
            💎 Professional collection management • Real-time status tracking • 
            <span style={{ display: 'inline-block', marginLeft: '4px' }}>
              Comprehensive financial overview
            </span>
          </Text>
        </Card>
      </div>
    </Content>
  );
}
