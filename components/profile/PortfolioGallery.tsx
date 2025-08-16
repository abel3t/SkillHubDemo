"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Briefcase,
  Calendar,
  MapPin,
  Star,
  ThumbsUp,
  MessageSquare,
  ExternalLink,
  Plus,
  Image as ImageIcon,
  Award,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"

interface PortfolioItem {
  id: string
  title: string
  description: string
  images: string[]
  category: string
  location: string
  completedDate: string
  duration: string
  clientName?: string
  rating: number
  feedback?: string
  tags: string[]
  beforeAfter?: {
    before: string[]
    after: string[]
  }
  achievements?: string[]
}

interface PortfolioGalleryProps {
  items: PortfolioItem[]
  isOwnProfile?: boolean
}

export function PortfolioGallery({ items, isOwnProfile = false }: PortfolioGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const openPortfolioItem = (item: PortfolioItem) => {
    setSelectedItem(item)
    setCurrentImageIndex(0)
  }

  const closePortfolioItem = () => {
    setSelectedItem(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) => 
        prev === selectedItem.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedItem.images.length - 1 : prev - 1
      )
    }
  }

  const categoryColors: Record<string, string> = {
    "Điện dân dụng": "bg-blue-100 text-blue-800 border-blue-200",
    "Điện công nghiệp": "bg-purple-100 text-purple-800 border-purple-200", 
    "Tư vấn": "bg-green-100 text-green-800 border-green-200",
    "Bảo trì": "bg-orange-100 text-orange-800 border-orange-200",
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Danh mục công việc ({items.length})
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              Lưới
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              Danh sách
            </Button>
            {isOwnProfile && (
              <Button size="sm" className="ml-2">
                <Plus className="w-4 h-4 mr-2" />
                Thêm dự án
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer"
                onClick={() => openPortfolioItem(item)}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 ring-1 ring-gray-200 hover:ring-primary/50">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    
                    {/* Image Counter */}
                    {item.images.length > 1 && (
                      <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium">
                        <ImageIcon className="w-3 h-3 inline mr-1" />
                        {item.images.length}
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge 
                        variant="secondary" 
                        className={`${categoryColors[item.category] || "bg-gray-100 text-gray-800"} shadow-sm`}
                      >
                        {item.category}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.completedDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.duration}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-gray-900">{item.rating}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span className="text-xs">{item.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <Card
                key={item.id}
                className="cursor-pointer hover:shadow-md transition-all duration-300 border-0 ring-1 ring-gray-200 hover:ring-primary/50"
                onClick={() => openPortfolioItem(item)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <Badge 
                          variant="secondary" 
                          className={`${categoryColors[item.category] || "bg-gray-100 text-gray-800"} ml-2`}
                        >
                          {item.category}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.completedDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {item.rating}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Portfolio Detail Modal */}
        <Dialog open={!!selectedItem} onOpenChange={closePortfolioItem}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gray-900">
                    {selectedItem.title}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Image Gallery */}
                  <div className="relative">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={selectedItem.images[currentImageIndex]}
                        alt={`${selectedItem.title} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Image Navigation */}
                    {selectedItem.images.length > 1 && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                          onClick={prevImage}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                          onClick={nextImage}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>

                        {/* Image Indicators */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {selectedItem.images.map((_, index) => (
                            <button
                              key={index}
                              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                index === currentImageIndex 
                                  ? "bg-white scale-125" 
                                  : "bg-white/60 hover:bg-white/80"
                              }`}
                              onClick={() => setCurrentImageIndex(index)}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Strip */}
                  {selectedItem.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {selectedItem.images.map((image, index) => (
                        <button
                          key={index}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            index === currentImageIndex 
                              ? "border-primary" 
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Project Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Chi tiết dự án</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={categoryColors[selectedItem.category]}>
                            {selectedItem.category}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{selectedItem.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>Hoàn thành: {selectedItem.completedDate}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>Thời gian: {selectedItem.duration}</span>
                        </div>

                        {selectedItem.clientName && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>Khách hàng: {selectedItem.clientName}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Đánh giá</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-5 h-5 ${i < Math.floor(selectedItem.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="font-semibold text-gray-900">{selectedItem.rating}/5</span>
                      </div>
                      
                      {selectedItem.feedback && (
                        <blockquote className="text-sm text-gray-600 italic border-l-4 border-primary pl-4">
                          "{selectedItem.feedback}"
                        </blockquote>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Mô tả công việc</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedItem.description}</p>
                  </div>

                  {/* Achievements */}
                  {selectedItem.achievements && selectedItem.achievements.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        Thành tựu đạt được
                      </h3>
                      <ul className="space-y-2">
                        {selectedItem.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tags */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Thẻ</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}