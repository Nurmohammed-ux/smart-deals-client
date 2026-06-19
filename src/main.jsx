import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./components/Home/Home.jsx";
import RootLayout from "./layout/RootLayout.jsx";
import AllProducts from "./components/AllProducts/AllProducts.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import Register from "./components/Register/Register.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import MyProducts from "./components/MyProducts/MyProducts.jsx";
import MyBids from "./components/MyBids/MyBids.jsx";
import Login from "./components/Login/Login.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import CreateProduct from "./components/CreateProduct/CreateProduct.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    hydrateFallbackElement: (
      <div className="flex justify-center items-center h-screen text-4xl font-bold">
        L(
        <span className="inline-block text-primary animate-spin">O</span>
        )ADING...
      </div>
    ),
    children: [
      { index: true, element: <Home /> },
      {
        path: "/allProducts",
        element: <AllProducts />,
        loader: () => fetch("http://localhost:3000/products"),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/myProducts",
        element: (
          <PrivateRoute>
            <MyProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "/myBids",
        element: (
          <PrivateRoute>
            <MyBids />
          </PrivateRoute>
        ),
      },
      {
        path: "/productDetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params.id}`),
        element: <ProductDetails />,
      },
      {
        path: "/createProduct",
        element: (
          <PrivateRoute>
            <CreateProduct />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
