"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  MapPin,
  Star,
  Clock,
  Zap,
  Filter,
  X,
  TrendingUp,
  Users,
  History,
  ArrowUpRight,
  Sparkles,
  Target
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchSuggestion {
  id: string
  type: "helper" | "skill" | "location" | "category" | "recent"
  name: string
  subtitle: string
  rating?: number
  distance?: string
  responseTime?: string
  avatar?: string
  trending?: boolean
  helpedCount?: number
  priority?: number
  category?: string
}

interface AdvancedSearchProps {
  onSearch: (query: string, filters?: any) => void
  onFilterToggle: () => void
  placeholder?: string
  showRecentSearches?: boolean
  initialQuery?: string
  className?: string
}

export function AdvancedSearch({ 
  onSearch, 
  onFilterToggle,
  placeholder = "Tìm kỹ năng, chuyên gia hoặc dịch vụ...",
  showRecentSearches = true,
  initialQuery = "",
  className = ""
}: AdvancedSearchProps) {
  const [query, setQuery] = useState(initialQuery)
  const [isSearching, setIsSearching] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionRefs = useRef<(HTMLDivElement | null)[]>([])

  // Mock search data - enhanced with more realistic data
  const mockSuggestions: SearchSuggestion[] = [
    {
      id: "1",
      type: "skill",
      name: "Sửa chữa điện",
      subtitle: "47 chuyên gia • Phản hồi trung bình 8 phút",
      trending: true,
      priority: 10,
      category: "Kỹ thuật"
    },
    {
      id: "2", 
      type: "helper",
      name: "Nguyễn Văn Minh",
      subtitle: "Thợ điện chuyên nghiệp • 5 năm kinh nghiệm",
      rating: 4.9,
      distance: "0.8km",
      responseTime: "2 phút",
      avatar: "/vietnamese-technician.png",
      helpedCount: 127,
      priority: 9
    },
    {
      id: "3",
      type: "category", 
      name: "Dạy nhạc cụ",
      subtitle: "Piano, Guitar, Violin • 23 giáo viên",
      priority: 8,
      category: "Giáo dục"
    },
    {
      id: "4",
      type: "helper",
      name: "Lê Thị Hương", 
      subtitle: "Giáo viên Piano • Tốt nghiệp Nhạc viện",
      rating: 4.9,
      distance: "1.1km",
      responseTime: "5 phút",
      avatar: "/vietnamese-user.png",
      helpedCount: 89,
      priority: 7
    },
    {
      id: "5",
      type: "skill",
      name: "Dọn dẹp nhà cửa",
      subtitle: "31 chuyên gia • Giá từ 150k/giờ",
      priority: 6,
      category: "Gia đình"
    },
    {
      id: "6",
      type: "location",
      name: "Chuyên gia tại Quận 1",
      subtitle: "156 người đang hoạt động • 4.8⭐ trung bình",
      priority: 5
    },
    {
      id: "7",
      type: "skill",
      name: "Sửa máy tính",
      subtitle: "19 kỹ thuật viên • Hỗ trợ tận nhà",
      trending: true,
      priority: 4,
      category: "Công nghệ"
    }
  ]

  // Debounced search function
  const debouncedSearch = useCallback(
    (searchQuery: string) => {
      setIsSearching(true)
      
      // Simulate API call with realistic delay
      setTimeout(() => {
        if (searchQuery.length > 0) {
          const filtered = mockSuggestions
            .filter(suggestion => 
              suggestion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              suggestion.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
              suggestion.category?.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .sort((a, b) => (b.priority || 0) - (a.priority || 0))
            .slice(0, 6) // Limit to 6 suggestions for better UX
          
          setSuggestions(filtered)
          setShowSuggestions(true)
        } else {
          setSuggestions([])
          setShowSuggestions(false)
        }
        setIsSearching(false)
        setHighlightedIndex(-1)
      }, 200) // Faster response for better UX
    },
    []
  )

  // Handle input changes
  const handleInputChange = (value: string) => {
    setQuery(value)
    debouncedSearch(value)
  }

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.name)
    setShowSuggestions(false)
    addToRecentSearches(suggestion.name)
    onSearch(suggestion.name)
  }

  // Handle search execution
  const handleSearch = (searchQuery?: string) => {
    const finalQuery = searchQuery || query
    if (finalQuery.trim()) {
      setShowSuggestions(false)
      addToRecentSearches(finalQuery.trim())
      onSearch(finalQuery.trim())
    }
  }

  // Handle recent searches
  const addToRecentSearches = (searchTerm: string) => {
    setRecentSearches(prev => {
      const updated = [searchTerm, ...prev.filter(term => term !== searchTerm)]
      return updated.slice(0, 5) // Keep only 5 recent searches
    })
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
  }

  // Clear search
  const clearSearch = () => {
    setQuery("")
    setSuggestions([])
    setShowSuggestions(false)
    setHighlightedIndex(-1)
    onSearch("")
    inputRef.current?.focus()
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return

    const totalItems = suggestions.length + (recentSearches.length > 0 ? recentSearches.length : 0)

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev < totalItems - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : totalItems - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0) {
          if (highlightedIndex < suggestions.length) {
            handleSuggestionClick(suggestions[highlightedIndex])
          } else {
            const recentIndex = highlightedIndex - suggestions.length
            const recentQuery = recentSearches[recentIndex]
            if (recentQuery) {
              setQuery(recentQuery)
              handleSearch(recentQuery)
            }
          }
        } else {
          handleSearch()
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setHighlightedIndex(-1)
        break
    }
  }

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
        setHighlightedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Focus management
  const focusInput = () => {
    inputRef.current?.focus()
    if (query.length === 0 && (recentSearches.length > 0 || suggestions.length > 0)) {
      setShowSuggestions(true)
    }
  }

  const popularCategories = [
    { name: "Điện - Nước", icon: "⚡", count: "47+" },
    { name: "Dạy học", icon: "📚", count: "23+" },
    { name: "Gia đình", icon: "🏠", count: "31+" },
    { name: "Sức khỏe", icon: "💪", count: "19+" },
    { name: "Công nghệ", icon: "💻", count: "15+" },
  ]

  return (
    <div ref={searchRef} className={cn("relative w-full max-w-3xl mx-auto", className)}>
      {/* Main Search Input */}
      <div className="relative">
        <div className="relative flex items-center group">
          <Search className="absolute left-4 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={focusInput}
            placeholder={placeholder}
            className="pl-12 pr-24 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-emerald-500 shadow-lg hover:shadow-xl transition-all duration-200 bg-white"
          />
          
          {/* Right side buttons */}
          <div className="absolute right-2 flex items-center gap-1">
            {query && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
            
            <Button
              onClick={() => handleSearch()}
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              disabled={!query.trim()}
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Filter Button - Mobile responsive */}
        <Button
          variant="outline"
          size="sm"
          onClick={onFilterToggle}
          className="hidden sm:flex absolute -right-16 top-1/2 -translate-y-1/2 border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 rounded-xl shadow-md transition-all duration-200"
        >
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <Card className="absolute top-full mt-2 w-full border-2 border-gray-100 shadow-2xl z-50 max-h-[500px] overflow-hidden rounded-2xl bg-white">
          <CardContent className="p-0">
            {isSearching ? (
              <div className="p-6 text-center text-gray-500">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600 mx-auto mb-3"></div>
                <p className="text-sm">Đang tìm kiếm...</p>
              </div>
            ) : (
              <div className="max-h-[500px] overflow-y-auto">
                {/* Recent Searches */}
                {query.length === 0 && recentSearches.length > 0 && showRecentSearches && (
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <History className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-600">Tìm kiếm gần đây</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearRecentSearches}
                        className="text-xs text-gray-400 hover:text-gray-600 p-1 h-auto"
                      >
                        Xóa tất cả
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <div
                          key={index}
                          ref={el => suggestionRefs.current[suggestions.length + index] = el}
                          onClick={() => {
                            setQuery(search)
                            handleSearch(search)
                          }}
                          className={cn(
                            "flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-colors",
                            highlightedIndex === suggestions.length + index
                              ? "bg-emerald-50 text-emerald-700"
                              : "hover:bg-gray-50"
                          )}
                        >
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{search}</span>
                          <ArrowUpRight className="w-3 h-3 text-gray-400 ml-auto" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Search Suggestions */}
                {suggestions.length > 0 ? (
                  <div className="divide-y divide-gray-50">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={suggestion.id}
                        ref={el => suggestionRefs.current[index] = el}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={cn(
                          "p-4 cursor-pointer transition-all duration-150",
                          highlightedIndex === index
                            ? "bg-emerald-50 scale-[1.01]"
                            : "hover:bg-gray-50"
                        )}
                      >
                        {suggestion.type === "helper" ? (
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center overflow-hidden">
                                {suggestion.avatar ? (
                                  <img src={suggestion.avatar} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <Users className="w-6 h-6 text-emerald-600" />
                                )}
                              </div>
                              {suggestion.trending && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                                  <Sparkles className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-gray-900">{suggestion.name}</h4>
                                {suggestion.trending && (
                                  <Badge className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    Hot
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{suggestion.subtitle}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                {suggestion.rating && (
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium">{suggestion.rating}</span>
                                  </div>
                                )}
                                {suggestion.distance && (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>{suggestion.distance}</span>
                                  </div>
                                )}
                                {suggestion.responseTime && (
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>Phản hồi {suggestion.responseTime}</span>
                                  </div>
                                )}
                                {suggestion.helpedCount && (
                                  <div className="flex items-center gap-1">
                                    <Zap className="w-3 h-3" />
                                    <span>Giúp {suggestion.helpedCount}+ người</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "w-12 h-12 rounded-full flex items-center justify-center",
                              suggestion.type === "skill" ? "bg-blue-100" :
                              suggestion.type === "category" ? "bg-purple-100" :
                              "bg-green-100"
                            )}>
                              {suggestion.type === "skill" ? (
                                <Zap className={cn(
                                  "w-6 h-6",
                                  suggestion.type === "skill" ? "text-blue-600" :
                                  suggestion.type === "category" ? "text-purple-600" :
                                  "text-green-600"
                                )} />
                              ) : suggestion.type === "category" ? (
                                <Target className="w-6 h-6 text-purple-600" />
                              ) : (
                                <MapPin className="w-6 h-6 text-green-600" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-gray-900">{suggestion.name}</h4>
                                {suggestion.trending && (
                                  <Badge className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    Trending
                                  </Badge>
                                )}
                                {suggestion.category && (
                                  <Badge variant="secondary" className="text-xs px-2 py-0.5">
                                    {suggestion.category}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{suggestion.subtitle}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : query.length > 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm mb-2">Không tìm thấy kết quả cho "{query}"</p>
                    <p className="text-xs text-gray-400">Thử tìm kiếm với từ khóa khác hoặc kiểm tra chính tả</p>
                  </div>
                ) : null}

                {/* Popular Categories (when no query) */}
                {query.length === 0 && suggestions.length === 0 && (
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-600">Danh mục phổ biến</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {popularCategories.map((category, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setQuery(category.name)
                            handleSearch(category.name)
                          }}
                          className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-2xl">{category.icon}</span>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{category.name}</h4>
                            <p className="text-xs text-gray-500">{category.count} chuyên gia</p>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Mobile Filter Button */}
      <div className="sm:hidden mt-3">
        <Button
          variant="outline"
          onClick={onFilterToggle}
          className="w-full border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 rounded-xl shadow-md transition-all duration-200 group"
        >
          <Filter className="w-4 h-4 mr-2" />
          Bộ lọc tìm kiếm
          <Sparkles className="w-3 h-3 ml-auto group-hover:rotate-12 transition-transform" />
        </Button>
      </div>
    </div>
  )
}