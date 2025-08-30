'use client';

import { useEffect, useRef, useState } from 'react';
import { MonthlyTotals } from '@/types/sheet';
import { Card, Typography } from 'antd';


const { Text } = Typography;

interface MonthlyColumnChartProps {
  data: MonthlyTotals;
}

export function MonthlyColumnChart({ data }: MonthlyColumnChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with responsive scaling
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const months = Object.keys(data);
    const values = Object.values(data);
    
    // Validate and sanitize values
    const sanitizedValues = values.map(val => {
      const num = Number(val);
      return isFinite(num) && !isNaN(num) ? num : 0;
    });
    
    const maxValue = Math.max(...sanitizedValues, 1);
    
    // Responsive padding and sizing
    const padding = isMobile ? 40 : 60;
    const chartWidth = rect.width - padding * 2;
    const chartHeight = rect.height - padding * 2;
    const barWidth = Math.max(20, chartWidth / months.length * 0.7); // Increased minimum bar width for full width
    const barSpacing = Math.max(12, chartWidth / months.length * 0.3);

    // Responsive font sizes
    const titleFontSize = isMobile ? '16px' : '18px';
    const valueFontSize = isMobile ? '12px' : '14px';
    const monthFontSize = isMobile ? '11px' : '13px';

    // Draw background grid
    ctx.strokeStyle = 'rgba(102, 126, 234, 0.1)';
    ctx.lineWidth = 1;
    const gridLines = isMobile ? 4 : 6;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding + (chartHeight / gridLines) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + chartWidth, y);
      ctx.stroke();
    }

    // Draw vertical grid lines
    for (let i = 0; i <= months.length; i++) {
      const x = padding + i * (barWidth + barSpacing);
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, padding + chartHeight);
      ctx.stroke();
    }

    // Draw bars with enhanced styling
    months.forEach((month, index) => {
      const value = sanitizedValues[index];
      const barHeight = Math.max(0, ((value || 0) / maxValue) * chartHeight);
      const x = padding + index * (barWidth + barSpacing) + barSpacing / 2;
      const y = padding + chartHeight - barHeight;

      // Validate coordinates
      if (!isFinite(x) || !isFinite(y) || !isFinite(barHeight) || barHeight < 0) {
        console.warn(`Invalid chart coordinates for ${month}: x=${x}, y=${y}, barHeight=${barHeight}`);
        return;
      }

      // Create enhanced gradient
      const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
      gradient.addColorStop(0, '#667eea');
      gradient.addColorStop(0.5, '#764ba2');
      gradient.addColorStop(1, '#5a6fd8');

      // Draw bar with shadow effect
      ctx.shadowColor = 'rgba(102, 126, 234, 0.3)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 4;

      // Draw main bar
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Add highlight effect
      const highlightGradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
      highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      highlightGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
      highlightGradient.addColorStop(1, 'transparent');

      ctx.fillStyle = highlightGradient;
      ctx.fillRect(x, y, barWidth * 0.3, barHeight);

      // Draw value on top (only if bar is tall enough)
      if (barHeight > 25) {
        ctx.fillStyle = '#374151';
        ctx.font = `bold ${valueFontSize} Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(
          `Rs. ${(value || 0).toLocaleString()}`,
          x + barWidth / 2,
          y - 10
        );
      }

      // Draw month label with enhanced styling
      ctx.fillStyle = '#6b7280';
      ctx.font = `${monthFontSize} Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(
        month,
        x + barWidth / 2,
        padding + chartHeight + (isMobile ? 20 : 25)
      );
    });

    // Draw title with enhanced styling
    ctx.fillStyle = '#374151';
    ctx.font = `bold ${titleFontSize} Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('Monthly Collections', rect.width / 2, isMobile ? 15 : 25);

  }, [data, isMobile]);

  const totalCollected = Object.values(data).reduce((sum, val) => sum + (Number(val) || 0), 0);
  const averageMonthly = totalCollected / Object.values(data).length;
  const highestMonth = Math.max(...Object.values(data).map(val => Number(val) || 0));

  return (
    <div className="chart-container">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
       
          {/* <Text type="secondary" style={{ fontSize: '14px' }}>
            Total amount collected per month with trend analysis
          </Text> */}
        {/* </div> */}
        {/* <div className="flex items-center gap-3">
          <Tooltip title="Total months tracked">
            <Tag color="blue" icon={<CalendarOutlined />}>
              {Object.keys(data).length} Months
            </Tag>
          </Tooltip>
          <Tooltip title="Collection trend">
            <Tag color="green">
              Active
            </Tag>
          </Tooltip>
        </div> */}
      </div>
      
      {/* Enhanced Chart Container */}
      <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
        <canvas
          ref={canvasRef}
          className="w-full h-96 sm:h-[500px]"
          style={{ 
            maxHeight: isMobile ? '384px' : '500px',
            touchAction: 'none'
          }}
        />
      </div>
      
      {/* Enhanced Summary Stats */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
        <Card size="small" className="text-center border-0 shadow-sm">
          <div className="text-2xl sm:text-3xl font-bold text-blue-600">
            Rs. {totalCollected.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 mt-1">Total Collected</div>
          <div className="text-xs text-gray-500 mt-1">
            Across {Object.keys(data).length} months
          </div>
        </Card>
        
        <Card size="small" className="text-center border-0 shadow-sm">
          <div className="text-2xl sm:text-3xl font-bold text-purple-600">
            Rs. {highestMonth.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 mt-1">Highest Month</div>
          <div className="text-xs text-gray-500 mt-1">
            Peak collection period
          </div>
        </Card>
        
        <Card size="small" className="text-center border-0 shadow-sm">
          <div className="text-2xl sm:text-3xl font-bold text-green-600">
            Rs. {averageMonthly.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 mt-1">Monthly Average</div>
          <div className="text-xs text-gray-500 mt-1">
            Consistent performance
          </div>
        </Card>
      </div>

      {/* Enhanced Legend */}
      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
          <Text style={{ fontSize: '12px', color: '#666' }}>Collection Amount</Text>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-100 rounded border border-blue-200"></div>
          <Text style={{ fontSize: '12px', color: '#666' }}>Grid Lines</Text>
        </div>
      </div>
    </div>
  );
}
