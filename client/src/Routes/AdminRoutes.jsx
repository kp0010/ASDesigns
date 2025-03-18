import { AddProducts } from '@/Pages/Admin/AddProducts'
import { AdminDashboard } from '@/Pages/Admin/AdminDashboard'
import { PreviousOrders } from '@/Pages/Admin/PreviousOrders'
import { ProductList } from '@/Pages/Admin/ProductList'
import { Users } from '@/Pages/Admin/Users'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

export const AdminRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="products/add" element={<AddProducts />} />
        <Route path="products/list" element={<ProductList />} />
        <Route path="previousOrders" element={<PreviousOrders />} />
        <Route path="users" element={<Users />} />
        {/* need to add more */}
    </Routes>
  )
}
