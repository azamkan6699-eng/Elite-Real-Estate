import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import OffPlan from "./pages/OffPlan";
import PropertyDetails from "./pages/PropertyDetails";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AlHaseenResidences from "./pages/AlHaseenResidences";
import NotFound from "./pages/NotFound";
import Secondary from "./pages/Secondary";
import Testimonials from "./pages/Testimonials";
import Rental from "./pages/Rental";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/off-plan" element={<OffPlan />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/al-haseen-residences" element={<AlHaseenResidences />} />
          <Route path="/secondary" element={<Secondary />} />
          <Route path="/Testimonials" element={<Testimonials />} />
          <Route path="/rental" element={<Rental />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsconditions" element={<TermsConditions />} />


          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
