import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/bookings')
            .then(response => {
                setBookings(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching bookings:", err);
                setError("Failed to load bookings data.");
                setLoading(false);
            });
    }, []);

    return (
        <main className="flex-grow pt-24 pb-12 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="font-heading text-4xl font-extrabold text-slate-800 tracking-tight mb-2">Admin Dashboard</h1>
                        <p className="text-slate-500 text-lg">Manage bookings, view analytics, and control the arena.</p>
                    </div>
                    <button className="btn-primary shadow-glow shrink-0">
                        + New Booking
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { title: "Today's Bookings", value: "14", change: "+2 from yesterday", color: "text-primary" },
                        { title: "Revenue (Today)", value: "$420", change: "+15% vs last week", color: "text-emerald-500" },
                        { title: "Active Users", value: "1,204", change: "+48 new this week", color: "text-accent" }
                    ].map((stat, index) => (
                        <div key={index} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-300 group">
                            <h3 className="text-slate-500 font-medium mb-2">{stat.title}</h3>
                            <div className={`text-4xl font-heading font-bold ${stat.color} mb-2 group-hover:scale-105 origin-left transition-transform`}>{stat.value}</div>
                            <div className="text-sm text-slate-400">{stat.change}</div>
                        </div>
                    ))}
                </div>

                {/* Recent Bookings Table */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h2 className="font-heading text-xl font-bold text-slate-800">Recent Bookings</h2>
                        <button className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-slate-400 text-sm border-b border-slate-100">
                                    <th className="px-8 py-4 font-medium">User</th>
                                    <th className="px-8 py-4 font-medium">Date & Time</th>
                                    <th className="px-8 py-4 font-medium">Turf Type</th>
                                    <th className="px-8 py-4 font-medium">Status</th>
                                    <th className="px-8 py-4 font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-600">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-10 text-center text-slate-400">Loading bookings...</td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-10 text-center text-rose-500">{error}</td>
                                    </tr>
                                ) : bookings.map((booking) => (
                                    <tr key={booking.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors last:border-0">
                                        <td className="px-8 py-5 font-medium text-slate-800">{booking.user}</td>
                                        <td className="px-8 py-5">{booking.time}</td>
                                        <td className="px-8 py-5">{booking.type}</td>
                                        <td className="px-8 py-5">
                                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${booking.statusColor}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <button className="text-slate-400 hover:text-primary transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Admin;
