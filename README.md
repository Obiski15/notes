# Notes App

A full-stack note-taking application built with Next.js, featuring rich text editing and authentication.

## ✨ Features

- **Rich Text Editor** - Powered by TipTap with support for:
  - Multiple heading levels
  - Text formatting (bold, italic, underline)
  - Color highlighting
  - Code blocks with syntax highlighting
  - Image uploads
  - Links
  - Text alignment
- **Authentication** - Secure user authentication with NextAuth.js supporting:
  - Email/password authentication
  - Google OAuth
  - Password reset functionality
- **Organization** - Keep your notes organized with:
  - Folders
  - Favorites
  - Archive
  - Trash
  - Recent notes
- **Modern UI** - Clean, responsive interface with:
  - Dark theme
  - Smooth transitions
  - Consistent design system
  - Mobile-responsive layout
- **Data Management** - Local-first approach with IndexedDB for offline support

## 🚀 Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + shadcn/ui
- **Editor:** TipTap
- **Authentication:** NextAuth.js
- **State Management:** TanStack Query
- **Database:** MongoDB with Mongoose
- **Local Storage:** IndexedDB 
- **Form Validation:** Zod + React Hook Form

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd notes
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in the required environment variables:

**General:**
- `NODE_ENV` - Environment (`development`, `production`)
- `NEXT_PUBLIC_BASE_URL` - Your app URL (e.g., `http://localhost:3000`)

**MongoDB:**
- `MONGO_URI` - MongoDB connection string
- `MONGO_PASSWORD` - MongoDB password

**JWT:**
- `JWT_SECRET` - Secret key for JWT token generation
- `REFRESH_TOKEN_EXPIRES_IN` - Refresh token expiration (default: `4w`)
- `ACCESS_TOKEN_EXPIRES_IN` - Access token expiration (default: `60m`)

**Email (MailTrap for development):**
- `MAILTRAP_USER` - MailTrap username
- `MAILTRAP_PASS` - MailTrap password

**Google OAuth & Email:**
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `GOOGLE_MAIL` - Gmail address for sending emails
- `GOOGLE_PASS` - Gmail app password

**Upstash Redis:**
- `UPSTASH_REDIS_REST_URL` - Upstash Redis REST URL
- `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis REST token

**NextAuth:**
- `NEXTAUTH_URL` - NextAuth URL (same as `NEXT_PUBLIC_BASE_URL`)

4. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🛠️ Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm check-types` - Run TypeScript type checking
- `pnpm shad` - Add shadcn/ui components

## 📁 Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── auth/        # Authentication components
│   ├── editor/      # Text editor components
│   ├── header/      # Header components
│   ├── notes/       # Note list components
│   ├── sidebar/     # Sidebar components
│   ├── tiptap-*/    # TipTap editor extensions
│   └── ui/          # shadcn/ui components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── models/          # Mongoose models
├── providers/       # React context providers
├── schema/          # Zod validation schemas
├── services/        # API service layer
└── styles/          # Global styles and SCSS
```

## 🎨 Design System

The app uses a consistent design system with:
- **Color Palette:** Purple primary, neutral grays, semantic colors
- **Typography:** Source Sans 3, Kaushan Script (logo)
- **Spacing:** Consistent spacing scale
- **Components:** Reusable UI components from shadcn/ui
- **States:** Hover, active, focus, and disabled states

## 🔒 Authentication Flow

1. User registers with email/password or Google OAuth
2. Email verification (for email/password)
3. Login with credentials
4. Password reset via email link
5. Protected routes for authenticated users

## 📝 Note Management

- Create notes with rich text content
- Organize notes into custom folders
- Mark notes as favorites
- Archive old notes
- Move notes to trash (soft delete)
- View recent notes
- Search and filter notes

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [TipTap Documentation](https://tiptap.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
