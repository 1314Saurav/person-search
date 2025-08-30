# PersonDash - Modern User Management Dashboard

A beautiful, modern Next.js 15 application for managing user records with a comprehensive dashboard, analytics, and full CRUD operations.

## 🚀 Features

- **📊 Dashboard**: Beautiful tabbed interface with Overview, Analytics, and Management views
- **👥 User Management**: Full CRUD operations for user records
- **📈 Analytics**: Visual charts and statistics about your user base
- **🔍 Advanced Search**: Real-time search with filtering capabilities
- **🗄️ Database**: PostgreSQL with Prisma ORM (Neon cloud ready)
- **🎨 Modern UI**: Beautiful responsive design with Tailwind CSS and shadcn/ui
- **⚡ Performance**: Built with Next.js 15 and React 19

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.0
- **Runtime**: React 19
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Form Handling**: React Hook Form + Zod
- **Charts**: Recharts
- **Icons**: Lucide React

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/1314Saurav/person-search&env=DATABASE_URL)

### Environment Variables

Add this environment variable in Vercel:

```env
# Database
DATABASE_URL="your-neon-postgres-connection-string"
```

## 🏠 Local Development

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Neon account)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/1314Saurav/person-search.git
   cd person-search
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your database connection string.

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see PersonDash in action.

### Manual Vercel Deployment Steps

1. **Connect Repository**: Go to [Vercel](https://vercel.com) and connect your GitHub repository
2. **Configure Environment Variables**:
   - Go to your project settings
   - Add `DATABASE_URL` with your Neon PostgreSQL connection string
3. **Deploy**: Vercel will automatically build and deploy your application

### Troubleshooting Vercel Deployment

If you encounter deployment issues:

1. **Build Errors**: Check the Vercel build logs for specific error messages
2. **Database Connection**: Ensure your Neon database allows connections from Vercel's IP ranges
3. **Environment Variables**: Make sure `DATABASE_URL` is properly set in Vercel
4. **Prisma Issues**: The `postinstall` script automatically runs `prisma generate`

### Vercel Configuration

The project includes optimized Vercel configuration:
- `vercel.json`: Custom build settings for Next.js and Prisma
- `next.config.ts`: Optimized for Vercel deployment
- Automatic Prisma client generation during build

## 📱 Application Features

### Dashboard Overview
- **Quick Stats**: Total users, recent additions, engagement metrics
- **Visual Charts**: User growth trends and analytics
- **Recent Activity**: Latest user registrations and updates

### Analytics View
- **User Statistics**: Comprehensive metrics and insights
- **Growth Charts**: Visual representation of user base growth
- **Engagement Data**: User activity and interaction patterns

### Management View
- **User CRUD**: Create, Read, Update, Delete user records
- **Bulk Operations**: Import/export user data
- **Advanced Filtering**: Search and filter users by various criteria
- **Form Validation**: Real-time validation with error handling

## 🗄️ Database Schema

```sql
-- Users Table
CREATE TABLE users (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT,
  phone       TEXT NOT NULL,
  createdAt   TIMESTAMP DEFAULT NOW(),
  updatedAt   TIMESTAMP DEFAULT NOW()
);
```

## 📁 Project Structure

```
├── app/
│   ├── actions/           # Server actions for CRUD operations
│   ├── api/              # API routes (users)
│   ├── components/       # Application components
│   │   ├── dashboard-view.tsx
│   │   ├── analytics-view.tsx
│   │   ├── management-view.tsx
│   │   └── dashboard-tabs.tsx
│   ├── about/            # About page
│   └── globals.css       # Global styles
├── components/
│   ├── ui/               # shadcn/ui components
│   └── theme-provider.tsx
├── lib/
│   ├── prisma.ts        # Prisma client
│   └── utils.ts         # Utility functions
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Database migrations
```

## 🚦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:seed` - Seed database with sample data

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js 15, React 19, and modern web technologies.

**PersonDash** - Your modern solution for user management and analytics.