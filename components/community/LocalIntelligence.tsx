"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  MapPin, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Users,
  Shield,
  Zap,
  Cloud,
  Construction,
  Car,
  Bus,
  Bike,
  Coffee,
  ShoppingCart,
  Plus,
  CheckCircle,
  Info
} from "lucide-react"
import { cn } from "@/lib/utils"

interface LocalUpdate {
  id: string
  type: 'price' | 'availability' | 'safety' | 'transport' | 'weather' | 'construction' | 'business'
  title: string
  titleVi: string
  description: string
  descriptionVi: string
  location: string
  wardName: string
  reportedBy: {
    name: string
    avatar: string
    level: string
    isVerifiedNeighbor: boolean
  }
  reportedAt: Date
  updatedAt: Date
  severity?: 'low' | 'medium' | 'high'
  isActive: boolean
  confirmations: number
  helpfulVotes: number
  category: string
  categoryVi: string
}

const mockUpdates: LocalUpdate[] = [
  {
    id: '1',
    type: 'price',
    title: 'Rice price increase at local market',
    titleVi: 'Giá gạo tăng tại chợ địa phương',
    description: 'Rice prices increased by 5,000 VND/kg due to seasonal shortage',
    descriptionVi: 'Giá gạo tăng 5,000 VND/kg do thiếu hụt theo mùa',
    location: 'Chợ Bến Thành, Quầy số 15',
    wardName: 'Phường Bến Nghé',
    reportedBy: {
      name: 'Cô Lan',
      avatar: '/vietnamese-user.png',
      level: 'Hàng xóm tốt',
      isVerifiedNeighbor: true
    },
    reportedAt: new Date('2024-02-14T08:30:00'),
    updatedAt: new Date('2024-02-14T08:30:00'),
    severity: 'low',
    isActive: true,
    confirmations: 3,
    helpfulVotes: 8,
    category: 'Food & Groceries',
    categoryVi: 'Thực phẩm & Tạp hóa'
  },
  {
    id: '2',
    type: 'transport',
    title: 'Bus route 36 temporary suspension',
    titleVi: 'Tuyến xe buýt 36 tạm ngưng',
    description: 'Route 36 suspended until Feb 20 due to road construction on Nguyen Hue',
    descriptionVi: 'Tuyến 36 tạm ngưng đến ngày 20/2 do thi công đường Nguyễn Huệ',
    location: 'Đường Nguyễn Huệ',
    wardName: 'Phường Bến Nghé',
    reportedBy: {
      name: 'Anh Minh',
      avatar: '/vietnamese-technician.png',
      level: 'Chuyên gia cộng đồng',
      isVerifiedNeighbor: true
    },
    reportedAt: new Date('2024-02-14T07:15:00'),
    updatedAt: new Date('2024-02-14T07:15:00'),
    severity: 'medium',
    isActive: true,
    confirmations: 12,
    helpfulVotes: 24,
    category: 'Transportation',
    categoryVi: 'Giao thông'
  },
  {
    id: '3',
    type: 'safety',
    title: 'Poor street lighting on Le Thanh Ton',
    titleVi: 'Đèn đường tối trên Lê Thánh Tôn',
    description: 'Several street lights are broken, making evening walks unsafe',
    descriptionVi: 'Nhiều đèn đường bị hỏng, đi bộ buổi tối không an toàn',
    location: 'Đường Lê Thánh Tôn, đoạn 200-300',
    wardName: 'Phường Bến Nghé',
    reportedBy: {
      name: 'Chị Hương',
      avatar: '/vietnamese-user.png',
      level: 'Người bảo vệ phường',
      isVerifiedNeighbor: true
    },
    reportedAt: new Date('2024-02-13T19:45:00'),
    updatedAt: new Date('2024-02-13T19:45:00'),
    severity: 'high',
    isActive: true,
    confirmations: 7,
    helpfulVotes: 15,
    category: 'Safety & Security',
    categoryVi: 'An toàn & Bảo mật'
  },
  {
    id: '4',
    type: 'business',
    title: 'New traditional medicine shop opened',
    titleVi: 'Cửa hàng thuốc nam mới mở',
    description: 'Traditional Vietnamese medicine shop with experienced herbalist',
    descriptionVi: 'Cửa hàng thuốc nam với thầy thuốc có kinh nghiệm',
    location: '123 Đường Nguyễn Du',
    wardName: 'Phường Bến Nghé',
    reportedBy: {
      name: 'Bà Thảo',
      avatar: '/vietnamese-user.png',
      level: 'Đại sứ địa phương',
      isVerifiedNeighbor: true
    },
    reportedAt: new Date('2024-02-13T14:20:00'),
    updatedAt: new Date('2024-02-13T14:20:00'),
    severity: 'low',
    isActive: true,
    confirmations: 5,
    helpfulVotes: 11,
    category: 'Local Business',
    categoryVi: 'Doanh nghiệp địa phương'
  },
  {
    id: '5',
    type: 'weather',
    title: 'Heavy rain expected this weekend',
    titleVi: 'Mưa lớn dự báo cuối tuần này',
    description: 'Weather service warns of flooding in low-lying areas',
    descriptionVi: 'Dịch vụ thời tiết cảnh báo ngập lụt vùng thấp',
    location: 'Toàn khu vực Quận 1',
    wardName: 'Phường Bến Nghé',
    reportedBy: {
      name: 'Anh Đức',
      avatar: '/vietnamese-technician.png',
      level: 'Người trợ giúp khẩn cấp',
      isVerifiedNeighbor: true
    },
    reportedAt: new Date('2024-02-14T06:00:00'),
    updatedAt: new Date('2024-02-14T06:00:00'),
    severity: 'medium',
    isActive: true,
    confirmations: 18,
    helpfulVotes: 32,
    category: 'Weather & Environment',
    categoryVi: 'Thời tiết & Môi trường'
  }
]

