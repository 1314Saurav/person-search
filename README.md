# Person Search App with Authentication

A modern Next.js 15 application with full-stack authentication, database integration, and CRUD operations for managing person records.

## 🚀 Features

- **🔍 Advanced Search**: Search people by name with real-time results
- **🔐 Authentication**: NextAuth.js with Google OAuth and credentials
- **📊 Database**: PostgreSQL with Prisma ORM (Neon database ready)
- **✏️ CRUD Operations**: Create, Read, Update, Delete person records
- **🎨 Modern UI**: Tailwind CSS with shadcn/ui components
- **🌙 Dark Mode**: Theme switching support
- **📱 Responsive**: Mobile-first design
- **⚡ Performance**: Next.js 15 with React 19

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.0
- **Runtime**: React 19
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Authentication**: NextAuth.js v4
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React

## 🚀 Quick Deploy to Vercel

### 1. Fork or Import this Repository

Click the button below to deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/1314Saurav/person-search&env=DATABASE_URL,NEXTAUTH_SECRET,NEXTAUTH_URL,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET)

### 2. Environment Variables

Add these environment variables in Vercel:

```env
# Database
DATABASE_URL="your-neon-postgres-connection-string"

# NextAuth Configuration
NEXTAUTH_URL="https://your-vercel-app.vercel.app"
NEXTAUTH_SECRET="your-random-secret-key"

# Google OAuth (Optional - for Google sign-in)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 3. Database Setup

The app uses Neon PostgreSQL. After deployment:

1. Run database migrations:
   ```bash
   npx prisma migrate deploy
   ```

2. Seed the database (optional):
   ```bash
   npm run db:seed
   ```

### 4. Important Notes for Vercel Deployment

- The app includes a `postinstall` script that runs `prisma generate` to ensure the Prisma client is properly generated during deployment
- Make sure to add your Vercel domain to Google OAuth authorized redirect URIs: `https://your-app.vercel.app/api/auth/callback/google`
- After deployment, you may need to run migrations manually if not using Prisma Migrate in production

## 🏠 Local Development

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (or Neon account)
- Google OAuth credentials (optional)

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
   Fill in your database and auth credentials.

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

Visit `http://localhost:3000` to see the app.

## 📖 How to Use

### Authentication

1. **Sign In**: Click "Sign In" in the navbar
2. **Google OAuth**: Use "Continue with Google" button
3. **Credentials**: Use any email/password (demo mode)

### Managing People

1. **Search**: Type in the search box to find people
2. **Add**: Click "Add User" to create new records
3. **Edit**: Click "Edit" on any user card to modify details
4. **Delete**: Click "Delete" to remove records

## 🗄️ Database Schema

### Users Table (App Data)
```sql
CREATE TABLE users (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT,
  phoneNumber TEXT NOT NULL,
  createdAt   TIMESTAMP DEFAULT NOW(),
  updatedAt   TIMESTAMP DEFAULT NOW()
);
```

### Auth Tables (NextAuth.js)
- `auth_users` - Authentication user records
- `Account` - OAuth account linking
- `Session` - User sessions
- `VerificationToken` - Email verification tokens

## 🔧 Configuration

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://your-domain.vercel.app/api/auth/callback/google` (production)

### Database Migration

For production deployment:
```bash
npx prisma migrate deploy
```

For development:
```bash
npx prisma migrate dev --name your-migration-name
```

## 📁 Project Structure

```
├── app/
│   ├── actions/           # Server actions
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   ├── components/       # App-specific components
│   └── globals.css       # Global styles
├── components/
│   ├── ui/               # shadcn/ui components
│   └── auth-provider.tsx # Auth context provider
├── lib/
│   ├── auth.ts          # NextAuth configuration
│   ├── prisma.ts        # Prisma client
│   └── utils.ts         # Utility functions
├── prisma/
│   ├── schema.prisma    # Database schema
│   ├── migrations/      # Database migrations
│   └── seed.ts         # Database seeding
└── types/
    └── next-auth.d.ts   # NextAuth type definitions
```

