"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Star,
  MapPin,
  Clock,
  MessageCircle,
  Phone,
  Heart,
  Share2,
  Zap,
  Award,
  Shield,
  Users,
  TrendingUp,
  Calendar,
  DollarSign,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Eye
} from "lucide-react"
import { InteractiveMap } from "@/components/map/InteractiveMap"
import { cn } from "@/lib/utils"

interface SearchResult {
  id: string
  type: "helper" | "skill_category"
  name: string
  title?: string
  description: string
  rating: number
  reviewCount: number
  distance?: string
  location: string
  responseTime: string
  price?: {
    min: number
    max: number
    unit: string
  }
  avatar?: string
  verified: boolean
  online: boolean
  helpedCount: number
  joinedDate: string
  specialties: string[]
  badges: string[]
  trending?: boolean
  featured?: boolean
  availability: 'available' | 'busy' | 'away'
  lastActive: string
  endorsements: number
  mutualConnections?: string[]
  recentWork?: {
    title: string
    rating: number
    comment: string
    date: string
  }[]
  lat?: number
  lng?: number
}

interface ResultsListProps {
  results: SearchResult[]
  loading: boolean
  query: string
  totalResults: number
  currentPage: number
  totalPages: number
  viewMode: 'list' | 'grid' | 'map'
  onResultClick: (result: SearchResult) => void
  onContact: (result: SearchResult) => void
  onFavorite: (result: SearchResult) => void
  onShare: (result: SearchResult) => void
  onLoadMore: () => void
  className?: string
}

