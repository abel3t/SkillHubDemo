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
            <div className="cursor-pointer transform hover:scale-110 transition-transform duration-200">
              <div className="relative">
                {/* Custom marker design */}
                <div className="w-12 h-12 bg-emerald-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                  <img 
                    src={helper.avatar} 
                    alt={helper.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>
                {/* Marker pin */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-emerald-500"></div>
              </div>
            </div>
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
                <p className="text-sm text-gray-500 flex items-center">
                  <span className="w-4 h-4 mr-1">📍</span>
                  {selectedHelper.location}
                </p>
                <p className="text-sm text-gray-500 flex items-center">
                  <span className="w-4 h-4 mr-1">📏</span>
                  {selectedHelper.distance}
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