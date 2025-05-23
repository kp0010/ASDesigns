import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Link } from "react-router-dom";

export const BasicBreadcrumbs = ({ categories }) => {
  return (
    <div role="presentation" className="ml-9 mt-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/"> Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/shop">Shop</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {categories.map((category, idx) => (
            <React.Fragment key={idx}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to={['sports', 'festival', 'others'].includes(category['name'].toLowerCase()) ?
                      `/shop/${category['name']}`.toLowerCase() :
                      `/shop/?cat=${category['name']}`.toLowerCase()
                    }
                  >
                    {category["name"]}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {categories.length - 1 != idx && (<BreadcrumbSeparator />)}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div >
  );
};
