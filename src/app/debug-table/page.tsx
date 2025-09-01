'use client';

import { useState, useEffect } from 'react';
import { CollectionTable } from '@/components/table/CollectionTable';
import { EnrichedRow } from '@/types/sheet';
import { Card, Typography, Button } from 'antd';

const { Title } = Typography;

// Simple test data
const testData: EnrichedRow[] = [
  {
    no: 1,
    familyMembers: "John Doe Family",
    monthlyAmount: 1000,
    months: {
      Jan: 1000, Feb: 1000, Mar: 1000, Apr: 1000, May: 1000, Jun: 1000,
      Jul: 1000, Aug: 1000, Sep: 1000, Oct: 1000, Nov: 1000, Dec: 1000
    },
    collectedYear: 12000,
    expectedYear: 12000,
    paidMonthsCount: 12,
    fullyPaid: true,
    pendingMonths: [],
    status: "Fully Paid"
  },
  {
    no: 2,
    familyMembers: "Jane Smith Family",
    monthlyAmount: 800,
    months: {
      Jan: 800, Feb: 800, Mar: 800, Apr: 800, May: 800, Jun: 800,
      Jul: 800, Aug: 800, Sep: 800, Oct: 800, Nov: 0, Dec: 0
    },
    collectedYear: 8000,
    expectedYear: 9600,
    paidMonthsCount: 10,
    fullyPaid: false,
    pendingMonths: ["Nov", "Dec"],
    status: "Partial"
  },
  {
    no: 3,
    familyMembers: "Bob Johnson Family",
    monthlyAmount: 1200,
    months: {
      Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
      Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0
    },
    collectedYear: 0,
    expectedYear: 14400,
    paidMonthsCount: 0,
    fullyPaid: false,
    pendingMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    status: "Unpaid"
  },
  {
    no: 4,
    familyMembers: "Alice Brown Family",
    monthlyAmount: 1500,
    months: {
      Jan: 1500, Feb: 1500, Mar: 1500, Apr: 1500, May: 1500, Jun: 1500,
      Jul: 1500, Aug: 1500, Sep: 1500, Oct: 1500, Nov: 1500, Dec: 1500
    },
    collectedYear: 18000,
    expectedYear: 18000,
    paidMonthsCount: 12,
    fullyPaid: true,
    pendingMonths: [],
    status: "Fully Paid"
  }
];

export default function DebugTablePage() {
  const [data, setData] = useState<EnrichedRow[]>(testData);

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>Debug Collection Table</Title>
        <p>This page tests the search and filter functionality with simple test data.</p>
        <p>Data count: {data.length} families</p>
        <p>Sample data: {JSON.stringify(data[0]?.familyMembers)}</p>
      </Card>
      
      <CollectionTable data={data} loading={false} />
    </div>
  );
}
