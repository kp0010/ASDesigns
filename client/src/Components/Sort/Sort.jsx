import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/Components/ui/command";
import { Button } from "@/Components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const sortOptions = [
    { value: "default", label: "Relevance" },
    { value: "popular", label: "Popular" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "recent", label: "New Arrivals" },
];

export const Sort = ({ sortValue, setSortValue, getProducts, priceRange }) => {
    const [open, setOpen] = useState(false);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
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
                                        setSortValue(currentValue === sortValue ? "" : currentValue);
                                        if (currentValue !== sortValue) {
                                            getProducts({
                                                orderBy: currentValue,
                                                minPrice: priceRange[0],
                                                maxPrice: priceRange[1],
                                            });
                                        }
                                        setOpen(false);
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
        </Popover>
    );
};
