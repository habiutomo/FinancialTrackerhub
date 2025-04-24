import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Dashboard from "@/pages/dashboard";
import PRList from "@/pages/pr/index";
import PRDetail from "@/pages/pr/[id]";
import POList from "@/pages/po/index";
import PODetail from "@/pages/po/[id]";
import GRList from "@/pages/gr/index";
import GRDetail from "@/pages/gr/[id]";

function Router() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-gray-100">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1">
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/pr" component={PRList} />
            <Route path="/pr/:id" component={PRDetail} />
            <Route path="/po" component={POList} />
            <Route path="/po/:id" component={PODetail} />
            <Route path="/gr" component={GRList} />
            <Route path="/gr/:id" component={GRDetail} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
