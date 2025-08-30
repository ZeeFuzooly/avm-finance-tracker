import { RawRow } from '@/types/sheet';

export function getMockSheetData(): RawRow[] {
  return [
    {
      no: 1,
      familyMembers: "John Doe Family",
      monthlyAmount: 1000,
      months: {
        Jan: 1000,
        Feb: 1000,
        Mar: 1000,
        Apr: 1000,
        May: 1000,
        Jun: 1000,
        Jul: 1000,
        Aug: 1000,
        Sep: 1000,
        Oct: 1000,
        Nov: 1000,
        Dec: 1000
      },
      totalYear: 12000
    },
    {
      no: 2,
      familyMembers: "Jane Smith Family",
      monthlyAmount: 800,
      months: {
        Jan: 800,
        Feb: 800,
        Mar: 800,
        Apr: 800,
        May: 800,
        Jun: 800,
        Jul: 800,
        Aug: 800,
        Sep: 800,
        Oct: 800,
        Nov: 800,
        Dec: 800
      },
      totalYear: 9600
    },
    {
      no: 3,
      familyMembers: "Bob Johnson Family",
      monthlyAmount: 1200,
      months: {
        Jan: 1200,
        Feb: 1200,
        Mar: 1200,
        Apr: 1200,
        May: 1200,
        Jun: 1200,
        Jul: 1200,
        Aug: 1200,
        Sep: 1200,
        Oct: 1200,
        Nov: 1200,
        Dec: 1200
      },
      totalYear: 14400
    }
  ];
}
