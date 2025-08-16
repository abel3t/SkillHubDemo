"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  Star, 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  MoreVertical,
  Quote,
  CheckCircle,
  Award,
  Heart,
  Eye,
  UserPlus,
  Filter,
  TrendingUp,
  Calendar
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Endorsement {
  id: string
  authorName: string
  authorAvatar?: string
  authorRole: string
  authorLocation: string
  content: string
  rating: number
  date: string
  skillsEndorsed: string[]
  projectTitle?: string
  verified: boolean
  helpful: number
  responses: number
  isRecent?: boolean
  tags: string[]
  relationship: 'client' | 'colleague' | 'neighbor' | 'other'
  workDuration?: string
  projectValue?: string
  photos?: string[]
}

interface EndorsementSectionProps {
  endorsements: Endorsement[]
  isOwnProfile: boolean
  totalEndorsements: number
  averageRating: number
  className?: string
}

export function EndorsementSection({
  endorsements,
  isOwnProfile,
  totalEndorsements,
  averageRating,
  className = ""
}: EndorsementSectionProps) {
  const [showWriteEndorsement, setShowWriteEndorsement] = useState(false)
  const [newEndorsement, setNewEndorsement] = useState("")
  const [filterBy, setFilterBy] = useState<'all' | 'recent' | 'top-rated'>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating' | 'helpful'>('newest')

  // Filter and sort endorsements
  const filteredEndorsements = endorsements
    .filter(endorsement => {
      switch (filterBy) {
        case 'recent':
          return endorsement.isRecent
        case 'top-rated':
          return endorsement.rating >= 4.5
        default:
          return true
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'rating':
          return b.rating - a.rating
        case 'helpful':
          return b.helpful - a.helpful
        default: // newest
          return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })

  const getRelationshipBadge = (relationship: string) => {
    const badges = {
      client: { label: 'Khách hàng', color: 'bg-blue-100 text-blue-700' },
      colleague: { label: 'Đồng nghiệp', color: 'bg-green-100 text-green-700' },
      neighbor: { label: 'Hàng xóm', color: 'bg-purple-100 text-purple-700' },
      other: { label: 'Khác', color: 'bg-gray-100 text-gray-700' }
    }
    return badges[relationship as keyof typeof badges] || badges.other
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Hôm qua'
    if (diffDays < 7) return `${diffDays} ngày trước`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} tháng trước`
    return `${Math.floor(diffDays / 365)} năm trước`
  }

  const handleWriteEndorsement = () => {
    if (newEndorsement.trim()) {
      // Handle endorsement submission
      console.log('New endorsement:', newEndorsement)
      setNewEndorsement("")
      setShowWriteEndorsement(false)
    }
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header with Stats */}
      <Card className="border border-gray-200 bg-gradient-to-r from-emerald-50 to-blue-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-gray-900 mb-2">
                Lời chứng thực ({totalEndorsements})
              </CardTitle>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < Math.floor(averageRating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-lg text-gray-900">{averageRating}</span>
                  <span className="text-sm text-gray-600">trung bình</span>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  98% hài lòng
                </Badge>
              </div>
            </div>
            
            {!isOwnProfile && (
              <Button
                onClick={() => setShowWriteEndorsement(!showWriteEndorsement)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Quote className="w-4 h-4 mr-2" />
                Viết đánh giá
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Write Endorsement Form */}
      {showWriteEndorsement && !isOwnProfile && (
        <Card className="border-2 border-emerald-200 bg-emerald-50">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Chia sẻ trải nghiệm của bạn
                </label>
                <Textarea
                  value={newEndorsement}
                  onChange={(e) => setNewEndorsement(e.target.value)}
                  placeholder="Hãy chia sẻ về chất lượng công việc, thái độ phục vụ và trải nghiệm làm việc với người này..."
                  className="min-h-24 border-emerald-200 focus:border-emerald-500"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowWriteEndorsement(false)}
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleWriteEndorsement}
                  disabled={!newEndorsement.trim()}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Gửi đánh giá
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Sort */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Lọc:</span>
            <div className="flex gap-1">
              {[
                { key: 'all', label: 'Tất cả' },
                { key: 'recent', label: 'Gần đây' },
                { key: 'top-rated', label: '5 sao' }
              ].map((filter) => (
                <Button
                  key={filter.key}
                  variant={filterBy === filter.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterBy(filter.key as any)}
                  className={cn(
                    "text-xs",
                    filterBy === filter.key && "bg-emerald-600 text-white"
                  )}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="text-sm border border-gray-200 rounded-md px-3 py-1 bg-white"
        >
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
          <option value="rating">Đánh giá cao nhất</option>
          <option value="helpful">Hữu ích nhất</option>
        </select>
      </div>

      {/* Endorsements List */}
      <div className="space-y-4">
        {filteredEndorsements.map((endorsement, index) => {
          const relationshipBadge = getRelationshipBadge(endorsement.relationship)
          
          return (
            <Card 
              key={endorsement.id} 
              className={cn(
                "border border-gray-200 hover:border-emerald-200 transition-all duration-200 hover:shadow-md",
                endorsement.isRecent && "ring-2 ring-emerald-100 bg-emerald-50/30",
                "animate-in slide-in-from-bottom-1"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <Avatar className="w-12 h-12 ring-2 ring-gray-100">
                      <AvatarImage src={endorsement.authorAvatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 font-semibold">
                        {endorsement.authorName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {endorsement.verified && (
                      <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-blue-500 bg-white rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          {endorsement.authorName}
                          <Badge className={cn("text-xs px-2 py-0.5", relationshipBadge.color)}>
                            {relationshipBadge.label}
                          </Badge>
                          {endorsement.isRecent && (
                            <Badge className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Mới
                            </Badge>
                          )}
                        </h4>
                        <p className="text-sm text-gray-600">{endorsement.authorRole}</p>
                        <p className="text-xs text-gray-500">{endorsement.authorLocation}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-4 h-4",
                                i < endorsement.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              )}
                            />
                          ))}
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </Button>
                      </div>
                    </div>

                    {/* Project Info */}
                    {endorsement.projectTitle && (
                      <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{endorsement.projectTitle}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-600 mt-1">
                              {endorsement.workDuration && (
                                <span>Thời gian: {endorsement.workDuration}</span>
                              )}
                              {endorsement.projectValue && (
                                <span>Giá trị: {endorsement.projectValue}</span>
                              )}
                            </div>
                          </div>
                          <Award className="w-5 h-5 text-emerald-600" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Endorsement Content */}
                <div className="mb-4">
                  <blockquote className="text-gray-700 leading-relaxed italic relative">
                    <Quote className="absolute -top-2 -left-2 w-6 h-6 text-emerald-300" />
                    <div className="pl-4">
                      {endorsement.content}
                    </div>
                  </blockquote>
                </div>

                {/* Skills Endorsed */}
                {endorsement.skillsEndorsed.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Kỹ năng được chứng thực:</p>
                    <div className="flex flex-wrap gap-2">
                      {endorsement.skillsEndorsed.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="outline"
                          className="bg-emerald-50 text-emerald-700 border-emerald-200"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {endorsement.tags.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {endorsement.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="text-xs bg-gray-100 text-gray-600"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Photos */}
                {endorsement.photos && endorsement.photos.length > 0 && (
                  <div className="mb-4">
                    <div className="flex gap-2 overflow-x-auto">
                      {endorsement.photos.map((photo, photoIndex) => (
                        <img
                          key={photoIndex}
                          src={photo}
                          alt={`Ảnh công việc ${photoIndex + 1}`}
                          className="w-20 h-20 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(endorsement.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {Math.floor(Math.random() * 100) + 50} lượt xem
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-3 text-gray-600 hover:text-emerald-600"
                    >
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      Hữu ích ({endorsement.helpful})
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-3 text-gray-600 hover:text-emerald-600"
                    >
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Phản hồi ({endorsement.responses})
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-600 hover:text-emerald-600"
                    >
                      <Share2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Load More */}
      {filteredEndorsements.length < totalEndorsements && (
        <div className="text-center pt-4">
          <Button variant="outline" size="lg" className="border-emerald-200 text-emerald-600 hover:bg-emerald-50">
            Xem thêm đánh giá ({totalEndorsements - filteredEndorsements.length} còn lại)
          </Button>
        </div>
      )}

      {/* Empty State */}
      {filteredEndorsements.length === 0 && (
        <Card className="text-center py-12 border-dashed border-2 border-gray-200">
          <CardContent>
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Quote className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {filterBy === 'all' ? 'Chưa có đánh giá nào' : 'Không tìm thấy đánh giá phù hợp'}
            </h3>
            <p className="text-gray-600 mb-4">
              {isOwnProfile 
                ? 'Hãy hoàn thành các dự án đầu tiên để nhận được đánh giá từ khách hàng'
                : 'Hãy là người đầu tiên đánh giá và chia sẻ trải nghiệm của bạn'
              }
            </p>
            {!isOwnProfile && (
              <Button
                onClick={() => setShowWriteEndorsement(true)}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Quote className="w-4 h-4 mr-2" />
                Viết đánh giá đầu tiên
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}