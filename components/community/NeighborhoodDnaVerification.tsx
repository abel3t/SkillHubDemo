"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { 
  Shield, 
  Users, 
  MapPin, 
  Clock, 
  Eye,
  Home,
  CheckCircle,
  AlertTriangle,
  Star,
  Calendar,
  Coffee,
  Heart,
  Zap,
  TreePine,
  Building,
  Camera,
  MessageCircle,
  ThumbsUp,
  Award,
  Info
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NeighborhoodDna {
  userId: string
  fullName: string
  avatar: string
  address: string
  wardName: string
  streetName: string
  houseNumber: string
  residencyStatus: 'owner' | 'renter' | 'family_member' | 'business_owner' | 'worker'
  timeInNeighborhood: number // months
  verification: {
    overallScore: number
    isVerified: boolean
    verificationDate?: Date
    verifiers: NeighborVerification[]
    selfReported: NeighborhoodActivity[]
    observedByOthers: ObservedActivity[]
    communityIntegration: CommunityIntegration
  }
}

interface NeighborVerification {
  verifierId: string
  verifierName: string
  verifierAvatar: string
  verifierLevel: string
  relationship: 'direct_neighbor' | 'street_neighbor' | 'ward_resident' | 'local_business' | 'community_leader'
  verificationDate: Date
  confidence: 'certain' | 'very_likely' | 'likely' | 'uncertain'
  timeKnown: number // months
  interactions: string[]
  culturalObservations: string[]
  verificationNote?: string
}

interface NeighborhoodActivity {
  type: 'daily_routine' | 'business_hours' | 'community_events' | 'local_shopping' | 'cultural_participation'
  description: string
  frequency: 'daily' | 'weekly' | 'monthly' | 'seasonal'
  locations: string[]
  witnesses?: string[]
}

interface ObservedActivity {
  observerId: string
  observerName: string
  activityType: 'coming_going' | 'shopping_local' | 'community_events' | 'helping_neighbors' | 'cultural_activities'
  observationDate: Date
  description: string
  location: string
  reliability: number // 1-10
}

interface CommunityIntegration {
  localKnowledge: {
    score: number
    examples: string[]
  }
  socialConnections: {
    score: number
    relationships: number
  }
  culturalParticipation: {
    score: number
    activities: string[]
  }
  localContributions: {
    score: number
    contributions: string[]
  }
}

