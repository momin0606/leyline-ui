// App.tsx
import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { AuthProvider } from "./Context/auth";
import AuthRoute from "./HOC/auth-route";
import ProtectedRoute from "./HOC/protected-route";
import Layout from "./Layout";
import Dashboard from "./pages/dashboard"; // Your protected component
import Home from "./pages/root"; // Your public component
import Signin from "./pages/signin";
import Signup from "./pages/signup"; // Import the Signup component
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route element={<AuthRoute />}>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} /> {/* Add Signup route */}
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Route>
  )
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
