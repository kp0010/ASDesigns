import * as React from 'react'
import "./CSS/Shop.css"
import "../App.css"
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { BasicBreadcrumbs } from '@/Components/Breadcrumbs/Breadcrumbs';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "default",
    label: "Default",
  },
  {
    value: "bestsellers",
    label: "Bestsellers",
  },
  {
    value: "low_to_high",
    label: "Price: Low to High",
  },
  {
    value: "high_to_low",
    label: "Price: High to Low",
  },
  
  {
    value: "new_arrivals",
    label: "New Arrivals",
  },
]

export const Shop = () => {
  // const { productId } = useParams()

  // const [product, setProduct] = useState({})
  // const [categories, setCategories] = useState([])

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <div>
      <div className="shop-header">
        <h2>Shop</h2>
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
                ? frameworks.find((framework) => framework.value === value)?.label
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
                  {frameworks.map((framework) => (
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
          Filters
        </div>
        <div className="shop-content" style={{ "text-align" : "center" }}>
          Products displayed
        </div>
      </div>
    </div>
  )
}
