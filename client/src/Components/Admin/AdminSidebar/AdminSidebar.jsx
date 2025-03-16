import React from 'react'
import { Home, LucideLayoutDashboard } from "lucide-react"
import { FaProductHunt } from "react-icons/fa";
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
} from "@/components/ui/sidebar"

// const items = [
//   { title: "Home", url: "/", icon: <Home /> },
//   { title: "Dashboard", url: "/admin", icon: <Home/> },   // need to add exact dashboard route
//   { title: "Inbox", url: "#", icon: <Inbox /> },
//   { title: "Calendar", url: "#", icon: <Calendar /> },
//   { title: "Search", url: "#", icon: <Search /> },
//   { title: "Settings", url: "#", icon: <Settings /> },
// ];

export const AdminSidebar = () => {
  return (
    <Sidebar>
      {/* <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent> */}
      <SidebarHeader>
        <SidebarMenu className="my-3">
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link to="/" className="flex">
                <img className="m-3" src={logo} alt="..." width={50} height={50} />        {/*add border bottom*/}
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
                  <Link to="" className="flex m-3" >
                    <LucideLayoutDashboard />
                    <span className="ml-3 text-base" >Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            {/* add collapsible here  */}
            {/* ✅Products */}
            <SidebarMenu className="mb-2">
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <div className="flex m-3" >
                    <FaProductHunt />
                    <span className="ml-3 text-base" >Products</span>
                  </div>
                </SidebarMenuButton>
                <SidebarMenuSub className="mt-2">
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>
                      <Link to="products/add" className="flex m-2">
                        <Home />
                        <span className="ml-3 text-base">Add Product</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
                <SidebarMenuSub className="mt-2">
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton >        {/*can add asChild ahead of sidebarmenusubbutton. asChild used reducing the size of subbutton*/}
                      <Link to="" className="flex m-2">
                        <Home />
                        <span className="ml-3 text-base">Delete Product</span>
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
                      <Link to="" className="flex m-2">
                        <Home />
                        <span className="ml-3 text-base">Product List</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
            {/* add collapsible  */}
            {/* ✅Category  */}
            <SidebarMenu className="mb-2">
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Link to="" className="flex m-3">
                    <Home />
                    <span className="ml-3 text-base">Category</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub className="mt-2">
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>
                      <Link to="" className="flex m-2">
                        <Home />
                        <span className="ml-3 text-base">Add Category</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
                <SidebarMenuSub className="mt-2">
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>
                      <Link to="" className="flex m-2">
                        <Home />
                        <span className="ml-3 text-base">Category List</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
                {/* add category edit/delete  */}
              </SidebarMenuItem>
            </SidebarMenu>
            {/* add collapsible  */}
            {/* ✅Tags  */}
            <SidebarMenu className="mb-2">
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Link to="" className="flex m-3">
                    <Home />
                    <span className="ml-3 text-base">Tags</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub className="mt-2">
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>
                      <Link to="" className="flex m-2">
                        <Home />
                        <span className="ml-3 text-base">Add Tags</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
                <SidebarMenuSub className="mt-2">
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>
                      <Link to="" className="flex m-2">
                        <Home />
                        <span className="ml-3 text-base">Tags List</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
            {/* ✅Previous Orders  */}
            <SidebarMenu className="mb-2">
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Link to="" className="flex m-3">
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
                  <Link to="" className="flex m-3">
                    <Home />
                    <span className="ml-3 text-base">Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
