import React, { useState } from "react";
import { Home, LucideLayoutDashboard } from "lucide-react";
import { LuChevronDown, LuChevronRight, LuList, LuUsers } from "react-icons/lu";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BsTags } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { IoAddOutline } from "react-icons/io5";

import logo from "../../../Assets/Logos/AS_logo_b.png";
import { Link } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/Components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/Components/ui/collapsible";

export const AdminSidebar = () => {
  const [isProductOpen, setIsProductOpen] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isTagsOpen, setIsTagsOpen] = useState(true);
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu className="my-3">
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link to="/">
                <img className="m-3" src={logo} alt="..." width={50} height={50} />
              </Link>
              <span className="text-xl font-bold">ASDesigns</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {/* ✅Dashboard */}
            <SidebarMenu className="mb-2">
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Link to="" className="flex m-3">
                    <LucideLayoutDashboard />
                    <span className="ml-3 text-base">Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            {/* ✅Products */}
            <SidebarMenu className="mb-2">
              <Collapsible
                defaultOpen
                className="group/collapsible"
                open={isProductOpen}
                onOpenChange={setIsProductOpen}
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <div className="flex m-3 items-center">
                        <MdProductionQuantityLimits className="w-6 h-6" />
                        <span className="ml-3 text-base">Products</span>
                        {isProductOpen ? (
                          <LuChevronDown className="ml-20" />
                        ) : (
                          <LuChevronRight className="ml-20" />
                        )}
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="mt-2">
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                          <Link to="/admin/products/add" className="flex m-2">
                            <IoAddOutline className="w-6 h-6" />
                            <span className="ml-3 text-base">Add Product</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                    <SidebarMenuSub className="mt-2">
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                          <Link to="" className="flex m-2">
                            <Home />
                            <span className="ml-3 text-base">
                              Delete Product
                            </span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                    <SidebarMenuSub className="mt-2">
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                          <Link to="" className="flex m-2">
                            <Home />
                            <span className="ml-3 text-base">Edit Product</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                    <SidebarMenuSub className="mt-2">
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                          <Link to="/admin/products/list" className="flex m-2">
                            <LuList className="w-6 h-6" />
                            <span className="ml-3 text-base">Product List</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>

            {/* ✅Category  */}
            <SidebarMenu className="mb-2">
              <Collapsible
                defaultOpen
                className="group/collapsible"
                open={isCategoryOpen}
                onOpenChange={setIsCategoryOpen}
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <div className="flex m-3 items-center">
                        <BiCategoryAlt className="w-6 h-6" />
                        <span className="ml-3 text-base">Category</span>
                        {isCategoryOpen ? (
                          <LuChevronDown className="ml-20" />
                        ) : (
                          <LuChevronRight className="ml-20" />
                        )}
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="mt-2">
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                          <Link to="" className="flex m-2">
                            <IoAddOutline className="w-6 h-6" />
                            <span className="ml-3 text-base">Add Category</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                    <SidebarMenuSub className="mt-2">
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                          <Link to="" className="flex m-2">
                            <LuList className="w-6 h-6" />
                            <span className="ml-3 text-base">
                              Category List
                            </span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                  {/* add category edit/delete  */}
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
            {/* add collapsible  */}
            {/* ✅Tags  */}
            <SidebarMenu className="mb-2">
              <Collapsible
                defaultOpen
                className="group/collapsible"
                open={isTagsOpen}
                onOpenChange={setIsTagsOpen}
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <div className="flex items-center ml-5">
                        <div className="flex items-center">
                          <BsTags className="w-6 h-6 " />
                          {/*Advait*/}
                          <span className="ml-3 text-base ">Tags</span>
                          {isTagsOpen ? (
                            <LuChevronDown className="ml-[6.9rem]" />
                          ) : (
                            <LuChevronRight className="ml-[6.9rem]" />
                          )}
                        </div>
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="mt-2">
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                          <Link to="" className="flex m-2">
                            <IoAddOutline className="w-6 h-6" />
                            <span className="ml-3 text-base">Add Tags</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                    <SidebarMenuSub className="mt-2">
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                          <Link to="" className="flex m-2">
                            <LuList className="w-6 h-6" />
                            <span className="ml-3 text-base">Tags List</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
            {/* ✅Previous Orders  */}
            <SidebarMenu className="mb-2">
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Link to="/admin/previousOrders" className="flex m-3">
                    <Home />
                    <span className="ml-3 text-base">Previous Orders</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            {/* ✅users */}
            <SidebarMenu className="mb-2">
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Link to="users" className="flex m-3">
                    <LuUsers className="w-6 h-6" />
                    <span className="ml-3 text-base">Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
