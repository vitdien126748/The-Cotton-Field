# 🌾 The Cotton Field - Task Management System

A modern, role-based task management web application built with React, TypeScript, and Tailwind CSS. Features beautiful UI design with glassmorphism effects and comprehensive access control.

## ✨ Features

### 🔐 **Authentication & Authorization**

- JWT-based authentication with refresh token support
- Role-based access control (RBAC)
- Automatic token refresh and session management
- Secure logout with token cleanup

### 👥 **User Management**

- Create, view, edit, and manage users
- Role assignment and removal
- User profile management with full name and email
- Beautiful user cards with avatar initials
- Responsive user table with search and filtering

### 🛡️ **Role Management**

- Create and manage custom roles
- Role-based permissions system
- Dynamic role assignment to users
- Role descriptions and metadata

### 📋 **Task Management**

- Create, update, and delete tasks
- Task status tracking (Pending, In Progress, Completed)
- Priority levels (Low, Medium, High, Critical)
- Task assignment to team members
- Personal task view (My Tasks)
- Administrative task overview
- Task filtering and search functionality

### 🎨 **Modern UI/UX**

- Beautiful gradient designs with glassmorphism effects
- Responsive design for all screen sizes
- Professional form validation with error handling
- Loading states and skeleton screens
- Smooth animations and transitions
- Heroicons for consistent iconography

### 🔒 **Security Features**

- Page-level access control
- Action-level permissions
- Role-based navigation filtering
- Access denied pages with clear messaging
- Secure API communication with automatic token handling

## 🚀 Technology Stack

### **Frontend**

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing with role-based protection
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Beautiful SVG icons
- **React Hook Form** - Performant form handling
- **Yup** - Schema validation
- **Zustand** - Lightweight state management

### **Backend Integration**

- **Axios** - HTTP client with interceptors
- **JWT Authentication** - Secure token-based authentication
- **Automatic Token Refresh** - Seamless session management

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or pnpm
- Access to the backend API server

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/vitdien126748/The-Cotton-Field.git
   cd The-Cotton-Field
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Configuration**
   The app is configured to connect to `https://server.aptech.io` by default.
   Update the API URL in `src/TaskManagement/lib/apiClient.ts` if needed.

4. **Start development server**

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/TaskManagement/
├── components/           # Reusable UI components
├── context/             # React Context providers
├── lib/                 # Utilities and API client
│   └── apiClient.ts     # Axios configuration with interceptors
├── pages/               # Page components
│   ├── Dashboard.tsx    # Main dashboard
│   ├── Tasks.tsx        # Task management (admin)
│   ├── MyTasks.tsx      # Personal tasks
│   ├── Users.tsx        # User management
│   ├── Roles.tsx        # Role management
│   ├── Login.tsx        # Authentication
│   └── ...
├── routes/              # Route definitions
│   └── index.tsx        # Route configuration with RBAC
├── MainLayout.tsx       # App layout with navigation
├── useAuth.tsx          # Authentication state management
├── index.tsx            # Main app component
└── type.ts              # TypeScript type definitions
```

## 🎯 User Roles & Permissions

### **Administrator**

- Full access to all features
- User and role management
- Complete task oversight
- System configuration

### **Leader**

- Task management for teams
- User viewing and editing
- Team oversight capabilities
- Advanced task operations

### **Manager**

- Task management
- User viewing
- Team coordination
- Limited administrative functions

### **Employee/Member**

- Personal task management
- View assigned tasks
- Basic profile management
- Task status updates

## 🔧 Key Features Detail

### **Authentication Flow**

- Secure login with email/password
- Automatic token refresh on expiry
- Persistent sessions across browser restarts
- Graceful logout with cleanup

### **Role-Based Access Control**

- Dynamic route generation based on user roles
- Page-level access restrictions
- Action-level permission checks
- Visual feedback for disabled actions

### **Task Management**

- Comprehensive task CRUD operations
- Status workflow (Pending → In Progress → Completed)
- Priority assignment and filtering
- User assignment and notifications

### **Responsive Design**

- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interfaces
- Consistent spacing and typography

## 🎨 Design System

### **Color Palette**

- **Primary**: Blue gradients (`from-blue-600 to-indigo-700`)
- **Success**: Green variations (`green-600`, `emerald-50`)
- **Warning**: Amber/Orange (`amber-600`, `orange-600`)
- **Error**: Red variants (`red-600`, `red-100`)
- **Neutral**: Gray scale (`gray-50` to `gray-900`)

### **Components**

- Glassmorphism cards with backdrop blur
- Gradient headers and buttons
- Consistent border radius (`rounded-xl`, `rounded-2xl`)
- Professional shadows and spacing
- Smooth hover and focus states

## 🚀 Deployment

### **Build for Production**

```bash
npm run build
# or
pnpm build
```

### **Preview Production Build**

```bash
npm run preview
# or
pnpm preview
```

### **Deployment Options**

- **Vercel**: Connect GitHub repo for automatic deployments
- **Netlify**: Drag and drop `dist` folder
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Traditional Hosting**: Upload `dist` folder contents

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**vitdien126748**

- GitHub: [@vitdien126748](https://github.com/vitdien126748)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Heroicons for beautiful iconography
- Vite for the incredible build tool
- The open-source community for inspiration

---

<div align="center">
  <strong>Built with ❤️ using React, TypeScript, and Tailwind CSS</strong>
</div>
