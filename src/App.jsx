import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  RouterProvider,
  Outlet,
  createBrowserRouter,
} from "react-router-dom";
import Announcement from "./components/Announcement";
import NavigateToTop from "./components/NavigateToTop";
import GoToTop from "./components/GoToTop";
import Navbar from "./components/Navbar";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Register from "./components/Register";
import CartSlide from "./components/CartSlide";
import Login from "./components/Login";
// import { Protector } from "./helpers";
import Logout from "./components/Logout";
import GlobalStyle from "./globalStyles";

const Layout = () => {
  return (
    <div className="app">
      <GlobalStyle />
      <Announcement />
      <Navbar />
      <NavigateToTop />
      <Outlet />
      <Newsletter />
      <GoToTop />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        // In case you need to protect the HOME PAGE
        // element: <Protector Component={Home} />,
      },
      {
        path: "/products/:id",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
