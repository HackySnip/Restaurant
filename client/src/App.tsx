import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import MainLayout from "./layout/MainLayout";
import HeroSection from "./components/HeroSection";
import Profile from "./components/Profile";
import SearchPage from "./components/SearchPage";
import RestaurantDetails from "./components/RestaurantDetails";
import Cart from "./components/Cart";
import Restaurant from "./admin/Restaurant";
import AddMenu from "./admin/AddMenu";
import Orders from "./admin/Orders";
import Success from "./components/Success";
import { useUserStore } from "../store/useUserStore";
import { useEffect } from "react";
import Loading from "./components/ui/Loading";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const AuthenticatedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AdminRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.admin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search/:text",
        element: <SearchPage />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/status",
        element: <Success />,
      },
      {
        path: "/admin/restaurant",
        element: (
          <AdminRoutes>
            <Restaurant />
          </AdminRoutes>
        ),
      },
      {
        path: "/admin/menu",
        element: (
          <AdminRoutes>
            <AddMenu />
          </AdminRoutes>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <AdminRoutes>
            <Orders />
          </AdminRoutes>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthenticatedRoutes>
        <Login />
      </AuthenticatedRoutes>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthenticatedRoutes>
        <Signup />
      </AuthenticatedRoutes>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthenticatedRoutes>
        <ForgotPassword />
      </AuthenticatedRoutes>
    ),
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
]);

function App() {
  const { checkAuth, isCheckingAuth } = useUserStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <Loading />;
  return <RouterProvider router={appRouter}></RouterProvider>;
}

export default App;
