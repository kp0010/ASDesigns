import React from 'react'
import { Home } from "lucide-react"

export const AdminDashboard = () => {
  return (
    <div className="content-inner flex flex-col px-24 pt-8 gap-16">
      <div className="dashboard-title">
        <h2 className="text-4xl font-bold text-center">Dashboard</h2>
      </div>
      <div className="section-first grid grid-cols-4 gap-12">
        <div className="total-orders bg-white rounded-lg p-4 flex flex-col w-full justify-center items-center shadow-md">
          <Home />
          <div className="orders-data pt-1">
            <h2 className="flex flex-col text-center text-xl font-medium">Total Orders</h2>
            <h2 className="flex flex-col text-center text-xl font-medium">34000</h2>
          </div>
        </div>
        <div className="total-products bg-white rounded-lg p-5 flex flex-col w-full justify-center items-center shadow-md">
          <Home />
          <div className="products-data pt-1">
            <h2 className="flex flex-col text-center text-xl font-medium">Total Products</h2>
            <h2 className="flex flex-col text-center text-xl font-medium">30000</h2>
          </div>
        </div>
        <div className="total-visitors bg-white rounded-lg p-4 flex flex-col w-full justify-center items-center shadow-md">
          <Home />
          <div className="visitors-data pt-1">
            <h2 className="flex flex-col text-center text-xl font-medium">Total Visitors</h2>
            <h2 className="flex flex-col text-center text-xl font-medium">20000</h2>
          </div>
        </div>
        <div className="total-revenue bg-white rounded-lg p-4 flex flex-col w-full justify-center items-center shadow-md">
          <Home />
          <div className="revenue-data pt-1">
            <h2 className="flex flex-col text-center text-xl font-medium">Total Revenue</h2>
            <h2 className="flex flex-col text-center text-xl font-medium">20000</h2>
          </div>
        </div>
      </div>
      <div className="section-second bg-white rounded-lg p-4 flex flex-col w-full justify-center items-center shadow-md">
        <div className="previous-orders">
          <h2 className="text-xl font-medium">Previous Orders</h2>
        </div>
      </div>
    </div>

  )
}
