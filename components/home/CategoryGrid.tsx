"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wrench, Paintbrush, Home, Laptop, Music, Dumbbell, BookOpen, Camera } from "lucide-react"

const categories = [
  { name: "Sửa chữa", icon: Wrench, color: "text-blue-500" },
  { name: "Sơn, vẽ", icon: Paintbrush, color: "text-purple-500" },
  { name: "Dọn dẹp", icon: Home, color: "text-teal-500" },
  { name: "Công nghệ", icon: Laptop, color: "text-indigo-500" },
  { name: "Âm nhạc", icon: Music, color: "text-pink-500" },
  { name: "Thể thao", icon: Dumbbell, color: "text-orange-500" },
  { name: "Dạy học", icon: BookOpen, color: "text-yellow-500" },
  { name: "Nhiếp ảnh", icon: Camera, color: "text-gray-500" },
]

export function CategoryGrid() {
  return (
    <Card className="mb-6 shadow-sm">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Khám phá theo danh mục</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.name}
                variant="outline"
                className="flex flex-col items-center justify-center h-24 rounded-lg border-gray-200 hover:bg-gray-50 hover:border-emerald-500 transition-all duration-200 group"
              >
                <Icon className={`w-8 h-8 mb-1 ${category.color} group-hover:scale-110 transition-transform`} />
                <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">{category.name}</span>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
