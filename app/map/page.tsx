"use client"

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { InteractiveMap } from '@/components/map/InteractiveMap'
import { LocationControls } from '@/components/map/LocationControls'
import { DistanceSlider } from '@/components/map/DistanceSlider'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Navigation } from '@/components/shared/Navigation'
import { cn } from '@/lib/utils'
import { 
  List,
  MapIcon,
  Search
} from 'lucide-react'

// Privacy-friendly location system - coordinates are approximate areas, not exact addresses
const mockHelpers = [
  {
    id: 1,
    name: "Nguyễn Văn Minh",
    title: "Có thể giúp về điện",
    location: "Khu vực Quận 1", // General area for privacy
    distance: "0.8km",
    rating: 4.9,
    avatar: "/vietnamese-technician.png",
    canHelp: ["Điện dân dụng", "Sửa chữa thiết bị", "Tư vấn an toàn điện"],
    // Approximate area center with privacy offset
    lat: 10.7769 + (Math.random() - 0.5) * 0.01,
    lng: 106.7009 + (Math.random() - 0.5) * 0.01,
    verified: true,
    isOnline: true,
  },
  {
    id: 2,
    name: "Lê Thị Hương",
    title: "Dạy Piano & chia sẻ âm nhạc",
    location: "Khu vực Quận 3", // General area for privacy
    distance: "1.1km",
    rating: 4.9,
    avatar: "/vietnamese-user.png",
    canHelp: ["Piano cơ bản", "Lý thuyết âm nhạc", "Hướng dẫn mua đàn"],
    // Approximate area center with privacy offset
    lat: 10.7756 + (Math.random() - 0.5) * 0.01,
    lng: 106.6878 + (Math.random() - 0.5) * 0.01,
    verified: true,
    isOnline: true,
  },
  {
    id: 3,
    name: "Phạm Hoàng Nam",
    title: "Yêu thích cầu lông & thể thao",
    location: "Quận 7, TP.HCM",
    distance: "1.5km",
    rating: 4.8,
    avatar: "/vietnamese-handyman.png",
    canHelp: ["Cầu lông cơ bản", "Kỹ thuật nâng cao", "Tìm bạn tập"],
    lat: 10.7364,
    lng: 106.7217,
    verified: true,
    isOnline: false,
  },
  {
    id: 4,
    name: "Trần Thị Mai",
    title: "Giúp học tiếng Anh",
    location: "Quận 1, TP.HCM",
    distance: "0.9km",
    rating: 4.9,
    avatar: "/vietnamese-cleaning-lady.png",
    canHelp: ["Giao tiếp tiếng Anh", "Luyện phát âm", "Tư vấn học IELTS"],
    lat: 10.7745,
    lng: 106.7006,
    verified: true,
    isOnline: true,
  },
  {
    id: 5,
    name: "Nguyễn Thành Đạt",
    title: "Đam mê nấu ăn & chia sẻ công thức",
    location: "Quận 5, TP.HCM",
    distance: "2.3km",
    rating: 4.7,
    avatar: "/vietnamese-technician.png",
    canHelp: ["Món Việt truyền thống", "Bánh ngọt", "Trang trí món ăn"],
    lat: 10.7560,
    lng: 106.6829,
    verified: true,
    isOnline: false,
  },
  {
    id: 6,
    name: "Võ Minh Tuấn",
    title: "Giúp học toán & giải bài tập",
    location: "Quận 10, TP.HCM",
    distance: "2.8km",
    rating: 4.8,
    avatar: "/vietnamese-handyman.png",
    canHelp: ["Toán THCS", "Toán THPT", "Giải bài tập"],
    lat: 10.7626,
    lng: 106.6730,
    verified: true,
    isOnline: true,
  },
]

