"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ProfileHeader } from "@/components/profile/ProfileHeader"
import { SkillCard } from "@/components/profile/SkillCard"
import { PortfolioGallery } from "@/components/profile/PortfolioGallery"
import {
  Award,
  Calendar,
  Phone,
  Mail,
  Briefcase,
  GraduationCap,
  MapPin,
  MessageSquare,
  ThumbsUp,
  MessageCircle,
} from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("about")

  // Mock data - would come from API/database
  const userData = {
    name: "Nguyễn Văn Minh",
    title: "Thợ điện chuyên nghiệp",
    location: "Quận 1, TP.HCM",
    connections: 1234,
    rating: 4.9,
    reviews: 156,
    isVerified: true,
    coverImage: "/vietnamese-workshop.png",
    avatarImage: "/vietnamese-user.png",
    isOnline: true,
  }

  const skillsData = [
    {
      id: "1",
      name: "Lắp đặt hệ thống điện",
      level: 95,
      experienceYears: 8,
      endorsements: [
        {
          id: "1",
          name: "Trần Thị Lan",
          avatar: "/vietnamese-user.png",
          role: "Chủ nhà",
          message: "Anh Minh làm việc rất chuyên nghiệp, tỉ mỉ và an toàn. Hệ thống điện nhà tôi hoạt động hoàn hảo.",
          date: "2 tuần trước"
        },
        {
          id: "2",
          name: "Lê Văn Hùng",
          avatar: "/vietnamese-user.png",
          role: "Kỹ sư xây dựng",
          message: "Kinh nghiệm và kỹ năng của anh Minh rất xuất sắc. Đã hợp tác nhiều dự án thành công.",
          date: "1 tháng trước"
        }
      ],
      hourlyRate: { min: 150, max: 300 },
      projects: 89,
      rating: 4.9,
      availability: "available" as const,
      certifications: ["Chứng chỉ Thợ điện bậc cao", "An toàn lao động"],
      trending: true
    },
    {
      id: "2",
      name: "Sửa chữa thiết bị điện",
      level: 90,
      experienceYears: 6,
      endorsements: [
        {
          id: "3",
          name: "Phạm Thị Mai",
          avatar: "/vietnamese-user.png",
          role: "Chủ cửa hàng",
          message: "Sửa chữa nhanh chóng, giá cả hợp lý. Rất hài lòng với dịch vụ.",
          date: "3 ngày trước"
        }
      ],
      hourlyRate: { min: 100, max: 200 },
      projects: 67,
      rating: 4.8,
      availability: "available" as const,
      certifications: ["Chứng chỉ sửa chữa điện"]
    }
  ]

  const portfolioData = [
    {
      id: "1",
      title: "Lắp đặt hệ thống điện nhà 3 tầng",
      description: "Thiết kế và lắp đặt hoàn chỉnh hệ thống điện cho ngôi nhà 3 tầng tại Quận 7. Bao gồm hệ thống chiếu sáng, ổ cắm, hệ thống an toàn và tự động hóa thông minh.",
      images: ["/electrical-installation.png", "/placeholder-i72fx.png"],
      category: "Điện dân dụng",
      location: "Quận 7, TP.HCM",
      completedDate: "Tháng 11, 2023",
      duration: "2 tuần",
      clientName: "Gia đình Trần Văn A",
      rating: 5,
      feedback: "Công việc được thực hiện rất chuyên nghiệp, đúng tiến độ và chất lượng cao. Anh Minh tư vấn rất tận tâm.",
      tags: ["Điện dân dụng", "Tự động hóa", "An toàn điện"],
      achievements: [
        "Hoàn thành đúng tiến độ cam kết",
        "Tiết kiệm 15% chi phí so với dự toán ban đầu",
        "Hệ thống đạt chứng nhận an toàn điện"
      ]
    },
    {
      id: "2",
      title: "Sửa chữa hệ thống điện văn phòng",
      description: "Khắc phục sự cố và nâng cấp hệ thống điện cho tòa nhà văn phòng 5 tầng, đảm bảo hoạt động ổn định 24/7.",
      images: ["/placeholder-i72fx.png"],
      category: "Điện công nghiệp",
      location: "Quận 1, TP.HCM",
      completedDate: "Tháng 10, 2023",
      duration: "1 tuần",
      rating: 4.8,
      feedback: "Xử lý sự cố nhanh chóng, không ảnh hưởng đến hoạt động kinh doanh.",
      tags: ["Điện công nghiệp", "Sửa chữa khẩn cấp"]
    }
  ]


  const ContributionStats = () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="text-center border border-gray-100 hover:border-emerald-200 transition-colors">
        <CardContent className="p-4 sm:p-6">
          <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-1">156</div>
          <div className="text-xs sm:text-sm text-gray-600 font-medium">Dự án hoàn thành</div>
        </CardContent>
      </Card>
      <Card className="text-center border border-gray-100 hover:border-blue-200 transition-colors">
        <CardContent className="p-4 sm:p-6">
          <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">4.9</div>
          <div className="text-xs sm:text-sm text-gray-600 font-medium">Đánh giá trung bình</div>
        </CardContent>
      </Card>
      <Card className="text-center border border-gray-100 hover:border-amber-200 transition-colors">
        <CardContent className="p-4 sm:p-6">
          <div className="text-2xl sm:text-3xl font-bold text-amber-600 mb-1">89</div>
          <div className="text-xs sm:text-sm text-gray-600 font-medium">Lời khuyên chia sẻ</div>
        </CardContent>
      </Card>
      <Card className="text-center border border-gray-100 hover:border-purple-200 transition-colors">
        <CardContent className="p-4 sm:p-6">
          <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">1.2k</div>
          <div className="text-xs sm:text-sm text-gray-600 font-medium">Kết nối</div>
        </CardContent>
      </Card>
    </div>
  )

  const AboutSection = () => (
    <div className="space-y-6">
      <Card className="border border-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Briefcase className="w-5 h-5 text-emerald-600" />
            Giới thiệu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed text-base">
            Thợ điện chuyên nghiệp với hơn 8 năm kinh nghiệm trong lĩnh vực điện dân dụng và công nghiệp. Chuyên về lắp
            đặt hệ thống điện, sửa chữa thiết bị điện, và tư vấn an toàn điện. Cam kết mang đến dịch vụ chất lượng cao
            và an toàn tuyệt đối cho khách hàng.
          </p>
        </CardContent>
      </Card>

      <Card className="border border-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <MapPin className="w-5 h-5 text-emerald-600" />
            Thông tin liên hệ
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="text-gray-700 font-medium">0901 234 567</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="text-gray-700 font-medium break-all">minh.nguyen@email.com</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="text-gray-700 font-medium">Quận 1, Thành phố Hồ Chí Minh</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Calendar className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="text-gray-700 font-medium">Tham gia từ tháng 3, 2022</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const SkillsSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Kỹ năng chuyên môn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Lắp đặt hệ thống điện</span>
                <span className="text-sm text-muted-foreground">95%</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Sửa chữa thiết bị điện</span>
                <span className="text-sm text-muted-foreground">90%</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Tư vấn an toàn điện</span>
                <span className="text-sm text-muted-foreground">88%</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Điện công nghiệp</span>
                <span className="text-sm text-muted-foreground">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Chứng chỉ & Bằng cấp</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-primary mt-1" />
              <div>
                <h4 className="font-medium">Chứng chỉ Thợ điện bậc cao</h4>
                <p className="text-sm text-muted-foreground">Bộ Lao động - Thương binh và Xã hội • 2020</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-primary mt-1" />
              <div>
                <h4 className="font-medium">Chứng chỉ An toàn lao động</h4>
                <p className="text-sm text-muted-foreground">Sở Lao động TP.HCM • 2021</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const ContributionsSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Lời khuyên gần đây</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-medium">Cách kiểm tra an toàn hệ thống điện gia đình</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Hướng dẫn chi tiết cách kiểm tra và bảo trì hệ thống điện an toàn tại nhà...
            </p>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" />
                45 lượt thích
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                12 bình luận
              </span>
              <span>2 ngày trước</span>
            </div>
          </div>

          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-medium">Lựa chọn dây điện phù hợp cho từng mục đích</h4>
            <p className="text-sm text-muted-foreground mt-1">
              So sánh các loại dây điện và cách chọn dây phù hợp với công suất sử dụng...
            </p>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" />
                67 lượt thích
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                23 bình luận
              </span>
              <span>1 tuần trước</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dự án nổi bật</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <img
                src="/electrical-installation.png"
                alt="Dự án lắp đặt điện"
                className="w-full h-32 object-cover rounded mb-3"
              />
              <h4 className="font-medium">Lắp đặt hệ thống điện nhà 3 tầng</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Thiết kế và lắp đặt hoàn chỉnh hệ thống điện cho ngôi nhà 3 tầng tại Quận 7
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">Hoàn thành</Badge>
                <span className="text-xs text-muted-foreground">Tháng 11, 2023</span>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <img
                src="/placeholder-i72fx.png"
                alt="Dự án sửa chữa điện"
                className="w-full h-32 object-cover rounded mb-3"
              />
              <h4 className="font-medium">Sửa chữa hệ thống điện văn phòng</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Khắc phục sự cố và nâng cấp hệ thống điện cho tòa nhà văn phòng 5 tầng
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">Hoàn thành</Badge>
                <span className="text-xs text-muted-foreground">Tháng 10, 2023</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const ConnectionsSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Kết nối (1,234)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: "Trần Thị Lan",
                role: "Thợ nước chuyên nghiệp",
                location: "Quận 3, TP.HCM",
                avatar: "/vietnamese-user.png",
              },
              {
                name: "Lê Văn Hùng",
                role: "Thợ sửa chữa điện lạnh",
                location: "Quận 7, TP.HCM",
                avatar: "/vietnamese-user.png",
              },
              {
                name: "Phạm Thị Mai",
                role: "Thợ vệ sinh chuyên nghiệp",
                location: "Quận 1, TP.HCM",
                avatar: "/vietnamese-user.png",
              },
              {
                name: "Nguyễn Văn Đức",
                role: "Thợ xây dựng",
                location: "Quận 5, TP.HCM",
                avatar: "/vietnamese-user.png",
              },
            ].map((connection, index) => (
              <div key={`connection-${index}`} className="flex items-center gap-3 p-4 border border-gray-100 rounded-lg hover:border-emerald-200 transition-colors">
                <Avatar className="w-12 h-12 border-2 border-emerald-100">
                  <AvatarImage src={connection.avatar || "/placeholder.svg"} alt={connection.name} />
                  <AvatarFallback className="bg-emerald-50 text-emerald-700 font-medium">
                    {connection.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-gray-900 truncate">{connection.name}</h4>
                  <p className="text-xs text-gray-600 truncate mb-1">{connection.role}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{connection.location}</span>
                  </p>
                </div>
                <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-600 hover:bg-emerald-50">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <ProfileHeader user={userData} isOwnProfile={true} />
        </div>
        <ContributionStats />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200 rounded-lg p-1 mb-6">
            <TabsTrigger 
              value="about" 
              className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 data-[state=active]:border-emerald-200 text-sm font-medium"
            >
              <span className="hidden sm:inline">Giới thiệu</span>
              <span className="sm:hidden">GT</span>
            </TabsTrigger>
            <TabsTrigger 
              value="skills" 
              className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 data-[state=active]:border-emerald-200 text-sm font-medium"
            >
              <span className="hidden sm:inline">Kỹ năng</span>
              <span className="sm:hidden">KN</span>
            </TabsTrigger>
            <TabsTrigger 
              value="contributions" 
              className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 data-[state=active]:border-emerald-200 text-sm font-medium"
            >
              <span className="hidden sm:inline">Đóng góp</span>
              <span className="sm:hidden">ĐG</span>
            </TabsTrigger>
            <TabsTrigger 
              value="connections" 
              className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 data-[state=active]:border-emerald-200 text-sm font-medium"
            >
              <span className="hidden sm:inline">Kết nối</span>
              <span className="sm:hidden">KN</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-0">
            <AboutSection />
          </TabsContent>

          <TabsContent value="skills" className="mt-0">
            <div className="space-y-6">
              {skillsData.map((skill) => (
                <SkillCard 
                  key={skill.id} 
                  skill={skill} 
                  isOwnProfile={true} 
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contributions" className="mt-0">
            <div className="space-y-6">
              <PortfolioGallery items={portfolioData} isOwnProfile={true} />
              <ContributionsSection />
            </div>
          </TabsContent>

          <TabsContent value="connections" className="mt-0">
            <ConnectionsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
