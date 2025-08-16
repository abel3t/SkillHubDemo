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
  Star
} from "lucide-react"

export default function SettingsPage() {
  const [profileData, setProfileData] = useState({
    name: "Lê Thị Hương",
    email: "huong.le@email.com",
    phone: "+84 912 345 678",
    location: "Quận 1, TP.HCM",
    bio: "Giáo viên Piano với 8 năm kinh nghiệm. Chuyên dạy trẻ em và người mới bắt đầu."
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    newMessages: true,
    jobAlerts: true
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    showLocation: true,
    showPhone: false,
    showEmail: false,
    onlineStatus: true
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Cài đặt</h1>
          <p className="text-gray-600 mt-2">Quản lý thông tin cá nhân và tùy chọn tài khoản</p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-emerald-600" />
                <div>
                  <CardTitle>Thông tin cá nhân</CardTitle>
                  <CardDescription>Cập nhật thông tin hồ sơ của bạn</CardDescription>
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
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
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
                  </div>
                  <p className="text-sm text-gray-600">
                    Tham gia từ tháng 3/2023 • 45 đánh giá
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
                  <Label htmlFor="location">Địa chỉ</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
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
                  placeholder="Mô tả ngắn về kỹ năng và kinh nghiệm của bạn..."
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
                  <CardDescription>Quản lý cách bạn nhận thông báo</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Thông báo email</Label>
                  <p className="text-xs text-gray-500">Nhận thông báo qua email</p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, emailNotifications: checked})
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Thông báo đẩy</Label>
                  <p className="text-xs text-gray-500">Nhận thông báo trên thiết bị</p>
                </div>
                <Switch
                  checked={notifications.pushNotifications}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, pushNotifications: checked})
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Tin nhắn mới</Label>
                  <p className="text-xs text-gray-500">Thông báo khi có tin nhắn mới</p>
                </div>
                <Switch
                  checked={notifications.newMessages}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, newMessages: checked})
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Cơ hội việc làm</Label>
                  <p className="text-xs text-gray-500">Thông báo về công việc phù hợp</p>
                </div>
                <Switch
                  checked={notifications.jobAlerts}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, jobAlerts: checked})
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                <div>
                  <CardTitle>Quyền riêng tư</CardTitle>
                  <CardDescription>Kiểm soát ai có thể xem thông tin của bạn</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Hiển thị hồ sơ công khai</Label>
                  <p className="text-xs text-gray-500">Cho phép người khác tìm thấy hồ sơ của bạn</p>
                </div>
                <Switch
                  checked={privacy.profileVisibility}
                  onCheckedChange={(checked) => 
                    setPrivacy({...privacy, profileVisibility: checked})
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Hiển thị vị trí</Label>
                  <p className="text-xs text-gray-500">Cho phép hiển thị khu vực của bạn</p>
                </div>
                <Switch
                  checked={privacy.showLocation}
                  onCheckedChange={(checked) => 
                    setPrivacy({...privacy, showLocation: checked})
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Trạng thái trực tuyến</Label>
                  <p className="text-xs text-gray-500">Hiển thị khi bạn đang hoạt động</p>
                </div>
                <Switch
                  checked={privacy.onlineStatus}
                  onCheckedChange={(checked) => 
                    setPrivacy({...privacy, onlineStatus: checked})
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Management */}
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

              <Separator />

              <div className="pt-4">
                <h4 className="text-sm font-medium text-red-600 mb-2">Vùng nguy hiểm</h4>
                <Button variant="destructive" className="w-full">
                  Xóa tài khoản
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Thao tác này không thể hoàn tác. Tất cả dữ liệu sẽ bị xóa vĩnh viễn.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline">Hủy</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Lưu thay đổi
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}