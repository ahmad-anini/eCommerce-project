import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout.jsx";
import Home from "../components/web/home/Home.jsx";
import Categories from "../components/web/categories/Categories.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import DashboradHome from "../components/dashboard/home/Home.jsx";
import DashboardCategories from "../components/dashboard/categories/Categories.jsx";
import Register from "../components/web/register/Register.jsx";
import Login from "../components/web/login/Login.jsx";
import ProtectedRoute from "../components/web/protectedRoute/ProtectedRoute.jsx";
import SendCode from "../components/web/auth/SendCode.jsx";
import ForgotPassword from "../components/web/auth/ForgotPassword.jsx";
import CategoriesDetails from "../components/web/categories/CategoriesDetails.jsx";
import Product from "../components/web/products/Product.jsx";
import Cart from "../components/web/cart/Cart.jsx";
import Profile from "../components/web/profile/Profile.jsx";
import ProfileInformation from "../components/web/profile/ProfileInformation.jsx";
import ProfileContact from "../components/web/profile/ProfileContact.jsx";
import ProfileOrder from "../components/web/profile/ProfileOrder.jsx";
import CreateOrder from "../components/web/order/CreateOrder.jsx";
import Products from "../components/web/products/Products.jsx";
import CreateReview from "../components/web/review/CreateReview.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "login",
        element: (
          <ProtectedRoute Access={`login`}>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedRoute Access={`register`}>
            <Register />
          </ProtectedRoute>
        ),
      },
      {
        path: "sendCode",
        element: <SendCode />,
      },
      {
        path: "resetPassword",
        element: <ForgotPassword />,
      },
      {
        // path: "home",
        index: true,
        element: <Home />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "products/categories/:categoryId",
        element: <CategoriesDetails />,
      },
      {
        path: "product/:productId",
        element: <Product />,
      },
      {
        path: "create/review/:productId",
        element: <CreateReview />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute Access={`cart`}>
            <Cart />
          </ProtectedRoute>
        ),
      },

      {
        path: "CreateOrder",
        element: <CreateOrder />,
      },
      {
        path: "profile",
        element: <Profile />,
        children: [
          {
            index: true,
            // path: "information",
            element: <ProfileInformation />,
          },
          {
            path: "Contact",
            element: <ProfileContact />,
          },
          {
            path: "order",
            element: <ProfileOrder />,
          },
        ],
      },
      {
        path: "*",
        element: <h2>page not found</h2>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "home",
        element: <DashboradHome />,
      },
      {
        path: "categories",
        element: <DashboardCategories />,
      },
      {
        path: "*",
        element: <h2>page not found -- dashboard</h2>,
      },
    ],
  },
]);
