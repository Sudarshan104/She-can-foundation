import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ onLogout }) => {
  const [internData, setInternData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loginDonation, setLoginDonation] = useState(null);

  useEffect(() => {
    fetchInternData();
    const donationFromLogin = localStorage.getItem('donationAmount');
    if (donationFromLogin) {
      setLoginDonation(parseFloat(donationFromLogin));
    }
  }, []);

  const fetchInternData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://she-can-foundation-back.onrender.com/api/intern-data'
      );
      setInternData(response.data);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyReferralCode = () => {
    if (internData?.referralCode) {
      navigator.clipboard.writeText(internData.referralCode);
      alert('Referral code copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card text-center">
          <h2>Loading dashboard...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="card text-center">
          <h2>Error: {error}</h2>
          <button className="btn mt-20" onClick={fetchInternData}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!internData) {
    return (
      <div className="container">
        <div className="card text-center">
          <h2>No data available</h2>
        </div>
      </div>
    );
  }

  const totalDonations = internData.totalDonations + (loginDonation || 0);

  return (
    <div>
      <div className="dashboard-header">
        <div className="container">
          <h1>Intern Dashboard</h1>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="container">
        {loginDonation && (
          <div className="card" style={{ backgroundColor: '#e8f5e8', border: '1px solid #4caf50', marginBottom: '20px' }}>
            <h3 style={{ color: '#2e7d32', marginBottom: '10px' }}>
              🎉 Thank you for your donation!
            </h3>
            <p style={{ color: '#2e7d32', margin: 0 }}>
              You donated <strong>${loginDonation.toFixed(2)}</strong> during login.
              This has been added to your total fundraising impact.
            </p>
          </div>
        )}

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Donations Raised</h3>
            <div className="value">${totalDonations.toLocaleString()}</div>
            <div className="description">Your fundraising impact</div>
            {loginDonation && (
              <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                +${loginDonation.toFixed(2)} from login
              </div>
            )}
          </div>

          <div className="stat-card">
            <h3>Your Referral Code</h3>
            <div className="value" style={{ fontSize: '24px', fontFamily: 'monospace' }}>
              {internData.referralCode}
            </div>
            <button
              className="btn-secondary"
              style={{ marginTop: '10px', fontSize: '12px' }}
              onClick={copyReferralCode}
            >
              Copy Code
            </button>
          </div>

          <div className="stat-card">
            <h3>Rewards Unlocked</h3>
            <div className="value">
              {internData.rewards.filter((reward) => reward.unlocked).length}/{internData.rewards.length}
            </div>
            <div className="description">Keep fundraising to unlock more!</div>
          </div>
        </div>

        <div className="card">
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Your Rewards & Unlockables</h2>
          <div className="rewards-grid">
            {internData.rewards.map((reward) => (
              <div
                key={reward.id}
                className={`reward-card ${reward.unlocked ? 'unlocked' : 'locked'}`}
              >
                <div className="reward-header">
                  <span className="reward-icon">{reward.icon}</span>
                  <span className="reward-name">{reward.name}</span>
                </div>
                <p className="reward-description">{reward.description}</p>
                <div className={`reward-status ${reward.unlocked ? 'unlocked' : 'locked'}`}>
                  {reward.unlocked ? 'Unlocked' : 'Locked'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="donations-list">
          <h3>Recent Donations</h3>
          {loginDonation && (
            <div className="donation-item" style={{ backgroundColor: '#e8f5e8' }}>
              <div className="donation-info">
                <div className="donation-donor">You (Login Donation)</div>
                <div className="donation-date">Just now</div>
              </div>
              <div className="donation-amount">${loginDonation.toFixed(2)}</div>
            </div>
          )}
          {internData.recentDonations.map((donation) => (
            <div key={donation.id} className="donation-item">
              <div className="donation-info">
                <div className="donation-donor">{donation.donor}</div>
                <div className="donation-date">{donation.date}</div>
              </div>
              <div className="donation-amount">${donation.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
