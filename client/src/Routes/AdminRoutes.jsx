import { AddProducts } from '@/Pages/Admin/AddProducts'
import { AdminDashboard } from '@/Pages/Admin/AdminDashboard'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

export const AdminRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="products/add" element={<AddProducts />} />
        {/* need to add more */}
    </Routes>
  )
}
