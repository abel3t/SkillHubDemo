"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/shared/Navigation"
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText, 
  User, 
  Star, 
  Shield, 
  CreditCard, 
  Settings, 
  HelpCircle, 
  ChevronRight, 
  ChevronDown, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Map,
  Camera,
  Award
} from "lucide-react"
import { cn } from "@/lib/utils"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

// FAQ Categories
const faqCategories = [
  {
    id: "getting-started",
    title: "Bắt đầu sử dụng",
    icon: <User className="w-5 h-5" />,
    color: "bg-blue-100 text-blue-700",
    faqs: [
      {
        question: "Làm thế nào để tạo tài khoản SkillHub?",
        answer: "Nhấn vào nút 'Đăng ký' ở góc trên bên phải, nhập thông tin cá nhân và xác minh email. Quá trình chỉ mất 2 phút!"
      },
      {
        question: "Tôi có thể sử dụng SkillHub miễn phí không?",
        answer: "Có! SkillHub hoàn toàn miễn phí cho người dùng cơ bản. Bạn có thể tạo hồ sơ, tìm kiếm chuyên gia và nhận được trợ giúp từ cộng đồng."
      },
      {
        question: "Làm thế nào để hoàn thiện hồ sơ của tôi?",
        answer: "Vào phần 'Hồ sơ', thêm ảnh đại diện, mô tả kỹ năng, kinh nghiệm và tải lên ảnh minh họa công việc. Hồ sơ hoàn thiện giúp bạn nhận được nhiều yêu cầu hơn."
      }
    ]
  },
  {
    id: "finding-help",
    title: "Tìm kiếm trợ giúp",
    icon: <Search className="w-5 h-5" />,
    color: "bg-emerald-100 text-emerald-700",
    faqs: [
      {
        question: "Làm thế nào để tìm người giúp việc phù hợp?",
        answer: "Sử dụng thanh tìm kiếm ở trang chủ, nhập kỹ năng cần thiết (VD: 'sửa điện', 'dạy piano'). Bạn có thể lọc theo khoảng cách, giá cả và đánh giá."
      },
      {
        question: "Tôi có thể xem đánh giá về người cung cấp dịch vụ không?",
        answer: "Có! Mỗi hồ sơ đều hiển thị đánh giá từ khách hàng trước đó, số sao, và những bình luận chi tiết về chất lượng dịch vụ."
      },
      {
        question: "Làm thế nào để liên hệ với chuyên gia?",
        answer: "Nhấn 'Nhắn tin' trên hồ sơ chuyên gia. Tin nhắn đầu tiên miễn phí và bạn có thể thảo luận chi tiết về nhu cầu của mình."
      }
    ]
  },
  {
    id: "providing-services",
    title: "Cung cấp dịch vụ",
    icon: <Star className="w-5 h-5" />,
    color: "bg-purple-100 text-purple-700",
    faqs: [
      {
        question: "Làm thế nào để trở thành nhà cung cấp dịch vụ?",
        answer: "Hoàn thiện hồ sơ với kỹ năng chuyên môn, thêm ảnh minh họa và mô tả chi tiết dịch vụ. Bắt đầu với giá cạnh tranh để thu hút khách hàng đầu tiên."
      },
      {
        question: "Tôi có thể đặt giá dịch vụ như thế nào?",
        answer: "Bạn tự do đặt giá. Tham khảo giá thị trường trong khu vực và bắt đầu cạnh tranh để xây dựng danh tiếng. Sau đó có thể tăng giá dần."
      },
      {
        question: "SkillHub có thu phí từ tôi không?",
        answer: "Không! SkillHub hoàn toàn miễn phí cho nhà cung cấp dịch vụ. Bạn giữ 100% số tiền khách hàng thanh toán."
      }
    ]
  },
  {
    id: "community",
    title: "Cộng đồng",
    icon: <Users className="w-5 h-5" />,
    color: "bg-orange-100 text-orange-700",
    faqs: [
      {
        question: "Hệ thống huy hiệu Community Champions là gì?",
        answer: "Đây là hệ thống đánh giá đóng góp của bạn cho cộng đồng. Bạn nhận điểm khi viết đánh giá, chia sẻ ảnh, giúp đỡ người khác và sẽ nhận được huy hiệu đặc biệt."
      },
      {
        question: "Làm thế nào để tăng cấp độ cộng đồng?",
        answer: "Tham gia tích cực: viết đánh giá chất lượng, chia sẻ ảnh trước/sau, tổ chức workshop, giúp đỡ thành viên mới. Càng đóng góp nhiều, cấp độ càng cao."
      },
      {
        question: "Lợi ích của việc có cấp độ cao là gì?",
        answer: "Cấp độ cao giúp tăng độ tin cậy, ưu tiên trong tìm kiếm, được tham gia các sự kiện đặc biệt và có thể trở thành người dẫn đường cho cộng đồng."
      }
    ]
  },
  {
    id: "safety",
    title: "An toàn & Bảo mật",
    icon: <Shield className="w-5 h-5" />,
    color: "bg-red-100 text-red-700",
    faqs: [
      {
        question: "SkillHub đảm bảo an toàn như thế nào?",
        answer: "Chúng tôi có hệ thống xác minh danh tính, đánh giá từ cộng đồng, và cơ chế báo cáo. Luôn gặp gỡ ở nơi công cộng lần đầu tiên."
      },
      {
        question: "Nếu tôi gặp vấn đề với dịch vụ thì sao?",
        answer: "Liên hệ ngay với chúng tôi qua tính năng 'Báo cáo sự cố'. Chúng tôi sẽ can thiệp và hỗ trợ giải quyết tranh chấp."
      },
      {
        question: "Thông tin cá nhân của tôi có được bảo mật không?",
        answer: "Tuyệt đối! Chúng tôi chỉ hiển thị thông tin bạn cho phép. Địa chỉ chính xác chỉ được chia sẻ khi bạn đồng ý cho từng trường hợp cụ thể."
      }
    ]
  },
  {
    id: "premium",
    title: "Premium",
    icon: <CreditCard className="w-5 h-5" />,
    color: "bg-yellow-100 text-yellow-700",
    faqs: [
      {
        question: "Lợi ích của gói Premium là gì?",
        answer: "Premium cho phép ưu tiên trong tìm kiếm, thống kê chi tiết, tin nhắn không giới hạn, lịch booking thông minh và huy hiệu đặc biệt."
      },
      {
        question: "Tôi có thể hủy Premium bất cứ lúc nào không?",
        answer: "Có! Bạn có thể hủy bất cứ lúc nào trong phần Cài đặt. Không có phí hủy và bạn vẫn sử dụng được đến hết chu kỳ đã thanh toán."
      },
      {
        question: "Có thời gian dùng thử miễn phí không?",
        answer: "Có! Bạn được dùng thử Premium miễn phí 14 ngày. Không cần thẻ tín dụng để bắt đầu dùng thử."
      }
    ]
  }
]

