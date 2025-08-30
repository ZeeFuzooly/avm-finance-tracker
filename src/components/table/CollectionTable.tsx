'use client';

import { useState, useEffect } from 'react';
import { EnrichedRow } from '@/types/sheet';
import { 
  Table, 
  Button, 
  Drawer, 
  Typography, 
  Space, 
  Tag, 
  Progress, 
  Avatar, 
  Statistic,
  Input,
  Select,
  Row,
  Col,
  Card,
  List,
  Divider,
  Tooltip,
  Badge,
  Empty
} from 'antd';
import { 
  EyeOutlined, 
  UserOutlined, 
  DollarOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  SearchOutlined,
  FilterOutlined,
  TrophyOutlined,
  CrownOutlined,
  StarOutlined,
  FireOutlined,
  BarChartOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Search } = Input;

interface CollectionTableProps {
  data: EnrichedRow[];
  loading: boolean;
  onRefresh: () => Promise<void>;
}

export function CollectionTable({ data, loading, onRefresh }: CollectionTableProps) {
  const [selectedRow, setSelectedRow] = useState<EnrichedRow | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Fully Paid':
        return 'success';
      case 'Partial':
        return 'warning';
      case 'Unpaid':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Fully Paid':
        return <CheckCircleOutlined />;
      case 'Partial':
        return <ExclamationCircleOutlined />;
      case 'Unpaid':
        return <CloseCircleOutlined />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    return status;
  };

  const getPerformanceBadge = (percentage: number) => {
    if (percentage >= 100) return { icon: <CrownOutlined />, color: '#52c41a', text: 'Perfect' };
    if (percentage >= 80) return { icon: <TrophyOutlined />, color: '#1890ff', text: 'Excellent' };
    if (percentage >= 60) return { icon: <StarOutlined />, color: '#faad14', text: 'Good' };
    if (percentage >= 40) return { icon: <ExclamationCircleOutlined />, color: '#fa8c16', text: 'Fair' };
    return { icon: <FireOutlined />, color: '#f5222d', text: 'Needs Attention' };
  };

  const filteredData = data.filter(item => {
    const matchesSearch = 
      item.familyMembers?.toLowerCase().includes(searchText.toLowerCase()) ||
      (item.no?.toString() || '').includes(searchText) ||
      (item.monthlyAmount?.toString() || '').includes(searchText);
    
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      title: (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          padding: '12px 0'
        }}>
          <div style={{ 
            width: '24px', 
            height: '24px', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
          }}>
            <Text style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>#</Text>
          </div>
          <span style={{ fontWeight: '600', fontSize: '14px' }}>Family ID</span>
        </div>
      ),
      dataIndex: 'no',
      key: 'no',
      width: 120,
      render: (no: number | null) => (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          padding: '12px 16px',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          borderRadius: '8px',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          margin: '8px 0',
          boxShadow: '0 2px 8px rgba(102, 126, 234, 0.1)'
        }}>
          <Text strong style={{ 
            color: '#667eea',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            #{no || 'N/A'}
          </Text>
        </div>
      )
    },
    {
      title: (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          padding: '12px 0'
        }}>
          <div style={{ 
            width: '24px', 
            height: '24px', 
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(79, 172, 254, 0.3)'
          }}>
            <UserOutlined style={{ fontSize: '12px', color: 'white' }} />
          </div>
          <span style={{ fontWeight: '600', fontSize: '14px' }}>Family Members</span>
        </div>
      ),
      dataIndex: 'familyMembers',
      key: 'familyMembers',
      render: (familyMembers: string) => (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          padding: '12px 16px',
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '8px',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          margin: '8px 0',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
        }}>
          <Avatar 
            icon={<UserOutlined />}
            size="large"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
            }}
          />
          <div>
            <Text strong style={{ fontSize: '14px', color: '#333', display: 'block', marginBottom: '2px' }}>
              {familyMembers}
            </Text>
            <Text style={{ fontSize: '12px', color: '#666' }}>
              Active Member
            </Text>
          </div>
        </div>
      )
    },
    {
      title: (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          padding: '12px 0'
        }}>
          <div style={{ 
            width: '24px', 
            height: '24px', 
            background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(82, 196, 26, 0.3)'
          }}>
            <DollarOutlined style={{ fontSize: '12px', color: 'white' }} />
          </div>
          <span style={{ fontWeight: '600', fontSize: '14px' }}>Monthly Amount</span>
        </div>
      ),
      dataIndex: 'monthlyAmount',
      key: 'monthlyAmount',
      render: (monthlyAmount: number | null) => (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          padding: '12px 16px',
          background: 'linear-gradient(135deg, rgba(82, 196, 26, 0.1) 0%, rgba(115, 209, 61, 0.1) 100%)',
          borderRadius: '8px',
          border: '1px solid rgba(82, 196, 26, 0.2)',
          margin: '8px 0',
          boxShadow: '0 2px 8px rgba(82, 196, 26, 0.1)'
        }}>
          <DollarOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
          <Text strong style={{ color: '#52c41a', fontSize: '16px' }}>
            Rs. {(monthlyAmount || 0).toLocaleString()}
          </Text>
        </div>
      )
    },
    {
      title: (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          padding: '12px 0'
        }}>
          <div style={{ 
            width: '24px', 
            height: '24px', 
            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(250, 112, 154, 0.3)'
          }}>
            <CheckCircleOutlined style={{ fontSize: '12px', color: 'white' }} />
          </div>
          <span style={{ fontWeight: '600', fontSize: '14px' }}>Collection Progress</span>
        </div>
      ),
      dataIndex: 'collectedYear',
      key: 'collectedYear',
      render: (collectedYear: number, record: EnrichedRow) => {
        const expectedYear = (record.monthlyAmount || 0) * 12;
        const percentage = expectedYear > 0 ? (collectedYear / expectedYear) * 100 : 0;
        const performance = getPerformanceBadge(percentage);
        
        return (
          <div style={{ 
            width: '100%',
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '8px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            margin: '8px 0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <Text strong style={{ color: '#4facfe', fontSize: '16px' }}>
                Rs. {collectedYear.toLocaleString()}
              </Text>
              <Tooltip title={performance.text}>
                <Badge 
                  count={performance.icon} 
                  style={{ 
                    backgroundColor: performance.color,
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                  }}
                />
              </Tooltip>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <Text style={{ fontSize: '12px', color: '#666' }}>
                {percentage.toFixed(1)}% Complete
              </Text>
              <Text style={{ fontSize: '12px', color: '#666' }}>
                Rs. {expectedYear.toLocaleString()} Target
              </Text>
            </div>
            <Progress 
              percent={percentage} 
              size="small" 
              strokeColor={{
                '0%': '#4facfe',
                '100%': '#00f2fe',
              }}
              showInfo={false}
              style={{ marginBottom: '4px' }}
            />
          </div>
        );
      }
    },
    {
      title: (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          padding: '12px 0'
        }}>
          <div style={{ 
            width: '24px', 
            height: '24px', 
            background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(255, 154, 158, 0.3)'
          }}>
            <ExclamationCircleOutlined style={{ fontSize: '12px', color: 'white' }} />
          </div>
          <span style={{ fontWeight: '600', fontSize: '14px' }}>Outstanding</span>
        </div>
      ),
      dataIndex: 'outstanding',
      key: 'outstanding',
      render: (_: any, record: EnrichedRow) => {
        const outstanding = record.expectedYear - record.collectedYear;
        return (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            padding: '12px 16px',
            background: outstanding > 0 
              ? 'linear-gradient(135deg, rgba(255, 154, 158, 0.1) 0%, rgba(254, 207, 239, 0.1) 100%)'
              : 'linear-gradient(135deg, rgba(82, 196, 26, 0.1) 0%, rgba(115, 209, 61, 0.1) 100%)',
            borderRadius: '8px',
            border: outstanding > 0 
              ? '1px solid rgba(255, 154, 158, 0.2)'
              : '1px solid rgba(82, 196, 26, 0.2)',
            margin: '8px 0',
            boxShadow: outstanding > 0 
              ? '0 2px 8px rgba(255, 154, 158, 0.1)'
              : '0 2px 8px rgba(82, 196, 26, 0.1)'
          }}>
            <Text strong style={{ 
              color: outstanding > 0 ? '#fa709a' : '#52c41a', 
              fontSize: '16px' 
            }}>
              Rs. {outstanding.toLocaleString()}
            </Text>
            {outstanding === 0 && (
              <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
            )}
          </div>
        );
      }
    },
    {
      title: (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          padding: '12px 0'
        }}>
          <div style={{ 
            width: '24px', 
            height: '24px', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
          }}>
            <StarOutlined style={{ fontSize: '12px', color: 'white' }} />
          </div>
          <span style={{ fontWeight: '600', fontSize: '14px' }}>Status</span>
        </div>
      ),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <div style={{ 
          padding: '8px 0',
          margin: '8px 0'
        }}>
          <Tag 
            color={getStatusColor(status)} 
            icon={getStatusIcon(status)}
            style={{ 
              fontWeight: '600',
              fontSize: '12px',
              padding: '6px 12px',
              borderRadius: '20px',
              border: 'none',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            {getStatusText(status)}
          </Tag>
        </div>
      )
    },
    {
      title: (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          padding: '12px 0'
        }}>
          <div style={{ 
            width: '24px', 
            height: '24px', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
          }}>
            <EyeOutlined style={{ fontSize: '12px', color: 'white' }} />
          </div>
          <span style={{ fontWeight: '600', fontSize: '14px' }}>Actions</span>
        </div>
      ),
      key: 'actions',
      width: 120,
      render: (_: any, record: EnrichedRow) => (
        <div style={{ 
          padding: '8px 0',
          margin: '8px 0'
        }}>
          <Tooltip title="View detailed information">
            <Button
              type="primary"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => {
                setSelectedRow(record);
                setDrawerVisible(true);
              }}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '500',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                height: '32px',
                padding: '0 16px'
              }}
            >
              Details
            </Button>
          </Tooltip>
        </div>
      )
    }
  ];

  const mobileListItems = filteredData.map((item, index) => {
    const outstanding = item.expectedYear - item.collectedYear;
    const percentage = item.expectedYear > 0 ? (item.collectedYear / item.expectedYear) * 100 : 0;
    const performance = getPerformanceBadge(percentage);
    
    return (
      <Card 
        key={item.no}
        className="premium-card"
        style={{ 
          marginBottom: '16px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Avatar 
              icon={<UserOutlined />}
              size="large"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
            />
            <div>
              <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '4px', fontSize: '16px' }}>
                {item.familyMembers}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                Family #{item.no || 'N/A'}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
            <Tag 
              color={getStatusColor(item.status)} 
              icon={getStatusIcon(item.status)}
              style={{ fontWeight: '600', fontSize: '12px' }}
            >
              {getStatusText(item.status)}
            </Tag>
            <Tooltip title={performance.text}>
              <Badge 
                count={performance.icon} 
                style={{ 
                  backgroundColor: performance.color,
                  color: 'white',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              />
            </Tooltip>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          <div style={{ 
            padding: '12px',
            background: 'linear-gradient(135deg, rgba(82, 196, 26, 0.1) 0%, rgba(115, 209, 61, 0.1) 100%)',
            borderRadius: '8px',
            border: '1px solid rgba(82, 196, 26, 0.2)',
            textAlign: 'center'
          }}>
            <Text style={{ color: '#666', fontSize: '12px', display: 'block', marginBottom: '4px' }}>
              Monthly Amount
            </Text>
            <Text strong style={{ color: '#52c41a', fontSize: '16px' }}>
              Rs. {(item.monthlyAmount || 0).toLocaleString()}
            </Text>
          </div>
          
          <div style={{ 
            padding: '12px',
            background: 'linear-gradient(135deg, rgba(79, 172, 254, 0.1) 0%, rgba(0, 242, 254, 0.1) 100%)',
            borderRadius: '8px',
            border: '1px solid rgba(79, 172, 254, 0.2)',
            textAlign: 'center'
          }}>
            <Text style={{ color: '#666', fontSize: '12px', display: 'block', marginBottom: '4px' }}>
              Collected
            </Text>
            <Text strong style={{ color: '#4facfe', fontSize: '16px' }}>
              Rs. {(item.collectedYear || 0).toLocaleString()}
            </Text>
          </div>
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <Text style={{ color: '#666', fontSize: '12px' }}>Progress</Text>
            <Text style={{ color: '#666', fontSize: '12px' }}>{percentage.toFixed(1)}%</Text>
          </div>
          <Progress 
            percent={percentage} 
            strokeColor={{
              '0%': '#4facfe',
              '100%': '#00f2fe',
            }}
            showInfo={false}
            size="small"
          />
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '12px',
          background: outstanding > 0 
            ? 'linear-gradient(135deg, rgba(255, 154, 158, 0.1) 0%, rgba(254, 207, 239, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(82, 196, 26, 0.1) 0%, rgba(115, 209, 61, 0.1) 100%)',
          borderRadius: '8px',
          border: outstanding > 0 
            ? '1px solid rgba(255, 154, 158, 0.2)'
            : '1px solid rgba(82, 196, 26, 0.2)',
          marginBottom: '16px'
        }}>
          <Text style={{ color: '#666', fontSize: '14px' }}>Outstanding:</Text>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Text strong style={{ 
              color: outstanding > 0 ? '#fa709a' : '#52c41a', 
              fontSize: '16px' 
            }}>
              Rs. {outstanding.toLocaleString()}
            </Text>
            {outstanding === 0 && (
              <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
            )}
          </div>
        </div>
        
        <Button
          type="primary"
          icon={<EyeOutlined />}
          block
          onClick={() => {
            setSelectedRow(item);
            setDrawerVisible(true);
          }}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '500',
            height: '40px',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
          }}
        >
          View Details
        </Button>
      </Card>
    );
  });

  return (
    <div>
      {/* Premium Summary Header */}
      <Card 
        className="premium-card"
        style={{ 
          marginBottom: '24px',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          border: '1px solid rgba(102, 126, 234, 0.2)'
        }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BarChartOutlined style={{ fontSize: '20px', color: 'white' }} />
            </div>
            <div>
              <Text style={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>
                Collection Overview
              </Text>
              <Text style={{ fontSize: '14px', color: '#666' }}>
                {filteredData.length} families • {filteredData.filter(item => item.status === 'Fully Paid').length} fully paid
              </Text>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ 
              padding: '8px 16px',
              background: 'rgba(82, 196, 26, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(82, 196, 26, 0.2)',
              textAlign: 'center'
            }}>
              <Text style={{ fontSize: '12px', color: '#666', display: 'block' }}>Total Families</Text>
              <Text strong style={{ fontSize: '16px', color: '#52c41a' }}>{filteredData.length}</Text>
            </div>
            <div style={{ 
              padding: '8px 16px',
              background: 'rgba(79, 172, 254, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(79, 172, 254, 0.2)',
              textAlign: 'center'
            }}>
              <Text style={{ fontSize: '12px', color: '#666', display: 'block' }}>Fully Paid</Text>
              <Text strong style={{ fontSize: '16px', color: '#4facfe' }}>
                {filteredData.filter(item => item.status === 'Fully Paid').length}
              </Text>
            </div>
            <div style={{ 
              padding: '8px 16px',
              background: 'rgba(250, 112, 154, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(250, 112, 154, 0.2)',
              textAlign: 'center'
            }}>
              <Text style={{ fontSize: '12px', color: '#666', display: 'block' }}>Pending</Text>
              <Text strong style={{ fontSize: '16px', color: '#fa709a' }}>
                {filteredData.filter(item => item.status !== 'Fully Paid').length}
              </Text>
            </div>
          </div>
        </div>
      </Card>

      {/* Premium Filters */}
      <Card 
        className="premium-card"
        style={{ 
          marginBottom: '24px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          gap: '16px', 
          alignItems: isMobile ? 'stretch' : 'center'
        }}>
          <div style={{ 
            flex: isMobile ? 'none' : 1,
            maxWidth: isMobile ? 'none' : '400px'
          }}>
            <Search
              placeholder="Search families, amounts, or numbers..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined style={{ color: '#667eea' }} />}
              style={{
                borderRadius: '8px',
                border: '1px solid rgba(102, 126, 234, 0.2)'
              }}
            />
          </div>
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Filter by status"
            suffixIcon={<FilterOutlined style={{ color: '#667eea' }} />}
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'Fully Paid', label: 'Fully Paid' },
              { value: 'Partial', label: 'Partial' },
              { value: 'Unpaid', label: 'Unpaid' }
            ]}
            style={{
              width: isMobile ? '100%' : '200px',
              borderRadius: '8px',
              border: '1px solid rgba(102, 126, 234, 0.2)'
            }}
          />
        </div>
      </Card>

      {/* Premium Table/Mobile List */}
      {isMobile ? (
        <div>
          {mobileListItems.length > 0 ? (
            mobileListItems
          ) : (
            <Card className="premium-card" style={{ textAlign: 'center', padding: '48px' }}>
              <Empty 
                description="No families found matching your search criteria"
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
                    <UserOutlined style={{ fontSize: '32px', color: 'white' }} />
                  </div>
                }
              />
            </Card>
          )}
        </div>
      ) : (
        <Card 
          className="premium-card"
          style={{ 
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="no"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} of ${total} families`,
              style: { marginTop: '16px' },
              itemRender: (page, type, originalElement) => {
                if (type === 'page') {
                  return (
                    <div style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      background: 'rgba(102, 126, 234, 0.1)',
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      color: '#667eea',
                      fontWeight: '500'
                    }}>
                      {page}
                    </div>
                  );
                }
                return originalElement;
              }
            }}
            onRow={(record) => ({
              onClick: () => {
                setSelectedRow(record);
                setDrawerVisible(true);
              },
              style: { 
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }
            })}
            scroll={{ x: 1200 }}
            style={{
              borderRadius: '12px',
              overflow: 'hidden'
            }}
          />
        </Card>
      )}

      {/* Premium Detail Drawer */}
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <UserOutlined style={{ fontSize: '16px', color: 'white' }} />
            </div>
            <span style={{ fontSize: '18px', fontWeight: '600' }}>Family Details</span>
          </div>
        }
        placement="right"
        width={isMobile ? '100%' : 500}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        style={{ 
          background: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(10px)' 
        }}
      >
        {selectedRow && (
          <div style={{ padding: '16px 0' }}>
            {/* Family Info */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <Avatar 
                icon={<UserOutlined />}
                size={80}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  marginBottom: '16px',
                  boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)'
                }}
              />
              <Title level={2} style={{ margin: '8px 0', color: '#333' }}>
                {selectedRow.familyMembers}
              </Title>
              <Text style={{ color: '#666', fontSize: '16px' }}>
                Family #{selectedRow.no || 'N/A'}
              </Text>
            </div>

            <Divider />

            {/* Financial Statistics */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              <Col span={12}>
                <Card className="premium-card" style={{ textAlign: 'center' }}>
                  <Statistic
                    title="Monthly Amount"
                    value={selectedRow.monthlyAmount || 0}
                    prefix="Rs. "
                    precision={0}
                    valueStyle={{ 
                      color: '#52c41a',
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card className="premium-card" style={{ textAlign: 'center' }}>
                  <Statistic
                    title="Expected Year"
                    value={(selectedRow.monthlyAmount || 0) * 12}
                    prefix="Rs. "
                    precision={0}
                    valueStyle={{ 
                      color: '#667eea',
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card className="premium-card" style={{ textAlign: 'center' }}>
                  <Statistic
                    title="Collected Year"
                    value={selectedRow.collectedYear || 0}
                    prefix="Rs. "
                    precision={0}
                    valueStyle={{ 
                      color: '#4facfe',
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card className="premium-card" style={{ textAlign: 'center' }}>
                  <Statistic
                    title="Outstanding"
                    value={selectedRow.expectedYear - selectedRow.collectedYear}
                    prefix="Rs. "
                    precision={0}
                    valueStyle={{ 
                      color: '#fa709a',
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }}
                  />
                </Card>
              </Col>
            </Row>

            {/* Progress and Status */}
            <Card className="premium-card" style={{ marginBottom: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <Text style={{ fontWeight: '600', fontSize: '16px' }}>Collection Progress</Text>
                  <Text style={{ color: '#666', fontSize: '14px' }}>
                    {((selectedRow.collectedYear || 0) / ((selectedRow.monthlyAmount || 0) * 12) * 100).toFixed(1)}%
                  </Text>
                </div>
                <Progress 
                  percent={((selectedRow.collectedYear || 0) / ((selectedRow.monthlyAmount || 0) * 12) * 100)} 
                  strokeColor={{
                    '0%': '#4facfe',
                    '100%': '#00f2fe',
                  }}
                  size="default"
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Text style={{ fontWeight: '600', fontSize: '16px' }}>Status:</Text>
                <Tag 
                  color={getStatusColor(selectedRow.status)} 
                  icon={getStatusIcon(selectedRow.status)}
                  style={{ 
                    fontWeight: '600',
                    fontSize: '14px',
                    padding: '6px 16px',
                    borderRadius: '20px'
                  }}
                >
                  {getStatusText(selectedRow.status)}
                </Tag>
              </div>
            </Card>

            {/* Monthly Breakdown */}
            <Card 
              className="premium-card"
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <DollarOutlined style={{ color: '#52c41a' }} />
                  <span style={{ fontWeight: '600' }}>Monthly Breakdown</span>
                </div>
              }
            >
              <Row gutter={[8, 8]}>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => {
                  const monthKey = month.toLowerCase() as keyof EnrichedRow;
                  const amount = selectedRow[monthKey] as number;
                  const hasPayment = amount && amount > 0;
                  
                  return (
                    <Col span={8} key={month}>
                      <div style={{ 
                        padding: '12px',
                        background: hasPayment 
                          ? 'linear-gradient(135deg, rgba(79, 172, 254, 0.1) 0%, rgba(0, 242, 254, 0.1) 100%)'
                          : 'rgba(0, 0, 0, 0.05)',
                        borderRadius: '8px',
                        textAlign: 'center',
                        border: hasPayment 
                          ? '1px solid rgba(79, 172, 254, 0.3)'
                          : '1px solid rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease'
                      }}>
                        <div style={{ fontSize: '12px', fontWeight: '600', color: '#666', marginBottom: '4px' }}>
                          {month}
                        </div>
                        <div style={{ 
                          fontSize: '14px', 
                          fontWeight: 'bold',
                          color: hasPayment ? '#4facfe' : '#999'
                        }}>
                          Rs. {amount || 0}
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Card>
          </div>
        )}
      </Drawer>
    </div>
  );
}
