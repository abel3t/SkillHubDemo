"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  MapPin,
  Star,
  Clock,
  DollarSign,
  Users,
  Zap,
  Filter,
  X,
  CheckCircle,
  TrendingUp,
  Award,
} from "lucide-react"

interface FilterOptions {
  distance: number[]
  rating: number[]
  priceRange: number[]
  availability: string[]
  verified: boolean
  responseTime: string[]
  experience: string[]
  location: string[]
}

interface QuickFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void
  showAdvanced?: boolean
}

export function QuickFilters({ onFiltersChange, showAdvanced = false }: QuickFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(showAdvanced)
  const [filters, setFilters] = useState<FilterOptions>({
    distance: [5],
    rating: [4],
    priceRange: [50, 500],
    availability: [],
    verified: false,
    responseTime: [],
    experience: [],
    location: []
  })

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const clearAllFilters = () => {
    const clearedFilters: FilterOptions = {
      distance: [5],
      rating: [4],
      priceRange: [50, 500],
      availability: [],
      verified: false,
      responseTime: [],
      experience: [],
      location: []
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const quickFilterPresets = [
    {
      id: "nearby",
      label: "Gần nhà",
      icon: <MapPin className="w-4 h-4" />,
      filters: { distance: [2] }
    },
    {
      id: "top-rated",
      label: "Đánh giá cao",
      icon: <Star className="w-4 h-4" />,
      filters: { rating: [4.5] }
    },
    {
      id: "fast-response",
      label: "Phản hồi nhanh",
      icon: <Zap className="w-4 h-4" />,
      filters: { responseTime: ["under-5min"] }
    },
    {
      id: "verified",
      label: "Đã xác minh",
      icon: <CheckCircle className="w-4 h-4" />,
      filters: { verified: true }
    },
    {
      id: "trending",
      label: "Đang hot",
      icon: <TrendingUp className="w-4 h-4" />,
      filters: { experience: ["trending"] }
    },
    {
      id: "affordable",
      label: "Giá tốt",
      icon: <DollarSign className="w-4 h-4" />,
      filters: { priceRange: [50, 200] }
    }
  ]

  const availabilityOptions = [
    { id: "available-now", label: "Sẵn sàng ngay", color: "bg-green-100 text-green-700" },
    { id: "today", label: "Hôm nay", color: "bg-blue-100 text-blue-700" },
    { id: "this-week", label: "Tuần này", color: "bg-purple-100 text-purple-700" },
    { id: "flexible", label: "Linh hoạt", color: "bg-gray-100 text-gray-700" }
  ]

  const responseTimeOptions = [
    { id: "under-5min", label: "< 5 phút" },
    { id: "under-15min", label: "< 15 phút" },
    { id: "under-1hour", label: "< 1 giờ" },
    { id: "same-day", label: "Trong ngày" }
  ]

  const experienceOptions = [
    { id: "beginner", label: "Mới bắt đầu" },
    { id: "intermediate", label: "Trung bình" },
    { id: "expert", label: "Chuyên gia" },
    { id: "trending", label: "Đang thịnh hành" }
  ]

  const locationOptions = [
    { id: "district-1", label: "Quận 1" },
    { id: "district-3", label: "Quận 3" },
    { id: "district-7", label: "Quận 7" },
    { id: "district-10", label: "Quận 10" },
    { id: "binh-thanh", label: "Bình Thạnh" },
    { id: "phu-nhuan", label: "Phú Nhuận" }
  ]

  const toggleArrayFilter = (filterKey: keyof FilterOptions, value: string) => {
    const currentArray = filters[filterKey] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    updateFilters({ [filterKey]: newArray })
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.availability.length > 0) count++
    if (filters.verified) count++
    if (filters.responseTime.length > 0) count++
    if (filters.experience.length > 0) count++
    if (filters.location.length > 0) count++
    if (filters.distance[0] !== 5) count++
    if (filters.rating[0] !== 4) count++
    if (filters.priceRange[0] !== 50 || filters.priceRange[1] !== 500) count++
    return count
  }

  return (
    <div className="space-y-4">
      {/* Quick Filter Presets */}
      <div className="flex flex-wrap gap-2">
        {quickFilterPresets.map((preset) => (
          <Button
            key={preset.id}
            variant="outline"
            size="sm"
            onClick={() => updateFilters(preset.filters)}
            className="flex items-center gap-2 hover:bg-emerald-50 hover:border-emerald-200"
          >
            {preset.icon}
            {preset.label}
          </Button>
        ))}
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 border-dashed"
        >
          <Filter className="w-4 h-4" />
          Bộ lọc
          {getActiveFiltersCount() > 0 && (
            <Badge className="bg-emerald-600 text-white text-xs ml-1">
              {getActiveFiltersCount()}
            </Badge>
          )}
        </Button>

        {getActiveFiltersCount() > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4 mr-1" />
            Xóa bộ lọc
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <Card className="border border-gray-200">
          <CardContent className="p-6 space-y-6">
            {/* Distance Filter */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Khoảng cách
                </label>
                <span className="text-sm text-gray-500">{filters.distance[0]}km</span>
              </div>
              <Slider
                value={filters.distance}
                onValueChange={(value) => updateFilters({ distance: value })}
                max={20}
                min={0.5}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0.5km</span>
                <span>20km</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Đánh giá tối thiểu
                </label>
                <span className="text-sm text-gray-500">{filters.rating[0]} sao</span>
              </div>
              <Slider
                value={filters.rating}
                onValueChange={(value) => updateFilters({ rating: value })}
                max={5}
                min={1}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 sao</span>
                <span>5 sao</span>
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Mức giá (VNĐ/giờ)
                </label>
                <span className="text-sm text-gray-500">
                  {filters.priceRange[0].toLocaleString()}k - {filters.priceRange[1].toLocaleString()}k
                </span>
              </div>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilters({ priceRange: value })}
                max={1000}
                min={10}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>10k</span>
                <span>1,000k</span>
              </div>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4" />
                Thời gian rảnh
              </label>
              <div className="flex flex-wrap gap-2">
                {availabilityOptions.map((option) => (
                  <Badge
                    key={option.id}
                    variant={filters.availability.includes(option.id) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      filters.availability.includes(option.id) 
                        ? "bg-emerald-600 text-white" 
                        : `${option.color} hover:bg-emerald-50`
                    }`}
                    onClick={() => toggleArrayFilter("availability", option.id)}
                  >
                    {option.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Response Time Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4" />
                Thời gian phản hồi
              </label>
              <div className="flex flex-wrap gap-2">
                {responseTimeOptions.map((option) => (
                  <Badge
                    key={option.id}
                    variant={filters.responseTime.includes(option.id) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      filters.responseTime.includes(option.id) 
                        ? "bg-emerald-600 text-white" 
                        : "hover:bg-emerald-50"
                    }`}
                    onClick={() => toggleArrayFilter("responseTime", option.id)}
                  >
                    {option.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Experience Level Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-3">
                <Award className="w-4 h-4" />
                Mức độ kinh nghiệm
              </label>
              <div className="flex flex-wrap gap-2">
                {experienceOptions.map((option) => (
                  <Badge
                    key={option.id}
                    variant={filters.experience.includes(option.id) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      filters.experience.includes(option.id) 
                        ? "bg-emerald-600 text-white" 
                        : "hover:bg-emerald-50"
                    }`}
                    onClick={() => toggleArrayFilter("experience", option.id)}
                  >
                    {option.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-3">
                <Users className="w-4 h-4" />
                Khu vực
              </label>
              <div className="flex flex-wrap gap-2">
                {locationOptions.map((option) => (
                  <Badge
                    key={option.id}
                    variant={filters.location.includes(option.id) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      filters.location.includes(option.id) 
                        ? "bg-emerald-600 text-white" 
                        : "hover:bg-emerald-50"
                    }`}
                    onClick={() => toggleArrayFilter("location", option.id)}
                  >
                    {option.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Verified Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Chỉ hiển thị người đã xác minh
              </label>
              <Switch
                checked={filters.verified}
                onCheckedChange={(checked) => updateFilters({ verified: checked })}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                onClick={clearAllFilters}
                variant="outline"
                className="flex-1"
              >
                Đặt lại
              </Button>
              <Button
                onClick={() => setIsExpanded(false)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                Áp dụng bộ lọc
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}