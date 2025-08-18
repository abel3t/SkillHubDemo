"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Cloud, 
  CloudRain, 
  Sun, 
  AlertTriangle, 
  Umbrella, 
  Home,
  Zap,
  Wrench,
  Calendar,
  MapPin,
  ThermometerSun,
  Wind,
  Droplets,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  Info
} from "lucide-react"
import { cn } from "@/lib/utils"

interface WeatherCondition {
  type: 'sunny' | 'light_rain' | 'heavy_rain' | 'storm' | 'typhoon' | 'flood_risk'
  severity: 'low' | 'medium' | 'high' | 'extreme'
  description: string
  descriptionVi: string
  icon: React.ReactNode
  color: string
}

interface ServiceAvailability {
  serviceType: string
  serviceTypeVi: string
  availability: 'safe' | 'caution' | 'unsafe' | 'emergency_only'
  reason: string
  reasonVi: string
  alternativeAction?: string
  alternativeActionVi?: string
  icon: React.ReactNode
}

interface SeasonalDemand {
  skill: string
  skillVi: string
  season: 'dry_season' | 'rainy_season' | 'typhoon_season' | 'year_round'
  demandLevel: 'low' | 'medium' | 'high' | 'critical'
  peakMonths: string[]
  culturalContext: string
  culturalContextVi: string
  priceMultiplier: number
}

interface MonsoonAlert {
  id: string
  type: 'weather_warning' | 'service_disruption' | 'safety_alert' | 'opportunity'
  severity: 'info' | 'warning' | 'danger'
  title: string
  titleVi: string
  message: string
  messageVi: string
  validUntil: Date
  affectedServices: string[]
  location: string
}

const WEATHER_CONDITIONS: WeatherCondition[] = [
  {
    type: 'sunny',
    severity: 'low',
    description: 'Clear and sunny',
    descriptionVi: 'Trời nắng đẹp',
    icon: <Sun className="w-5 h-5" />,
    color: 'bg-yellow-100 text-yellow-700'
  },
  {
    type: 'light_rain',
    severity: 'low',
    description: 'Light rain',
    descriptionVi: 'Mưa nhỏ',
    icon: <CloudRain className="w-5 h-5" />,
    color: 'bg-blue-100 text-blue-700'
  },
  {
    type: 'heavy_rain',
    severity: 'medium',
    description: 'Heavy rain',
    descriptionVi: 'Mưa to',
    icon: <CloudRain className="w-5 h-5" />,
    color: 'bg-blue-200 text-blue-800'
  },
  {
    type: 'storm',
    severity: 'high',
    description: 'Thunderstorm',
    descriptionVi: 'Giông bão',
    icon: <Cloud className="w-5 h-5" />,
    color: 'bg-gray-200 text-gray-800'
  },
  {
    type: 'typhoon',
    severity: 'extreme',
    description: 'Typhoon warning',
    descriptionVi: 'Cảnh báo bão lớn',
    icon: <AlertTriangle className="w-5 h-5" />,
    color: 'bg-red-200 text-red-800'
  },
  {
    type: 'flood_risk',
    severity: 'high',
    description: 'Flood risk',
    descriptionVi: 'Nguy cơ ngập lụt',
    icon: <Droplets className="w-5 h-5" />,
    color: 'bg-indigo-200 text-indigo-800'
  }
]

