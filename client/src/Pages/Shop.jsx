import React, { useEffect, useState } from 'react'
import "./CSS/Shop.css"
import "../App.css"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination"

import { Link, useLocation, useParams } from "react-router-dom"

import { Shop_Item } from '@/Components/Shop_Item/Shop_Item'
import { Sort } from '@/Components/Sort/Sort'
import { Filters } from '@/Components/Filters/Filters'

// WARN: Test Limit
const PRODUCT_LIMIT = 4 * 3

export const Shop = () => {
  const { pageNo } = useParams()

  const [sortValue, setSortValue] = useState("")
  const [priceRange, setPriceRange] = useState([null, null]);
  const [priceExtremes, setPriceExtremes] = useState([0, 0])
  const [pageIndexes, setPageIndexes] = useState([])

  const [productData, setProductData] = useState([])
  const [totalProducts, setTotalProducts] = useState(0)

  const [selectedFilters, setSelectedFilters] = useState([])

  const [loaded, setLoaded] = useState(false)

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const searchQueryPreset = queryParams.get("q")

  const getProducts = ({ orderBy = null, minPrice = null, maxPrice = null } = {}) => {
    const params = new URLSearchParams({ "limit": PRODUCT_LIMIT })

    if (searchQueryPreset !== null && searchQueryPreset !== undefined) { params.append("q", searchQueryPreset) }
    if (orderBy !== null && orderBy !== undefined) { params.append("orderBy", orderBy) }
    if ((minPrice !== null && minPrice !== undefined)) { params.append("minPrice", minPrice !== null ? minPrice : sortValue[0]) }
    if ((maxPrice !== null && maxPrice !== undefined)) { params.append("maxPrice", maxPrice !== null ? maxPrice : sortValue[1]) }
    if (selectedFilters.length) { params.append("categories", selectedFilters.join(",")) }

    const apiQuery = `/api/products/${pageNo !== undefined ? "page/" + (pageNo - 1) : ""}?${params.toString()}`

    fetch(apiQuery, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(resp => resp.json())
      .then(data => {
        const minPrice = parseInt(data["minPrice"] / 50) * 50
        const maxPrice = parseInt(data["maxPrice"] / 50) * 50

        setPriceExtremes([minPrice, maxPrice])

        if ((priceRange[0] === null || priceRange[1] === null)) {
          setPriceRange([minPrice - 50, maxPrice + 50])
        }

        setProductData(data["products"])
        setTotalProducts(data["totalProducts"])

        setLoaded(true)
      })
  }

  const calculatePages = (pageNoStr) => {
    const pageIndexes = []
    const bufferLen = 2
    const pageNo = parseInt(pageNoStr ? pageNoStr : "1")
    const totalPages = Math.ceil(totalProducts / PRODUCT_LIMIT)

    if (pageNo > 1) {
      pageIndexes.push({ index: "prev", link: pageNo - 1 !== 1 ? `/shop/page/${pageNo - 1}` : `/shop` })
    }

    let i = 1

    for (i; i <= ((bufferLen < totalPages) ? bufferLen : totalPages); i++) {
      // if (pageIndexes.find((pageIdx) => pageIdx.index === i)) { break }
      if (i <= totalPages) {
        pageIndexes.push({
          index: i,
          link: i !== 1 ? `/shop/page/${i}` : `/shop`
        })
      }
    }

    if (pageNo + parseInt(bufferLen / 2) > bufferLen) {
      if (pageNo > bufferLen * 2) { pageIndexes.push({ index: "ellipsis" }) }

      for (i = pageNo - parseInt(bufferLen / 2); i <= pageNo + parseInt(bufferLen / 2); i++) {
        if (!pageIndexes.find((pageIdx) => pageIdx.index === i) && (i <= totalPages))
          pageIndexes.push({
            index: i,
            link: `/shop/page/${i}`
          })
      }
    }

    if (totalPages - bufferLen > 0) {
      if (pageNo < (totalPages - (bufferLen * 2) + 1)) { pageIndexes.push({ index: "ellipsis" }) }

      for (i = totalPages - bufferLen + 1; i <= totalPages; i++) {
        if (!pageIndexes.find((pageIdx) => pageIdx.index === i))
          pageIndexes.push({
            index: i,
            link: `/shop/page/${i}`
          })
      }
    }

    if (pageNo !== totalPages) { pageIndexes.push({ index: "next", link: `/shop/page/${pageNo + 1}` }) }

    setPageIndexes(pageIndexes.length > 1 ? pageIndexes : [])
  }

  useEffect(() => {
    getProducts({ orderBy: sortValue, minPrice: priceRange[0], maxPrice: priceRange[1] })
  }, [pageNo, selectedFilters, location])

  useEffect(() => {
    calculatePages(pageNo)
  }, [pageNo, totalProducts])

  return (
    <div>
      <div className="shop-header">
        <>Shop</>
      </div>

      {/* breadcrumb */}
      <div className="shop-breadcrumb ml-9 mt-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to="/shop">Shop</Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* For large screens  */}
      <div className="shop-main hidden md:block">
        <div className="shop-sort">
          <Sort sortValue={sortValue} setSortValue={setSortValue} getProducts={getProducts} priceRange={priceRange} />
        </div>

        <div className="shop-content">
          <Filters
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            priceExtremes={priceExtremes}
            getProducts={getProducts}
            sortValue={sortValue}
            productLength={productData.length}
            totalProducts={totalProducts}
            setSelectedFilters={setSelectedFilters}
            selectedFilters={selectedFilters}
            className="shop-filter"
          />

          <div className="products-grid-container" style={{ "textAlign": "center" }}>
            {loaded && productData.map((product, idx) => (
              <Shop_Item key={idx} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* For Small Screens  */}
      <div className="shop-main-mobile md:hidden">
        <div className="shop-sort-filter flex justify-center items-center pt-3">
          <Filters
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            priceExtremes={priceExtremes}
            getProducts={getProducts}
            sortValue={sortValue}
            productLength={productData.length}
            totalProducts={totalProducts}
            setSelectedFilters={setSelectedFilters}
            selectedFilters={selectedFilters}
            className="shop-filter"
          />
          <div className="shop-sort">
            <Sort sortValue={sortValue} setSortValue={setSortValue} getProducts={getProducts} priceRange={priceRange} />
          </div>
        </div>

        <div className="shop-content">
          <div className="products-grid-container" style={{ "textAlign": "center" }}>
            {loaded && productData.map((product, idx) => (
              <Shop_Item key={idx} product={product} />
            ))}
          </div>
        </div>
      </div>

      <Pagination className="mb-10">
        <PaginationContent>
          {pageIndexes.length ? (pageIndexes.map(page => ((
            < PaginationItem key={page.index} >
              {
                ["next", "prev", "ellipsis"].includes(page.index) ? (
                  page.index === "next" ? (
                    <PaginationNext onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} to={page.link} />
                  ) : (
                    page.index === "prev" ? (
                      <PaginationPrevious onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} to={page.link} />
                    ) : (
                      <PaginationEllipsis />
                    ))) : (
                  <PaginationLink onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} to={page.link}>{page.index}</PaginationLink>
                )
              }
            </PaginationItem>
          )
          ))) : (
            <></>
          )}
        </PaginationContent>
      </Pagination >
    </div >
  )
}
