"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Home,
  Bell,
  MessageCircle,
  Search,
  Share2,
  MapPin,
  Star,
  TrendingUp,
  Camera,
  ThumbsUp,
  Eye,
  MoreHorizontal,
  Calendar,
  Heart,
  Users,
  HandHeart,
} from "lucide-react"

export default function SkillHubApp() {
  const [activeView, setActiveView] = useState("home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [postContent, setPostContent] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const router = useRouter()

  const communityMembers = [
    {
      id: 1,
      name: "Nguyễn Văn Minh",
      title: "Có thể giúp về điện",
      location: "Quận 1, TP.HCM",
      distance: "0.8km",
      rating: 4.9,
      helpedPeople: 127,
      contributions: 23,
      avatar: "/vietnamese-technician.png",
      verified: true,
      isOnline: true,
      responseTime: "2 phút",
      neighborEndorsements: 8,
      lastActive: "Vừa xong",
      availableToHelp: true,
      connectionStatus: "not_connected",
      canHelp: ["Điện dân dụng", "Sửa chữa thiết bị", "Tư vấn an toàn điện"],
      recentShare: "Chia sẻ cách kiểm tra an toàn hệ thống điện trong mùa mưa",
      mutualConnections: ["Trần Văn A", "Nguyễn Thị B"],
      helpedThisMonth: 12,
      personality: "Nhiệt tình, kiên nhẫn",
    },
    {
      id: 2,
      name: "Lê Thị Hương",
      title: "Dạy Piano & chia sẻ âm nhạc",
      location: "Quận 3, TP.HCM",
      distance: "1.1km",
      rating: 4.9,
      helpedPeople: 89,
      contributions: 45,
      avatar: "/vietnamese-user.png",
      verified: true,
      isOnline: true,
      responseTime: "5 phút",
      neighborEndorsements: 15,
      lastActive: "Đang hoạt động",
      availableToHelp: true,
      connectionStatus: "not_connected",
      canHelp: ["Piano cơ bản", "Lý thuyết âm nhạc", "Hướng dẫn mua đàn", "Tư vấn học nhạc"],
      recentShare: "Chia sẻ cách luyện ngón tay linh hoạt cho người mới bắt đầu",
      mutualConnections: ["Trần Văn C", "Nguyễn Thị D"],
      helpedThisMonth: 8,
      personality: "Tận tâm, dễ gần",
    },
    {
      id: 3,
      name: "Phạm Hoàng Nam",
      title: "Yêu thích cầu lông & thể thao",
      location: "Quận 7, TP.HCM",
      distance: "1.5km",
      rating: 4.8,
      helpedPeople: 156,
      contributions: 32,
      avatar: "/vietnamese-handyman.png",
      verified: true,
      isOnline: false,
      responseTime: "10 phút",
      neighborEndorsements: 12,
      lastActive: "1 giờ trước",
      availableToHelp: false,
      connectionStatus: "connected",
      canHelp: ["Cầu lông cơ bản", "Kỹ thuật nâng cao", "Tìm bạn tập", "Tư vấn dụng cụ"],
      recentShare: "Chia sẻ bí quyết cải thiện tốc độ di chuyển trên sân",
      mutualConnections: ["Lê Văn E"],
      helpedThisMonth: 15,
      personality: "Năng động, vui vẻ",
    },
    {
      id: 4,
      name: "Trần Thị Mai",
      title: "Giúp học tiếng Anh",
      location: "Quận 1, TP.HCM",
      distance: "0.9km",
      rating: 4.9,
      helpedPeople: 203,
      contributions: 67,
      avatar: "/vietnamese-cleaning-lady.png",
      verified: true,
      isOnline: true,
      responseTime: "3 phút",
      neighborEndorsements: 20,
      lastActive: "Đang hoạt động",
      availableToHelp: true,
      connectionStatus: "not_connected",
      canHelp: ["Giao tiếp tiếng Anh", "Luyện phát âm", "Tư vấn học IELTS", "Chia sẻ tài liệu"],
      recentShare: "Chia sẻ cách học từ vựng hiệu quả trong 30 ngày",
      mutualConnections: ["Nguyễn Văn F", "Lê Thị G"],
      helpedThisMonth: 25,
      personality: "Kiên nhẫn, chu đáo",
    },
    {
      id: 5,
      name: "Nguyễn Thành Đạt",
      title: "Đam mê nấu ăn & chia sẻ công thức",
      location: "Quận 5, TP.HCM",
      distance: "2.3km",
      rating: 4.7,
      helpedPeople: 134,
      contributions: 28,
      avatar: "/vietnamese-technician.png",
      verified: true,
      isOnline: false,
      responseTime: "15 phút",
      neighborEndorsements: 7,
      lastActive: "2 giờ trước",
      availableToHelp: false,
      connectionStatus: "pending_received",
      canHelp: ["Món Việt truyền thống", "Bánh ngọt", "Trang trí món ăn", "Mua nguyên liệu"],
      recentShare: "Chia sẻ bí quyết làm phở bò ngon như hàng quán",
      mutualConnections: ["Trần Văn H"],
      helpedThisMonth: 6,
      personality: "Sáng tạo, hào phóng",
    },
    {
      id: 6,
      name: "Võ Minh Tuấn",
      title: "Giúp học toán & giải bài tập",
      location: "Quận 10, TP.HCM",
      distance: "2.8km",
      rating: 4.8,
      helpedPeople: 98,
      contributions: 41,
      avatar: "/vietnamese-handyman.png",
      verified: true,
      isOnline: true,
      responseTime: "7 phút",
      neighborEndorsements: 9,
      lastActive: "Đang hoạt động",
      availableToHelp: true,
      connectionStatus: "not_connected",
      canHelp: ["Toán THCS", "Toán THPT", "Giải bài tập", "Hướng dẫn học"],
      recentShare: "Chia sẻ phương pháp học toán hiệu quả cho học sinh yếu",
      mutualConnections: ["Nguyễn Thị I"],
      helpedThisMonth: 18,
      personality: "Tỉ mỉ, nhiệt tình",
    },
  ]

  const communityFeed = [
    {
      id: 1,
      author: "Lê Thị Hương",
      title: "Yêu thích chia sẻ âm nhạc",
      avatar: "/vietnamese-user.png",
      time: "1 giờ trước",
      location: "Quận 3, TP.HCM",
      distance: "1.1km",
      verified: true,
      type: "sharing",
      content:
        "🎹 Mình muốn chia sẻ kinh nghiệm học piano cho những bạn mới bắt đầu:\n\n✨ Luyện tập 30 phút mỗi ngày sẽ hiệu quả hơn 3 tiếng cuối tuần\n✨ Bắt đầu với các bài đơn giản, đừng vội vàng\n✨ Chú ý tư thế ngồi và cách đặt tay\n✨ Luyện âm giai trước khi chơi bài hát\n\nNếu bạn nào cần hỗ trợ, cứ nhắn tin cho mình nhé! Mình rất vui được giúp đỡ 🎵",
      image: "/hair-care-tips.png",
      likes: 156,
      comments: 34,
      shares: 18,
      views: 892,
      engagement: "high",
    },
    {
      id: 2,
      author: "Phạm Hoàng Nam",
      title: "Đam mê cầu lông",
      avatar: "/vietnamese-handyman.png",
      time: "3 giờ trước",
      location: "Quận 7, TP.HCM",
      distance: "1.5km",
      verified: true,
      type: "community",
      content:
        "🏸 Mình đang tìm bạn cùng đam mê cầu lông để tập luyện buổi sáng:\n\n🌅 Thời gian: 6h-8h sáng tại sân Rạch Miễu\n👥 Nhóm 4-6 người, trình độ trung bình\n💪 Mình sẽ chia sẻ kỹ thuật và kinh nghiệm\n💰 Chi phí chỉ 50k/người/buổi\n\nAi muốn tham gia cùng thì inbox mình nhé! Tập luyện cùng nhau vui hơn và tiến bộ nhanh hơn nhiều 😊",
      likes: 67,
      comments: 23,
      shares: 12,
      views: 445,
      engagement: "medium",
    },
    {
      id: 3,
      author: "Trần Thị Mai",
      title: "Giúp học tiếng Anh",
      avatar: "/vietnamese-cleaning-lady.png",
      time: "5 giờ trước",
      location: "Quận 1, TP.HCM",
      distance: "0.9km",
      verified: true,
      type: "help_request",
      content:
        "🤝 Mình cần lời khuyên từ cộng đồng về việc dạy tiếng Anh cho trẻ tự kỷ:\n\nMình đang giúp một bé 8 tuổi rất thông minh nhưng khó tập trung. Đã thử:\n✅ Flashcard màu sắc\n✅ Học qua trò chơi\n❌ Vẫn chưa tìm được cách phù hợp\n\nCác bạn có kinh nghiệm gì không? Mình rất mong được học hỏi từ mọi người! 🙏",
      likes: 89,
      comments: 45,
      shares: 8,
      views: 623,
      engagement: "high",
    },
  ]

  const trendingTopics = [
    { tag: "#GiúpNhauHọcPiano", posts: 234 },
    { tag: "#ChiaSẻTiếngAnh", posts: 189 },
    { tag: "#CộngĐồngCầuLông", posts: 156 },
    { tag: "#NấuĂnCùngNhau", posts: 143 },
    { tag: "#HỗTrợHọcToán", posts: 98 },
    { tag: "#SửaChữaCùngNhau", posts: 87 },
    { tag: "#YogaCộngĐồng", posts: 76 },
  ]

  const LinkedInStyleHeader = () => (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-sm">S</span>
              </div>
              <span className="font-heading font-bold text-primary hidden sm:block">SkillHub</span>
            </div>

            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm người có thể giúp bạn học piano, tiếng Anh, sửa chữa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted border-0 focus:bg-card text-base"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant={activeView === "home" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView("home")}
              className="flex flex-col items-center gap-1 h-12 px-3"
            >
              <Home className="h-4 w-4" />
              <span className="text-xs hidden sm:block">Cộng đồng</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 h-12 px-3"
              onClick={() => router.push("/messages")}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs hidden sm:block">Tin nhắn</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-12 px-3">
              <Bell className="h-4 w-4" />
              <span className="text-xs hidden sm:block">Thông báo</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 h-12 px-3"
              onClick={() => router.push("/profile")}
            >
              <Avatar className="h-6 w-6">
                <AvatarImage src="/vietnamese-user.png" />
                <AvatarFallback>TN</AvatarFallback>
              </Avatar>
              <span className="text-xs hidden sm:block">Tôi</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )

  const CommunityPostComposer = () => (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/vietnamese-user.png" />
            <AvatarFallback>TN</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Bạn cần giúp đỡ gì? Hoặc muốn chia sẻ kinh nghiệm với cộng đồng?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="min-h-[60px] border-0 bg-muted resize-none focus:bg-card text-base"
            />
            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Camera className="h-4 w-4 mr-2" />
                  Thêm ảnh
                </Button>
              </div>
              <Button size="sm" disabled={!postContent.trim()}>
                Chia sẻ
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const helpCategories = [
    { id: "dien", name: "Điện", icon: "⚡", urgent: true },
    { id: "nuoc", name: "Nước", icon: "🚰", urgent: true },
    { id: "piano", name: "Piano", icon: "🎹", urgent: false },
    { id: "badminton", name: "Cầu lông", icon: "🏸", urgent: false },
    { id: "tiengAnh", name: "Tiếng Anh", icon: "🇺🇸", urgent: false },
    { id: "nauAn", name: "Nấu ăn", icon: "👨‍🍳", urgent: false },
    { id: "yoga", name: "Yoga", icon: "🧘‍♀️", urgent: false },
    { id: "suaChua", name: "Sửa chữa", icon: "🔧", urgent: false },
    { id: "toan", name: "Toán học", icon: "📐", urgent: false },
    { id: "guitar", name: "Guitar", icon: "🎸", urgent: false },
    { id: "nhiepAnh", name: "Nhiếp ảnh", icon: "📸", urgent: false },
    { id: "massage", name: "Massage", icon: "💆‍♂️", urgent: false },
  ]

  const CommunityDiscovery = () => (
    <Card className="mb-4">
      <CardContent className="p-3">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🤝</span>
          <h3 className="font-heading font-bold text-base">Tôi cần ai đó giúp</h3>
          <Badge variant="secondary" className="text-xs">
            Cộng đồng hỗ trợ
          </Badge>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {helpCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex flex-col items-center gap-1 h-16 relative"
            >
              {category.urgent && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              )}
              <span className="text-lg">{category.icon}</span>
              <span className="text-xs font-medium">{category.name}</span>
            </Button>
          ))}
        </div>

        {selectedCategory && (
          <div className="mt-3 p-2 bg-primary/10 rounded-lg">
            <p className="text-xs text-primary font-medium">
              ✨ Có{" "}
              {
                communityMembers.filter(
                  (member) =>
                    member.isOnline ||
                    member.canHelp.some((skill) => skill.toLowerCase().includes(selectedCategory.toLowerCase())),
                ).length
              }{" "}
              người trong cộng đồng có thể giúp bạn
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )

  const CommunityMembersSection = () => (
    <Card className="mb-6">
      <CardHeader className="pb-1">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-heading text-base">Cộng đồng gần bạn</CardTitle>
            <CardDescription className="text-xs">Những người sẵn sàng giúp đỡ • Chia sẻ kinh nghiệm</CardDescription>
          </div>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-32 h-7 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả khu vực</SelectItem>
              <SelectItem value="1km">Trong 1km</SelectItem>
              <SelectItem value="3km">Trong 3km</SelectItem>
              <SelectItem value="5km">Trong 5km</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
          {communityMembers
            .filter(
              (member) =>
                searchQuery === "" ||
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.canHelp.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
            )
            .sort((a, b) => {
              if (a.isOnline && !b.isOnline) return -1
              if (!a.isOnline && b.isOnline) return 1
              return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
            })
            .map((member) => (
              <div
                key={member.id}
                className="flex items-start gap-2 p-2 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer relative"
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white ${member.isOnline ? "bg-green-500" : "bg-gray-400"}`}
                  />
                  {member.availableToHelp && (
                    <div className="absolute -top-1 -left-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <Heart className="h-2 w-2 text-white fill-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1">
                        <h4 className="font-semibold text-sm">{member.name}</h4>
                        {member.verified && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs px-1 py-0">
                            ✓ Tin cậy
                          </Badge>
                        )}
                        {member.availableToHelp && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs px-1 py-0">
                            💙 Sẵn sàng giúp
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground font-medium">{member.title}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{member.location}</span>
                        <span className="text-xs text-primary font-bold">• {member.distance}</span>
                        <span className="text-xs text-green-600">• Phản hồi {member.responseTime}</span>
                      </div>

                      {member.mutualConnections.length > 0 && (
                        <p className="text-xs text-blue-600 mt-0.5">👥 {member.mutualConnections.length} bạn chung</p>
                      )}

                      {member.neighborEndorsements > 0 && (
                        <p className="text-xs text-purple-600">🏠 {member.neighborEndorsements} hàng xóm tin tưởng</p>
                      )}

                      <p className="text-xs text-orange-600">✨ {member.personality}</p>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold">{member.rating}</span>
                        <span className="text-xs text-muted-foreground">({member.helpedPeople})</span>
                      </div>
                      <p className="text-xs text-green-600 font-medium">{member.helpedThisMonth} người/tháng</p>
                      <p className="text-xs text-muted-foreground">{member.lastActive}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-0.5 mt-1">
                    {member.canHelp.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs px-1 py-0 h-4">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground mt-1 italic bg-muted/50 p-1 rounded">
                    💡 "{member.recentShare}"
                  </p>

                  <div className="flex gap-1 mt-2">
                    <Button size="sm" className="flex-1 text-xs h-7 bg-green-600 hover:bg-green-700">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Nhắn tin
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs h-7 bg-blue-50 hover:bg-blue-100 text-blue-700"
                    >
                      <HandHeart className="h-3 w-3 mr-1" />
                      Kết nối
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )

  const CommunityFeedSection = () => (
    <div className="space-y-2">
      {communityFeed.map((post) => (
        <Card key={post.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-2">
            <div className="flex items-start gap-2 mb-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xs">
                  {post.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <h4 className="font-semibold text-xs">{post.author}</h4>
                  {post.verified && (
                    <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
                      ✓
                    </Badge>
                  )}
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      post.type === "sharing"
                        ? "bg-green-50 text-green-600"
                        : post.type === "community"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-orange-50 text-orange-600"
                    }`}
                  >
                    {post.type === "sharing" ? "Chia sẻ" : post.type === "community" ? "Cộng đồng" : "Cần giúp"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{post.title}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span>{post.time}</span>
                  <span>•</span>
                  <MapPin className="h-3 w-3" />
                  <span>{post.location}</span>
                  <span className="text-primary font-medium">• {post.distance}</span>
                </div>
              </div>

              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="mb-1">
              <p className="text-xs leading-tight whitespace-pre-line">{post.content}</p>
              {post.image && (
                <img
                  src={post.image || "/placeholder.svg"}
                  alt="Post content"
                  className="w-full rounded-lg mt-1 max-h-32 object-cover"
                />
              )}
            </div>

            <div className="flex items-center justify-between border-t border-b border-border text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <span>{post.likes} thích</span>
                <span>{post.comments} bình luận</span>
                <span>{post.shares} chia sẻ</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{post.views}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 gap-1 text-xs text-muted-foreground hover:text-primary h-6"
              >
                <ThumbsUp className="h-3 w-3" />
                Thích
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 gap-1 text-xs text-muted-foreground hover:text-primary h-6"
              >
                <MessageCircle className="h-3 w-3" />
                Bình luận
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 gap-1 text-xs text-muted-foreground hover:text-primary h-6"
              >
                <Share2 className="h-3 w-3" />
                Chia sẻ
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const CommunitySidebar = () => (
    <div className="hidden lg:block lg:w-80 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg">Cộng đồng quan tâm</CardTitle>
          <CardDescription>Chủ đề được chia sẻ nhiều nhất</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <div
                key={index}
                className="flex items-center justify-between hover:bg-muted/50 p-2 rounded cursor-pointer"
              >
                <div>
                  <p className="font-medium text-sm">{topic.tag}</p>
                  <p className="text-xs text-muted-foreground">{topic.posts} bài chia sẻ</p>
                </div>
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg">Xây dựng cộng đồng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
              <Users className="h-5 w-5 text-primary mt-1" />
              <div>
                <h4 className="font-medium text-sm">Nhóm học tập</h4>
                <p className="text-xs text-muted-foreground">Tham gia nhóm cùng sở thích</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
              <Calendar className="h-5 w-5 text-secondary mt-1" />
              <div>
                <h4 className="font-medium text-sm">Sự kiện cộng đồng</h4>
                <p className="text-xs text-muted-foreground">Gặp gỡ và học hỏi</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
              <HandHeart className="h-5 w-5 text-accent mt-1" />
              <div>
                <h4 className="font-medium text-sm">Giúp đỡ lẫn nhau</h4>
                <p className="text-xs text-muted-foreground">Chia sẻ kỹ năng và kinh nghiệm</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-background font-body">
      <LinkedInStyleHeader />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <main className="flex-1 max-w-4xl">
            <CommunityPostComposer />
            <CommunityDiscovery />
            <CommunityMembersSection />
            <CommunityFeedSection />
          </main>

          <CommunitySidebar />
        </div>
      </div>
    </div>
  )
}
