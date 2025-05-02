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
            <Link to="/">
              <SidebarMenuButton>
                <img className="m-3" src={logo} alt="..." width={50} height={50} />
                <span className="text-xl font-bold">ASDesigns</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {/* Dashboard */}
            <SidebarMenu className="mb-2">
              <SidebarMenuItem>
                <Link to="/admin">
                  <SidebarMenuButton>
                    <div className="flex m-3">
                      <LucideLayoutDashboard />
                      <span className="ml-3 text-base">Dashboard</span>
                    </div>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>

            {/* Products */}
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
                        <Link to="/admin/products/add">
                          <SidebarMenuSubButton>
                            <div className="flex m-2" >
                              <IoAddOutline className="w-6 h-6" />
                              <span className="ml-3 text-base">Add Product</span>
                            </div>
                          </SidebarMenuSubButton>
                        </Link>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                    <SidebarMenuSub className="mt-2">
                      <SidebarMenuSubItem>
                        <Link to="/admin/products/delete">
                          <SidebarMenuSubButton>
                            <div className="flex m-2">
                              <Home />
                              <span className="ml-3 text-base">Delete Product</span>
                            </div>
                          </SidebarMenuSubButton>
                        </Link>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                    <SidebarMenuSub className="mt-2">
                      <SidebarMenuSubItem>
                        <Link to="/admin/products/edit">
                          <SidebarMenuSubButton>
                            <div className="flex m-2">
                              <Home />
                              <span className="ml-3 text-base">Edit Product</span>
                            </div>
                          </SidebarMenuSubButton>
                        </Link>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                    <SidebarMenuSub className="mt-2">
                      <SidebarMenuSubItem>
                        <Link to="/admin/products/list">
                          <SidebarMenuSubButton>
                            <div className="flex m-2">
                              <LuList className="w-6 h-6" />
                              <span className="ml-3 text-base">Product List</span>
                            </div>
                          </SidebarMenuSubButton>
                        </Link>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>

            {/* Category  */}
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
                        <Link to="/admin/products/addcategories">
                          <SidebarMenuSubButton>
                            <div className="flex m-2">
                              <IoAddOutline className="w-6 h-6" />
                              <span className="ml-3 text-base">Add Category</span>
                            </div>
                          </SidebarMenuSubButton>
                        </Link>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                    <SidebarMenuSub className="mt-2">
                      <SidebarMenuSubItem>
                        <Link to="/admin/products/categories">
                          <SidebarMenuSubButton>
                            <div className="flex m-2">
                              <LuList className="w-6 h-6" />
                              <span className="ml-3 text-base">Category List</span>
                            </div>
                          </SidebarMenuSubButton>
                        </Link>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                  {/* add category edit/delete  */}
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
            {/* add collapsible  */}
            {/* Tags  */}
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
                        <Link to="/admin/products/addtag">
                          <SidebarMenuSubButton>
                            <div className="flex m-2">
                              <IoAddOutline className="w-6 h-6" />
                              <span className="ml-3 text-base">Add Tags</span>
                            </div>
                          </SidebarMenuSubButton>
                        </Link>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                    <SidebarMenuSub className="mt-2">
                      <SidebarMenuSubItem>
                        <Link to="/admin/products/tagslist">
                          <SidebarMenuSubButton>
                            <div className="flex m-2">
                              <LuList className="w-6 h-6" />
                              <span className="ml-3 text-base">Tags List</span>
                            </div>
                          </SidebarMenuSubButton>
                        </Link>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
            {/* Previous Orders */}
            <SidebarMenu className="mb-2">
              <SidebarMenuItem>
                <Link to="/admin/previousOrders">
                  <SidebarMenuButton>
                    <div className="flex m-3">
                      <Home />
                      <span className="ml-3 text-base">Users Orders</span>
                    </div>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
            {/* Users */}
            <SidebarMenu className="mb-2">
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Link to="/admin/users" className="flex m-3">
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
