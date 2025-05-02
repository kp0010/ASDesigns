import React from 'react'

import { AddProducts } from '@/Pages/Admin/AddProducts'
import { AdminDashboard } from '@/Pages/Admin/AdminDashboard'
import { PreviousOrders } from '@/Pages/Admin/PreviousOrders'
import { ProductList } from '@/Pages/Admin/ProductList'
import { Users } from '@/Pages/Admin/Users'

import { Route, Routes } from 'react-router-dom'
import { EditProducts } from '@/Pages/Admin/EditProducts'
import { DelProducts } from '@/Pages/Admin/DelProducts'
import { CategoriesList } from '@/Pages/Admin/CategoriesList'
import { AddCategory } from '@/Pages/Admin/AddCategory'
import { TagsList } from '@/Pages/Admin/TagsList'
import { AddTag } from '@/Pages/Admin/AddTags'

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="products/add" element={<AddProducts />} />
      <Route path="products/list/page?/:pageNo?" element={<ProductList />} />
      <Route path="products/delete/page?/:pageNo?" element={<DelProducts />} />
      <Route path="products/categories" element={<CategoriesList/>} />
      <Route path="products/addcategories" element={<AddCategory/>} />
      <Route path="products/tagslist" element={<TagsList/>} />
      <Route path="products/addtag" element={<AddTag/>} />
      <Route path="previousOrders" element={<PreviousOrders />} />
      <Route path="users" element={<Users />} />
      <Route path="products/edit" element={<EditProducts />} />
    </Routes>
  )
}

