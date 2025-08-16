"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { 
  MapPin, 
  Navigation, 
  Search, 
  X,
  Crosshair 
} from "lucide-react"

interface LocationControlsProps {
  currentLocation: string
  onLocationChange: (location: string, coordinates?: [number, number]) => void
  onCurrentLocationClick: () => void
  className?: string
}

export function LocationControls({ 
  currentLocation, 
  onLocationChange, 
  onCurrentLocationClick,
  className = "" 
}: LocationControlsProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLocating, setIsLocating] = useState(false)

  const popularLocations = [
    { name: "Quận 1, TP.HCM", coordinates: [10.7769, 106.7009] as [number, number] },
    { name: "Quận 3, TP.HCM", coordinates: [10.7756, 106.6878] as [number, number] },
    { name: "Quận 7, TP.HCM", coordinates: [10.7364, 106.7217] as [number, number] },
    { name: "Quận Bình Thạnh, TP.HCM", coordinates: [10.8011, 106.7067] as [number, number] },
    { name: "Quận Phú Nhuận, TP.HCM", coordinates: [10.7980, 106.6825] as [number, number] },
    { name: "Hà Nội", coordinates: [21.0285, 105.8542] as [number, number] },
  ]

  const handleCurrentLocation = async () => {
    setIsLocating(true)
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            onLocationChange("Vị trí hiện tại", [latitude, longitude])
            setIsLocating(false)
          },
          (error) => {
            console.error("Error getting location:", error)
            setIsLocating(false)
          }
        )
      }
    } catch (error) {
      console.error("Geolocation error:", error)
      setIsLocating(false)
    }
    onCurrentLocationClick()
  }

  const handleLocationSelect = (location: string, coordinates: [number, number]) => {
    onLocationChange(location, coordinates)
    setIsSearchOpen(false)
    setSearchQuery("")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // In a real app, this would call a geocoding API
      onLocationChange(searchQuery.trim())
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Current location display */}
      <Card className="shadow-sm">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-1">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-gray-900 truncate">
                {currentLocation}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-emerald-600 hover:text-emerald-700"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search interface */}
      {isSearchOpen && (
        <Card className="shadow-lg border-emerald-200">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Chọn vị trí</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Search form */}
            <form onSubmit={handleSearch} className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm địa điểm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" className="w-full" disabled={!searchQuery.trim()}>
                Tìm kiếm
              </Button>
            </form>

            {/* Current location button */}
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleCurrentLocation}
              disabled={isLocating}
            >
              <div className="flex items-center space-x-2">
                <Crosshair className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
                <span>{isLocating ? 'Đang xác định vị trí...' : 'Sử dụng vị trí hiện tại'}</span>
              </div>
            </Button>

            {/* Popular locations */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Địa điểm phổ biến</h4>
              <div className="space-y-1">
                {popularLocations.map((location, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start h-auto p-2 text-left"
                    onClick={() => handleLocationSelect(location.name, location.coordinates)}
                  >
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-sm">{location.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick location button for mobile */}
      <div className="md:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCurrentLocation}
          disabled={isLocating}
          className="w-full"
        >
          <Navigation className={`w-4 h-4 mr-2 ${isLocating ? 'animate-spin' : ''}`} />
          {isLocating ? 'Định vị...' : 'Vị trí hiện tại'}
        </Button>
      </div>
    </div>
  )
}