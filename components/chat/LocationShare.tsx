"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  MapPin, 
  Navigation, 
  Home, 
  Building2, 
  Coffee, 
  Shield,
  X,
  CheckCircle,
  AlertTriangle
} from "lucide-react"
import { cn } from "@/lib/utils"

interface LocationShareProps {
  onShareLocation: (location: {
    latitude: number
    longitude: number
    address: string
  }) => void
  onClose: () => void
  className?: string
}

export function LocationShare({ onShareLocation, onClose, className = "" }: LocationShareProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [isSharing, setIsSharing] = useState(false)

  // Predefined locations (general areas only for privacy)
  const predefinedLocations = [
    {
      id: 'current',
      name: 'Vị trí hiện tại',
      description: 'Chia sẻ vị trí chính xác hiện tại',
      icon: Navigation,
      type: 'exact',
      color: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
      privacy: 'high'
    },
    {
      id: 'home',
      name: 'Khu vực nhà tôi',
      description: 'Quận 1, TP. Hồ Chí Minh',
      icon: Home,
      type: 'general',
      color: 'bg-green-50 text-green-700 hover:bg-green-100',
      privacy: 'medium'
    },
    {
      id: 'work',
      name: 'Khu vực công ty',
      description: 'Quận 3, TP. Hồ Chí Minh',
      icon: Building2,
      type: 'general',
      color: 'bg-purple-50 text-purple-700 hover:bg-purple-100',
      privacy: 'medium'
    },
    {
      id: 'nearby',
      name: 'Quán cà phê gần đây',
      description: 'Starbucks, Nguyễn Huệ, Quận 1',
      icon: Coffee,
      type: 'landmark',
      color: 'bg-orange-50 text-orange-700 hover:bg-orange-100',
      privacy: 'low'
    }
  ]

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId)
  }

  const handleShareLocation = async () => {
    if (!selectedLocation) return

    setIsSharing(true)

    try {
      const location = predefinedLocations.find(loc => loc.id === selectedLocation)
      
      if (location?.type === 'exact') {
        // Get current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              onShareLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                address: 'Vị trí chính xác'
              })
              setIsSharing(false)
            },
            (error) => {
              console.error('Location error:', error)
              setIsSharing(false)
            }
          )
        }
      } else {
        // Share general area
        onShareLocation({
          latitude: 0, // Placeholder - in real app would be approximate
          longitude: 0,
          address: location?.description || 'Vị trí'
        })
        setIsSharing(false)
      }
    } catch (error) {
      console.error('Share location error:', error)
      setIsSharing(false)
    }
  }

  const getPrivacyLevel = (privacy: string) => {
    switch (privacy) {
      case 'high':
        return { label: 'Vị trí chính xác', color: 'text-red-600', icon: AlertTriangle }
      case 'medium':
        return { label: 'Khu vực chung', color: 'text-yellow-600', icon: Shield }
      case 'low':
        return { label: 'Công khai', color: 'text-green-600', icon: CheckCircle }
      default:
        return { label: '', color: '', icon: Shield }
    }
  }

  return (
    <div className={cn("bg-white rounded-2xl shadow-lg border border-gray-200 p-4 max-h-96 overflow-y-auto animate-in slide-in-from-bottom-2 duration-200", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-red-500" />
          <h3 className="font-semibold text-gray-900">Chia sẻ vị trí</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="h-6 w-6 p-0 rounded-full hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Privacy Notice */}
      <Alert className="mb-4 border-blue-200 bg-blue-50">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800 text-sm">
          <strong>Quyền riêng tư:</strong> Chỉ chia sẻ vị trí với người bạn tin tưởng. 
          Bạn có thể chọn chia sẻ khu vực chung thay vì vị trí chính xác.
        </AlertDescription>
      </Alert>

      {/* Location Options */}
      <div className="space-y-3">
        {predefinedLocations.map((location) => {
          const IconComponent = location.icon
          const privacy = getPrivacyLevel(location.privacy)
          const PrivacyIcon = privacy.icon
          const isSelected = selectedLocation === location.id

          return (
            <Button
              key={location.id}
              variant="ghost"
              onClick={() => handleLocationSelect(location.id)}
              className={cn(
                "w-full h-auto p-4 rounded-xl transition-all duration-200 hover:scale-[1.01]",
                location.color,
                isSelected && "ring-2 ring-blue-500 bg-blue-50"
              )}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                  <IconComponent className="h-5 w-5" />
                </div>
                
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{location.name}</span>
                    <Badge variant="outline" className={cn("text-xs", privacy.color)}>
                      <PrivacyIcon className="h-3 w-3 mr-1" />
                      {privacy.label}
                    </Badge>
                  </div>
                  <p className="text-xs opacity-80">{location.description}</p>
                </div>

                {isSelected && (
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                )}
              </div>
            </Button>
          )
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-6 pt-4 border-t border-gray-100">
        <Button 
          variant="outline" 
          onClick={onClose}
          className="flex-1"
        >
          Hủy
        </Button>
        <Button 
          onClick={handleShareLocation}
          disabled={!selectedLocation || isSharing}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600"
        >
          {isSharing ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : (
            <MapPin className="h-4 w-4 mr-2" />
          )}
          {isSharing ? 'Đang chia sẻ...' : 'Chia sẻ'}
        </Button>
      </div>

      {/* Privacy Footer */}
      <div className="mt-4 p-3 bg-gray-50 rounded-xl">
        <div className="flex items-start gap-2">
          <Shield className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-gray-600">
            <p className="font-medium mb-1">Lưu ý về quyền riêng tư:</p>
            <ul className="space-y-1 text-xs">
              <li>• Vị trí chỉ được chia sẻ với người nhận</li>
              <li>• Không lưu trữ vị trí trên máy chủ</li>
              <li>• Bạn có thể tắt chia sẻ vị trí bất cứ lúc nào</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}