const SERVICE_WEATHER_MATRIX: ServiceAvailability[] = [
  // Electrical Services
  {
    serviceType: 'Electrical Repair',
    serviceTypeVi: 'Sửa chữa điện',
    availability: 'unsafe',
    reason: 'Risk of electrocution during wet conditions',
    reasonVi: 'Nguy cơ giật điện khi trời ẩm ướt',
    alternativeAction: 'Wait for dry weather or emergency service only',
    alternativeActionVi: 'Chờ trời khô hoặc chỉ khẩn cấp',
    icon: <Zap className="w-4 h-4" />
  },
  {
    serviceType: 'Roof Repair',
    serviceTypeVi: 'Sửa mái nhà',
    availability: 'unsafe',
    reason: 'Slippery surfaces and lightning risk',
    reasonVi: 'Mặt mái trơn trượt và nguy cơ sét đánh',
    alternativeAction: 'Schedule after weather clears',
    alternativeActionVi: 'Lên lịch sau khi thời tiết tốt',
    icon: <Home className="w-4 h-4" />
  },
  {
    serviceType: 'Plumbing',
    serviceTypeVi: 'Sửa ống nước',
    availability: 'caution',
    reason: 'Difficult to locate leaks, but safe to work',
    reasonVi: 'Khó phát hiện rò rỉ, nhưng an toàn làm việc',
    alternativeAction: 'Indoor work preferred',
    alternativeActionVi: 'Ưu tiên làm trong nhà',
    icon: <Wrench className="w-4 h-4" />
  },
  {
    serviceType: 'House Cleaning',
    serviceTypeVi: 'Dọn dẹp nhà cửa',
    availability: 'safe',
    reason: 'Indoor service, not weather dependent',
    reasonVi: 'Dịch vụ trong nhà, không phụ thuộc thời tiết',
    icon: <Home className="w-4 h-4" />
  },
  {
    serviceType: 'Motorbike Repair',
    serviceTypeVi: 'Sửa xe máy',
    availability: 'caution',
    reason: 'Can work under cover, parts may get wet',
    reasonVi: 'Có thể làm dưới mái che, linh kiện có thể bị ướt',
    alternativeAction: 'Covered workspace recommended',
    alternativeActionVi: 'Nên có chỗ làm có mái che',
    icon: <Wrench className="w-4 h-4" />
  }
]

const SEASONAL_DEMANDS: SeasonalDemand[] = [
  {
    skill: 'Roof Repair',
    skillVi: 'Sửa mái nhà',
    season: 'dry_season',
    demandLevel: 'critical',
    peakMonths: ['Tháng 2', 'Tháng 3', 'Tháng 4'],
    culturalContext: 'Prepare before rainy season starts',
    culturalContextVi: 'Chuẩn bị trước khi mùa mưa đến',
    priceMultiplier: 1.8
  },
  {
    skill: 'Waterproofing',
    skillVi: 'Chống thấm',
    season: 'dry_season',
    demandLevel: 'high',
    peakMonths: ['Tháng 3', 'Tháng 4', 'Tháng 5'],
    culturalContext: 'Essential preparation for monsoon',
    culturalContextVi: 'Chuẩn bị thiết yếu cho mùa mưa',
    priceMultiplier: 1.6
  },
  {
    skill: 'Drain Cleaning',
    skillVi: 'Thông cống rãnh',
    season: 'rainy_season',
    demandLevel: 'critical',
    peakMonths: ['Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9'],
    culturalContext: 'Prevent flooding during heavy rains',
    culturalContextVi: 'Ngăn ngập lụt khi mưa to',
    priceMultiplier: 2.2
  },
  {
    skill: 'Mold Removal',
    skillVi: 'Diệt nấm mốc',
    season: 'rainy_season',
    demandLevel: 'high',
    peakMonths: ['Tháng 7', 'Tháng 8', 'Tháng 9'],
    culturalContext: 'High humidity causes mold growth',
    culturalContextVi: 'Độ ẩm cao gây nấm mốc',
    priceMultiplier: 1.7
  },
  {
    skill: 'Generator Maintenance',
    skillVi: 'Bảo dưỡng máy phát điện',
    season: 'typhoon_season',
    demandLevel: 'high',
    peakMonths: ['Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11'],
    culturalContext: 'Power outages during storms',
    culturalContextVi: 'Mất điện trong bão',
    priceMultiplier: 1.9
  },
  {
    skill: 'Traditional Tea Ceremony',
    skillVi: 'Trà đạo truyền thống',
    season: 'year_round',
    demandLevel: 'medium',
    peakMonths: ['Mọi tháng'],
    culturalContext: 'Especially popular during rainy days',
    culturalContextVi: 'Đặc biệt phổ biến trong những ngày mưa',
    priceMultiplier: 1.2
  }
]

