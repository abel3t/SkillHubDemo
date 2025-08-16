"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Star,
  ThumbsUp,
  Users,
  DollarSign,
  Clock,
  Award,
  TrendingUp,
  Edit3,
  Plus,
} from "lucide-react"

interface Endorsement {
  id: string
  name: string
  avatar: string
  role: string
  message: string
  date: string
}

interface SkillCardProps {
  skill: {
    id: string
    name: string
    level: number // 1-100
    experienceYears: number
    endorsements: Endorsement[]
    hourlyRate?: {
      min: number
      max: number
    }
    projects: number
    rating: number
    availability: "available" | "busy" | "unavailable"
    certifications?: string[]
    trending?: boolean
  }
  isOwnProfile?: boolean
  compact?: boolean
}

export function SkillCard({ skill, isOwnProfile = false, compact = false }: SkillCardProps) {
  const [showAllEndorsements, setShowAllEndorsements] = useState(false)
  
  const getSkillLevelText = (level: number) => {
    if (level >= 90) return "Chuyên gia"
    if (level >= 70) return "Thành thạo" 
    if (level >= 50) return "Trung bình"
    return "Mới bắt đầu"
  }

  const getSkillLevelColor = (level: number) => {
    if (level >= 90) return "text-emerald-700 bg-emerald-50 border-emerald-200"
    if (level >= 70) return "text-blue-700 bg-blue-50 border-blue-200"
    if (level >= 50) return "text-amber-700 bg-amber-50 border-amber-200"
    return "text-gray-700 bg-gray-50 border-gray-200"
  }

  const getAvailabilityColor = (availability: string) => {
    switch(availability) {
      case "available": return "bg-green-500"
      case "busy": return "bg-yellow-500"
      case "unavailable": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  const getAvailabilityText = (availability: string) => {
    switch(availability) {
      case "available": return "Sẵn sàng"
      case "busy": return "Bận"
      case "unavailable": return "Không rảnh"
      default: return "Không xác định"
    }
  }

  if (compact) {
    return (
      <Card className="hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-emerald-200 bg-white">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-base mb-2 truncate">{skill.name}</h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                <Badge variant="outline" className={`${getSkillLevelColor(skill.level)} text-xs`}>
                  {getSkillLevelText(skill.level)}
                </Badge>
                <div className="flex items-center gap-1 text-gray-600">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{skill.rating}</span>
                  <span className="text-xs">({skill.endorsements.length})</span>
                </div>
              </div>
            </div>
            
            <div className="text-right flex-shrink-0">
              {skill.hourlyRate && (
                <div className="text-sm font-bold text-emerald-600 mb-1">
                  {skill.hourlyRate.min.toLocaleString()}k-{skill.hourlyRate.max.toLocaleString()}k
                </div>
              )}
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <div className={`w-2 h-2 rounded-full ${getAvailabilityColor(skill.availability)}`} />
                <span className="whitespace-nowrap">{getAvailabilityText(skill.availability)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-emerald-200 bg-white group">
      <CardContent className="p-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">{skill.name}</h3>
              <div className="flex items-center gap-2">
                {skill.trending && (
                  <Badge variant="secondary" className="bg-orange-50 text-orange-700 border-orange-200 text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Hot
                  </Badge>
                )}
                {isOwnProfile && (
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 text-sm">
              <Badge variant="outline" className={`${getSkillLevelColor(skill.level)} text-xs`}>
                {getSkillLevelText(skill.level)}
              </Badge>
              
              <div className="flex items-center gap-1 text-gray-600">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium whitespace-nowrap">{skill.experienceYears} năm</span>
              </div>

              <div className="flex items-center gap-1 text-gray-600">
                <Users className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium">{skill.projects} dự án</span>
              </div>

              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                <span className="font-semibold text-gray-900">{skill.rating}</span>
                <span className="text-gray-600">({skill.endorsements.length})</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Mức độ thành thạo</span>
                <span className="text-sm font-bold text-emerald-600">{skill.level}%</span>
              </div>
              <Progress value={skill.level} className="h-2 bg-gray-100" />
            </div>
          </div>

          {/* Availability Status */}
          <div className="text-right flex-shrink-0 min-w-0">
            <div className="flex items-center justify-end gap-2 mb-3">
              <div className={`w-3 h-3 rounded-full ${getAvailabilityColor(skill.availability)}`} />
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{getAvailabilityText(skill.availability)}</span>
            </div>
            
            {skill.hourlyRate && (
              <div className="bg-gray-50 rounded-lg p-3 border">
                <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-xs">Giá dịch vụ</span>
                </div>
                <div className="text-lg font-bold text-emerald-600 text-center">
                  {skill.hourlyRate.min.toLocaleString()}k-{skill.hourlyRate.max.toLocaleString()}k
                </div>
                <div className="text-xs text-gray-600 text-center">VNĐ/giờ</div>
              </div>
            )}
          </div>
        </div>

        {/* Certifications */}
        {skill.certifications && skill.certifications.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Chứng chỉ
            </h4>
            <div className="flex flex-wrap gap-2">
              {skill.certifications.map((cert, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Endorsements */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <ThumbsUp className="w-4 h-4" />
              Lời khen ngợi ({skill.endorsements.length})
            </h4>
            {isOwnProfile && (
              <Button variant="ghost" size="sm" className="text-primary">
                <Plus className="w-4 h-4 mr-1" />
                Yêu cầu lời khen
              </Button>
            )}
          </div>

          <div className="space-y-3">
            {skill.endorsements
              .slice(0, showAllEndorsements ? undefined : 2)
              .map((endorsement) => (
                <div key={endorsement.id} className="flex gap-3 p-4 bg-gray-50 rounded-lg border">
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarImage src={endorsement.avatar} alt={endorsement.name} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
                      {endorsement.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                      <span className="font-medium text-sm text-gray-900 truncate">{endorsement.name}</span>
                      <span className="text-xs text-gray-600 truncate">{endorsement.role}</span>
                      <span className="text-xs text-gray-500">• {endorsement.date}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{endorsement.message}</p>
                  </div>
                </div>
              ))}

            {skill.endorsements.length > 2 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllEndorsements(!showAllEndorsements)}
                className="w-full text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
              >
                {showAllEndorsements 
                  ? "Thu gọn" 
                  : `Xem thêm ${skill.endorsements.length - 2} lời khen`
                }
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}