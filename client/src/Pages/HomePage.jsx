import React from 'react'
import "../App.css"
import { Carousel } from '@/Components/Carousel/Carousel'
import { Category } from '@/Components/Category/Category'
import { Featured_Products } from '@/Components/Featured_Products/Featured_Products'

export const HomePage = () => {
  return (
    <div>
      <Carousel />
      <Category />
      <Featured_Products />
    </div>
  )
}
