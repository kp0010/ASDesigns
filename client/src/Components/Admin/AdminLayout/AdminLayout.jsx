import { AdminSidebar } from "@/Components/Admin/AdminSidebar/AdminSidebar"
import { SidebarTrigger, SidebarProvider } from "@/Components/ui/sidebar"
import { Outlet } from "react-router-dom"

export const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="admin-layout flex">
        <AdminSidebar />
        <main className="w-100 bg-gray-200">
          <SidebarTrigger />
          <Outlet />
        </main>
      </div>
    </SidebarProvider>

  )
}
