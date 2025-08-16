"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AdvancedSearch, FilterPanel, SortOptions, ResultsList } from "@/components/search"
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
    }]
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
    }]
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
    }]
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
    }]
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
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
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
        default:
          // Relevance - featured first, then trending, then rating
          const scoreA = (a.featured ? 1000 : 0) + (a.trending ? 100 : 0) + a.rating * 10
          const scoreB = (b.featured ? 1000 : 0) + (b.trending ? 100 : 0) + b.rating * 10
          comparison = scoreB - scoreA
          return comparison
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

  // Popular searches and quick stats
  const quickStats = [
    { label: 'Chuyên gia', value: '2,340+', icon: Users, color: 'text-blue-600' },
    { label: 'Đánh giá', value: '4.8⭐', icon: Star, color: 'text-yellow-600' },
    { label: 'Phản hồi TB', value: '< 10 phút', icon: Clock, color: 'text-green-600' },
    { label: 'Kỹ năng', value: '120+', icon: Zap, color: 'text-purple-600' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 py-2 text-sm text-gray-600 border-b border-gray-100">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/helpers')}
              className="text-emerald-600 hover:text-emerald-700 p-0 h-auto font-normal"
            >
              Khám phá cộng đồng
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
          
          <div className="flex items-center gap-4 py-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/helpers')}
              className="flex-shrink-0 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Về trang khám phá
            </Button>
            
            {/* Search Bar */}
            <div className="flex-1">
              <AdvancedSearch
                onSearch={handleSearch}
                onFilterToggle={() => setShowFilters(true)}
                initialQuery={query}
                placeholder="Tìm kỹ năng, chuyên gia hoặc dịch vụ..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Message for Advanced Search */}
      {!query && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 mb-8 border border-emerald-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Tìm kiếm nâng cao</h2>
              <p className="text-gray-600 mb-4 max-w-md mx-auto">
                Sử dụng bộ lọc chi tiết và tùy chọn sắp xếp để tìm chính xác người bạn cần
              </p>
              <div className="flex justify-center gap-2">
                <Badge className="bg-emerald-100 text-emerald-700">9+ bộ lọc</Badge>
                <Badge className="bg-blue-100 text-blue-700">10+ tùy chọn sắp xếp</Badge>
                <Badge className="bg-purple-100 text-purple-700">Kết quả chi tiết</Badge>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {quickStats.map((stat, index) => (
              <Card key={`stat-${index}`} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className={cn("flex items-center justify-center mb-2", stat.color)}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Results Header */}
        {(query || totalResults > 0) && (
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {query ? `Kết quả cho "${query}"` : 'Tất cả chuyên gia'}
              </h1>
              {totalResults > 0 && (
                <Badge variant="secondary" className="px-3 py-1">
                  {totalResults.toLocaleString()} kết quả
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Sort Options */}
              <SortOptions
                currentSort={currentSort}
                currentDirection={currentDirection}
                onSortChange={handleSortChange}
                resultCount={totalResults}
              />

              {/* View Mode Toggle */}
              <div className="flex items-center border border-gray-200 rounded-lg p-1">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="px-3"
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="px-3"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
              </div>

              {/* Filter Button */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Bộ lọc
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