"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Star,
  Users,
  Award,
  Calendar,
  Phone,
  Mail,
  Camera,
  MessageCircle,
  UserPlus,
  Share2,
  MoreHorizontal,
  Briefcase,
  GraduationCap,
  ThumbsUp,
  MessageSquare,
} from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("about")

  const ProfileHeader = () => (
    <div className="relative">
      {/* Cover Photo */}
      <div className="h-80 bg-gradient-to-r from-primary to-secondary rounded-lg relative overflow-hidden">
        <img src="/vietnamese-workshop.png" alt="Cover" className="w-full h-full object-cover" />
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-4 right-4 bg-black/20 hover:bg-black/30 text-white border-0"
        >
          <Camera className="w-4 h-4 mr-2" />
          Chỉnh sửa ảnh bìa
        </Button>
      </div>

      {/* Profile Info */}
      <div className="relative px-6 pb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-20 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            {/* Profile Picture */}
            <div className="relative">
              <Avatar className="w-40 h-40 border-4 border-background shadow-lg">
                <AvatarImage src="/vietnamese-user.png" alt="Nguyễn Văn Minh" />
                <AvatarFallback className="text-2xl font-semibold">NM</AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute bottom-2 right-2 rounded-full w-8 h-8 p-0 bg-muted hover:bg-muted/80"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            {/* User Info */}
            <div className="flex-1 md:mb-4">
              <h1 className="text-3xl font-bold text-foreground">Nguyễn Văn Minh</h1>
              <p className="text-lg text-muted-foreground">Thợ điện chuyên nghiệp</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Quận 1, TP.HCM
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  1,234 kết nối
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  4.9 (156 đánh giá)
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <MessageCircle className="w-4 h-4 mr-2" />
              Nhắn tin
            </Button>
            <Button size="sm">
              <UserPlus className="w-4 h-4 mr-2" />
              Kết nối
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const ContributionStats = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="text-center">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-primary">156</div>
          <div className="text-sm text-muted-foreground">Dự án hoàn thành</div>
        </CardContent>
      </Card>
      <Card className="text-center">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-primary">4.9</div>
          <div className="text-sm text-muted-foreground">Đánh giá trung bình</div>
        </CardContent>
      </Card>
      <Card className="text-center">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-primary">89</div>
          <div className="text-sm text-muted-foreground">Lời khuyên chia sẻ</div>
        </CardContent>
      </Card>
      <Card className="text-center">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-primary">1.2k</div>
          <div className="text-sm text-muted-foreground">Kết nối</div>
        </CardContent>
      </Card>
    </div>
  )

  const AboutSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Giới thiệu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            Thợ điện chuyên nghiệp với hơn 8 năm kinh nghiệm trong lĩnh vực điện dân dụng và công nghiệp. Chuyên về lắp
            đặt hệ thống điện, sửa chữa thiết bị điện, và tư vấn an toàn điện. Cam kết mang đến dịch vụ chất lượng cao
            và an toàn tuyệt đối cho khách hàng.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Thông tin liên hệ
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span>0901 234 567</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>minh.nguyen@email.com</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>Quận 1, Thành phố Hồ Chí Minh</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>Tham gia từ tháng 3, 2022</span>
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
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={connection.avatar || "/placeholder.svg"} alt={connection.name} />
                  <AvatarFallback>
                    {connection.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{connection.name}</h4>
                  <p className="text-xs text-muted-foreground">{connection.role}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {connection.location}
                  </p>
                </div>
                <Button variant="outline" size="sm">
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
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4">
        <ProfileHeader />
        <ContributionStats />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">Giới thiệu</TabsTrigger>
            <TabsTrigger value="skills">Kỹ năng</TabsTrigger>
            <TabsTrigger value="contributions">Đóng góp</TabsTrigger>
            <TabsTrigger value="connections">Kết nối</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-6">
            <AboutSection />
          </TabsContent>

          <TabsContent value="skills" className="mt-6">
            <SkillsSection />
          </TabsContent>

          <TabsContent value="contributions" className="mt-6">
            <ContributionsSection />
          </TabsContent>

          <TabsContent value="connections" className="mt-6">
            <ConnectionsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
