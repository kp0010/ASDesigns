import { Carousel } from '@/Components/Carousel/Carousel'
import { Category } from '@/Components/Category/Category'
import { Item } from '@/Components/Item/Item'
import React from 'react'

export const HomePage = () => {
  return (
    <div>
        <Carousel />
        <Category />
        <Item />
    </div>
  )
}