const mockPersonForVerification: NeighborhoodDna = {
  userId: '1',
  fullName: 'Lê Thị Hương',
  avatar: '/vietnamese-user.png',
  address: '123 Đường Nguyễn Du',
  wardName: 'Phường Bến Nghé',
  streetName: 'Đường Nguyễn Du',
  houseNumber: '123',
  residencyStatus: 'renter',
  timeInNeighborhood: 18,
  verification: {
    overallScore: 87,
    isVerified: true,
    verificationDate: new Date('2024-01-15'),
    verifiers: [
      {
        verifierId: '2',
        verifierName: 'Bà Lan (hàng xóm cạnh)',
        verifierAvatar: '/vietnamese-elderly-woman.png',
        verifierLevel: 'Người dẫn đường',
        relationship: 'direct_neighbor',
        verificationDate: new Date('2024-01-10'),
        confidence: 'certain',
        timeKnown: 17,
        interactions: ['Chào hỏi hàng ngày', 'Giúp đỡ mua thuốc', 'Chia sẻ thức ăn trong Tết'],
        culturalObservations: ['Biết cúng rằm', 'Tham gia dọn dẹp chung', 'Tôn trọng người lớn tuổi']
      },
      {
        verifierId: '3',
        verifierName: 'Anh Minh (chủ quán cà phê)',
        verifierAvatar: '/vietnamese-technician.png',
        verifierLevel: 'Thương gia địa phương',
        relationship: 'local_business',
        verificationDate: new Date('2024-01-12'),
        confidence: 'very_likely',
        timeKnown: 16,
        interactions: ['Khách quen', 'Đặt cà phê họp nhóm', 'Giới thiệu bạn bè đến'],
        culturalObservations: ['Biết uống cà phê sáng', 'Trò chuyện với khách khác', 'Chia sẻ tin tức địa phương']
      },
      {
        verifierId: '4',
        verifierName: 'Cô Hạnh (trưởng nhóm phụ nữ)',
        verifierAvatar: '/vietnamese-user.png',
        verifierLevel: 'Lãnh đạo cộng đồng',
        relationship: 'community_leader',
        verificationDate: new Date('2024-01-08'),
        confidence: 'certain',
        timeKnown: 15,
        interactions: ['Tham gia họp phụ nữ', 'Đóng góp từ thiện', 'Tổ chức hoạt động phường'],
        culturalObservations: ['Hiểu truyền thống địa phương', 'Tôn trọng thứ bậc', 'Tích cực trong cộng đồng']
      },
      {
        verifierId: '5',
        verifierName: 'Chú Tám (bảo vệ tòa nhà)',
        verifierAvatar: '/vietnamese-elderly-man.png',
        verifierLevel: 'Hàng xóm tốt',
        relationship: 'street_neighbor',
        verificationDate: new Date('2024-01-14'),
        confidence: 'certain',
        timeKnown: 18,
        interactions: ['Chào hỏi ra vào', 'Nhận hàng khi vắng nhà', 'Chat về thời tiết'],
        culturalObservations: ['Giờ giấc đều đặn', 'Ăn mặc lịch sự', 'Quan tâm an ninh chung']
      }
    ],
    selfReported: [
      {
        type: 'daily_routine',
        description: 'Dạy piano tại nhà từ 2-5PM hàng ngày',
        frequency: 'daily',
        locations: ['Nhà riêng - 123 Nguyễn Du'],
        witnesses: ['Bà Lan (nghe tiếng piano)', 'Học trò các em nhỏ']
      },
      {
        type: 'local_shopping',
        description: 'Mua thực phẩm tại chợ Bến Thành và siêu thị gần nhà',
        frequency: 'weekly',
        locations: ['Chợ Bến Thành', 'Coopmart Nguyễn Du'],
        witnesses: ['Cô Hạnh (gặp ở chợ)', 'Anh bán thịt chợ Bến Thành']
      },
      {
        type: 'community_events',
        description: 'Tham gia họp phụ nữ phường và hoạt động từ thiện',
        frequency: 'monthly',
        locations: ['Trụ sở ủy ban phường', 'Nhà văn hóa'],
        witnesses: ['Cô Hạnh', 'Các chị trong nhóm phụ nữ']
      }
    ],
    observedByOthers: [
      {
        observerId: '2',
        observerName: 'Bà Lan',
        activityType: 'coming_going',
        observationDate: new Date('2024-02-10'),
        description: 'Thấy chị Hương ra về đều đặn, có học trò đến học piano',
        location: '123 Nguyễn Du',
        reliability: 10
      },
      {
        observerId: '3',
        observerName: 'Anh Minh',
        activityType: 'community_events',
        observationDate: new Date('2024-02-05'),
        description: 'Chị Hương đến quán với nhóm chị em phụ nữ sau họp phường',
        location: 'Quán cà phê Minh',
        reliability: 9
      }
    ],
    communityIntegration: {
      localKnowledge: {
        score: 85,
        examples: [
          'Biết đường đi ngắn nhất đến chợ Bến Thành',
          'Hiểu giờ cao điểm giao thông',
          'Biết lịch thu gom rác',
          'Quen với cửa hàng địa phương'
        ]
      },
      socialConnections: {
        score: 90,
        relationships: 12
      },
      culturalParticipation: {
        score: 88,
        activities: [
          'Tham gia cúng rằm với hàng xóm',
          'Đóng góp tiền lì xì tết cho trẻ em',
          'Giúp dọn dẹp đường phố ngày lễ',
          'Tham gia nhóm phụ nữ phường'
        ]
      },
      localContributions: {
        score: 92,
        contributions: [
          'Dạy piano miễn phí cho trẻ em khó khăn',
          'Tổ chức buổi hòa nhạc mini trong phường',
          'Đóng góp từ thiện cho gia đình nghèo',
          'Giúp đỡ hàng xóm có việc đột xuất'
        ]
      }
    }
  }
}

