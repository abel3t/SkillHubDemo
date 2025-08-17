"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { 
  Search,
  Clock,
  Star,
  MapPin,
  TrendingUp,
  Users,
  Zap,
  ArrowRight,
  Command
} from "lucide-react"
import { cn } from "@/lib/utils"

interface GlobalSearchModalProps {
  isOpen: boolean
  onClose: () => void
}

// Quick suggestions and popular searches
const quickSuggestions = [
  { query: "piano", icon: "🎹", category: "Âm nhạc" },
  { query: "thợ điện", icon: "⚡", category: "Sửa chữa" },
  { query: "tiếng anh", icon: "🗣️", category: "Giáo dục" },
  { query: "dọn nhà", icon: "🧹", category: "Dọn dẹp" },
  { query: "nấu ăn", icon: "👨‍🍳", category: "Ẩm thực" },
  { query: "yoga", icon: "🧘‍♀️", category: "Thể thao" },
]

const recentSearches = [
  "giáo viên piano",
  "thợ sửa máy tính",
  "dạy tiếng anh",
  "sửa điện nước"
]

const trendingSkills = [
  { name: "Piano", count: "234 chuyên gia", trend: "+12%" },
  { name: "Tiếng Anh", count: "189 chuyên gia", trend: "+8%" },
  { name: "Sửa máy tính", count: "156 chuyên gia", trend: "+15%" },
  { name: "Yoga", count: "98 chuyên gia", trend: "+22%" },
]

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Handle search submission
  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    
    // Close modal and navigate to search page
    onClose()
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    
    // Reset state
    setTimeout(() => {
      setQuery("")
      setIsSearching(false)
    }, 500)
  }

  // Handle enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(query)
    }
    if (e.key === 'Escape') {
      onClose()
    }
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden p-0 gap-0">
        <div className="flex flex-col">
          {/* Search Header */}
          <div className="border-b border-gray-200 p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tìm chuyên gia piano, thợ điện, giáo viên tiếng Anh..."
                className="w-full pl-10 pr-20 py-3 text-lg border-none outline-none focus:ring-0 bg-transparent"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <Badge variant="outline" className="text-xs px-2 py-1">
                  <Command className="w-3 h-3 mr-1" />
                  Enter
                </Badge>
              </div>
            </div>
          </div>

          {/* Search Content */}
          <div className="overflow-y-auto max-h-[60vh]">
            {query.trim() ? (
              /* Live Search Results */
              <div className="p-4">
                <div className="text-sm text-gray-600 mb-4">
                  Nhấn Enter để tìm kiếm "<span className="font-medium text-gray-900">{query}</span>"
                </div>
                
                {/* Quick Actions */}
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left p-3 h-auto hover:bg-emerald-50"
                    onClick={() => handleSearch(query)}
                  >
                    <Search className="w-4 h-4 mr-3 text-emerald-600" />
                    <div>
                      <div className="font-medium">Tìm "{query}"</div>
                      <div className="text-sm text-gray-500">Xem tất cả kết quả cho "{query}"</div>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto text-gray-400" />
                  </Button>
                </div>
              </div>
            ) : (
              /* Default Search Content */
              <div className="p-4 space-y-6">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <h3 className="flex items-center text-sm font-semibold text-gray-900 mb-3">
                      <Clock className="w-4 h-4 mr-2" />
                      Tìm kiếm gần đây
                    </h3>
                    <div className="space-y-1">
                      {recentSearches.map((search) => (
                        <Button
                          key={search}
                          variant="ghost"
                          className="w-full justify-start text-left p-2 h-auto hover:bg-gray-50"
                          onClick={() => handleSuggestionClick(search)}
                        >
                          <Clock className="w-4 h-4 mr-3 text-gray-400" />
                          <span>{search}</span>
                          <ArrowRight className="w-4 h-4 ml-auto text-gray-400" />
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Suggestions */}
                <div>
                  <h3 className="flex items-center text-sm font-semibold text-gray-900 mb-3">
                    <Zap className="w-4 h-4 mr-2" />
                    Gợi ý nhanh
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {quickSuggestions.map((suggestion) => (
                      <Button
                        key={suggestion.query}
                        variant="ghost"
                        className="justify-start text-left p-3 h-auto hover:bg-emerald-50 hover:border-emerald-200 border border-transparent"
                        onClick={() => handleSuggestionClick(suggestion.query)}
                      >
                        <span className="text-lg mr-3">{suggestion.icon}</span>
                        <div>
                          <div className="font-medium">{suggestion.query}</div>
                          <div className="text-xs text-gray-500">{suggestion.category}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Trending Skills */}
                <div>
                  <h3 className="flex items-center text-sm font-semibold text-gray-900 mb-3">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Kỹ năng đang hot
                  </h3>
                  <div className="space-y-2">
                    {trendingSkills.map((skill) => (
                      <Button
                        key={skill.name}
                        variant="ghost"
                        className="w-full justify-start text-left p-3 h-auto hover:bg-orange-50 hover:border-orange-200 border border-transparent"
                        onClick={() => handleSuggestionClick(skill.name)}
                      >
                        <TrendingUp className="w-4 h-4 mr-3 text-orange-500" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{skill.name}</span>
                            <Badge className="bg-orange-100 text-orange-700 text-xs">
                              {skill.trend}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-500">{skill.count}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 ml-2 text-gray-400" />
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Community Stats */}
                <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Users className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                      <div className="text-lg font-bold text-gray-900">2,340+ chuyên gia</div>
                      <div className="text-sm text-gray-600 mb-3">
                        Sẵn sàng hỗ trợ bạn trong cộng đồng
                      </div>
                      <div className="flex justify-center gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span>4.8★ đánh giá</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-500" />
                          <span>Toàn TP.HCM</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-3 bg-gray-50">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Command className="w-3 h-3" />
                  <span>+ K để mở</span>
                </div>
                <div>Enter để tìm kiếm</div>
                <div>Esc để đóng</div>
              </div>
              <div>SkillHub Search</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}