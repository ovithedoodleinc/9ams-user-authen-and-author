# **MERN Stack User Authentication and Authorization**

This project is a basic MERN stack application that includes user authentication, authorization, and dynamic subdomain handling. It allows users to sign up, log in, and manage shops while preserving authentication across subdomains.

---

## **Features**

1. **Signup**

   - User registration with username, password, and 3-4 shop names.
   - Enforces:
     - Unique usernames.
     - Password with at least 8 characters, 1 number, and 1 special character.
     - Global uniqueness of shop names.
   - Validates input data before saving to the database.

2. **Signin**

   - User login with "Remember Me" functionality.
   - Displays validation messages for incorrect credentials.
   - Session expires in:
     - **7 days** if "Remember Me" is checked.
     - **30 minutes** otherwise.

3. **Dashboard**

   - Displays the user's shop names.
   - Logout button with a confirmation popup.

4. **Dynamic Subdomains**

   - Redirects to `http://<shopname>.localhost:5173` after clicking a shop name.
   - Displays a shop-specific message: `"This is <shopname> shop"`.
   - Maintains authentication across subdomains using secure cookies.

5. **Cross-Subdomain Authentication**
   - Auth tokens are handled securely using `httpOnly` cookies.
   - Works even when users open a subdomain directly in a new tab.
   - Includes a loading spinner during token verification.

---

## **Tech Stack**

### **Frontend**

- React (Vite)
- TailwindCSS for styling (flowbite)

### **Backend**

- Node.js (Express)
- MongoDB (Mongoose for schema and validation)
- JSON Web Tokens (JWT) for authentication

### **Hosting**

- Frontend: Vercel
- Backend: Vercel (does not supporting wildcard subdomains on it's domain)

---

## **Setup Instructions**

### Prerequisites

- Node.js (v20+)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ovithedoodleinc/9ams-user-authen-and-author.git
   cd 9ams-user-authen-and-author
   ```

2. Set up the backend:

   ```bash
   cd server
   npm i
   # Update .env with your configuration
   npm start
   ```

3. Set up the frontend:

   ```bash
   cd ../client
   npm i
   # Update .env with your configuration
   npm run dev
   or
   npm run build && npm run preview
   ```

4. Open the application in your browser:
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000](http://localhost:5000)

---

## **Environment Variables**

### Backend (`server/.env`)

```env
PORT=your_port
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
NODE_ENV=your_environment
DOMAIN=your_domain_with_.
ORIGIN=your_origin
```

### Frontend (`client/.env`)

```env
VITE_API_URL=your_api_url
VITE_DOMAIN=your_domain_with_.
```

---

## **API Endpoints**

### **Auth Routes**

| Method | Endpoint       | Description                |
| ------ | -------------- | -------------------------- |
| POST   | `/auth/signup` | Register a new user        |
| POST   | `/auth/signin` | Log in a user              |
| GET    | `/auth/verify` | Verify user authentication |
| GET    | `/shops`       | Get shop names by user     |

---

## **Live Demo**

- **Frontend**: [Vercel Deployment](https://9ams-user-authen-and-author-client.vercel.app/)
- **Backend**: [Render Deployment](https://9ams-user-authen-and-author-server.vercel.app/)
