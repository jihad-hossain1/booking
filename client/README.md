# Booking Management System - Frontend

A modern, resource booking management system built with Next.js 15, TypeScript, and Tailwind CSS. This application allows users to book shared resources with conflict detection and calendar visualization.

## 🚀 Features

### Core Functionality
- **Resource Booking**: Book shared resources like conference rooms, projectors, and equipment
- **Conflict Detection**: Automatic detection of booking conflicts with 10-minute buffer zones
- **Calendar View**: Visual calendar interface for viewing and managing bookings
- **Dashboard**: Comprehensive dashboard with filtering capabilities
- **Real-time Updates**: Live data updates using SWR for optimal user experience

## 🛠 Tech Stack

### Frontend Framework
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe development

### State Management & Data Fetching
- **React Context**: Local state management for booking operations
- **SWR**: Data fetching with caching, revalidation, and real-time updates
- **Custom Hooks**: Reusable logic for data operations

### Database & API
- **Prisma**: Type-safe database ORM
- **MongoDB**: Document database for flexible data storage
- **Next.js API Routes**: Serverless API endpoints

## 📁 Project Structure

```
client/
├── app/                          # Next.js App Router
│   ├── api/v1/booking/          # API routes for booking operations
│   ├── book/                    # Booking creation page
│   ├── calendar/                # Calendar view page
│   ├── layout.tsx               # Root layout with header/footer
│   └── page.tsx                 # Dashboard home page
├── components/                   # Reusable UI components
│   ├── shared/                  # Shared components (header, footer)
│   └── ui/                      # Base UI components
├── lib/                         # Utility libraries
│   └── schemas/                 # TypeScript type definitions
├── modules/                     # Feature modules
│   ├── book/                    # Booking creation module
│   ├── calendar/                # Calendar view module
│   └── dashboard/               # Dashboard module
├── prisma/                      # Database schema and client
├── services/                    # API service layer
├── utils/                       # Utility functions
└── public/                      # Static assets
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jihad-hossain1/booking.git
   cd booking/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file:
   ```env
   DATABASE_URL="your-mongodb-connection-string"
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000` Live URL_ADDRESS Live at `https://booking404.vercel.app`


## 📖 Usage Guide

### Creating a Booking

1. Navigate to the "New Booking" button on the dashboard
2. Fill in the booking form:
   - **Resource**: Select from available resources
   - **Date**: Choose the booking date
   - **Start Time**: Set the start time
   - **End Time**: Set the end time
   - **Requested By**: Enter your name
3. Click "Create Booking" to submit

### Viewing Bookings

**Dashboard View**:
- View all bookings in a card format
- Filter by resource type and date
- Delete bookings with confirmation

**Calendar View**:
- Visual calendar interface
- See bookings by day, week

### Filtering and Search

- **Resource Filter**: Filter bookings by specific resources
- **Date Filter**: View bookings for specific dates
- **Combined Filters**: Use multiple filters simultaneously
- **Clear Filters**: Reset all filters to view all bookings

## 🔧 API Endpoints

### Booking Operations

- `GET /api/v1/booking` - Fetch all bookings with optional filters
- `POST /api/v1/booking` - Create a new booking
- `DELETE /api/v1/booking/[id]` - Delete a specific booking

### Query Parameters

- `query`: Filter by resource name
- `date`: Filter by specific date (YYYY-MM-DD)



## 🔒 Business Rules

### Booking Constraints

1. **Minimum Duration**: 15 minutes
2. **Maximum Duration**: 2 hours (120 minutes)
3. **Buffer Time**: 10 minutes before and after each booking
4. **Conflict Prevention**: No overlapping bookings allowed
5. **Required Fields**: All form fields are mandatory

### Available Resources

- Conference Room A
- Conference Room B
- Projector
- Laptop Cart
- Meeting Pod

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```


## 🚀 Deployment

### Build Process

1. **Production Build**
   ```bash
   npm run build
   ```

2. **Environment Variables**
   Ensure all required environment variables are set in production

3. **Database Migration**
   ```bash
   npx prisma generate
   ```

### Deployment Platforms

- **Vercel**:  Next.js applications


### Coding Standards

- Use TypeScript for all new code
- Follow the existing component structure
- Add proper type definitions
- Include error handling
- Write descriptive commit messages

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**