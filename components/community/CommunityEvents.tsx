"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Coffee,
  BookOpen,
  Shield,
  Heart,
  Utensils,
  Wrench,
  Plus,
  Star,
  CheckCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CommunityEvent {
  id: string
  title: string
  titleVi: string
  description: string
  descriptionVi: string
  type: 'workshop' | 'festival' | 'safety' | 'cultural' | 'skill_share' | 'social'
  wardName: string
  date: Date
  location: string
  organizer: {
    name: string
    avatar: string
    level: string
  }
  attendeeCount: number
  maxAttendees: number
  isRecurring: boolean
  culturalSignificance?: 'high' | 'medium' | 'low'
  antiCommercial: boolean
  isAttending?: boolean
}

const mockEvents: CommunityEvent[] = [
  {
    id: '1',
    title: 'Traditional Vietnamese Cooking Workshop',
    titleVi: 'Workshop nấu ăn truyền thống Việt Nam',
    description: 'Learn to make bánh mì and phở from scratch',
    descriptionVi: 'Học cách làm bánh mì và phở từ đầu',
    type: 'cultural',
    wardName: 'Phường Bến Nghé',
    date: new Date('2024-02-15T15:00:00'),
    location: 'Nhà văn hóa phường, 123 Đường Nguyễn Huệ',
    organizer: {
      name: 'Cô Lan',
      avatar: '/vietnamese-user.png',
      level: 'Thầy/Cô cộng đồng'
    },
    attendeeCount: 12,
    maxAttendees: 20,
    isRecurring: true,
    culturalSignificance: 'high',
    antiCommercial: true,
    isAttending: false
  },
  {
    id: '2',
    title: 'Neighborhood Safety Watch Meeting',
    titleVi: 'Họp ban an ninh khu phố',
    description: 'Monthly community safety discussion and planning',
    descriptionVi: 'Thảo luận và lập kế hoạch an ninh cộng đồng hàng tháng',
    type: 'safety',
    wardName: 'Phường Bến Nghé',
    date: new Date('2024-02-18T19:00:00'),
    location: 'Trụ sở ủy ban phường',
    organizer: {
      name: 'Anh Minh',
      avatar: '/vietnamese-technician.png',
      level: 'Người dẫn đường'
    },
    attendeeCount: 8,
    maxAttendees: 30,
    isRecurring: true,
    culturalSignificance: 'medium',
    antiCommercial: true,
    isAttending: true
  },
  {
    id: '3',
    title: 'Community Tea Circle',
    titleVi: 'Vòng tròn trà cộng đồng',
    description: 'Weekly gathering for neighbors to connect and share',
    descriptionVi: 'Buổi họp mặt hàng tuần để hàng xóm kết nối và chia sẻ',
    type: 'social',
    wardName: 'Phường Bến Nghé',
    date: new Date('2024-02-20T16:30:00'),
    location: 'Công viên Tao Đàn',
    organizer: {
      name: 'Bà Hương',
      avatar: '/vietnamese-user.png',
      level: 'Hàng xóm tốt'
    },
    attendeeCount: 15,
    maxAttendees: 25,
    isRecurring: true,
    culturalSignificance: 'high',
    antiCommercial: true,
    isAttending: false
  },
  {
    id: '4',
    title: 'Basic Electrical Safety Workshop',
    titleVi: 'Workshop an toàn điện cơ bản',
    description: 'Learn home electrical safety and basic repairs',
    descriptionVi: 'Học an toàn điện gia đình và sửa chữa cơ bản',
    type: 'skill_share',
    wardName: 'Phường Bến Nghé',
    date: new Date('2024-02-22T14:00:00'),
    location: 'Xưởng thợ Minh, 456 Đường Lê Thánh Tôn',
    organizer: {
      name: 'Thợ Minh',
      avatar: '/vietnamese-technician.png',
      level: 'Chuyên gia cộng đồng'
    },
    attendeeCount: 6,
    maxAttendees: 12,
    isRecurring: false,
    culturalSignificance: 'low',
    antiCommercial: true,
    isAttending: false
  }
]

