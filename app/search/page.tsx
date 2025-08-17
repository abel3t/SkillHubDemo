"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AdvancedSearch, FilterPanel, SortOptions, ResultsList } from "@/components/search"
import { Navigation } from "@/components/shared/Navigation"
import { 
  Grid3X3, 
  List, 
  MapPin, 
  ArrowLeft,
  Filter,
  Search,
  TrendingUp,
  Users,
  Star,
  Zap,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for search results
const mockResults = [
  {
    id: "1",
    type: "helper" as const,
    name: "Nguyễn Văn Minh",
    title: "Thợ điện chuyên nghiệp",
    description: "Chuyên sửa chữa hệ thống điện dân dụng, lắp đặt thiết bị điện, tư vấn an toàn điện. Hơn 8 năm kinh nghiệm trong ngành.",
    rating: 4.9,
    reviewCount: 127,
    distance: "0.8km",
    location: "Quận 1, TP.HCM",
    responseTime: "2 phút",
    price: { min: 200, max: 400, unit: "K/giờ" },
    avatar: "/vietnamese-technician.png",
    verified: true,
    online: true,
    helpedCount: 234,
    joinedDate: "2020-03-15",
    specialties: ["Điện dân dụng", "Điện công nghiệp", "Tư vấn an toàn", "Sửa chữa thiết bị"],
    badges: ["Chuyên gia", "Đáng tin cậy", "Phản hồi nhanh"],
    trending: true,
    featured: true,
    availability: "available" as const,
    lastActive: "5 phút trước",
    endorsements: 45,
    mutualConnections: ["Trần Văn A", "Nguyễn Thị B", "Lê Văn C"],
    recentWork: [{
      title: "Sửa hệ thống điện nhà 3 tầng",
      rating: 5.0,
      comment: "Làm việc rất chuyên nghiệp và nhanh chóng",
      date: "2 ngày trước"
    }],
    lat: 10.7769 + (Math.random() - 0.5) * 0.01,
    lng: 106.7009 + (Math.random() - 0.5) * 0.01
  },
  {
    id: "2",
    type: "helper" as const,
    name: "Lê Thị Hương",
    title: "Giáo viên Piano & Thanh nhạc",
    description: "Tốt nghiệp Nhạc viện TP.HCM, chuyên dạy piano cổ điển và hiện đại cho mọi lứa tuổi. Phương pháp giảng dạy thân thiện và hiệu quả.",
    rating: 4.8,
    reviewCount: 89,
    distance: "1.2km",
    location: "Quận 3, TP.HCM",
    responseTime: "8 phút",
    price: { min: 300, max: 600, unit: "K/buổi" },
    avatar: "/vietnamese-user.png",
    verified: true,
    online: true,
    helpedCount: 156,
    joinedDate: "2019-08-20",
    specialties: ["Piano cổ điển", "Piano hiện đại", "Thanh nhạc", "Lý thuyết âm nhạc"],
    badges: ["Giáo viên chứng chỉ", "Kinh nghiệm lâu năm"],
    availability: "available" as const,
    lastActive: "12 phút trước",
    endorsements: 67,
    recentWork: [{
      title: "Dạy piano cho bé 6 tuổi",
      rating: 4.9,
      comment: "Cô dạy rất tận tâm và kiên nhẫn",
      date: "1 tuần trước"
    }],
    lat: 10.7756 + (Math.random() - 0.5) * 0.01,
    lng: 106.6878 + (Math.random() - 0.5) * 0.01
  },
  {
    id: "3",
    type: "helper" as const,
    name: "Trần Minh Đức",
    title: "Chuyên gia sửa chữa máy tính",
    description: "Kỹ thuật viên IT với 10+ năm kinh nghiệm. Chuyên sửa chữa laptop, PC, cài đặt phần mềm, khắc phục virus và tối ưu hóa hệ thống.",
    rating: 4.7,
    reviewCount: 203,
    distance: "2.1km",
    location: "Quận 7, TP.HCM",
    responseTime: "15 phút",
    price: { min: 150, max: 350, unit: "K/lần" },
    avatar: "/vietnamese-technician.png",
    verified: true,
    online: false,
    helpedCount: 445,
    joinedDate: "2018-05-10",
    specialties: ["Sửa laptop", "Sửa PC", "Cài phần mềm", "Diệt virus", "Nâng cấp hardware"],
    badges: ["Chuyên gia IT", "Hỗ trợ tận nhà"],
    availability: "busy" as const,
    lastActive: "1 giờ trước",
    endorsements: 89,
    recentWork: [{
      title: "Sửa laptop Gaming bị nóng",
      rating: 4.8,
      comment: "Sửa nhanh, giá cả hợp lý",
      date: "3 ngày trước"
    }],
    lat: 10.7364 + (Math.random() - 0.5) * 0.01,
    lng: 106.7217 + (Math.random() - 0.5) * 0.01
  },
  {
    id: "4",
    type: "helper" as const,
    name: "Phạm Thị Lan",
    title: "Chuyên viên dọn dẹp nhà cửa",
    description: "Dịch vụ dọn dẹp nhà cửa chuyên nghiệp, vệ sinh công nghiệp. Đội ngũ có kinh nghiệm, sử dụng thiết bị và hóa chất an toàn.",
    rating: 4.6,
    reviewCount: 156,
    distance: "1.8km",
    location: "Quận 1, TP.HCM",
    responseTime: "25 phút",
    price: { min: 100, max: 200, unit: "K/giờ" },
    avatar: "/vietnamese-cleaning-lady.png",
    verified: true,
    online: true,
    helpedCount: 289,
    joinedDate: "2020-01-15",
    specialties: ["Dọn nhà tổng quát", "Vệ sinh sau xây dựng", "Giặt thảm", "Lau kính"],
    badges: ["Dịch vụ đáng tin cậy", "Giá cả hợp lý"],
    availability: "available" as const,
    lastActive: "vừa xong",
    endorsements: 34,
    recentWork: [{
      title: "Dọn dẹp nhà mới chuyển đến",
      rating: 4.7,
      comment: "Làm việc sạch sẽ và tỉ mỉ",
      date: "5 ngày trước"
    }],
    lat: 10.7745 + (Math.random() - 0.5) * 0.01,
    lng: 106.7006 + (Math.random() - 0.5) * 0.01
  }
]

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // State management
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [results, setResults] = useState(mockResults)
  const [filteredResults, setFilteredResults] = useState(mockResults)
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'map'>('list')
  const [currentSort, setCurrentSort] = useState('relevance')
  const [currentDirection, setCurrentDirection] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    location: [],
    distance: [5],
    rating: [4],
    priceRange: [50, 500],
    availability: [],
    skills: [],
    experience: [],
    verification: [],
    responseTime: [],
    specialties: []
  })

  // Search function
  const handleSearch = useCallback(async (searchQuery: string) => {
    setLoading(true)
    setQuery(searchQuery)
    
    // Update URL
    const newParams = new URLSearchParams(searchParams.toString())
    if (searchQuery) {
      newParams.set('q', searchQuery)
    } else {
      newParams.delete('q')
    }
    router.push(`/search?${newParams.toString()}`, { scroll: false })

    // Simulate API call
    setTimeout(() => {
      let filtered = mockResults
      
      if (searchQuery) {
        filtered = mockResults.filter(result =>
          result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.specialties.some(specialty => 
            specialty.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
      }
      
      setResults(filtered)
      setFilteredResults(filtered)
      setCurrentPage(1)
      setLoading(false)
    }, 600)
  }, [router, searchParams])

  // Filter function
  const handleFiltersChange = useCallback((newFilters: any) => {
    setFilters(newFilters)
    
    // Apply filters to results
    let filtered = results
    
    // Location filter
    if (newFilters.location.length > 0) {
      filtered = filtered.filter(result =>
        newFilters.location.some((loc: string) =>
          result.location.toLowerCase().includes(loc.toLowerCase())
        )
      )
    }

    // Rating filter
    if (newFilters.rating[0] > 1) {
      filtered = filtered.filter(result => result.rating >= newFilters.rating[0])
    }

    // Price range filter
    if (newFilters.priceRange.length === 2) {
      filtered = filtered.filter(result => {
        if (!result.price) return true
        const avgPrice = (result.price.min + result.price.max) / 2
        return avgPrice >= newFilters.priceRange[0] && avgPrice <= newFilters.priceRange[1]
      })
    }

    // Distance filter
    if (newFilters.distance[0] < 20) {
      filtered = filtered.filter(result => {
        if (!result.distance) return true
        const distance = parseFloat(result.distance.replace('km', ''))
        return distance <= newFilters.distance[0]
      })
    }

    setFilteredResults(filtered)
    setCurrentPage(1)
  }, [results])

  // Sort function
  const handleSortChange = useCallback((sortBy: string, direction: 'asc' | 'desc') => {
    setCurrentSort(sortBy)
    setCurrentDirection(direction)
    
    const sorted = [...filteredResults].sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'rating':
          comparison = a.rating - b.rating
          break
        case 'distance':
          const distA = parseFloat(a.distance?.replace('km', '') || '999')
          const distB = parseFloat(b.distance?.replace('km', '') || '999')
          comparison = distA - distB
          break
        case 'responseTime':
          const timeA = parseInt(a.responseTime.replace(/\D/g, ''))
          const timeB = parseInt(b.responseTime.replace(/\D/g, ''))
          comparison = timeA - timeB
          break
        case 'helpedCount':
          comparison = a.helpedCount - b.helpedCount
          break
        case 'priceAsc':
        case 'priceDesc':
          const priceA = a.price ? (a.price.min + a.price.max) / 2 : 0
          const priceB = b.price ? (b.price.min + b.price.max) / 2 : 0
          comparison = priceA - priceB
          break
        default: {
          // LinkedIn-style relevance: Profile Quality + Skills + Endorsements first, then location
          const scoreA = (a.endorsements || 0) * 10 + (a.featured ? 500 : 0) + (a.verified ? 200 : 0) + a.rating * 50 + (a.trending ? 100 : 0)
          const scoreB = (b.endorsements || 0) * 10 + (b.featured ? 500 : 0) + (b.verified ? 200 : 0) + b.rating * 50 + (b.trending ? 100 : 0)
          comparison = scoreB - scoreA
          return comparison
        }
      }
      
      return direction === 'asc' ? comparison : -comparison
    })
    
    setFilteredResults(sorted)
  }, [filteredResults])

  // Handle result actions
  const handleResultClick = (result: any) => {
    router.push(`/profile/${result.id}`)
  }

  const handleContact = (result: any) => {
    router.push(`/messages?contact=${result.id}`)
  }

  const handleFavorite = (result: any) => {
    console.log('Favorited:', result.name)
  }

  const handleShare = (result: any) => {
    if (navigator.share) {
      navigator.share({
        title: result.name,
        text: result.description,
        url: window.location.href
      })
    }
  }

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1)
  }

  // Initialize search from URL params
  useEffect(() => {
    const searchQuery = searchParams.get('q')
    if (searchQuery && searchQuery !== query) {
      handleSearch(searchQuery)
    }
  }, [searchParams, handleSearch, query])

  const totalResults = filteredResults.length
  const totalPages = Math.ceil(totalResults / 10)

  // Vietnamese-focused community stats
  const quickStats = [
    { label: 'Chuyên gia', value: '2,340+', icon: Users, color: 'text-blue-600' },
    { label: 'Đánh giá', value: '4.8⭐', icon: Star, color: 'text-yellow-600' },
    { label: 'Thời gian xe máy', value: '< 15 phút', icon: Clock, color: 'text-green-600' },
    { label: 'Kỹ năng', value: '120+', icon: Zap, color: 'text-purple-600' },
  ]

  return (
    <div className="min-h-screen bg-slate-100">
      <Navigation />
      
      {/* Header - Mobile optimized */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          {/* Breadcrumb Navigation - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-2 py-2 text-sm text-gray-600 border-b border-gray-100">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/')}
              className="text-emerald-600 hover:text-emerald-700 p-0 h-auto font-normal"
            >
              Trang chủ
            </Button>
            <span>/</span>
            <span className="text-gray-900 font-medium">Tìm kiếm nâng cao</span>
            {query && (
              <>
                <span>/</span>
                <span className="text-gray-700">"{query}"</span>
              </>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-3 sm:py-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/')}
              className="flex-shrink-0 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 self-start"
            >
              <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Về trang chủ</span>
              <span className="sm:hidden">Quay lại</span>
            </Button>
            
            {/* Search Bar - Full width on mobile */}
            <div className="flex-1">
              <AdvancedSearch
                onSearch={handleSearch}
                onFilterToggle={() => setShowFilters(true)}
                initialQuery={query}
                placeholder="Tìm chuyên gia piano, thợ điện, giáo viên tiếng Anh..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Professional Discovery Welcome - LinkedIn Style */}
      {!query && (
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-emerald-200">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Khám phá cộng đồng chuyên gia</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 max-w-lg mx-auto px-2">
                Tìm kiếm và kết nối với các chuyên gia địa phương. Xây dựng mạng lưới chuyên nghiệp và tìm kiếm sự hỗ trợ từ cộng đồng.
              </p>
              <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                <Badge className="bg-emerald-100 text-emerald-700 text-xs">Hồ sơ chuyên nghiệp</Badge>
                <Badge className="bg-blue-100 text-blue-700 text-xs">Kết nối địa phương</Badge>
                <Badge className="bg-purple-100 text-purple-700 text-xs">Đánh giá thực tế</Badge>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {quickStats.map((stat) => (
              <Card key={stat.label} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-3 sm:p-4">
                  <div className={cn("flex items-center justify-center mb-1 sm:mb-2", stat.color)}>
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Main Content - Mobile optimized */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6">
        {/* Search Results Header - Mobile optimized */}
        {(query || totalResults > 0) && (
          <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
                {query ? `Chuyên gia cho "${query}"` : 'Khám phá chuyên gia trong cộng đồng'}
              </h1>
              {totalResults > 0 && (
                <Badge variant="secondary" className="px-2 sm:px-3 py-1 self-start">
                  {totalResults.toLocaleString()} hồ sơ
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              {/* Sort Options - Responsive */}
              <div className="flex-shrink-0">
                <SortOptions
                  currentSort={currentSort}
                  currentDirection={currentDirection}
                  onSortChange={handleSortChange}
                  resultCount={totalResults}
                />
              </div>

              {/* View Mode Toggle - Mobile optimized */}
              <div className="flex items-center border border-gray-200 rounded-lg p-1 flex-shrink-0">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="px-2 sm:px-3"
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="px-2 sm:px-3"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                  className="px-2 sm:px-3"
                >
                  <MapPin className="w-4 h-4" />
                </Button>
              </div>

              {/* Filter Button - Mobile optimized */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-1 sm:gap-2 flex-shrink-0"
                size="sm"
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Bộ lọc</span>
                <span className="sm:hidden">Lọc</span>
              </Button>
            </div>
          </div>
        )}

        {/* Results */}
        <ResultsList
          results={filteredResults}
          loading={loading}
          query={query}
          totalResults={totalResults}
          currentPage={currentPage}
          totalPages={totalPages}
          viewMode={viewMode}
          onResultClick={handleResultClick}
          onContact={handleContact}
          onFavorite={handleFavorite}
          onShare={handleShare}
          onLoadMore={handleLoadMore}
        />
      </div>

      {/* Filter Panel */}
      <FilterPanel
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onFiltersChange={handleFiltersChange}
        onClearFilters={() => {
          setFilters({
            location: [],
            distance: [5],
            rating: [4],
            priceRange: [50, 500],
            availability: [],
            skills: [],
            experience: [],
            verification: [],
            responseTime: [],
            specialties: []
          })
          setFilteredResults(results)
        }}
      />
    </div>
  )
}