// Quick Help Cards
const quickHelp = [
  {
    title: "Tạo hồ sơ chuyên nghiệp",
    description: "Hướng dẫn từng bước để tạo hồ sơ thu hút khách hàng",
    icon: <User className="w-6 h-6" />,
    color: "bg-blue-500",
    time: "5 phút"
  },
  {
    title: "Tìm kiếm hiệu quả",
    description: "Mẹo để tìm được người giúp việc phù hợp nhất",
    icon: <Search className="w-6 h-6" />,
    color: "bg-emerald-500",
    time: "3 phút"
  },
  {
    title: "Xây dựng danh tiếng",
    description: "Cách nhận đánh giá 5 sao và tăng lượng khách hàng",
    icon: <Star className="w-6 h-6" />,
    color: "bg-yellow-500",
    time: "7 phút"
  },
  {
    title: "An toàn khi giao dịch",
    description: "Những điều cần lưu ý để đảm bảo an toàn",
    icon: <Shield className="w-6 h-6" />,
    color: "bg-red-500",
    time: "4 phút"
  }
]

// Contact options
const contactOptions = [
  {
    title: "Trò chuyện trực tiếp",
    description: "Nhận hỗ trợ ngay lập tức từ đội ngũ chăm sóc khách hàng",
    icon: <MessageCircle className="w-6 h-6" />,
    color: "bg-emerald-500",
    availability: "Thứ 2-6, 8:00-18:00",
    action: "Bắt đầu chat"
  },
  {
    title: "Gọi điện thoại",
    description: "Nói chuyện trực tiếp với chuyên viên hỗ trợ",
    icon: <Phone className="w-6 h-6" />,
    color: "bg-blue-500",
    availability: "1900-1234",
    action: "Gọi ngay"
  },
  {
    title: "Gửi email",
    description: "Gửi câu hỏi chi tiết và nhận phản hồi trong 24h",
    icon: <Mail className="w-6 h-6" />,
    color: "bg-purple-500",
    availability: "support@skillhub.vn",
    action: "Gửi email"
  }
]

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategory, setExpandedCategory] = useState<string | null>("getting-started")
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0)

  return (
    <div className="min-h-screen bg-slate-100">
      <Navigation />
      
      <main className="max-w-screen-xl mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Trung tâm trợ giúp
              <span className="text-emerald-600"> SkillHub</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tìm câu trả lời cho mọi thắc mắc về cách sử dụng SkillHub một cách hiệu quả và an toàn.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Tìm kiếm câu hỏi, chủ đề..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg"
              />
            </div>
          </motion.div>

          {/* Quick Help Cards */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Hướng dẫn nhanh</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickHelp.map((help, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4", help.color)}>
                      {help.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{help.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{help.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {help.time}
                      </Badge>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Câu hỏi thường gặp</h2>
            <div className="space-y-4">
              {filteredCategories.map((category) => (
                <Card key={category.id} className="overflow-hidden">
                  <CardHeader 
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", category.color)}>
                          {category.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{category.title}</CardTitle>
                          <p className="text-sm text-gray-600">{category.faqs.length} câu hỏi</p>
                        </div>
                      </div>
                      {expandedCategory === category.id ? 
                        <ChevronDown className="w-5 h-5 text-gray-500" /> : 
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      }
                    </div>
                  </CardHeader>
                  
                  {expandedCategory === category.id && (
                    <CardContent className="border-t border-gray-100 pt-4">
                      <div className="space-y-3">
                        {category.faqs.map((faq, index) => (
                          <div key={index} className="border rounded-lg">
                            <button
                              className="w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
                              onClick={() => setExpandedFAQ(expandedFAQ === `${category.id}-${index}` ? null : `${category.id}-${index}`)}
                            >
                              <span className="font-medium text-gray-900">{faq.question}</span>
                              {expandedFAQ === `${category.id}-${index}` ? 
                                <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0 ml-2" /> : 
                                <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0 ml-2" />
                              }
                            </button>
                            {expandedFAQ === `${category.id}-${index}` && (
                              <div className="px-4 pb-4 text-gray-700 border-t border-gray-100 pt-3">
                                {faq.answer}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Vẫn cần hỗ trợ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactOptions.map((option, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={cn("w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto", option.color)}>
                      {option.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{option.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{option.description}</p>
                      <p className="text-gray-500 text-xs mb-4">{option.availability}</p>
                    </div>
                    <Button className="w-full">{option.action}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Additional Resources */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200">
              <CardContent className="p-8 text-center space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Tham gia cộng đồng SkillHub
                </h2>
                <p className="text-gray-700 max-w-2xl mx-auto">
                  Kết nối với hàng nghìn thành viên, chia sẻ kinh nghiệm và học hỏi từ những chuyên gia trong cộng đồng của chúng tôi.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Tham gia nhóm Facebook
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Đọc blog & tin tức
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </motion.div>
      </main>
    </div>
  )
}

export default HelpPage