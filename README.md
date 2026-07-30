🏠 Rentmate :
Rentmate is a secure, production-ready full-stack web application built on the MERN architecture. It serves as a decentralized peer-to-peer marketplace where authenticated users can list items for sale or rent, and securely browse, purchase, or rent items from other users. The platform prioritizes user privacy, data security, and seamless real-time notifications.

🚀 Features :
Robust Authentication & Privacy: Secure user registration and login with encrypted passwords and protected routes to ensure user data privacy.

Dual Listing Capabilities: Users can list items either for direct sale or for short-term/long-term renting.

Seamless Marketplace Operations: Clean interface for buyers/renters to discover listed items, view item specifications, and contact owners for purchase.

Integrated Notification System: Real-time feedback alerts for user actions, status changes, and platform updates.

Monolithic SSR Architecture: Utilizes direct server-side view engine rendering instead of a separate React SPA, ensuring fast initial loads, optimized routing, and simplified full-stack connectivity.

🛠️ Tech Stack :
Backend: Node.js, Express.js

Database: MongoDB (via Mongoose Object Data Modeling)

Frontend (Server-Side Rendered): Template Engine (EJS/Pug/Handlebars) integrated directly with Express controllers, styled with Vanilla CSS/Bootstrap.

Authentication: JSON Web Tokens (JWT) / Session-based cookies and bcrypt encryption.

📂 Directory Structure :
Below is the architectural layout of the application showing the separation of concerns across controllers, models, routes, and server-side views:

rentmate/
├── controllers/
│   └── listing.js                 
│   └── review.js                 
│   └── user.js                 
├── init/
│   ├── data.js     
│   ├── index.js  
├── models/
│   ├── User.js               
│   ├── listing.js               
│   └── review.js       
├── public/
│   ├── css/                  # Custom UI stylesheets
│   └── js/                   # Frontend script logic for dynamic interactions
├── routes/
│   ├── listing.js         
│   ├── review.js         
│   └── user.js   
├── utils/
│   ├── expressError.js         
│   ├── wrapAsync.js          
├── views/                    # Server-side view engine template files (Frontend)
│   ├── includes/             
│   ├── flash.ejs        
│   ├── footer.ejs        
│   └── navbar.ejs
│   ├── layouts/             
│   ├── boilerplate.ejs
│   ├── listings/             
│   ├── edit.ejs        
│   ├── error.ejs        
│   └── index.ejs     
│   ├── new.ejs        
│   ├── show.ejs 
│   ├── Users/             
│   ├── login.ejs        
│   ├── signup.ejs
├── .env                      # Environment configurations (Git ignored)
├── .gitignore                # System files to ignore in Git
├── package.json              # App manifests and dependencies
└── server.js                 # Core application entry point