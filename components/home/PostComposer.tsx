"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Image,
  Video,
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
      <CardContent className="p-1.5">
        <div className="flex items-center gap-1.5">
          <Avatar className="w-6 h-6">
            <AvatarImage src="/vietnamese-user.png" alt="Your avatar" />
            <AvatarFallback className="bg-emerald-50 text-emerald-700 text-xs">
              U
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            {!isExpanded ? (
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                className="w-full text-left bg-gray-50 hover:bg-gray-100 rounded-full px-2 py-1 text-gray-500 transition-colors text-xs"
              >
                Chia sẻ kỹ năng? 🌟
              </button>
            ) : (
              <div className="space-y-1">
                <Textarea
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="Chia sẻ..."
                  className="min-h-[40px] border-0 p-0 resize-none text-xs placeholder:text-gray-400 focus-visible:ring-0"
                  autoFocus
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                      <Image className="w-2.5 h-2.5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                      <Video className="w-2.5 h-2.5" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-0.5">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsExpanded(false)
                        setPostText("")
                      }}
                      className="h-5 w-5 p-0"
                    >
                      <X className="w-2.5 h-2.5" />
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={!postText.trim()}
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white h-5 px-1.5 text-xs"
                    >
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