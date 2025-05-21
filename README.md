# Project Cost Tracker

A web application to help users efficiently track and manage project-related expenses — including hardware, software, services, and miscellaneous costs. Built using React, Redux Toolkit, Chakra UI, and Firebase (Firestore & Authentication).

[🌐 Live App](https://project-cost-tracker-one.vercel.app/) | [📂 GitHub Repo](https://github.com/ashokccbp/Project-Cost-Tracker.git)

---

## 🔧 Features

- ✅ User Authentication (Email/Password) via Firebase
- ✅ Add, edit, and delete **project items** (e.g., hardware, software)
- ✅ Add, edit, and delete **other costs** (e.g., shipping, taxes)
- ✅ Real-time **Firestore** data sync
- ✅ Dynamic total project cost calculation
- ✅ Responsive UI with Chakra UI
- ✅ State management using Redux Toolkit

---

## 📸 Screenshots

| Login/Signup | Dashboard |
|--------------|-----------|
| ![Login](https://via.placeholder.com/300x180?text=Login+Screen) | ![Dashboard](https://via.placeholder.com/300x180?text=Dashboard+Screen) |

> *(Replace placeholders with real screenshots if available)*

---

## 🚀 Tech Stack

| Role              | Technology               |
|-------------------|---------------------------|
| Frontend          | React.js                 |
| UI Components     | Chakra UI                |
| State Management  | Redux Toolkit            |
| Backend/Database  | Firebase Firestore       |
| Authentication    | Firebase Authentication  |
| Hosting           | Vercel                   |

---

## 🗃️ Firebase Firestore Structure

```plaintext
/users/{userId}/items/{itemId}
  - name: string
  - cost: number

/users/{userId}/otherCosts/{costId}
  - description: string
  - amount: number
🔐 Firebase Authentication
Email/Password login and registration

Secure user sessions

Firestore rules ensure users only access their own data

🧩 State Management (Redux)
authSlice – manages login/logout status and user info

itemsSlice – manages project items

otherCostsSlice – manages miscellaneous expenses

🛠️ Getting Started
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/ashokccbp/Project-Cost-Tracker.git
cd Project-Cost-Tracker
2. Install Dependencies
bash
Copy
Edit
npm install
3. Firebase Setup
Create a Firebase project at Firebase Console

Enable Firestore & Authentication (Email/Password)

Add a Web App and get your Firebase config

Replace the placeholder in src/firebase.js:

js
Copy
Edit
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
4. Run the App Locally
bash
Copy
Edit
npm start
✅ Functionality Overview
Authentication Flow

User signs up/logs in

Redux stores user data

Firestore data is fetched for the user

CRUD Operations

Add, edit, delete items and costs

Real-time sync with Firestore

Total Calculation

Auto-updates total when data changes

✨ Bonus Features (Optional Ideas)
Filter/sort costs by name or amount

Add timestamps to entries

Offline persistence with Redux + localStorage

Cost summary with charts (e.g., pie or bar graph)

🔒 Security Notes
Firestore rules restrict access to only the authenticated user’s data

Client-side Firebase config is safe to expose, but never commit secret keys or service accounts

📦 Deployment
This app is deployed on Vercel
🔗 Live Demo

📄 License
MIT License

🙌 Acknowledgements
Firebase Docs

Redux Toolkit

Chakra UI
