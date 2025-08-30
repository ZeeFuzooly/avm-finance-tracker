'use client';

import { useEffect, useRef } from 'react';
import { StatusDistribution } from '@/types/sheet';
import { Card, Typography, Progress, Tag, Tooltip, Space } from 'antd';
import { PieChartOutlined, CheckCircleOutlined, ExclamationCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

interface StatusDonutProps {
  data: StatusDistribution;
}

export function StatusDonut({ data }: StatusDonutProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Ensure minimum size and validate dimensions
    const minDimension = Math.min(centerX, centerY);
    if (minDimension < 50) {
      console.warn('Canvas too small for donut chart');
      return;
    }
    
    const radius = Math.max(30, minDimension - 50);
    const innerRadius = Math.max(15, radius * 0.65);

    const statuses = [
      { key: 'Fully Paid', label: 'Fully Paid', color: '#10b981', bgColor: '#d1fae5' },
      { key: 'Partial', label: 'Partially Paid', color: '#f59e0b', bgColor: '#fef3c7' },
      { key: 'Unpaid', label: 'Unpaid', color: '#ef4444', bgColor: '#fee2e2' },
    ];

    const total = Object.values(data).reduce((sum, val) => sum + val, 0);
    let currentAngle = -Math.PI / 2; // Start from top

    // Draw donut segments with enhanced styling
    statuses.forEach((status) => {
      const value = data[status.key as keyof StatusDistribution] || 0;
      const sliceAngle = (value / total) * 2 * Math.PI;

      if (value > 0) {
        // Draw outer arc with shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
        ctx.closePath();
        ctx.fillStyle = status.color;
        ctx.fill();

        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Add inner highlight effect (only if there's enough space)
        const highlightRadius = Math.max(innerRadius + 5, radius - 15);
        if (highlightRadius > innerRadius && highlightRadius < radius) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, highlightRadius, currentAngle, currentAngle + sliceAngle);
          ctx.arc(centerX, centerY, innerRadius + 5, currentAngle + sliceAngle, currentAngle, true);
          ctx.closePath();
          ctx.fillStyle = status.color;
          ctx.fill();
        }

        // Add gradient overlay (only if there's enough space)
        if (radius > innerRadius + 10) {
          const gradient = ctx.createRadialGradient(centerX, centerY, innerRadius, centerX, centerY, radius);
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
          gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
          gradient.addColorStop(1, 'transparent');

          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
          ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
          ctx.closePath();
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        currentAngle += sliceAngle;
      }
    });

    // Draw center circle with enhanced styling
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    
    // Add border
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Add inner shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;

    // Draw center text with enhanced styling
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 28px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(total.toString(), centerX, centerY - 8);
    
    ctx.fillStyle = '#6b7280';
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText('Total', centerX, centerY + 12);

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

  }, [data]);

  const statuses = [
    { key: 'Fully Paid', label: 'Fully Paid', color: '#10b981', bgColor: '#d1fae5', icon: <CheckCircleOutlined /> },
    { key: 'Partial', label: 'Partially Paid', color: '#f59e0b', bgColor: '#fef3c7', icon: <ClockCircleOutlined /> },
    { key: 'Unpaid', label: 'Unpaid', color: '#ef4444', bgColor: '#fee2e2', icon: <ExclamationCircleOutlined /> },
  ];

  const total = Object.values(data).reduce((sum, val) => sum + val, 0);
  const fullyPaidPercentage = total > 0 ? ((data['Fully Paid'] || 0) / total) * 100 : 0;
  const pendingPercentage = total > 0 ? (((data['Partial'] || 0) + (data['Unpaid'] || 0)) / total) * 100 : 0;

  return (
    <div className="chart-container">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between mb-6">
       
       
      </div>
      
      {/* Enhanced Chart Container */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 border border-green-100">
          <canvas
            ref={canvasRef}
            className="w-80 h-80"
            style={{ maxWidth: '320px', maxHeight: '320px' }}
          />
        </div>
      </div>
      
      {/* Enhanced Legend */}
      <div className="space-y-4">
        {statuses.map((status) => {
          const value = data[status.key as keyof StatusDistribution] || 0;
          const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
          
          return (
            <Card 
              key={status.key} 
              size="small" 
              className="border-0 shadow-sm"
              style={{ backgroundColor: status.bgColor }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: status.color }}>
                    <div className="text-white text-lg">
                      {status.icon}
                    </div>
                  </div>
                  <div>
                    <Text strong style={{ color: '#374151', fontSize: '16px' }}>
                      {status.label}
                    </Text>
                    <div className="text-sm text-gray-600 mt-1">
                      {percentage}% of total
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold" style={{ color: status.color }}>
                    {value}
                  </div>
                  <div className="text-sm text-gray-600">
                    contributors
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      
      {/* Enhanced Summary */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card size="small" className="text-center border-0 shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {data['Fully Paid'] || 0}
            </div>
            <div className="text-sm text-gray-600 mt-1">Fully Paid</div>
            <Progress 
              percent={fullyPaidPercentage} 
              size="small" 
              strokeColor="#10b981"
              showInfo={false}
              style={{ marginTop: '8px' }}
            />
          </Card>
          <Card size="small" className="text-center border-0 shadow-sm">
            <div className="text-2xl font-bold text-orange-600">
              {data['Partial'] || 0}
            </div>
            <div className="text-sm text-gray-600 mt-1">Partially Paid</div>
            <Progress 
              percent={total > 0 ? ((data['Partial'] || 0) / total) * 100 : 0} 
              size="small" 
              strokeColor="#f59e0b"
              showInfo={false}
              style={{ marginTop: '8px' }}
            />
          </Card>
          <Card size="small" className="text-center border-0 shadow-sm">
            <div className="text-2xl font-bold text-red-600">
              {data['Unpaid'] || 0}
            </div>
            <div className="text-sm text-gray-600 mt-1">Unpaid</div>
            <Progress 
              percent={total > 0 ? ((data['Unpaid'] || 0) / total) * 100 : 0} 
              size="small" 
              strokeColor="#ef4444"
              showInfo={false}
              style={{ marginTop: '8px' }}
            />
          </Card>
        </div>
      </div>

      {/* Enhanced Legend */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <Text style={{ fontSize: '12px', color: '#666' }}>Fully Paid</Text>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <Text style={{ fontSize: '12px', color: '#666' }}>Partial</Text>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <Text style={{ fontSize: '12px', color: '#666' }}>Unpaid</Text>
        </div>
      </div>
    </div>
  );
}
