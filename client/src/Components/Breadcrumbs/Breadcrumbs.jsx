import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Link } from "react-router-dom";

export const BasicBreadcrumbs = ({ categories }) => {
  return (
    <div role="presentation" className="ml-9 mt-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            {/* <BreadcrumbLink href="/">Home</BreadcrumbLink> */}
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {/* <BreadcrumbLink href="/Shop">Shop</BreadcrumbLink> */}
            <Link to="/shop">Shop</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {categories.map((el, idx) => (
            <React.Fragment key={idx}>
              <BreadcrumbItem>
                {/* <BreadcrumbLink>{el.name}</BreadcrumbLink> */}
                <Link>{el.name}</Link>
              </BreadcrumbItem>
              {categories.length - 1 != idx && (<BreadcrumbSeparator />)}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
