// import React from 'react'
// import { Card, CardContent } from "@/Components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"

// export const Users = () => {
//   const users = [
//     {
//       id: "27138099-9a91-4339-ae6c-ac2a4370c508",
//       clerk_id: "user_2sXGw3gP0lPdLM7gdbVkMeFtbHJ",
//       email: "sahilrp2005@gmail.com",
//       name: "Sahil Patil",
//       created_at: "2025-02-15 08:07:39",      
//     },
//     {
//       id: "27138099-9a91-4339-ae6c-ac2a4370c508",
//       clerk_id: "user_2sXGw3gP0lPdLM7gdbVkMeFtbHJ",
//       email: "sahilrp2005@gmail.com",
//       name: "Sahil Patil",
//       created_at: "2025-02-15 08:07:39",      
//     },
//     // Add more users here...
//   ]
//   return (
//     <div className="px-4 sm:px-8 pt-10 pb-16">
//       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//         Registered Users
//       </h2>

//       <Card className="w-full max-w-7xl mx-auto">
//         <CardContent className="p-4 overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-gray-100">
//                 <TableHead>ID</TableHead>
//                 <TableHead>Clerk ID</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Joined On</TableHead>                
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {users.map((user) => (
//                 <TableRow key={user.id}>
//                   <TableCell className="max-w-[150px] truncate">{user.id}</TableCell>
//                   <TableCell className="max-w-[200px] truncate">{user.clerk_id}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.name}</TableCell>
//                   <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Badge } from "@/Components/ui/badge"
import { Card } from "@/Components/ui/card"

export const Users = ({ users = [] }) => {
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
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    {user.id.substring(0, 8)}...
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

