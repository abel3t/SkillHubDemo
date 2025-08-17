// SkillHub Hệ Thống Người Tiên Phong Cộng Đồng
// Hệ thống danh tiếng và tham gia cộng đồng theo phong cách Việt Nam

export interface ContributionPoints {
  total: number
  breakdown: {
    reviews: number
    photos: number
    tutorials: number
    mentoring: number
    verification: number
    moderation: number
    events: number
    localIntelligence: number
  }
}

export interface UserBadge {
  id: string
  name: string
  nameVi: string
  description: string
  descriptionVi: string
  icon: string
  earnedAt: Date
  category: 'văn_hóa' | 'đóng_góp' | 'chất_lượng' | 'cộng_đồng' | 'thành_tích'
  rarity: 'phổ_biến' | 'ít_gặp' | 'hiếm' | 'huyền_thoại'
}

export interface CommunityLevel {
  id: string
  name: string
  nameVi: string
  minPoints: number
  maxPoints: number
  color: string
  privileges: string[]
  description: string
  descriptionVi: string
}

// Vietnamese Community Levels
export const COMMUNITY_LEVELS: CommunityLevel[] = [
  {
    id: 'newcomer',
    name: 'Newcomer',
    nameVi: 'Người mới',
    minPoints: 0,
    maxPoints: 50,
    color: 'gray',
    privileges: ['basic_interaction'],
    description: 'New community member',
    descriptionVi: 'Thành viên mới trong cộng đồng'
  },
  {
    id: 'good_neighbor',
    name: 'Good Neighbor', 
    nameVi: 'Hàng xóm tốt',
    minPoints: 51,
    maxPoints: 200,
    color: 'blue',
    privileges: ['basic_interaction', 'photo_upload', 'review_voting'],
    description: 'Helpful community member',
    descriptionVi: 'Thành viên hữu ích trong cộng đồng'
  },
  {
    id: 'community_expert',
    name: 'Community Expert',
    nameVi: 'Chuyên gia cộng đồng',
    minPoints: 201,
    maxPoints: 1000,
    color: 'emerald',
    privileges: ['basic_interaction', 'photo_upload', 'review_voting', 'content_moderation', 'provider_verification'],
    description: 'Recognized local expert',
    descriptionVi: 'Chuyên gia được cộng đồng công nhận'
  },
  {
    id: 'master_teacher',
    name: 'Master/Teacher',
    nameVi: 'Thầy/Cô',
    minPoints: 1001,
    maxPoints: 5000,
    color: 'purple',
    privileges: ['basic_interaction', 'photo_upload', 'review_voting', 'content_moderation', 'provider_verification', 'event_hosting', 'mentorship'],
    description: 'Respected teacher and mentor',
    descriptionVi: 'Thầy/Cô được kính trọng và là người cố vấn'
  },
  {
    id: 'community_guide',
    name: 'Community Guide',
    nameVi: 'Người dẫn đường',
    minPoints: 5001,
    maxPoints: Infinity,
    color: 'gold',
    privileges: ['basic_interaction', 'photo_upload', 'review_voting', 'content_moderation', 'provider_verification', 'event_hosting', 'mentorship', 'ward_leadership', 'platform_influence'],
    description: 'Community leader and guide',
    descriptionVi: 'Người lãnh đạo và dẫn đường cho cộng đồng'
  }
]

// Vietnamese Cultural Badges
export const CULTURAL_BADGES: Omit<UserBadge, 'id' | 'earnedAt'>[] = [
  {
    name: 'Elder Respect',
    nameVi: 'Tôn kính người lớn',
    description: 'Consistently helps elderly community members',
    descriptionVi: 'Thường xuyên giúp đỡ người lớn tuổi trong cộng đồng',
    icon: '👵',
    category: 'cultural',
    rarity: 'uncommon'
  },
  {
    name: 'Good Neighbor',
    nameVi: 'Người hàng xóm',
    description: 'Active in local neighborhood',
    descriptionVi: 'Tích cực trong khu phố địa phương',
    icon: '🏠',
    category: 'cultural',
    rarity: 'common'
  },
  {
    name: 'Community Teacher',
    nameVi: 'Thầy giáo cộng đồng',
    description: 'Teaches skills to others',
    descriptionVi: 'Dạy kỹ năng cho người khác',
    icon: '📚',
    category: 'cultural',
    rarity: 'rare'
  },
  {
    name: 'Connector',
    nameVi: 'Người môi giới',
    description: 'Successfully connects people',
    descriptionVi: 'Kết nối mọi người thành công',
    icon: '🤝',
    category: 'community',
    rarity: 'uncommon'
  },
  {
    name: 'Local Expert',
    nameVi: 'Chuyên gia địa phương',
    description: 'Deep local area knowledge',
    descriptionVi: 'Hiểu biết sâu về khu vực địa phương',
    icon: '🎯',
    category: 'contribution',
    rarity: 'rare'
  },
  {
    name: 'Trusted Person',
    nameVi: 'Người tin cậy',
    description: 'Consistently reliable contributions',
    descriptionVi: 'Đóng góp đáng tin cậy nhất quán',
    icon: '🌟',
    category: 'quality',
    rarity: 'legendary'
  }
]

