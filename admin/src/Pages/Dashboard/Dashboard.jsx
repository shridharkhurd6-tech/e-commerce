import React, { useState, useEffect } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0
  });

  useEffect(() => {
    // Fetch products count from API
    fetch('http://localhost:4000/allproducts')
      .then(res => res.json())
      .then(data => {
        setStats(prev => ({
          ...prev,
          totalProducts: data.length || 0
        }));
      })
      .catch(err => console.log('Error fetching products:', err));
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard Overview</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <h3>Total Products</h3>
          <p className="stat-number">{stats.totalProducts}</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <h3>Total Orders</h3>
          <p className="stat-number">1,053</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <h3>Total Users</h3>
          <p className="stat-number">832</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <h3>Revenue</h3>
          <p className="stat-number">₹4,52,000</p>
        </div>
      </div>

      <div className="recent-orders">
        <h2>Recent Orders</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1024</td>
                <td>Rohit Sharma</td>
                <td><span className="status delivered">Delivered</span></td>
                <td>₹1,499</td>
              </tr>
              <tr>
                <td>#1025</td>
                <td>Ananya Verma</td>
                <td><span className="status pending">Pending</span></td>
                <td>₹2,899</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;