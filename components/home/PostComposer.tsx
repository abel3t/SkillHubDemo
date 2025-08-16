"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Image as ImageIcon, Video, MapPin, Send } from "lucide-react"

export function PostComposer() {
  const [postContent, setPostContent] = useState("")

  return (
    <div className="p-4">
      <div className="flex items-start space-x-4">
        <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
          <AvatarImage src="/vietnamese-user.png" alt="Your Avatar" />
          <AvatarFallback>BẠN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="Bạn có mẹo gì hay? Hãy chia sẻ với cộng đồng!"
            className="w-full border-slate-200/80 rounded-lg p-3 text-base focus:ring-emerald-500/50 focus:border-emerald-500 bg-slate-50/80 shadow-inner"
            rows={3}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="text-slate-500 hover:text-green-600">
                <ImageIcon className="w-5 h-5" />
                <span className="ml-2 hidden sm:inline">Ảnh</span>
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-500 hover:text-blue-600">
                <Video className="w-5 h-5" />
                <span className="ml-2 hidden sm:inline">Video</span>
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-500 hover:text-red-600">
                <MapPin className="w-5 h-5" />
                <span className="ml-2 hidden sm:inline">Vị trí</span>
              </Button>
            </div>
            <Button 
              disabled={!postContent.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full px-6 shadow-sm disabled:bg-slate-300"
            >
              <Send className="w-4 h-4 mr-2" />
              Đăng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}