// Contribution Activities and Points
export const CONTRIBUTION_ACTIVITIES = {
  // Content Contributions
  ADD_PHOTOS: { points: 10, nameVi: 'Thêm ảnh trước/sau', category: 'content' },
  WRITE_TUTORIAL: { points: 15, nameVi: 'Viết hướng dẫn chi tiết', category: 'content' },
  CREATE_PRICING_GUIDE: { points: 20, nameVi: 'Tạo hướng dẫn giá cả', category: 'content' },
  HOST_SKILL_SESSION: { points: 25, nameVi: 'Tổ chức chia sẻ kỹ năng', category: 'content' },
  MENTOR_PROVIDER: { points: 30, nameVi: 'Hướng dẫn nhà cung cấp mới', category: 'content' },
  ORGANIZE_EVENT: { points: 50, nameVi: 'Tổ chức sự kiện cộng đồng', category: 'content' },

  // Local Intelligence
  UPDATE_AVAILABILITY: { points: 5, nameVi: 'Cập nhật tình trạng', category: 'intelligence' },
  REPORT_BUSINESS_CHANGE: { points: 10, nameVi: 'Báo cáo thay đổi doanh nghiệp', category: 'intelligence' },
  ADD_SAFETY_TIPS: { points: 15, nameVi: 'Thêm mẹo an toàn', category: 'intelligence' },
  CREATE_TRANSPORT_GUIDE: { points: 20, nameVi: 'Tạo hướng dẫn di chuyển', category: 'intelligence' },
  MAP_SERVICE_AREA: { points: 25, nameVi: 'Bản đồ khu vực dịch vụ', category: 'intelligence' },

  // Quality Control
  VOTE_REVIEW: { points: 5, nameVi: 'Bình chọn đánh giá', category: 'quality' },
  FLAG_CONTENT: { points: 10, nameVi: 'Báo cáo nội dung không phù hợp', category: 'quality' },
  VERIFY_PROVIDER: { points: 15, nameVi: 'Xác minh nhà cung cấp', category: 'quality' },
  MODERATE_DISCUSSION: { points: 20, nameVi: 'Kiểm duyệt thảo luận', category: 'quality' },
  RESOLVE_DISPUTE: { points: 30, nameVi: 'Giải quyết tranh chấp', category: 'quality' }
}

// Utility Functions
export function getUserLevel(points: number): CommunityLevel {
  return COMMUNITY_LEVELS.find(level => 
    points >= level.minPoints && points <= level.maxPoints
  ) || COMMUNITY_LEVELS[0]
}

export function getNextLevel(points: number): CommunityLevel | null {
  const currentLevelIndex = COMMUNITY_LEVELS.findIndex(level => 
    points >= level.minPoints && points <= level.maxPoints
  )
  
  return currentLevelIndex < COMMUNITY_LEVELS.length - 1 
    ? COMMUNITY_LEVELS[currentLevelIndex + 1] 
    : null
}

export function getProgressToNextLevel(points: number): {
  current: number
  needed: number
  percentage: number
} {
  const currentLevel = getUserLevel(points)
  const nextLevel = getNextLevel(points)
  
  if (!nextLevel) {
    return { current: points, needed: 0, percentage: 100 }
  }
  
  const current = points - currentLevel.minPoints
  const needed = nextLevel.minPoints - currentLevel.minPoints
  const percentage = Math.min((current / needed) * 100, 100)
  
  return { current, needed, percentage }
}

export function awardPoints(
  currentPoints: ContributionPoints, 
  activity: keyof typeof CONTRIBUTION_ACTIVITIES,
  amount?: number
): ContributionPoints {
  const activityPoints = amount || CONTRIBUTION_ACTIVITIES[activity].points
  const category = CONTRIBUTION_ACTIVITIES[activity].category
  
  const updated = { ...currentPoints }
  updated.total += activityPoints
  
  // Update category breakdown
  switch (category) {
    case 'content':
      if (activity.includes('PHOTOS')) updated.breakdown.photos += activityPoints
      else if (activity.includes('TUTORIAL')) updated.breakdown.tutorials += activityPoints
      else if (activity.includes('MENTOR')) updated.breakdown.mentoring += activityPoints
      else if (activity.includes('EVENT')) updated.breakdown.events += activityPoints
      break
    case 'intelligence':
      updated.breakdown.localIntelligence += activityPoints
      break
    case 'quality':
      if (activity.includes('VERIFY')) updated.breakdown.verification += activityPoints
      else if (activity.includes('MODERATE') || activity.includes('FLAG')) updated.breakdown.moderation += activityPoints
      break
  }
  
  return updated
}

// Check if user should earn badge
export function checkBadgeEligibility(
  points: ContributionPoints,
  userActivity: any, // This would be more specific based on user activity tracking
  existingBadges: UserBadge[]
): Omit<UserBadge, 'earnedAt'>[] {
  const eligibleBadges: Omit<UserBadge, 'earnedAt'>[] = []
  const existingBadgeNames = existingBadges.map(b => b.nameVi)
  
  // Check various badge criteria
  if (points.breakdown.mentoring >= 100 && !existingBadgeNames.includes('Thầy giáo cộng đồng')) {
    eligibleBadges.push(CULTURAL_BADGES.find(b => b.nameVi === 'Thầy giáo cộng đồng')!)
  }
  
  if (points.breakdown.verification >= 50 && !existingBadgeNames.includes('Người tin cậy')) {
    eligibleBadges.push(CULTURAL_BADGES.find(b => b.nameVi === 'Người tin cậy')!)
  }
  
  if (points.breakdown.localIntelligence >= 200 && !existingBadgeNames.includes('Chuyên gia địa phương')) {
    eligibleBadges.push(CULTURAL_BADGES.find(b => b.nameVi === 'Chuyên gia địa phương')!)
  }
  
  return eligibleBadges
}