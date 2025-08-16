"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit,
  Trash2
} from "lucide-react"

interface TimeSlot {
  id: string
  time: string
  available: boolean
  booked?: boolean
  price?: number
  duration?: number // minutes
}

interface DaySchedule {
  date: Date
  slots: TimeSlot[]
  isAvailable: boolean
}

interface AvailabilityCalendarProps {
  isOwnProfile?: boolean
  onBookSlot?: (date: Date, slot: TimeSlot) => void
  onEditSlot?: (date: Date, slot: TimeSlot) => void
}

// Mock data for availability
const generateMockSchedule = (): DaySchedule[] => {
  const schedule: DaySchedule[] = []
  const today = new Date()
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    
    const isWeekend = date.getDay() === 0 || date.getDay() === 6
    const isAvailable = Math.random() > 0.3 && !isWeekend
    
    const slots: TimeSlot[] = []
    if (isAvailable) {
      const timeSlots = [
        "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "19:00", "20:00"
      ]
      
      timeSlots.forEach((time, index) => {
        if (Math.random() > 0.4) {
          slots.push({
            id: `slot-${i}-${index}`,
            time,
            available: Math.random() > 0.2,
            booked: Math.random() > 0.7,
            price: [200, 300, 400, 500][Math.floor(Math.random() * 4)],
            duration: 60
          })
        }
      })
    }
    
    schedule.push({
      date,
      slots,
      isAvailable
    })
  }
  
  return schedule
}