const CURRENT_ALERTS: MonsoonAlert[] = [
  {
    id: '1',
    type: 'weather_warning',
    severity: 'warning',
    title: 'Heavy Rain Expected',
    titleVi: 'Dự báo mưa to',
    message: 'Heavy rainfall expected in Ho Chi Minh City from 2PM to 6PM today',
    messageVi: 'Dự báo mưa to ở TP.HCM từ 14h đến 18h hôm nay',
    validUntil: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
    affectedServices: ['Electrical Repair', 'Roof Repair'],
    location: 'TP.HCM'
  },
  {
    id: '2',
    type: 'opportunity',
    severity: 'info',
    title: 'High Demand for Drain Cleaning',
    titleVi: 'Nhu cầu cao cho thông cống',
    message: 'Increased demand for drain cleaning services due to upcoming heavy rains',
    messageVi: 'Tăng nhu cầu dịch vụ thông cống do mưa to sắp tới',
    validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    affectedServices: ['Drain Cleaning', 'Plumbing'],
    location: 'TP.HCM'
  },
  {
    id: '3',
    type: 'safety_alert',
    severity: 'danger',
    title: 'No Electrical Work During Storm',
    titleVi: 'Không làm việc điện khi bão',
    message: 'Electrical repair services suspended due to safety concerns during thunderstorm',
    messageVi: 'Tạm dừng dịch vụ sửa điện do lo ngại an toàn trong giông bão',
    validUntil: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours
    affectedServices: ['Electrical Repair'],
    location: 'Toàn thành phố'
  }
]

interface MonsoonIntelligenceProps {
  className?: string
}

