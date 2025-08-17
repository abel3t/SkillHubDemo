"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/shared/Navigation"
import { 
  Star, 
  Crown, 
  TrendingUp, 
  MessageSquare, 
  CheckCircle, 
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

// Simple key benefits
const benefits = [
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Ưu tiên trong tìm kiếm",
    description: "Hồ sơ của bạn xuất hiện đầu tiên"
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Tin nhắn không giới hạn", 
    description: "Liên hệ với khách hàng tự do"
  },
  {
    icon: <Crown className="w-6 h-6" />,
    title: "Huy hiệu Premium",
    description: "Tăng độ tin cậy và nổi bật"
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Thống kê chi tiết",
    description: "Theo dõi lượt xem và hiệu quả"
  }
]

const PremiumPage = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="w-8 h-8 text-yellow-500" />
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                Premium
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Nâng tầm sự nghiệp với
              <span className="text-emerald-600"> SkillHub Premium</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Được nhiều khách hàng tìm thấy hơn, xây dựng danh tiếng và tăng thu nhập với các tính năng Premium.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pricing */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              
              {/* Free Plan */}
              <Card className="relative">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">Miễn phí</CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-gray-900">0₫</span>
                      <span className="text-gray-600">/tháng</span>
                    </div>
                    <p className="text-gray-600">Cho người mới bắt đầu</p>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span className="text-gray-700">Tạo hồ sơ cơ bản</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span className="text-gray-700">5 tin nhắn/ngày</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span className="text-gray-700">Tìm kiếm cơ bản</span>
                    </li>
                  </ul>
                  
                  <Button variant="outline" className="w-full" disabled>
                    Gói hiện tại
                  </Button>
                </CardContent>
              </Card>

              {/* Premium Plan */}
              <Card className="relative ring-2 ring-emerald-500 shadow-lg">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-emerald-600 text-white">
                    Phổ biến nhất
                  </Badge>
                </div>
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">Premium</CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-gray-900">99,000₫</span>
                      <span className="text-gray-600">/tháng</span>
                    </div>
                    <p className="text-gray-600">Cho chuyên gia nghiêm túc</p>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span className="text-gray-700">Tất cả tính năng miễn phí</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span className="text-gray-700">Tin nhắn không giới hạn</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span className="text-gray-700">Ưu tiên trong tìm kiếm</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span className="text-gray-700">Thống kê chi tiết</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span className="text-gray-700">Huy hiệu Premium</span>
                    </li>
                  </ul>
                  
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Bắt đầu dùng thử miễn phí
                  </Button>
                </CardContent>
              </Card>

            </div>
          </motion.div>

          {/* Simple CTA */}
          <motion.div variants={itemVariants}>
            <Card className="bg-emerald-50 border-emerald-200">
              <CardContent className="p-8 text-center space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Dùng thử miễn phí 14 ngày
                </h2>
                <p className="text-gray-700 max-w-xl mx-auto">
                  Trải nghiệm tất cả tính năng Premium mà không cần thẻ tín dụng. 
                  Hủy bất cứ lúc nào.
                </p>
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                  Bắt đầu ngay
                </Button>
                <p className="text-emerald-700 text-sm">
                  ✓ Không cần thẻ tín dụng • ✓ Hủy bất cứ lúc nào
                </p>
              </CardContent>
            </Card>
          </motion.div>

        </motion.div>
      </main>
    </div>
  )
}

export default PremiumPage