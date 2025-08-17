"use client"

import { useRouter, usePathname } from "next/navigation"
import { 
  Home, 
  Users, 
  MapPin, 
  MessageCircle,
} from "lucide-react"

export const BottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { path: "/", label: "Trang chủ", mobileLabel: "Chủ", icon: Home },
    { path: "/helpers", label: "Chuyên gia", mobileLabel: "Chuyên gia", icon: Users },
    { path: "/map", label: "Bản đồ", mobileLabel: "Bản đồ", icon: MapPin },
    { path: "/messages", label: "Tin nhắn", mobileLabel: "Tin nhắn", icon: MessageCircle },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-slate-200/80 bg-white/95 backdrop-blur-md z-50">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-around py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isItemActive = isActive(item.path);
            return (
              <button
                key={item.path}
                type="button"
                className={`flex flex-col items-center justify-center min-w-[60px] py-2 px-1 rounded-lg transition-all duration-200 ${
                  isItemActive
                    ? "text-emerald-600 bg-emerald-50 shadow-sm scale-105"
                    : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/50 active:scale-95"
                }`}
                onClick={() => router.push(item.path)}
              >
                <div className={`relative ${
                  isItemActive ? "transform scale-110" : ""
                }`}>
                  <Icon className="w-5 h-5" />
                  {isItemActive && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full" />
                  )}
                </div>
                <span className={`text-xs mt-1 font-medium ${
                  isItemActive ? "text-emerald-700" : "text-slate-500"
                }`}>
                  {item.mobileLabel || item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};