"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { SearchBar } from "./SearchBar"
import { CategoryGrid } from "./CategoryGrid"
import { QuickFilters } from "./QuickFilters"
import { HelperCard } from "./HelperCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MapPin,
  Star,
  TrendingUp,
  Users,
  Zap,
  Clock,
  Filter,
  LayoutGrid,
  List,
  Map,
  RefreshCw,
  Heart,
  MessageSquare,
  ThumbsUp,
  Search,
} from "lucide-react"

interface SkillFeedProps {
  helpers: any[]
  onHelperSelect?: (helper: any) => void
}

export function SkillFeed({ helpers, onHelperSelect }: SkillFeedProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list" | "compact">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [filteredHelpers, setFilteredHelpers] = useState(helpers)
  const [sortBy, setSortBy] = useState<"distance" | "rating" | "response" | "helped">("distance")
  const [showCommunityHighlights, setShowCommunityHighlights] = useState(true)

  useEffect(() => {
    let filtered = helpers

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(helper => 
        helper.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        helper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        helper.canHelp.some((skill: string) => 
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(helper =>
        helper.canHelp.some((skill: string) =>
          skill.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      )
    }

    // Sort helpers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "response":
          return a.responseTime.localeCompare(b.responseTime)
        case "helped":
          return b.helpedPeople - a.helpedPeople
        case "distance":
        default:
          return parseFloat(a.distance) - parseFloat(b.distance)
      }
    })

    setFilteredHelpers(filtered)
  }, [helpers, searchQuery, selectedCategory, sortBy])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category.name)
  }

  const handleFiltersChange = (filters: any) => {
    // Apply filters to helpers
    console.log("Filters changed:", filters)
  }

  const communityHighlights = [
    {
      id: "highlight-1",
      type: "success_story",
      title: "Anh Minh đã giúp chị Lan sửa chữa hệ thống điện",
      content: "Cảm ơn anh Minh đã hỗ trợ sửa chữa hệ thống điện nhà em rất nhanh chóng và chuyên nghiệp!",
      author: "Trần Thị Lan",
      helper: "Nguyễn Văn Minh",
      timeAgo: "2 giờ trước",
      likes: 23,
      comments: 5,
      avatar: "/vietnamese-user.png"
    },
    {
      id: "highlight-2", 
      type: "tip",
      title: "Mẹo hay: Cách bảo quản đàn piano trong mùa mưa",
      content: "Chia sẻ một số mẹo nhỏ để bảo quản đàn piano tránh ẩm mốc trong mùa mưa bão...",
      author: "Lê Thị Hương",
      timeAgo: "1 ngày trước", 
      likes: 45,
      comments: 12,
      avatar: "/vietnamese-user.png"
    }
  ]

  const trendingSearches = [
    { term: "thợ điện", count: 156, trend: "+12%" },
    { term: "dạy piano", count: 89, trend: "+8%" },
    { term: "sửa máy tính", count: 67, trend: "+15%" },
    { term: "dạy tiếng anh", count: 45, trend: "+5%" }
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header with Search - Mobile optimized */}
      <motion.div className="text-center space-y-3 sm:space-y-4" variants={itemVariants}>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 px-2">
            Tìm người giúp đỡ <span className="text-emerald-600">gần bạn</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 px-2">
            Kết nối với hàng xóm có kỹ năng, xây dựng cộng đồng tương trợ
          </p>
        </div>
        
        <div className="px-2">
          <SearchBar onSearch={handleSearch} />
        </div>
      </motion.div>

      {/* Quick Stats & Trending - Mobile optimized */}
      <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" variants={itemVariants}>
        <Card className="text-center border border-gray-100 hover:border-emerald-200 transition-colors">
          <CardContent className="p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-emerald-600 mb-1">{helpers.length}</div>
            <div className="text-xs sm:text-sm text-gray-600">Chuyên gia gần bạn</div>
          </CardContent>
        </Card>
        <Card className="text-center border border-gray-100 hover:border-blue-200 transition-colors">
          <CardContent className="p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">4.8</div>
            <div className="text-xs sm:text-sm text-gray-600">Đánh giá TB</div>
          </CardContent>
        </Card>
        <Card className="text-center border border-gray-100 hover:border-purple-200 transition-colors">
          <CardContent className="p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1">15</div>
            <div className="text-xs sm:text-sm text-gray-600">Dịch vụ</div>
          </CardContent>
        </Card>
        <Card className="text-center border border-gray-100 hover:border-orange-200 transition-colors">
          <CardContent className="p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-orange-600 mb-1">2.3k</div>
            <div className="text-xs sm:text-sm text-gray-600">Kết nối</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Community Highlights */}
      {showCommunityHighlights && (
        <motion.div className="space-y-4" variants={itemVariants}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Nổi bật trong cộng đồng
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCommunityHighlights(false)}
            >
              Ẩn
            </Button>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {communityHighlights.map((highlight) => (
              <Card key={highlight.id} className="border border-gray-100 hover:border-emerald-200 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={highlight.avatar} alt={highlight.author} />
                      <AvatarFallback className="bg-emerald-100 text-emerald-700">
                        {highlight.author.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">{highlight.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{highlight.content}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{highlight.author} • {highlight.timeAgo}</span>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            <span>{highlight.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            <span>{highlight.comments}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* Category Grid */}
      <motion.div variants={itemVariants}>
        <CategoryGrid 
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
      </motion.div>

      {/* Filters and Controls */}
      <motion.div className="space-y-4" variants={itemVariants}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {searchQuery || selectedCategory ? 
                `Kết quả tìm kiếm (${filteredHelpers.length})` : 
                "Chuyên gia gần bạn"
              }
            </h2>
            
            {(searchQuery || selectedCategory) && (
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                {searchQuery && `"${searchQuery}"`}
                {selectedCategory && ` • ${selectedCategory}`}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Sort Options */}
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-sm border border-gray-200 rounded-md px-3 py-2 bg-white"
            >
              <option value="distance">Gần nhất</option>
              <option value="rating">Đánh giá cao</option>
              <option value="response">Phản hồi nhanh</option>
              <option value="helped">Kinh nghiệm nhiều</option>
            </select>

            {/* View Mode */}
            <div className="flex border border-gray-200 rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-none"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "compact" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("compact")}
                className="rounded-l-none"
              >
                <Users className="w-4 h-4" />
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4" />
            </Button>

            {/* Advanced Search Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/search')}
              className="bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
            >
              <Search className="w-4 h-4 mr-2" />
              Tìm kiếm nâng cao
            </Button>
          </div>
        </div>

        {/* Quick Filters */}
        <QuickFilters 
          onFiltersChange={handleFiltersChange}
          showAdvanced={showFilters}
        />
      </motion.div>

      {/* Helper Cards */}
      <motion.div className="space-y-4" variants={itemVariants}>
        {filteredHelpers.length === 0 ? (
          <Card className="text-center py-12 border border-gray-100">
            <CardContent>
              <div className="text-gray-400 mb-4">
                <Users className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Không tìm thấy kết quả
              </h3>
              <p className="text-gray-600 mb-4">
                Thử tìm kiếm với từ khóa khác hoặc mở rộng phạm vi tìm kiếm
              </p>
              <Button onClick={() => {setSearchQuery(""); setSelectedCategory("")}}>
                Xem tất cả
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Featured Helpers */}
            {!searchQuery && !selectedCategory && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  Được đề xuất cho bạn
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredHelpers.slice(0, 3).map((helper) => (
                    <HelperCard 
                      key={helper.id} 
                      helper={helper} 
                      variant="featured"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* All Helpers */}
            <div className={
              viewMode === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6" :
              viewMode === "compact" ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" :
              "space-y-4"
            }>
              {filteredHelpers.slice(searchQuery || selectedCategory ? 0 : 3).map((helper) => (
                <HelperCard 
                  key={helper.id} 
                  helper={helper} 
                  variant={viewMode === "compact" ? "compact" : "default"}
                />
              ))}
            </div>

            {/* Load More */}
            {filteredHelpers.length > 12 && (
              <div className="text-center pt-8">
                <Button variant="outline" size="lg">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Xem thêm chuyên gia
                </Button>
              </div>
            )}
          </>
        )}
      </motion.div>

      {/* Trending Searches */}
      {!searchQuery && !selectedCategory && (
        <motion.div variants={itemVariants}>
          <Card className="border border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              Tìm kiếm thịnh hành
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {trendingSearches.map((search, index) => (
                <div 
                  key={index}
                  onClick={() => setSearchQuery(search.term)}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-emerald-50 transition-colors"
                >
                  <div>
                    <div className="font-medium text-gray-900">{search.term}</div>
                    <div className="text-sm text-gray-600">{search.count} tìm kiếm</div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 text-xs">
                    {search.trend}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </motion.div>
      )}
    </motion.div>
  )
}