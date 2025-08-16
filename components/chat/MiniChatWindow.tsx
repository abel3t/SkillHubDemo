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
      className={`fixed bottom-0 right-4 bg-white border border-gray-200 shadow-2xl rounded-t-xl z-50 transition-all duration-300 ${
        isMinimized ? 'h-12' : 'h-96'
      } w-80 max-w-[calc(100vw-2rem)]`}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between p-3 border-b border-gray-200 bg-white rounded-t-xl cursor-pointer"
        onClick={isMinimized ? onMaximize : undefined}
      >
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="relative">
            <Avatar className="w-8 h-8">
              <AvatarImage src={contact.avatar} alt={contact.name} />
              <AvatarFallback className="text-xs">{contact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {contact.online && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{contact.name}</p>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs px-1.5 py-0">
                {contact.skill}
              </Badge>
              {contact.online ? (
                <span className="text-xs text-green-600">Đang hoạt động</span>
              ) : (
                <span className="text-xs text-gray-500">
                  {contact.lastSeen ? formatTime(contact.lastSeen) : 'Offline'}
                </span>
              )}
            </div>
          </div>
          {unreadCount > 0 && (
            <Badge className="bg-red-500 text-white text-xs px-1.5 py-0 min-w-[20px] h-5">
              {unreadCount}
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-1">
          {!isMinimized && (
            <>
              <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                <Phone className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                <Video className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                <MoreHorizontal className="w-3 h-3" />
              </Button>
            </>
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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-col h-[calc(100%-3rem)]"
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === currentUserId ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                      message.senderId === currentUserId
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p>{message.content}</p>
                    <div className={`text-xs mt-1 ${
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
                  <div className="bg-gray-100 px-3 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-2">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                  <Paperclip className="w-3 h-3" />
                </Button>
                <Input
                  ref={inputRef}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 h-8 text-sm"
                />
                <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                  <Smile className="w-3 h-3" />
                </Button>
                <Button 
                  onClick={handleSend}
                  disabled={!newMessage.trim()}
                  size="sm" 
                  className="p-1 h-6 w-6 bg-emerald-500 hover:bg-emerald-600"
                >
                  <Send className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}