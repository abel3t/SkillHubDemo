"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MiniChatWindow } from "./MiniChatWindow"

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

interface ChatWindow {
  id: string
  contact: Contact
  messages: Message[]
  isMinimized: boolean
  unreadCount: number
  lastActivity: Date
}

interface MiniChatManagerProps {
  currentUserId: string
}

// Mock data for demo
const mockContacts: Contact[] = [
  {
    id: "minh123",
    name: "Anh Minh",
    avatar: "/vietnamese-technician.png",
    skill: "Thợ điện",
    online: true
  },
  {
    id: "lan456", 
    name: "Chị Lan",
    avatar: "/vietnamese-cleaning-lady.png", 
    skill: "Dọn dẹp nhà",
    online: false,
    lastSeen: new Date(Date.now() - 30 * 60000)
  }
]

const mockMessages: { [key: string]: Message[] } = {
  "minh123": [
    {
      id: "1",
      senderId: "minh123",
      content: "Chào anh, em có thể giúp anh sửa điện tại nhà được không?",
      timestamp: new Date(Date.now() - 240 * 60000),
      type: 'text',
      status: 'read',
    },
    {
      id: "2", 
      senderId: "user123",
      content: "Chào em, anh cần sửa ổ cắm điện ở phòng khách. Em có rảnh không?",
      timestamp: new Date(Date.now() - 235 * 60000),
      type: 'text',
      status: 'read',
    },
    {
      id: "3",
      senderId: "minh123", 
      content: "Dạ có ạ. Em có thể đến xem và báo giá cho anh. Địa chỉ anh ở đâu?",
      timestamp: new Date(Date.now() - 30 * 60000),
      type: 'text',
      status: 'delivered',
    }
  ],
  "lan456": [
    {
      id: "4",
      senderId: "lan456",
      content: "Cảm ơn anh đã tin tưởng dịch vụ của em",
      timestamp: new Date(Date.now() - 60 * 60000),
      type: 'text', 
      status: 'read',
    }
  ]
}

