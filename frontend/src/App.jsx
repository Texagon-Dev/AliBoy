import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import LandingPage from "./pages/LandingPage";
import GenreSelection from "./pages/GenreSelection";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import SignIn from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import StoryDetails from "./pages/StoryDetails";
import StoryGeneration from "./pages/StoryGeneration";
import StoryGenerationLoading from "./pages/StoryGenerationLoading";
import StoryBookPdfPage from "./pages/StoryBookPdfPage";
import UserHomePage from "./pages/UserHomePage";
import EditAndShareStoryPage from "./pages/EditAndShareStoryPage";
import CompleteStoryBook from "./pages/CompleteStoryBook";
import BookPrintingOptions from "./pages/BookPrintingOptions";
import CheckoutPage from "./pages/CheckoutPage";
import UserProfile from "./pages/UserProfile";
import AdminLoginPage from "./pages/AdminLoginPage";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/auth/fc";
import UpdatePassword from "./pages/auth/fc/UpdatePassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="update-password" element={<UpdatePassword />} />
          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="adminlogin" element={<AdminLoginPage />} />

          <Route path="/" element={<RootLayout />}>
            <Route index element={<LandingPage />} />
            {/* User */}
            <Route path="user" element={<UserHomePage />} />
            <Route path="user/profile" element={<UserProfile />} />
            {/* Story Creation */}
            <Route path="create/begin" element={<GenreSelection />} />
            <Route path="create/details" element={<StoryDetails />} />
            <Route path="create/generate" element={<StoryGeneration />} />
            {/* Dashboard */}
            <Route
              path="dashboard/bookprinting"
              element={<BookPrintingOptions />}
            />
            <Route path="dashboard/checkout" element={<CheckoutPage />} />
            <Route path="dashboard/storypage" element={<StoryBookPdfPage />} />

            <Route
              path="dashboard/editstorybook"
              element={<EditAndShareStoryPage />}
            />
            <Route
              path="dashboard/completestorybook"
              element={<CompleteStoryBook />}
            />
            <Route path="pricing" element={<Pricing />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          {/* Loading Screen */}
          <Route
            path="create/generateloading"
            element={<StoryGenerationLoading />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
