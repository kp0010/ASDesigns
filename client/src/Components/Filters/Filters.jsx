import React, { useEffect } from "react";
import "./Filters.css";
import "../../App.css";
import { Slider } from "@/Components/ui/dualrangeslider.jsx";
import { Badge } from "@/Components/ui/badge";
import { useState } from "react";
import { LuListFilter } from "react-icons/lu";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";

export const Filters = ({
  priceRange,
  setPriceRange,
  priceExtremes,
  getProducts,
  sortValue,
  productLength,
  totalProducts,
  selectedFilters,
  setSelectedFilters,
  category,
  filterSidebarRender,
}) => {

  const { pageNo } = useParams();

  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [allCategories, setAllCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const [categoriesLoaded, setCategoriesLoaded] = useState(false);

  const location = useLocation();

  useEffect(() => {
    getProducts({ selectedFilters: selectedFilters });
    handleClearAll()
  }, [pageNo]);

  useEffect(() => {
    fetch("/api/categories", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(async (data) => {
        if (data.success) {
          setAllCategories(data.categoryTree);
          setCategories(data.categoryTree);
          setSelectedFilters(selectedFilters);
        }
      });
  }, []);

  useEffect(() => {
    fetch("/api/tags", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(async (data) => {
        if (data.success) {
          setTags(data.tags.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1
            }
            if (nameA > nameB) {
              return 1
            }
            return 0
          }));
        }
      });
  }, []);

  useEffect(() => {
    if (!allCategories.length) {
      return;
    }

    if (!category) {
      setCategories(allCategories);
      setCategoriesLoaded(true);
      return;
    }

    // Removes the Top level Category
    const categoryTreeByTopCategory = allCategories.find(
      (cat) => cat.name === category
    );
    setCategories(
      categoryTreeByTopCategory
        ? categoryTreeByTopCategory.children
        : allCategories
    );

    // Keeps the Top level Category
    // const categoryTreeByTopCategory = allCategories.filter(cat => cat.name === category)
    // setCategories(categoryTreeByTopCategory.length ? categoryTreeByTopCategory : allCategories)

    setCategoriesLoaded(true);
  }, [category, allCategories]);


  useEffect(() => {
    setCategoriesLoaded(false);
    const urlParams = new URLSearchParams(location.search);
    const categoriesPreset = urlParams.has("cat")
      ? urlParams.get("cat").toLowerCase().split(",")
      : [];

    const newFilters = new Set(categoriesPreset);

    function checkChildrenAndParents(
      categories,
      selectedCategories,
      parent = null
    ) {
      categories.forEach((category) => {
        const catWParent = { ...category, parent };
        if (selectedCategories.has(category.name.toLowerCase())) {
          checkChildren(catWParent, selectedCategories);
          updateParentSelection(catWParent, selectedCategories);
        }
        if (category.children.length) {
          checkChildrenAndParents(
            category.children,
            selectedCategories,
            catWParent
          );
        }
      });
    }

    checkChildrenAndParents(allCategories, newFilters);

    const newFiltersArray = Array.from(newFilters);
    getProducts({ selectedFilters: newFiltersArray });
    setSelectedFilters(newFiltersArray);
    setCategoriesLoaded(true);
  }, [location.search, allCategories]);


  const navigate = useNavigate();


  const handleCheckboxClick = (clickedCat) => {
    setSelectedFilters((prevFilters) => {
      let newFilters = new Set(prevFilters);

      if (newFilters.has(clickedCat.name.toLowerCase())) {
        newFilters.delete(clickedCat.name.toLowerCase());
        uncheckChildren(clickedCat, newFilters);
      } else {
        newFilters.add(clickedCat.name.toLowerCase());
        checkChildren(clickedCat, newFilters);
      }

      updateParentSelection(clickedCat, newFilters);

      const newFiltersArray = Array.from(newFilters);

      const urlParams = new URLSearchParams(location.search);

      if (newFiltersArray.length &&
        (!category ||
          !(category.toLowerCase() === newFiltersArray[0].toLowerCase()))) {
        urlParams.set(
          "cat",
          category
            ? newFiltersArray.filter(
              (cat) => cat.toLowerCase() !== category.toLowerCase()
            )
            : newFiltersArray
        );
      } else {
        urlParams.delete("cat");
      }

      navigate(
        `/shop${category ? `/${category.toLowerCase()}` : ""}` +
        (urlParams.size ? `/?${urlParams.toString()}` : "")
      );

      getProducts({ selectedFilters: [newFiltersArray] });
      return newFiltersArray;
    });
  };

  const checkChildren = (category, filters) => {
    if (category.children) {
      category.children.forEach((child) => {
        filters.add(child.name.toLowerCase());
        checkChildren(child, filters);
      });
    }
  };

  const uncheckChildren = (category, filters) => {
    if (category.children) {
      category.children.forEach((child) => {
        filters.delete(child.name.toLowerCase());
        uncheckChildren(child, filters);
      });
    }
  };

  const updateParentSelection = (category, filters) => {
    if (!category.parent) return;

    let allSiblingsChecked = category.parent.children.every((child) =>
      filters.has(child.name.toLowerCase())
    );

    if (allSiblingsChecked) {
      filters.add(category.parent.name.toLowerCase());
    } else {
      filters.delete(category.parent.name.toLowerCase());
    }

    updateParentSelection(category.parent, filters);
  };



  const handleTagClick = (tag) => {
    const baseLocation = location.pathname.substring(0,
      location.pathname.search("/page") !== -1 ?
        location.pathname.search("/page") : location.pathname.length)

    navigate(baseLocation + new URLSearchParams(location.search).toString())

    setSelectedTags([...selectedTags, tag]); // Move tag to selected
    setTags(tags.filter((t) => t.id !== tag.id).sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    })); // Remove from available tags
  };

  // Function to remove tag from selected
  const handleRemoveTag = (tag) => {
    const baseLocation = location.pathname.substring(0,
      location.pathname.search("/page") !== -1 ?
        location.pathname.search("/page") : location.pathname.length)

    navigate(baseLocation + new URLSearchParams(location.search).toString())

    setSelectedTags(selectedTags.filter((t) => t.id !== tag.id)); // Remove from selected
    setTags([...tags, tag].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    })); // Add to Available
  };

  const handleClearAll = () => {
    setTags([...tags, ...selectedTags]);
    setSelectedTags([]);
  };


  useEffect(() => {
    if (tags.length + selectedTags.length) {
      getProducts({
        selectedTags: selectedTags
      });
    }
  }, [selectedTags, pageNo])


  const renderCategories = (categories, parent = null) => {
    if (!categories.length) {
      return;
    }

    return categories.map((category, index) => {
      let categoryWithParent = { ...category, parent };

      return (
        <li key={index}>
          <label className="shop-filters-label">
            <input
              type="checkbox"
              checked={selectedFilters.includes(category.name.toLowerCase())}
              onChange={() => handleCheckboxClick(categoryWithParent)}
            />
            <span className="checkmark"></span>
            <span
              className="shop-filters-label-name"
              onClick={() => handleCheckboxClick(categoryWithParent)}
            >
              {category.name}
            </span>
          </label>
          <ul className="shop-filters-ul-inner">
            {category.children.length > 0 &&
              renderCategories(category.children, categoryWithParent)}
          </ul>
        </li>
      );
    });
  };

  return (
    <div className="shop-filters">
      <div className="shop-filters-laptop">
        <div className="shop-filters-head">
          <h2>Filters</h2>
        </div>

        <span className="mt-2">
          Showing {productLength} Results out of {totalProducts}
        </span>

        <div className="shop-filters-category">
          <h2>Category</h2>
          <ul className="shop-filters-ul">
            {categoriesLoaded &&
              categories.length &&
              renderCategories(categories)}
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
            onValueCommit={(...args) => {
              getProducts({
                orderBy: sortValue,
                minPrice: args[0][0],
                maxPrice: args[0][1],
              });
            }}
            min={priceExtremes[0] - 50}
            max={priceExtremes[1] + 50}
            step={50}
            minStepsBetweenThumbs={1}
            className="w-[90%]"
          />
        </div>

        <div className="shop-filters-tags">
          <div className="shop-filters-tags-head flex justify-between items-center">
            <h2>Tags</h2>
            {selectedTags.length > 0 && (
              <Badge className="selected bg-white text-black py-1 mb-3">
                Clear All
                <span className="remove-icon" onClick={() => handleClearAll()}><FaXmark /></span>
              </Badge>
            )}
          </div>

          {/* Selected Tags */}
          <div className="shop-filters-tags-selected">
            {selectedTags.map((tag) => (
              <Badge key={tag.id} className="shop-filters-tags-badge selected bg-white text-black mb-3">
                {tag.name}
                <span
                  className="remove-icon"
                  onClick={() => handleRemoveTag(tag)}
                >
                  <FaXmark />
                </span>
              </Badge>
            ))}
          </div>

          {/* Available Tags */}
          <div className="shop-filters-tags-content">
            {tags.map((tag) => (
              <Badge
                key={tag.id}
                className={`shop-filters-tags-badge`}
                onClick={() => handleTagClick(tag)}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* filters for mobile and tab  */}
      {filterSidebarRender && (
        <div className="shop-filters-mobile">
          <button
            className="filter-button"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#filtersOffcanvas"
            aria-controls="filtersOffcanvas"
          >
            <LuListFilter className="m-1 ml-0" />
            Filters
          </button>
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="filtersOffcanvas"
            aria-labelledby="filtersOffcanvasLabel"
          >
            <div className="offcanvas-header shadow-md">
              <h5 id="filtersOffcanvasLabel" className="text-3xl ">
                Filters
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <span className="mt-1">
                Showing {productLength} Results out of {totalProducts}
              </span>
              <h2 className="shop-filters-category text-2xl font-medium">
                Category
              </h2>
              <ul className="filter-list">
                {categoriesLoaded &&
                  categories.length &&
                  renderCategories(categories)}
              </ul>
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
                <div className="shop-filters-tags-head flex justify-between items-center">
                  <h2>Tags</h2>
                  {selectedTags.length > 0 && (
                    <Badge className="selected bg-white text-black py-1 mb-3">
                      Clear All
                      <span className="remove-icon" onClick={() => handleClearAll()}><FaXmark /></span>
                    </Badge>
                  )}
                </div>

                {/* Selected Tags */}
                <div className="shop-filters-tags-selected">
                  {selectedTags.map((tag) => (
                    <Badge
                      key={tag.id}
                      className="shop-filters-tags-badge selected bg-white text-black mb-3"
                    >
                      {tag.name}
                      <span
                        className="remove-icon"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <FaXmark />
                      </span>
                    </Badge>
                  ))}
                </div>

                {/* Available Tags */}
                <div className="shop-filters-tags-content">
                  {tags.map((tag) => (
                    <Badge
                      key={tag.id}
                      className="shop-filters-tags-badge"
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
