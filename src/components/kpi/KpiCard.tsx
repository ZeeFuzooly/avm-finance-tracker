'use client';

import { Card, Statistic, Typography, Badge, Progress, Tooltip, Space } from 'antd';
import { 
  UserOutlined, 
  DollarOutlined, 
  CheckCircleOutlined, 
  ExclamationCircleOutlined,
  RiseOutlined,
  FallOutlined,
  TeamOutlined,
  WalletOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  CrownOutlined
} from '@ant-design/icons';

const { Text, Title } = Typography;

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'cyan';
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  percentage?: number;
}

const colorVariants = {
  blue: { from: 'from-blue-500', to: 'to-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  green: { from: 'from-green-500', to: 'to-green-600', bg: 'bg-green-50', border: 'border-green-200' },
  purple: { from: 'from-purple-500', to: 'to-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
  orange: { from: 'from-orange-500', to: 'to-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
  red: { from: 'from-red-500', to: 'to-red-600', bg: 'bg-red-50', border: 'border-red-200' },
  cyan: { from: 'from-cyan-500', to: 'to-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-200' },
};

const iconColors = {
  blue: 'text-blue-600',
  green: 'text-green-600',
  purple: 'text-purple-600',
  orange: 'text-orange-600',
  red: 'text-red-600',
  cyan: 'text-cyan-600',
};

export function KpiCard({ title, value, change, changeType, icon, color, subtitle, trend, percentage }: KpiCardProps) {
  const colors = colorVariants[color];
  
  return (
    <Card 
      className={`kpi-card group border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${colors.bg} ${colors.border}`}
      style={{ 
        background: `linear-gradient(135deg, ${colors.bg} 0%, rgba(255, 255, 255, 0.9) 100%)`,
        border: `1px solid rgba(0, 0, 0, 0.05)`
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`p-4 rounded-xl bg-gradient-to-br ${colors.from} ${colors.to} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
              <div className="text-white text-lg">
                {icon}
              </div>
            </div>
            <div className="flex-1">
              <Title level={5} style={{ margin: 0, color: '#374151', fontSize: '14px', fontWeight: '600' }}>
                {title}
              </Title>
              {subtitle && (
                <Text type="secondary" style={{ fontSize: '12px', marginTop: '2px' }}>
                  {subtitle}
                </Text>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl sm:text-4xl font-bold" style={{ color: colors.from.replace('from-', '#').replace('-500', '') }}>
                {value}
              </span>
              {change !== undefined && (
                <Tooltip title={`${changeType === 'increase' ? 'Increased' : 'Decreased'} by ${Math.abs(change)}%`}>
                  <div className={`flex items-center space-x-1 text-sm font-medium px-2 py-1 rounded-full ${
                    changeType === 'increase' 
                      ? 'text-green-600 bg-green-100' 
                      : 'text-red-600 bg-red-100'
                  }`}>
                    {changeType === 'increase' ? (
                      <RiseOutlined className="w-3 h-3" />
                    ) : (
                      <FallOutlined className="w-3 h-3" />
                    )}
                    <span>{Math.abs(change)}%</span>
                  </div>
                </Tooltip>
              )}
            </div>
            
            {percentage !== undefined && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Text style={{ fontSize: '12px', color: '#666' }}>Progress</Text>
                  <Text strong style={{ fontSize: '12px', color: colors.from.replace('from-', '#').replace('-500', '') }}>
                    {percentage}%
                  </Text>
                </div>
                <Progress 
                  percent={percentage} 
                  size="small" 
                  strokeColor={colors.from.replace('from-', '#').replace('-500', '')}
                  showInfo={false}
                  style={{ margin: 0 }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Decorative gradient line */}
      <div className={`mt-4 h-1 bg-gradient-to-r ${colors.from} ${colors.to} rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
    </Card>
  );
}

export function ContributorsCard({ count, trend = 'up' }: { count: number; trend?: 'up' | 'down' | 'stable' }) {
  return (
    <KpiCard
      title="Total Contributors"
      value={count.toLocaleString()}
      change={trend === 'up' ? 12 : trend === 'down' ? -5 : 0}
      changeType={trend === 'up' ? 'increase' : trend === 'down' ? 'decrease' : undefined}
      icon={<TeamOutlined />}
      color="blue"
      subtitle="Active family members"
    />
  );
}

export function FullyPaidCard({ count, percentage }: { count: number; percentage: number }) {
  return (
    <KpiCard
      title="Fully Paid"
      value={count.toLocaleString()}
      change={percentage > 80 ? 8 : 2}
      changeType="increase"
      icon={<CheckCircleOutlined />}
      color="green"
      subtitle={`${percentage.toFixed(1)}% of total`}
      percentage={percentage}
    />
  );
}

export function ExpectedTotalCard({ amount, trend = 'stable' }: { amount: number; trend?: 'up' | 'down' | 'stable' }) {
  return (
    <KpiCard
      title="Expected Total"
      value={`Rs. ${amount.toLocaleString()}`}
      change={trend === 'up' ? 15 : trend === 'down' ? -8 : 0}
      changeType={trend === 'up' ? 'increase' : trend === 'down' ? 'decrease' : undefined}
      icon={<TrophyOutlined />}
      color="purple"
      subtitle="Target collection amount"
    />
  );
}

export function CollectedTotalCard({ amount, percentage }: { amount: number; percentage: number }) {
  return (
    <KpiCard
      title="Collected Total"
      value={`Rs. ${amount.toLocaleString()}`}
      change={percentage > 70 ? 12 : 3}
      changeType="increase"
      icon={<WalletOutlined />}
      color="cyan"
      subtitle={`${percentage.toFixed(1)}% collected`}
      percentage={percentage}
    />
  );
}

// Additional KPI Cards for enhanced dashboard
export function OutstandingAmountCard({ amount, trend = 'down' }: { amount: number; trend?: 'up' | 'down' | 'stable' }) {
  return (
    <KpiCard
      title="Outstanding Amount"
      value={`Rs. ${amount.toLocaleString()}`}
      change={trend === 'down' ? 8 : trend === 'up' ? -5 : 0}
      changeType={trend === 'down' ? 'decrease' : trend === 'up' ? 'increase' : undefined}
      icon={<ExclamationCircleOutlined />}
      color="orange"
      subtitle="Remaining to collect"
    />
  );
}

export function CollectionRateCard({ rate, trend = 'up' }: { rate: number; trend?: 'up' | 'down' | 'stable' }) {
  return (
    <KpiCard
      title="Collection Rate"
      value={`${rate.toFixed(1)}%`}
      change={trend === 'up' ? 5 : trend === 'down' ? -2 : 0}
      changeType={trend === 'up' ? 'increase' : trend === 'down' ? 'decrease' : undefined}
      icon={<RiseOutlined />}
      color="green"
      subtitle="Monthly average"
      percentage={rate}
    />
  );
}

export function PendingPaymentsCard({ count, percentage }: { count: number; percentage: number }) {
  return (
    <KpiCard
      title="Pending Payments"
      value={count.toLocaleString()}
      change={percentage > 30 ? -8 : 2}
      changeType={percentage > 30 ? 'decrease' : 'increase'}
      icon={<ClockCircleOutlined />}
      color="red"
      subtitle={`${percentage.toFixed(1)}% pending`}
      percentage={100 - percentage}
    />
  );
}

export function PremiumStatusCard({ isPremium = true }: { isPremium?: boolean }) {
  return (
    <KpiCard
      title="Dashboard Status"
      value={isPremium ? "Premium" : "Standard"}
      icon={<CrownOutlined />}
      color="purple"
      subtitle="Enhanced analytics & insights"
    />
  );
}
