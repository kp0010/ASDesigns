import { BasicBreadcrumbs } from '@/Components/Breadcrumbs/Breadcrumbs';
import { ProductDisplay } from '@/Components/ProductDisplay/ProductDisplay';
import { Related_Products } from '@/Components/Related_Products/Related_Products';
import React, { useState, useEffect } from 'react'
import { Related_Products } from '@/Components/Related_Products/Related_Products';
import { useParams } from 'react-router-dom';

export const Product = () => {
  const { productId } = useParams()

  const [product, setProduct] = useState({})
  const [categories, setCategories] = useState([])

  const getProduct = () => {
    fetch(`/api/products/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json())
      .then((data) => {
        setProduct(data["product"])
        setCategories(data["categories"])
      })
  }

  useEffect(() => {
    getProduct()
  }, [productId])

  return (
    <div>
      <BasicBreadcrumbs categories={categories} />
      <ProductDisplay product={product} categories={categories} productId={productId} />
      <Related_Products/>
    </div>
  )
}