export function ResultsList({
  results,
  loading,
  query,
  totalResults,
  currentPage,
  totalPages,
  viewMode = 'list',
  onResultClick,
  onContact,
  onFavorite,
  onShare,
  onLoadMore,
  className = ""
}: ResultsListProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [animatingItems, setAnimatingItems] = useState<Set<string>>(new Set())

  // Handle favorite toggle
  const handleFavorite = (result: SearchResult, e: React.MouseEvent) => {
    e.stopPropagation()
    
    const newFavorites = new Set(favorites)
    if (favorites.has(result.id)) {
      newFavorites.delete(result.id)
    } else {
      newFavorites.add(result.id)
    }
    setFavorites(newFavorites)
    
    // Add animation
    setAnimatingItems(prev => new Set(prev).add(result.id))
    setTimeout(() => {
      setAnimatingItems(prev => {
        const next = new Set(prev)
        next.delete(result.id)
        return next
      })
    }, 600)
    
    onFavorite(result)
  }

  // Get availability status
  const getAvailabilityStatus = (availability: string, online: boolean) => {
    if (!online) return { label: 'Offline', color: 'bg-gray-400' }
    
    switch (availability) {
      case 'available':
        return { label: 'Sẵn sàng giúp', color: 'bg-green-500' }
      case 'busy':
        return { label: 'Đang bận', color: 'bg-yellow-500' }
      case 'away':
        return { label: 'Tạm vắng', color: 'bg-orange-500' }
      default:
        return { label: 'Không xác định', color: 'bg-gray-400' }
    }
  }

  // Format price range
  const formatPrice = (price: SearchResult['price']) => {
    if (!price) return null
    if (price.min === price.max) {
      return `${price.min}${price.unit}`
    }
    return `${price.min} - ${price.max}${price.unit}`
  }

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(6)].map((_, index) => (
        <Card key={index} className="animate-pulse">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  // Empty state
  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Eye className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Không tìm thấy kết quả
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {query 
          ? `Không có kết quả nào cho "${query}". Thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc.`
          : "Thử tìm kiếm kỹ năng hoặc chuyên gia bạn cần."
        }
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {['Thợ điện', 'Dạy piano', 'Dọn nhà', 'Sửa máy tính'].map((suggestion) => (
          <Badge 
            key={suggestion}
            variant="secondary" 
            className="cursor-pointer hover:bg-emerald-50 hover:text-emerald-700"
          >
            {suggestion}
          </Badge>
        ))}
      </div>
    </div>
  )

  if (loading) return <LoadingSkeleton />
  if (results.length === 0) return <EmptyState />

  return (
    <div className={cn("space-y-4", className)}>
      {/* Results Header */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
        <span>
          Hiển thị {results.length} trong số {totalResults.toLocaleString()} kết quả
          {query && (
            <span className="font-medium text-gray-900"> cho "{query}"</span>
          )}
        </span>
        <span>Trang {currentPage} / {totalPages}</span>
      </div>

      {/* Results Grid/List/Map */}
      {viewMode === 'map' ? (
        <div className="h-[600px] rounded-lg overflow-hidden border border-gray-200">
          <InteractiveMap
            helpers={results.filter(r => r.lat && r.lng).map(result => ({
              id: parseInt(result.id),
              name: result.name,
              title: result.title || '',
              location: result.location,
              distance: result.distance || '',
              rating: result.rating,
              avatar: result.avatar || '/placeholder.svg',
              canHelp: result.specialties,
              lat: result.lat!,
              lng: result.lng!,
              verified: result.verified,
              isOnline: result.online
            }))}
            center={[10.7769, 106.7009]} // TP.HCM center
            zoom={12}
            onHelperSelect={(helper) => {
              const result = results.find(r => r.id === helper.id.toString())
              if (result) onResultClick(result)
            }}
            className="w-full h-full"
          />
        </div>
      ) : (
        <div className={cn(
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            : "space-y-4"
        )}>
        {results.map((result, index) => {
          const isFavorited = favorites.has(result.id)
          const isAnimating = animatingItems.has(result.id)
          const availabilityStatus = getAvailabilityStatus(result.availability, result.online)

          return (
            <Card
              key={result.id}
              className={cn(
                "group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border border-gray-200 overflow-hidden",
                result.featured && "ring-2 ring-emerald-500 ring-opacity-50 bg-gradient-to-br from-emerald-50 to-white",
                "animate-in slide-in-from-bottom-2 duration-300"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onResultClick(result)}
            >
              <CardContent className="p-0">
                {/* Featured Badge */}
                {result.featured && (
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 text-xs font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Chuyên gia đề xuất
                  </div>
                )}

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <Avatar className="w-16 h-16 ring-2 ring-gray-100 group-hover:ring-emerald-200 transition-all">
                        <AvatarImage src={result.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-emerald-100 text-emerald-700 text-lg font-semibold">
                          {result.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      {/* Online/Availability indicator */}
                      <div className={cn(
                        "absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center",
                        availabilityStatus.color
                      )}>
                        {result.online && (
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        )}
                      </div>

                      {/* Verified badge */}
                      {result.verified && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">
                            {result.name}
                          </h3>
                          {result.title && (
                            <p className="text-sm font-medium text-gray-700 mb-2">{result.title}</p>
                          )}
                          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{result.description}</p>
                        </div>

                        {/* Favorite button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleFavorite(result, e)}
                          className={cn(
                            "rounded-full p-2 transition-all duration-300",
                            isFavorited 
                              ? "text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100" 
                              : "text-gray-400 hover:text-red-500 hover:bg-red-50",
                            isAnimating && "animate-bounce"
                          )}
                        >
                          <Heart className={cn("w-4 h-4", isFavorited && "fill-current")} />
                        </Button>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {result.trending && (
                          <Badge className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Hot
                          </Badge>
                        )}
                        {result.badges.slice(0, 2).map((badge) => (
                          <Badge key={badge} variant="secondary" className="text-xs px-2 py-0.5">
                            {badge}
                          </Badge>
                        ))}
                        {result.badges.length > 2 && (
                          <Badge variant="outline" className="text-xs px-2 py-0.5">
                            +{result.badges.length - 2}
                          </Badge>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-xs text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{result.rating}</span>
                          <span>({result.reviewCount})</span>
                        </div>
                        {result.distance && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{result.distance}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Phản hồi {result.responseTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{result.helpedCount}+ người</span>
                        </div>
                      </div>

                      {/* Specialties */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {result.specialties.slice(0, 3).map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 border-emerald-200">
                            {specialty}
                          </Badge>
                        ))}
                        {result.specialties.length > 3 && (
                          <Badge variant="outline" className="text-xs px-2 py-0.5">
                            +{result.specialties.length - 3} khác
                          </Badge>
                        )}
                      </div>

                      {/* Price and Location */}
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{result.location}</span>
                        </div>
                        {result.price && (
                          <div className="flex items-center gap-1 font-semibold text-emerald-600">
                            <DollarSign className="w-3 h-3" />
                            <span>{formatPrice(result.price)}</span>
                          </div>
                        )}
                      </div>

                      {/* Recent Work Preview */}
                      {result.recentWork && result.recentWork.length > 0 && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="w-3 h-3 text-gray-600" />
                            <span className="text-xs font-medium text-gray-700">Công việc gần đây</span>
                          </div>
                          <div className="text-xs text-gray-600">
                            <p className="font-medium mb-1">"{result.recentWork[0].title}"</p>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span>{result.recentWork[0].rating}</span>
                              </div>
                              <span>•</span>
                              <span>{result.recentWork[0].date}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Mutual Connections */}
                      {result.mutualConnections && result.mutualConnections.length > 0 && (
                        <div className="mb-4 text-xs text-gray-600">
                          <span className="font-medium">Quen biết chung: </span>
                          <span>{result.mutualConnections.slice(0, 2).join(', ')}</span>
                          {result.mutualConnections.length > 2 && (
                            <span> và {result.mutualConnections.length - 2} người khác</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        onContact(result)
                      }}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Nhắn tin
                    </Button>
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        onContact(result)
                      }}
                      className="flex-1 border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Gọi điện
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onShare(result)
                      }}
                      className="px-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Availability Status */}
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-2 h-2 rounded-full", availabilityStatus.color)}></div>
                      <span className="text-gray-600">{availabilityStatus.label}</span>
                    </div>
                    <span className="text-gray-500">Hoạt động {result.lastActive}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
        </div>
      )}

      {/* Load More */}
      {currentPage < totalPages && (
        <div className="text-center pt-8">
          <Button
            onClick={onLoadMore}
            variant="outline"
            size="lg"
            disabled={loading}
            className="min-w-32 border-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mr-2" />
                Đang tải...
              </>
            ) : (
              <>
                Xem thêm kết quả
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}