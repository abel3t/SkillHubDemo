"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Bookmark, Star, PlusCircle, ExternalLink } from "lucide-react"
import { VibrantCard, VibrantCardHeader, VibrantCardContent } from "@/components/ui/VibrantCard"
import { PostComposer } from "@/components/home/PostComposer"
import { InfiniteScrollFeed } from "@/components/home/InfiniteScrollFeed"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const suggestedHelpers = [
  { name: "Nguyễn Văn Minh", title: "Chuyên gia điện lạnh", avatar: "/vietnamese-technician.png" },
  { name: "Trần Thị Mai", title: "Gia sư tiếng Anh & IELTS", avatar: "/vietnamese-cleaning-lady.png" },
  { name: "Phạm Hoàng Nam", title: "Huấn luyện viên Cầu lông", avatar: "/vietnamese-handyman.png" },
];

const communityMembers = [
    { id: 1, name: "Nguyễn Văn Minh", title: "Có thể giúp về điện", location: "Quận 1, TP.HCM", distance: "0.8km", rating: 4.9, helpedPeople: 127, contributions: 23, avatar: "/vietnamese-technician.png", verified: true, isOnline: true, responseTime: "2 phút", neighborEndorsements: 8, lastActive: "Vừa xong", availableToHelp: true, connectionStatus: "not_connected", canHelp: ["Điện dân dụng", "Sửa chữa thiết bị", "Tư vấn an toàn điện"], recentShare: "Chia sẻ cách kiểm tra an toàn hệ thống điện trong mùa mưa", mutualConnections: ["Trần Văn A", "Nguyễn Thị B"], helpedThisMonth: 12, personality: "Nhiệt tình, kiên nhẫn" },
    { id: 2, name: "Lê Thị Hương", title: "Dạy Piano & chia sẻ âm nhạc", location: "Quận 3, TP.HCM", distance: "1.1km", rating: 4.9, helpedPeople: 89, contributions: 45, avatar: "/vietnamese-user.png", verified: true, isOnline: true, responseTime: "5 phút", neighborEndorsements: 15, lastActive: "Đang hoạt động", availableToHelp: true, connectionStatus: "not_connected", canHelp: ["Piano cơ bản", "Lý thuyết âm nhạc", "Hướng dẫn mua đàn", "Tư vấn học nhạc"], recentShare: "Chia sẻ cách luyện ngón tay linh hoạt cho người mới bắt đầu", mutualConnections: ["Trần Văn C", "Nguyễn Thị D"], helpedThisMonth: 8, personality: "Tận tâm, dễ gần" },
];

