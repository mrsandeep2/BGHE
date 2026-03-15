import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/hooks/useAuth";
import { lazy, Suspense, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InquiryModal from "@/components/InquiryModal";
import PageTransition from "@/components/PageTransition";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminGuard from "@/components/admin/AdminGuard";
import SuperAdminGuard from "@/components/admin/SuperAdminGuard";
import SocialPopup from "@/components/SocialPopup";

// Lazy load pages for performance
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Universities = lazy(() => import("./pages/Universities"));
const Courses = lazy(() => import("./pages/Courses"));
const Team = lazy(() => import("./pages/Team"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Branches = lazy(() => import("./pages/Branches"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const SeoLandingPage = lazy(() => import("./pages/SeoLandingPage"));
const DRCC = lazy(() => import("./pages/DRCC"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminInquiries = lazy(() => import("./pages/admin/AdminInquiries"));
const AdminUniversities = lazy(() => import("./pages/admin/AdminUniversities"));
const AdminCourses = lazy(() => import("./pages/admin/AdminCourses"));
const AdminCategories = lazy(() => import("./pages/admin/AdminCategories"));
const AdminTeam = lazy(() => import("./pages/admin/AdminTeam"));
const AdminGallery = lazy(() => import("./pages/admin/AdminGallery"));
const AdminBranches = lazy(() => import("./pages/admin/AdminBranches"));
const AdminSlides = lazy(() => import("./pages/admin/AdminSlides"));
const AdminDRCC = lazy(() => import("./pages/admin/AdminDRCC"));
const AdminBlog = lazy(() => import("./pages/admin/AdminBlog"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
  if (isAdmin) return <>{children}</>;
  return (
    <>
      <Navbar />
      <main>
        <PageTransition key={pathname}>
          <Suspense fallback={<PageLoader />}>{children}</Suspense>
        </PageTransition>
      </main>
      <Footer />
      <InquiryModal />
    </>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Admin routes */}
        <Route path="/admin/login" element={<Suspense fallback={<PageLoader />}><AdminLogin /></Suspense>} />
        <Route path="/admin" element={<AdminGuard><AdminLayout><Suspense fallback={<PageLoader />}><Dashboard /></Suspense></AdminLayout></AdminGuard>} />
        <Route path="/admin/inquiries" element={<AdminGuard><AdminLayout><Suspense fallback={<PageLoader />}><AdminInquiries /></Suspense></AdminLayout></AdminGuard>} />
        <Route path="/admin/universities" element={<AdminGuard><SuperAdminGuard><AdminLayout><Suspense fallback={<PageLoader />}><AdminUniversities /></Suspense></AdminLayout></SuperAdminGuard></AdminGuard>} />
        <Route path="/admin/categories" element={<AdminGuard><SuperAdminGuard><AdminLayout><Suspense fallback={<PageLoader />}><AdminCategories /></Suspense></AdminLayout></SuperAdminGuard></AdminGuard>} />
        <Route path="/admin/courses" element={<AdminGuard><AdminLayout><Suspense fallback={<PageLoader />}><AdminCourses /></Suspense></AdminLayout></AdminGuard>} />
        <Route path="/admin/team" element={<AdminGuard><SuperAdminGuard><AdminLayout><Suspense fallback={<PageLoader />}><AdminTeam /></Suspense></AdminLayout></SuperAdminGuard></AdminGuard>} />
        <Route path="/admin/gallery" element={<AdminGuard><SuperAdminGuard><AdminLayout><Suspense fallback={<PageLoader />}><AdminGallery /></Suspense></AdminLayout></SuperAdminGuard></AdminGuard>} />
        <Route path="/admin/branches" element={<AdminGuard><SuperAdminGuard><AdminLayout><Suspense fallback={<PageLoader />}><AdminBranches /></Suspense></AdminLayout></SuperAdminGuard></AdminGuard>} />
        <Route path="/admin/slides" element={<AdminGuard><SuperAdminGuard><AdminLayout><Suspense fallback={<PageLoader />}><AdminSlides /></Suspense></AdminLayout></SuperAdminGuard></AdminGuard>} />
        <Route path="/admin/drcc" element={<AdminGuard><SuperAdminGuard><AdminLayout><Suspense fallback={<PageLoader />}><AdminDRCC /></Suspense></AdminLayout></SuperAdminGuard></AdminGuard>} />
        <Route path="/admin/blog" element={<AdminGuard><SuperAdminGuard><AdminLayout><Suspense fallback={<PageLoader />}><AdminBlog /></Suspense></AdminLayout></SuperAdminGuard></AdminGuard>} />

        {/* Public routes */}
        <Route path="/" element={<PublicLayout><Index /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/universities" element={<PublicLayout><Universities /></PublicLayout>} />
        <Route path="/courses" element={<PublicLayout><Courses /></PublicLayout>} />
        <Route path="/drcc" element={<PublicLayout><DRCC /></PublicLayout>} />
        <Route path="/team" element={<PublicLayout><Team /></PublicLayout>} />
        <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
        <Route path="/branches" element={<PublicLayout><Branches /></PublicLayout>} />
        <Route path="/bghe-bihar" element={<PublicLayout><SeoLandingPage pageKey="bghe-bihar" /></PublicLayout>} />
        <Route path="/bghe-admission" element={<PublicLayout><SeoLandingPage pageKey="bghe-admission" /></PublicLayout>} />
        <Route path="/bghe-drcc" element={<PublicLayout><SeoLandingPage pageKey="bghe-drcc" /></PublicLayout>} />
        <Route path="/bghe-bscc" element={<PublicLayout><SeoLandingPage pageKey="bghe-bscc" /></PublicLayout>} />
        <Route path="/college-admission-bihar" element={<PublicLayout><SeoLandingPage pageKey="college-admission-bihar" /></PublicLayout>} />
        <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
        <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <SocialPopup />
          <ScrollToTop />
          <AnimatedRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
