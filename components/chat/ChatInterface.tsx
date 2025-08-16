"use client"

import { useState, useRef, useEffect } from "react"
import { MessageBubble } from "./MessageBubble"
import { MediaUpload } from "./MediaUpload"
import { QuickReplies } from "./QuickReplies"
import { LocationShare } from "./LocationShare"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  MoreVertical, 
  ArrowLeft,
  MapPin 
} from "lucide-react"

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: Date
  type: 'text' | 'image' | 'video' | 'document' | 'location'
  mediaUrl?: string
  fileName?: string
  location?: {
    latitude: number
    longitude: number
    address: string
  }
  status: 'sending' | 'sent' | 'delivered' | 'read'
}

interface Contact {
  id: string
  name: string
  avatar?: string
  skill: string
  online: boolean
  lastSeen?: Date
  location: string
  verified: boolean
}

interface ChatInterfaceProps {
  contact: Contact
  messages: Message[]
  currentUserId: string
  onSendMessage: (content: string, type: Message['type'], mediaUrl?: string) => void
  onSendLocation: (location: Message['location']) => void
  onBackClick: () => void
  className?: string
}

export function ChatInterface({
  contact,
  messages,
  currentUserId,
  onSendMessage,
  onSendLocation,
  onBackClick,
  className = ""
}: ChatInterfaceProps) {
  const [newMessage, setNewMessage] = useState("")
  const [showQuickReplies, setShowQuickReplies] = useState(false)
  const [showLocationShare, setShowLocationShare] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim(), 'text')
      setNewMessage("")
      setShowQuickReplies(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleQuickReply = (reply: string) => {
    onSendMessage(reply, 'text')
    setShowQuickReplies(false)
  }

  const handleMediaUpload = (mediaUrl: string, type: Message['type'], fileName?: string) => {
    onSendMessage(fileName || "Media", type, mediaUrl)
  }

  const handleLocationShare = (location: Message['location']) => {
    onSendLocation(location!)
    setShowLocationShare(false)
  }

  const getStatusText = () => {
    if (contact.online) return "Đang hoạt động"
    if (contact.lastSeen) {
      const now = new Date()
      const diff = now.getTime() - contact.lastSeen.getTime()
      const minutes = Math.floor(diff / 60000)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)
      
      if (minutes < 1) return "Vừa hoạt động"
      if (minutes < 60) return `Hoạt động ${minutes} phút trước`
      if (hours < 24) return `Hoạt động ${hours} giờ trước`
      return `Hoạt động ${days} ngày trước`
    }
    return "Offline"
  }

  return (
    <div className={`flex flex-col bg-white h-full ${className}`}>
      {/* Chat Header - Enhanced with WhatsApp-style */}
      <div className="p-4 border-b bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBackClick}
              className="lg:hidden hover:bg-gray-100 rounded-full p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div className="relative">
              <Avatar className="h-10 w-10 ring-2 ring-gray-100">
                <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-emerald-100 text-emerald-700">
                  {contact.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {contact.online && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
                {contact.verified && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700">
                  {contact.skill}
                </Badge>
                <span className="text-xs text-gray-500 truncate">
                  {getStatusText()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="hover:bg-gray-100 rounded-full p-2">
              <Phone className="h-4 w-4 text-gray-600" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-gray-100 rounded-full p-2">
              <Video className="h-4 w-4 text-gray-600" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-gray-100 rounded-full p-2">
              <MoreVertical className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area - Enhanced scrolling and animations */}
      <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-2 space-y-1">
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.senderId === currentUserId}
            showAvatar={
              index === 0 || 
              messages[index - 1].senderId !== message.senderId ||
              (new Date(message.timestamp).getTime() - new Date(messages[index - 1].timestamp).getTime()) > 300000 // 5 minutes
            }
            contact={contact}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {showQuickReplies && (
        <div className="px-4 py-2 border-t bg-white">
          <QuickReplies 
            onSelectReply={handleQuickReply}
            onClose={() => setShowQuickReplies(false)}
          />
        </div>
      )}

      {/* Location Share */}
      {showLocationShare && (
        <div className="px-4 py-2 border-t bg-white">
          <LocationShare 
            onShareLocation={handleLocationShare}
            onClose={() => setShowLocationShare(false)}
          />
        </div>
      )}

      {/* Input Area - WhatsApp-style enhanced */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-end gap-2">
          {/* Media Upload */}
          <MediaUpload onMediaUpload={handleMediaUpload} />

          {/* Main Input */}
          <div className="flex-1 relative">
            <div className="flex items-end gap-2 bg-gray-50 rounded-3xl px-4 py-2 border border-gray-200 focus-within:border-emerald-500 transition-colors">
              <Input
                ref={inputRef}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
                onKeyDown={handleKeyPress}
                style={{ minHeight: '24px', maxHeight: '120px' }}
              />
              
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-1 h-6 w-6 rounded-full hover:bg-gray-200"
                  onClick={() => setShowQuickReplies(!showQuickReplies)}
                >
                  <Smile className="h-4 w-4 text-gray-500" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-1 h-6 w-6 rounded-full hover:bg-gray-200"
                  onClick={() => setShowLocationShare(!showLocationShare)}
                >
                  <MapPin className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </div>
          </div>

          {/* Send Button */}
          <Button
            size="sm"
            disabled={!newMessage.trim()}
            onClick={handleSendMessage}
            className="rounded-full w-10 h-10 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}