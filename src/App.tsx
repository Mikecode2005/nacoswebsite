import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import LecturerDashboard from "./pages/LecturerDashboard";
import Blog from "./pages/Blog";
import PastQuestions from "./pages/PastQuestions";
import Quizzes from "./pages/Quizzes";
import Sports from "./pages/Sports";
import Executives from "./pages/Executives";
import ExecutiveProfile from "./pages/ExecutiveProfile";
import PresidentPage from "./pages/PresidentPage";
import ExecutiveChairmanPage from "./pages/ExecutiveChairmanPage";
import HODPage from "./pages/HODPage";
import DataAnalysis from "./pages/DataAnalysis";
import CyberSecurity from "./pages/CyberSecurity";
import Lecturers from "./pages/Lecturers";
import HallOfFame from "./pages/HallOfFame";
import Tutors from "./pages/Tutors";
import TechGiants from "./pages/TechGiants";
import Complaints from "./pages/Complaints";
import Gallery from "./pages/Gallery";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/lecturer" element={<LecturerDashboard />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/past-questions" element={<PastQuestions />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/sports" element={<Sports />} />
            <Route path="/executives" element={<Executives />} />
            <Route path="/executives/:id" element={<ExecutiveProfile />} />
            <Route path="/president" element={<PresidentPage />} />
            <Route path="/executive-chairman" element={<ExecutiveChairmanPage />} />
            <Route path="/hod" element={<HODPage />} />
            <Route path="/data-analysis" element={<DataAnalysis />} />
            <Route path="/cyber-security" element={<CyberSecurity />} />
            <Route path="/lecturers" element={<Lecturers />} />
            <Route path="/hall-of-fame" element={<HallOfFame />} />
            <Route path="/tutors" element={<Tutors />} />
            <Route path="/tech-giants" element={<TechGiants />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;