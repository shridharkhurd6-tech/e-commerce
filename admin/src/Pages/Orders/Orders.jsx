import React, { useState, useEffect } from 'react';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pending: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:4000/orders');
        const data = await response.json();
        
        if (data.success && data.orders) {
          // Transform backend data to match frontend format
          const transformedOrders = data.orders.map(order => ({
            id: order.orderId,
            customer: order.customer,
            email: order.email,
            status: order.status,
            total: order.total,
            date: new Date(order.date).toLocaleDateString(),
            items: order.items,
            address: order.address,
            _id: order._id
          }));
          
          setOrders(transformedOrders);
          setFilteredOrders(transformedOrders);
          calculateStats(transformedOrders);
        } else {
          console.error('Failed to fetch orders');
          setOrders([]);
          setFilteredOrders([]);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
        setFilteredOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const calculateStats = (orderList) => {
    const stats = {
      totalOrders: orderList.length,
      pending: orderList.filter(o => o.status === 'Pending').length,
      shipped: orderList.filter(o => o.status === 'Shipped').length,
      delivered: orderList.filter(o => o.status === 'Delivered').length,
      cancelled: orderList.filter(o => o.status === 'Cancelled').length,
      totalRevenue: orderList.reduce((sum, o) => sum + o.total, 0)
    };
    setStats(stats);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterOrders(term, statusFilter);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    filterOrders(searchTerm, status);
  };

  const filterOrders = (search, status) => {
    let filtered = orders;

    if (status !== 'all') {
      filtered = filtered.filter(o => o.status.toLowerCase() === status.toLowerCase());
    }

    if (search) {
      filtered = filtered.filter(o =>
        o.id.toLowerCase().includes(search) ||
        o.customer.toLowerCase().includes(search) ||
        o.email.toLowerCase().includes(search)
      );
    }

    setFilteredOrders(filtered);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'status-delivered';
      case 'shipped':
        return 'status-shipped';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return '✓';
      case 'shipped':
        return '📦';
      case 'pending':
        return '⏳';
      case 'cancelled':
        return '✕';
      default:
        return '';
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await fetch('http://localhost:4000/updateorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          status: newStatus
        })
      });
      
      const data = await response.json();
      if (data.success) {
        // Refresh orders after update
        const updatedOrders = orders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders);
        calculateStats(updatedOrders);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="orders-container">
      <h1>Order Management</h1>

      {/* Stats Dashboard */}
      <div className="stats-dashboard">
        <div className="stat-card-small">
          <div className="stat-icon-small">📋</div>
          <h3>Total Orders</h3>
          <p className="stat-value">{stats.totalOrders}</p>
        </div>

        <div className="stat-card-small pending">
          <div className="stat-icon-small">⏳</div>
          <h3>Pending</h3>
          <p className="stat-value">{stats.pending}</p>
        </div>

        <div className="stat-card-small shipped">
          <div className="stat-icon-small">📦</div>
          <h3>Shipped</h3>
          <p className="stat-value">{stats.shipped}</p>
        </div>

        <div className="stat-card-small delivered">
          <div className="stat-icon-small">✓</div>
          <h3>Delivered</h3>
          <p className="stat-value">{stats.delivered}</p>
        </div>

        <div className="stat-card-small cancelled">
          <div className="stat-icon-small">✕</div>
          <h3>Cancelled</h3>
          <p className="stat-value">{stats.cancelled}</p>
        </div>

        <div className="stat-card-small revenue">
          <div className="stat-icon-small">💰</div>
          <h3>Total Revenue</h3>
          <p className="stat-value">₹{stats.totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="orders-filters">
        <input
          type="text"
          placeholder="Search by Order ID, Customer, or Email..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />

        <div className="status-filters">
          <button
            className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleStatusFilter('all')}
          >
            All Orders
          </button>
          <button
            className={`filter-btn ${statusFilter === 'pending' ? 'active' : ''}`}
            onClick={() => handleStatusFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${statusFilter === 'shipped' ? 'active' : ''}`}
            onClick={() => handleStatusFilter('shipped')}
          >
            Shipped
          </button>
          <button
            className={`filter-btn ${statusFilter === 'delivered' ? 'active' : ''}`}
            onClick={() => handleStatusFilter('delivered')}
          >
            Delivered
          </button>
          <button
            className={`filter-btn ${statusFilter === 'cancelled' ? 'active' : ''}`}
            onClick={() => handleStatusFilter('cancelled')}
          >
            Cancelled
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-table-container">
        {loading ? (
          <p className="loading">Loading orders...</p>
        ) : filteredOrders.length === 0 ? (
          <p className="no-orders">No orders found</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.email}</td>
                  <td>{order.date}</td>
                  <td>{order.items}</td>
                  <td className="total">₹{order.total.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(order.status)}`}>
                      {getStatusIcon(order.status)} {order.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-dropdown-wrapper">
                      <button className="btn-view">Update Status ▼</button>
                      <div className="action-dropdown">
                        <button onClick={() => handleStatusUpdate(order.id, 'Pending')}>
                          ⏳ Pending
                        </button>
                        <button onClick={() => handleStatusUpdate(order.id, 'Shipped')}>
                          📦 Shipped
                        </button>
                        <button onClick={() => handleStatusUpdate(order.id, 'Delivered')}>
                          ✓ Delivered
                        </button>
                        <button onClick={() => handleStatusUpdate(order.id, 'Cancelled')}>
                          ✕ Cancelled
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Orders;