export function MonsoonIntelligence({ className = "" }: MonsoonIntelligenceProps) {
  const [currentWeather, setCurrentWeather] = useState<WeatherCondition>(WEATHER_CONDITIONS[2]) // Heavy rain
  const [activeAlerts, setActiveAlerts] = useState<MonsoonAlert[]>(CURRENT_ALERTS)
  const [selectedSeason, setSelectedSeason] = useState<'dry_season' | 'rainy_season' | 'typhoon_season'>('rainy_season')

  // Filter services based on current weather
  const getServicesByAvailability = (availability: ServiceAvailability['availability']) => {
    return SERVICE_WEATHER_MATRIX.filter(service => service.availability === availability)
  }

  // Get seasonal demands
  const getSeasonalDemands = () => {
    return SEASONAL_DEMANDS.filter(demand => 
      demand.season === selectedSeason || demand.season === 'year_round'
    ).sort((a, b) => {
      const demandOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 }
      return demandOrder[b.demandLevel] - demandOrder[a.demandLevel]
    })
  }

  const getAlertIcon = (type: MonsoonAlert['type']) => {
    switch (type) {
      case 'weather_warning': return <Cloud className="w-4 h-4" />
      case 'service_disruption': return <XCircle className="w-4 h-4" />
      case 'safety_alert': return <Shield className="w-4 h-4" />
      case 'opportunity': return <CheckCircle className="w-4 h-4" />
      default: return <Info className="w-4 h-4" />
    }
  }

  const getAlertColor = (severity: MonsoonAlert['severity']) => {
    switch (severity) {
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800'
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      case 'danger': return 'bg-red-50 border-red-200 text-red-800'
      default: return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  const getDemandColor = (level: SeasonalDemand['demandLevel']) => {
    switch (level) {
      case 'critical': return 'bg-red-100 text-red-700'
      case 'high': return 'bg-orange-100 text-orange-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'low': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Umbrella className="w-5 h-5 text-blue-600" />
          Hệ thống thông minh thời tiết
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            <MapPin className="w-3 h-3 mr-1" />
            TP. Hồ Chí Minh
          </Badge>
          <Badge variant="outline" className="text-xs">
            Độc quyền Việt Nam - Không thể sao chép
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Current Weather Status */}
        <div className="p-4 rounded-lg border" style={{ backgroundColor: currentWeather.color.split(' ')[0].replace('bg-', ''), opacity: 0.1 }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", currentWeather.color)}>
                {currentWeather.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{currentWeather.descriptionVi}</h3>
                <p className="text-sm text-gray-600">Cập nhật: 5 phút trước</p>
              </div>
            </div>
            <div className="text-right">
              <Badge className={currentWeather.color}>
                {currentWeather.severity === 'extreme' ? 'Cực kỳ nguy hiểm' : 
                 currentWeather.severity === 'high' ? 'Nguy hiểm' :
                 currentWeather.severity === 'medium' ? 'Cảnh báo' : 'Bình thường'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Active Alerts */}
        {activeAlerts.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Cảnh báo hiện tại
            </h4>
            <div className="space-y-2">
              {activeAlerts.map((alert) => (
                <Alert key={alert.id} className={getAlertColor(alert.severity)}>
                  <div className="flex items-start gap-2">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <AlertDescription>
                        <div className="font-medium">{alert.titleVi}</div>
                        <div className="text-sm mt-1">{alert.messageVi}</div>
                        <div className="text-xs mt-1 opacity-75">
                          <Clock className="w-3 h-3 inline mr-1" />
                          Hiệu lực đến: {alert.validUntil.toLocaleTimeString('vi-VN')}
                        </div>
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          </div>
        )}

        {/* Service Availability Matrix */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Tình trạng dịch vụ theo thời tiết
          </h4>
          
          <div className="space-y-3">
            {/* Safe Services */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">An toàn</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {getServicesByAvailability('safe').map((service, index) => (
                  <div key={index} className="p-2 bg-green-50 rounded border border-green-200">
                    <div className="flex items-center gap-2">
                      {service.icon}
                      <span className="text-sm font-medium text-green-800">{service.serviceTypeVi}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Caution Services */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-700">Cẩn thận</span>
              </div>
              <div className="space-y-2">
                {getServicesByAvailability('caution').map((service, index) => (
                  <div key={index} className="p-2 bg-yellow-50 rounded border border-yellow-200">
                    <div className="flex items-center gap-2 mb-1">
                      {service.icon}
                      <span className="text-sm font-medium text-yellow-800">{service.serviceTypeVi}</span>
                    </div>
                    <p className="text-xs text-yellow-700">{service.reasonVi}</p>
                    {service.alternativeActionVi && (
                      <p className="text-xs text-yellow-600 mt-1">💡 {service.alternativeActionVi}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Unsafe Services */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-700">Không an toàn</span>
              </div>
              <div className="space-y-2">
                {getServicesByAvailability('unsafe').map((service, index) => (
                  <div key={index} className="p-2 bg-red-50 rounded border border-red-200">
                    <div className="flex items-center gap-2 mb-1">
                      {service.icon}
                      <span className="text-sm font-medium text-red-800">{service.serviceTypeVi}</span>
                    </div>
                    <p className="text-xs text-red-700">{service.reasonVi}</p>
                    {service.alternativeActionVi && (
                      <p className="text-xs text-red-600 mt-1">⚠️ {service.alternativeActionVi}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Seasonal Demand Predictions */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Dự đoán nhu cầu theo mùa
          </h4>
          
          {/* Season Selector */}
          <div className="flex gap-2 mb-4">
            <Button
              variant={selectedSeason === 'dry_season' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSeason('dry_season')}
            >
              <Sun className="w-3 h-3 mr-1" />
              Mùa khô
            </Button>
            <Button
              variant={selectedSeason === 'rainy_season' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSeason('rainy_season')}
            >
              <CloudRain className="w-3 h-3 mr-1" />
              Mùa mưa
            </Button>
            <Button
              variant={selectedSeason === 'typhoon_season' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSeason('typhoon_season')}
            >
              <Wind className="w-3 h-3 mr-1" />
              Mùa bão
            </Button>
          </div>

          <div className="space-y-3">
            {getSeasonalDemands().map((demand, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">{demand.skillVi}</h5>
                  <div className="flex items-center gap-2">
                    <Badge className={getDemandColor(demand.demandLevel)}>
                      {demand.demandLevel === 'critical' ? 'Cực cao' :
                       demand.demandLevel === 'high' ? 'Cao' :
                       demand.demandLevel === 'medium' ? 'Trung bình' : 'Thấp'}
                    </Badge>
                    <Badge variant="outline">
                      +{Math.round((demand.priceMultiplier - 1) * 100)}% giá
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">{demand.culturalContextVi}</p>
                <p className="text-xs text-gray-500">
                  Cao điểm: {demand.peakMonths.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Big Tech Cannot Copy */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <ThermometerSun className="w-4 h-4" />
            Tại sao BigTech không thể sao chép?
          </h4>
          <p className="text-sm text-blue-700">
            Hệ thống này kết hợp kiến thức sâu về thời tiết nhiệt đới Việt Nam, thói quen văn hóa 
            (như sửa mái trước mùa mưa), và hiểu biết về an toàn lao động địa phương. 
            Đây là trí tuệ cộng đồng được tích lũy qua nhiều thế hệ, không thể mua được hay học từ dữ liệu.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}