const eventTypeConfig = {
  workshop: { icon: BookOpen, color: 'bg-blue-100 text-blue-700', label: 'Workshop' },
  festival: { icon: Star, color: 'bg-purple-100 text-purple-700', label: 'Lễ hội' },
  safety: { icon: Shield, color: 'bg-red-100 text-red-700', label: 'An ninh' },
  cultural: { icon: Heart, color: 'bg-pink-100 text-pink-700', label: 'Văn hóa' },
  skill_share: { icon: Wrench, color: 'bg-emerald-100 text-emerald-700', label: 'Chia sẻ kỹ năng' },
  social: { icon: Coffee, color: 'bg-orange-100 text-orange-700', label: 'Giao lưu' }
}

interface CommunityEventsProps {
  wardName?: string
  className?: string
}

export function CommunityEvents({ 
  wardName = "Phường Bến Nghé", 
  className = "" 
}: CommunityEventsProps) {
  const [filter, setFilter] = useState<'all' | CommunityEvent['type']>('all')
  const [showCreateForm, setShowCreateForm] = useState(false)

  const filteredEvents = mockEvents.filter(event => 
    filter === 'all' || event.type === filter
  )

  const formatVietnameseDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleAttendEvent = (eventId: string) => {
    // In real app, this would make an API call
    console.log(`Attending event ${eventId}`)
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            Sự kiện cộng đồng - {wardName}
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Tổ chức sự kiện
          </Button>
        </div>
        
        {/* Anti-Commercial Badge */}
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
            <Shield className="w-3 h-3 mr-1" />
            100% phi thương mại
          </Badge>
          <Badge variant="outline" className="text-xs">
            Ưu tiên kết nối cộng đồng
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Event Type Filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
            className="text-xs"
          >
            Tất cả
          </Button>
          {Object.entries(eventTypeConfig).map(([type, config]) => (
            <Button
              key={type}
              variant={filter === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(type as CommunityEvent['type'])}
              className="text-xs"
            >
              <config.icon className="w-3 h-3 mr-1" />
              {config.label}
            </Button>
          ))}
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.map((event) => {
            const typeConfig = eventTypeConfig[event.type]
            const Icon = typeConfig.icon
            
            return (
              <Card key={event.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Event Type Icon */}
                    <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0", typeConfig.color)}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    {/* Event Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{event.titleVi}</h3>
                          <p className="text-sm text-gray-600 mb-2">{event.descriptionVi}</p>
                        </div>
                        {event.culturalSignificance === 'high' && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 ml-2">
                            Văn hóa quan trọng
                          </Badge>
                        )}
                      </div>
                      
                      {/* Event Meta */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatVietnameseDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{formatTime(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{event.attendeeCount}/{event.maxAttendees} người tham gia</span>
                        </div>
                      </div>
                      
                      {/* Organizer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={event.organizer.avatar} alt={event.organizer.name} />
                            <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{event.organizer.name}</p>
                            <p className="text-xs text-gray-500">{event.organizer.level}</p>
                          </div>
                          {event.isRecurring && (
                            <Badge variant="outline" className="text-xs">
                              Định kỳ
                            </Badge>
                          )}
                        </div>
                        
                        {/* Attend Button */}
                        <Button
                          variant={event.isAttending ? "secondary" : "default"}
                          size="sm"
                          onClick={() => handleAttendEvent(event.id)}
                          disabled={event.attendeeCount >= event.maxAttendees}
                          className={cn(
                            event.isAttending && "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                          )}
                        >
                          {event.isAttending ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Đã tham gia
                            </>
                          ) : event.attendeeCount >= event.maxAttendees ? (
                            "Đã đầy"
                          ) : (
                            "Tham gia"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Vietnamese Community Values Message */}
        <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
          <h4 className="font-semibold text-emerald-800 mb-2 flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Giá trị cộng đồng Việt Nam
          </h4>
          <p className="text-sm text-emerald-700">
            Các sự kiện được tổ chức bởi và cho cộng đồng, không vì mục đích thương mại. 
            Chúng ta xây dựng mối quan hệ lâu dài dựa trên sự tin tưởng và hỗ trợ lẫn nhau.
          </p>
        </div>

        {/* Create Event Call-to-Action */}
        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 mb-3">
            Bạn có ý tưởng cho sự kiện cộng đồng?
          </p>
          <Button variant="outline" onClick={() => setShowCreateForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Đề xuất sự kiện mới
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}