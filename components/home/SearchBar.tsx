"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  ArrowRight,
} from "lucide-react"

interface SearchResult {
  id: string
  type: "helper" | "skill" | "location"
  name: string
  subtitle: string
  rating?: number
  distance?: string
  responseTime?: string
  avatar?: string
  trending?: boolean
  helpedCount?: number
}

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  showFilters?: boolean
}

export function SearchBar({ 
  onSearch, 
  placeholder = "Tìm kiếm chuyên gia, dịch vụ...",
  showFilters = true 
}: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Mock search results - would come from API
  const mockResults: SearchResult[] = [
    {
      id: "1",
      type: "skill",
      name: "Sửa chữa điện",
      subtitle: "23 chuyên gia gần bạn",
      trending: true
    },
    {
      id: "2", 
      type: "helper",
      name: "Nguyễn Văn Minh",
      subtitle: "Thợ điện chuyên nghiệp",
      rating: 4.9,
      distance: "0.8km",
      responseTime: "2 phút",
      avatar: "/vietnamese-technician.png",
      helpedCount: 127
    },
    {
      id: "3",
      type: "skill", 
      name: "Dạy piano",
      subtitle: "15 giáo viên gần bạn"
    },
    {
      id: "4",
      type: "helper",
      name: "Lê Thị Hương", 
      subtitle: "Giáo viên piano",
      rating: 4.9,
      distance: "1.1km",
      responseTime: "5 phút",
      avatar: "/vietnamese-user.png",
      helpedCount: 89
    },
    {
      id: "5",
      type: "location",
      name: "Quận 1",
      subtitle: "156 chuyên gia đang hoạt động"
    }
  ]

  const handleInputChange = (value: string) => {
    setQuery(value)
    setIsSearching(true)
    
    // Simulate search delay
    setTimeout(() => {
      if (value.length > 0) {
        const filtered = mockResults.filter(result => 
          result.name.toLowerCase().includes(value.toLowerCase()) ||
          result.subtitle.toLowerCase().includes(value.toLowerCase())
        )
        setResults(filtered)
        setShowResults(true)
      } else {
        setResults([])
        setShowResults(false)
      }
      setIsSearching(false)
    }, 300)
  }

  const handleResultClick = (result: SearchResult) => {
    // Navigate to search page with the selected result
    router.push(`/search?q=${encodeURIComponent(result.name)}`)
  }

  const handleSearch = () => {
    if (query.trim()) {
      // Navigate to search page with the query
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setShowResults(false)
    onSearch("")
    inputRef.current?.focus()
  }

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const popularSearches = [
    "Thợ điện", "Dạy piano", "Dọn nhà", "Sửa máy tính", "Dạy tiếng Anh", 
    "Thợ nước", "Massage", "Dạy nấu ăn"
  ]

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      {/* Main Search Input */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-gray-400" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder={placeholder}
            className="pl-12 pr-16 sm:pr-20 py-4 text-base sm:text-lg border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-emerald-500 shadow-lg"
          />
          
          {/* Clear and Search Buttons */}
          <div className="absolute right-2 flex items-center gap-1">
            {query && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
            
            <Button
              onClick={handleSearch}
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2"
              disabled={!query.trim()}
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Advanced Search Button - Mobile responsive */}
        {showFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/search')}
            className="hidden sm:flex absolute -right-20 top-1/2 -translate-y-1/2 border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-200 group"
            title="Tìm kiếm nâng cao"
          >
            <Filter className="w-4 h-4 mr-1" />
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <Card className="absolute top-full mt-2 w-full border-2 border-gray-100 shadow-xl z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-0">
            {isSearching ? (
              <div className="p-4 text-center text-gray-500">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600 mx-auto mb-2"></div>
                Đang tìm kiếm...
              </div>
            ) : results.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {results.map((result) => (
                  <div
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    {result.type === "helper" ? (
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{result.name}</h4>
                            {result.trending && (
                              <Badge className="bg-orange-100 text-orange-700 text-xs">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Hot
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{result.subtitle}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            {result.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span>{result.rating}</span>
                              </div>
                            )}
                            {result.distance && (
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{result.distance}</span>
                              </div>
                            )}
                            {result.responseTime && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{result.responseTime}</span>
                              </div>
                            )}
                            {result.helpedCount && (
                              <div className="flex items-center gap-1">
                                <Zap className="w-3 h-3" />
                                <span>Giúp {result.helpedCount} người</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : result.type === "skill" ? (
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Zap className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{result.name}</h4>
                            {result.trending && (
                              <Badge className="bg-orange-100 text-orange-700 text-xs">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{result.subtitle}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{result.name}</h4>
                          <p className="text-sm text-gray-600">{result.subtitle}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : query.length > 0 ? (
              <div className="p-4 text-center text-gray-500">
                Không tìm thấy kết quả cho "{query}"
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}

      {/* Mobile Filter Button */}
      {showFilters && (
        <div className="sm:hidden mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/search')}
            className="w-full border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-200 group"
          >
            <Filter className="w-4 h-4 mr-2" />
            Tìm kiếm nâng cao
            <ArrowRight className="w-3 h-3 ml-auto group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      )}

      {/* Popular Searches */}
      {!showResults && !query && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-600">Tìm kiếm phổ biến:</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/search')}
              className="hidden sm:flex text-emerald-600 hover:text-emerald-700 text-xs items-center gap-1"
            >
              Tìm kiếm nâng cao
              <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                onClick={() => {
                  router.push(`/search?q=${encodeURIComponent(search)}`)
                }}
              >
                {search}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            💡 <strong>Mẹo:</strong> Nhập từ khóa và nhấn Enter để chuyển sang tìm kiếm nâng cao
          </p>
        </div>
      )}
    </div>
  )
}