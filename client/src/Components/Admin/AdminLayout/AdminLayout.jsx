import { AdminSidebar } from "@/Components/Admin/AdminSidebar/AdminSidebar"
import { SidebarTrigger, SidebarProvider } from "@/Components/ui/sidebar"

export const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
        <AdminSidebar />
        <main>
            <SidebarTrigger />
            {children}
        </main>
    </div>
  )
}
