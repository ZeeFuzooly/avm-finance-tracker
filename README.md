# 🏦 AVM Financial Tracker

A professional financial collection management system built with Next.js, TypeScript, and Ant Design. This application helps track and manage family fund collections with real-time data visualization and comprehensive reporting.

## ✨ Features

### 📊 **Dashboard Analytics**
- **Real-time KPI Cards**: Total contributors, fully paid families, expected vs collected amounts
- **Interactive Charts**: Monthly collection trends and payment status distribution
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices

### 💰 **Financial Balance Tracking**
- **Cash on Hand Breakdown**: Detailed tracking of all funds
  - Existing Balance (2024): Rs. 27,726.57
  - Art Competition Balance (2025): Rs. 5,100.00
  - Monthly Collection Balance: Rs. 52,200.00
  - Account Opening Balance: Rs. 1,000.00
  - Sadaka: Rs. 18,000.00
  - Total Collection in Hand: Rs. 104,026.57

### 📈 **Collection Management**
- **Monthly Collection Summary**: Month-by-month breakdown for 2025
- **Payment Status Tracking**: Fully paid, partial, and unpaid contributors
- **Progress Monitoring**: Visual progress bars and completion rates

### 🔧 **Technical Features**
- **Google Sheets Integration**: Real-time data fetching from Google Sheets
- **API Endpoints**: RESTful APIs for financial data
- **TypeScript**: Full type safety and better development experience
- **Ant Design**: Professional UI components and responsive design

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ZeeFuzooly/avm-finance-tracker.git
   cd avm-finance-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
avm-financial-tracker/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── financial-balance/    # Financial balance API
│   │   │   ├── financial-summary/    # Financial summary API
│   │   │   └── sheet-data/           # Google Sheets data API
│   │   ├── table/             # Table view page
│   │   ├── test-api/          # API testing page
│   │   └── test-financial-balance/   # Financial balance test page
│   ├── components/            # React components
│   │   ├── charts/           # Chart components
│   │   ├── dashboard/        # Dashboard components
│   │   ├── table/            # Table components
│   │   └── ui/               # UI components
│   ├── lib/                  # Utility libraries
│   │   ├── sheet/           # Google Sheets integration
│   │   └── data.ts          # Data processing utilities
│   └── types/               # TypeScript type definitions
├── public/                  # Static assets
└── package.json            # Project dependencies
```

## 🔗 API Endpoints

### Financial Balance API
- **GET** `/api/financial-balance` - Returns financial balance data
- **Response**: JSON with cash on hand breakdown

### Financial Summary API
- **GET** `/api/financial-summary` - Returns financial summary data
- **Response**: JSON with monthly collections and expected totals

### Sheet Data API
- **GET** `/api/sheet-data` - Returns raw Google Sheets data
- **Response**: JSON with parsed sheet data

## 🎨 UI Components

### Dashboard Features
- **KPI Cards**: Real-time statistics with progress indicators
- **Cash on Hand Section**: Detailed breakdown of all funds
- **Monthly Collection Summary**: Month-by-month collection data
- **Interactive Charts**: Visual data representation
- **Responsive Layout**: Mobile-first design approach

### Table View
- **Sortable Columns**: Click to sort by any column
- **Search Functionality**: Filter data by family names
- **Status Indicators**: Visual payment status badges
- **Export Options**: Download data in various formats

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode

# Linting & Formatting
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google Sheets Configuration
GOOGLE_SHEETS_ID=your_sheet_id_here
GOOGLE_SHEETS_NAME=your_sheet_name_here

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"

2. **Import Repository**
   - Select the `avm-finance-tracker` repository
   - Vercel will automatically detect it's a Next.js project

3. **Configure Environment Variables**
   - Add your Google Sheets configuration
   - Set any other required environment variables

4. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-project.vercel.app`

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm run start
```

## 📊 Data Sources

The application fetches data from Google Sheets:
- **Sheet ID**: `1WhSc3ogSSTlSfvp7HlJLPZ4fiKFEyhUDSRhAwz8Cm8w`
- **Sheet Name**: `MONTHLY COLLECTION AVM`

### Data Structure
- Family member information
- Monthly payment amounts
- Payment status tracking
- Financial balance data

## 🎯 Key Features

### Financial Tracking
- ✅ Real-time balance updates
- ✅ Monthly collection tracking
- ✅ Payment status monitoring
- ✅ Progress visualization

### User Experience
- ✅ Responsive design
- ✅ Mobile optimization
- ✅ Fast loading times
- ✅ Intuitive navigation

### Data Management
- ✅ Google Sheets integration
- ✅ API endpoints
- ✅ Data validation
- ✅ Error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** - React framework
- **Ant Design** - UI component library
- **TypeScript** - Type safety
- **Google Sheets API** - Data source
- **Vercel** - Deployment platform

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

**Built with ❤️ for AVM Family Fund Management**
