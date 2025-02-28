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

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/Components/ui/command"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover"

import { Slider } from "@/Components/ui/dualrangeslider.jsx"
import { Badge } from "@/Components/ui/badge"

import { Link, useParams } from "react-router-dom"

import { Shop_Item } from '@/Components/Shop_Item/Shop_Item'
import { Sort } from '@/Components/Sort/Sort'
import { Filters } from '@/Components/Filters/Filters'

// WARN: Test Limit
const PRODUCT_LIMIT = 6

const sortOptions = [
  {
    value: "default",
    label: "Relevance",
  },
  {
    value: "popular",
    label: "Popular",
  },
  {
    value: "price_asc",
    label: "Price: Low to High",
  },
  {
    value: "price_desc",
    label: "Price: High to Low",
  },
  {
    value: "recent",
    label: "New Arrivals",
  },
]

export const Shop = ({ className }) => {
  const { pageNo } = useParams()

  // const [open, setOpen] = useState(false)
  const [sortValue, setSortValue] = useState("")

  const [priceRange, setPriceRange] = useState([null, null]);

  const [priceExtremes, setPriceExtremes] = useState([0, 0])
  const [productData, setProductData] = useState([])
  const [totalProducts, setTotalProducts] = useState(0)

  const [loaded, setLoaded] = useState(false)

  const [pageIndexes, setPageIndexes] = useState([])

  const getProducts = ({
    orderBy = null, minPrice = null, maxPrice = null
  } = {}) => {

    const params = new URLSearchParams({ "limit": PRODUCT_LIMIT })

    if (orderBy !== null && orderBy !== undefined) {
      params.append("orderBy", orderBy)
    }

    if ((minPrice !== null && minPrice !== undefined)) {
      params.append("minPrice", minPrice !== null ? minPrice : sortValue[0])
    }

    if ((maxPrice !== null && maxPrice !== undefined)) {
      params.append("maxPrice", maxPrice !== null ? maxPrice : sortValue[1])
    }

    fetch(`/api/products/${pageNo !== undefined ? "page/" + (pageNo - 1) : ""}?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(resp => resp.json())
      .then(data => {
        const minPrice = parseInt(data["minPrice"])
        const maxPrice = parseInt(data["maxPrice"])

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
    const pageIndexes = [];
    const addedIndexes = new Set();
    const bufferLen = 2;
    const pageNo = parseInt(pageNoStr || "1", 10);
    const totalPages = Math.ceil(totalProducts / PRODUCT_LIMIT);

    if (pageNo < 1 || pageNo > totalPages) return;

    // Helper function to add a page index if not already added
    const addPageIndex = (index) => {
      if (!addedIndexes.has(index) && index > 0 && index <= totalPages) {
        pageIndexes.push({
          index,
          link: index !== 1 ? `/shop/page/${index}` : `/shop`,
        });
        addedIndexes.add(index);
      }
    };

    // Add Previous Button
    if (pageNo > 1) {
      pageIndexes.push({ index: "prev", link: `/shop/page/${pageNo - 1}` });
    }

    // Add first few pages
    for (let i = 1; i <= Math.max(bufferLen, pageNo); i++) {
      addPageIndex(i);
    }

    // Add middle ellipsis and nearby pages
    if (pageNo > bufferLen * 2) {
      pageIndexes.push({ index: "ellipsis" });
      for (let i = Math.max(bufferLen + 1, pageNo - Math.floor(bufferLen / 2)); i <= Math.min(pageNo + Math.floor(bufferLen / 2), totalPages); i++) {
        addPageIndex(i);
      }
    }

    // Add trailing ellipsis and last few pages
    if (totalPages > bufferLen * 2 + 1 && pageNo < totalPages - bufferLen * 2) {
      pageIndexes.push({ index: "ellipsis" });
      for (let i = totalPages - bufferLen + 1; i <= totalPages; i++) {
        addPageIndex(i);
      }
    }

    // Add Next Button
    if (pageNo < totalPages) {
      pageIndexes.push({ index: "next", link: `/shop/page/${pageNo + 1}` });
    }

    setPageIndexes(pageIndexes);
  };

  useEffect(() => {
    getProducts()
  }, [pageNo])

  useEffect(() => {
    calculatePages(pageNo)
  }, [pageNo, totalProducts])

  const sports = [
    "Cricket",
    "Football",
    "Basketball"
  ];

  const festivals = [
    "Ganesh Jayanti",
    "Diwali",
    "New Year Special"
  ];

  const tags = [
    "CDR File",
    "PSD File",
    "Vector Design",
    "Jersey Type",
    "Limited Edition",
    "Premium Quality",
    "Customizable",
    "High Resolution",
    "Eco-friendly",
    "Lightweight Fabric"
  ]

  const handleCheckboxClick = (event) => {
    const checkbox = event.currentTarget.previousSibling;
    checkbox.checked = !checkbox.checked;
  };

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

      {/* sorting combobox */}
      <div className="shop-sort">
        <Sort sortValue={sortValue} setSortValue={setSortValue} getProducts={getProducts} priceRange={priceRange} />
        {/* <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {sortValue
                ? sortOptions.find((sortOption) => sortOption.value === sortValue)?.label
                : "Sort by..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Sort by..." />
              <CommandList>
                <CommandEmpty>No Sort by found.</CommandEmpty>
                <CommandGroup>
                  {sortOptions.map((sortOption) => (
                    <CommandItem
                      key={sortOption.value}
                      value={sortOption.value}
                      onSelect={(currentValue) => {
                        setSortValue(currentValue === sortValue ? "" : currentValue)
                        if (currentValue !== sortValue) {
                          getProducts({
                            orderBy: currentValue,
                            minPrice: priceRange[0],
                            maxPrice: priceRange[1]
                          })
                        }
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          sortValue === sortOption.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {sortOption.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover> */}
      </div>

      <div className="shop-main">
        <Filters
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          priceExtremes={priceExtremes}
          getProducts={getProducts}
          sortValue={sortValue}
        />
        {/* <div className="shop-filters">
          <div className="shop-filters-head">
            <h2>Filters</h2>
          </div>
          <span className='mt-2'>{`Showing ${productData.length} Results Out Of ${totalProducts !== 0 && totalProducts}`}</span>
          <div className="shop-filters-category">
            <h2>Category</h2>
            <ul className="shop-flters-ul">
              <li>
                <label htmlFor="" className="shop-filters-label">
                  <input type="checkbox" />
                  <span className="checkmark" onClick={handleCheckboxClick}></span>
                  <span className="shop-filters-label-name">Sports</span>
                </label>
              </li>
              <ul className="shop-filters-ul-inner">
                {sports.map((sport, index) => (
                  <li key={index}>
                    <label htmlFor="" className="shop-filters-label">
                      <input type="checkbox" />
                      <span className="checkmark" onClick={handleCheckboxClick}></span>
                      <span className="shop-filters-label-name">{sport}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <li>
                <label htmlFor="" className="shop-filters-label">
                  <input type="checkbox" />
                  <span className="checkmark" onClick={handleCheckboxClick}></span>
                  <span className="shop-filters-label-name">Festivals</span>
                </label>
              </li>
              <ul className="shop-filters-ul-inner">
                {festivals.map((festival, index) => (
                  <li key={index}>
                    <label htmlFor="" className="shop-filters-label">
                      <input type="checkbox" />
                      <span className="checkmark" onClick={handleCheckboxClick}></span>
                      <span className="shop-filters-label-name">{festival}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </ul>
          </div>
          <div className="shop-filters-price">
            <h2>Price</h2>
            <div className="shop-filters-price-range">
              <span>{priceRange[0]}</span>
              <span>{priceRange[1]}</span>
            </div>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}

              onValueCommit={(...args) => getProducts({
                orderBy: sortValue,
                minPrice: args[0][0],
                maxPrice: args[0][1]
              })}

              min={priceExtremes[0] - 50}
              max={priceExtremes[1] + 50}

              step={50}
              minStepsBetweenThumbs={1}

              className={cn('w-[90%]', className)} />
          </div>
          <div className="shop-filters-tags">
            <h2>Tags</h2>
            <div className="shop-filters-tags-content">
              {tags.map((tag, index) => (
                <Badge key={index} className="shop-filters-tags-badge">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div> */}


        <div className="shop-content products-grid-container" style={{ "textAlign": "center" }}>
          {loaded && productData.map((product, idx) => (
            <Shop_Item key={idx} product={product} />
          ))}
        </div>

      </div>

      <Pagination className="mb-10">
        <PaginationContent>
          {pageIndexes.length && pageIndexes.map(page => ((

            <PaginationItem key={page.index}>
              {["next", "prev", "Ellipsis"].includes(page.index) ? (
                page.index === "next" ? (
                  <PaginationNext onClick={window.scrollTo({ top: 0, behavior: "smooth" })} to={page.link} />
                ) : (
                  page.index === "prev" ? (
                    <PaginationPrevious onClick={window.scrollTo({ top: 0, behavior: "smooth" })} to={page.link} />
                  ) : (
                    <PaginationEllipsis />
                  ))) : (
                <PaginationLink onClick={window.scrollTo({ top: 0, behavior: "smooth" })} to={page.link}>{page.index}</PaginationLink>
              )}
            </PaginationItem>
          )
          ))}
        </PaginationContent>
      </Pagination>
    </div >
  )
}
