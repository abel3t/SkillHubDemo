"use client"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Play,
  MapPin,
  Star,
  Clock,
  Eye,
  ThumbsUp,
  ExternalLink,
} from "lucide-react"

interface FeedPostProps {
  post: {
    id: string
    type: "tip" | "success_story" | "helper_highlight" | "ad" | "video_tip" | "before_after"
    author: {
      name: string
      avatar: string
      title: string
      verified: boolean
      location?: string
      rating?: number
    }
    content: {
      text: string
      images?: string[]
      video?: string
      beforeAfter?: {
        before: string
        after: string
      }
    }
    engagement: {
      likes: number
      comments: number
      shares: number
      views: number
      bookmarks: number
    }
    timeAgo: string
    tags?: string[]
    adData?: {
      sponsor: string
      ctaText: string
      ctaLink: string
    }
  }
}

export function FeedPost({ post }: FeedPostProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showFullText, setShowFullText] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState("")
  const touchStartRef = useRef({ x: 0, y: 0 })
  const postRef = useRef<HTMLDivElement>(null)

  const isLongText = post.content.text.length > 150

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  // Swipe gesture handlers for mobile engagement
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    }
    
    const deltaX = touchEnd.x - touchStartRef.current.x
    const deltaY = touchEnd.y - touchStartRef.current.y
    
    // Minimum swipe distance
    const minSwipeDistance = 50
    
    if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        // Swipe right - like post
        if (!isLiked) {
          handleLike()
          setSwipeDirection("right")
          setTimeout(() => setSwipeDirection(""), 600)
        }
      } else {
        // Swipe left - bookmark post
        if (!isBookmarked) {
          handleBookmark()
          setSwipeDirection("left")
          setTimeout(() => setSwipeDirection(""), 600)
        }
      }
    }
  }

  // Double tap to like (Instagram-style)
  const handleDoubleClick = () => {
    if (!isLiked) {
      handleLike()
      setSwipeDirection("heart")
      setTimeout(() => setSwipeDirection(""), 1000)
    }
  }

  const getPostTypeColor = () => {
    switch (post.type) {
      case "tip": return "bg-blue-50 text-blue-700 border-blue-200"
      case "success_story": return "bg-green-50 text-green-700 border-green-200"
      case "helper_highlight": return "bg-purple-50 text-purple-700 border-purple-200"
      case "ad": return "bg-orange-50 text-orange-700 border-orange-200"
      case "video_tip": return "bg-red-50 text-red-700 border-red-200"
      case "before_after": return "bg-emerald-50 text-emerald-700 border-emerald-200"
      default: return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getPostTypeLabel = () => {
    switch (post.type) {
      case "tip": return "💡 Mẹo hay"
      case "success_story": return "✅ Câu chuyện thành công"
      case "helper_highlight": return "⭐ Chuyên gia nổi bật"
      case "ad": return "📢 Được tài trợ"
      case "video_tip": return "🎥 Video hướng dẫn"
      case "before_after": return "📸 Trước & Sau"
      default: return ""
    }
  }

  return (
    <Card 
      ref={postRef}
      className={`border border-gray-100 hover:border-gray-200 transition-all duration-300 bg-white relative overflow-hidden ${
        swipeDirection === "right" ? "animate-pulse border-red-300 shadow-lg" : ""
      } ${
        swipeDirection === "left" ? "animate-pulse border-emerald-300 shadow-lg" : ""
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={handleDoubleClick}
    >
      {/* Swipe feedback animations */}
      {swipeDirection === "heart" && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/10 pointer-events-none">
          <div className="text-6xl animate-bounce">❤️</div>
        </div>
      )}
      {swipeDirection === "right" && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-red-500 text-white px-4 py-2 rounded-full animate-pulse">
          👍 Đã thích!
        </div>
      )}
      {swipeDirection === "left" && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-emerald-500 text-white px-4 py-2 rounded-full animate-pulse">
          🔖 Đã lưu!
        </div>
      )}
      
      <CardContent className="p-0">
        {/* Compact Post Header */}
        <div className="p-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback className="bg-emerald-50 text-emerald-700 text-sm">
                {post.author.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm text-gray-900 truncate">{post.author.name}</h3>
                {post.author.verified && (
                  <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                )}
                <Badge variant="outline" className={`text-xs px-1.5 py-0.5 ${getPostTypeColor()}`}>
                  {getPostTypeLabel()}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{post.timeAgo}</span>
                {post.author.location && (
                  <>
                    <span>•</span>
                    <span>{post.author.location}</span>
                  </>
                )}
              </div>
            </div>
            
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Post Content */}
        <div className="px-3 pb-2">
          {/* Text Content */}
          <div className="mb-3">
            <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">
              {isLongText && !showFullText 
                ? post.content.text.slice(0, 120) + "..." 
                : post.content.text
              }
            </p>
            {isLongText && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowFullText(!showFullText)}
                className="text-emerald-600 hover:text-emerald-700 p-0 h-auto mt-1 text-sm"
              >
                {showFullText ? "Thu gọn" : "Xem thêm"}
              </Button>
            )}
          </div>

          {/* Media Content - Only show one type */}
          {post.content.video ? (
            <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden mb-3 group max-h-60">
              <video 
                src={post.content.video}
                poster={post.content.images?.[0] || "/placeholder.jpg"}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                onClick={(e) => {
                  const video = e.target as HTMLVideoElement
                  if (video.paused) {
                    video.play()
                    video.setAttribute('controls', 'true')
                  } else {
                    video.pause()
                    video.removeAttribute('controls')
                  }
                }}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors pointer-events-none">
                <div className="absolute top-2 right-2 bg-black/70 text-white px-1.5 py-0.5 rounded text-xs">
                  🎥
                </div>
              </div>
            </div>
          ) : post.content.beforeAfter ? (
            <div className="grid grid-cols-2 gap-1 mb-3">
              <div className="relative">
                <img 
                  src={post.content.beforeAfter.before} 
                  alt="Before"
                  className="w-full aspect-[4/3] object-cover rounded"
                />
                <div className="absolute top-1 left-1 bg-red-500 text-white px-1.5 py-0.5 rounded text-xs">
                  Trước
                </div>
              </div>
              <div className="relative">
                <img 
                  src={post.content.beforeAfter.after} 
                  alt="After"
                  className="w-full aspect-[4/3] object-cover rounded"
                />
                <div className="absolute top-1 left-1 bg-green-500 text-white px-1.5 py-0.5 rounded text-xs">
                  Sau
                </div>
              </div>
            </div>
          ) : post.content.images && post.content.images.length > 0 ? (
            <div className="mb-3">
              <img 
                src={post.content.images[0]} 
                alt="Post image"
                className="w-full aspect-[4/3] object-cover rounded-lg max-h-60"
              />
            </div>
          ) : null}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="text-emerald-600 text-xs hover:text-emerald-700 cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Ad CTA */}
          {post.type === "ad" && post.adData && (
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded p-3 mb-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Được tài trợ bởi {post.adData.sponsor}</p>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white text-xs">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    {post.adData.ctaText}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Compact Engagement Stats */}
        <div className="px-3 py-1 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <span>{post.engagement.likes.toLocaleString()} lượt thích</span>
              <span>{post.engagement.views.toLocaleString()} lượt xem</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{post.engagement.comments} bình luận</span>
              <span>•</span>
              <span>{post.engagement.shares} chia sẻ</span>
            </div>
          </div>
        </div>

        {/* Compact Action Buttons */}
        <div className="px-3 py-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`flex items-center gap-1.5 text-xs ${isLiked ? 'text-red-500' : 'text-gray-600'} hover:text-red-500 px-2 py-1`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span>Thích</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-emerald-600 px-2 py-1">
                <MessageCircle className="w-4 h-4" />
                <span>Bình luận</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-blue-600 px-2 py-1">
                <Share2 className="w-4 h-4" />
                <span>Chia sẻ</span>
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              className={`text-xs ${isBookmarked ? 'text-emerald-600' : 'text-gray-600'} hover:text-emerald-600 px-2 py-1`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}