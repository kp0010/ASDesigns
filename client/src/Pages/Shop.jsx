import React, { useCallback, useEffect, useState } from 'react'
import "./CSS/Shop.css"
import "../App.css"

import { motion } from "framer-motion";

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

import { Link, useLocation, useNavigate, useParams } from "react-router-dom"

import { Shop_Item } from '@/Components/Shop_Item/Shop_Item'
import { Sort } from '@/Components/Sort/Sort'
import { Filters } from '@/Components/Filters/Filters'

// WARN: Test Limit
const PRODUCT_LIMIT = 4 * 3


export const Shop = () => {
  const { pageNo, category } = useParams()
  const categoryTC = category ? category.charAt(0).toUpperCase() + category.substring(1).toLowerCase() : "Shop"

  const [sortValue, setSortValue] = useState("")
  const [priceRange, setPriceRange] = useState([null, null]);
  const [priceExtremes, setPriceExtremes] = useState([0, 0])
  const [pageIndexes, setPageIndexes] = useState([])

  const [productData, setProductData] = useState([])
  const [totalProducts, setTotalProducts] = useState(0)

  const [selectedFilters, setSelectedFilters] = useState([])

  const [loaded, setLoaded] = useState(false)

  const navigate = useNavigate()

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const searchQueryPreset = queryParams.get("q")


  const getProducts = useCallback(({ orderBy = null, minPrice = null, maxPrice = null, selectedFilters = [] } = {}) => {
    setLoaded(false)
    const params = new URLSearchParams({ "limit": PRODUCT_LIMIT })

    if (searchQueryPreset) {
      params.append("q", searchQueryPreset)
    } else {
      if (params.has("q") && !params.get("q").length) {
        params.delete("q")
      }
    }

    if (orderBy || sortValue) { params.set("orderBy", orderBy ? orderBy : sortValue) }
    if (minPrice || priceRange[0]) { params.set("minPrice", minPrice ? minPrice : priceRange[0]) }
    if (maxPrice || priceRange[1]) { params.set("maxPrice", maxPrice ? maxPrice : priceRange[1]) }

    if (category) { params.set("categories", category.toLowerCase()) }
    if (selectedFilters.length) { params.set("categories", selectedFilters.join(",")) }

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

        setTimeout(() => {
          setLoaded(true)
        }, 200)
      })
  }, [searchQueryPreset, selectedFilters, sortValue, pageNo, priceRange, category])


  const calculatePages = (pageNoStr) => {
    const pageIndexes = []
    const bufferLen = 2
    const pageNo = parseInt(pageNoStr ? pageNoStr : "1")
    const totalPages = Math.ceil(totalProducts / PRODUCT_LIMIT)
    const base = `/shop${category ? `/${category}` : ""}`

    if (pageNo > 1) {
      pageIndexes.push({ index: "prev", link: pageNo - 1 !== 1 ? base + `/page/${pageNo - 1}` : base + `` })
    }

    let i = 1

    for (i; i <= ((bufferLen < totalPages) ? bufferLen : totalPages); i++) {
      // if (pageIndexes.find((pageIdx) => pageIdx.index === i)) { break }
      if (i <= totalPages) {
        pageIndexes.push({
          index: i,
          link: i !== 1 ? base + `/page/${i}` : base + ``
        })
      }
    }

    if (pageNo + parseInt(bufferLen / 2) > bufferLen) {
      if (pageNo > bufferLen * 2) { pageIndexes.push({ index: "ellipsis" }) }

      for (i = pageNo - parseInt(bufferLen / 2); i <= pageNo + parseInt(bufferLen / 2); i++) {
        if (!pageIndexes.find((pageIdx) => pageIdx.index === i) && (i <= totalPages))
          pageIndexes.push({
            index: i,
            link: base + `/page/${i}`
          })
      }
    }

    if (totalPages - bufferLen > 0) {
      if (pageNo < (totalPages - (bufferLen * 2) + 1)) { pageIndexes.push({ index: "ellipsis" }) }

      for (i = totalPages - bufferLen + 1; i <= totalPages; i++) {
        if (!pageIndexes.find((pageIdx) => pageIdx.index === i))
          pageIndexes.push({
            index: i,
            link: base + `/page/${i}`
          })
      }
    }

    if (pageNo !== totalPages) { pageIndexes.push({ index: "next", link: base + `/page/${pageNo + 1}` }) }

    setPageIndexes(pageIndexes.length > 1 ? pageIndexes : [])
  }

  useEffect(() => {
    setSelectedFilters([])
    getProducts()
  }, [category])

  useEffect(() => {
    getProducts({ selectedFilters: selectedFilters })
  }, [pageNo])

  useEffect(() => {
    calculatePages(pageNo)
  }, [pageNo, totalProducts])

  const handlePaginationClick = (e) => {
    e.preventDefault()
    const nextPageLink = e.currentTarget.getAttribute("link")
    window.scrollTo({ top: 0, behavior: "smooth" })

    const params = new URLSearchParams(location.search)

    setLoaded(false)
    navigate(nextPageLink + (params.size ? `/?${params.toString()}` : ""))
  }

  return (
    <div>
      <div className="shop-header">
        <>{categoryTC}</>
      </div>

      {/* breadcrumb */}
      <div className="shop-breadcrumb ml-9 mt-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbLink asChild>
              <Link to="/shop">Shop</Link>
            </BreadcrumbLink>
            {category && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbLink asChild>
                  <Link to={`/ shop / ${category}`}>{categoryTC}</Link>
                </BreadcrumbLink>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* For large screens  */}
      <div className="shop-main hidden md:block">
        <div className="shop-sort">
          <Sort
            sortValue={sortValue}
            setSortValue={setSortValue}
            getProducts={getProducts}
            priceRange={priceRange}
            setLoaded={setLoaded}
          />
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
            filterSidebarRender={false}
            category={category ? categoryTC : null}
            setLoaded={setLoaded}
            className="shop-filter"
          />

          <div className="products-grid-container" style={{ "textAlign": "center" }}>
            {loaded ? (
              productData.map((product, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.1, delay: idx * 0.05 }}
                >
                  <Shop_Item product={product} />
                </motion.div>
              ))
            ) : (
              Array(12)
                .fill()
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="shop_item_skeleton bg-gray-300 animate-pulse rounded-lg"
                  ></div>
                ))
            )}
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
            category={category ? categoryTC : null}
            filterSidebarRender={true}
            className="shop-filter"
          />
          <div className="shop-sort">
            <Sort
              sortValue={sortValue}
              setSortValue={setSortValue}
              getProducts={getProducts}
              priceRange={priceRange}
            />
          </div>
        </div>

        <div className="shop-content">
          <div className="products-grid-container" style={{ "textAlign": "center" }}>
            {loaded ? (
              productData.map((product, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                >
                  <Shop_Item product={product} />
                </motion.div>
              ))
            ) : (
              Array(12)
                .fill()
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-300 animate-pulse rounded-lg"
                  ></div>
                ))
            )}
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
                    <PaginationNext onClick={handlePaginationClick} link={page.link} />
                  ) : (
                    page.index === "prev" ? (
                      <PaginationPrevious onClick={handlePaginationClick} link={page.link} />
                    ) : (
                      <PaginationEllipsis />
                    ))) : (
                  <PaginationLink onClick={handlePaginationClick} link={page.link}>{page.index}</PaginationLink>
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
