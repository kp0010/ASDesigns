import React, { useEffect } from 'react'
import "./Filters.css"
import "../../App.css"
import { Slider } from "@/Components/ui/dualrangeslider.jsx";
import { Badge } from "@/Components/ui/badge";
import { useState } from 'react';

export const Filters = ({ priceRange,
    setPriceRange,
    priceExtremes,
    getProducts,
    sortValue,
    productLength,
    totalProducts,
    selectedFilters,
    setSelectedFilters,
}) => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch('/api/categories', {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.success) { setCategories(data.categoryTree); console.log("DATA", data.categoryTree) }
            })
    }, [])


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
        "Lightweight Fabric",
    ];

    const handleCheckboxClick = (category) => {
        setSelectedFilters((prevFilters) => {
            let newFilters = new Set(prevFilters);

            if (newFilters.has(category.name)) {
                newFilters.delete(category.name);
                uncheckChildren(category, newFilters);
            } else {
                newFilters.add(category.name);
                checkChildren(category, newFilters);
            }

            updateParentSelection(category, newFilters);

            return Array.from(newFilters);
        });
    };

    const checkChildren = (category, filters) => {
        if (category.children) {
            category.children.forEach(child => {
                filters.add(child.name);
                checkChildren(child, filters);
            });
        }
    };

    const uncheckChildren = (category, filters) => {
        if (category.children) {
            category.children.forEach(child => {
                filters.delete(child.name);
                uncheckChildren(child, filters);
            });
        }
    };

    const updateParentSelection = (category, filters) => {
        if (!category.parent) return;

        let allSiblingsChecked = category.parent.children.every(child => filters.has(child.name));

        if (allSiblingsChecked) {
            filters.add(category.parent.name);
        } else {
            filters.delete(category.parent.name);
        }

        updateParentSelection(category.parent, filters);
    };

    const renderCategories = (categories, parent = null) => {
        if (!categories.length) { return }

        return (
            categories.map((category, index) => {
                let categoryWithParent = { ...category, parent };
                console.log(categoryWithParent)

                return (
                    < li key={index} >
                        <label className="shop-filters-label">
                            <input type="checkbox" checked={selectedFilters.includes(category.name)} onChange={() => handleCheckboxClick(categoryWithParent)} />
                            <span className="checkmark"></span>
                            <span className="shop-filters-label-name" onClick={() => handleCheckboxClick(categoryWithParent)}>{category.name}</span>
                        </label>
                        <ul className="shop-filters-ul-inner">
                            {category.children.length > 0 && renderCategories(category.children, categoryWithParent)}
                        </ul>
                    </li >
                )
            })
        )
    }

    return (
        <div className="shop-filters">
            <div className="shop-filters-head">
                <h2>Filters</h2>
            </div>

            <span className='mt-2'>Showing {productLength} Results out of {totalProducts}</span>

            <div className="shop-filters-category">
                <h2>Category</h2>
                {/* <ul className="shop-flters-ul">
                    <li>
                        <label className="shop-filters-label">
                            <input type="checkbox" />
                            <span className="checkmark" onClick={handleCheckboxClick}></span>
                            <span className="shop-filters-label-name">Sports</span>
                        </label>
                    </li>
                    <ul className="shop-filters-ul-inner">
                        {sports.map((sport, index) => (
                            <li key={index}>
                                <label className="shop-filters-label">
                                    <input type="checkbox" />
                                    <span className="checkmark" onClick={handleCheckboxClick}></span>
                                    <span className="shop-filters-label-name">{sport}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                    <li>
                        <label className="shop-filters-label">
                            <input type="checkbox" />
                            <span className="checkmark" onClick={handleCheckboxClick}></span>
                            <span className="shop-filters-label-name">Festivals</span>
                        </label>
                    </li>
                    <ul className="shop-filters-ul-inner">
                        {festivals.map((festival, index) => (
                            <li key={index}>
                                <label className="shop-filters-label">
                                    <input type="checkbox" />
                                    <span className="checkmark" onClick={handleCheckboxClick}></span>
                                    <span className="shop-filters-label-name">{festival}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </ul> */}
                <ul className="shop-filters-ul">
                    {categories.length > 0 && renderCategories(categories)}
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
                    onValueCommit={(...args) =>
                        getProducts({
                            orderBy: sortValue,
                            minPrice: args[0][0],
                            maxPrice: args[0][1],
                        })
                    }
                    min={priceExtremes[0] - 50}
                    max={priceExtremes[1] + 50}
                    step={50}
                    minStepsBetweenThumbs={1}
                    className="w-[90%]"
                />
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
    );
};
