import { Carousel } from '@/Components/Carousel/Carousel'
import { Category } from '@/Components/Category/Category'
import { Item } from '@/Components/Item/Item'
import "./CSS/HomePage.css"
import React from 'react'

export const HomePage = () => {
  return (
    <div>
      <Carousel />
      <Category />
      <div className="product-grid-container">
            {Array.from({ length: 4 }).map((_, i) => (
                <Item key={i} />
            ))}
        </div>
    </div>
  )
}
