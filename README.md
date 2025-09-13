# Login System

A modern authentication system built with **React**, **Firebase Authentication**, and **Tailwind CSS**. It supports email/password login, Google sign-in, role-based routing (admin vs user), and a clean UI with dark/light themes.

---

## 🚀 Features

* 🔑 Email & Password authentication
* 🔐 Google sign-in via Firebase
* 🌗 Dark/Light theme support
* 👨‍💻 Role-based access control (Admin & User)
* 🧭 Protected routes using React Router
* 🎨 Responsive UI with Tailwind CSS

---

## 📦 Dependencies

This project uses the following dependencies:

```json
"dependencies": {
  "@react-oauth/google": "^0.12.2",
  "@tailwindcss/vite": "^4.1.13",
  "firebase": "^12.2.1",
  "lucide-react": "^0.544.0",
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-router-dom": "^7.9.0",
  "tailwindcss": "^4.1.13"
}
```

---

## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/login-system.git
   cd login-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Firebase:

   * Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/)
   * Enable **Email/Password** and **Google** authentication
   * Add your Firebase config to a `Firebase.js` file

4. Start the development server:

   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

```
├── src
│   ├── Backend
│   │   └── AdminDashboard.jsx
│   ├── Frontend
│   │   └── UserDashboard.jsx
│   ├── App.jsx
│   ├── Firebase.js
│   ├── Login.jsx
│   ├── Registration.jsx
│   ├── Navbar.jsx
│   └── Theme.jsx
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🔑 Usage

* **Admin account** → Has access to both Admin and User dashboard.
* **Normal user** → Can only access User dashboard. Trying to access `/admin` shows an error message.

---

## 📜 License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
