import React, { useEffect, useState } from 'react'
import "./CSS/HomePage.css"
import "../App.css"
import { Carousel } from '@/Components/Carousel/Carousel'
import { Category } from '@/Components/Category/Category'
import { Item } from '@/Components/Item/Item'

export const HomePage = () => {

  const [featuredProd, setFeaturedProd] = useState([])
  const [loaded, setLoaded] = useState(false)

  const params = new URLSearchParams({
    "orderBy": "default",
    "limit": 4
  })

  const getFeaturedProducts = () => {
    fetch(`/api/products/?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json())
      .then((data) => {
        setFeaturedProd([...data])
        setLoaded(true)
      })
  }

  useEffect(() => {
    getFeaturedProducts()
  }, [])

  const placeholderProd = {
    product_id: "XX_XXX",
    name: "Lorem Ipsum Lorem Ipsum Lorem Ipsum",
    price: "XXX"
  }

  return (
    <div>
      <Carousel />
      <Category />
      <div className="text-center">
        <h1 className="text-5xl pt-4 mb-10" style={{ fontFamily: "DM Sans" }}>
          Our Featured Products
        </h1>
      </div>
      <div className="product-grid-container">
        {loaded ? (
          featuredProd.map((el, i) => (
            <Item product={el} key={i} />
          ))
        ) : (
          Array.from({ length: 4 }).map((_, i) => (
            <Item product={placeholderProd} key={i} />
          ))
        )
        }
      </div>
    </div>
  )
}
