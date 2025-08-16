"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Star,
  MapPin,
  Clock,
  DollarSign,
  TrendingUp,
  Award,
  Users,
  Zap,
  Heart,
  CheckCircle,
  ChevronDown
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SortOption {
  id: string
  label: string
  description: string
  icon: React.ReactNode
  direction: 'asc' | 'desc' | 'auto'
  category: 'relevance' | 'location' | 'quality' | 'speed' | 'price'
  popular?: boolean
  recommended?: boolean
}

interface SortOptionsProps {
  currentSort: string
  currentDirection: 'asc' | 'desc'
  onSortChange: (sortBy: string, direction: 'asc' | 'desc') => void
  resultCount?: number
  className?: string
}

export function SortOptions({ 
  currentSort, 
  currentDirection,
  onSortChange, 
  resultCount = 0,
  className = ""
}: SortOptionsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const sortOptions: SortOption[] = [
    {
      id: 'relevance',
      label: 'Phù hợp nhất',
      description: 'Kết quả phù hợp nhất với tìm kiếm của bạn',
      icon: <TrendingUp className="w-4 h-4" />,
      direction: 'desc',
      category: 'relevance',
      recommended: true
    },
    {
      id: 'rating',
      label: 'Đánh giá cao nhất',
      description: 'Sắp xếp theo điểm đánh giá từ cao đến thấp',
      icon: <Star className="w-4 h-4" />,
      direction: 'desc',
      category: 'quality',
      popular: true
    },
    {
      id: 'distance',
      label: 'Gần nhất',
      description: 'Tìm những người gần bạn nhất',
      icon: <MapPin className="w-4 h-4" />,
      direction: 'asc',
      category: 'location',
      popular: true
    },
    {
      id: 'responseTime',
      label: 'Phản hồi nhanh nhất',
      description: 'Những người thường phản hồi nhanh',
      icon: <Clock className="w-4 h-4" />,
      direction: 'asc',
      category: 'speed'
    },
    {
      id: 'priceAsc',
      label: 'Giá thấp nhất',
      description: 'Sắp xếp theo giá từ thấp đến cao',
      icon: <DollarSign className="w-4 h-4" />,
      direction: 'asc',
      category: 'price'
    },
    {
      id: 'priceDesc',
      label: 'Giá cao nhất',
      description: 'Sắp xếp theo giá từ cao đến thấp',
      icon: <DollarSign className="w-4 h-4" />,
      direction: 'desc',
      category: 'price'
    },
    {
      id: 'helpedCount',
      label: 'Nhiều người đã tin tướng',
      description: 'Những người đã giúp nhiều người nhất',
      icon: <Users className="w-4 h-4" />,
      direction: 'desc',
      category: 'quality'
    },
    {
      id: 'experience',
      label: 'Kinh nghiệm nhiều nhất',
      description: 'Sắp xếp theo năm kinh nghiệm',
      icon: <Award className="w-4 h-4" />,
      direction: 'desc',
      category: 'quality'
    },
    {
      id: 'availability',
      label: 'Có thể giúp ngay',
      description: 'Những người có thể giúp ngay bây giờ',
      icon: <Zap className="w-4 h-4" />,
      direction: 'desc',
      category: 'speed'
    },
    {
      id: 'endorsed',
      label: 'Được cộng đồng chứng thực',
      description: 'Có nhiều lời chứng thực từ hàng xóm',
      icon: <Heart className="w-4 h-4" />,
      direction: 'desc',
      category: 'quality'
    }
  ]

  // Get current sort option
  const currentSortOption = sortOptions.find(option => option.id === currentSort) || sortOptions[0]

  // Handle sort selection
  const handleSortSelect = (option: SortOption) => {
    // If selecting the same option, toggle direction (except for auto direction)
    if (option.id === currentSort && option.direction === 'auto') {
      const newDirection = currentDirection === 'asc' ? 'desc' : 'asc'
      onSortChange(option.id, newDirection)
    } else {
      onSortChange(option.id, option.direction)
    }
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Group options by category
  const groupedOptions = sortOptions.reduce((groups, option) => {
    const category = option.category
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(option)
    return groups
  }, {} as Record<string, SortOption[]>)

  const categoryLabels = {
    relevance: 'Độ phù hợp',
    location: 'Vị trí',
    quality: 'Chất lượng',
    speed: 'Tốc độ',
    price: 'Giá cả'
  }

  const categoryIcons = {
    relevance: <TrendingUp className="w-3 h-3" />,
    location: <MapPin className="w-3 h-3" />,
    quality: <Star className="w-3 h-3" />,
    speed: <Clock className="w-3 h-3" />,
    price: <DollarSign className="w-3 h-3" />
  }

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      {/* Sort Button */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-200 rounded-xl shadow-sm hover:shadow-md",
          isOpen && "border-emerald-500 bg-emerald-50"
        )}
      >
        <ArrowUpDown className="w-4 h-4" />
        <span className="hidden sm:inline font-medium">{currentSortOption.label}</span>
        <span className="sm:hidden font-medium">Sắp xếp</span>
        
        {/* Direction indicator */}
        {currentSort !== 'relevance' && (
          <div className="flex items-center">
            {currentDirection === 'asc' ? (
              <ArrowUp className="w-3 h-3 text-emerald-600" />
            ) : (
              <ArrowDown className="w-3 h-3 text-emerald-600" />
            )}
          </div>
        )}
        
        <ChevronDown className={cn(
          "w-4 h-4 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
        
        {/* Result count */}
        {resultCount > 0 && (
          <Badge variant="secondary" className="ml-2 px-2 py-0.5 text-xs">
            {resultCount} kết quả
          </Badge>
        )}
      </Button>

      {/* Dropdown */}
      {isOpen && (
        <Card className="absolute top-full mt-2 right-0 w-80 border-2 border-gray-100 shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200 bg-white">
          <CardContent className="p-0">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-gray-600" />
                <span className="font-semibold text-gray-900">Sắp xếp kết quả</span>
                {resultCount > 0 && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {resultCount} kết quả
                  </Badge>
                )}
              </div>
            </div>

            {/* Sort Options by Category */}
            <div className="max-h-96 overflow-y-auto">
              {Object.entries(groupedOptions).map(([category, options], categoryIndex) => (
                <div key={category}>
                  {/* Category Header */}
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
                    <div className="flex items-center gap-2">
                      {categoryIcons[category as keyof typeof categoryIcons]}
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        {categoryLabels[category as keyof typeof categoryLabels]}
                      </span>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="divide-y divide-gray-50">
                    {options.map((option) => {
                      const isSelected = option.id === currentSort
                      const isHovered = hoveredOption === option.id

                      return (
                        <div
                          key={option.id}
                          onClick={() => handleSortSelect(option)}
                          onMouseEnter={() => setHoveredOption(option.id)}
                          onMouseLeave={() => setHoveredOption(null)}
                          className={cn(
                            "p-4 cursor-pointer transition-all duration-150 relative",
                            isSelected 
                              ? "bg-emerald-50 border-l-4 border-l-emerald-500" 
                              : isHovered
                                ? "bg-gray-50 scale-[1.01]"
                                : "hover:bg-gray-50"
                          )}
                        >
                          <div className="flex items-start gap-3">
                            {/* Icon */}
                            <div className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                              isSelected 
                                ? "bg-emerald-100 text-emerald-600" 
                                : "bg-gray-100 text-gray-600"
                            )}>
                              {option.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className={cn(
                                  "font-semibold text-sm",
                                  isSelected ? "text-emerald-700" : "text-gray-900"
                                )}>
                                  {option.label}
                                </h4>
                                
                                {/* Badges */}
                                <div className="flex items-center gap-1">
                                  {option.recommended && (
                                    <Badge className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5">
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      Đề xuất
                                    </Badge>
                                  )}
                                  {option.popular && (
                                    <Badge className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5">
                                      <TrendingUp className="w-3 h-3 mr-1" />
                                      Phổ biến
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              
                              <p className="text-xs text-gray-600 leading-relaxed">
                                {option.description}
                              </p>

                              {/* Direction indicator for selected item */}
                              {isSelected && option.direction !== 'auto' && (
                                <div className="flex items-center gap-1 mt-2">
                                  <div className="flex items-center gap-1 text-xs text-emerald-600">
                                    {currentDirection === 'asc' ? (
                                      <>
                                        <ArrowUp className="w-3 h-3" />
                                        <span>Tăng dần</span>
                                      </>
                                    ) : (
                                      <>
                                        <ArrowDown className="w-3 h-3" />
                                        <span>Giảm dần</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Selected indicator */}
                            {isSelected && (
                              <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="w-3 h-3 text-white fill-current" />
                              </div>
                            )}
                          </div>

                          {/* Hover effect overlay */}
                          {isHovered && !isSelected && (
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-transparent opacity-50 pointer-events-none rounded-lg" />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <p className="text-xs text-gray-500 text-center">
                💡 <strong>Mẹo:</strong> Chọn lại cùng một tùy chọn để đổi thứ tự sắp xếp
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}