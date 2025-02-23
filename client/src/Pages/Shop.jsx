import React, { useState } from 'react'
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
    value: "latest",
    label: "New Arrivals",
  },
]

export const Shop = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

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
                ? sortOptions.find((framework) => framework.value === value)?.label
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
                  {sortOptions.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === framework.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {framework.label}
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
            <div className="shop-filters-category">
              <h2>Category</h2>
              <ul>
                <li>
                  <label htmlFor="">
                    <input type="checkbox" />
                    <span>Sports</span>
                  </label>
                  <ul>
                    <li>Cricket</li>
                    <li>Football</li>
                    <li>Basketball</li>
                  </ul>
                </li>
              </ul>
            </div>

          </div>
        </div>


        <div className="shop-content" style={{ "text-align": "center" }}>
          Products displayed
        </div>
      </div>
    </div>
  )
}
