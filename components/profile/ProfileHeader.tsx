"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  MessageCircle,
  UserPlus,
  Share2,
  MoreHorizontal,
  MapPin,
  Users,
  Star,
  Shield,
  CheckCircle,
  Edit3,
} from "lucide-react"

interface ProfileHeaderProps {
  user: {
    name: string
    title: string
    location: string
    connections: number
    rating: number
    reviews: number
    isVerified: boolean
    coverImage?: string
    avatarImage?: string
    isOnline?: boolean
  }
  isOwnProfile?: boolean
}

export function ProfileHeader({ user, isOwnProfile = false }: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="relative bg-white">
      {/* Cover Photo with Gradient Overlay */}
      <div className="relative h-48 sm:h-64 lg:h-80 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl overflow-hidden group">
        <img 
          src={user.coverImage || "/vietnamese-workshop.png"} 
          alt="Cover" 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {isOwnProfile && (
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-4 right-4 bg-white/95 hover:bg-white text-gray-700 border border-gray-200 shadow-md backdrop-blur-sm transition-all duration-200"
          >
            <Camera className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Chỉnh sửa ảnh bìa</span>
            <span className="sm:hidden">Sửa</span>
          </Button>
        )}
      </div>

      {/* Profile Content */}
      <div className="relative px-4 sm:px-6 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 -mt-20 sm:-mt-24 relative z-10">
          
          {/* Left Section: Avatar & Info */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            {/* Profile Picture with Online Status */}
            <div className="relative flex-shrink-0">
              <Avatar className="w-40 h-40 sm:w-48 sm:h-48 border-6 border-white shadow-2xl">
                <AvatarImage src={user.avatarImage || "/vietnamese-user.png"} alt={user.name} />
                <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              
              {/* Online Status */}
              {user.isOnline && (
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-lg" />
              )}
              
              {isOwnProfile && (
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full w-12 h-12 p-0 bg-white hover:bg-gray-50 text-gray-700 shadow-lg border-2 border-gray-200"
                >
                  <Camera className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* User Information */}
            <div className="flex-1 bg-white rounded-xl p-6 shadow-lg border border-gray-100 sm:mt-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{user.name}</h1>
                    {user.isVerified && (
                      <div className="flex items-center gap-1">
                        <Shield className="w-6 h-6 text-emerald-600" />
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <p className="text-xl text-gray-600 font-medium">{user.title}</p>
                    {isOwnProfile && (
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Action Buttons - Mobile */}
                <div className="sm:hidden flex gap-2">
                  {!isOwnProfile ? (
                    <>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Nhắn tin
                      </Button>
                      <Button variant="outline" size="sm" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 flex-1">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Kết nối
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white flex-1">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Chỉnh sửa
                    </Button>
                  )}
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium">{user.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium">{user.connections.toLocaleString()} kết nối</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(user.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900">{user.rating}</span>
                  <span className="text-gray-600 text-sm">({user.reviews})</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Số điện thoại đã xác thực
                </Badge>
                <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
                  <Shield className="w-3 h-3 mr-1" />
                  Hồ sơ đã xác minh
                </Badge>
                <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100">
                  <Star className="w-3 h-3 mr-1" />
                  Chuyên gia được đề xuất
                </Badge>
              </div>
            </div>
          </div>

          {/* Right Section: Action Buttons - Desktop */}
          <div className="hidden sm:flex gap-3 lg:mt-8">
            {!isOwnProfile ? (
              <>
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg px-8">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Nhắn tin ngay
                </Button>
                <Button variant="outline" size="lg" className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Kết nối
                </Button>
              </>
            ) : (
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white shadow-lg px-8">
                <Edit3 className="w-5 h-5 mr-2" />
                Chỉnh sửa hồ sơ
              </Button>
            )}
            
            <Button variant="outline" size="lg" className="border-2 border-gray-300 hover:bg-gray-50">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-gray-300 hover:bg-gray-50">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}