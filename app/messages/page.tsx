"use client"

import { useState } from "react"
import { ArrowLeft, Search, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChatInterface } from "@/components/chat/ChatInterface"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/shared/Navigation"

export default function MessagesPage() {
  const router = useRouter()
  const [selectedChat, setSelectedChat] = useState(1)
  const currentUserId = "user123"
  
  const initialMessages = [
    {
      id: "1",
      senderId: "minh123",
      content: "Chào anh, em có thể giúp anh sửa điện tại nhà được không?",
      timestamp: new Date(Date.now() - 240 * 60000), // 4 hours ago
      type: 'text' as const,
      status: 'read' as const,
    },
    {
      id: "2",
      senderId: "user123",
      content: "Chào em, anh cần sửa ổ cắm điện ở phòng khách. Em có rảnh không?",
      timestamp: new Date(Date.now() - 235 * 60000),
      type: 'text' as const,
      status: 'read' as const,
    },
    {
      id: "3",
      senderId: "minh123",
      content: "Dạ có ạ. Em có thể đến xem và báo giá cho anh. Địa chỉ anh ở đâu?",
      timestamp: new Date(Date.now() - 230 * 60000),
      type: 'text' as const,
      status: 'read' as const,
    },
    {
      id: "4",
      senderId: "user123",
      content: "Anh ở 123 Nguyễn Huệ, Quận 1. Em có thể đến chiều mai được không?",
      timestamp: new Date(Date.now() - 225 * 60000),
      type: 'text' as const,
      status: 'read' as const,
    },
    {
      id: "5",
      senderId: "minh123",
      content: "Tôi có thể đến sửa vào chiều mai được không?",
      timestamp: new Date(Date.now() - 30 * 60000), // 30 minutes ago
      type: 'text' as const,
      status: 'delivered' as const,
    },
  ]
  
  const [messages, setMessages] = useState(initialMessages)

  const conversations = [
    {
      id: 1,
      name: "Anh Minh",
      skill: "Thợ điện",
      avatar: "/vietnamese-technician.png",
      lastMessage: "Tôi có thể đến sửa vào chiều mai được không?",
      time: "10:30",
      unread: 2,
      online: true,
      location: "Quận 1, TP.HCM",
    },
    {
      id: 2,
      name: "Chị Lan",
      skill: "Dọn dẹp nhà",
      avatar: "/vietnamese-cleaning-lady.png",
      lastMessage: "Cảm ơn anh đã tin tưởng dịch vụ của em",
      time: "09:15",
      unread: 0,
      online: false,
      location: "Quận 3, TP.HCM",
    },
    {
      id: 3,
      name: "Anh Tuấn",
      skill: "Sửa chữa nhà",
      avatar: "/vietnamese-handyman.png",
      lastMessage: "Em gửi báo giá qua tin nhắn này nhé",
      time: "Hôm qua",
      unread: 1,
      online: true,
      location: "Quận 7, TP.HCM",
    },
  ]

  const selectedConversation = conversations.find((c) => c.id === selectedChat)
  
  const handleSendMessage = (content: string, type: 'text' | 'image' | 'video' | 'document', mediaUrl?: string) => {
    const newMessage = {
      id: Date.now().toString(),
      senderId: currentUserId,
      content,
      timestamp: new Date(),
      type,
      mediaUrl,
      status: 'sending' as const,
    }
    
    setMessages(prev => [...prev, newMessage])
    
    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'delivered' as const }
            : msg
        )
      )
    }, 1000)
  }
  
  const handleSendLocation = (location: { latitude: number; longitude: number; address: string }) => {
    const newMessage = {
      id: Date.now().toString(),
      senderId: currentUserId,
      content: 'Đã chia sẻ vị trí',
      timestamp: new Date(),
      type: 'location' as const,
      location,
      status: 'sending' as const,
    }
    
    setMessages(prev => [...prev, newMessage])
    
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'delivered' as const }
            : msg
        )
      )
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Navigation />
      
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-semibold text-lg">Tin nhắn</h1>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex h-[calc(100vh-100px)] sm:h-[calc(100vh-80px)] lg:h-screen">
          {/* Conversations List - Mobile optimized */}
          <div className={`w-full lg:w-80 bg-white border-r ${selectedChat ? "hidden lg:block" : "block"}`}>
            {/* Header - Mobile optimized */}
            <div className="p-3 sm:p-4 border-b">
              <div className="hidden lg:flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">Tin nhắn</h1>
                <Button variant="ghost" size="sm" onClick={() => router.back()}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </div>

              {/* Search - Mobile optimized */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Tìm kiếm cuộc trò chuyện..." 
                  className="pl-10 text-sm sm:text-base" 
                />
              </div>
            </div>

            {/* Conversations - Mobile optimized */}
            <div className="overflow-y-auto">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => setSelectedChat(conversation.id)}
                  className={`w-full p-3 sm:p-4 border-b text-left hover:bg-gray-50 transition-colors ${
                    selectedChat === conversation.id ? "bg-blue-50 border-r-2 border-r-blue-500" : ""
                  }`}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="relative flex-shrink-0">
                      <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                        <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-sm sm:text-base truncate">{conversation.name}</h3>
                        <span className="text-xs text-gray-500 flex-shrink-0">{conversation.time}</span>
                      </div>

                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs px-1.5 sm:px-2 py-0">
                          {conversation.skill}
                        </Badge>
                      </div>

                      <p className="text-xs sm:text-sm text-gray-600 truncate mb-1">{conversation.lastMessage}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 truncate">{conversation.location}</span>
                        {conversation.unread > 0 && (
                          <Badge className="bg-blue-500 text-white text-xs px-1.5 py-0 flex-shrink-0">{conversation.unread}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col bg-white ${selectedChat ? "block" : "hidden lg:flex"}`}>
            {selectedConversation && (
              <ChatInterface
                contact={{
                  id: selectedConversation.id.toString(),
                  name: selectedConversation.name,
                  avatar: selectedConversation.avatar,
                  skill: selectedConversation.skill,
                  online: selectedConversation.online,
                  location: selectedConversation.location,
                  verified: true,
                  lastSeen: selectedConversation.online ? undefined : new Date(Date.now() - 60000)
                }}
                messages={messages}
                currentUserId={currentUserId}
                onSendMessage={handleSendMessage}
                onSendLocation={handleSendLocation}
                onBackClick={() => setSelectedChat(0)}
              />
            )}
            {!selectedConversation && (
              <div className="flex-1 flex items-center justify-center p-4">
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Chọn cuộc trò chuyện</h3>
                  <p className="text-sm sm:text-base text-gray-500">Chọn một cuộc trò chuyện để bắt đầu nhắn tin</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