const Page = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top Navigation */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-200/80 sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-emerald-600">SkillHub</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="rounded-full text-slate-500 hover:bg-slate-100"><Bell className="w-6 h-6" /></Button>
              <Button onClick={() => router.push('/profile')} variant="ghost" size="icon" className="rounded-full">
                <Avatar className="w-9 h-9 border-2 border-transparent hover:border-emerald-500"><AvatarImage src="/vietnamese-user.png" alt="Profile" /><AvatarFallback className="bg-emerald-100 text-emerald-700">U</AvatarFallback></Avatar>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 py-6">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Left Column */}
          <motion.aside variants={containerVariants} className="hidden md:block md:col-span-1">
            <div className="space-y-6 sticky top-24">
              <VibrantCard className="overflow-hidden">
                <div className="h-16 bg-cover bg-center" style={{ backgroundImage: 'url(/vietnamese-workshop.png)' }} />
                <div className="relative p-4 pt-0">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Avatar className="w-20 h-20 mx-auto border-4 border-white shadow-md"><AvatarImage src="/vietnamese-user.png" alt="User Name" /><AvatarFallback>BẠN</AvatarFallback></Avatar>
                  </div>
                  <div className="pt-10 text-center">
                    <h3 className="font-semibold text-lg text-slate-800">Lê Thị Hương</h3>
                    <p className="text-sm text-slate-500">Giáo viên Piano & Âm nhạc</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-2">
                    <button type="button" className="flex items-center justify-between text-sm text-slate-600 hover:text-emerald-600 group w-full text-left"><span className="font-semibold">Lượt xem hồ sơ</span><span className="font-semibold text-emerald-600">128</span></button>
                    <button type="button" className="flex items-center justify-between text-sm text-slate-600 hover:text-emerald-600 group w-full text-left"><span className="font-semibold">Kết nối</span><span className="font-semibold text-emerald-600">42</span></button>
                  </div>
                </div>
                <div className="border-t border-slate-200/80 p-2 bg-slate-50/80"><Button variant="ghost" className="w-full justify-start text-sm text-slate-700 font-semibold"><Bookmark className="w-4 h-4 mr-2 text-slate-500"/> Mục đã lưu</Button></div>
              </VibrantCard>

              <VibrantCard>
                <VibrantCardContent className="p-4">
                    <button type="button" className="block text-left w-full">
                        <p className="text-xs text-slate-500">Nâng cấp trải nghiệm của bạn</p>
                        <div className="flex items-center text-yellow-600">
                            <Star className="w-4 h-4 mr-2"/>
                            <span className="font-semibold text-sm text-slate-700 hover:underline">Dùng thử Premium miễn phí</span>
                        </div>
                    </button>
                </VibrantCardContent>
              </VibrantCard>
            </div>
          </motion.aside>

          {/* Center Column (Main Feed) */}
          <motion.div variants={containerVariants} className="col-span-1 md:col-span-2 space-y-6">
            <VibrantCard as={motion.div} variants={containerVariants}><PostComposer /></VibrantCard>
            <InfiniteScrollFeed helpers={communityMembers} onHelperSelect={(helper) => router.push('/profile')} />
          </motion.div>

          {/* Right Column */}
          <motion.aside variants={containerVariants} className="hidden md:block md:col-span-1">
             <div className="space-y-6 sticky top-24">
                <VibrantCard>
                  <VibrantCardHeader><h3 className="font-semibold text-slate-800">Thêm vào bảng tin của bạn</h3></VibrantCardHeader>
                  <VibrantCardContent className="space-y-4">
                    {suggestedHelpers.map((helper) => (
                      <div key={helper.name} className="flex items-start space-x-3">
                        <Avatar className="w-12 h-12"><AvatarImage src={helper.avatar} alt={helper.name} /><AvatarFallback>{helper.name.charAt(0)}</AvatarFallback></Avatar>
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-slate-700">{helper.name}</p>
                          <p className="text-xs text-slate-500 mb-2">{helper.title}</p>
                          <Button variant="outline" size="sm" className="border-slate-400 text-slate-600 hover:bg-slate-100"><PlusCircle className="w-4 h-4 mr-2" />Theo dõi</Button>
                        </div>
                      </div>
                    ))}
                  </VibrantCardContent>
                </VibrantCard>

                <VibrantCard>
                    <VibrantCardHeader className="flex-row items-center justify-between pb-2"><h3 className="font-semibold text-slate-800">Quảng cáo</h3><span className="text-xs text-slate-400">Promoted</span></VibrantCardHeader>
                    <VibrantCardContent>
                        <button type="button" className="block w-full text-left">
                            <img src="/home-repair-tools.png" alt="Ad for pro tools" className="w-full h-auto rounded-lg mb-2 shadow-md" />
                            <p className="text-sm font-semibold text-slate-700">Dụng cụ chuyên nghiệp</p>
                            <p className="text-xs text-slate-500">Giảm giá 20% cho đơn hàng đầu tiên.</p>
                        </button>
                         <Button variant="outline" size="sm" className="w-full mt-3"><ExternalLink className="w-4 h-4 mr-2" />Tìm hiểu thêm</Button>
                    </VibrantCardContent>
                </VibrantCard>

                <div className="p-4 text-center text-xs text-slate-400">
                    SkillHub © 2025
                </div>
             </div>
          </motion.aside>

        </motion.div>
      </main>
    </div>
  );
};

export default Page;
