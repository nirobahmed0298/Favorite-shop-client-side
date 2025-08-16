import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

// Recharts
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

const DashboardHome = () => {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalSales: 20,
        totalUsers: 0,
        revenue: 2500,
    });

    // Fetch Users
    useEffect(() => {
        fetch("http://localhost:5001/users")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setStats((prev) => ({ ...prev, totalUsers: data.length }));
            })
            .catch((err) => console.error(err));
    }, []);

    // Fetch Products
    useEffect(() => {
        fetch("http://localhost:5001/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setStats((prev) => ({
                    ...prev,
                    totalProducts: data.length,
                }));
            })
            .catch((err) => console.error(err));
    }, []);

    // Pie Chart Data
    const pieData = [
        { name: "Products", value: stats.totalProducts },
        { name: "Sales", value: stats.totalSales },
        { name: "Users", value: stats.totalUsers },
    ];
    const COLORS = ["#4AB1FF", "#00C49F", "#FFBB28"];

    // Example Bar Chart Data
    const barData = [
        { name: "Jan", sales: 30 },
        { name: "Feb", sales: 50 },
        { name: "Mar", sales: 80 },
        { name: "Apr", sales: 60 },
        { name: "May", sales: 100 },
    ];

    return (
        <>
            <Helmet>
                <title>Admin Dashboard | Favorite.Com</title>
            </Helmet>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h3 className="text-gray-500">Total Products</h3>
                        <p className="text-2xl font-bold text-[#4AB1FF]">{stats.totalProducts}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h3 className="text-gray-500">Total Sales</h3>
                        <p className="text-2xl font-bold text-green-500">{stats.totalSales}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h3 className="text-gray-500">Users</h3>
                        <p className="text-2xl font-bold text-yellow-500">{stats.totalUsers}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h3 className="text-gray-500">Revenue</h3>
                        <p className="text-2xl font-bold text-purple-500">${stats.revenue}</p>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Pie Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h3 className="text-lg font-semibold mb-4">Overview</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={90}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Bar Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h3 className="text-lg font-semibold mb-4">Sales Analytics</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={barData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="sales" fill="#4AB1FF" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Nested Routes */}
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default DashboardHome;
