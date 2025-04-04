import React from 'react'

import { AddProducts } from '@/Pages/Admin/AddProducts'
import { AdminDashboard } from '@/Pages/Admin/AdminDashboard'
import { PreviousOrders } from '@/Pages/Admin/PreviousOrders'
import { ProductList } from '@/Pages/Admin/ProductList'
import { Users } from '@/Pages/Admin/Users'

import { Route, Routes } from 'react-router-dom'
import { EditProducts } from '@/Pages/Admin/EditProducts'

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="products/add" element={<AddProducts />} />
      <Route path="products/list/page?/:pageNo?" element={<ProductList />} />
      <Route path="previousOrders" element={<PreviousOrders />} />
      <Route path="users" element={<Users />} />
      <Route path="products/edit" element={<EditProducts />} />
    </Routes>
  )
}