export function MiniChatManager({ currentUserId }: MiniChatManagerProps) {
  const [chatWindows, setChatWindows] = useState<ChatWindow[]>([])
  const [collapsedChats, setCollapsedChats] = useState<ChatWindow[]>([])
  const [globalUnreadCount, setGlobalUnreadCount] = useState(0)
  const [showCollapsedDropdown, setShowCollapsedDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Load initial chat windows (simulate restored chats)
  useEffect(() => {
    // Auto-open a chat for demo purposes
    const demoContact = mockContacts[0]
    const demoMessages = mockMessages[demoContact.id] || []
    
    setTimeout(() => {
      openChat(demoContact, demoMessages)
    }, 2000)
  }, [])

  // Update global unread count
  useEffect(() => {
    const totalUnread = chatWindows.reduce((sum, window) => sum + window.unreadCount, 0) +
                       collapsedChats.reduce((sum, window) => sum + window.unreadCount, 0)
    setGlobalUnreadCount(totalUnread)
  }, [chatWindows, collapsedChats])

  const openChat = (contact: Contact, messages: Message[] = []) => {
    // Check if chat exists in collapsed chats first
    const collapsedIndex = collapsedChats.findIndex(window => window.contact.id === contact.id)
    if (collapsedIndex >= 0) {
      const chatToOpen = collapsedChats[collapsedIndex]
      setCollapsedChats(prev => prev.filter((_, index) => index !== collapsedIndex))
      
      setChatWindows(prev => {
        if (prev.length >= 2) {
          // Move oldest active chat to collapsed
          const oldest = prev.reduce((oldest, current) => 
            current.lastActivity < oldest.lastActivity ? current : oldest
          )
          setCollapsedChats(collapsed => [...collapsed, { ...oldest, isMinimized: true }])
          return [prev.find(w => w.id !== oldest.id)!, { ...chatToOpen, isMinimized: false, lastActivity: new Date() }]
        }
        return [...prev, { ...chatToOpen, isMinimized: false, lastActivity: new Date() }]
      })
      return
    }

    setChatWindows(prev => {
      // Check if chat already exists in active windows
      const existingIndex = prev.findIndex(window => window.contact.id === contact.id)
      
      if (existingIndex >= 0) {
        // Bring existing chat to front and expand if minimized
        const updated = [...prev]
        updated[existingIndex] = { ...updated[existingIndex], isMinimized: false, lastActivity: new Date() }
        return updated
      }

      // Create new chat window
      const newWindow: ChatWindow = {
        id: `chat-${contact.id}`,
        contact,
        messages,
        isMinimized: false,
        unreadCount: messages.filter(msg => 
          msg.senderId !== currentUserId && msg.status !== 'read'
        ).length,
        lastActivity: new Date()
      }

      // Facebook style: maximum 2 active windows
      if (prev.length >= 2) {
        // Move oldest active chat to collapsed
        const oldest = prev.reduce((oldest, current) => 
          current.lastActivity < oldest.lastActivity ? current : oldest
        )
        setCollapsedChats(collapsed => [...collapsed, { ...oldest, isMinimized: true }])
        return [prev.find(w => w.id !== oldest.id)!, newWindow]
      }

      return [...prev, newWindow]
    })
  }

  const closeChat = (chatId: string) => {
    setChatWindows(prev => prev.filter(window => window.id !== chatId))
    setCollapsedChats(prev => prev.filter(window => window.id !== chatId))
  }

  const minimizeChat = (chatId: string) => {
    setChatWindows(prev => prev.map(window => 
      window.id === chatId 
        ? { ...window, isMinimized: true }
        : window
    ))
  }

  const maximizeChat = (chatId: string) => {
    setChatWindows(prev => prev.map(window => 
      window.id === chatId 
        ? { ...window, isMinimized: false, lastActivity: new Date() }
        : window
    ))
  }

  const sendMessage = (chatId: string, content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      content,
      timestamp: new Date(),
      type: 'text',
      status: 'sending'
    }

    setChatWindows(prev => prev.map(window => {
      if (window.id === chatId) {
        return {
          ...window,
          messages: [...window.messages, newMessage],
          lastActivity: new Date()
        }
      }
      return window
    }))

    // Simulate message delivery
    setTimeout(() => {
      setChatWindows(prev => prev.map(window => {
        if (window.id === chatId) {
          return {
            ...window,
            messages: window.messages.map(msg => 
              msg.id === newMessage.id 
                ? { ...msg, status: 'delivered' as const }
                : msg
            )
          }
        }
        return window
      }))
    }, 1000)

    // Simulate response from contact (for demo)
    if (content.toLowerCase().includes('hello') || content.toLowerCase().includes('chào')) {
      setTimeout(() => {
        const responseMessage: Message = {
          id: Date.now().toString() + '_response',
          senderId: chatWindows.find(w => w.id === chatId)?.contact.id || '',
          content: 'Chào anh! Em sẽ trả lời ngay ạ.',
          timestamp: new Date(),
          type: 'text',
          status: 'delivered'
        }

        setChatWindows(prev => prev.map(window => {
          if (window.id === chatId) {
            return {
              ...window,
              messages: [...window.messages, responseMessage],
              unreadCount: window.isMinimized ? window.unreadCount + 1 : 0
            }
          }
          return window
        }))
      }, 2000)
    }
  }

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCollapsedDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Global function to open chats (can be called from anywhere in the app)
  useEffect(() => {
    const handleOpenChat = (event: CustomEvent) => {
      const { contact, messages } = event.detail
      openChat(contact, messages || [])
    }

    window.addEventListener('openMiniChat', handleOpenChat as EventListener)
    return () => window.removeEventListener('openMiniChat', handleOpenChat as EventListener)
  }, [])

  return (
    <>
      {/* Chat Windows */}
      <div className="fixed bottom-0 right-0 flex items-end" style={{ zIndex: 9998 }}>
        {/* Collapsed Chat Avatars */}
        {collapsedChats.length > 0 && (
          <div className="mr-2 mb-0">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowCollapsedDropdown(!showCollapsedDropdown)}
                className="flex items-center justify-center w-12 h-12 bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                style={{ zIndex: 9999 }}
              >
                <div className="flex -space-x-2">
                  {collapsedChats.slice(0, 3).map((chat, index) => (
                    <div
                      key={chat.id}
                      className={`relative w-6 h-6 rounded-full border-2 border-white ${
                        index === 0 ? 'z-30' : index === 1 ? 'z-20' : 'z-10'
                      }`}
                    >
                      <img
                        src={chat.contact.avatar}
                        alt={chat.contact.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                      {chat.contact.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 border border-white rounded-full" />
                      )}
                      {chat.unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                          {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {collapsedChats.length > 3 && (
                  <div className="absolute -top-1 -left-1 w-4 h-4 bg-gray-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    +{collapsedChats.length - 3}
                  </div>
                )}
              </button>

              {/* Collapsed Chats Dropdown */}
              <AnimatePresence>
                {showCollapsedDropdown && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute bottom-full mb-2 right-0 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                  >
                    <div className="px-3 py-2 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-900">Tin nhắn khác</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {collapsedChats.map((chat) => (
                        <button
                          key={chat.id}
                          type="button"
                          onClick={() => {
                            openChat(chat.contact, chat.messages)
                            setShowCollapsedDropdown(false)
                          }}
                          className="w-full flex items-center px-3 py-2 hover:bg-gray-50 transition-colors"
                        >
                          <div className="relative">
                            <img
                              src={chat.contact.avatar}
                              alt={chat.contact.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            {chat.contact.online && (
                              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border border-white rounded-full" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0 ml-3 text-left">
                            <p className="text-sm font-medium text-gray-900 truncate">{chat.contact.name}</p>
                            <p className="text-xs text-gray-500 truncate">{chat.contact.skill}</p>
                          </div>
                          {chat.unreadCount > 0 && (
                            <div className="flex-shrink-0 ml-2">
                              <div className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                                {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                              </div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Active Chat Windows */}
        <AnimatePresence>
          {chatWindows.map((window, index) => (
            <div
              key={window.id}
              style={{ 
                transform: `translateX(-${(chatWindows.length - 1 - index) * 85}%)`,
                zIndex: 9999 + index
              }}
            >
              <MiniChatWindow
                contact={window.contact}
                messages={window.messages}
                currentUserId={currentUserId}
                isMinimized={window.isMinimized}
                onSendMessage={(content) => sendMessage(window.id, content)}
                onMinimize={() => minimizeChat(window.id)}
                onClose={() => closeChat(window.id)}
                onMaximize={() => maximizeChat(window.id)}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>

      {/* Global Chat Trigger (for demo) */}
      {chatWindows.length === 0 && collapsedChats.length === 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            type="button"
            onClick={() => openChat(mockContacts[1], mockMessages[mockContacts[1].id])}
            className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-full shadow-lg transition-colors"
          >
            💬 Demo Chat
          </button>
        </div>
      )}
    </>
  )
}

// Helper function to open chat from anywhere in the app
export const openMiniChat = (contact: Contact, messages: Message[] = []) => {
  const event = new CustomEvent('openMiniChat', {
    detail: { contact, messages }
  })
  window.dispatchEvent(event)
}