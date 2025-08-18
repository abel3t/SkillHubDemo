"use client"

import React from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/shared/Navigation"
import { FamilyNetworkMapping } from "@/components/community/FamilyNetworkMapping"
import { GenerationalSkillTransfer } from "@/components/community/GenerationalSkillTransfer"
import { ContributionTracker } from "@/components/community/ContributionTracker"
import { MonsoonIntelligence } from "@/components/community/MonsoonIntelligence"
import { ContributionPoints, UserBadge } from "@/lib/contribution-system"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// Mock user data
const currentUserPoints: ContributionPoints = {
  total: 2456,
  breakdown: {
    reviews: 189,
    photos: 250,
    tutorials: 400,
    mentoring: 800,
    verification: 220,
    moderation: 197,
    events: 200,
    localIntelligence: 200
  }
}

const currentUserBadges: UserBadge[] = [
  {
    id: "1",
    name: "Good Neighbor",
    nameVi: "Người hàng xóm tốt",
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
  },
  {
    id: "3",
    name: "Tea Circle Host",
    nameVi: "Chủ nhà vòng tròn trà",
    description: "Regularly hosts community tea gatherings",
    descriptionVi: "Thường xuyên tổ chức buổi uống trà cộng đồng",
    icon: "🍵",
    earnedAt: new Date("2024-02-20"),
    category: "văn_hóa",
    rarity: "ít_gặp"
  }
];

const CommunityPage = () => {
  const handlePointsUpdate = (newPoints: ContributionPoints) => {
    console.log('Points updated:', newPoints);
  };

  const handleBadgeEarned = (badge: Omit<UserBadge, 'earnedAt'>) => {
    console.log('Badge earned:', badge);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navigation />

      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-8">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Cộng đồng SkillHub</h1>
          <p className="text-emerald-100">Khám phá các tính năng độc đáo mà BigTech không thể sao chép</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 py-8">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Left Column */}
          <motion.div variants={containerVariants} className="space-y-8">
            
            {/* Family Network Mapping */}
            <motion.div variants={containerVariants}>
              <FamilyNetworkMapping />
            </motion.div>

            {/* Monsoon Intelligence */}
            <motion.div variants={containerVariants}>
              <MonsoonIntelligence />
            </motion.div>

          </motion.div>

          {/* Right Column */}
          <motion.div variants={containerVariants} className="space-y-8">
            
            {/* Generational Skill Transfer */}
            <motion.div variants={containerVariants}>
              <GenerationalSkillTransfer />
            </motion.div>

            {/* Contribution Tracker */}
            <motion.div variants={containerVariants}>
              <ContributionTracker 
                currentPoints={currentUserPoints}
                currentBadges={currentUserBadges}
                onPointsUpdate={handlePointsUpdate}
                onBadgeEarned={handleBadgeEarned}
              />
            </motion.div>

          </motion.div>
          
        </motion.div>

        {/* Why These Features Are Uncopiable */}
        <motion.div 
          variants={containerVariants}
          className="mt-12 p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200"
        >
          <h2 className="text-2xl font-bold text-purple-900 mb-4">🔒 Tại sao BigTech không thể sao chép?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">🏠 Mạng lưới gia đình</h3>
              <p className="text-purple-700">
                Mối quan hệ thầy-trò qua nhiều thế hệ, được xây dựng từ sự tôn kính và tin tưởng thực sự. 
                Không thể mua được hay tạo ra bằng thuật toán.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">🌧️ Trí tuệ thời tiết</h3>
              <p className="text-blue-700">
                Kiến thức về thời tiết nhiệt đới, mùa mưa Việt Nam và cách nó ảnh hưởng đến từng nghề. 
                Chỉ có người Việt mới hiểu được sâu sắc.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-emerald-800 mb-2">🎭 Văn hóa truyền thống</h3>
              <p className="text-emerald-700">
                Nghề thủ công truyền thống với câu chuyện gia đình thật, kỹ thuật bí truyền và 
                giá trị văn hóa được truyền qua nhiều đời.
              </p>
            </div>
          </div>
        </motion.div>

      </main>
    </div>
  );
};

export default CommunityPage;