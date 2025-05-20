import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
// import About from "./components/About";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import uesOnlineStatus from "./utils/useOnlineStatus";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
import FoodType from "./components/FoodType";
import ContactUs from "./components/ContactUs";

const About = lazy(() => import("./components/About"));

const AppLayout = () => {
  const onlineStatus = uesOnlineStatus();
  if (onlineStatus === false) {
    return (
      <div className="network-status">
        <img />
        <p> You could have network connectivity problem</p>
      </div>
    );
  }
  return (
    <Provider store={appStore}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </Provider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
        errorElement: <Error />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>LOADING...........</h1>}>
            <About />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<h1>LOADING...........</h1>}>
            <ContactUs />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
        errorElement: <Error />,
      },
      {
        path: "/dish/:resId",
        element: <FoodType />,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
        errorElement: <Error />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
