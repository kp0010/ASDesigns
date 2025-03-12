import { Dashboard } from '@/Components/Admin/Dashboard/Dashboard'
import { AdminPage } from '@/Pages/AdminPage'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

export const AdminRoutes = () => {
  return (
    <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        {/* need to add more */}
    </Routes>
  )
}
