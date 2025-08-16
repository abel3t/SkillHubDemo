"use client"

import { Badge } from "@/components/ui/badge"
import { Star, MapPin } from "lucide-react"

interface Helper {
  id: number
  name: string
  title: string
  location: string
  distance: string
  rating: number
  avatar: string
  canHelp: string[]
  verified?: boolean
  isOnline?: boolean
}

interface HelperMarkerProps {
  helper: Helper
  isSelected?: boolean
  onClick?: () => void
  className?: string
}

export function HelperMarker({ 
  helper, 
  isSelected = false, 
  onClick, 
  className = "" 
}: HelperMarkerProps) {
  return (
    <div 
      className={`cursor-pointer transform transition-all duration-200 ${
        isSelected ? 'scale-125 z-10' : 'hover:scale-110'
      } ${className}`}
      onClick={onClick}
    >
      <div className="relative">
        {/* Main marker container */}
        <div className={`relative bg-white rounded-full p-1 shadow-lg border-4 transition-colors ${
          isSelected 
            ? 'border-emerald-500 shadow-emerald-200' 
            : 'border-emerald-400 hover:border-emerald-500'
        }`}>
          {/* Avatar */}
          <div className="relative w-12 h-12">
            <img 
              src={helper.avatar} 
              alt={helper.name}
              className="w-full h-full rounded-full object-cover"
            />
            
            {/* Online status indicator */}
            {helper.isOnline && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            )}
            
            {/* Verification badge */}
            {helper.verified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 border-2 border-white rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Marker pin */}
        <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent transition-colors ${
          isSelected ? 'border-t-emerald-500' : 'border-t-emerald-400'
        }`}></div>
        
        {/* Floating info card when selected */}
        {isSelected && (
          <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-3 min-w-[200px] z-20 border border-gray-200">
            <div className="text-center space-y-2">
              <h4 className="font-semibold text-sm text-gray-900">{helper.name}</h4>
              <p className="text-xs text-gray-600">{helper.title}</p>
              
              <div className="flex items-center justify-center space-x-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{helper.rating}</span>
              </div>
              
              <div className="flex items-center justify-center text-xs text-gray-500">
                <MapPin className="w-3 h-3 mr-1" />
                {helper.distance}
              </div>
              
              {/* Primary skill badge */}
              <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                {helper.canHelp[0]}
              </Badge>
            </div>
            
            {/* Arrow pointing down to marker */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white"></div>
          </div>
        )}
        
        {/* Pulse animation for online helpers */}
        {helper.isOnline && !isSelected && (
          <div className="absolute inset-0 rounded-full border-4 border-emerald-400 animate-ping opacity-30"></div>
        )}
      </div>
    </div>
  )
}