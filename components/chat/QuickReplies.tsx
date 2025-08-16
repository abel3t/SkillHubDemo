"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  ThumbsUp, 
  MapPin, 
  Calculator,
  Calendar,
  Phone,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"

interface QuickRepliesProps {
  onSelectReply: (reply: string) => void
  onClose: () => void
  className?: string
}

export function QuickReplies({ onSelectReply, onClose, className = "" }: QuickRepliesProps) {
  const quickReplies = [
    {
      category: 'Phản hồi nhanh',
      replies: [
        { text: 'Cảm ơn bạn!', icon: ThumbsUp, color: 'bg-green-50 text-green-700 hover:bg-green-100' },
        { text: 'Được rồi, tôi đồng ý', icon: CheckCircle, color: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
        { text: 'Xin lỗi, tôi bận', icon: XCircle, color: 'bg-red-50 text-red-700 hover:bg-red-100' },
        { text: 'Tôi sẽ liên hệ lại sau', icon: Clock, color: 'bg-orange-50 text-orange-700 hover:bg-orange-100' }
      ]
    },
    {
      category: 'Về công việc',
      replies: [
        { text: 'Tôi có thể làm việc này', icon: CheckCircle, color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' },
        { text: 'Bạn có thể gửi thêm thông tin?', icon: null, color: 'bg-gray-50 text-gray-700 hover:bg-gray-100' },
        { text: 'Giá cả như thế nào?', icon: Calculator, color: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100' },
        { text: 'Khi nào bạn cần hoàn thành?', icon: Calendar, color: 'bg-purple-50 text-purple-700 hover:bg-purple-100' }
      ]
    },
    {
      category: 'Hẹn gặp',
      replies: [
        { text: 'Tôi có thể đến ngay bây giờ', icon: MapPin, color: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
        { text: 'Gặp nhau vào chiều nay nhé', icon: Calendar, color: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100' },
        { text: 'Bạn có thể gọi điện không?', icon: Phone, color: 'bg-green-50 text-green-700 hover:bg-green-100' },
        { text: 'Tôi sẽ gửi địa chỉ cho bạn', icon: MapPin, color: 'bg-red-50 text-red-700 hover:bg-red-100' }
      ]
    }
  ]

  const handleReplySelect = (reply: string) => {
    onSelectReply(reply)
    onClose()
  }

  return (
    <div className={cn("bg-white rounded-2xl shadow-lg border border-gray-200 p-4 max-h-80 overflow-y-auto animate-in slide-in-from-bottom-2 duration-200", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Tin nhắn nhanh</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="h-6 w-6 p-0 rounded-full hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Quick Reply Categories */}
      <div className="space-y-4">
        {quickReplies.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <Badge variant="outline" className="mb-3 text-xs font-medium">
              {category.category}
            </Badge>
            
            <div className="grid grid-cols-1 gap-2">
              {category.replies.map((reply, replyIndex) => {
                const IconComponent = reply.icon
                return (
                  <Button
                    key={replyIndex}
                    variant="ghost"
                    onClick={() => handleReplySelect(reply.text)}
                    className={cn(
                      "justify-start text-left h-auto p-3 rounded-xl transition-all duration-200 hover:scale-[1.02]",
                      reply.color
                    )}
                  >
                    <div className="flex items-center gap-3 w-full">
                      {IconComponent && (
                        <div className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-3 w-3" />
                        </div>
                      )}
                      <span className="text-sm font-medium flex-1">{reply.text}</span>
                    </div>
                  </Button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Custom Reply Input */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center">
          Hoặc nhập tin nhắn tùy chỉnh ở phía trên
        </p>
      </div>
    </div>
  )
}