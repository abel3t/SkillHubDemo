"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Check, 
  CheckCheck, 
  Clock, 
  Download, 
  MapPin, 
  Play, 
  MoreVertical,
  Copy,
  Reply,
  Forward
} from "lucide-react"
import { cn } from "@/lib/utils"

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

interface MessageBubbleProps {
  message: Message
  isOwn: boolean
  showAvatar?: boolean
  contact: Contact
  className?: string
}

export function MessageBubble({
  message,
  isOwn,
  showAvatar = true,
  contact,
  className = ""
}: MessageBubbleProps) {
  const [showActions, setShowActions] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const formatTime = (timestamp: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(timestamp)
  }

  const getStatusIcon = () => {
    switch (message.status) {
      case 'sending':
        return <Clock className="h-3 w-3" />
      case 'sent':
        return <Check className="h-3 w-3" />
      case 'delivered':
        return <CheckCheck className="h-3 w-3" />
      case 'read':
        return <CheckCheck className="h-3 w-3 text-blue-500" />
      default:
        return null
    }
  }

  const renderMessageContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <div className="relative max-w-xs">
            <img
              src={message.mediaUrl}
              alt="Shared image"
              className={cn(
                "rounded-lg max-w-full h-auto transition-opacity duration-300",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              </div>
            )}
            {message.content && (
              <p className="mt-2 text-sm">{message.content}</p>
            )}
          </div>
        )

      case 'video':
        return (
          <div className="relative max-w-xs">
            <div className="relative rounded-lg overflow-hidden bg-black">
              <video
                src={message.mediaUrl}
                className="max-w-full h-auto"
                style={{ maxHeight: '300px' }}
                poster={message.mediaUrl + '?t=1'} // Generate thumbnail
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="lg"
                  className="bg-black/50 hover:bg-black/70 rounded-full text-white"
                >
                  <Play className="h-8 w-8" />
                </Button>
              </div>
            </div>
            {message.content && (
              <p className="mt-2 text-sm">{message.content}</p>
            )}
          </div>
        )

      case 'document':
        return (
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg max-w-xs">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Download className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{message.fileName}</p>
              <p className="text-xs text-gray-500">Tệp đính kèm</p>
            </div>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        )

      case 'location':
        return (
          <div className="max-w-xs">
            <div className="bg-gray-100 rounded-lg p-3 mb-2">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">Vị trí</span>
              </div>
              <div className="h-32 bg-gray-300 rounded-md mb-2 flex items-center justify-center">
                <span className="text-xs text-gray-500">Bản đồ</span>
              </div>
              <p className="text-xs text-gray-600">{message.location?.address}</p>
            </div>
            {message.content && (
              <p className="text-sm">{message.content}</p>
            )}
          </div>
        )

      default:
        return (
          <div className="whitespace-pre-wrap break-words">
            {message.content}
          </div>
        )
    }
  }

  return (
    <div 
      className={cn(
        "group flex gap-2 transition-all duration-200 ease-out animate-in slide-in-from-bottom-1",
        isOwn ? "justify-end" : "justify-start",
        className
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Avatar for received messages */}
      {!isOwn && showAvatar && (
        <Avatar className="h-8 w-8 ring-1 ring-gray-200">
          <AvatarImage src={contact.avatar || "/placeholder.svg"} />
          <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
            {contact.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      )}

      {/* Spacer for alignment */}
      {!isOwn && !showAvatar && <div className="w-8" />}

      {/* Message Content */}
      <div className={cn(
        "relative max-w-xs lg:max-w-md",
        isOwn ? "order-1" : "order-2"
      )}>
        {/* Message Actions */}
        {showActions && (
          <div className={cn(
            "absolute top-0 z-10 flex gap-1 transition-opacity duration-200",
            isOwn ? "-left-20" : "-right-20"
          )}>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 bg-white shadow-md hover:bg-gray-50">
              <Reply className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 bg-white shadow-md hover:bg-gray-50">
              <Copy className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 bg-white shadow-md hover:bg-gray-50">
              <Forward className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 bg-white shadow-md hover:bg-gray-50">
              <MoreVertical className="h-3 w-3" />
            </Button>
          </div>
        )}

        {/* Message Bubble */}
        <div
          className={cn(
            "px-3 py-2 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md",
            isOwn 
              ? "bg-emerald-500 text-white rounded-br-md" 
              : "bg-white text-gray-900 rounded-bl-md border border-gray-200",
            message.type !== 'text' && "p-1"
          )}
        >
          {renderMessageContent()}

          {/* Message Footer */}
          <div className={cn(
            "flex items-center justify-end gap-1 mt-1",
            message.type !== 'text' && "px-2 pb-1"
          )}>
            <span className={cn(
              "text-xs",
              isOwn ? "text-emerald-100" : "text-gray-500"
            )}>
              {formatTime(message.timestamp)}
            </span>
            {isOwn && (
              <div className="text-emerald-100">
                {getStatusIcon()}
              </div>
            )}
          </div>
        </div>

        {/* Name for group chats (if needed) */}
        {!isOwn && showAvatar && (
          <div className="flex items-center gap-1 mt-1 px-1">
            <span className="text-xs font-medium text-gray-600">{contact.name}</span>
            <Badge variant="secondary" className="text-xs px-1 py-0 h-4">
              {contact.skill}
            </Badge>
          </div>
        )}
      </div>
    </div>
  )
}