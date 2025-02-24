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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover"

import { Slider } from '@/Components/ui/dualrangeslider.jsx'
import { Badge } from '@/Components/ui/badge'
import { Item } from '@/Components/Item/Item'

const sortOptions = [
  {
    value: "default",
    label: "Default",
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
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const [range, setRange] = useState([null, null]);

  const [priceExtremes, setPriceExtremes] = useState([0, 0])
  const [productData, setProductData] = useState([])
  const [loaded, setLoaded] = useState(false)

  const getProducts = (...args) => {

    const params = new URLSearchParams({})

    if (args.length === 1) {
      params.append("orderBy", args[0] || value)
    }
    if (range[0] !== null) {
      params.append("minPrice", range[0])
    }
    if (range[1] !== null) {
      params.append("maxPrice", range[1])
    }

    fetch(`/api/products/?${params.toString()}`, {
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

        if ((range[0] === null || range[1] === null)) {
          setRange([minPrice - 50, maxPrice + 50])
        }

        setProductData(data["products"])

        setLoaded(true)
      })
  }

  useEffect(() => {
    getProducts()
  }, [])

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
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* sorting combobox */}
      <div className="shop-sort">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? sortOptions.find((sortOption) => sortOption.value === value)?.label
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
                        setValue(currentValue === value ? "" : currentValue)
                        if (currentValue !== value) { getProducts(currentValue) }
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === sortOption.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {sortOption.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="shop-main">
        <div className="shop-filters">
          <div className="shop-filters-head">
            <h2>Filters</h2>
          </div>
          <div className="shop-filters-category">
            <h2>Category</h2>
            <ul className="shop-flters-ul">
              <li>
                <label htmlFor="" className="shop-filters-label">
                  <input type="checkbox" />
                  <span className="checkmark" onClick={handleCheckboxClick}></span> <span>Sports</span>
                </label>
              </li>
              <ul className="shop-filters-ul-inner">
                {sports.map((sport, index) => (
                  <li key={index}>
                    <label htmlFor="" className="shop-filters-label">
                      <input type="checkbox" />
                      <span className="checkmark" onClick={handleCheckboxClick}></span>{sport}
                    </label>
                  </li>
                ))}
              </ul>
              <li>
                <label htmlFor="" className="shop-filters-label">
                  <input type="checkbox" />
                  <span className="checkmark" onClick={handleCheckboxClick}></span>Festivals
                </label>
              </li>
              <ul className="shop-filters-ul-inner">
                {festivals.map((festival, index) => (
                  <li key={index}>
                    <label htmlFor="" className="shop-filters-label">
                      <input type="checkbox" />
                      <span className="checkmark" onClick={handleCheckboxClick}></span>{festival}
                    </label>
                  </li>
                ))}
              </ul>
            </ul>
          </div>
          <div className="shop-filters-price">
            <h2>Price</h2>
            <span>{range[0] + "  " + range[1]}</span>
            <Slider
              value={range}
              onValueChange={setRange}
              onValueCommit={() => getProducts(value)}
              min={priceExtremes[0] - 50}
              max={priceExtremes[1] + 50}
              minStepsBetweenThumbs={1}
              step={50}
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

        </div>


        <div className="shop-content product-grid-container" style={{ "textAlign": "center" }}>
          {loaded && productData.map((product, idx) => (
            <Item key={idx} product={product} />
          ))}
        </div>
      </div>
    </div >
  )
}
