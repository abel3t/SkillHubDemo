"use client"

import React, { useState, useRef, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Bell, 
  Home, 
  Users, 
  MapPin, 
  MessageCircle, 
  Search,
  User,
  Settings,
  HelpCircle,
  Crown,
  LogOut,
  ChevronDown
} from "lucide-react"

export const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLButtonElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { path: "/", label: "Trang chủ", mobileLabel: "Chủ", icon: Home },
    { path: "/helpers", label: "Chuyên gia", mobileLabel: "Chuyên gia", icon: Users },
    { path: "/map", label: "Bản đồ", mobileLabel: "Bản đồ", icon: MapPin },
    { path: "/messages", label: "Tin nhắn", mobileLabel: "Tin nhắn", icon: MessageCircle },
    { path: "/search", label: "Tìm kiếm", mobileLabel: "Tìm kiếm", icon: Search },
  ];

  const dropdownItems = [
    {
      id: 'profile',
      label: 'Xem hồ sơ',
      icon: User,
      action: () => router.push('/profile'),
      className: 'text-gray-700 hover:bg-gray-50'
    },
    {
      id: 'settings',
      label: 'Cài đặt',
      icon: Settings,
      action: () => router.push('/settings'),
      className: 'text-gray-700 hover:bg-gray-50'
    },
    {
      id: 'help',
      label: 'Trợ giúp & hỗ trợ',
      icon: HelpCircle,
      action: () => router.push('/help'),
      className: 'text-gray-700 hover:bg-gray-50'
    },
    {
      id: 'premium',
      label: 'Dùng thử Premium',
      icon: Crown,
      action: () => router.push('/premium'),
      className: 'text-amber-600 hover:bg-amber-50 font-medium',
      highlight: true
    },
    {
      id: 'logout',
      label: 'Đăng xuất',
      icon: LogOut,
      action: () => {
        // Handle logout logic here
        console.log('Logging out...');
        // router.push('/login');
      },
      className: 'text-red-600 hover:bg-red-50 border-t border-gray-100',
      separator: true
    }
  ];

  const isActive = (path: string) => pathname === path;

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Focus first dropdown item when dropdown opens
  useEffect(() => {
    if (isDropdownOpen) {
      const firstDropdownItem = dropdownRef.current?.querySelector('button');
      setTimeout(() => firstDropdownItem?.focus(), 100);
    }
  }, [isDropdownOpen]);

  const handleDropdownItemClick = (item: typeof dropdownItems[0]) => {
    item.action();
    setIsDropdownOpen(false);
  };

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
            
            {/* Avatar Dropdown */}
            <div className="relative">
              <Button
                ref={avatarRef}
                onClick={handleAvatarClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAvatarClick();
                  }
                  if (e.key === 'Escape') {
                    setIsDropdownOpen(false);
                  }
                }}
                variant="ghost"
                className={`flex items-center gap-1 rounded-full p-1 transition-all duration-200 ${
                  isDropdownOpen ? 'ring-2 ring-emerald-500 ring-offset-2' : ''
                }`}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                aria-label="Mở menu tài khoản"
              >
                <Avatar className={`w-9 h-9 border-2 transition-colors ${
                  isDropdownOpen ? 'border-emerald-500' : 'border-transparent hover:border-emerald-500'
                }`}>
                  <AvatarImage src="/vietnamese-user.png" alt="Lê Thị Hương" />
                  <AvatarFallback className="bg-emerald-100 text-emerald-700">H</AvatarFallback>
                </Avatar>
                <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform duration-200 hidden sm:block ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`} />
              </Button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 sm:right-0 top-full mt-2 w-64 sm:w-72 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-gray-200/80 py-2 z-50 max-w-[calc(100vw-2rem)] mr-2 sm:mr-0"
                  >
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src="/vietnamese-user.png" alt="Lê Thị Hương" />
                          <AvatarFallback className="bg-emerald-100 text-emerald-700">H</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">Lê Thị Hương</p>
                          <p className="text-xs text-gray-500 truncate">Giáo viên Piano & Âm nhạc</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      {dropdownItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleDropdownItemClick(item)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleDropdownItemClick(item);
                              }
                              if (e.key === 'Escape') {
                                setIsDropdownOpen(false);
                                avatarRef.current?.focus();
                              }
                            }}
                            className={`w-full flex items-center px-4 py-3 text-sm transition-colors focus:outline-none focus:bg-gray-50 focus:ring-2 focus:ring-inset focus:ring-emerald-500 ${
                              item.className
                            } ${item.separator ? 'mt-1' : ''}`}
                          >
                            <Icon className="w-4 h-4 mr-3 flex-shrink-0" />
                            <span className="flex-1 text-left">{item.label}</span>
                            {item.highlight && (
                              <div className="flex-shrink-0 ml-2">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                  Mới
                                </span>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-2 border-t border-gray-100">
                      <p className="text-xs text-gray-400 text-center">
                        SkillHub v2.0 • Made with ❤️
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Mobile Navigation */}
      <div className="md:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-md">
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
    </header>
  );
};
