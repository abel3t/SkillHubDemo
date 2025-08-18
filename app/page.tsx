"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bookmark, Star, PlusCircle, Award } from "lucide-react"
import { VibrantCard, VibrantCardHeader, VibrantCardContent } from "@/components/ui/VibrantCard"
import { PostComposer } from "@/components/home/PostComposer"
import { InfiniteScrollFeed } from "@/components/home/InfiniteScrollFeed"
import { Navigation } from "@/components/shared/Navigation"
import { ReputationCard } from "@/components/community/ReputationCard"
import { ContributionPoints, UserBadge } from "@/lib/contribution-system"

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

// Current user's community data
const currentUserPoints: ContributionPoints = {
  total: 1456,
  breakdown: {
    reviews: 89,
    photos: 150,
    tutorials: 300,
    mentoring: 600,
    verification: 120,
    moderation: 97,
    events: 100,
    localIntelligence: 0
  }
}

const currentUserBadges: UserBadge[] = [
  {
    id: "1",
    name: "Good Neighbor",
    nameVi: "Người hàng xóm",
    description: "Active in local neighborhood",
    descriptionVi: "Tích cực trong khu phố địa phương",
    icon: "🏠",
    earnedAt: new Date("2023-12-10"),
    category: "văn_hóa",
    rarity: "phổ_biến"
  },
  {
    id: "2",
    name: "Community Teacher",
    nameVi: "Thầy giáo cộng đồng",
    description: "Teaches skills to others",
    descriptionVi: "Dạy kỹ năng cho người khác",
    icon: "📚",
    earnedAt: new Date("2024-01-15"),
    category: "văn_hóa",
    rarity: "hiếm"
  }
];

const Page = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-100">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Left Column - Hidden on mobile and tablet */}
          <motion.aside variants={containerVariants} className="hidden lg:block lg:col-span-1">
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

              {/* Community Champions Card */}
              <ReputationCard 
                points={currentUserPoints}
                badges={currentUserBadges}
                compact={true}
                onViewProfile={() => router.push('/profile')}
              />


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

          {/* Center Column (Main Feed) - Full width on mobile/tablet */}
          <motion.div variants={containerVariants} className="col-span-1 lg:col-span-2 space-y-4 sm:space-y-6">
            <VibrantCard as={motion.div} variants={containerVariants}><PostComposer /></VibrantCard>
            <InfiniteScrollFeed helpers={communityMembers} onHelperSelect={(helper) => router.push('/profile')} />
          </motion.div>

          {/* Right Column - Hidden on mobile and tablet */}
          <motion.aside variants={containerVariants} className="hidden lg:block lg:col-span-1">
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

                {/* Quick Community Features Teaser - Much smaller */}
                <VibrantCard>
                  <VibrantCardContent className="p-4">
                    <div className="text-center">
                      <h4 className="text-sm font-semibold text-slate-700 mb-2">🔥 Tính năng độc quyền</h4>
                      <p className="text-xs text-slate-500 mb-3">Khám phá các tính năng mà BigTech không thể sao chép</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => router.push('/community')}
                        className="w-full text-xs bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-300 hover:from-emerald-100 hover:to-blue-100"
                      >
                        Xem thêm
                      </Button>
                    </div>
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
