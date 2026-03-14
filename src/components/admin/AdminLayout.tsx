import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard, MessageSquare, GraduationCap, BookOpen,
  Users, Image, Building2, LogOut, Settings, ChevronLeft, ChevronRight, Sparkles, Home, Landmark, FolderOpen, Newspaper
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
  superAdminOnly?: boolean;
  color: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard, color: "from-blue-500 to-cyan-500" },
  { label: "Inquiries", path: "/admin/inquiries", icon: MessageSquare, color: "from-emerald-500 to-teal-500" },
  { label: "Universities", path: "/admin/universities", icon: GraduationCap, superAdminOnly: true, color: "from-violet-500 to-purple-500" },
  { label: "Categories", path: "/admin/categories", icon: FolderOpen, superAdminOnly: true, color: "from-fuchsia-500 to-violet-500" },
  { label: "Courses", path: "/admin/courses", icon: BookOpen, color: "from-amber-500 to-orange-500" },
  { label: "Team", path: "/admin/team", icon: Users, superAdminOnly: true, color: "from-rose-500 to-pink-500" },
  { label: "Gallery", path: "/admin/gallery", icon: Image, superAdminOnly: true, color: "from-indigo-500 to-blue-500" },
  { label: "Branches", path: "/admin/branches", icon: Building2, superAdminOnly: true, color: "from-cyan-500 to-teal-500" },
  { label: "Hero Slides", path: "/admin/slides", icon: Settings, superAdminOnly: true, color: "from-fuchsia-500 to-pink-500" },
  { label: "DRCC Courses", path: "/admin/drcc", icon: Landmark, superAdminOnly: true, color: "from-green-500 to-emerald-500" },
  { label: "Blog", path: "/admin/blog", icon: Newspaper, superAdminOnly: true, color: "from-sky-500 to-blue-500" },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { role, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const filteredItems = navItems.filter(item => !item.superAdminOnly || role === 'super_admin');

  return (
    <div className="min-h-screen flex bg-[hsl(var(--navy-dark))]">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: collapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative flex flex-col shrink-0 border-r border-white/10 bg-gradient-to-b from-[hsl(var(--navy-dark))] via-[hsl(213,56%,10%)] to-[hsl(var(--navy-dark))]"
      >
        {/* Decorative glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-[hsl(var(--gold))]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        {/* Header */}
        <div className={cn(
          "relative p-4 border-b border-white/10 flex items-center gap-3",
          collapsed ? "justify-center" : "justify-between"
        )}>
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--gold))] to-amber-400 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-[hsl(var(--gold))] to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
            </div>
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="leading-tight"
                >
                  <span className="text-sm font-heading font-bold text-white block">Bharat Group</span>
                  <span className="text-[10px] uppercase tracking-widest text-white/50">Admin Panel</span>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 z-50 w-6 h-6 bg-[hsl(var(--navy))] border border-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-[hsl(var(--gold))] transition-all shadow-lg"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>

        {/* Navigation */}
        <nav className="relative flex-1 p-3 space-y-1.5 overflow-auto scrollbar-thin">
          {filteredItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <NavLink
                  to={item.path}
                  className={cn(
                    "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                    collapsed ? "justify-center" : "",
                    isActive 
                      ? "text-white" 
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                  activeClassName=""
                >
                  {/* Active background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className={cn(
                        "absolute inset-0 rounded-xl bg-gradient-to-r opacity-90",
                        item.color
                      )}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  {/* Icon container */}
                  <div className={cn(
                    "relative z-10 w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                    isActive 
                      ? "bg-white/20" 
                      : "bg-white/5 group-hover:bg-white/10"
                  )}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  
                  {/* Label */}
                  <AnimatePresence mode="wait">
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Hover indicator */}
                  {!isActive && (
                    <div className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 rounded-r-full bg-gradient-to-b transition-all duration-300 group-hover:h-6",
                      item.color
                    )} />
                  )}
                </NavLink>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="relative p-3 border-t border-white/10 space-y-3">
          {/* Role Badge */}
          <div className={cn(
            "px-3 py-2 rounded-xl bg-white/5 backdrop-blur-sm",
            collapsed ? "text-center" : ""
          )}>
            <AnimatePresence mode="wait">
              {!collapsed ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[hsl(var(--gold))]" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-white/40">Your Role</p>
                    <p className="text-sm font-semibold text-[hsl(var(--gold))] capitalize">
                      {role?.replace('_', ' ')}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Sparkles className="w-4 h-4 text-[hsl(var(--gold))] mx-auto" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Back to Home */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className={cn(
              "w-full text-white/60 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20 rounded-xl transition-all",
              collapsed ? "justify-center px-2" : "justify-start"
            )}
          >
            <Home className="w-4 h-4" />
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="ml-2"
                >
                  Back to Home
                </motion.span>
              )}
            </AnimatePresence>
          </Button>

          {/* Sign Out Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSignOut}
            className={cn(
              "w-full text-white/60 hover:text-white hover:bg-red-500/20 border border-transparent hover:border-red-500/30 rounded-xl transition-all",
              collapsed ? "justify-center px-2" : "justify-start"
            )}
          >
            <LogOut className="w-4 h-4" />
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="ml-2"
                >
                  Sign Out
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
