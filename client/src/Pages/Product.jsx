import { BasicBreadcrumbs } from '@/Components/Breadcrumbs/Breadcrumbs';
import { ProductDisplay } from '@/Components/ProductDisplay/ProductDisplay';
import React from 'react'
import { useParams } from 'react-router-dom';

export const Product = () => {
  const { productId } = useParams()
  return (
    <div>
      <BasicBreadcrumbs />
      <ProductDisplay/>
      <div>Product</div>
      {productId &&
        <h1>Product Id : {productId}</h1>
      }
    </div>
  )
}
