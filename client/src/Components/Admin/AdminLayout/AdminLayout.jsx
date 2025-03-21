import { AdminSidebar } from "@/Components/Admin/AdminSidebar/AdminSidebar"
import { SidebarTrigger, SidebarProvider } from "@/Components/ui/sidebar"
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"

export const AdminLayout = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();

  const [isAdmin, setIsAdmin] = useState(false)

  const navigate = useNavigate()

  const readUser = async () => {
    const token = await getToken();
    fetch("/api/auth/", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          if (!data.user["admin"]) {
            navigate("/")
          } else {
            setIsAdmin(true)
          }
        }
      });
  };

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        readUser()
      } else {
        navigate("/")
      }
    }
  }, [isSignedIn, isLoaded])

  return (
    <SidebarProvider>
      {isAdmin && (
        <div className="admin-layout flex">
          <AdminSidebar />
          <main className="w-100 bg-gray-200">
            <SidebarTrigger />
            <Outlet />
          </main>
        </div>
      )}
    </SidebarProvider>
  )
}
