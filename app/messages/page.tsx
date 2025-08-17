"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Search, MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChatInterface } from "@/components/chat/ChatInterface"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/shared/Navigation"
import { useIsMobile } from "@/hooks/use-mobile"

export default function MessagesPage() {
  const router = useRouter()
  const isMobile = useIsMobile()
  const [selectedChat, setSelectedChat] = useState(0) // Start with no chat selected - show list first
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

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.8, 0.25, 1],
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  }

  const conversationListVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      x: -20, 
      transition: { duration: 0.3 } 
    }
  }

  const conversationItemVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    tap: { scale: 0.98 }
  }

  const chatAreaVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      x: 20, 
      transition: { duration: 0.3 } 
    }
  }

  const mobileSlideVariants = {
    slideInFromRight: {
      initial: { x: "100%" },
      animate: { x: 0, transition: { duration: 0.3, ease: "easeOut" } },
      exit: { x: "100%", transition: { duration: 0.3, ease: "easeIn" } }
    },
    slideInFromLeft: {
      initial: { x: "-100%" },
      animate: { x: 0, transition: { duration: 0.3, ease: "easeOut" } },
      exit: { x: "-100%", transition: { duration: 0.3, ease: "easeIn" } }
    }
  }
  
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
    <motion.div 
      className="min-h-screen bg-white"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Top Header */}
      <Navigation />

      <motion.div className="max-w-7xl mx-auto">
        <div className={`flex ${selectedChat && isMobile ? 'h-screen' : 'h-[calc(100vh-80px)]'}`}>
          {/* Conversations List - Facebook Style */}
          <AnimatePresence mode="wait">
            {(!selectedChat || !isMobile) && (
              <motion.div 
                className={`w-full lg:w-80 bg-white ${selectedChat ? "hidden lg:block" : "block"} border-r border-gray-100`}
                variants={isMobile ? mobileSlideVariants.slideInFromLeft : conversationListVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {/* Header with Title and Search */}
                <motion.div 
                  className="p-4 border-b border-gray-100"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <motion.h1 
                      className="text-2xl font-bold text-gray-900"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                    >
                      Tin nhắn
                    </motion.h1>
                    <motion.div 
                      className="flex gap-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      <motion.button 
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Search className="w-5 h-5 text-gray-600" />
                      </motion.button>
                    </motion.div>
                  </div>
                  
                  {/* Modern Search Bar - Facebook Style */}
                  <motion.div 
                    className="relative"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <motion.input 
                      placeholder="Tìm kiếm tin nhắn..." 
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>
                </motion.div>

                {/* Conversations List - Facebook Style */}
                <motion.div 
                  className="overflow-y-auto"
                  variants={conversationListVariants}
                  initial="initial"
                  animate="animate"
                >
                  {conversations.map((conversation, index) => (
                    <motion.button
                      key={conversation.id}
                      type="button"
                      onClick={() => {
                        setSelectedChat(conversation.id)
                        if (isMobile) {
                          setTimeout(() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                          }, 100)
                        }
                      }}
                      className={`w-full p-3 text-left hover:bg-gray-50 transition-all duration-200 relative group ${
                        selectedChat === conversation.id ? "bg-emerald-50" : ""
                      }`}
                      variants={conversationItemVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                      whileTap="tap"
                      custom={index}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Active indicator - Facebook style */}
                      {selectedChat === conversation.id && (
                        <motion.div 
                          className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-r"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                      
                      <div className="flex items-center gap-3">
                        <div className="relative flex-shrink-0">
                          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                            <Avatar className="h-14 w-14">
                              <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-emerald-100 text-emerald-700 font-semibold">
                                {conversation.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          </motion.div>
                          {conversation.online && (
                            <motion.div 
                              className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.3, type: "spring", stiffness: 500, damping: 30 }}
                            />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h3 className={`font-semibold text-gray-900 truncate ${
                                conversation.unread > 0 ? 'text-gray-900' : 'text-gray-900'
                              }`}>
                                {conversation.name}
                              </h3>
                              <p className={`text-sm truncate mt-0.5 ${
                                conversation.unread > 0 ? 'text-gray-900 font-medium' : 'text-gray-600'
                              }`}>
                                {conversation.lastMessage}
                              </p>
                              
                              {/* Skill and location info */}
                              <div className="flex items-center gap-2 mt-1">
                                <motion.span 
                                  className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.2 + index * 0.05 }}
                                >
                                  {conversation.skill}
                                </motion.span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-400 truncate">{conversation.location}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end gap-1 ml-2">
                              <span className={`text-xs ${
                                conversation.unread > 0 ? 'text-emerald-600 font-medium' : 'text-gray-400'
                              }`}>
                                {conversation.time}
                              </span>
                              {conversation.unread > 0 && (
                                <motion.div 
                                  className="bg-emerald-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.4 + index * 0.05, type: "spring", stiffness: 500 }}
                                >
                                  {conversation.unread}
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Area - Facebook Style */}
          <AnimatePresence mode="wait">
            {selectedChat ? (
              <motion.div 
                key={selectedChat}
                className="flex-1 flex flex-col bg-white"
                variants={isMobile ? mobileSlideVariants.slideInFromRight : chatAreaVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {selectedConversation && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
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
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                className="flex-1 flex flex-col bg-white hidden lg:flex"
                variants={chatAreaVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <motion.div 
                  className="flex-1 flex items-center justify-center p-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <div className="text-center max-w-sm">
                    {/* Facebook-style empty state */}
                    <motion.div 
                      className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
                    >
                      <MessageCircle className="h-12 w-12 text-emerald-600" />
                    </motion.div>
                    
                    <motion.h3 
                      className="text-xl font-semibold text-gray-900 mb-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.3 }}
                    >
                      Kết nối với chuyên gia
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-600 leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.3 }}
                    >
                      Chọn một cuộc trò chuyện từ danh sách bên trái để bắt đầu trao đổi với các chuyên gia tài năng.
                    </motion.p>
                    
                    {/* Action suggestion */}
                    <motion.div 
                      className="mt-8 p-4 bg-emerald-50 rounded-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.4 }}
                    >
                      <p className="text-sm text-emerald-700 mb-3">
                        <span className="font-medium">💡 Gợi ý:</span> Tìm chuyên gia mới?
                      </p>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                          onClick={() => router.push('/map')}
                        >
                          Khám phá bản đồ
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}