## 🚦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:seed` - Seed database with sample data

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection**: Ensure your `DATABASE_URL` is correct
2. **Auth Errors**: Check `NEXTAUTH_SECRET` and `NEXTAUTH_URL`
3. **Google OAuth**: Verify redirect URIs in Google Console
4. **Build Errors**: Run `npm run build` locally first

### Getting Help

- Check the [Next.js documentation](https://nextjs.org/docs)
- Visit [NextAuth.js docs](https://next-auth.js.org/)
- Review [Prisma documentation](https://prisma.io/docs)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js 15, React 19, and modern web technologies.

## Technologies Used

- **Next.js 15.1** - React framework for building modern web applications
- **React 19** - Latest React version with concurrent rendering improvements
- **TypeScript** - Strongly-typed superset of JavaScript
- **Node.js 20.17.0** - Required for compatibility with Next.js 15.1
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Collection of accessible, unstyled UI components
- **React Hook Form** - Performant and flexible forms library
- **Zod** - TypeScript-first schema declaration and validation library
- **React Select** - Flexible Select Input control for React
- **Sonner** - Lightweight toast notifications for React

### Minimum Node.js Version

The application has been tested with **Node.js 20.17.0**. Features such as ECMAScript modules and async server components require Node.js 20 or newer, making this the minimum requirement.

## Getting Started

### Prerequisites

- Node.js 20.17.0 or newer
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/gocallum/person-search.git
   cd person-search
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add any necessary environment variables.

### Running the Development Server

```bash
npm run dev
```

## How It Works (Next.js 15.1 & React 19)

### Key Changes in `UserSearch` Component

1. **Server Component Design**:
   - The `user-search` component is now a **Server Component**, leveraging `searchParams` and fetching user details server-side.
   - `searchParams` are asynchronous in Next.js 15.1, so the `user-search` component resolves them before rendering.

   ```tsx
   export default async function UserSearch({ searchParams }: { searchParams: Promise<{ userId?: string }> }) {
     const resolvedSearchParams = await searchParams;
     const selectedUserId = resolvedSearchParams?.userId || null;
     const user = selectedUserId ? await getUserById(selectedUserId) : null;

     return (
       <div className="space-y-6">
         <SearchInput />
         {selectedUserId && (
           <Suspense fallback={<p>Loading user...</p>}>
             {user ? <UserCard user={user} /> : <p>User not found</p>}
           </Suspense>
         )}
       </div>
     );
   }
   ```

2. **Improved Performance**:
   - Data fetching has been optimized to avoid redundant calls. The user object is fetched once in `user-search` and passed as a prop to child components like `UserCard` and `DeleteButton`.
   - This eliminates multiple fetches, improving performance and reducing server load.

3. **Interaction with `SearchInput`**:
   - `SearchInput` remains a **Client Component**, responsible for interacting with the user through `react-select`'s `AsyncSelect`.
   - When a user is selected, the URL is updated with the user's ID using `window.history.pushState`. This triggers a re-render of `user-search` to reflect the updated state.

4. **Improved Error Handling**:
   - Validations and controlled/uncontrolled input warnings have been resolved by ensuring consistent handling in forms using React Hook Form and Zod.

5. **Concurrency & Hydration**:
   - React 19's concurrent rendering and Next.js 15.1's support for server components ensure seamless server-client hydration, reducing potential mismatches.

### Known Issues

1. **Toast Messages**:
   - Notifications in `DeleteButton` and `MutableDialog` are currently not showing. This requires debugging the integration of the `Sonner` toast library.

2. **Theme Support**:
   - The `theme-provider` for managing dark and light modes has been removed temporarily. The Tailwind stylesheets need to be updated to align with the new Next.js configuration.

3. **Hydration Warnings**:
   - Some hydration warnings may occur due to external browser extensions like Grammarly or differences in runtime environments. Suppression flags have been added, but further testing is recommended.

---

### Updated Project Structure

```
person-search/
├── app/
│   ├── components/
│   │   ├── user-search.tsx
│   │   ├── search-input.tsx
│   │   ├── user-card.tsx
│   │   ├── user-dialog.tsx
│   │   └── user-form.tsx
│   ├── actions/
│   │   ├── actions.ts
│   │   └── schemas.ts
│   └── page.tsx
├── public/
├── .eslintrc.json
├── next.config.js
├── package.json
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

### Using `MutableDialog`

The `MutableDialog` component is a reusable dialog framework that can be used for both "Add" and "Edit" operations. It integrates form validation with Zod and React Hook Form, and supports passing default values for edit operations.

#### How `MutableDialog` Works

`MutableDialog` accepts the following props:
- **`formSchema`**: A Zod schema defining the validation rules for the form.
- **`FormComponent`**: A React component responsible for rendering the form fields.
- **`action`**: A function to handle the form submission (e.g., adding or updating a user).
- **`defaultValues`**: Initial values for the form fields, used for editing existing data.
- **`triggerButtonLabel`**: Label for the button that triggers the dialog.
- **`addDialogTitle` / `editDialogTitle`**: Titles for the "Add" and "Edit" modes.
- **`dialogDescription`**: Description displayed inside the dialog.
- **`submitButtonLabel`**: Label for the submit button.

#### Example: Add Operation

To use `MutableDialog` for adding a new user:

```tsx
import { MutableDialog } from './components/mutable-dialog';
import { userFormSchema, UserFormData } from './actions/schemas';
import { addUser } from './actions/actions';
import { UserForm } from './components/user-form';

export function UserAddDialog() {
  const handleAddUser = async (data: UserFormData) => {
    try {
      const newUser = await addUser(data);
      return {
        success: true,
        message: `User ${newUser.name} added successfully`,
        data: newUser,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to add user: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  };

  return (
    <MutableDialog<UserFormData>
      formSchema={userFormSchema}
      FormComponent={UserForm}
      action={handleAddUser}
      triggerButtonLabel="Add User"
      addDialogTitle="Add New User"
      dialogDescription="Fill out the form below to add a new user."
      submitButtonLabel="Save"
    />
  );
}
```

#### Example: Edit Operation

To use `MutableDialog` for editing an existing user:

```tsx
import { MutableDialog } from './components/mutable-dialog';
import { userFormSchema, UserFormData } from './actions/schemas';
import { updateUser } from './actions/actions';
import { UserForm } from './components/user-form';

export function UserEditDialog({ user }: { user: UserFormData }) {
  const handleUpdateUser = async (data: UserFormData) => {
    try {
      const updatedUser = await updateUser(user.id, data);
      return {
        success: true,
        message: `User ${updatedUser.name} updated successfully`,
        data: updatedUser,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to update user: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  };

  return (
    <MutableDialog<UserFormData>
      formSchema={userFormSchema}
      FormComponent={UserForm}
      action={handleUpdateUser}
      defaultValues={user} // Pre-fill form fields with user data
      triggerButtonLabel="Edit User"
      editDialogTitle="Edit User Details"
      dialogDescription="Modify the details below and click save to update the user."
      submitButtonLabel="Update"
    />
  );
}
```

### Note: Future Refactoring for `ActionState` with React 19

The `MutableDialog` component currently uses a custom `ActionState` type to handle the result of form submissions. However, React 19 introduces built-in support for `ActionState` in Server Actions, which can simplify this implementation. 

#### Improvements to Make:
- Replace the custom `ActionState` interface with React 19's built-in `ActionState`.
- Use the `ActionState` directly within the form submission logic to align with React 19 best practices.
- Refactor error handling and success notifications to leverage React's server-side error handling.

This will be addressed in a future update to ensure the `MutableDialog` component remains aligned with React 19's capabilities.

## Contributing

Contributions are welcome! Please submit a Pull Request with your changes.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Next.js team for the framework
- Radix UI for accessible components
- All contributors of the open-source libraries used in this project

## Contact

Callum Bir - [@callumbir](https://twitter.com/callumbir)  
Project Link: [https://github.com/gocallum/person-search](https://github.com/gocallum/person-search)  

