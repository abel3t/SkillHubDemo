"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  DollarSign,
  Clock,
  Star,
  CheckCircle,
  Info,
  Edit,
  Plus,
  TrendingUp,
  Award,
  Calculator
} from "lucide-react"

interface PricingTier {
  id: string
  name: string
  description: string
  price: number
  unit: string
  duration: number // minutes
  included: string[]
  popular?: boolean
  discount?: number
}

interface PricingCardProps {
  isOwnProfile?: boolean
  onEditPricing?: () => void
  onBookService?: (tier: PricingTier) => void
}

// Mock pricing data
const mockPricingTiers: PricingTier[] = [
  {
    id: "basic",
    name: "Tư vấn cơ bản",
    description: "Phù hợp cho các vấn đề đơn giản",
    price: 200000,
    unit: "VNĐ",
    duration: 30,
    included: [
      "Tư vấn qua điện thoại",
      "Đánh giá sơ bộ vấn đề",
      "Hướng dẫn xử lý cơ bản",
      "Hỗ trợ sau 1 ngày"
    ]
  },
  {
    id: "standard",
    name: "Dịch vụ tiêu chuẩn",
    description: "Lựa chọn phổ biến nhất",
    price: 400000,
    unit: "VNĐ", 
    duration: 60,
    included: [
      "Tất cả ở gói cơ bản",
      "Khảo sát tại nhà",
      "Báo giá chi tiết",
      "Tư vấn giải pháp",
      "Hỗ trợ sau 7 ngày",
      "Bảo hành công việc"
    ],
    popular: true
  },
  {
    id: "premium", 
    name: "Gói cao cấp",
    description: "Dành cho dự án phức tạp",
    price: 600000,
    unit: "VNĐ",
    duration: 90,
    included: [
      "Tất cả ở gói tiêu chuẩn",
      "Thiết kế giải pháp",
      "Lập kế hoạch chi tiết",
      "Hỗ trợ 24/7",
      "Bảo hành mở rộng 30 ngày",
      "Ưu tiên cao nhất"
    ],
    discount: 15
  }
]

const testimonials = [
  {
    name: "Anh Tuấn",
    rating: 5,
    comment: "Giá cả rất hợp lý, chất lượng vượt mong đợi",
    service: "Gói tiêu chuẩn"
  },
  {
    name: "Chị Lan", 
    rating: 5,
    comment: "Tư vấn rất tận tâm, đáng đồng tiền bát gạo",
    service: "Gói cao cấp"
  }
]