export function AvailabilityCalendar({ isOwnProfile = false, onBookSlot, onEditSlot }: AvailabilityCalendarProps) {
  const [schedule, setSchedule] = useState<DaySchedule[]>(generateMockSchedule())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date())

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', { 
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    })
  }

  const formatTime = (time: string) => {
    return time
  }

  const getWeekDays = () => {
    const days = []
    const start = new Date(currentWeekStart)
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(start)
      date.setDate(start.getDate() + i)
      days.push(date)
    }
    
    return days
  }

  const goToPreviousWeek = () => {
    const newStart = new Date(currentWeekStart)
    newStart.setDate(currentWeekStart.getDate() - 7)
    setCurrentWeekStart(newStart)
  }

  const goToNextWeek = () => {
    const newStart = new Date(currentWeekStart)
    newStart.setDate(currentWeekStart.getDate() + 7)
    setCurrentWeekStart(newStart)
  }

  const getDaySchedule = (date: Date) => {
    return schedule.find(s => 
      s.date.toDateString() === date.toDateString()
    )
  }

  const getSlotStatusColor = (slot: TimeSlot) => {
    if (slot.booked) return "bg-red-100 text-red-700 border-red-200"
    if (!slot.available) return "bg-gray-100 text-gray-500 border-gray-200"
    return "bg-emerald-100 text-emerald-700 border-emerald-200"
  }

  const getSlotStatusText = (slot: TimeSlot) => {
    if (slot.booked) return "Đã đặt"
    if (!slot.available) return "Không có"
    return `${slot.price?.toLocaleString()}K`
  }

  const weekDays = getWeekDays()
  const today = new Date()

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Lịch trống & Đặt lịch
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {isOwnProfile ? "Quản lý lịch làm việc của bạn" : "Chọn thời gian phù hợp để đặt lịch"}
              </p>
            </div>
          </div>
          {isOwnProfile && (
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Thêm lịch
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Week Navigation */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={goToPreviousWeek}
            className="hover:bg-gray-100"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <div className="text-center">
            <h3 className="font-semibold text-gray-900">
              {currentWeekStart.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
            </h3>
            <p className="text-sm text-gray-600">
              {formatDate(weekDays[0])} - {formatDate(weekDays[6])}
            </p>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={goToNextWeek}
            className="hover:bg-gray-100"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="p-6">
          <div className="grid grid-cols-7 gap-4">
            {/* Day Headers */}
            {weekDays.map((date, index) => {
              const daySchedule = getDaySchedule(date)
              const isToday = date.toDateString() === today.toDateString()
              const isPast = date < today && !isToday
              const availableSlots = daySchedule?.slots.filter(s => s.available && !s.booked).length || 0
              
              return (
                <div key={index} className="text-center">
                  <div className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                    isToday 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : selectedDate?.toDateString() === date.toDateString()
                      ? 'border-blue-500 bg-blue-50'
                      : isPast
                      ? 'border-gray-200 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedDate(date)}
                  >
                    <div className={`font-semibold ${
                      isToday ? 'text-emerald-700' : 
                      isPast ? 'text-gray-400' : 'text-gray-900'
                    }`}>
                      {date.toLocaleDateString('vi-VN', { weekday: 'short' })}
                    </div>
                    <div className={`text-lg font-bold ${
                      isToday ? 'text-emerald-700' : 
                      isPast ? 'text-gray-400' : 'text-gray-900'
                    }`}>
                      {date.getDate()}
                    </div>
                    
                    {daySchedule?.isAvailable ? (
                      <div className="mt-2">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs px-2 py-0.5 ${
                            availableSlots > 0 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {availableSlots > 0 ? `${availableSlots} slot` : 'Hết chỗ'}
                        </Badge>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500">
                          Nghỉ
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Selected Day Details */}
        <AnimatePresence>
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {selectedDate.toLocaleDateString('vi-VN', { 
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </h4>
                  {isOwnProfile && (
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Chỉnh sửa
                    </Button>
                  )}
                </div>

                {(() => {
                  const daySchedule = getDaySchedule(selectedDate)
                  
                  if (!daySchedule?.isAvailable) {
                    return (
                      <div className="text-center py-8">
                        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">Không có lịch làm việc trong ngày này</p>
                      </div>
                    )
                  }

                  if (daySchedule.slots.length === 0) {
                    return (
                      <div className="text-center py-8">
                        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">Chưa có khung giờ nào được thiết lập</p>
                        {isOwnProfile && (
                          <Button className="mt-3" size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Thêm khung giờ
                          </Button>
                        )}
                      </div>
                    )
                  }

                  return (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {daySchedule.slots.map((slot) => (
                        <motion.div
                          key={slot.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div
                            className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${getSlotStatusColor(slot)}`}
                            onClick={() => {
                              if (!slot.booked && slot.available) {
                                if (isOwnProfile && onEditSlot) {
                                  onEditSlot(selectedDate, slot)
                                } else if (!isOwnProfile && onBookSlot) {
                                  onBookSlot(selectedDate, slot)
                                }
                              }
                            }}
                          >
                            <div className="text-center">
                              <div className="font-semibold text-sm">{formatTime(slot.time)}</div>
                              <div className="text-xs mt-1">{getSlotStatusText(slot)}</div>
                              <div className="text-xs text-gray-500 mt-1">{slot.duration} phút</div>
                            </div>
                            
                            {isOwnProfile && (
                              <div className="flex items-center justify-center mt-2">
                                <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )
                })()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Stats */}
        <div className="border-t border-gray-100 p-6 bg-gray-50">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-emerald-600">
                {schedule.reduce((sum, day) => sum + day.slots.filter(s => s.available && !s.booked).length, 0)}
              </div>
              <div className="text-xs text-gray-600">Slot trống</div>
            </div>
            <div>
              <div className="text-xl font-bold text-blue-600">
                {schedule.reduce((sum, day) => sum + day.slots.filter(s => s.booked).length, 0)}
              </div>
              <div className="text-xs text-gray-600">Đã đặt</div>
            </div>
            <div>
              <div className="text-xl font-bold text-purple-600">
                {schedule.filter(day => day.isAvailable).length}
              </div>
              <div className="text-xs text-gray-600">Ngày làm việc</div>
            </div>
            <div>
              <div className="text-xl font-bold text-orange-600">
                {Math.round(schedule.reduce((sum, day) => sum + day.slots.filter(s => s.price).length, 0) / 
                 schedule.filter(day => day.slots.length > 0).length || 0)}
              </div>
              <div className="text-xs text-gray-600">Slot/ngày TB</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}