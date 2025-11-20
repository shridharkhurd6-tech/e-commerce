import React from "react";
import { Home, Package, ShoppingCart, Users, LogOut } from "lucide-react";
import "./Sidebar.css";


const Sidebar = () => {
return (
<aside className="sidebar">
<h2 className="sidebar-title">Admin Panel</h2>


<nav className="sidebar-menu">
<a href="/" className="sidebar-item"><Home /> Dashboard</a>
<a href="/products" className="sidebar-item"><Package /> Products</a>
<a href="/orders" className="sidebar-item"><ShoppingCart /> Orders</a>
<a href="/users" className="sidebar-item"><Users /> Users</a>
</nav>


<button className="logout-btn"><LogOut /> Logout</button>
</aside>
);
};


export default Sidebar;