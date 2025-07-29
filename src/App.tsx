import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { SavingsProvider } from "./contexts/SavingsContext";
import { MobileNavigation } from "./components/MobileNavigation";
import Dashboard from "@/pages/Dashboard";
import AddRecord from "@/pages/AddRecord";
import History from "@/pages/History";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SavingsProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50 pb-20">
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/add-record" element={<AddRecord />} />
                <Route path="/history" element={<History />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <MobileNavigation />
            </div>
          </BrowserRouter>
        </SavingsProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;