'use client';

import { Layout, Typography, Space, Button, Menu, Dropdown, Avatar, Badge } from 'antd';
import { 
  HomeOutlined, 
  TableOutlined, 
  BarChartOutlined,
  MenuOutlined,
  MobileOutlined,
  TabletOutlined,
  DesktopOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  CrownOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;

export function Header() {
  const pathname = usePathname();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Dashboard',
      href: '/'
    },
    {
      key: '/table',
      icon: <TableOutlined />,
      label: 'Collection Table',
      href: '/table'
    }
  ];

  const mobileMenu = (
    <Menu
      mode="vertical"
      selectedKeys={[pathname]}
      items={menuItems.map(item => ({
        key: item.key,
        icon: item.icon,
        label: (
          <Link href={item.href} style={{ color: '#666', textDecoration: 'none' }}>
            {item.label}
          </Link>
        )
      }))}
    />
  );

  return (
    <AntHeader className="premium-header">
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        height: '100%',
        padding: '0 24px'
      }}>
        {/* Premium Logo and Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
          }}>
            <CrownOutlined style={{ fontSize: '24px', color: 'white' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Title level={3} style={{ 
              margin: 0, 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: '20px',
              fontWeight: 'bold'
            }}>
              AVM Financial Tracker
            </Title>
            <Text style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>
              Professional Dashboard
            </Text>
          </div>
        </div>

        {/* Premium Desktop Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Space size="middle">
            {menuItems.map(item => (
              <Link key={item.key} href={item.href}>
                <Button
                  type={pathname === item.key ? 'primary' : 'default'}
                  icon={item.icon}
                  size="large"
                  style={{
                    borderRadius: '8px',
                    fontWeight: '500',
                    ...(pathname === item.key ? {
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      color: 'white'
                    } : {
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#666'
                    })
                  }}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </Space>

          {/* Premium Right Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Device Indicator */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              padding: '8px 12px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <MobileOutlined style={{ color: '#666', fontSize: '12px' }} />
              <TabletOutlined style={{ color: '#666', fontSize: '12px' }} />
              <DesktopOutlined style={{ color: '#666', fontSize: '12px' }} />
            </div>

            {/* Premium Notifications */}
            <div style={{ position: 'relative' }}>
              <Button
                type="text"
                icon={<BellOutlined />}
                size="large"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#666'
                }}
              />
              <Badge count={3} style={{ 
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }} />
            </div>

            {/* Premium User Menu */}
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'profile',
                    icon: <UserOutlined />,
                    label: 'Profile Settings'
                  },
                  {
                    key: 'settings',
                    icon: <SettingOutlined />,
                    label: 'App Settings'
                  },
                  {
                    type: 'divider'
                  },
                  {
                    key: 'logout',
                    label: 'Sign Out',
                    danger: true
                  }
                ]
              }}
              trigger={['click']}
              placement="bottomRight"
            >
              <div style={{ cursor: 'pointer' }}>
                <Avatar
                  size="large"
                  icon={<UserOutlined />}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </div>
            </Dropdown>

            {/* Mobile Navigation */}
            <div style={{ display: 'none', '@media (max-width: 768px)': { display: 'block' } }}>
              <Dropdown
                menu={{ items: mobileMenu.props.items }}
                trigger={['click']}
                placement="bottomRight"
              >
                <Button
                  type="text"
                  icon={<MenuOutlined />}
                  size="large"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#666'
                  }}
                />
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </AntHeader>
  );
}
