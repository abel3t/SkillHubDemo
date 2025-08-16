"use client"

import { SkillFeed } from "@/components/home/SkillFeed"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import {
  Home,
  Bell,
  MessageCircle,
  Users,
} from "lucide-react"

export default function HelpersPage() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <Card className="bg-white shadow-sm border-gray-200 rounded-none border-x-0 border-t-0">
        <CardContent className="p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-emerald-600">SkillHub</h1>
              <div className="hidden md:flex space-x-6">
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-emerald-600"
                  onClick={() => router.push('/')}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Bảng tin
                </Button>
                <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700">
                  <Users className="w-4 h-4 mr-2" />
                  Tìm chuyên gia
                </Button>
                <Button variant="ghost" className="text-gray-600 hover:text-emerald-600">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Tin nhắn
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <Button onClick={() => router.push('/profile')} variant="ghost" size="sm">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/vietnamese-user.png" alt="Profile" />
                  <AvatarFallback className="bg-emerald-100 text-emerald-700">U</AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SkillFeed 
          helpers={communityMembers}
          onHelperSelect={(helper) => {
            console.log('Selected helper:', helper)
            router.push('/profile')
          }}
        />
      </div>
    </div>
  )
}