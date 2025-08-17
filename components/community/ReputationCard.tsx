"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { 
  ContributionPoints, 
  UserBadge, 
  getUserLevel, 
  getNextLevel, 
  getProgressToNextLevel 
} from "@/lib/contribution-system"
import { 
  Star, 
  Trophy, 
  TrendingUp, 
  Users, 
  Award,
  Crown,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ReputationCardProps {
  points: ContributionPoints
  badges: UserBadge[]
  className?: string
  compact?: boolean
  onViewProfile?: () => void
}

export function ReputationCard({ 
  points, 
  badges, 
  className = "",
  compact = false,
  onViewProfile 
}: ReputationCardProps) {
  const currentLevel = getUserLevel(points.total)
  const nextLevel = getNextLevel(points.total)
  const progress = getProgressToNextLevel(points.total)
  
  const topBadges = badges
    .filter(b => b.rarity === 'legendary' || b.rarity === 'rare')
    .slice(0, 3)

  const getLevelIcon = (levelId: string) => {
    switch (levelId) {
      case 'newcomer': return <Users className="w-4 h-4" />
      case 'good_neighbor': return <Star className="w-4 h-4" />
      case 'community_expert': return <Award className="w-4 h-4" />
      case 'master_teacher': return <Trophy className="w-4 h-4" />
      case 'community_guide': return <Crown className="w-4 h-4" />
      default: return <Users className="w-4 h-4" />
    }
  }

  const getLevelColor = (color: string) => {
    switch (color) {
      case 'gray': return 'text-gray-600 bg-gray-100'
      case 'blue': return 'text-blue-600 bg-blue-100'
      case 'emerald': return 'text-emerald-600 bg-emerald-100'
      case 'purple': return 'text-purple-600 bg-purple-100'
      case 'gold': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  if (compact) {
    return (
      <Card className={cn("hover:shadow-md transition-shadow", className)}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                getLevelColor(currentLevel.color)
              )}>
                {getLevelIcon(currentLevel.id)}
              </div>
              <div>
                <h3 className="font-semibold text-sm">{currentLevel.nameVi}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span>{points.total.toLocaleString()} điểm</span>
                  {topBadges.length > 0 && (
                    <>
                      <span>•</span>
                      <span>{topBadges.length} huy hiệu</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {onViewProfile && (
              <Button variant="ghost" size="sm" onClick={onViewProfile}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {nextLevel && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Tiến độ đến {nextLevel.nameVi}</span>
                <span>{Math.round(progress.percentage)}%</span>
              </div>
              <Progress value={progress.percentage} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-emerald-600" />
          Danh tiếng cộng đồng
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Cấp độ hiện tại */}
        <div className="text-center">
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3",
            getLevelColor(currentLevel.color)
          )}>
            {getLevelIcon(currentLevel.id)}
          </div>
          <h3 className="text-xl font-bold text-gray-900">{currentLevel.nameVi}</h3>
          <p className="text-sm text-gray-600 mb-2">{currentLevel.descriptionVi}</p>
          <Badge variant="secondary" className="text-sm">
            {points.total.toLocaleString()} điểm đóng góp
          </Badge>
        </div>

        {/* Tiến độ lên cấp tiếp theo */}
        {nextLevel && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Tiến độ đến {nextLevel.nameVi}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round(progress.percentage)}%
              </span>
            </div>
            <Progress value={progress.percentage} className="h-3 mb-2" />
            <p className="text-xs text-gray-500 text-center">
              Cần thêm {nextLevel.minPoints - points.total} điểm
            </p>
          </div>
        )}

        {/* Huy hiệu nổi bật */}
        {topBadges.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Huy hiệu nổi bật
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {topBadges.map((badge) => (
                <div 
                  key={badge.id}
                  className="text-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  title={badge.descriptionVi}
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-xs font-medium text-gray-700 truncate">
                    {badge.nameVi}
                  </div>
                </div>
              ))}
            </div>
            
            {badges.length > 3 && (
              <Button variant="ghost" size="sm" className="w-full mt-2" onClick={onViewProfile}>
                Xem tất cả {badges.length} huy hiệu
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        )}

        {/* Chi tiết điểm đóng góp */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Đóng góp chi tiết
          </h4>
          <div className="space-y-2">
            {Object.entries(points.breakdown).map(([key, value]) => {
              if (value === 0) return null
              
              const labels: Record<string, string> = {
                reviews: 'Đánh giá',
                photos: 'Hình ảnh',
                tutorials: 'Hướng dẫn',
                mentoring: 'Cố vấn',
                verification: 'Xác minh',
                moderation: 'Kiểm duyệt',
                events: 'Sự kiện',
                localIntelligence: 'Thông tin địa phương'
              }
              
              return (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{labels[key]}</span>
                  <Badge variant="outline" className="text-xs">
                    {value} điểm
                  </Badge>
                </div>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        {onViewProfile && (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onViewProfile}
          >
            Xem hồ sơ đầy đủ
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </CardContent>
    </Card>
  )
}