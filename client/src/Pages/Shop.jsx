import React from 'react'
import "./CSS/Shop.css"
import "../App.css"
import { useState } from 'react'
import { useParams } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"


export const Shop = () => {
  const { productId } = useParams()

  const [product, setProduct] = useState({})
  const [categories, setCategories] = useState([])

  return (
    <div>
      <div className="shop-header">
        <h2>Shop</h2>
      </div>
      <div className="shop-breadcrumb ml-9 mt-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="shop-sort">
        <h2>sorting</h2>
      </div>
    </div>
  )
}
