"use client"

import { useState, useEffect, useCallback } from "react"
import { FeedPost } from "./FeedPost"
import { PostComposer } from "./PostComposer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Zap,
  Users,
  MapPin,
  Star,
  RefreshCw,
  Filter,
  Heart,
  MessageSquare,
  Award,
  ExternalLink,
} from "lucide-react"

interface InfiniteScrollFeedProps {
  helpers: any[]
  onHelperSelect?: (helper: any) => void
}

export function InfiniteScrollFeed({ helpers, onHelperSelect }: InfiniteScrollFeedProps) {
  const [feedItems, setFeedItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [userInteractions, setUserInteractions] = useState({
    likedTags: ["piano", "tiếngAnh", "điện", "nấuăn"],
    viewedProfiles: ["music", "language", "electrical"],
    searchHistory: ["piano", "english teacher", "electrician"],
    timeSpentOnCategories: { music: 180, language: 240, electrical: 120 },
    preferredContentTypes: ["tip", "video_tip", "success_story"]
  })

  // Advanced ad placement algorithm for maximum engagement
  const generateFeedItems = (pageNum: number) => {
    const contentVariations = [
      {
        id: `post-${pageNum}-1`,
        type: "tip",
        author: {
          name: "Lê Thị Hương",
          avatar: "/vietnamese-user.png",
          title: "Giáo viên Piano",
          verified: true,
          location: "Quận 3, TP.HCM",
          rating: 4.9
        },
        content: {
          text: "🎹 Mẹo nhỏ cho người mới học piano:\n\n✨ Luôn khởi động bằng các bài tập ngón tay\n✨ Luyện tập 30 phút/ngày hiệu quả hơn 3 tiếng cuối tuần\n✨ Chú ý tư thế ngồi và cách đặt tay\n✨ Nghe nhạc cổ điển để cảm nhận nhịp điệu\n\nCác bạn có muốn mình chia sẻ thêm bài tập cụ thể không? 🎵",
          images: ["https://picsum.photos/id/1/400/300"],
        },
        engagement: {
          likes: 234,
          comments: 45,
          shares: 12,
          views: 1890,
          bookmarks: 67
        },
        timeAgo: "2 giờ trước",
        tags: ["piano", "âmnhạc", "mẹohay"]
      },
      {
        id: `story-${pageNum}-2`,
        type: "success_story",
        author: {
          name: "Mai Thị Lan",
          avatar: "/vietnamese-cleaning-lady.png",
          title: "Học viên tiếng Anh",
          verified: false,
          location: "Quận 2, TP.HCM"
        },
        content: {
          text: "🎉 Vừa đạt 7.5 IELTS sau 3 tháng học với cô Mai qua SkillHub!\n\nBan đầu mình chỉ có 5.0, nhưng nhờ:\n📚 Phương pháp học tập cá nhân hóa\n💬 Luyện speaking hàng ngày qua video call\n📝 Feedback chi tiết từng bài tập\n🎯 Mock test định kỳ\n\nCảm ơn cô Mai và SkillHub! Giờ mình tự tin apply du học rồi 🇬🇧",
          images: ["https://picsum.photos/id/2/400/300"]
        },
        engagement: {
          likes: 567,
          comments: 123,
          shares: 89,
          views: 3456,
          bookmarks: 234
        },
        timeAgo: "1 giờ trước",
        tags: ["IELTS", "tiếngAnh", "thànhcông", "duhọc"]
      },
      {
        id: `video-${pageNum}-3`,
        type: "video_tip",
        author: {
          name: "Chef Hoàng Nam",
          avatar: "/vietnamese-handyman.png",
          title: "Đầu bếp chuyên nghiệp",
          verified: true,
          location: "Quận 5, TP.HCM",
          rating: 4.9
        },
        content: {
          text: "👨‍🍳 Bí quyết làm phở bò ngon như hàng quán:\n\n🥩 Chọn xương ống + xương sườn tỷ lệ 1:1\n🧅 Nướng hành tây, gừng trước khi nấu\n🌟 Gia vị: hồi, quế, thảo quả, đinh hương\n⏰ Niệu xương tối thiểu 8 tiếng\n\n🔥 Video chi tiết 15 phút sẽ giúp bạn thành công 100%!\n\nTag bạn bè để cùng học nấu nhé! 👇",
          video: "/pho-cooking.mp4",
          images: ["https://picsum.photos/id/3/400/300"]
        },
        engagement: {
          likes: 1234,
          comments: 234,
          shares: 156,
          views: 12345,
          bookmarks: 567
        },
        timeAgo: "3 giờ trước",
        tags: ["nấuăn", "phở", "video", "bíquyết"]
      },
      {
        id: `tip-${pageNum}-4`,
        type: "tip",
        author: {
          name: "Kỹ sư Minh Tuấn",
          avatar: "/vietnamese-technician.png",
          title: "Kỹ sư điện tử",
          verified: true,
          location: "Quận 7, TP.HCM",
          rating: 4.8
        },
        content: {
          text: "⚡ Cách tiết kiệm 30% tiền điện mỗi tháng:\n\n❄️ Điều hòa: 26°C là nhiệt độ tối ưu\n💡 Thay bóng LED - tiết kiệm 80% điện năng\n🔌 Rút phích cắm thiết bị không dùng\n🌙 Sử dụng điện vào khung giờ thấp điểm\n📱 Dùng app theo dõi lượng điện tiêu thụ\n\n💰 Nhà mình đã giảm từ 2tr xuống 1tr4/tháng!\n\nCó ai muốn mình tư vấn cụ thể không? 💬",
          images: ["https://picsum.photos/id/4/400/300"]
        },
        engagement: {
          likes: 789,
          comments: 156,
          shares: 234,
          views: 5678,
          bookmarks: 345
        },
        timeAgo: "5 giờ trước",
        tags: ["điện", "tiếtkiệm", "mẹohay", "tiềndiện"]
      }
    ]

    // Strategic ad placement algorithm
    const adPlacements = [
      {
        id: `ad-skillhub-${pageNum}`,
        type: "ad",
        author: {
          name: "SkillHub Premium",
          avatar: "/logo.png",
          title: "Nâng cấp trải nghiệm",
          verified: true
        },
        content: {
          text: "🌟 Nâng cấp lên SkillHub Premium:\n\n⭐ Ưu tiên hiển thị trong kết quả tìm kiếm\n💎 Badge VIP nổi bật\n📈 Thống kê chi tiết khách hàng\n🎯 Quảng cáo được đề xuất\n💬 Chat không giới hạn\n\n🎁 Tặng 30 ngày đầu miễn phí!\n💳 Chỉ 99k/tháng - Đăng ký ngay!",
          images: ["https://picsum.photos/id/5/400/300"]
        },
        engagement: {
          likes: 234,
          comments: 45,
          shares: 23,
          views: 2890,
          bookmarks: 67
        },
        timeAgo: "Được tài trợ",
        adData: {
          sponsor: "SkillHub Premium",
          ctaText: "Nâng cấp ngay",
          ctaLink: "/premium"
        }
      },
      {
        id: `ad-partner-${pageNum}`,
        type: "ad",
        author: {
          name: "Shopee Việt Nam",
          avatar: "/shopee-logo.png",
          title: "Siêu thị trực tuyến",
          verified: true
        },
        content: {
          text: "🛍️ Mua dụng cụ học nghề giá tốt nhất!\n\n🎹 Đàn piano điện giảm 50%\n🔧 Bộ dụng cụ sửa chữa chất lượng\n📚 Sách học tiếng Anh bestseller\n🍳 Dụng cụ nhà bếp cao cấp\n\n🔥 Flash Sale 12.12 - Freeship 0đ\n💰 Hoàn 100k cho đơn đầu tiên!",
          images: ["https://picsum.photos/id/6/400/300"]
        },
        engagement: {
          likes: 456,
          comments: 78,
          shares: 34,
          views: 4567,
          bookmarks: 123
        },
        timeAgo: "Được tài trợ",
        adData: {
          sponsor: "Shopee",
          ctaText: "Mua ngay",
          ctaLink: "https://shopee.vn"
        }
      }
    ]

    const items = []
    
    // Mix content strategically for maximum engagement
    const shuffledContent = [...contentVariations].sort(() => Math.random() - 0.5)
    const selectedAd = adPlacements[pageNum % adPlacements.length]
    
    // Add varied content
    shuffledContent.forEach((post, index) => {
      items.push({ type: "post", data: post })
      
      // Strategic ad placement: after engaging content
      if (index === 1) {
        items.push({ type: "post", data: selectedAd })
      }
    })
    
    // Keep feed focused on social content only - no helper injection
    
    // Add trending section periodically to maintain engagement
    if (pageNum === 0 || pageNum % 5 === 0) {
      items.splice(Math.floor(items.length / 2), 0, { type: "trending", data: null })
    }

    // Add "scroll hook" - highly engaging content near the end
    if (pageNum > 0) {
      const hookContent = {
        id: `hook-${pageNum}`,
        type: "video_tip",
        author: {
          name: "SkillHub TV",
          avatar: "/skillhub-tv.png",
          title: "Kênh học tập",
          verified: true
        },
        content: {
          text: "🔥 TOP 5 kỹ năng kiếm tiền online 2024:\n\n1️⃣ Thiết kế Canva - 500k/thiết kế\n2️⃣ Dạy tiếng Anh online - 200k/buổi\n3️⃣ Sửa chữa điện tử - 300k/lần\n4️⃣ Content Creator - 1-5tr/tháng\n5️⃣ Gia sư toán - 150k/giờ\n\n💡 Video 10 phút hướng dẫn chi tiết!\n\n👆 Swipe up để xem full series!",
          video: "/top-skills-2024.mp4",
          images: ["https://picsum.photos/id/7/400/300"]
        },
        engagement: {
          likes: 2345,
          comments: 456,
          shares: 234,
          views: 23456,
          bookmarks: 789
        },
        timeAgo: "Trending",
        tags: ["skills2024", "kiếmtiền", "online", "trending"]
      }
      items.push({ type: "post", data: hookContent })
    }

    return items
  }

  const loadMoreItems = useCallback(() => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    
    // Simulate API delay
    setTimeout(() => {
      const newItems = generateFeedItems(page)
      
      if (newItems.length === 0) {
        setHasMore(false)
      } else {
        setFeedItems(prev => [...prev, ...newItems])
        setPage(prev => prev + 1)
      }
      
      setIsLoading(false)
    }, 1000)
  }, [page, isLoading, hasMore, helpers])

  // Initial load
  useEffect(() => {
    loadMoreItems()
  }, []) // Only run once on mount

  // Infinite scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMoreItems()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMoreItems])

  const quickStats = [
    { label: "Chuyên gia", value: "2.3k", icon: Users, color: "text-emerald-600" },
    { label: "Bài đăng", value: "15k", icon: Heart, color: "text-red-500" },
    { label: "Thành công", value: "8.9k", icon: Award, color: "text-yellow-600" },
    { label: "Đang online", value: "456", icon: Zap, color: "text-green-500" }
  ]

  const trendingTopics = [
    { name: "#điện", posts: "234 bài" },
    { name: "#piano", posts: "189 bài" },
    { name: "#nấuăn", posts: "156 bài" },
    { name: "#tiếngAnh", posts: "145 bài" },
    { name: "#sửachữa", posts: "134 bài" }
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Post Composer */}
      <PostComposer />
      
      {/* Swipe hint for mobile users */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-100 rounded-lg p-3 mx-auto md:hidden">
        <p className="text-sm text-gray-700">
          💡 <strong>Mẹo:</strong> Vuốt phải để thích ❤️, vuốt trái để lưu 🔖, nhấn đúp để yêu thích 💖
        </p>
      </div>

      {/* Main Feed */}
      <div className="space-y-4">
        {feedItems.map((item, index) => {
          if (item.type === "post") {
            return <FeedPost key={item.data.id} post={item.data} />
          } 
          
          
          if (item.type === "trending") {
            return (
              <Card key={`trending-${index}`} className="border border-gray-100">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-sm text-gray-900 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-orange-600" />
                      Trending hôm nay
                    </h3>
                    <Button variant="ghost" size="sm" className="text-emerald-600 text-xs h-6">
                      Xem tất cả
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {trendingTopics.slice(0, 6).map((topic, i) => (
                      <div key={i} className="flex flex-col items-center p-2 bg-gray-50 rounded hover:bg-emerald-50 cursor-pointer transition-colors">
                        <span className="font-medium text-xs text-emerald-600">{topic.name}</span>
                        <span className="text-xs text-gray-500">{topic.posts}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          }

          return null
        })}

        {/* Loading indicator */}
        {isLoading && (
          <Card className="border border-gray-100">
            <CardContent className="p-6 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600 mx-auto mb-3"></div>
              <p className="text-gray-600 text-sm">Đang tải thêm...</p>
            </CardContent>
          </Card>
        )}

        {/* End of feed */}
        {!hasMore && (
          <Card className="border border-gray-100">
            <CardContent className="p-6 text-center">
              <div className="text-gray-400 mb-3">
                <Heart className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Bạn đã xem hết rồi!
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Quay lại sau để xem thêm nội dung mới
              </p>
              <Button size="sm" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Về đầu trang
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}