"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Zap,
  Music,
  Home,
  Laptop,
  Languages,
  Wrench,
  Paintbrush,
  Car,
  Book,
  Heart,
  Utensils,
  Camera,
  Dumbbell,
  Baby,
  TreePine,
  Scissors,
  TrendingUp,
  ArrowRight,
  Users,
} from "lucide-react"

interface Category {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  bgColor: string
  hoverColor: string
  count: number
  trending?: boolean
  popular?: boolean
  description: string
  subCategories: string[]
}

interface CategoryGridProps {
  onCategorySelect: (category: Category) => void
  selectedCategory?: string
}

export function CategoryGrid({ onCategorySelect, selectedCategory }: CategoryGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const categories: Category[] = [
    {
      id: "electrical",
      name: "Điện & Điện tử",
      icon: <Zap className="w-6 h-6" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      hoverColor: "hover:bg-yellow-100",
      count: 234,
      trending: true,
      popular: true,
      description: "Lắp đặt, sửa chữa hệ thống điện",
      subCategories: ["Điện dân dụng", "Điện công nghiệp", "Thiết bị điện", "An toàn điện"]
    },
    {
      id: "music",
      name: "Âm nhạc",
      icon: <Music className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      hoverColor: "hover:bg-purple-100",
      count: 156,
      popular: true,
      description: "Dạy nhạc cụ, lý thuyết âm nhạc",
      subCategories: ["Piano", "Guitar", "Violin", "Thanh nhạc", "Lý thuyết"]
    },
    {
      id: "home-repair",
      name: "Sửa chữa nhà",
      icon: <Home className="w-6 h-6" />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      hoverColor: "hover:bg-emerald-100",
      count: 189,
      trending: true,
      description: "Sửa chữa, bảo trì nhà cửa",
      subCategories: ["Thợ nước", "Thợ sơn", "Thợ gỗ", "Thợ xây"]
    },
    {
      id: "technology",
      name: "Công nghệ",
      icon: <Laptop className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
      count: 167,
      description: "Sửa máy tính, dạy công nghệ",
      subCategories: ["Sửa máy tính", "Dạy lập trình", "Thiết kế", "IT support"]
    },
    {
      id: "languages",
      name: "Ngoại ngữ",
      icon: <Languages className="w-6 h-6" />,
      color: "text-red-600",
      bgColor: "bg-red-50",
      hoverColor: "hover:bg-red-100",
      count: 143,
      popular: true,
      description: "Dạy tiếng Anh, tiếng Trung, tiếng Nhật",
      subCategories: ["Tiếng Anh", "Tiếng Trung", "Tiếng Nhật", "Tiếng Hàn"]
    },
    {
      id: "handyman",
      name: "Thợ sửa chữa",
      icon: <Wrench className="w-6 h-6" />,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      hoverColor: "hover:bg-gray-100",
      count: 98,
      description: "Sửa chữa đồ dùng, thiết bị",
      subCategories: ["Điện lạnh", "Đồ gia dụng", "Xe máy", "Đồng hồ"]
    },
    {
      id: "art-design",
      name: "Nghệ thuật",
      icon: <Paintbrush className="w-6 h-6" />,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      hoverColor: "hover:bg-pink-100",
      count: 87,
      description: "Dạy vẽ, thiết kế, nghệ thuật",
      subCategories: ["Vẽ tranh", "Thiết kế", "Thủ công", "Trang trí"]
    },
    {
      id: "automotive",
      name: "Ô tô & Xe máy",
      icon: <Car className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      hoverColor: "hover:bg-orange-100",
      count: 76,
      description: "Sửa chữa, bảo dưỡng xe",
      subCategories: ["Sửa ô tô", "Sửa xe máy", "Rửa xe", "Bảo dưỡng"]
    },
    {
      id: "education",
      name: "Giáo dục",
      icon: <Book className="w-6 h-6" />,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      hoverColor: "hover:bg-indigo-100",
      count: 134,
      trending: true,
      description: "Dạy học, gia sư",
      subCategories: ["Toán học", "Văn học", "Lý hóa", "Gia sư"]
    },
    {
      id: "health-wellness",
      name: "Sức khỏe",
      icon: <Heart className="w-6 h-6" />,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      hoverColor: "hover:bg-rose-100",
      count: 92,
      description: "Massage, chăm sóc sức khỏe",
      subCategories: ["Massage", "Yoga", "Dinh dưỡng", "Chăm sóc"]
    },
    {
      id: "cooking",
      name: "Nấu ăn",
      icon: <Utensils className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      hoverColor: "hover:bg-green-100",
      count: 68,
      description: "Dạy nấu ăn, món ngon",
      subCategories: ["Món Việt", "Món Âu", "Bánh ngọt", "Món chay"]
    },
    {
      id: "photography",
      name: "Nhiếp ảnh",
      icon: <Camera className="w-6 h-6" />,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      hoverColor: "hover:bg-cyan-100",
      count: 54,
      description: "Chụp ảnh, dạy nhiếp ảnh",
      subCategories: ["Chụp ảnh cưới", "Chụp ảnh sự kiện", "Dạy nhiếp ảnh"]
    }
  ]

  const handleCategoryClick = (category: Category) => {
    onCategorySelect(category)
  }

  const trendingCategories = categories.filter(cat => cat.trending)

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Danh mục dịch vụ</h2>
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
          </div>
        </div>

        <div className="space-y-3">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all duration-200 border hover:shadow-md ${
                selectedCategory === category.id ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${category.bgColor}`}>
                      <div className={category.color}>
                        {category.icon}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{category.name}</h3>
                        {category.trending && (
                          <Badge className="bg-orange-100 text-orange-700 text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Hot
                          </Badge>
                        )}
                        {category.popular && (
                          <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                            Phổ biến
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{category.description}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Users className="w-3 h-3" />
                        <span>{category.count} chuyên gia</span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Khám phá dịch vụ</h2>
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
        </div>
      </div>

      {/* Trending Categories */}
      {trendingCategories.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Đang thịnh hành</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {trendingCategories.map((category) => (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all duration-200 border-2 hover:shadow-lg transform hover:-translate-y-1 ${
                  selectedCategory === category.id ? 'border-emerald-500 bg-emerald-50' : 'border-orange-200'
                } ${category.hoverColor}`}
                onClick={() => handleCategoryClick(category)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-xl ${category.bgColor} flex items-center justify-center`}>
                    <div className={category.color}>
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{category.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">{category.description}</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                    <Users className="w-3 h-3" />
                    <span>{category.count}</span>
                  </div>
                  <Badge className="bg-orange-100 text-orange-700 text-xs mt-2">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Hot
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Categories */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tất cả danh mục</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md transform hover:-translate-y-1 ${
                selectedCategory === category.id ? 'border-2 border-emerald-500 bg-emerald-50' : 'border border-gray-200'
              } ${category.hoverColor}`}
              onClick={() => handleCategoryClick(category)}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-lg ${category.bgColor} flex items-center justify-center`}>
                  <div className={category.color}>
                    {category.icon}
                  </div>
                </div>
                <h3 className="font-medium text-gray-900 mb-1 text-sm">{category.name}</h3>
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-2">
                  <Users className="w-3 h-3" />
                  <span>{category.count}</span>
                </div>
                {category.popular && (
                  <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                    Phổ biến
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}