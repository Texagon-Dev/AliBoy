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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="create/begin" element={<GenreSelection />} />
            <Route path="create/details" element={<StoryDetails />} />
            <Route path="create/generate" element={<StoryGeneration />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/storypage" element={<StoryBookPdfPage />} />
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
