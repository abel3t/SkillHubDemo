"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Image,
  Video,
  Smile,
  MapPin,
  Users,
  Send,
  X,
} from "lucide-react"

export function PostComposer() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [postText, setPostText] = useState("")

  const handleSubmit = () => {
    // Handle post submission
    console.log("Posting:", postText)
    setPostText("")
    setIsExpanded(false)
  }

  return (
    <Card className="border border-gray-200 bg-white shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="w-10 h-10 border border-gray-200">
            <AvatarImage src="/vietnamese-user.png" alt="Your avatar" />
            <AvatarFallback className="bg-emerald-50 text-emerald-700 text-sm font-medium">
              U
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            {!isExpanded ? (
              <button
                onClick={() => setIsExpanded(true)}
                className="w-full text-left bg-gray-50 hover:bg-gray-100 rounded-full px-4 py-3 text-gray-500 transition-colors"
              >
                Bạn muốn chia sẻ kỹ năng gì hôm nay? 🌟
              </button>
            ) : (
              <div className="space-y-3">
                <Textarea
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="Chia sẻ kỹ năng, kinh nghiệm hoặc câu chuyện thành công của bạn..."
                  className="min-h-[100px] border-0 p-0 resize-none text-lg placeholder:text-gray-400 focus-visible:ring-0"
                  autoFocus
                />
                
                {/* Quick options */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
                      <Image className="w-4 h-4 mr-2" />
                      Ảnh
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
                      <Video className="w-4 h-4 mr-2" />
                      Video
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
                      <Smile className="w-4 h-4 mr-2" />
                      Cảm xúc
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
                      <MapPin className="w-4 h-4 mr-2" />
                      Vị trí
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsExpanded(false)
                        setPostText("")
                      }}
                      className="text-gray-500"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={!postText.trim()}
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <Send className="w-4 h-4 mr-1" />
                      Đăng
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}