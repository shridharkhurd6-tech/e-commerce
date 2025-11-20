import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import "./AdminLayout.css";


const AdminLayout = ({ children }) => {
return (
<div className="admin-layout">
<Sidebar />
<main>
<Navbar />
<div className="content">{children}</div>
</main>
</div>
);
};


export default AdminLayout;