import {
  Monitor, Cog, Building, Zap, Radio, GraduationCap,
  Heart, Smile, Leaf, Droplet, Stethoscope,
  Briefcase, TrendingUp, BarChart,
  Scale, Gavel, BookOpen,
  Palette, PenTool, Tv,
  Atom, FlaskConical, Calculator, Microscope,
  DollarSign, Landmark, LineChart,
  BookOpenCheck, Apple, School,
  Sprout, Wheat, TreePine,
  Pill, Beaker, Syringe,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Monitor, Cog, Building, Zap, Radio, GraduationCap,
  Heart, Smile, Leaf, Droplet, Stethoscope,
  Briefcase, TrendingUp, BarChart,
  Scale, Gavel, BookOpen,
  Palette, PenTool, Tv,
  Atom, FlaskConical, Calculator, Microscope,
  DollarSign, Landmark, LineChart,
  BookOpenCheck, Apple, School,
  Sprout, Wheat, TreePine,
  Pill, Beaker, Syringe,
};

export function getCourseIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || BookOpen;
}

export const cardColors = [
  { bg: "from-blue-50 to-indigo-100", hover: "from-rose-100 to-pink-200", icon: "text-indigo-600", iconBg: "from-indigo-200 to-blue-300", stripe: "from-indigo-500 to-blue-500" },
  { bg: "from-emerald-50 to-teal-100", hover: "from-violet-100 to-purple-200", icon: "text-emerald-600", iconBg: "from-emerald-200 to-teal-300", stripe: "from-emerald-500 to-teal-500" },
  { bg: "from-amber-50 to-orange-100", hover: "from-sky-100 to-cyan-200", icon: "text-orange-600", iconBg: "from-orange-200 to-amber-300", stripe: "from-orange-500 to-amber-500" },
  { bg: "from-purple-50 to-violet-100", hover: "from-amber-100 to-yellow-200", icon: "text-purple-600", iconBg: "from-purple-200 to-violet-300", stripe: "from-purple-500 to-violet-500" },
  { bg: "from-rose-50 to-pink-100", hover: "from-emerald-100 to-green-200", icon: "text-rose-600", iconBg: "from-rose-200 to-pink-300", stripe: "from-rose-500 to-pink-500" },
  { bg: "from-sky-50 to-cyan-100", hover: "from-rose-100 to-orange-200", icon: "text-sky-600", iconBg: "from-sky-200 to-cyan-300", stripe: "from-sky-500 to-cyan-500" },
];

export function getCardColor(index: number) {
  return cardColors[index % cardColors.length];
}
