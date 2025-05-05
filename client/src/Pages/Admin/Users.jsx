import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Badge } from "@/Components/ui/badge"

import { useAuth } from "@clerk/clerk-react";

export const Users = () => {
  const [users, setUsers] = useState([])
  const [loaded, setLoaded] = useState(false)

  const { getToken } = useAuth();

  useEffect(() => {
    const getAllUsers = async () => {
      const token = await getToken()

      fetch("/api/auth/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.success) {
            setUsers(data.users)
            setLoaded(true)
          }
        })
    }
    getAllUsers()
  }, [])


  return (
    <div className="users-list px-4 sm:px-6 md:px-8 py-6">
      <div className="w-full max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl sm:p-6 md:p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
          Registered Users
        </h2>

        <Table className="border rounded-lg overflow-hidden">
          <TableCaption>A List of All Registered Users.</TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-[200px]">User ID</TableHead>
              <TableHead>Clerk ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Joined On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loaded && users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    {user.id.substring(0, 14)}...
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {user.clerk_id}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <Badge className={user.admin ? "bg-green-600 text-white" : "bg-blue-500 text-white"}>
                      {user.admin ? "Admin" : "User"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} className="font-semibold">
                Total Users
              </TableCell>
              <TableCell className="text-right font-semibold">
                {users.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  )
}

