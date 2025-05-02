import React from 'react'
import { ShoppingCart, Package, Users, DollarSign } from "lucide-react";

export const AdminDashboard = () => {
  const dashboardData = [
    { title: "Total Orders", value: "34000", icon: <ShoppingCart className="w-6 h-6 text-blue-500 mb-2" /> },
    { title: "Total Products", value: "30000", icon: <Package className="w-6 h-6 text-green-500 mb-2" /> },
    { title: "Total Visitors", value: "20000", icon: <Users className="w-6 h-6 text-purple-500 mb-2" /> },
    { title: "Total Revenue", value: "$20000", icon: <DollarSign className="w-6 h-6 text-yellow-500 mb-2" /> },
  ];

  return (
    <div className="content-inner flex flex-col px-6 md:px-12 lg:px-24 pt-8 gap-16">
      <div className="dashboard-title">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Dashboard</h2>
      </div>

      {/* Responsive Grid */}
      <div className="section-first grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg p-5 flex flex-col justify-center items-center shadow-md"
          >
            {item.icon}
            <div className="text-center">
              <h2 className="text-lg font-medium">{item.title}</h2>
              <h2 className="text-lg font-semibold text-blue-600">{item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="section-second bg-white rounded-lg p-4 mb-6 w-full shadow-md">
        <h2 className="text-xl font-medium text-center">Previous Orders</h2>
      </div>
    </div>
  )
}