const updateTypeConfig = {
  price: { icon: DollarSign, color: 'bg-yellow-100 text-yellow-700', label: 'Giá cả' },
  availability: { icon: ShoppingCart, color: 'bg-blue-100 text-blue-700', label: 'Sẵn có' },
  safety: { icon: Shield, color: 'bg-red-100 text-red-700', label: 'An toàn' },
  transport: { icon: Bus, color: 'bg-green-100 text-green-700', label: 'Giao thông' },
  weather: { icon: Cloud, color: 'bg-gray-100 text-gray-700', label: 'Thời tiết' },
  construction: { icon: Construction, color: 'bg-orange-100 text-orange-700', label: 'Xây dựng' },
  business: { icon: Coffee, color: 'bg-purple-100 text-purple-700', label: 'Kinh doanh' }
}

const severityConfig = {
  low: { color: 'bg-green-100 text-green-700', label: 'Thấp' },
  medium: { color: 'bg-yellow-100 text-yellow-700', label: 'Trung bình' },
  high: { color: 'bg-red-100 text-red-700', label: 'Cao' }
}

interface LocalIntelligenceProps {
  wardName?: string
  className?: string
}

export function LocalIntelligence({ 
  wardName = "Phường Bến Nghé", 
  className = "" 
}: LocalIntelligenceProps) {
  const [filter, setFilter] = useState<'all' | LocalUpdate['type']>('all')
  const [showReportForm, setShowReportForm] = useState(false)

  const filteredUpdates = mockUpdates.filter(update => 
    filter === 'all' || update.type === filter
  )

  const formatVietnameseTime = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return 'Vừa xong'
    } else if (diffInHours < 24) {
      return `${diffInHours} giờ trước`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} ngày trước`
    }
  }

  const handleConfirmUpdate = (updateId: string) => {
    // In real app, this would make an API call
    console.log(`Confirming update ${updateId}`)
  }

  const handleVoteHelpful = (updateId: string) => {
    // In real app, this would make an API call
    console.log(`Voting helpful for update ${updateId}`)
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            Thông tin địa phương - {wardName}
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowReportForm(!showReportForm)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Báo cáo
          </Button>
        </div>
        
        {/* Anti-Big-Tech Message */}
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
            <Shield className="w-3 h-3 mr-1" />
            Dữ liệu cộng đồng
          </Badge>
          <Badge variant="outline" className="text-xs">
            Không thuật toán, chỉ hàng xóm thực sự
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Update Type Filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
            className="text-xs"
          >
            Tất cả
          </Button>
          {Object.entries(updateTypeConfig).map(([type, config]) => (
            <Button
              key={type}
              variant={filter === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(type as LocalUpdate['type'])}
              className="text-xs"
            >
              <config.icon className="w-3 h-3 mr-1" />
              {config.label}
            </Button>
          ))}
        </div>

        {/* Updates List */}
        <div className="space-y-4">
          {filteredUpdates.map((update) => {
            const typeConfig = updateTypeConfig[update.type]
            const Icon = typeConfig.icon
            
            return (
              <Card key={update.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Update Type Icon */}
                    <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0", typeConfig.color)}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    {/* Update Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{update.titleVi}</h3>
                          <p className="text-sm text-gray-600 mb-2">{update.descriptionVi}</p>
                        </div>
                        {update.severity && (
                          <Badge 
                            variant="secondary" 
                            className={cn("ml-2", severityConfig[update.severity].color)}
                          >
                            Mức độ: {severityConfig[update.severity].label}
                          </Badge>
                        )}
                      </div>
                      
                      {/* Location & Category */}
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">{update.location}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {update.categoryVi}
                        </Badge>
                      </div>
                      
                      {/* Reporter & Meta */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={update.reportedBy.avatar} alt={update.reportedBy.name} />
                            <AvatarFallback>{update.reportedBy.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-gray-900">{update.reportedBy.name}</p>
                              {update.reportedBy.isVerifiedNeighbor && (
                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{update.reportedBy.level}</span>
                              <span>•</span>
                              <span>{formatVietnameseTime(update.reportedAt)}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleConfirmUpdate(update.id)}
                            className="text-xs"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Xác nhận ({update.confirmations})
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVoteHelpful(update.id)}
                            className="text-xs"
                          >
                            <TrendingUp className="w-4 h-4 mr-1" />
                            Hữu ích ({update.helpfulVotes})
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Community Intelligence Principles */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Thông tin từ cộng đồng, cho cộng đồng
          </h4>
          <p className="text-sm text-blue-700">
            Mọi thông tin đều được chia sẻ bởi hàng xóm được xác minh. 
            Không có thuật toán hay công ty nào thu thập dữ liệu của bạn.
            Chúng ta cùng nhau xây dựng kho thông tin địa phương đáng tin cậy.
          </p>
        </div>

        {/* Report Something Call-to-Action */}
        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 mb-3">
            Nhận thấy thay đổi gì trong khu phố?
          </p>
          <Button variant="outline" onClick={() => setShowReportForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Chia sẻ thông tin hữu ích
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}