export function PricingCard({ isOwnProfile = false, onEditPricing, onBookService }: PricingCardProps) {
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [showComparison, setShowComparison] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price)
  }

  const calculateSavings = (tier: PricingTier) => {
    if (!tier.discount) return null
    const savings = (tier.price * tier.discount) / 100
    return savings
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Bảng giá dịch vụ
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {isOwnProfile ? "Quản lý giá cả dịch vụ của bạn" : "Giá cả minh bạch, không phí ẩn"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {!isOwnProfile && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowComparison(!showComparison)}
              >
                <Calculator className="w-4 h-4 mr-2" />
                So sánh
              </Button>
            )}
            {isOwnProfile && (
              <Button size="sm" onClick={onEditPricing} className="bg-emerald-600 hover:bg-emerald-700">
                <Edit className="w-4 h-4 mr-2" />
                Chỉnh sửa
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Trust Indicators */}
        <div className="px-6 py-4 bg-emerald-50 border-b border-emerald-100">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-emerald-700">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span className="font-medium">Giá cố định</span>
              </div>
              <div className="flex items-center text-emerald-700">
                <Award className="w-4 h-4 mr-1" />
                <span className="font-medium">Bảo hành công việc</span>
              </div>
              <div className="flex items-center text-emerald-700">
                <Star className="w-4 h-4 mr-1" />
                <span className="font-medium">4.9★ đánh giá</span>
              </div>
            </div>
            <Badge className="bg-emerald-100 text-emerald-800">
              Đã phục vụ 200+ khách hàng
            </Badge>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockPricingTiers.map((tier) => {
              const savings = calculateSavings(tier)
              const isSelected = selectedTier === tier.id
              
              return (
                <motion.div
                  key={tier.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative ${tier.popular ? 'md:-mt-4 md:mb-4' : ''}`}
                >
                  <div
                    className={`rounded-xl border-2 p-6 cursor-pointer transition-all ${
                      tier.popular 
                        ? 'border-emerald-500 bg-emerald-50 shadow-lg' 
                        : isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                    onClick={() => setSelectedTier(isSelected ? null : tier.id)}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-emerald-500 text-white px-3 py-1">
                          Phổ biến nhất
                        </Badge>
                      </div>
                    )}

                    {tier.discount && (
                      <div className="absolute -top-2 -right-2">
                        <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          -{tier.discount}%
                        </div>
                      </div>
                    )}

                    <div className="text-center mb-4">
                      <h3 className={`text-lg font-bold ${
                        tier.popular ? 'text-emerald-800' : 'text-gray-900'
                      }`}>
                        {tier.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{tier.description}</p>
                    </div>

                    <div className="text-center mb-6">
                      <div className="flex items-baseline justify-center">
                        <span className={`text-3xl font-bold ${
                          tier.popular ? 'text-emerald-600' : 'text-gray-900'
                        }`}>
                          {formatPrice(tier.price)}
                        </span>
                        <span className="text-gray-500 ml-2">{tier.unit}</span>
                      </div>
                      
                      <div className="flex items-center justify-center mt-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{tier.duration} phút</span>
                      </div>

                      {savings && (
                        <div className="mt-2 text-sm text-green-600 font-medium">
                          Tiết kiệm {formatPrice(savings)} VNĐ
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 mb-6">
                      {tier.included.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${
                            tier.popular ? 'text-emerald-600' : 'text-green-500'
                          }`} />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      className={`w-full ${
                        tier.popular 
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                      variant={tier.popular ? "default" : "outline"}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (onBookService) {
                          onBookService(tier)
                        }
                      }}
                    >
                      {isOwnProfile ? "Xem chi tiết" : "Chọn gói này"}
                    </Button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Comparison Table */}
        {showComparison && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-100 p-6 bg-gray-50"
          >
            <h4 className="text-lg font-semibold text-gray-900 mb-4">So sánh chi tiết</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Tính năng</th>
                    {mockPricingTiers.map(tier => (
                      <th key={tier.id} className="text-center py-2">{tier.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Thời gian</td>
                    {mockPricingTiers.map(tier => (
                      <td key={tier.id} className="text-center py-2">{tier.duration} phút</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Tư vấn qua điện thoại</td>
                    {mockPricingTiers.map(tier => (
                      <td key={tier.id} className="text-center py-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mx-auto" />
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Khảo sát tại nhà</td>
                    <td className="text-center py-2">-</td>
                    {mockPricingTiers.slice(1).map(tier => (
                      <td key={tier.id} className="text-center py-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mx-auto" />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Customer Testimonials */}
        <div className="border-t border-gray-100 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
            Phản hồi khách hàng
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900">{testimonial.name}</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">"{testimonial.comment}"</p>
                <Badge variant="secondary" className="text-xs">
                  {testimonial.service}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="border-t border-gray-100 p-6 bg-blue-50">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Thông tin quan trọng:</p>
              <ul className="space-y-1 text-blue-700">
                <li>• Giá đã bao gồm VAT và chi phí di chuyển trong nội thành</li>
                <li>• Thanh toán sau khi hoàn thành công việc</li>
                <li>• Miễn phí tư vấn lại trong 7 ngày đầu</li>
                <li>• Hỗ trợ khẩn cấp 24/7 với phụ phí</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}