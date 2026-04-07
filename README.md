# EDUCORE / EDUERP

We built this Educational ERP platform to provide a seamless, integrated portal for students, teachers, and administrators. Our focus was on creating a modern, high-performance web experience backed by robust Spring Boot authentication and a highly cohesive, interactive React frontend.

---

## 🏗️ Key Architecture & Pages

### 1. Unified Landing Page (`Home.jsx` & `RoleCard.jsx`)
- **Purpose**: We created this page as the main entry point to visually guide users into their respective portals.
- **Key Mechanics**:
  - `roles.map(...)` maps our layout arrays into dynamic, glassmorphic Role Cards.
  - Features the massive interactive HTML5 `<canvas>` background driven by `BGPattern.jsx`, which leverages `requestAnimationFrame` and spring-physics equations to naturally repel grid particles away from the cursor.

### 2. Authentication Flow (`Login.jsx`, `Register.jsx`, `AuthContext.jsx`)
- **Purpose**: We designed this securely to handle sign-ins and new account creation while enforcing strict alignment to portal roles.
- **Key Mechanics**:
  - `AuthContext.jsx` provides the globally accessible asynchronous `login()` and `register()` hooks, directing data packets directly to our Java API endpoints (`/api/auth/login` and `/api/auth/signup`).
  - Implements strict mismatch logic; checking if the retrieved `User.role` accurately authorizes them to access the portal they're logging into.

### 3. Dashboard Layout (`DashboardLayout.jsx`, `Sidebar.jsx`, `Topbar.jsx`)
- **Purpose**: We structured this modular component as the foundation for every internal page, ensuring navigation and headers remain unified across the platform.
- **Key Mechanics**:
  - The `getNavItems()` function within `Sidebar.jsx` dynamically provisions navigation options depending on the `role` stored in context.
  - Utilizes translucent CSS layers (`bg-[#EDE3D2]/80 backdrop-blur-md`) enabling the coffee-latte grid matrix to run smoothly behind the application layer!

### 4. Custom Portal Views (e.g. `StudentDashboard.jsx`, `Assignments.jsx`)
- **Purpose**: We built these interactive pages for users to directly engage with system metrics, announcements, and task completion.
- **Key Mechanics**:
  - Implements local React state variables (`useState` and `useEffect`) to calculate and display modular statistics like GPA and pending uploads dynamically.
  - Employs table grids seamlessly locked to the Latte palette parameters (`#F5EFE6`, `#E6D8C3`, and `#3E2C23`) to ensure perfect visual coherence down to the deepest view layers.

---

## 🛠️ Technology Stack
- **Frontend Layer**: React, Vite, Tailwind CSS, Lucide React (for embedded graphics).
- **Backend Infrastructure**: Java, Spring Boot, Spring Security, Spring Data JPA.
- **Database Architecture**: Connected to local MySQL instances configured via application properties.
