"use client"

import React from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Home, Users, MapPin, MessageCircle, Search } from "lucide-react"

export const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { path: "/", label: "Trang chủ", icon: Home },
    { path: "/helpers", label: "Helpers", icon: Users },
    { path: "/map", label: "Bản đồ", icon: MapPin },
    { path: "/messages", label: "Tin nhắn", icon: MessageCircle },
    { path: "/search", label: "Tìm kiếm", icon: Search },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-200/80 sticky top-0 z-40">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold text-emerald-600">SkillHub</h1>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className={
                      isActive(item.path)
                        ? "text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
                        : "text-slate-600 hover:bg-slate-100"
                    }
                    onClick={() => router.push(item.path)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="rounded-full text-slate-500 hover:bg-slate-100">
              <Bell className="w-6 h-6" />
            </Button>
            <Button onClick={() => router.push('/profile')} variant="ghost" size="icon" className="rounded-full">
              <Avatar className="w-9 h-9 border-2 border-transparent hover:border-emerald-500">
                <AvatarImage src="/vietnamese-user.png" alt="Profile" />
                <AvatarFallback className="bg-emerald-100 text-emerald-700">U</AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-slate-200/80 bg-white/90">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col items-center ${
                    isActive(item.path)
                      ? "text-emerald-600 bg-emerald-50"
                      : "text-slate-600"
                  }`}
                  onClick={() => router.push(item.path)}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs mt-1">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
