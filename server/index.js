const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy data for intern dashboard
const internData = {
  name: "Sudarshan Khot",
  referralCode: "Suda2025",
  totalDonations: 2450,
  rewards: [
    {
      id: 1,
      name: "Coffee with CEO",
      description: "30-minute coffee chat with the CEO",
      unlocked: true,
      icon: "☕"
    },
    {
      id: 2,
      name: "Flexible Hours",
      description: "Work from home option for 2 days/week",
      unlocked: true,
      icon: "🏠"
    },
    {
      id: 3,
      name: "Mentorship Program",
      description: "1-on-1 mentorship with senior developer",
      unlocked: false,
      icon: "👨‍💼"
    },
    {
      id: 4,
      name: "Conference Pass",
      description: "Free pass to annual tech conference",
      unlocked: false,
      icon: "🎫"
    },
    {
      id: 5,
      name: "Premium Laptop",
      description: "Upgrade to premium development laptop",
      unlocked: false,
      icon: "💻"
    }
  ],
  recentDonations: [
    { id: 1, amount: 500, donor: "Anonymous", date: "2025-08-01" },
    { id: 2, amount: 300, donor: "TechCorp Inc.", date: "2025-08-02" },
    { id: 3, amount: 750, donor: "StartupXYZ", date: "2025-08-03" },
    { id: 4, amount: 200, donor: "Anonymous", date: "2025-08-04" },
    { id: 5, amount: 700, donor: "Innovation Labs", date: "2025-08-05" }
  ]
};

// API Routes
app.get('/api/intern-data', (req, res) => {
  res.json(internData);
});

app.get('/api/donations', (req, res) => {
  res.json({
    total: internData.totalDonations,
    recent: internData.recentDonations
  });
});

app.get('/api/rewards', (req, res) => {
  res.json(internData.rewards);
});

app.get('/api/profile', (req, res) => {
  res.json({
    name: internData.name,
    referralCode: internData.referralCode,
    totalDonations: internData.totalDonations
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Intern Dashboard API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
}); 