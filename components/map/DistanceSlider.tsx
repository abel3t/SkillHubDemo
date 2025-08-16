"use client"

import { useState } from 'react'
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users } from "lucide-react"

interface DistanceSliderProps {
  initialDistance?: number
  maxDistance?: number
  onDistanceChange: (distance: number) => void
  helperCount?: number
  className?: string
}

export function DistanceSlider({ 
  initialDistance = 5, 
  maxDistance = 50,
  onDistanceChange,
  helperCount = 0,
  className = "" 
}: DistanceSliderProps) {
  const [distance, setDistance] = useState([initialDistance])

  const handleDistanceChange = (newDistance: number[]) => {
    setDistance(newDistance)
    onDistanceChange(newDistance[0])
  }

  const getDistanceText = (km: number) => {
    if (km < 1) return `${Math.round(km * 1000)}m`
    if (km < 10) return `${km.toFixed(1)}km`
    return `${Math.round(km)}km`
  }

  const getHelperCountText = (count: number) => {
    if (count === 0) return "Không có chuyên gia"
    if (count === 1) return "1 chuyên gia"
    return `${count} chuyên gia`
  }

  const getDistanceColor = (km: number) => {
    if (km <= 2) return "text-green-600"
    if (km <= 10) return "text-yellow-600" 
    return "text-orange-600"
  }

  const getSliderColor = (km: number) => {
    if (km <= 2) return "bg-green-500"
    if (km <= 10) return "bg-yellow-500"
    return "bg-orange-500"
  }

  return (
    <Card className={`shadow-sm ${className}`}>
      <CardContent className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span className="font-medium text-gray-900">Bán kính tìm kiếm</span>
          </div>
          <Badge variant="outline" className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>{getHelperCountText(helperCount)}</span>
          </Badge>
        </div>

        {/* Distance display */}
        <div className="text-center">
          <div className={`text-2xl font-bold ${getDistanceColor(distance[0])}`}>
            {getDistanceText(distance[0])}
          </div>
          <p className="text-sm text-gray-500">
            Tìm kiếm trong bán kính {getDistanceText(distance[0])}
          </p>
        </div>

        {/* Slider */}
        <div className="px-2">
          <Slider
            value={distance}
            onValueChange={handleDistanceChange}
            max={maxDistance}
            min={0.5}
            step={0.5}
            className="w-full"
          />
          
          {/* Distance markers */}
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>0.5km</span>
            <span>Gần</span>
            <span>Xa</span>
            <span>{maxDistance}km</span>
          </div>
        </div>

        {/* Quick distance buttons */}
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 5, 10].map((quickDistance) => (
            <button
              key={quickDistance}
              onClick={() => handleDistanceChange([quickDistance])}
              className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                distance[0] === quickDistance
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              {getDistanceText(quickDistance)}
            </button>
          ))}
        </div>

        {/* Helper distribution info */}
        {helperCount > 0 && (
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Mật độ chuyên gia</span>
              <span className="font-medium">
                {Math.round((helperCount / (Math.PI * distance[0] * distance[0])) * 10) / 10} người/km²
              </span>
            </div>
            <div className="mt-2 flex space-x-1">
              {/* Density visualization bars */}
              {Array.from({ length: 5 }, (_, i) => {
                const density = helperCount / (Math.PI * distance[0] * distance[0])
                const isActive = i < Math.min(5, Math.round(density * 2))
                return (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded ${
                      isActive ? 'bg-emerald-400' : 'bg-gray-200'
                    }`}
                  />
                )
              })}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>💡 <strong>Gợi ý:</strong></p>
          <p>• Bán kính nhỏ: Tìm người gần, phản hồi nhanh</p>
          <p>• Bán kính lớn: Nhiều lựa chọn, chuyên môn đa dạng</p>
        </div>
      </CardContent>
    </Card>
  )
}