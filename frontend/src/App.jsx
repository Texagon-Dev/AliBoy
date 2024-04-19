import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import LandingPage from "./pages/LandingPage";
import GenreSelection from "./pages/GenreSelection";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import StoryDetails from "./pages/StoryDetails";
import StoryGeneration from "./pages/StoryGeneration";
import StoryGenerationLoading from "./pages/StoryGenerationLoading";
import StoryBookPdfPage from "./pages/StoryBookPdfPage";
import UserHomePage from "./pages/UserHomePage";
import EditAndShareStoryPage from "./pages/EditAndShareStoryPage";
import CompleteStoryBook from "./pages/CompleteStoryBook";
import BookPrintingOptions from "./pages/BookPrintingOptions";
import OrderPage from "./pages/OrderPage";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/" element={<RootLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="user" element={<UserHomePage />} />
            <Route path="user/profile" element={<UserProfile />} />
            <Route path="create/begin" element={<GenreSelection />} />
            <Route path="create/details" element={<StoryDetails />} />
            <Route path="create/generate" element={<StoryGeneration />} />
            <Route
              path="dashboard/bookprinting"
              element={<BookPrintingOptions />}
            />
            <Route path="dashboard/order" element={<OrderPage />} />
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
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
          </Route>
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
