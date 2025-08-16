"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Minimize2, 
  X, 
  Send, 
  Smile,
  Paperclip,
  Phone,
  Video,
  MoreHorizontal
} from "lucide-react"

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: Date
  type: 'text' | 'image' | 'video' | 'document'
  status: 'sending' | 'delivered' | 'read'
  mediaUrl?: string
}

interface Contact {
  id: string
  name: string
  avatar: string
  skill: string
  online: boolean
  lastSeen?: Date
}

interface MiniChatWindowProps {
  contact: Contact
  messages: Message[]
  currentUserId: string
  isMinimized: boolean
  onSendMessage: (content: string) => void
  onMinimize: () => void
  onClose: () => void
  onMaximize: () => void
}

export function MiniChatWindow({
  contact,
  messages,
  currentUserId,
  isMinimized,
  onSendMessage,
  onMinimize,
  onClose,
  onMaximize
}: MiniChatWindowProps) {
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (!isMinimized) {
      scrollToBottom()
      // Focus input when window is opened/maximized
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [messages, isMinimized])

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage)
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }

  const unreadCount = messages.filter(msg => 
    msg.senderId !== currentUserId && msg.status !== 'read'
  ).length

  return (
    <motion.div
      initial={{ y: 400, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 400, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`mini-chat-window transition-all duration-300 ${
        isMinimized ? 'h-12' : 'h-[30rem]'
      } w-80 max-w-[calc(100vw-2rem)]`}
    >
      {/* Header */}
      <div 
        className="mini-chat-header flex items-center justify-between cursor-pointer"
        onClick={isMinimized ? onMaximize : undefined}
        onKeyDown={(e) => {
          if (isMinimized && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            onMaximize()
          }
        }}
        role={isMinimized ? "button" : undefined}
        tabIndex={isMinimized ? 0 : undefined}
        aria-label={isMinimized ? `Mở rộng chat với ${contact.name}` : undefined}
      >
        <div className="flex items-center space-x-2.5 flex-1 min-w-0 overflow-hidden">
          <div className="relative flex-shrink-0">
            <Avatar className="w-8 h-8">
              <AvatarImage src={contact.avatar} alt={contact.name} />
              <AvatarFallback className="text-xs">{contact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {contact.online && (
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border border-white rounded-full" />
            )}
          </div>
          <div className="flex-1 min-w-0 overflow-hidden">
            <p className="text-sm font-semibold text-gray-900 truncate">{contact.name}</p>
            <div className="flex items-center space-x-1.5 overflow-hidden">
              <Badge variant="secondary" className="text-xs px-1.5 py-0 h-4 shrink-0">
                {contact.skill}
              </Badge>
              {contact.online ? (
                <span className="text-xs text-green-600 truncate">Đang hoạt động</span>
              ) : (
                <span className="text-xs text-gray-500 truncate">
                  {contact.lastSeen ? formatTime(contact.lastSeen) : 'Offline'}
                </span>
              )}
            </div>
          </div>
          {unreadCount > 0 && (
            <Badge className="bg-red-500 text-white text-xs px-1.5 py-0 min-w-[18px] h-5 text-center flex-shrink-0">
              {unreadCount}
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
          {!isMinimized && (
            <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={isMinimized ? onMaximize : onMinimize}
            className="p-1 h-6 w-6"
          >
            <Minimize2 className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-1 h-6 w-6">
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Chat Content */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mini-chat-content"
          >
            {/* Messages */}
            <div className="mini-chat-messages space-y-1.5">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === currentUserId ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-2.5 py-1.5 rounded-lg text-xs ${
                      message.senderId === currentUserId
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="leading-tight">{message.content}</p>
                    <div className={`text-[10px] mt-0.5 ${
                      message.senderId === currentUserId ? 'text-emerald-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                      {message.senderId === currentUserId && (
                        <span className="ml-1">
                          {message.status === 'sending' && '⏳'}
                          {message.status === 'delivered' && '✓'}
                          {message.status === 'read' && '✓✓'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-2.5 py-1.5 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="mini-chat-input-area">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="p-1.5 h-8 w-8 flex-shrink-0">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <input
                  ref={inputRef}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tin nhắn..."
                  className="mini-chat-input-field flex-1"
                />
                <Button variant="ghost" size="sm" className="p-1.5 h-8 w-8 flex-shrink-0">
                  <Smile className="w-4 h-4" />
                </Button>
                <Button 
                  onClick={handleSend}
                  disabled={!newMessage.trim()}
                  size="sm" 
                  className="p-1.5 h-8 w-8 bg-emerald-500 hover:bg-emerald-600 text-white flex-shrink-0 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}