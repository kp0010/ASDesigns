import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";

import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Badge } from "@/Components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";

export const ProductList = () => {
  let { pageNo } = useParams();
  if (!pageNo) {
    pageNo = 1;
  }

  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  const [pageIndexes, setPageIndexes] = useState([]);

  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = () => {
    fetch(`/api/products-metadata/?page=${pageNo}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProducts(data.products);
        setTotalProducts(data.totalProducts);
        setLoaded(true);
      });
  };

  const navigate = useNavigate();
  const handlePaginationClick = (e) => {
    e.preventDefault();
    const nextPageLink = e.currentTarget.getAttribute("link");
    window.scrollTo({ top: 0, behavior: "smooth" });

    const params = new URLSearchParams(location.search);

    setLoaded(false);

    navigate(nextPageLink + (params.size ? `/?${params.toString()}` : ""));
  };

  const PRODUCT_LIMIT = 12;
  const calculatePages = (pageNoStr) => {
    const pageIndexes = [];
    const bufferLen = 2;
    const pageNo = parseInt(pageNoStr ? pageNoStr : "1");
    const totalPages = Math.ceil(totalProducts / PRODUCT_LIMIT);
    const base = `/admin/products/list`;

    if (pageNo > 1) {
      pageIndexes.push({
        index: "prev",
        link: pageNo - 1 !== 1 ? base + `/page/${pageNo - 1}` : base + ``,
      });
    }

    let i = 1;

    for (i; i <= (bufferLen < totalPages ? bufferLen : totalPages); i++) {
      if (i <= totalPages) {
        pageIndexes.push({
          index: i,
          link: i !== 1 ? base + `/page/${i}` : base + ``,
        });
      }
    }

    if (pageNo + parseInt(bufferLen / 2) > bufferLen) {
      if (pageNo > bufferLen * 2) {
        pageIndexes.push({ index: "ellipsis" });
      }

      for (
        i = pageNo - parseInt(bufferLen / 2);
        i <= pageNo + parseInt(bufferLen / 2);
        i++
      ) {
        if (
          !pageIndexes.find((pageIdx) => pageIdx.index === i) &&
          i <= totalPages
        )
          pageIndexes.push({
            index: i,
            link: base + `/page/${i}`,
          });
      }
    }

    if (totalPages - bufferLen > 0) {
      if (pageNo < totalPages - bufferLen * 2 + 1) {
        pageIndexes.push({ index: "ellipsis" });
      }

      for (i = totalPages - bufferLen + 1; i <= totalPages; i++) {
        if (!pageIndexes.find((pageIdx) => pageIdx.index === i))
          pageIndexes.push({
            index: i,
            link: base + `/page/${i}`,
          });
      }
    }

    if (pageNo !== totalPages) {
      pageIndexes.push({ index: "next", link: base + `/page/${pageNo + 1}` });
    }

    setPageIndexes(pageIndexes.length > 1 ? pageIndexes : []);
  };

  useEffect(() => {
    fetchProducts();
  }, [pageNo]);

  useEffect(() => {
    calculatePages(pageNo.toString());
  }, [pageNo, totalProducts]);

  useEffect(() => {
    const match = location.pathname.match(/\/page\/(\d+)/);
    const page = match ? parseInt(match[1]) : 1;
    setCurrentPage(page);
  }, [location.pathname]);

  return (
    <div className="productList px-4 sm:px-6 md:px-8 py-6">
      <div className="w-full max-w-6xl mx-auto p-4 bg-white shadow-lg rounded-xl sm:p-6 md:p-8">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
          Product List
        </h2>

        {/* Product Table */}
        <Table className="border rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow className="bg-gray-100 text-center">
              <TableHead className="w-[250px] text-center">Product</TableHead>
              <TableHead className="w-[150px] text-center">Product ID</TableHead>
              <TableHead className="w-[120px] text-center">Price</TableHead>
              <TableHead className="w-[150px] text-center">Category</TableHead>
              <TableHead className="w-[150px] text-center">Tags</TableHead>
              <TableHead className="w-[100px] text-center">Sales</TableHead>
              <TableHead className="w-[180px] text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loaded && products.length ? (
              products.map((product) => (
                <TableRow
                  key={product.id}
                  className="hover:bg-gray-50 text-center"
                >
                  {/* Product Image & Name */}
                  <TableCell className="flex items-center space-x-2">
                    <img
                      src={`/Products/${product.product_id}.jpeg`}
                      className="w-20 h-20 rounded-lg cursor-pointer"
                      onClick={() => navigate(`/product/${product.product_id}`)}
                    />
                    <span
                      className="cursor-pointer"
                      onClick={() => navigate(`/product/${product.product_id}`)}
                    >
                      {product["product_id"] +
                        (product["name"] ? " | " + product["name"] : "")}
                    </span>
                  </TableCell>

                  {/* Product Details */}
                  <TableCell>{product["product_id"]}</TableCell>
                  <TableCell>
                    ₹{parseFloat(product["price"]).toFixed(2)}
                  </TableCell>
                  <TableCell>{product["category_path"].join(", ")}</TableCell>
                  <TableCell>
                    {product.tags[0] ? (
                      product.tags.map((tag, idx) => (
                        <Badge
                          key={idx}
                          className="bg-blue-500 text-white px-2 py-1 rounded-md"
                        >
                          {tag}
                        </Badge>
                      ))
                    ) : (
                      <Badge className="bg-blue-500 text-white px-2 py-1 rounded-md">
                        None
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{product.sales}</TableCell>

                  {/* Action Buttons */}
                  <TableCell>
                    <div className="flex justify-center space-x-4">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => navigate(`/product/${product.product_id}`)}
                      >
                        <FaEye className="size-5" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-800"
                        onClick={() => navigate("/admin/products/edit")}
                      >
                        <FaEdit className="size-5" />
                      </button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="text-red-600 hover:text-red-800">
                            <FaTrash className="size-5" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="text-center">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-lg font-semibold text-left">
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-sm text-gray-600 text-left">
                              This action cannot be undone. This will permanently
                              delete your account and remove your data from our
                              servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex justify-center space-x-4 ">
                            <AlertDialogCancel className="px-4 py-2 border rounded-md">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction className="px-4 mt-2 bg-gray-700 text-white rounded-md">
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500">
                  No products available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          {/* Footer */}
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6} className="font-semibold">
                Total Sales
              </TableCell>
              <TableCell className="text-center font-semibold">
                ₹
                {products
                  .reduce((total, product) => total + product.sales, 0)
                  .toLocaleString()}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        <Pagination className="mb-10">
          <PaginationContent>
            {pageIndexes.length ? (
              pageIndexes.map((page) => (
                <PaginationItem key={page.index}>
                  {["next", "prev", "ellipsis"].includes(page.index) ? (
                    page.index === "next" ? (
                      <PaginationNext
                        onClick={handlePaginationClick}
                        link={page.link}
                      />
                    ) : page.index === "prev" ? (
                      <PaginationPrevious
                        onClick={handlePaginationClick}
                        link={page.link}
                      />
                    ) : (
                      <PaginationEllipsis />
                    )
                  ) : (
                    <PaginationLink
                      onClick={handlePaginationClick}
                      link={page.link}
                      isActive={currentPage === page.index} // <-- add this
                      className={
                        currentPage === page.index
                          ? "bg-black rounded-lg text-white"
                          : ""
                      }
                    >
                      {page.index}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))
            ) : (
              <></>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>

  );
};