const confidenceConfig = {
  certain: { color: 'bg-green-100 text-green-700', label: 'Chắc chắn', score: 100 },
  very_likely: { color: 'bg-blue-100 text-blue-700', label: 'Rất khả năng', score: 85 },
  likely: { color: 'bg-yellow-100 text-yellow-700', label: 'Có khả năng', score: 70 },
  uncertain: { color: 'bg-red-100 text-red-700', label: 'Không chắc', score: 40 }
}

const relationshipConfig = {
  direct_neighbor: { icon: Home, label: 'Hàng xóm trực tiếp', weight: 100 },
  street_neighbor: { icon: MapPin, label: 'Hàng xóm cùng đường', weight: 85 },
  ward_resident: { icon: Building, label: 'Cư dân cùng phường', weight: 70 },
  local_business: { icon: Coffee, label: 'Thương gia địa phương', weight: 80 },
  community_leader: { icon: Award, label: 'Lãnh đạo cộng đồng', weight: 95 }
}

interface NeighborhoodDnaVerificationProps {
  className?: string
}

export function NeighborhoodDnaVerification({ className = "" }: NeighborhoodDnaVerificationProps) {
  const [viewMode, setViewMode] = useState<'overview' | 'verifiers' | 'activities' | 'integration'>('overview')
  const [selectedVerifier, setSelectedVerifier] = useState<string | null>(null)

  const person = mockPersonForVerification

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 75) return 'text-blue-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100'
    if (score >= 75) return 'bg-blue-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-600" />
          Xác minh DNA Khu Phố
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            <TreePine className="w-3 h-3 mr-1" />
            Không thể làm giả
          </Badge>
          <Badge variant="outline" className="text-xs">
            Xác minh bởi hàng xóm thật
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Person Overview */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={person.avatar} alt={person.fullName} />
              <AvatarFallback>{person.fullName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{person.fullName}</h3>
              <p className="text-gray-600">{person.address}, {person.wardName}</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="outline" className="text-xs">
                  {person.residencyStatus === 'owner' ? 'Chủ nhà' : 
                   person.residencyStatus === 'renter' ? 'Thuê nhà' :
                   person.residencyStatus === 'family_member' ? 'Thành viên gia đình' :
                   person.residencyStatus === 'business_owner' ? 'Chủ kinh doanh' : 'Nhân viên'}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{person.timeInNeighborhood} tháng tại đây</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={cn("text-3xl font-bold", getScoreColor(person.verification.overallScore))}>
                {person.verification.overallScore}
              </div>
              <div className="text-sm text-gray-600">Điểm xác minh</div>
              {person.verification.isVerified && (
                <Badge className="bg-green-100 text-green-700 mt-2">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Đã xác minh
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'overview' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('overview')}
          >
            Tổng quan
          </Button>
          <Button
            variant={viewMode === 'verifiers' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('verifiers')}
          >
            Người xác minh ({person.verification.verifiers.length})
          </Button>
          <Button
            variant={viewMode === 'activities' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('activities')}
          >
            Hoạt động
          </Button>
          <Button
            variant={viewMode === 'integration' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('integration')}
          >
            Hòa nhập
          </Button>
        </div>

        {viewMode === 'overview' && (
          <div className="space-y-4">
            {/* Verification Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded">
                <div className="text-xl font-bold text-blue-600">{person.verification.verifiers.length}</div>
                <div className="text-sm text-gray-600">Người xác minh</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded">
                <div className="text-xl font-bold text-green-600">{person.verification.communityIntegration.socialConnections.relationships}</div>
                <div className="text-sm text-gray-600">Mối quan hệ</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded">
                <div className="text-xl font-bold text-purple-600">{person.verification.observedByOthers.length}</div>
                <div className="text-sm text-gray-600">Quan sát</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded">
                <div className="text-xl font-bold text-orange-600">{person.timeInNeighborhood}</div>
                <div className="text-sm text-gray-600">Tháng ở đây</div>
              </div>
            </div>

            {/* Top Verifiers */}
            <div>
              <h4 className="font-semibold mb-3">Người xác minh chính</h4>
              <div className="space-y-2">
                {person.verification.verifiers.slice(0, 3).map((verifier) => {
                  const relationConf = relationshipConfig[verifier.relationship]
                  const confidenceConf = confidenceConfig[verifier.confidence]
                  const RelationIcon = relationConf.icon

                  return (
                    <div key={verifier.verifierId} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={verifier.verifierAvatar} alt={verifier.verifierName} />
                        <AvatarFallback>{verifier.verifierName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{verifier.verifierName}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <RelationIcon className="w-4 h-4" />
                          <span>{relationConf.label}</span>
                          <span>•</span>
                          <span>Biết {verifier.timeKnown} tháng</span>
                        </div>
                      </div>
                      <Badge className={confidenceConf.color}>
                        {confidenceConf.label}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Integration Scores */}
            <div>
              <h4 className="font-semibold mb-3">Mức độ hòa nhập cộng đồng</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Hiểu biết địa phương</span>
                  <div className="flex items-center gap-2">
                    <Progress value={person.verification.communityIntegration.localKnowledge.score} className="w-24" />
                    <span className={cn("font-medium", getScoreColor(person.verification.communityIntegration.localKnowledge.score))}>
                      {person.verification.communityIntegration.localKnowledge.score}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Kết nối xã hội</span>
                  <div className="flex items-center gap-2">
                    <Progress value={person.verification.communityIntegration.socialConnections.score} className="w-24" />
                    <span className={cn("font-medium", getScoreColor(person.verification.communityIntegration.socialConnections.score))}>
                      {person.verification.communityIntegration.socialConnections.score}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tham gia văn hóa</span>
                  <div className="flex items-center gap-2">
                    <Progress value={person.verification.communityIntegration.culturalParticipation.score} className="w-24" />
                    <span className={cn("font-medium", getScoreColor(person.verification.communityIntegration.culturalParticipation.score))}>
                      {person.verification.communityIntegration.culturalParticipation.score}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Đóng góp địa phương</span>
                  <div className="flex items-center gap-2">
                    <Progress value={person.verification.communityIntegration.localContributions.score} className="w-24" />
                    <span className={cn("font-medium", getScoreColor(person.verification.communityIntegration.localContributions.score))}>
                      {person.verification.communityIntegration.localContributions.score}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'verifiers' && (
          <div className="space-y-4">
            {person.verification.verifiers.map((verifier) => {
              const relationConf = relationshipConfig[verifier.relationship]
              const confidenceConf = confidenceConfig[verifier.confidence]
              const RelationIcon = relationConf.icon

              return (
                <Card key={verifier.verifierId} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={verifier.verifierAvatar} alt={verifier.verifierName} />
                        <AvatarFallback>{verifier.verifierName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{verifier.verifierName}</h4>
                          <Badge variant="outline" className="text-xs">{verifier.verifierLevel}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <RelationIcon className="w-4 h-4" />
                            <span>{relationConf.label}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>Biết {verifier.timeKnown} tháng</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>Xác minh {verifier.verificationDate.toLocaleDateString('vi-VN')}</span>
                          </div>
                          <Badge className={confidenceConf.color}>
                            {confidenceConf.label}
                          </Badge>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <h5 className="text-sm font-medium mb-2">Tương tác đã biết:</h5>
                            <div className="flex flex-wrap gap-1">
                              {verifier.interactions.map((interaction, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {interaction}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h5 className="text-sm font-medium mb-2">Quan sát văn hóa:</h5>
                            <div className="flex flex-wrap gap-1">
                              {verifier.culturalObservations.map((observation, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                                  {observation}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {verifier.verificationNote && (
                            <div className="p-3 bg-blue-50 rounded text-sm text-blue-800">
                              <strong>Ghi chú:</strong> {verifier.verificationNote}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {viewMode === 'activities' && (
          <div className="space-y-6">
            {/* Self-Reported Activities */}
            <div>
              <h4 className="font-semibold mb-3">Hoạt động tự báo cáo</h4>
              <div className="space-y-3">
                {person.verification.selfReported.map((activity, idx) => (
                  <Card key={idx} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium mb-1">{activity.description}</h5>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span>Tần suất: {activity.frequency === 'daily' ? 'Hàng ngày' : 
                                           activity.frequency === 'weekly' ? 'Hàng tuần' :
                                           activity.frequency === 'monthly' ? 'Hàng tháng' : 'Theo mùa'}</span>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <span className="text-sm font-medium">Địa điểm: </span>
                              <span className="text-sm text-gray-600">{activity.locations.join(', ')}</span>
                            </div>
                            {activity.witnesses && (
                              <div>
                                <span className="text-sm font-medium">Nhân chứng: </span>
                                <span className="text-sm text-gray-600">{activity.witnesses.join(', ')}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Observed by Others */}
            <div>
              <h4 className="font-semibold mb-3">Quan sát bởi hàng xóm</h4>
              <div className="space-y-3">
                {person.verification.observedByOthers.map((observation, idx) => (
                  <Card key={idx} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Eye className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium">{observation.observerName}</h5>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm">{observation.reliability}/10</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{observation.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{observation.observationDate.toLocaleDateString('vi-VN')}</span>
                            <span>📍 {observation.location}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {viewMode === 'integration' && (
          <div className="space-y-6">
            {/* Local Knowledge */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Hiểu biết địa phương</h4>
                <div className={cn("px-3 py-1 rounded text-sm font-medium", getScoreBgColor(person.verification.communityIntegration.localKnowledge.score), getScoreColor(person.verification.communityIntegration.localKnowledge.score))}>
                  {person.verification.communityIntegration.localKnowledge.score}/100
                </div>
              </div>
              <div className="space-y-2">
                {person.verification.communityIntegration.localKnowledge.examples.map((example, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{example}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cultural Participation */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Tham gia văn hóa</h4>
                <div className={cn("px-3 py-1 rounded text-sm font-medium", getScoreBgColor(person.verification.communityIntegration.culturalParticipation.score), getScoreColor(person.verification.communityIntegration.culturalParticipation.score))}>
                  {person.verification.communityIntegration.culturalParticipation.score}/100
                </div>
              </div>
              <div className="space-y-2">
                {person.verification.communityIntegration.culturalParticipation.activities.map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Heart className="w-4 h-4 text-pink-600" />
                    <span>{activity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Local Contributions */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Đóng góp địa phương</h4>
                <div className={cn("px-3 py-1 rounded text-sm font-medium", getScoreBgColor(person.verification.communityIntegration.localContributions.score), getScoreColor(person.verification.communityIntegration.localContributions.score))}>
                  {person.verification.communityIntegration.localContributions.score}/100
                </div>
              </div>
              <div className="space-y-2">
                {person.verification.communityIntegration.localContributions.contributions.map((contribution, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>{contribution}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Anti-BigTech Explanation */}
        <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Tại sao hệ thống này không thể làm giả?
          </h4>
          <div className="text-sm text-purple-700 space-y-2">
            <p><strong>Xác minh vật lý:</strong> Cần có mặt thật sự ở khu phố để được hàng xóm biết đến</p>
            <p><strong>Thời gian xây dựng:</strong> Mối quan hệ được hình thành qua nhiều tháng, không thể tạo ngay</p>
            <p><strong>Quan sát đa chiều:</strong> Nhiều người xác minh từ các góc độ khác nhau</p>
            <p><strong>Văn hóa Việt Nam:</strong> Hiểu biết về phong tục, tập quán chỉ có qua sống thật</p>
            <p><strong>Mạng lưới thực:</strong> Bot không thể tạo ra mối quan hệ xã hội thật sự</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}