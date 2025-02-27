import React from 'react'
import "./Filters.css"
import "../../App.css"
import { Slider } from "@/Components/ui/dualrangeslider.jsx";
import { Badge } from "@/Components/ui/badge";

export const Filters = ({ priceRange, setPriceRange, priceExtremes, getProducts, sortValue }) => {

    // TODO: If admin wants to add Tags and Categories, then it should come from database
    // const sports = ["Cricket", "Football", "Basketball"];
    // const festivals = ["Ganesh Jayanti", "Diwali", "New Year Special"];
    const categories = {
        Sports: ["Cricket", "Football", "Basketball"],
        Festivals: ["Ganesh Jayanti", "Diwali", "New Year Special"]
    };

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

    const handleCheckboxClick = (event) => {
        const checkbox = event.currentTarget.previousSibling;
        checkbox.checked = !checkbox.checked;
    };
    return (
        <div className="shop-filters">
            <div className="shop-filters-head">
                <h2>Filters</h2>
            </div>

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
                    {Object.entries(categories).map(([category, subcategories], index) => (
                        <li key={index}>
                            <label className="shop-filters-label">
                                <input type="checkbox" />
                                <span className="checkmark" onClick={handleCheckboxClick}></span>
                                <span className="shop-filters-label-name">{category}</span>
                            </label>
                            <ul className="shop-filters-ul-inner">
                                {subcategories.map((sub, subIndex) => (
                                    <li key={subIndex}>
                                        <label className="shop-filters-label">
                                            <input type="checkbox" />
                                            <span className="checkmark" onClick={handleCheckboxClick}></span>
                                            <span className="shop-filters-label-name">{sub}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
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
