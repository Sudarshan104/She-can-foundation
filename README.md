# Intern Dashboard

A simple full-stack intern dashboard application built with React frontend and Node.js/Express backend. This application allows interns to track their referral codes, donations raised, and unlockable rewards.

## Features

### Frontend (React)
- ✅ Dummy login/signup page (no real authentication)
- ✅ Dashboard showing intern name
- ✅ Dummy referral code display (e.g., "sarah2025")
- ✅ Total donations raised display
- ✅ Rewards/unlockables section with static display
- ✅ Modern, responsive UI with beautiful design
- ✅ Copy referral code functionality

### Backend (Node.js + Express)
- ✅ REST API endpoints for intern data
- ✅ Dummy data for user name, referral code, and amount raised
- ✅ Mock data that can be tested with Postman
- ✅ CORS enabled for frontend communication

## Tech Stack

- **Frontend**: React 18, React Router, Axios
- **Backend**: Node.js, Express.js
- **Styling**: Custom CSS with modern design
- **Development**: Concurrently for running both servers

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm run install-all
   ```

2. **Start the development servers:**
   ```bash
   npm run dev
   ```

This will start both the backend server (port 5000) and the React development server (port 3000).

### Manual Setup (Alternative)

If you prefer to set up manually:

1. **Install backend dependencies:**
   ```bash
   npm install
   ```

2. **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   ```

3. **Start the backend server:**
   ```bash
   npm run server
   ```

4. **In a new terminal, start the frontend:**
   ```bash
   cd client
   npm start
   ```

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/intern-data` - Get all intern data
- `GET /api/profile` - Get basic profile information
- `GET /api/donations` - Get donation statistics
- `GET /api/rewards` - Get rewards/unlockables
- `GET /api/health` - Health check endpoint

### Example API Response

```json
{
  "name": "Sarah Johnson",
  "referralCode": "sarah2025",
  "totalDonations": 2450,
  "rewards": [
    {
      "id": 1,
      "name": "Coffee with CEO",
      "description": "30-minute coffee chat with the CEO",
      "unlocked": true,
      "icon": "☕"
    }
  ],
  "recentDonations": [
    {
      "id": 1,
      "amount": 500,
      "donor": "Anonymous",
      "date": "2024-01-15"
    }
  ]
}
```

## Demo Credentials

For the login page, you can use any email and password combination. The authentication is dummy and only checks if both fields are filled.

## Project Structure

```
intern-dashboard/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Login.js
│   │   │   └── Dashboard.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── server/                 # Node.js backend
│   └── index.js           # Express server
├── package.json           # Root package.json
└── README.md
```

## Testing with Postman

You can test the API endpoints using Postman or any REST client:

1. **Health Check:**
   ```
   GET http://localhost:5000/api/health
   ```

2. **Get Intern Data:**
   ```
   GET http://localhost:5000/api/intern-data
   ```

3. **Get Profile:**
   ```
   GET http://localhost:5000/api/profile
   ```

## Features Overview

### Dashboard Features
- **Statistics Cards**: Display total donations, referral code, and rewards progress
- **Referral Code**: Copy-to-clipboard functionality for easy sharing
- **Rewards System**: Visual display of unlocked and locked rewards
- **Recent Donations**: List of recent donations with donor information
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### UI/UX Features
- **Modern Design**: Clean, professional interface with gradient backgrounds
- **Interactive Elements**: Hover effects, smooth transitions
- **Loading States**: Proper loading and error handling
- **Mobile Responsive**: Optimized for all screen sizes

## Development

### Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run server` - Start only the backend server
- `npm run client` - Start only the React development server
- `npm run build` - Build the React app for production
- `npm start` - Start the production backend server

### Customization

To modify the dummy data, edit the `internData` object in `server/index.js`. You can change:
- Intern name and referral code
- Total donations amount
- Rewards list and unlock status
- Recent donations list

## Deployment

### Backend Deployment
The Express server can be deployed to platforms like:
- Heroku
- Railway
- Render
- DigitalOcean

### Frontend Deployment
The React app can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

Remember to update the API base URL in the frontend if deploying to different domains.

## License

MIT License - feel free to use this project for learning and development purposes. 