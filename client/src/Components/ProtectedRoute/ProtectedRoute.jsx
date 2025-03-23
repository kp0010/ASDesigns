import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { user, isSignedIn } = useUser();
  // If user is not signed in, show login prompt
  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-semibold mb-4">You must sign in to continue</h2>
        <SignInButton mode="redirect">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Sign In</button>
        </SignInButton>
      </div>
    );
  }
  // Check if user has the "admin" role
  if (user.publicMetadata.role !== "admin") {
    return <h2 className="text-5xl text-center mt-4"> Error 404: Access Denied: You do not have permission to view this page.</h2>;
    // OR: Redirect them elsewhere instead of showing "Access Denied"
    // return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
