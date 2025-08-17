"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/shared/Navigation"
import { ReputationCard } from "@/components/community/ReputationCard"
import { ContributionPoints, UserBadge } from "@/lib/contribution-system"
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Smartphone, 
  Eye, 
  Lock,
  Camera,
  MapPin,
  Clock,
  Star,
  Crown,
  Award,
  Users,
  Coffee,
  Heart,
  Info,
  AlertTriangle,
  CheckCircle,
  X,
  Settings as SettingsIcon
} from "lucide-react"

// Current user's community data
const currentUserPoints: ContributionPoints = {
  total: 1456,
  breakdown: {
    reviews: 89,
    photos: 150,
    tutorials: 300,
    mentoring: 600,
    verification: 120,
    moderation: 97,
    events: 100,
    localIntelligence: 0
  }
}

const currentUserBadges: UserBadge[] = [
  {
    id: "1",
    name: "Good Neighbor",
    nameVi: "Người hàng xóm tốt",
    description: "Active in local neighborhood",
    descriptionVi: "Tích cực trong khu phố địa phương",
    icon: "🏠",
    earnedAt: new Date("2023-12-10"),
    category: "văn_hóa",
    rarity: "phổ_biến"
  },
  {
    id: "2",
    name: "Community Teacher",
    nameVi: "Thầy/Cô cộng đồng",
    description: "Teaches skills to others",
    descriptionVi: "Dạy kỹ năng cho người khác",
    icon: "📚",
    earnedAt: new Date("2024-01-15"),
    category: "văn_hóa",
    rarity: "hiếm"
  }
]

