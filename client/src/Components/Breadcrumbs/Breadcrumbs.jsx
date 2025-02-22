import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

export const BasicBreadcrumbs = ({ categories }) => {
  return (
    <div role="presentation" className="ml-9 mt-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/Shop">Shop</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {categories.map((el, idx) => (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink>{el.name}</BreadcrumbLink>
              </BreadcrumbItem>
              {categories.length - 1 != idx && (<BreadcrumbSeparator />)}
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
