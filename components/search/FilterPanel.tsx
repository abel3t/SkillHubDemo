"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { 
  MapPin, 
  Star, 
  Clock, 
  DollarSign, 
  User, 
  Award, 
  Calendar,
  Filter,
  X,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Shield,
  Zap,
  Heart,
  Target
} from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterOption {
  id: string
  label: string
  count?: number
  checked: boolean
}

interface FilterSection {
  id: string
  title: string
  icon: React.ReactNode
  expanded: boolean
  type: 'checkbox' | 'range' | 'rating' | 'custom'
  options?: FilterOption[]
  min?: number
  max?: number
  value?: number[]
  unit?: string
}

interface Filters {
  location: string[]
  distance: number[]
  rating: number[]
  priceRange: number[]
  availability: string[]
  skills: string[]
  experience: string[]
  verification: string[]
  responseTime: string[]
  specialties: string[]
}

interface FilterPanelProps {
  isOpen: boolean
  onClose: () => void
  onFiltersChange: (filters: Filters) => void
  onClearFilters: () => void
  className?: string
}

export function FilterPanel({ 
  isOpen, 
  onClose, 
  onFiltersChange, 
  onClearFilters,
  className = ""
}: FilterPanelProps) {
  const [activeFilters, setActiveFilters] = useState<Filters>({
    location: [],
    distance: [5],
    rating: [4],
    priceRange: [50, 500],
    availability: [],
    skills: [],
    experience: [],
    verification: [],
    responseTime: [],
    specialties: []
  })

  const [filterSections, setFilterSections] = useState<FilterSection[]>([
    {
      id: 'location',
      title: 'Khu vực',
      icon: <MapPin className="w-4 h-4" />,
      expanded: true,
      type: 'checkbox',
      options: [
        { id: 'q1', label: 'Quận 1', count: 156, checked: false },
        { id: 'q3', label: 'Quận 3', count: 89, checked: false },
        { id: 'q7', label: 'Quận 7', count: 124, checked: false },
        { id: 'qpn', label: 'Quận Phú Nhuận', count: 67, checked: false },
        { id: 'qbt', label: 'Quận Bình Thạnh', count: 98, checked: false },
        { id: 'qtd', label: 'Quận Tân Định', count: 45, checked: false }
      ]
    },
    {
      id: 'distance',
      title: 'Khoảng cách',
      icon: <Target className="w-4 h-4" />,
      expanded: true,
      type: 'range',
      min: 0,
      max: 20,
      value: [5],
      unit: 'km'
    },
    {
      id: 'rating',
      title: 'Đánh giá',
      icon: <Star className="w-4 h-4" />,
      expanded: true,
      type: 'rating',
      min: 1,
      max: 5,
      value: [4]
    },
    {
      id: 'priceRange',
      title: 'Mức giá',
      icon: <DollarSign className="w-4 h-4" />,
      expanded: true,
      type: 'range',
      min: 0,
      max: 1000,
      value: [50, 500],
      unit: 'K VNĐ/giờ'
    },
    {
      id: 'availability',
      title: 'Thời gian có thể',
      icon: <Calendar className="w-4 h-4" />,
      expanded: false,
      type: 'checkbox',
      options: [
        { id: 'now', label: 'Ngay bây giờ', count: 23, checked: false },
        { id: 'today', label: 'Hôm nay', count: 67, checked: false },
        { id: 'tomorrow', label: 'Ngày mai', count: 89, checked: false },
        { id: 'weekend', label: 'Cuối tuần', count: 134, checked: false },
        { id: 'flexible', label: 'Linh hoạt', count: 156, checked: false }
      ]
    },
    {
      id: 'skills',
      title: 'Loại kỹ năng',
      icon: <Zap className="w-4 h-4" />,
      expanded: false,
      type: 'checkbox',
      options: [
        { id: 'electrical', label: 'Điện - Nước', count: 47, checked: false },
        { id: 'education', label: 'Dạy học', count: 23, checked: false },
        { id: 'cleaning', label: 'Dọn dẹp', count: 31, checked: false },
        { id: 'repair', label: 'Sửa chữa', count: 19, checked: false },
        { id: 'health', label: 'Sức khỏe', count: 15, checked: false },
        { id: 'tech', label: 'Công nghệ', count: 12, checked: false }
      ]
    },
    {
      id: 'experience',
      title: 'Kinh nghiệm',
      icon: <Award className="w-4 h-4" />,
      expanded: false,
      type: 'checkbox',
      options: [
        { id: 'beginner', label: 'Mới bắt đầu (< 1 năm)', count: 45, checked: false },
        { id: 'intermediate', label: 'Có kinh nghiệm (1-3 năm)', count: 89, checked: false },
        { id: 'experienced', label: 'Giàu kinh nghiệm (3-5 năm)', count: 67, checked: false },
        { id: 'expert', label: 'Chuyên gia (5+ năm)', count: 34, checked: false }
      ]
    },
    {
      id: 'verification',
      title: 'Xác thực',
      icon: <Shield className="w-4 h-4" />,
      expanded: false,
      type: 'checkbox',
      options: [
        { id: 'verified_identity', label: 'Xác thực danh tính', count: 89, checked: false },
        { id: 'verified_skills', label: 'Xác thực kỹ năng', count: 67, checked: false },
        { id: 'background_check', label: 'Kiểm tra lý lịch', count: 45, checked: false },
        { id: 'community_endorsed', label: 'Cộng đồng chứng thực', count: 123, checked: false }
      ]
    },
    {
      id: 'responseTime',
      title: 'Thời gian phản hồi',
      icon: <Clock className="w-4 h-4" />,
      expanded: false,
      type: 'checkbox',
      options: [
        { id: 'instant', label: 'Ngay lập tức (< 5 phút)', count: 23, checked: false },
        { id: 'fast', label: 'Nhanh (< 30 phút)', count: 67, checked: false },
        { id: 'normal', label: 'Bình thường (< 2 giờ)', count: 89, checked: false },
        { id: 'flexible', label: 'Linh hoạt (< 1 ngày)', count: 45, checked: false }
      ]
    }
  ])

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setFilterSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, expanded: !section.expanded }
          : section
      )
    )
  }

  // Handle checkbox changes
  const handleCheckboxChange = (sectionId: string, optionId: string, checked: boolean) => {
    setFilterSections(prev => 
      prev.map(section => 
        section.id === sectionId && section.options
          ? {
              ...section,
              options: section.options.map(option => 
                option.id === optionId ? { ...option, checked } : option
              )
            }
          : section
      )
    )

    // Update active filters
    setActiveFilters(prev => {
      const sectionFilters = prev[sectionId as keyof Filters] as string[]
      const updated = checked
        ? [...sectionFilters, optionId]
        : sectionFilters.filter(id => id !== optionId)
      
      return { ...prev, [sectionId]: updated }
    })
  }

  // Handle range changes
  const handleRangeChange = (sectionId: string, value: number[]) => {
    setFilterSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, value }
          : section
      )
    )

    setActiveFilters(prev => ({
      ...prev,
      [sectionId]: value
    }))
  }

  // Clear all filters
  const clearAllFilters = () => {
    setFilterSections(prev => 
      prev.map(section => ({
        ...section,
        options: section.options?.map(option => ({ ...option, checked: false })),
        value: section.id === 'distance' ? [5] :
               section.id === 'rating' ? [4] :
               section.id === 'priceRange' ? [50, 500] : section.value
      }))
    )

    const clearedFilters: Filters = {
      location: [],
      distance: [5],
      rating: [4],
      priceRange: [50, 500],
      availability: [],
      skills: [],
      experience: [],
      verification: [],
      responseTime: [],
      specialties: []
    }

    setActiveFilters(clearedFilters)
    onClearFilters()
  }

  // Apply filters
  const applyFilters = () => {
    onFiltersChange(activeFilters)
    onClose()
  }

  // Count active filters
  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((count, filterArray) => {
      if (Array.isArray(filterArray)) {
        return count + filterArray.length
      }
      return count
    }, 0)
  }

  const activeFilterCount = getActiveFilterCount()

  // Emit filter changes
  useEffect(() => {
    onFiltersChange(activeFilters)
  }, [activeFilters, onFiltersChange])

  if (!isOpen) return null

  return (
    <div className={cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200",
      className
    )}>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-emerald-600" />
                <h2 className="text-xl font-bold text-gray-900">Bộ lọc</h2>
                {activeFilterCount > 0 && (
                  <Badge className="bg-emerald-100 text-emerald-700 px-2 py-1">
                    {activeFilterCount}
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Active Filters Summary */}
            {activeFilterCount > 0 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                >
                  <RotateCcw className="w-3 h-3 mr-2" />
                  Xóa tất cả
                </Button>
              </div>
            )}
          </div>

          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {filterSections.map((section) => (
              <Card key={section.id} className="border border-gray-200 shadow-sm">
                <CardHeader 
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {section.icon}
                      <CardTitle className="text-sm font-semibold">{section.title}</CardTitle>
                      {/* Show active count for this section */}
                      {(() => {
                        const sectionActiveCount = section.options?.filter(opt => opt.checked).length || 
                                                 (section.type === 'range' && section.value ? 1 : 0)
                        return sectionActiveCount > 0 && (
                          <Badge variant="secondary" className="text-xs px-2 py-0">
                            {sectionActiveCount}
                          </Badge>
                        )
                      })()}
                    </div>
                    {section.expanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </CardHeader>

                {section.expanded && (
                  <CardContent className="p-4 pt-0">
                    {section.type === 'checkbox' && section.options && (
                      <div className="space-y-3">
                        {section.options.map((option) => (
                          <div key={option.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Checkbox
                                id={option.id}
                                checked={option.checked}
                                onCheckedChange={(checked) => 
                                  handleCheckboxChange(section.id, option.id, checked as boolean)
                                }
                                className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                              />
                              <label 
                                htmlFor={option.id}
                                className="text-sm font-medium leading-none cursor-pointer"
                              >
                                {option.label}
                              </label>
                            </div>
                            {option.count && (
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                {option.count}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {section.type === 'range' && (
                      <div className="space-y-4">
                        <Slider
                          value={section.value || [section.min || 0]}
                          onValueChange={(value) => handleRangeChange(section.id, value)}
                          max={section.max}
                          min={section.min}
                          step={section.id === 'priceRange' ? 10 : 1}
                          className="w-full"
                        />
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>{section.min} {section.unit}</span>
                          <div className="font-medium">
                            {section.value?.length === 2 
                              ? `${section.value[0]} - ${section.value[1]} ${section.unit}`
                              : `${section.value?.[0]} ${section.unit}`
                            }
                          </div>
                          <span>{section.max} {section.unit}</span>
                        </div>
                      </div>
                    )}

                    {section.type === 'rating' && (
                      <div className="space-y-4">
                        <Slider
                          value={section.value || [4]}
                          onValueChange={(value) => handleRangeChange(section.id, value)}
                          max={5}
                          min={1}
                          step={0.5}
                          className="w-full"
                        />
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>1⭐</span>
                          <div className="flex items-center gap-1 font-medium">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{section.value?.[0]}+ trở lên</span>
                          </div>
                          <span>5⭐</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-white">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="flex-1"
                disabled={activeFilterCount === 0}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Đặt lại
              </Button>
              <Button
                onClick={applyFilters}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                Áp dụng {activeFilterCount > 0 && `(${activeFilterCount})`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}