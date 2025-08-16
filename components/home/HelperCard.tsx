"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  MapPin,
  Star,
  MessageCircle,
  UserPlus,
  Heart,
  Share2,
  Clock,
  Users,
  CheckCircle,
  Zap,
  TrendingUp,
  Award,
} from "lucide-react"

interface HelperCardProps {
  helper: {
    id: number
    name: string
    title: string
    location: string
    distance: string
    rating: number
    helpedPeople: number
    contributions: number
    avatar: string
    verified: boolean
    isOnline: boolean
    responseTime: string
    neighborEndorsements: number
    lastActive: string
    availableToHelp: boolean
    connectionStatus: string
    canHelp: string[]
    recentShare: string
    mutualConnections: string[]
    helpedThisMonth: number
    personality: string
  }
  variant?: "default" | "compact" | "featured"
}

export function HelperCard({ helper, variant = "default" }: HelperCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const router = useRouter()

  const handleConnect = () => {
    setIsConnecting(true)
    // Simulate connection
    setTimeout(() => setIsConnecting(false), 1000)
  }

  const handleViewProfile = () => {
    router.push('/profile')
  }

  if (variant === "compact") {
    return (
      <Card className="hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-emerald-200 cursor-pointer group">
        <CardContent className="p-4" onClick={handleViewProfile}>
          <div className="flex gap-3">
            <div className="relative">
              <Avatar className="w-16 h-16 border-2 border-emerald-100">
                <AvatarImage src={helper.avatar} alt={helper.name} />
                <AvatarFallback className="bg-emerald-50 text-emerald-700 font-semibold">
                  {helper.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              {helper.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 truncate group-hover:text-emerald-600 transition-colors">
                    {helper.name}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">{helper.title}</p>
                </div>
                {helper.verified && (
                  <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 ml-2" />
                )}
              </div>
              
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{helper.distance}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-gray-900">{helper.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{helper.responseTime}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 text-xs">
                  {helper.canHelp[0]}
                </Badge>
                <Button size="sm" variant="outline" className="text-xs h-7 px-3">
                  Xem
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === "featured") {
    return (
      <Card className="hover:shadow-xl transition-all duration-300 border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 cursor-pointer group">
        <CardContent className="p-6" onClick={handleViewProfile}>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <Badge className="bg-emerald-600 text-white">Được đề xuất</Badge>
          </div>
          
          <div className="flex gap-4 mb-4">
            <div className="relative">
              <Avatar className="w-20 h-20 border-3 border-white shadow-lg">
                <AvatarImage src={helper.avatar} alt={helper.name} />
                <AvatarFallback className="bg-emerald-600 text-white font-bold text-lg">
                  {helper.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              {helper.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-3 border-white rounded-full" />
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">
                {helper.name}
              </h3>
              <p className="text-gray-700 font-medium mb-2">{helper.title}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{helper.distance}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">{helper.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{helper.helpedPeople} người</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <MessageCircle className="w-4 h-4 mr-2" />
              Nhắn tin
            </Button>
            <Button size="sm" variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
              <UserPlus className="w-4 h-4 mr-2" />
              Kết nối
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-emerald-200 cursor-pointer group">
      <CardContent className="p-6">
        {/* Header Section */}
        <div className="flex gap-4 mb-4">
          <div className="relative">
            <Avatar className="w-16 h-16 border-2 border-emerald-100 cursor-pointer" onClick={handleViewProfile}>
              <AvatarImage src={helper.avatar} alt={helper.name} />
              <AvatarFallback className="bg-emerald-50 text-emerald-700 font-semibold">
                {helper.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            {helper.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full" />
            )}
            {helper.verified && (
              <CheckCircle className="absolute -top-1 -right-1 w-5 h-5 text-blue-500 bg-white rounded-full" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 truncate cursor-pointer group-hover:text-emerald-600 transition-colors" onClick={handleViewProfile}>
                  {helper.name}
                </h3>
                <p className="text-gray-600">{helper.title}</p>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className="h-8 w-8 p-0"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Share2 className="w-4 h-4 text-gray-400" />
                </Button>
              </div>
            </div>
            
            {/* Stats Row */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{helper.location} • {helper.distance}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-900">{helper.rating}</span>
                <span>({helper.helpedPeople})</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Phản hồi {helper.responseTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {helper.canHelp.slice(0, 3).map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                {skill}
              </Badge>
            ))}
            {helper.canHelp.length > 3 && (
              <Badge variant="outline" className="text-gray-500">
                +{helper.canHelp.length - 3} khác
              </Badge>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700 italic">"{helper.recentShare}"</p>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Award className="w-3 h-3" />
              <span>{helper.neighborEndorsements} hàng xóm tin tưởng</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              <span>Giúp {helper.helpedThisMonth} người tháng này</span>
            </div>
          </div>
          <span className="text-green-600 font-medium">{helper.lastActive}</span>
        </div>

        {/* Mutual Connections */}
        {helper.mutualConnections.length > 0 && (
          <div className="mb-4 text-xs text-gray-600">
            <span>Bạn chung: {helper.mutualConnections.join(", ")}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            size="sm" 
            className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1"
            onClick={(e) => {
              e.stopPropagation()
              // Handle message action
            }}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Nhắn tin
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 flex-1"
            onClick={(e) => {
              e.stopPropagation()
              handleConnect()
            }}
            disabled={isConnecting}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            {isConnecting ? "Đang kết nối..." : "Kết nối"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}