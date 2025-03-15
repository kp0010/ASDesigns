import App from './App.jsx'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useLocation } from "react-router-dom";

import { ClerkProvider } from "@clerk/clerk-react";
import ShopContextProvider from "./Context/ShopContext.jsx"
import { SidebarProvider } from "@/components/ui/sidebar";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key")
}

const RootApp = () => {
	const location = useLocation();
	const isAdminPage = location.pathname === "/admin";

	return (
		<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
			<ShopContextProvider>
				{isAdminPage ? (
					<SidebarProvider>
						<App />
					</SidebarProvider>
				) : (
					<App />
				)}
			</ShopContextProvider>
		</ClerkProvider>
	);
};

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<RootApp />
		</BrowserRouter>
	</StrictMode >,
)