export default function SettingsPage() {
  const [profileData, setProfileData] = useState({
    name: "Lê Thị Hương",
    email: "huong.le@email.com",
    phone: "+84 912 345 678",
    ward: "Phường Bến Nghé",
    district: "Quận 1", 
    city: "TP.HCM",
    exactAddress: "",
    bio: "Giáo viên Piano với 8 năm kinh nghiệm. Chuyên dạy trẻ em và người mới bắt đầu. Yêu thích chia sẻ âm nhạc với cộng đồng."
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    newMessages: true,
    serviceRequests: true,
    communityEvents: true,
    emergencyAlerts: true,
    localIntelligence: true
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    showWardLocation: true,
    allowExactLocation: false,
    showPhone: false,
    showEmail: false,
    onlineStatus: true,
    communityVerification: true,
    antiCommercialProfile: true
  })

  const [communitySettings, setCommunitySettings] = useState({
    participateInEvents: true,
    shareLocalIntelligence: true,
    mentorNewcomers: true,
    emergencyResponse: false,
    culturalActivities: true,
    antiCommercialCommitment: true
  })

  const [locationPrivacy, setLocationPrivacy] = useState({
    defaultLevel: 'public_ward',
    autoShareRadius: 500,
    temporarySharing: true,
    neighborVerification: true
  })

  return (
    <div className="min-h-screen bg-slate-100">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-emerald-600" />
            Cài đặt tài khoản
          </h1>
          <p className="text-gray-600 mt-2">Quản lý thông tin cá nhân, quyền riêng tư và tham gia cộng đồng</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Profile & Community */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Profile Settings */}
            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-emerald-600" />
                  <div>
                    <CardTitle>Thông tin cá nhân</CardTitle>
                    <CardDescription>Cập nhật thông tin hồ sơ và kỹ năng của bạn</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="/vietnamese-user.png" alt="Profile" />
                      <AvatarFallback className="text-lg">H</AvatarFallback>
                    </Avatar>
                    <Button 
                      size="sm" 
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary">Giáo viên Piano</Badge>
                      <Badge className="bg-emerald-100 text-emerald-800">
                        <Star className="w-3 h-3 mr-1" />
                        4.9
                      </Badge>
                      {privacy.antiCommercialProfile && (
                        <Badge className="bg-blue-100 text-blue-700">
                          <Shield className="w-3 h-3 mr-1" />
                          Phi thương mại
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      Tham gia từ tháng 3/2023 • 45 đánh giá • 127 người đã giúp đỡ
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ward">Phường</Label>
                    <Input
                      id="ward"
                      value={profileData.ward}
                      onChange={(e) => setProfileData({...profileData, ward: e.target.value})}
                      placeholder="VD: Phường Bến Nghé"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">Quận/Huyện</Label>
                    <Input
                      id="district"
                      value={profileData.district}
                      onChange={(e) => setProfileData({...profileData, district: e.target.value})}
                      placeholder="VD: Quận 1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Thành phố</Label>
                    <Input
                      id="city"
                      value={profileData.city}
                      onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                      placeholder="VD: TP.HCM"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Giới thiệu bản thân</Label>
                  <textarea
                    id="bio"
                    className="w-full h-20 px-3 py-2 border border-gray-200 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    placeholder="Mô tả ngắn về kỹ năng, kinh nghiệm và cách bạn có thể giúp đỡ cộng đồng..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy-First Location Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <div>
                    <CardTitle>Quyền riêng tư vị trí</CardTitle>
                    <CardDescription>Kiểm soát ai có thể xem vị trí của bạn (thiết kế riêng cho văn hóa Việt Nam)</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-800 mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Bảo vệ riêng tư theo phong cách Việt Nam
                  </h4>
                  <p className="text-sm text-emerald-700">
                    Chỉ hiển thị phường/quận theo mặc định. Địa chỉ chính xác chỉ được chia sẻ khi bạn cho phép cụ thể từng trường hợp.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Hiển thị thông tin phường</Label>
                      <p className="text-xs text-gray-500">Cho phép hiển thị phường và quận (luôn an toàn)</p>
                    </div>
                    <Switch
                      checked={privacy.showWardLocation}
                      onCheckedChange={(checked) => 
                        setPrivacy({...privacy, showWardLocation: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Cho phép chia sẻ địa chỉ chính xác</Label>
                      <p className="text-xs text-gray-500">Chỉ khi bạn đồng ý cho từng trường hợp cụ thể</p>
                    </div>
                    <Switch
                      checked={privacy.allowExactLocation}
                      onCheckedChange={(checked) => 
                        setPrivacy({...privacy, allowExactLocation: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Xác minh qua hàng xóm</Label>
                      <p className="text-xs text-gray-500">Cho phép hàng xóm xác minh bạn là thành viên cộng đồng</p>
                    </div>
                    <Switch
                      checked={locationPrivacy.neighborVerification}
                      onCheckedChange={(checked) => 
                        setLocationPrivacy({...locationPrivacy, neighborVerification: checked})
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Mức độ riêng tư mặc định</Label>
                    <Select 
                      value={locationPrivacy.defaultLevel} 
                      onValueChange={(value) => setLocationPrivacy({...locationPrivacy, defaultLevel: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public_ward">Công khai phường - An toàn nhất</SelectItem>
                        <SelectItem value="neighbors_only">Chỉ hàng xóm được xác minh</SelectItem>
                        <SelectItem value="family_friends">Gia đình và bạn bè</SelectItem>
                        <SelectItem value="service_providers">Nhà cung cấp dịch vụ (tạm thời)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Participation Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <div>
                    <CardTitle>Tham gia cộng đồng</CardTitle>
                    <CardDescription>Cài đặt tham gia các hoạt động cộng đồng và văn hóa Việt Nam</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Tham gia sự kiện cộng đồng</Label>
                    <p className="text-xs text-gray-500">Nhận thông báo về workshop, lễ hội, vòng tròn trà</p>
                  </div>
                  <Switch
                    checked={communitySettings.participateInEvents}
                    onCheckedChange={(checked) => 
                      setCommunitySettings({...communitySettings, participateInEvents: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Chia sẻ thông tin địa phương</Label>
                    <p className="text-xs text-gray-500">Góp phần xây dựng kho thông tin cộng đồng</p>
                  </div>
                  <Switch
                    checked={communitySettings.shareLocalIntelligence}
                    onCheckedChange={(checked) => 
                      setCommunitySettings({...communitySettings, shareLocalIntelligence: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Hướng dẫn thành viên mới</Label>
                    <p className="text-xs text-gray-500">Giúp người mới hòa nhập vào cộng đồng</p>
                  </div>
                  <Switch
                    checked={communitySettings.mentorNewcomers}
                    onCheckedChange={(checked) => 
                      setCommunitySettings({...communitySettings, mentorNewcomers: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Hoạt động văn hóa truyền thống</Label>
                    <p className="text-xs text-gray-500">Tham gia lễ Tết, làm bánh chưng, nghề thủ công</p>
                  </div>
                  <Switch
                    checked={communitySettings.culturalActivities}
                    onCheckedChange={(checked) => 
                      setCommunitySettings({...communitySettings, culturalActivities: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Phản ứng khẩn cấp</Label>
                    <p className="text-xs text-gray-500">Sẵn sàng hỗ trợ trong tình huống khẩn cấp</p>
                  </div>
                  <Switch
                    checked={communitySettings.emergencyResponse}
                    onCheckedChange={(checked) => 
                      setCommunitySettings({...communitySettings, emergencyResponse: checked})
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Anti-Commercialization Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-emerald-600" />
                  <div>
                    <CardTitle>Cam kết phi thương mại</CardTitle>
                    <CardDescription>Xây dựng mối quan hệ lâu dài thay vì giao dịch nhanh</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Giá trị cốt lõi SkillHub
                  </h4>
                  <p className="text-sm text-blue-700">
                    SkillHub ưu tiên xây dựng cộng đồng và mối quan hệ lâu dài. 
                    Chúng tôi không thu phí từ giao dịch và không bán dữ liệu người dùng.
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Hồ sơ phi thương mại</Label>
                    <p className="text-xs text-gray-500">Hiển thị cam kết xây dựng cộng đồng, không chỉ kinh doanh</p>
                  </div>
                  <Switch
                    checked={privacy.antiCommercialProfile}
                    onCheckedChange={(checked) => 
                      setPrivacy({...privacy, antiCommercialProfile: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Cam kết giá trị cộng đồng</Label>
                    <p className="text-xs text-gray-500">Tôi đồng ý ưu tiên giúp đỡ lẫn nhau thay vì lợi nhuận</p>
                  </div>
                  <Switch
                    checked={communitySettings.antiCommercialCommitment}
                    onCheckedChange={(checked) => 
                      setCommunitySettings({...communitySettings, antiCommercialCommitment: checked})
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-emerald-600" />
                  <div>
                    <CardTitle>Thông báo</CardTitle>
                    <CardDescription>Quản lý cách bạn nhận thông báo về cộng đồng</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Yêu cầu dịch vụ</Label>
                    <p className="text-xs text-gray-500">Khi có người cần sự giúp đỡ của bạn</p>
                  </div>
                  <Switch
                    checked={notifications.serviceRequests}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, serviceRequests: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Sự kiện cộng đồng</Label>
                    <p className="text-xs text-gray-500">Workshop, lễ hội, buổi giao lưu trong khu phố</p>
                  </div>
                  <Switch
                    checked={notifications.communityEvents}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, communityEvents: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Cảnh báo khẩn cấp</Label>
                    <p className="text-xs text-gray-500">Thời tiết, an toàn, thông tin quan trọng trong khu vực</p>
                  </div>
                  <Switch
                    checked={notifications.emergencyAlerts}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, emergencyAlerts: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Thông tin địa phương</Label>
                    <p className="text-xs text-gray-500">Cập nhật giá cả, giao thông, dịch vụ mới</p>
                  </div>
                  <Switch
                    checked={notifications.localIntelligence}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, localIntelligence: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Tin nhắn mới</Label>
                    <p className="text-xs text-gray-500">Thông báo khi có tin nhắn từ hàng xóm</p>
                  </div>
                  <Switch
                    checked={notifications.newMessages}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, newMessages: checked})
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account Security */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-emerald-600" />
                  <div>
                    <CardTitle>Bảo mật tài khoản</CardTitle>
                    <CardDescription>Quản lý mật khẩu và bảo mật</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Lock className="w-4 h-4 mr-2" />
                  Đổi mật khẩu
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Xác thực hai yếu tố
                </Button>

                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Xem dữ liệu cá nhân
                </Button>

                <Separator />

                <div className="pt-4">
                  <h4 className="text-sm font-medium text-red-600 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Vùng nguy hiểm
                  </h4>
                  <Button variant="destructive" className="w-full">
                    Xóa tài khoản và dữ liệu
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    Thao tác này không thể hoàn tác. Tất cả dữ liệu và đóng góp cộng đồng sẽ bị xóa vĩnh viễn.
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Right Column - Community Champions & Stats */}
          <div className="space-y-6">
            
            {/* Community Champions Card */}
            <ReputationCard 
              points={currentUserPoints}
              badges={currentUserBadges}
              compact={false}
            />

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hành động nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Crown className="w-4 h-4 mr-2" />
                  Nâng cấp Premium
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Coffee className="w-4 h-4 mr-2" />
                  Tổ chức sự kiện
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="w-4 h-4 mr-2" />
                  Xem huy hiệu
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Kết nối hàng xóm
                </Button>
              </CardContent>
            </Card>

            {/* Vietnamese Community Values */}
            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Giá trị cộng đồng Việt Nam
                </h3>
                <div className="space-y-2 text-sm text-emerald-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Tôn kính người lớn tuổi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Giúp đỡ hàng xóm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Chia sẻ kiến thức</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Bảo vệ cộng đồng</span>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="outline">Hủy thay đổi</Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <CheckCircle className="w-4 h-4 mr-2" />
            Lưu tất cả cài đặt
          </Button>
        </div>
      </div>
    </div>
  )
}