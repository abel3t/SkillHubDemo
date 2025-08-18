"use client"

import React, { useState, useRef, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"
import { useGlobalSearch } from "@/hooks/use-global-search"
import { GlobalSearchModal } from "@/components/search/GlobalSearchModal"
import { getUserLevel } from "@/lib/contribution-system"
import { 
  Bell, 
  Search,
  MessageCircle,
  User,
  Settings,
  HelpCircle,
  Crown,
  LogOut,
  ChevronDown,
  Command,
  Shield,
  Award,
  MapPin,
  Heart,
  Coffee,
  Users,
  Calendar,
  Info
} from "lucide-react"

// Current user's community data
const currentUserPoints = {
  total: 1456,
  breakdown: {
    reviews: 89,
    photos: 150,
    tutorials: 300,
    mentoring: 600,
    verification: 120,
    moderation: 97,
    events: 100,
    localIntelligence: 0
  }
}

export const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLButtonElement>(null);
  const { isSearchOpen, openSearch, closeSearch } = useGlobalSearch();

  // Get user's community level
  const userLevel = getUserLevel(currentUserPoints.total);

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
    { path: "/search", label: "Khám phá", icon: "Search" },
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
      id: 'community',
      label: 'Cộng đồng SkillHub',
      icon: Users,
      action: () => router.push('/community'),
      className: 'text-emerald-600 hover:bg-emerald-50',
      badge: 'Tính năng độc quyền'
    },
    {
      id: 'reputation',
      label: 'Uy tín & Huy hiệu',
      icon: Award,
      action: () => router.push('/profile#community'),
      className: 'text-purple-600 hover:bg-purple-50',
      badge: userLevel.nameVi
    },
    {
      id: 'events',
      label: 'Sự kiện cộng đồng',
      icon: Calendar,
      action: () => router.push('/events'),
      className: 'text-purple-600 hover:bg-purple-50'
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

  // Get level color for avatar border
  const getLevelColor = (color: string) => {
    switch (color) {
      case 'gray': return 'border-gray-300'
      case 'blue': return 'border-blue-400'
      case 'emerald': return 'border-emerald-400'
      case 'purple': return 'border-purple-400'
      case 'gold': return 'border-yellow-400'
      default: return 'border-gray-300'
    }
  };

  return (
    <>
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-6">
            <button
              type="button"
              className="text-2xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-2"
              onClick={() => router.push('/')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  router.push('/');
                }
              }}
            >
              SkillHub
              <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
                <Shield className="w-3 h-3 mr-1" />
                Phi thương mại
              </Badge>
            </button>

            {/* Ward indicator - hidden on mobile */}
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>Phường Bến Nghé</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Global Search Button */}
            <Button 
              variant="ghost" 
              className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                isActive('/search') 
                  ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100' 
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
              onClick={openSearch}
            >
              <Search className="w-4 h-4" />
              <span className="text-sm">Tìm kiếm...</span>
              <Badge variant="outline" className="text-xs ml-2 hidden lg:flex">
                <Command className="w-3 h-3 mr-1" />
                K
              </Badge>
            </Button>
            
            {/* Mobile Search Icon */}
            <Button 
              variant="ghost" 
              size="icon" 
              className={`sm:hidden rounded-full transition-all ${
                isActive('/search') 
                  ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100' 
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
              onClick={openSearch}
            >
              <Search className="w-6 h-6" />
            </Button>

            {/* Community Events Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className={`rounded-full transition-all ${
                isActive('/events') 
                  ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100' 
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
              onClick={() => router.push('/events')}
              title="Sự kiện cộng đồng"
            >
              <Coffee className="w-6 h-6" />
              <span className="sr-only">Sự kiện cộng đồng</span>
            </Button>

            {/* Messages */}
            <Button 
              variant="ghost" 
              size="icon" 
              className={`rounded-full transition-all ${
                isActive('/messages') 
                  ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100' 
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
              onClick={() => router.push('/messages')}
            >
              <MessageCircle className="w-6 h-6" />
              <span className="sr-only">Tin nhắn</span>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="rounded-full text-slate-500 hover:bg-slate-100 relative">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full"></span>
              <span className="sr-only">Thông báo</span>
            </Button>
            
            {/* Avatar Dropdown with Community Level */}
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
                className={`flex items-center gap-2 rounded-full p-1 transition-all duration-200 ${
                  isDropdownOpen ? 'ring-2 ring-emerald-500 ring-offset-2' : ''
                }`}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                aria-label="Mở menu tài khoản"
              >
                <div className="relative">
                  <Avatar className={`w-9 h-9 border-2 transition-colors ${
                    isDropdownOpen ? 'border-emerald-500' : `${getLevelColor(userLevel.color)} hover:border-emerald-500`
                  }`}>
                    <AvatarImage src="/vietnamese-user.png" alt="Lê Thị Hương" />
                    <AvatarFallback className="bg-emerald-100 text-emerald-700">H</AvatarFallback>
                  </Avatar>
                  {/* Level indicator badge */}
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                    userLevel.color === 'gold' ? 'bg-yellow-500' :
                    userLevel.color === 'purple' ? 'bg-purple-500' :
                    userLevel.color === 'emerald' ? 'bg-emerald-500' :
                    userLevel.color === 'blue' ? 'bg-blue-500' : 'bg-gray-500'
                  }`}>
                    {userLevel.id === 'community_guide' ? '🌟' :
                     userLevel.id === 'master_teacher' ? '👨‍🏫' :
                     userLevel.id === 'community_expert' ? '⭐' :
                     userLevel.id === 'good_neighbor' ? '🏠' : '👤'}
                  </div>
                </div>
                
                {/* User level text - hidden on mobile */}
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-medium text-gray-900">Lê Thị Hương</div>
                  <div className="text-xs text-gray-500">{userLevel.nameVi}</div>
                </div>
                
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
                    className="absolute right-0 sm:right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 max-w-[calc(100vw-2rem)] mr-2 sm:mr-0"
                  >
                    {/* User Info Header with Community Status */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src="/vietnamese-user.png" alt="Lê Thị Hương" />
                          <AvatarFallback className="bg-emerald-100 text-emerald-700">H</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">Lê Thị Hương</p>
                          <p className="text-xs text-gray-500 truncate">Giáo viên Piano & Âm nhạc</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {userLevel.nameVi}
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700">
                              <Shield className="w-3 h-3 mr-1" />
                              Phi thương mại
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Community Stats */}
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div>
                          <div className="text-lg font-bold text-emerald-600">{currentUserPoints.total}</div>
                          <div className="text-xs text-gray-500">Điểm đóng góp</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-blue-600">127</div>
                          <div className="text-xs text-gray-500">Người giúp đỡ</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-purple-600">2</div>
                          <div className="text-xs text-gray-500">Huy hiệu</div>
                        </div>
                      </div>
                    </div>

                    {/* Vietnamese Community Values */}
                    <div className="px-4 py-2 bg-emerald-50 border-b border-emerald-100">
                      <div className="flex items-center gap-2 text-xs text-emerald-700">
                        <Heart className="w-3 h-3" />
                        <span className="font-medium">Giá trị cộng đồng Việt Nam:</span>
                        <span>Tôn kính • Chia sẻ • Hỗ trợ</span>
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
                            {item.badge && (
                              <Badge variant="outline" className="text-xs ml-2">
                                {item.badge}
                              </Badge>
                            )}
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

                    {/* Footer with Anti-Big-Tech Message */}
                    <div className="px-4 py-2 border-t border-gray-100">
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                        <Info className="w-3 h-3" />
                        <span>SkillHub • 100% cộng đồng • Không bán dữ liệu</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
    </header>
    
    {/* Global Search Modal */}
    <GlobalSearchModal isOpen={isSearchOpen} onClose={closeSearch} />
  </>
  );
};