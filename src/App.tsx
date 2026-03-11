import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNav from "@/components/BottomNav";
import FeedPage from "./pages/FeedPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import ImportPage from "./pages/ImportPage";
import ScanPage from "./pages/ScanPage";
import CookTogetherPage from "./pages/CookTogetherPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="max-w-lg mx-auto relative">
          <Routes>
            <Route path="/" element={<FeedPage />} />
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />
            <Route path="/import" element={<ImportPage />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/cook-together" element={<CookTogetherPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
