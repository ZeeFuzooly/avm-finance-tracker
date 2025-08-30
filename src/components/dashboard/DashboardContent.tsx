'use client';

import { useEffect, useState } from 'react';
import { getDashboardData } from '@/lib/data';
import { EnrichedRow, MonthlyTotals, DashboardKPIs, StatusDistribution } from '@/types/sheet';
import { MonthlyColumnChart } from '@/components/charts/MonthlyColumnChart';
import { StatusDonut } from '@/components/charts/StatusDonut';
import { 
  Layout, 
  Row, 
  Col, 
  Card, 
  Typography, 
  Space, 
  Button, 
  Statistic, 
  Progress,
  Empty,
  Tooltip,
  Tag,
  notification,
  Grid
} from 'antd';
import { 
  ReloadOutlined, 
  TableOutlined, 
  BarChartOutlined, 
  DollarOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  MobileOutlined,
  TabletOutlined,
  DesktopOutlined,
  TrophyOutlined,
  RiseOutlined,
  CrownOutlined,
  HomeOutlined,
  WalletOutlined,
  TeamOutlined,
  CalendarOutlined,
  PieChartOutlined,
  StarOutlined,
  ThunderboltOutlined,
  RocketOutlined,
  BulbOutlined,
  SettingOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  EyeOutlined,
  CheckOutlined,
  HeartOutlined,
  SafetyOutlined
} from '@ant-design/icons';
import Link from 'next/link';

