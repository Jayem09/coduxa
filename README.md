# 🚀 Coduxa - Programming Certification Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-https://coduxa.vercel.app-blue?style=for-the-badge&logo=vercel)](https://coduxa.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-95.3%25-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-purple?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)](https://supabase.com/)

> **Master Programming Skills • Get Certified • Showcase Your Expertise**

Coduxa is a comprehensive programming certification platform that allows developers to take skill-based exams, earn certificates, and showcase their programming expertise to employers worldwide.

## ✨ Features

### 🎯 **Core Platform**

- **Interactive Programming Exams** - Take comprehensive coding challenges
- **Digital Certificates** - Earn verifiable certificates upon completion
- **Real-time Leaderboard** - Compete with developers globally
- **Progress Tracking** - Monitor your learning journey
- **Admin Dashboard** - Manage exams, users, and analytics

### 🛠 **Technical Features**

- **Modern Tech Stack** - React 18, TypeScript, Vite, Tailwind CSS
- **Real-time Database** - Supabase integration for data persistence
- **Responsive Design** - Mobile-first approach with clean UI
- **SEO Optimized** - Complete meta tags, sitemap, and structured data
- **Performance Optimized** - Lazy loading, code splitting, and caching

### 📚 **Available Certifications**

- **JavaScript Fundamentals** - ES6+, DOM manipulation, async programming
- **React Development** - Hooks, components, state management
- **Node.js Backend** - APIs, databases, server-side development
- **And more coming soon...**

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Jayem09/coduxa.git
   cd coduxa/coduxa-platform
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   # Create .env file with your Supabase credentials
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🏗 Project Structure

```
coduxa-platform/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── auth/            # Authentication components
│   │   ├── exam/            # Exam-related components
│   │   ├── certificate/     # Certificate generation
│   │   ├── ui/              # Base UI components (Radix UI)
│   │   └── pages/           # Page components
│   ├── backend/             # Admin and dashboard pages
│   │   ├── pages/           # Admin dashboard, certifications
│   │   └── components/      # Admin-specific components
│   ├── services/            # Business logic and API calls
│   ├── server/              # Express.js backend server
│   └── utils/               # Utility functions
├── public/                  # Static assets
├── dist/                    # Production build
└── vercel.json             # Deployment configuration
```

## 🛠 Tech Stack

### **Frontend**

- **React 18.3.1** - UI library with hooks and context
- **TypeScript 5.8.3** - Type-safe development
- **Vite 7.1.2** - Fast build tool and dev server
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **React Router 7.8.2** - Client-side routing

### **Backend & Database**

- **Supabase** - Backend-as-a-Service (Auth, Database, Storage)
- **Express.js** - Node.js server for API endpoints
- **PostgreSQL** - Relational database via Supabase

### **UI/UX Libraries**

- **Lucide React** - Beautiful icon library
- **Recharts** - Data visualization
- **React Hook Form** - Form management
- **Sonner** - Toast notifications

### **Development Tools**

- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Vercel** - Deployment platform

## 📱 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Server
npm run server       # Start Express.js server
```

## 🌐 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🔧 Configuration

### Environment Variables

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Server Configuration (for Express.js)
PORT=3000
NODE_ENV=production
```

### Database Setup

1. Create a new Supabase project
2. Run the database migrations (if any)
3. Set up Row Level Security (RLS) policies
4. Configure authentication settings

## 🎨 UI Components

The platform uses a comprehensive design system built on:

- **Radix UI Primitives** - Accessible, unstyled components
- **Tailwind CSS** - Utility-first styling
- **Custom Components** - Platform-specific UI elements
- **Responsive Design** - Mobile-first approach

## 📊 Features Overview

### **For Students**

- Take programming certification exams
- Earn digital certificates
- Track progress and achievements
- Compete on global leaderboards
- Access learning resources

### **For Administrators**

- Manage exam content and questions
- Monitor user progress and analytics
- Handle certificate generation
- Manage user accounts and permissions

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** - For providing an excellent backend platform
- **Radix UI** - For accessible component primitives
- **Vercel** - For seamless deployment experience
- **React Community** - For the amazing ecosystem

## 📞 Support

- **Live Demo**: [https://coduxa.vercel.app](https://coduxa.vercel.app)
- **Issues**: [GitHub Issues](https://github.com/Jayem09/coduxa/issues)
- **Email**: johndinglasan12@gmail.com

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by Johnmark Dinglasan

</div>
