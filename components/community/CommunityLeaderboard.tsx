"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContributionPoints, getUserLevel } from "@/lib/contribution-system"
import { 
  Trophy, 
  Medal, 
  Award, 
  TrendingUp, 
  Users, 
  MapPin,
  Crown,
  Star,
  Calendar
} from "lucide-react"
import { cn } from "@/lib/utils"

interface LeaderboardUser {
  id: string
  name: string
  avatar?: string
  points: ContributionPoints
  location: string
  joinedDate: string
  specialties: string[]
  weeklyPoints: number
  monthlyPoints: number
}

interface CommunityLeaderboardProps {
  users: LeaderboardUser[]
  currentUserId?: string
  wardName?: string
  className?: string
}

// Mock data for demonstration
const mockLeaderboardUsers: LeaderboardUser[] = [
  {
    id: "1",
    name: "Nguyễn Văn Minh",
    avatar: "/vietnamese-technician.png",
    points: {
      total: 3420,
      breakdown: {
        reviews: 120,
        photos: 450,
        tutorials: 800,
        mentoring: 1200,
        verification: 350,
        moderation: 200,
        events: 300,
        localIntelligence: 0
      }
    },
    location: "Quận 1, TP.HCM",
    joinedDate: "2023-03-15",
    specialties: ["Điện", "Tư vấn an toàn"],
    weeklyPoints: 85,
    monthlyPoints: 320
  },
  {
    id: "2", 
    name: "Lê Thị Hương",
    avatar: "/vietnamese-user.png",
    points: {
      total: 2890,
      breakdown: {
        reviews: 200,
        photos: 180,
        tutorials: 600,
        mentoring: 1500,
        verification: 210,
        moderation: 100,
        events: 100,
        localIntelligence: 0
      }
    },
    location: "Quận 3, TP.HCM", 
    joinedDate: "2023-01-20",
    specialties: ["Piano", "Âm nhạc"],
    weeklyPoints: 72,
    monthlyPoints: 280
  },
  {
    id: "3",
    name: "Trần Minh Đức", 
    avatar: "/vietnamese-technician.png",
    points: {
      total: 2456,
      breakdown: {
        reviews: 150,
        photos: 200,
        tutorials: 400,
        mentoring: 800,
        verification: 500,
        moderation: 300,
        events: 106,
        localIntelligence: 0
      }
    },
    location: "Quận 7, TP.HCM",
    joinedDate: "2023-02-10", 
    specialties: ["IT", "Máy tính"],
    weeklyPoints: 58,
    monthlyPoints: 245
  }
]

export function CommunityLeaderboard({ 
  users = mockLeaderboardUsers, 
  currentUserId,
  wardName = "Quận 1",
  className = ""
}: CommunityLeaderboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'all' | 'monthly' | 'weekly'>('all')

  const getSortedUsers = () => {
    switch (selectedPeriod) {
      case 'weekly':
        return [...users].sort((a, b) => b.weeklyPoints - a.weeklyPoints)
      case 'monthly':
        return [...users].sort((a, b) => b.monthlyPoints - a.monthlyPoints)
      default:
        return [...users].sort((a, b) => b.points.total - a.points.total)
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />
      case 2: return <Medal className="w-5 h-5 text-gray-400" />
      case 3: return <Award className="w-5 h-5 text-amber-600" />
      default: return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>
    }
  }

  const getPoints = (user: LeaderboardUser) => {
    switch (selectedPeriod) {
      case 'weekly': return user.weeklyPoints
      case 'monthly': return user.monthlyPoints
      default: return user.points.total
    }
  }

  const sortedUsers = getSortedUsers()

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-emerald-600" />
          Bảng xếp hạng cộng đồng
          {wardName && (
            <Badge variant="outline" className="ml-2">
              <MapPin className="w-3 h-3 mr-1" />
              {wardName}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Tabs value={selectedPeriod} onValueChange={(v) => setSelectedPeriod(v as any)}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all" className="text-xs">
              <Trophy className="w-3 h-3 mr-1" />
              Tổng cộng
            </TabsTrigger>
            <TabsTrigger value="monthly" className="text-xs">
              <Calendar className="w-3 h-3 mr-1" />
              Tháng này
            </TabsTrigger>
            <TabsTrigger value="weekly" className="text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              Tuần này
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedPeriod} className="space-y-3">
            {sortedUsers.map((user, index) => {
              const rank = index + 1
              const level = getUserLevel(user.points.total)
              const points = getPoints(user)
              const isCurrentUser = user.id === currentUserId

              return (
                <div
                  key={user.id}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-lg border transition-all",
                    isCurrentUser 
                      ? "bg-emerald-50 border-emerald-200 ring-2 ring-emerald-500 ring-opacity-20" 
                      : "bg-white hover:bg-gray-50",
                    rank <= 3 && "shadow-sm"
                  )}
                >
                  {/* Rank */}
                  <div className="flex-shrink-0 w-8 flex justify-center">
                    {getRankIcon(rank)}
                  </div>

                  {/* Avatar */}
                  <Avatar className={cn(
                    "w-12 h-12 ring-2",
                    rank === 1 ? "ring-yellow-200" : 
                    rank === 2 ? "ring-gray-200" :
                    rank === 3 ? "ring-amber-200" : "ring-gray-100"
                  )}>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-700">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={cn(
                        "font-semibold truncate",
                        isCurrentUser ? "text-emerald-700" : "text-gray-900"
                      )}>
                        {user.name}
                        {isCurrentUser && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            Bạn
                          </Badge>
                        )}
                      </h4>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "text-xs px-2 py-0.5",
                          level.color === 'gold' ? "bg-yellow-100 text-yellow-700" :
                          level.color === 'purple' ? "bg-purple-100 text-purple-700" :
                          level.color === 'emerald' ? "bg-emerald-100 text-emerald-700" :
                          level.color === 'blue' ? "bg-blue-100 text-blue-700" :
                          "bg-gray-100 text-gray-700"
                        )}
                      >
                        {level.nameVi}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {user.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span>{user.specialties.slice(0, 2).join(", ")}</span>
                      {user.specialties.length > 2 && (
                        <span>+{user.specialties.length - 2} khác</span>
                      )}
                    </div>
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <div className={cn(
                      "text-lg font-bold",
                      rank === 1 ? "text-yellow-600" :
                      rank === 2 ? "text-gray-600" :
                      rank === 3 ? "text-amber-600" :
                      isCurrentUser ? "text-emerald-600" : "text-gray-900"
                    )}>
                      {points.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {selectedPeriod === 'all' ? 'tổng điểm' :
                       selectedPeriod === 'monthly' ? 'điểm/tháng' : 'điểm/tuần'}
                    </div>
                  </div>
                </div>
              )
            })}
          </TabsContent>
        </Tabs>

        {/* Thống kê cộng đồng */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-emerald-600">{users.length}</div>
              <div className="text-xs text-gray-600">Thành viên tích cực</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">
                {users.reduce((sum, u) => sum + u.points.total, 0).toLocaleString()}
              </div>
              <div className="text-xs text-gray-600">Tổng điểm đóng góp</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">
                {Math.round(users.reduce((sum, u) => sum + u.points.total, 0) / users.length)}
              </div>
              <div className="text-xs text-gray-600">Điểm trung bình</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm">
            <Users className="w-4 h-4 mr-2" />
            Tham gia đóng góp cộng đồng
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}