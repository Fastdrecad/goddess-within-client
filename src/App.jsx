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
import FeaturedProducts from "./components/FeaturedProducts";
import Register from "./components/Register";

const Layout = () => {
  return (
    <div className="app">
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

// <Router>
//   <Announcement />
//   <NavigateToTop />
//   <Navbar />
//   <Routes>
//     <Route path="/" element={<Home />} />
//     <Route path="/products/:category" element={<ProductList />} />
//     <Route path="/product/:id" element={<Product />} />
//     <Route path="/cart" element={<Cart />} />
//     <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
//     <Route
//       path="/register"
//       element={user ? <Navigate to="/" /> : <Register />}
//     />
//     <Route path="/register" element={<Register />} />
//     <Route path="/register" element={<Register />} />
//     TODO conditional rendering for login and register
//     <Route path="/welcome" element={<RegisterLogin />} />
//   </Routes>
//   <Newsletter />
//   <Footer />
//   <GoToTop />
// </Router>
