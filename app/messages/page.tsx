"use client"

import { useState } from "react"
import { ArrowLeft, Search, Send, Paperclip, Smile, MessageCircle, Phone, Video, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export default function MessagesPage() {
  const router = useRouter()
  const [selectedChat, setSelectedChat] = useState(1)
  const [newMessage, setNewMessage] = useState("")

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

  const messages = [
    {
      id: 1,
      sender: "other",
      content: "Chào anh, em có thể giúp anh sửa điện tại nhà được không?",
      time: "09:00",
    },
    {
      id: 2,
      sender: "me",
      content: "Chào em, anh cần sửa ổ cắm điện ở phòng khách. Em có rảnh không?",
      time: "09:05",
    },
    {
      id: 3,
      sender: "other",
      content: "Dạ có ạ. Em có thể đến xem và báo giá cho anh. Địa chỉ anh ở đâu?",
      time: "09:10",
    },
    {
      id: 4,
      sender: "me",
      content: "Anh ở 123 Nguyễn Huệ, Quận 1. Em có thể đến chiều mai được không?",
      time: "09:15",
    },
    {
      id: 5,
      sender: "other",
      content: "Tôi có thể đến sửa vào chiều mai được không?",
      time: "10:30",
    },
  ]

  const selectedConversation = conversations.find((c) => c.id === selectedChat)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-semibold text-lg">Tin nhắn</h1>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex h-[calc(100vh-80px)] lg:h-screen">
          {/* Conversations List */}
          <div className={`w-full lg:w-80 bg-white border-r ${selectedChat ? "hidden lg:block" : "block"}`}>
            {/* Header */}
            <div className="p-4 border-b">
              <div className="hidden lg:flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">Tin nhắn</h1>
                <Button variant="ghost" size="sm" onClick={() => router.back()}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Tìm kiếm cuộc trò chuyện..." className="pl-10" />
              </div>
            </div>

            {/* Conversations */}
            <div className="overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedChat(conversation.id)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedChat === conversation.id ? "bg-blue-50 border-r-2 border-r-blue-500" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-sm truncate">{conversation.name}</h3>
                        <span className="text-xs text-gray-500">{conversation.time}</span>
                      </div>

                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs px-2 py-0">
                          {conversation.skill}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600 truncate mb-1">{conversation.lastMessage}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">{conversation.location}</span>
                        {conversation.unread > 0 && (
                          <Badge className="bg-blue-500 text-white text-xs px-2 py-0">{conversation.unread}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col bg-white ${selectedChat ? "block" : "hidden lg:flex"}`}>
            {selectedConversation && (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSelectedChat(0)}>
                      <ArrowLeft className="h-5 w-5" />
                    </Button>

                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {selectedConversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-medium">{selectedConversation.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {selectedConversation.skill}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {selectedConversation.online ? "Đang hoạt động" : "Offline"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          message.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.sender === "me" ? "text-blue-100" : "text-gray-500"}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>

                    <div className="flex-1 relative">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Nhập tin nhắn..."
                        className="pr-10"
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && newMessage.trim()) {
                            // Handle send message
                            setNewMessage("")
                          }
                        }}
                      />
                      <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button
                      size="sm"
                      disabled={!newMessage.trim()}
                      onClick={() => {
                        if (newMessage.trim()) {
                          // Handle send message
                          setNewMessage("")
                        }
                      }}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
            {!selectedConversation && (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Chọn cuộc trò chuyện</h3>
                  <p className="text-gray-500">Chọn một cuộc trò chuyện để bắt đầu nhắn tin</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