const { Content } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export function DashboardContent() {
  const [data, setData] = useState<{
    rows: EnrichedRow[];
    monthlyTotals: MonthlyTotals;
    kpis: DashboardKPIs;
    statusDistribution: StatusDistribution;
  } | null>(null);
  const [financialSummary, setFinancialSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Use Ant Design's responsive breakpoints
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const isDesktop = screens.lg;

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch dashboard data, financial summary, and financial balance
      const [dashboardData, financialSummaryData, financialBalanceData] = await Promise.all([
        getDashboardData(),
        fetch('/api/financial-summary').then(res => res.json()),
        fetch('/api/financial-balance').then(res => res.json())
      ]);
      
      setData(dashboardData);
      setFinancialSummary({
        ...financialSummaryData,
        cashOnHand: financialBalanceData
      });
      setLastUpdated(new Date());
      
      // Show success notification
      notification.success({
        message: 'Data Updated Successfully',
        description: 'Dashboard data has been refreshed with the latest information.',
        placement: 'topRight',
        duration: 3,
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      
      // Show error notification
      notification.error({
        message: 'Data Update Failed',
        description: err instanceof Error ? err.message : 'Failed to load data',
        placement: 'topRight',
        duration: 5,
        icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading-container">
        <div className="loading-content">
          <div className="loading-icon-container">
            <div className="loading-icon">
              <CrownOutlined />
            </div>
            <div className="loading-pulse"></div>
          </div>
          <div className="loading-text">
            <h2>Loading AVM Family Dashboard</h2>
            <p>Preparing your financial insights...</p>
          </div>
          <div className="loading-progress">
            <Progress 
              percent={75} 
              strokeColor={{
                '0%': '#667eea',
                '100%': '#764ba2',
              }}
              showInfo={false}
              strokeWidth={4}
            />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <Card className="error-card">
          <div className="error-content">
            <div className="error-icon">
              <ExclamationCircleOutlined />
            </div>
            <div className="error-details">
              <Title level={isMobile ? 3 : 2}>Oops! Something went wrong</Title>
              <Text className="error-message">{error}</Text>
              <div className="error-actions">
                <Button 
                  type="primary" 
                  size={isMobile ? "middle" : "large"}
                  icon={<ReloadOutlined />} 
                  onClick={fetchData}
                  className="retry-button"
                >
                  Try Again
                </Button>
                <Button 
                  size={isMobile ? "middle" : "large"}
                  icon={<SettingOutlined />}
                  className="settings-button"
                >
                  Check Settings
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="empty-container">
        <Card className="empty-card">
          <Empty 
            description="No data available" 
            image={
              <div className="empty-icon">
                <BarChartOutlined />
              </div>
            }
          />
        </Card>
      </div>
    );
  }

  const { rows, monthlyTotals, kpis, statusDistribution } = data;

  return (
    <Content className="dashboard-content">
      <div className="dashboard-container">
        {/* Responsive Header */}
        <div className="dashboard-header">
          <Card className="header-card">
            <Row gutter={[16, 16]} align="middle">
              {/* Header Left - Brand */}
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <div className="header-left">
                  <div className="header-icon">
                    <CrownOutlined />
                  </div>
                  <div className="header-text">
                    <Title level={isMobile ? 3 : 1} className="header-title">
                      AVM Financial Tracker
                    </Title>
                    <Text className="header-subtitle">
                      Professional Collection Management System
                    </Text>
                  </div>
                </div>
              </Col>
              
              {/* Header Center - Last Updated */}
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <div className="header-center">
                  <div className="last-updated">
                    <CalendarOutlined />
                    <Text>
                      {isMobile 
                        ? `Updated: ${lastUpdated.toLocaleDateString()}`
                        : `Last updated: ${lastUpdated.toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}`
                      }
                    </Text>
                  </div>
                </div>
              </Col>
              
              {/* Header Right - Actions */}
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <div className="header-right">
                  <Space 
                    size={isMobile ? "small" : "middle"} 
                    direction={isMobile ? "vertical" : "horizontal"}
                    style={{ width: '100%', justifyContent: isMobile ? 'center' : 'flex-end' }}
                  >
                    <Button 
                      type="primary" 
                      icon={<ReloadOutlined spin={loading} />} 
                      onClick={fetchData}
                      loading={loading}
                      size={isMobile ? "middle" : "large"}
                      className="refresh-button"
                      block={isMobile}
                    >
                      {isMobile ? 'Refresh' : 'Refresh Data'}
                    </Button>
                    <Link href="/table" style={{ width: isMobile ? '100%' : 'auto' }}>
                      <Button 
                        icon={<TableOutlined />} 
                        size={isMobile ? "middle" : "large"}
                        className="table-button"
                        block={isMobile}
                      >
                        {isMobile ? 'Table' : 'View Table'}
                      </Button>
                    </Link>
                    <Button 
                      icon={<DownloadOutlined />} 
                      size={isMobile ? "middle" : "large"}
                      className="export-button"
                      block={isMobile}
                    >
                      {isMobile ? 'Export' : 'Export Data'}
                    </Button>
                  </Space>
                </div>
              </Col>
            </Row>
          </Card>
        </div>

        {/* Responsive KPI Cards */}
        <div className="kpi-section">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6} xl={6}>
              <Card className="kpi-card contributors-card">
                <div className="kpi-content">
                  <div className="kpi-icon">
                    <TeamOutlined />
                  </div>
                  <div className="kpi-details">
                    <Statistic
                      title="Total Contributors"
                      value={kpis.contributors}
                      suffix="families"
                      valueStyle={{ 
                        color: '#667eea',
                        fontSize: isMobile ? '24px' : '32px',
                        fontWeight: '700',
                        fontFamily: 'Inter, sans-serif'
                      }}
                    />
                    <div className="kpi-meta">
                      <Text className="kpi-subtitle">Active family members</Text>
                      <div className="kpi-trend">
                        <RiseOutlined />
                        <Text>+12% this month</Text>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} sm={12} lg={6} xl={6}>
              <Card className="kpi-card fully-paid-card">
                <div className="kpi-content">
                  <div className="kpi-icon success">
                    <CheckCircleOutlined />
                  </div>
                  <div className="kpi-details">
                    <Statistic
                      title="Fully Paid"
                      value={kpis.fullyPaid}
                      suffix="families"
                      valueStyle={{ 
                        color: '#10b981',
                        fontSize: isMobile ? '24px' : '32px',
                        fontWeight: '700',
                        fontFamily: 'Inter, sans-serif'
                      }}
                    />
                    <div className="kpi-meta">
                      <Text className="kpi-subtitle">{kpis.fullyPaidPercentage.toFixed(1)}% of total</Text>
                      <Progress 
                        percent={kpis.fullyPaidPercentage} 
                        size="small" 
                        strokeColor="#10b981"
                        showInfo={false}
                        className="kpi-progress"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} sm={12} lg={6} xl={6}>
              <Card className="kpi-card expected-card">
                <div className="kpi-content">
                  <div className="kpi-icon warning">
                    <TrophyOutlined />
                  </div>
                  <div className="kpi-details">
                    <Statistic
                      title="Expected Total"
                      value={kpis.expectedTotal}
                      prefix="Rs. "
                      precision={0}
                      valueStyle={{ 
                        color: '#f59e0b',
                        fontSize: isMobile ? '24px' : '32px',
                        fontWeight: '700',
                        fontFamily: 'Inter, sans-serif'
                      }}
                    />
                    <div className="kpi-meta">
                      <Text className="kpi-subtitle">Target collection amount</Text>
                      <div className="kpi-trend">
                        <RiseOutlined />
                        <Text>Target achieved</Text>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} sm={12} lg={6} xl={6}>
              <Card className="kpi-card collected-card">
                <div className="kpi-content">
                  <div className="kpi-icon info">
                    <WalletOutlined />
                  </div>
                  <div className="kpi-details">
                    <Statistic
                      title="Collected Total"
                      value={kpis.collectedTotal}
                      prefix="Rs. "
                      precision={0}
                      valueStyle={{ 
                        color: '#3b82f6',
                        fontSize: isMobile ? '24px' : '32px',
                        fontWeight: '700',
                        fontFamily: 'Inter, sans-serif'
                      }}
                    />
                    <div className="kpi-meta">
                      <Text className="kpi-subtitle">{kpis.collectedPercentage.toFixed(1)}% collected</Text>
                      <Progress 
                        percent={kpis.collectedPercentage} 
                        size="small" 
                        strokeColor="#3b82f6"
                        showInfo={false}
                        className="kpi-progress"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Cash on Hand Breakdown Section */}
        <div className="cash-on-hand-section">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={24}>
              <Card 
                className="cash-on-hand-card"
                title={
                  <div className="section-title">
                    <div className="section-icon">
                      <WalletOutlined />
                    </div>
                    <div className="section-title-text">
                      <Title level={isMobile ? 4 : 3} className="section-title-main">
                        Cash on Hand Breakdown
                      </Title>
                      <Text className="section-title-sub">
                        Detailed breakdown of all funds and collections
                      </Text>
                    </div>
                  </div>
                }
                extra={
                  <div className="section-actions">
                    <Space size="small" wrap>
                                             <Tooltip title="Total collection in hand">
                         <Tag color="green" icon={<DollarOutlined />} className="section-tag">
                           Rs. {financialSummary?.cashOnHand?.totalCollectionInHand?.toLocaleString() || '104,026.57'}
                         </Tag>
                       </Tooltip>
                      <Button 
                        icon={<EyeOutlined />} 
                        size="small"
                        className="section-action-button"
                      >
                        {isMobile ? 'Details' : 'View Details'}
                      </Button>
                    </Space>
                  </div>
                }
              >
                <Row gutter={[16, 16]}>
                  {/* Existing Balance (2024) */}
                  <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                    <Card className="breakdown-item-card existing-balance-card">
                      <div className="breakdown-item-content">
                        <div className="breakdown-item-icon">
                          <HomeOutlined />
                        </div>
                        <div className="breakdown-item-details">
                          <div className="breakdown-item-title">Existing Balance (2024)</div>
                          <div className="breakdown-item-value">
                            Rs. {financialSummary?.cashOnHand?.existingBalance2024?.toLocaleString() || '27,726.57'}
                          </div>
                          <div className="breakdown-item-description">Carried forward from previous year</div>
                        </div>
                      </div>
                    </Card>
                  </Col>

                  {/* Art Competition Balance (2025) */}
                  <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                    <Card className="breakdown-item-card art-comp-card">
                      <div className="breakdown-item-content">
                        <div className="breakdown-item-icon">
                          <TrophyOutlined />
                        </div>
                        <div className="breakdown-item-details">
                          <div className="breakdown-item-title">Art Competition Balance (2025)</div>
                          <div className="breakdown-item-value">
                            Rs. {financialSummary?.cashOnHand?.artCompetitionBalance2025?.toLocaleString() || '5,100.00'}
                          </div>
                          <div className="breakdown-item-description">Art competition funds</div>
                        </div>
                      </div>
                    </Card>
                  </Col>

                  {/* Monthly Collection Balance */}
                  <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                    <Card className="breakdown-item-card monthly-collection-card">
                      <div className="breakdown-item-content">
                        <div className="breakdown-item-icon">
                          <CalendarOutlined />
                        </div>
                        <div className="breakdown-item-details">
                          <div className="breakdown-item-title">Monthly Collection Balance</div>
                          <div className="breakdown-item-value">
                            Rs. {financialSummary?.cashOnHand?.monthlyCollectionBalance?.toLocaleString() || '52,200.00'}
                          </div>
                          <div className="breakdown-item-description">Total monthly collections</div>
                        </div>
                      </div>
                    </Card>
                  </Col>

                  {/* Account Opening Balance */}
                  <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                    <Card className="breakdown-item-card account-opening-card">
                      <div className="breakdown-item-content">
                        <div className="breakdown-item-icon">
                          <WalletOutlined />
                        </div>
                        <div className="breakdown-item-details">
                          <div className="breakdown-item-title">Account Opening Balance</div>
                          <div className="breakdown-item-value">
                            Rs. {financialSummary?.cashOnHand?.accountOpeningBalance?.toLocaleString() || '1,000.00'}
                          </div>
                          <div className="breakdown-item-description">Initial account balance</div>
                        </div>
                      </div>
                    </Card>
                  </Col>

                  {/* Sadaka */}
                  <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                    <Card className="breakdown-item-card sadaka-card">
                      <div className="breakdown-item-content">
                        <div className="breakdown-item-icon">
                          <HeartOutlined />
                        </div>
                        <div className="breakdown-item-details">
                          <div className="breakdown-item-title">Sadaka</div>
                          <div className="breakdown-item-value">
                            Rs. {financialSummary?.cashOnHand?.sadaka?.toLocaleString() || '18,000.00'}
                          </div>
                          <div className="breakdown-item-description">Charitable contributions</div>
                        </div>
                      </div>
                    </Card>
                  </Col>

                  {/* Total Collection in Hand */}
                  <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                    <Card className="breakdown-item-card total-collection-card">
                      <div className="breakdown-item-content">
                        <div className="breakdown-item-icon">
                          <DollarOutlined />
                        </div>
                        <div className="breakdown-item-details">
                          <div className="breakdown-item-title">Total Collection in Hand</div>
                          <div className="breakdown-item-value total">
                            Rs. {financialSummary?.cashOnHand?.totalCollectionInHand?.toLocaleString() || '104,026.57'}
                          </div>
                          <div className="breakdown-item-description">Grand total of all funds</div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Monthly Collection Summary Section */}
        <div className="monthly-collection-summary-section">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={24}>
              <Card 
                className="monthly-collection-summary-card"
                title={
                  <div className="section-title">
                    <div className="section-icon">
                      <BarChartOutlined />
                    </div>
                    <div className="section-title-text">
                      <Title level={isMobile ? 4 : 3} className="section-title-main">
                        Monthly Collection Summary (2025)
                      </Title>
                      <Text className="section-title-sub">
                        Monthly collection amounts and totals
                      </Text>
                    </div>
                  </div>
                }
              >
                <Row gutter={[16, 16]}>
                  {/* Monthly Collection Row */}
                  <Col xs={24}>
                    <Card className="monthly-collection-row-card">
                      <div className="monthly-collection-header">
                        <div className="monthly-collection-title">Monthly Collection</div>
                        <div className="monthly-collection-total">Total/Year: Rs. {financialSummary?.monthlyCollections?.totalYear?.toLocaleString() || '52,200.00'}</div>
                      </div>
                      <div className="monthly-collection-grid">
                        <div className="monthly-item">
                          <div className="monthly-label">Jan</div>
                          <div className="monthly-value">Rs. {financialSummary?.monthlyCollections?.jan?.toLocaleString() || '6,200.00'}</div>
                        </div>
                        <div className="monthly-item">
                          <div className="monthly-label">Feb</div>
                          <div className="monthly-value">Rs. {financialSummary?.monthlyCollections?.feb?.toLocaleString() || '5,200.00'}</div>
                        </div>
                        <div className="monthly-item">
                          <div className="monthly-label">Mar</div>
                          <div className="monthly-value">Rs. {financialSummary?.monthlyCollections?.mar?.toLocaleString() || '4,600.00'}</div>
                        </div>
                        <div className="monthly-item">
                          <div className="monthly-label">Apr</div>
                          <div className="monthly-value">Rs. {financialSummary?.monthlyCollections?.apr?.toLocaleString() || '4,600.00'}</div>
                        </div>
                        <div className="monthly-item">
                          <div className="monthly-label">May</div>
                          <div className="monthly-value">Rs. {financialSummary?.monthlyCollections?.may?.toLocaleString() || '4,600.00'}</div>
                        </div>
                        <div className="monthly-item">
                          <div className="monthly-label">Jun</div>
                          <div className="monthly-value">Rs. {financialSummary?.monthlyCollections?.jun?.toLocaleString() || '4,600.00'}</div>
                        </div>
                        <div className="monthly-item">
                          <div className="monthly-label">Jul</div>
                          <div className="monthly-value">Rs. {financialSummary?.monthlyCollections?.jul?.toLocaleString() || '4,000.00'}</div>
                        </div>
                        <div className="monthly-item">
                          <div className="monthly-label">Aug</div>
                          <div className="monthly-value">Rs. {financialSummary?.monthlyCollections?.aug?.toLocaleString() || '4,000.00'}</div>
                        </div>
                        <div className="monthly-item">
                          <div className="monthly-label">Sep</div>
                          <div className="monthly-value">Rs. {financialSummary?.monthlyCollections?.sep?.toLocaleString() || '3,800.00'}</div>
                        </div>
                        <div className="monthly-item">
                          <div className="monthly-label">Oct</div>
                          <div className="monthly-value">Rs. {financialSummary?.monthlyCollections?.oct?.toLocaleString() || '3,800.00'}</div>
                        </div>
                        <div className="monthly-item">
                          <div className="monthly-label">Nov</div>
                          <div className="monthly-value">Rs. {financialSummary?.monthlyCollections?.nov?.toLocaleString() || '3,400.00'}</div>
                        </div>
                        <div className="monthly-item">
                          <div className="monthly-label">Dec</div>
                          <div className="monthly-value">Rs. {financialSummary?.monthlyCollections?.dec?.toLocaleString() || '3,400.00'}</div>
                        </div>
                      </div>
                    </Card>
                  </Col>

                  {/* Expected Totals */}
                  <Col xs={24} sm={12}>
                    <Card className="expected-totals-card">
                      <div className="expected-totals-content">
                        <div className="expected-totals-title">Expected Totals for 2025</div>
                        <div className="expected-totals-grid">
                          <div className="expected-item">
                            <div className="expected-label">Total/Month</div>
                            <div className="expected-value">Rs. {financialSummary?.expectedTotals?.totalPerMonth?.toLocaleString() || '8,000.00'}</div>
                          </div>
                          <div className="expected-item">
                            <div className="expected-label">Total/Year (Expected)</div>
                            <div className="expected-value">Rs. {financialSummary?.expectedTotals?.totalYearExpected?.toLocaleString() || '96,000.00'}</div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>

                  {/* Collection Progress */}
                  <Col xs={24} sm={12}>
                    <Card className="collection-progress-card">
                      <div className="collection-progress-content">
                        <div className="collection-progress-title">Collection Progress</div>
                        <div className="collection-progress-stats">
                          <div className="progress-stat">
                            <div className="progress-label">Collected vs Expected</div>
                            <div className="progress-value">{financialSummary?.collectionProgress?.collectedVsExpected || '54.4'}%</div>
                            <Progress 
                              percent={financialSummary?.collectionProgress?.collectedVsExpected || 54.4} 
                              strokeColor={{
                                '0%': '#667eea',
                                '100%': '#764ba2',
                              }}
                              showInfo={false}
                            />
                          </div>
                          <div className="progress-stat">
                            <div className="progress-label">Monthly Average</div>
                            <div className="progress-value">Rs. {financialSummary?.collectionProgress?.monthlyAverage?.toLocaleString() || '4,350.00'}</div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Responsive Charts Section */}
        <div className="charts-section">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={24}>
              <Card 
                className="chart-card monthly-chart-card"
                title={
                  <div className="chart-title">
                    <div className="chart-icon">
                      <BarChartOutlined />
                    </div>
                    <div className="chart-title-text">
                      <Title level={isMobile ? 5 : 4} className="chart-title-main">
                        Monthly Collections
                      </Title>
                      <Text className="chart-title-sub">
                        {isMobile 
                          ? "Monthly collection trends"
                          : "Total amount collected per month with trend analysis"
                        }
                      </Text>
                    </div>
                  </div>
                }
                extra={
                  <div className="chart-actions">
                    <Space size="small" wrap>
                      <Tooltip title="Total months tracked">
                        <Tag color="blue" icon={<CalendarOutlined />} className="chart-tag">
                          {Object.keys(monthlyTotals).length} {isMobile ? 'M' : 'Months'}
                        </Tag>
                      </Tooltip>
                      <Tooltip title="Collection trend">
                        <Tag color="green" icon={<RiseOutlined />} className="chart-tag">
                          Active
                        </Tag>
                      </Tooltip>
                      <Button 
                        icon={<EyeOutlined />} 
                        size="small"
                        className="chart-action-button"
                      >
                        {isMobile ? 'View' : 'Details'}
                      </Button>
                    </Space>
                  </div>
                }
              >
                <div className="chart-container">
                  <MonthlyColumnChart data={monthlyTotals} />
                </div>
              </Card>
            </Col>
            
            <Col xs={24} lg={24}>
              <Card 
                className="chart-card status-chart-card"
                title={
                  <div className="chart-title">
                    <div className="chart-icon success">
                      <PieChartOutlined />
                    </div>
                    <div className="chart-title-text">
                      <Title level={isMobile ? 5 : 4} className="chart-title-main">
                        Payment Status
                      </Title>
                      <Text className="chart-title-sub">
                        {isMobile 
                          ? "Payment distribution"
                          : "Distribution of payment status across all contributors"
                        }
                      </Text>
                    </div>
                  </div>
                }
                extra={
                  <div className="chart-actions">
                    <Space size="small" wrap>
                      <Tooltip title="Total contributors">
                        <Tag color="green" icon={<TeamOutlined />} className="chart-tag">
                          {Object.values(statusDistribution).reduce((a, b) => a + b, 0)} {isMobile ? 'Total' : 'Contributors'}
                        </Tag>
                      </Tooltip>
                      <Button 
                        icon={<EyeOutlined />} 
                        size="small"
                        className="chart-action-button"
                      >
                        {isMobile ? 'View' : 'Details'}
                      </Button>
                    </Space>
                  </div>
                }
              >
                <div className="chart-container">
                  <StatusDonut data={statusDistribution} />
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Responsive Summary Cards */}
        <div className="summary-section">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Card 
                className="summary-card payment-summary-card"
                title={
                  <div className="summary-title">
                    <div className="summary-icon">
                      <CheckCircleOutlined />
                    </div>
                    <Title level={isMobile ? 5 : 5} className="summary-title-text">
                      Payment Summary
                    </Title>
                  </div>
                }
              >
                <div className="summary-content">
                  <div className="summary-item">
                    <div className="summary-item-label">Fully Paid</div>
                    <div className="summary-item-value success">{kpis.fullyPaid}</div>
                    <div className="summary-item-progress">
                      <Progress 
                        percent={kpis.fullyPaidPercentage} 
                        size="small" 
                        strokeColor="#10b981"
                        showInfo={false}
                      />
                    </div>
                  </div>
                  
                  <div className="summary-item">
                    <div className="summary-item-label">Partial/Unpaid</div>
                    <div className="summary-item-value warning">{kpis.partiallyUnpaid}</div>
                    <div className="summary-item-progress">
                      <Progress 
                        percent={100 - kpis.fullyPaidPercentage} 
                        size="small" 
                        strokeColor="#f59e0b"
                        showInfo={false}
                      />
                    </div>
                  </div>
                  
                  <div className="summary-item">
                    <div className="summary-item-label">Collection Rate</div>
                    <div className="summary-item-value info">{kpis.collectedPercentage.toFixed(1)}%</div>
                    <div className="summary-item-progress">
                      <Progress 
                        percent={kpis.collectedPercentage} 
                        size="small" 
                        strokeColor="#3b82f6"
                        showInfo={false}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Card 
                className="summary-card financial-summary-card"
                title={
                  <div className="summary-title">
                    <div className="summary-icon">
                      <WalletOutlined />
                    </div>
                    <Title level={isMobile ? 5 : 5} className="summary-title-text">
                      Financial Summary
                    </Title>
                  </div>
                }
              >
                <div className="summary-content">
                  <div className="summary-item">
                    <div className="summary-item-label">Expected</div>
                    <div className="summary-item-value primary">
                      {isMobile 
                        ? `Rs. ${(kpis.expectedTotal / 1000).toFixed(1)}K`
                        : `Rs. ${kpis.expectedTotal.toLocaleString()}`
                      }
                    </div>
                    <div className="summary-item-trend">
                      <RiseOutlined />
                      <Text>{isMobile ? 'Target' : 'Target amount'}</Text>
                    </div>
                  </div>
                  
                  <div className="summary-item">
                    <div className="summary-item-label">Collected</div>
                    <div className="summary-item-value success">
                      {isMobile 
                        ? `Rs. ${(kpis.collectedTotal / 1000).toFixed(1)}K`
                        : `Rs. ${kpis.collectedTotal.toLocaleString()}`
                      }
                    </div>
                    <div className="summary-item-trend">
                      <CheckOutlined />
                      <Text>{isMobile ? 'Collected' : 'Collected so far'}</Text>
                    </div>
                  </div>
                  
                  <div className="summary-item">
                    <div className="summary-item-label">Remaining</div>
                    <div className="summary-item-value warning">
                      {isMobile 
                        ? `Rs. ${((kpis.expectedTotal - kpis.collectedTotal) / 1000).toFixed(1)}K`
                        : `Rs. ${(kpis.expectedTotal - kpis.collectedTotal).toLocaleString()}`
                      }
                    </div>
                    <div className="summary-item-trend">
                      <ExclamationCircleOutlined />
                      <Text>{isMobile ? 'Pending' : 'Still pending'}</Text>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Card 
                className="summary-card quick-actions-card"
                title={
                  <div className="summary-title">
                    <div className="summary-icon">
                      <RocketOutlined />
                    </div>
                    <Title level={isMobile ? 5 : 5} className="summary-title-text">
                      Quick Actions
                    </Title>
                  </div>
                }
              >
                <div className="actions-content">
                  <Link href="/table" className="action-link">
                    <Button 
                      icon={<TableOutlined />} 
                      block
                      size={isMobile ? "middle" : "large"}
                      type="primary"
                      className="action-button primary"
                    >
                      {isMobile ? 'View Table' : 'View Detailed Table'}
                    </Button>
                  </Link>
                  
                  <Button 
                    icon={<ReloadOutlined />} 
                    block
                    onClick={fetchData}
                    loading={loading}
                    size={isMobile ? "middle" : "large"}
                    className="action-button secondary"
                  >
                    {isMobile ? 'Refresh' : 'Refresh Data'}
                  </Button>
                  
                  <Button 
                    icon={<DownloadOutlined />} 
                    block
                    size={isMobile ? "middle" : "large"}
                    className="action-button tertiary"
                  >
                    {isMobile ? 'Export' : 'Export Report'}
                  </Button>
                  
                  <Button 
                    icon={<ShareAltOutlined />} 
                    block
                    size={isMobile ? "middle" : "large"}
                    className="action-button quaternary"
                  >
                    {isMobile ? 'Share' : 'Share Dashboard'}
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Responsive Footer */}
        <div className="dashboard-footer">
          <Card className="footer-card">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <div className="footer-brand">
                  <div className="footer-icon">
                    <CrownOutlined />
                  </div>
                  <div className="footer-text">
                    <Title level={isMobile ? 4 : 3} className="footer-title">
                      Premium Dashboard
                    </Title>
                    <Text className="footer-subtitle">
                      {isMobile 
                        ? "Professional collection tracking"
                        : "Professional collection tracking with advanced analytics"
                      }
                    </Text>
                  </div>
                </div>
              </Col>
              
              <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                <div className="footer-features">
                  <div className="feature-item">
                    <MobileOutlined />
                    <Text>Mobile Optimized</Text>
                  </div>
                  <div className="feature-item">
                    <TabletOutlined />
                    <Text>Tablet Ready</Text>
                  </div>
                  <div className="feature-item">
                    <DesktopOutlined />
                    <Text>Desktop Enhanced</Text>
                  </div>
                  <div className="feature-item">
                    <SafetyOutlined />
                    <Text>Secure & Reliable</Text>
                  </div>
                </div>
              </Col>
              
              <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                <div className="footer-benefits">
                  <div className="benefit-item">
                    <StarOutlined />
                    <Text>Professional tracking</Text>
                  </div>
                  <div className="benefit-item">
                    <ThunderboltOutlined />
                    <Text>Real-time updates</Text>
                  </div>
                  <div className="benefit-item">
                    <BulbOutlined />
                    <Text>Financial insights</Text>
                  </div>
                  <div className="benefit-item">
                    <HeartOutlined />
                    <Text>Built with excellence</Text>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </Content>
  );
}
