"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { 
  ContributionPoints, 
  CONTRIBUTION_ACTIVITIES,
  awardPoints,
  getUserLevel,
  getNextLevel,
  checkBadgeEligibility,
  UserBadge
} from "@/lib/contribution-system"
import { 
  Plus, 
  Star, 
  Camera, 
  BookOpen, 
  Users, 
  Shield, 
  Flag,
  Award,
  Sparkles,
  TrendingUp
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ContributionTrackerProps {
  currentPoints: ContributionPoints
  currentBadges: UserBadge[]
  onPointsUpdate: (points: ContributionPoints) => void
  onBadgeEarned: (badge: Omit<UserBadge, 'earnedAt'>) => void
  className?: string
}

interface ActivityOption {
  key: keyof typeof CONTRIBUTION_ACTIVITIES
  icon: React.ReactNode
  color: string
  description: string
}

const ACTIVITY_OPTIONS: ActivityOption[] = [
  {
    key: 'ADD_PHOTOS',
    icon: <Camera className="w-4 h-4" />,
    color: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    description: 'Thêm ảnh trước/sau cho dịch vụ'
  },
  {
    key: 'WRITE_TUTORIAL',
    icon: <BookOpen className="w-4 h-4" />,
    color: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
    description: 'Viết hướng dẫn chi tiết'
  },
  {
    key: 'HOST_SKILL_SESSION',
    icon: <Users className="w-4 h-4" />,
    color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200',
    description: 'Tổ chức buổi chia sẻ kỹ năng'
  },
  {
    key: 'VERIFY_NEIGHBOR',
    icon: <Shield className="w-4 h-4" />,
    color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
    description: 'Xác minh hàng xóm'
  },
  {
    key: 'VOTE_AUTHENTIC_REVIEW',
    icon: <Star className="w-4 h-4" />,
    color: 'bg-orange-100 text-orange-700 hover:bg-orange-200',
    description: 'Bình chọn đánh giá chân thực'
  },
  {
    key: 'HOST_TEA_CIRCLE',
    icon: <Users className="w-4 h-4" />,
    color: 'bg-green-100 text-green-700 hover:bg-green-200',
    description: 'Tổ chức vòng tròn trà'
  }
]

export function ContributionTracker({
  currentPoints,
  currentBadges,
  onPointsUpdate,
  onBadgeEarned,
  className = ""
}: ContributionTrackerProps) {
  const { toast } = useToast()
  const [recentActivity, setRecentActivity] = useState<string[]>([])
  const [showProgress, setShowProgress] = useState(false)

  const currentLevel = getUserLevel(currentPoints.total)
  const nextLevel = getNextLevel(currentPoints.total)

  const handleContribution = (activityKey: keyof typeof CONTRIBUTION_ACTIVITIES) => {
    const activity = CONTRIBUTION_ACTIVITIES[activityKey]
    const newPoints = awardPoints(currentPoints, activityKey)
    
    // Check for level up
    const oldLevel = getUserLevel(currentPoints.total)
    const newLevel = getUserLevel(newPoints.total)
    const leveledUp = newLevel.id !== oldLevel.id

    // Check for new badges
    const newBadges = checkBadgeEligibility(newPoints, {}, currentBadges)

    // Update points
    onPointsUpdate(newPoints)

    // Award new badges
    newBadges.forEach(badge => {
      onBadgeEarned(badge)
    })

    // Add to recent activity
    setRecentActivity(prev => [activity.nameVi, ...prev.slice(0, 4)])

    // Show progress animation
    setShowProgress(true)
    setTimeout(() => setShowProgress(false), 2000)

    // Show success toast
    toast({
      title: `+${activity.points} điểm!`,
      description: activity.nameVi,
      duration: 3000,
    })

    // Show level up notification
    if (leveledUp) {
      toast({
        title: "🎉 Thăng cấp!",
        description: `Chúc mừng! Bạn đã đạt cấp ${newLevel.nameVi}`,
        duration: 5000,
      })
    }

    // Show badge notifications
    newBadges.forEach(badge => {
      toast({
        title: "🏆 Huy hiệu mới!",
        description: `Bạn đã nhận được huy hiệu "${badge.nameVi}"`,
        duration: 5000,
      })
    })
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          Đóng góp cộng đồng
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Tiến độ cấp độ hiện tại */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Badge variant="secondary" className="text-sm">
              {currentLevel.nameVi}
            </Badge>
            <span className="text-sm text-gray-600">
              {currentPoints.total.toLocaleString()} điểm
            </span>
          </div>
          
          {nextLevel && (
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Tiến độ đến {nextLevel.nameVi}</span>
                <span>{nextLevel.minPoints - currentPoints.total} điểm còn lại</span>
              </div>
              <Progress 
                value={((currentPoints.total - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100}
                className={cn("h-2 transition-all duration-1000", showProgress && "animate-pulse")}
              />
            </div>
          )}
        </div>

        {/* Hoạt động đóng góp */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Hoạt động đóng góp
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {ACTIVITY_OPTIONS.map((option) => {
              const activity = CONTRIBUTION_ACTIVITIES[option.key]
              if (!activity) return null // Skip if activity doesn't exist
              
              return (
                <Button
                  key={option.key}
                  variant="ghost"
                  className={cn(
                    "h-auto p-3 flex flex-col items-center gap-2 text-center transition-all",
                    option.color
                  )}
                  onClick={() => handleContribution(option.key)}
                >
                  {option.icon}
                  <div>
                    <div className="text-xs font-medium">{activity.nameVi}</div>
                    <div className="text-xs opacity-80">+{activity.points} điểm</div>
                  </div>
                </Button>
              )
            })}
          </div>
        </div>

        {/* Hoạt động gần đây */}
        {recentActivity.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Hoạt động gần đây
            </h4>
            <div className="space-y-1">
              {recentActivity.map((activity, index) => (
                <div 
                  key={index}
                  className="text-xs text-gray-600 flex items-center gap-2 p-2 bg-gray-50 rounded"
                >
                  <Award className="w-3 h-3 text-emerald-600" />
                  {activity}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Thống kê nhanh */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-600">
              {currentPoints.breakdown.reviews + currentPoints.breakdown.photos}
            </div>
            <div className="text-xs text-gray-600">Nội dung</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {currentPoints.breakdown.verification + currentPoints.breakdown.moderation}
            </div>
            <div className="text-xs text-gray-600">Chất lượng</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">
              {currentPoints.breakdown.mentoring + currentPoints.breakdown.events}
            </div>
            <div className="text-xs text-gray-600">Cộng đồng</div>
          </div>
        </div>

        {/* Thông điệp động viên */}
        <div className="text-center p-3 bg-emerald-50 rounded-lg">
          <p className="text-sm text-emerald-700">
            {currentLevel.id === 'newcomer' 
              ? "Bắt đầu đóng góp để trở thành thành viên tích cực!" 
              : currentLevel.id === 'community_guide'
              ? "Bạn là một người dẫn đường xuất sắc của cộng đồng!"
              : "Tiếp tục đóng góp để thăng cấp và nhận thêm huy hiệu!"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}