export default function MapPage() {
  const router = useRouter()
  const [currentLocation, setCurrentLocation] = useState("Quận 1, TP.HCM")
  const [mapCenter, setMapCenter] = useState<[number, number]>([10.7769, 106.7009])
  const [searchDistance, setSearchDistance] = useState(5)
  const [selectedHelper, setSelectedHelper] = useState<any>(null)
  const [showListView, setShowListView] = useState(false)

  // Filter helpers based on distance
  const filteredHelpers = useMemo(() => {
    return mockHelpers.filter(helper => {
      const distanceValue = parseFloat(helper.distance.replace('km', ''))
      return distanceValue <= searchDistance
    })
  }, [searchDistance])

  const handleLocationChange = (location: string, coordinates?: [number, number]) => {
    setCurrentLocation(location)
    if (coordinates) {
      setMapCenter(coordinates)
    }
  }

  const handleCurrentLocationClick = () => {
    // This would typically get user's current location
    console.log('Getting current location...')
  }

  const handleHelperSelect = (helper: any) => {
    setSelectedHelper(helper)
    console.log('Selected helper:', helper)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.8, 0.25, 1] as const
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Navigation />

      <motion.div 
        className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Mobile Controls - Clean and Simple */}
        <div className="lg:hidden mb-4 space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-emerald-500" />
            <input
              type="text"
              placeholder="Tìm kỹ năng (điện, piano, tiếng Anh...)"
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 text-sm shadow-sm"
            />
          </div>

          {/* Location and Controls Row */}
          <div className="flex gap-3">
            {/* Location */}
            <div className="flex-1 flex items-center bg-white rounded-xl p-3 shadow-sm border border-gray-200">
              <MapIcon className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-700 truncate">{currentLocation}</span>
            </div>

            {/* Distance */}
            <div className="w-20 bg-white rounded-xl p-3 shadow-sm border border-gray-200 text-center">
              <div className="text-xs text-gray-500">Bán kính</div>
              <div className="text-sm font-semibold text-emerald-600">{searchDistance}km</div>
            </div>

            {/* View Toggle */}
            <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-200">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "p-2 rounded-lg transition-all",
                  !showListView 
                    ? "bg-emerald-500 text-white shadow-sm" 
                    : "text-gray-600 hover:bg-gray-100"
                )}
                onClick={() => setShowListView(false)}
              >
                <MapIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "p-2 rounded-lg transition-all",
                  showListView 
                    ? "bg-emerald-500 text-white shadow-sm" 
                    : "text-gray-600 hover:bg-gray-100"
                )}
                onClick={() => setShowListView(true)}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between bg-emerald-50 rounded-lg p-3">
            <span className="text-sm text-emerald-700">
              Tìm thấy <span className="font-semibold">{filteredHelpers.length}</span> chuyên gia gần bạn
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-emerald-600 hover:text-emerald-700 h-6 px-2"
              onClick={() => {/* Open filter modal */}}
            >
              Lọc
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 h-[calc(100vh-240px)] lg:h-[calc(100vh-200px)]">
          {/* Controls Sidebar - Hidden on mobile, sidebar on desktop */}
          <motion.div className="hidden lg:block lg:col-span-1 lg:overflow-y-auto" variants={itemVariants}>
            <div className="space-y-4">
              {/* Enhanced Search Section */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-emerald-50">
                  <CardContent className="p-3 sm:p-4">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center">
                      <Search className="w-4 h-4 mr-2 text-emerald-600" />
                      Tìm kiếm
                    </h3>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-emerald-500" />
                      <input
                        type="text"
                        placeholder="Nhập kỹ năng..."
                        className="w-full pl-10 pr-4 py-2 sm:py-3 border-2 border-emerald-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 bg-white/80 backdrop-blur-sm transition-all text-sm"
                      />
                    </div>
                    <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-2">
                      {['Điện', 'Piano', 'Tiếng Anh', 'Nấu ăn'].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          className="px-2 sm:px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors touch-target"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Location Controls */}
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <LocationControls
                  currentLocation={currentLocation}
                  onLocationChange={handleLocationChange}
                  onCurrentLocationClick={handleCurrentLocationClick}
                />
              </motion.div>

              {/* Distance Slider */}
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <DistanceSlider
                  initialDistance={searchDistance}
                  onDistanceChange={setSearchDistance}
                  helperCount={filteredHelpers.length}
                />
              </motion.div>

              {/* Enhanced View Toggle */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="shadow-lg border-0 bg-white">
                  <CardContent className="p-3 sm:p-4">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center">
                      <MapIcon className="w-4 h-4 mr-2 text-emerald-600" />
                      Chế độ xem
                    </h3>
                    <div className="bg-gray-100 p-1 rounded-xl">
                      <Button
                        variant={!showListView ? "default" : "ghost"}
                        size="sm"
                        className={cn(
                          "flex-1 rounded-lg transition-all text-xs sm:text-sm h-10",
                          !showListView 
                            ? "bg-emerald-500 text-white shadow-md" 
                            : "text-gray-600 hover:bg-white"
                        )}
                        onClick={() => setShowListView(false)}
                      >
                        <MapIcon className="w-4 h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Bản đồ</span>
                        <span className="sm:hidden">Bản đồ</span>
                      </Button>
                      <Button
                        variant={showListView ? "default" : "ghost"}
                        size="sm"
                        className={cn(
                          "flex-1 rounded-lg transition-all ml-1 text-xs sm:text-sm h-10",
                          showListView 
                            ? "bg-emerald-500 text-white shadow-md" 
                            : "text-gray-600 hover:bg-white"
                        )}
                        onClick={() => setShowListView(true)}
                      >
                        <List className="w-4 h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Danh sách</span>
                        <span className="sm:hidden">DS</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Enhanced Results Summary */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="shadow-lg border-0 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                  <CardContent className="p-3 sm:p-4">
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold mb-1">
                        {filteredHelpers.length}
                      </div>
                      <div className="text-emerald-100 text-xs sm:text-sm">
                        chuyên gia gần bạn
                      </div>
                      <div className="mt-2 sm:mt-3 p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <div className="text-xs text-emerald-100">
                          Bán kính: {searchDistance}km
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Privacy Notice */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="hidden sm:block lg:block"
              >
                <Card className="shadow-sm border-0 bg-blue-50">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-white rounded-full m-1" />
                      </div>
                      <div className="text-xs text-blue-700">
                        <strong>Bảo mật:</strong> Vị trí hiển thị là khu vực tổng quát, không phải địa chỉ chính xác để bảo vệ quyền riêng tư.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Main Content - Enhanced Map or List */}
          <motion.div className="col-span-1 lg:col-span-4" variants={itemVariants}>
            <AnimatePresence mode="wait">
              {!showListView ? (
                <motion.div
                  key="map-view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="shadow-lg h-full border-2 border-gray-100 hover:border-emerald-200 transition-colors">
                    <CardContent className="p-0 h-full">
                      <InteractiveMap
                        helpers={filteredHelpers}
                        center={mapCenter}
                        zoom={13}
                        onHelperSelect={handleHelperSelect}
                        className="w-full h-full rounded-lg"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="list-view"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="shadow-lg h-full border-2 border-gray-100 hover:border-emerald-200 transition-colors">
                    <CardContent className="p-4 h-full overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">
                        Danh sách chuyên gia
                      </h2>
                      <Badge variant="outline">
                        {filteredHelpers.length} kết quả
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      {filteredHelpers.map((helper) => (
                        <Card 
                          key={helper.id} 
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => handleHelperSelect(helper)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-4">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={helper.avatar} alt={helper.name} />
                                <AvatarFallback>{helper.name[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                  <h3 className="font-semibold text-gray-900 truncate">
                                    {helper.name}
                                  </h3>
                                  {helper.verified && (
                                    <Badge variant="secondary" className="text-xs">
                                      Đã xác minh
                                    </Badge>
                                  )}
                                  {helper.isOnline && (
                                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 truncate">
                                  {helper.title}
                                </p>
                                <div className="flex items-center space-x-4 mt-1">
                                  <span className="text-sm text-gray-500">
                                    {helper.location} • {helper.distance}
                                  </span>
                                  <div className="flex items-center">
                                    <span className="text-yellow-500 text-sm">★</span>
                                    <span className="text-sm ml-1">{helper.rating}</span>
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {helper.canHelp.slice(0, 2).map((skill) => (
                                    <Badge key={skill} variant="outline" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}