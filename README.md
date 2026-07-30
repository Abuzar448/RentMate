# 🏢 Rentmate

Rentmate is a secure, production-ready full-stack web application built on the MERN architecture. It serves as a decentralized peer-to-peer marketplace where authenticated users can list items for sale or rent, and securely browse, purchase, or rent items from other users. The platform prioritizes user privacy, data security, and seamless real-time notifications.

---

## 🚀 Features

*   **🔒 Robust Authentication & Privacy:** Secure user registration and login with encrypted passwords and protected routes to ensure user data privacy.
*   **💼 Dual Listing Capabilities:** Users can list items either for direct sale or for short-term/long-term renting.
*   **🛒 Seamless Marketplace Operations:** Clean interface for buyers/renters to discover listed items, view item specifications, and contact owners for purchase.
*   **🔔 Integrated Notification System:** Real-time feedback alerts for user actions, status changes, and platform updates via Flash messaging.
*   **⚡ Monolithic SSR Architecture:** Utilizes direct server-side view engine rendering (EJS) instead of a separate React SPA, ensuring fast initial loads, optimized routing, and simplified full-stack connectivity.

---

## 🛠️ Tech Stack

*   **Backend:** Node.js 🟢, Express.js 🚂
*   **Database:** MongoDB 🍃 (via Mongoose Object Data Modeling)
*   **Frontend (Server-Side Rendered):** EJS (Embedded JavaScript) templates integrated directly with Express controllers, styled with Vanilla CSS and Bootstrap 🎨.
*   **Authentication:** Passport.js / Session-based cookies and bcrypt encryption 🔑.
*   **Error Handling:** Custom robust middleware structure (`wrapAsync`, `expressError`).

---

## 📂 Directory Structure

Below is the exact architectural layout of the application showing the separation of concerns across controllers, models, routes, initialization logic, utilities, and server-side views:

```text
rentmate/
├── 🕹️ controllers/
│   ├── listing.js            # Logic for creating, updating, and deleting item listings
│   ├── review.js             # Logic for managing user feedback and ratings
│   └── user.js               # User authentication and session management
├── 📂 init/
│   ├── data.js               # Sample/Seed data array for the database
│   └── index.js              # Database initialization and seeding script
├── 🗃️ models/
│   ├── User.js               # User Schema with secure credential tracking
│   ├── listing.js            # Rental/Sale Listing Schema
│   └── review.js             # Review and Comment Schema
├── 🌐 public/
│   ├── 🎨 css/               # Custom UI stylesheets
│   └── 📜 js/                # Frontend script logic for dynamic interactions
├── 🛣️ routes/
│   ├── listing.js            # Endpoints matching listing operations
│   ├── review.js             # Endpoints for review submissions
│   └── user.js               # Auth handling endpoints (Login, Signup, Logout)
├── 🛠️ utils/
│   ├── expressError.js       # Custom Express error wrapper class
│   └── wrapAsync.js          # Async utility function to eliminate try-catch boilerplate
├── 🖼️ views/                 # Server-side view engine template files (Frontend EJS)
│   ├── 🧩 includes/          # Reusable structural layout blocks
│   │   ├── flash.ejs         # Success/Error alert notification banners
│   │   ├── footer.ejs        # Standard layout footer view
│   │   └── navbar.ejs        # Navigation layout component
│   ├── 📐 layouts/            
│   │   └── boilerplate.ejs   # Core global HTML structure parent layout wrapper
│   ├── 📦 listings/          # Views associated with marketplace items
│   │   ├── edit.ejs          # UI to modify existing listing details
│   │   ├── error.ejs         # Error boundary display UI
│   │   ├── index.ejs         # Main homepage listing feed UI
│   │   ├── new.ejs           # Item creation form UI
│   │   └── show.ejs          # Deep item specification view details
│   └── 🔑 Users/             # Authentication interface files
│       ├── login.ejs         # Login portal view
│       └── signup.ejs        # User onboarding signup portal view
├── 📄 .env                   # Environment configurations (Git ignored)
├── 📄 .gitignore             # System files to ignore in Git
├── 📄 package.json           # App manifests, custom scripts, and dependencies
└── 🚀 server.js              # Core application entry point and middleware assembly