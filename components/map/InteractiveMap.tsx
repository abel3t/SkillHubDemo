"use client"

import { useEffect, useState, useCallback } from 'react'
import { Map, Marker, Popup } from 'react-map-gl/maplibre'
import { motion } from 'framer-motion'
import 'maplibre-gl/dist/maplibre-gl.css'

interface Helper {
  id: number
  name: string
  title: string
  location: string
  distance: string
  rating: number
  avatar: string
  canHelp: string[]
  lat: number
  lng: number
  verified?: boolean
  isOnline?: boolean
}

interface InteractiveMapProps {
  helpers: Helper[]
  center: [number, number]
  zoom: number
  onHelperSelect: (helper: Helper) => void
  className?: string
}

export function InteractiveMap({ 
  helpers, 
  center, 
  zoom, 
  onHelperSelect, 
  className = "" 
}: InteractiveMapProps) {
  const [selectedHelper, setSelectedHelper] = useState<Helper | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleMarkerClick = useCallback((helper: Helper) => {
    setSelectedHelper(helper)
    onHelperSelect(helper)
  }, [onHelperSelect])

  if (!isMounted) {
    return (
      <div className={`bg-gray-100 animate-pulse rounded-lg ${className}`}>
        <div className="w-full h-full flex items-center justify-center min-h-[400px]">
          <span className="text-gray-500">Đang tải bản đồ...</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      <Map
        initialViewState={{
          longitude: center[1],
          latitude: center[0],
          zoom: zoom
        }}
        style={{ width: '100%', height: '100%', minHeight: '400px' }}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
        attributionControl={false}
      >
        {helpers.map((helper) => (
          <Marker
            key={helper.id}
            longitude={helper.lng}
            latitude={helper.lat}
            anchor="bottom"
            onClick={() => handleMarkerClick(helper)}
          >
            <motion.div 
              className="cursor-pointer"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20,
                delay: Math.random() * 0.5 // Stagger animation
              }}
            >
              <div className="relative">
                {/* Enhanced privacy-aware marker */}
                <div className="relative">
                  {/* Outer glow for online status */}
                  {helper.isOnline && (
                    <motion.div 
                      className="absolute inset-0 bg-emerald-400 rounded-full opacity-30"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  
                  {/* Main marker */}
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full border-4 border-white shadow-xl flex items-center justify-center hover:from-emerald-500 hover:to-emerald-700 transition-all relative overflow-hidden">
                    {/* Background pattern for privacy */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="w-full h-full bg-gradient-to-br from-emerald-300 to-emerald-500 rounded-full"></div>
                    </div>
                    
                    {/* Avatar with privacy blur */}
                    <div className="relative z-10">
                      <img 
                        src={helper.avatar} 
                        alt={`${helper.name} - Khu vực`}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-white/50"
                      />
                      
                      {/* Verification badge */}
                      {helper.verified && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                      
                      {/* Online indicator */}
                      {helper.isOnline && (
                        <motion.div 
                          className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Enhanced marker pin */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                  <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-emerald-600 drop-shadow-md"></div>
                </div>
                
                {/* Subtle shadow */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-black/20 rounded-full blur-sm"></div>
              </div>
            </motion.div>
          </Marker>
        ))}

        {selectedHelper && (
          <Popup
            longitude={selectedHelper.lng}
            latitude={selectedHelper.lat}
            anchor="top"
            onClose={() => setSelectedHelper(null)}
            closeButton={true}
            closeOnClick={false}
            className="max-w-xs"
          >
            <motion.div 
              className="p-3 min-w-[250px]"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="flex items-center space-x-3 mb-3">
                <img 
                  src={selectedHelper.avatar} 
                  alt={selectedHelper.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-200"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-base text-gray-900">{selectedHelper.name}</h3>
                  <p className="text-sm text-gray-600">{selectedHelper.title}</p>
                </div>
              </div>
              
              <div className="mb-3 space-y-1">
                <div className="bg-blue-50 p-2 rounded-lg mb-2">
                  <p className="text-xs text-blue-700 font-medium flex items-center">
                    <span className="w-3 h-3 mr-1">🛡️</span>
                    Vị trí riêng tư
                  </p>
                  <p className="text-xs text-blue-600">
                    Hiển thị khu vực tổng quát, không phải địa chỉ chính xác
                  </p>
                </div>
                <p className="text-sm text-gray-600 flex items-center">
                  <span className="w-4 h-4 mr-1">📍</span>
                  {selectedHelper.location}
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <span className="w-4 h-4 mr-1">📏</span>
                  Cách bạn khoảng {selectedHelper.distance}
                </p>
              </div>
              
              <div className="flex items-center mb-3">
                <span className="text-yellow-500 text-lg">★</span>
                <span className="text-sm font-medium ml-1">{selectedHelper.rating}</span>
                <span className="text-xs text-gray-500 ml-1">đánh giá</span>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Có thể giúp:</p>
                <div className="flex flex-wrap gap-1">
                  {selectedHelper.canHelp.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {selectedHelper.canHelp.length > 3 && (
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      +{selectedHelper.canHelp.length - 3} khác
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </Popup>
        )}
      </Map>
      
      {/* Attribution for OpenFreeMap */}
      <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs text-gray-600">
        <a href="https://openfreemap.org" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
          OpenFreeMap
        </a>
        {' © '}
        <a href="https://www.openmaptiles.org/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
          OpenMapTiles
        </a>
        {' Data from '}
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
          OpenStreetMap
        </a>
      </div>
    </div>
  )
}