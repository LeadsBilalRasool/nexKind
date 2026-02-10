# NexKind

NexKind is a comprehensive MERN stack web application designed to manage educational resources, donations, and community engagement. It features robust user management, course enrollment, event organization, job listings, and scholarship programs.

## 🚀 Tech Stack

### Frontend
- **React.js**: A JavaScript library for building user interfaces.
- **Vite**: Next Generation Frontend Tooling for fast development.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Framer Motion**: A production-ready motion library for React.
- **Lucide React**: Beautiful & consistent icons.
- **Axios**: Promise-based HTTP client for the browser and node.js.
- **React Router DOM**: Declarative routing for React.
- **React Hot Toast**: Lightweight toast notifications.

### Backend
- **Node.js**: JavaScript runtime built on Chrome's V8 engine.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for flexible data storage.
- **Mongoose**: Elegant mongodb object modeling for node.js.
- **JWT (JSON Web Token)**: Securely transmitting information between parties as a JSON object.
- **Bcrypt.js**: Library to help you hash passwords.
- **Dotenv**: Zero-dependency module that loads environment variables from a `.env` file.
- **Cors**: Middleware to enable Cross-Origin Resource Sharing.

---

## ✨ Features

- **User Authentication**: Secure login and registration with JWT authentication.
- **Role-Based Access Control**: Different permissions for Admins, Donors, Students, etc.
- **Dashboard**: Interactive dashboard with analytics and insights.
- **Course Management**: Create, update, delete, and enroll in courses.
- **Event Management**: Organize and manage events with registration capabilities.
- **Job Board**: Post and apply for job opportunities.
- **Scholarship Management**: comprehensive scholarship listing and application system.
- **Donation System**: Facilitate and track donations securely.
- **Messaging System**: Internal communication between users.
- **Responsive Design**: Fully responsive interface optimized for all devices.

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas connection string)
- [Git](https://git-scm.com/)

---

## 📦 Installation & Setup

Follow these steps to get the project up and running on your local machine.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd nexKind
```

### 2. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add the following environment variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/edurise_db # Or your MongoDB Atlas URI
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

Start the backend server:

```bash
npm run dev
# The server will start on http://localhost:5000
```

### 3. Frontend Setup

Open a new terminal, navigate to the client directory regarding the root folder:

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory and add the following:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
# The application will be available at http://localhost:5173
```

---

## 📂 Project Structure

```bash
nexKind/
├── client/                 # Frontend React Application
│   ├── public/             # Static assets
│   ├── src/                # Source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Application pages
│   │   ├── context/        # React Context for state management
│   │   ├── hook/           # Custom hooks
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Entry point
│   ├── .env                # Environment variables
│   ├── package.json        # Frontend dependencies and scripts
│   └── vite.config.js      # Vite configuration
│
├── server/                 # Backend Node.js Application
│   ├── config/             # Configuration files (DB, etc.)
│   ├── controllers/        # Request handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware (auth, error handling)
│   ├── .env                # Environment variables
│   ├── package.json        # Backend dependencies and scripts
│   └── server.js           # Entry point for the server
│
└── README.md               # Project documentation
```

---

## 🔗 API Endpoints

The backend exposes the following main API routes (prefixed with `/api`):

- **Auth**: `/api/auth` (Login, Register, Logout)
- **Users**: `/api/users` (User management)
- **Courses**: `/api/courses` (Course CRUD operations)
- **Events**: `/api/events` (Event CRUD operations)
- **Jobs**: `/api/jobs` (Job postings and applications)
- **Scholarships**: `/api/scholarships` (Scholarship listings)
- **Donations**: `/api/donations` (Donation processing)
- **Messages**: `/api/messages` (Messaging functionality)
- **Students**: `/api/students` (Student-specific data)
- **Dashboard**: `/api/dashboard` (Admin dashboard data)

---

## 🤝 Contribution

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the **ISC License**.
