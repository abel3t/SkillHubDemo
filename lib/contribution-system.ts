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
  // Traditional Vietnamese Values
  {
    name: 'Elder Respect',
    nameVi: 'Tôn kính người lớn',
    description: 'Consistently helps elderly community members',
    descriptionVi: 'Thường xuyên giúp đỡ người lớn tuổi trong cộng đồng',
    icon: '👵',
    category: 'văn_hóa',
    rarity: 'ít_gặp'
  },
  {
    name: 'Good Neighbor',
    nameVi: 'Người hàng xóm tốt',
    description: 'Active in local neighborhood',
    descriptionVi: 'Tích cực trong khu phố địa phương',
    icon: '🏠',
    category: 'văn_hóa',
    rarity: 'phổ_biến'
  },
  {
    name: 'Community Teacher',
    nameVi: 'Thầy/Cô cộng đồng',
    description: 'Teaches skills with patience and dedication',
    descriptionVi: 'Dạy kỹ năng với sự kiên nhẫn và tận tâm',
    icon: '📚',
    category: 'văn_hóa',
    rarity: 'hiếm'
  },
  {
    name: 'Family Helper',
    nameVi: 'Người giúp đỡ gia đình',
    description: 'Supports families with children and household needs',
    descriptionVi: 'Hỗ trợ các gia đình có trẻ em và nhu cầu gia đình',
    icon: '👨‍👩‍👧‍👦',
    category: 'văn_hóa',
    rarity: 'ít_gặp'
  },
  
  // Community Building
  {
    name: 'Ward Guardian',
    nameVi: 'Người bảo vệ phường',
    description: 'Actively ensures neighborhood safety and cleanliness',
    descriptionVi: 'Tích cực đảm bảo an toàn và sạch sẽ cho khu phố',
    icon: '🛡️',
    category: 'cộng_đồng',
    rarity: 'hiếm'
  },
  {
    name: 'Festival Organizer',
    nameVi: 'Người tổ chức lễ hội',
    description: 'Organizes community celebrations and cultural events',
    descriptionVi: 'Tổ chức các lễ kỷ niệm và sự kiện văn hóa cộng đồng',
    icon: '🎊',
    category: 'cộng_đồng',
    rarity: 'hiếm'
  },
  {
    name: 'Connector',
    nameVi: 'Người kết nối',
    description: 'Successfully connects people and builds relationships',
    descriptionVi: 'Kết nối mọi người và xây dựng mối quan hệ thành công',
    icon: '🤝',
    category: 'cộng_đồng',
    rarity: 'ít_gặp'
  },
  {
    name: 'Local Ambassador',
    nameVi: 'Đại sứ địa phương',
    description: 'Welcomes newcomers and helps them integrate',
    descriptionVi: 'Chào đón người mới và giúp họ hòa nhập',
    icon: '🌏',
    category: 'cộng_đồng',
    rarity: 'hiếm'
  },

  // Expertise & Quality
  {
    name: 'Master Craftsperson',
    nameVi: 'Thợ thủ công bậc thầy',
    description: 'Exceptional skill in traditional Vietnamese crafts',
    descriptionVi: 'Kỹ năng xuất sắc trong nghề thủ công truyền thống Việt Nam',
    icon: '🏺',
    category: 'thành_tích',
    rarity: 'huyền_thoại'
  },
  {
    name: 'Local Expert',
    nameVi: 'Chuyên gia địa phương',
    description: 'Deep knowledge of local area, culture, and services',
    descriptionVi: 'Hiểu biết sâu về khu vực, văn hóa và dịch vụ địa phương',
    icon: '🎯',
    category: 'đóng_góp',
    rarity: 'hiếm'
  },
  {
    name: 'Trusted Person',
    nameVi: 'Người đáng tin cậy',
    description: 'Consistently reliable with strong community endorsement',
    descriptionVi: 'Luôn đáng tin cậy với sự ủng hộ mạnh mẽ từ cộng đồng',
    icon: '🌟',
    category: 'chất_lượng',
    rarity: 'huyền_thoại'
  },
  {
    name: 'Emergency Helper',
    nameVi: 'Người trợ giúp khẩn cấp',
    description: 'Always available to help in urgent situations',
    descriptionVi: 'Luôn sẵn sàng giúp đỡ trong các tình huống khẩn cấp',
    icon: '🚨',
    category: 'cộng_đồng',
    rarity: 'hiếm'
  },

  // Special Vietnamese Cultural Badges
  {
    name: 'Rice Harvest Helper',
    nameVi: 'Người giúp mùa gặt',
    description: 'Helps during agricultural seasons and food preparation',
    descriptionVi: 'Giúp đỡ trong mùa vụ nông nghiệp và chuẩn bị thức ăn',
    icon: '🌾',
    category: 'văn_hóa',
    rarity: 'ít_gặp'
  },
  {
    name: 'Tea Circle Host',
    nameVi: 'Chủ nhà vòng tròn trà',
    description: 'Regularly hosts community tea gatherings for connection',
    descriptionVi: 'Thường xuyên tổ chức buổi uống trà cộng đồng để kết nối',
    icon: '🍵',
    category: 'văn_hóa',
    rarity: 'ít_gặp'
  },
  {
    name: 'Motorbike Taxi Guide',
    nameVi: 'Hướng dẫn viên xe ôm',
    description: 'Expert in local transportation and navigation',
    descriptionVi: 'Chuyên gia về giao thông và định hướng địa phương',
    icon: '🛵',
    category: 'đóng_góp',
    rarity: 'ít_gặp'
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

  // Vietnamese Cultural Events
  HOST_TEA_CIRCLE: { points: 20, nameVi: 'Tổ chức vòng tròn trà', category: 'culture' },
  ORGANIZE_TET_CELEBRATION: { points: 40, nameVi: 'Tổ chức lễ Tết', category: 'culture' },
  TEACH_TRADITIONAL_CRAFT: { points: 30, nameVi: 'Dạy nghề thủ công truyền thống', category: 'culture' },
  SHARE_FAMILY_RECIPE: { points: 15, nameVi: 'Chia sẻ công thức gia đình', category: 'culture' },
  HELP_ELDERLY_NEIGHBOR: { points: 25, nameVi: 'Giúp đỡ hàng xóm lớn tuổi', category: 'culture' },
  WELCOME_NEW_RESIDENT: { points: 20, nameVi: 'Chào đón cư dân mới', category: 'culture' },

  // Hyperlocal Intelligence
  UPDATE_AVAILABILITY: { points: 5, nameVi: 'Cập nhật tình trạng', category: 'intelligence' },
  REPORT_BUSINESS_CHANGE: { points: 10, nameVi: 'Báo cáo thay đổi doanh nghiệp', category: 'intelligence' },
  ADD_SAFETY_TIPS: { points: 15, nameVi: 'Thêm mẹo an toàn', category: 'intelligence' },
  CREATE_TRANSPORT_GUIDE: { points: 20, nameVi: 'Tạo hướng dẫn di chuyển', category: 'intelligence' },
  MAP_SERVICE_AREA: { points: 25, nameVi: 'Bản đồ khu vực dịch vụ', category: 'intelligence' },
  REPORT_STREET_CONDITION: { points: 12, nameVi: 'Báo cáo tình trạng đường phố', category: 'intelligence' },
  UPDATE_LOCAL_PRICES: { points: 8, nameVi: 'Cập nhật giá cả địa phương', category: 'intelligence' },
  SHARE_WEATHER_ALERT: { points: 10, nameVi: 'Chia sẻ cảnh báo thời tiết', category: 'intelligence' },

  // Anti-Commercial Quality Control
  VOTE_AUTHENTIC_REVIEW: { points: 8, nameVi: 'Bình chọn đánh giá chân thực', category: 'quality' },
  FLAG_FAKE_CONTENT: { points: 15, nameVi: 'Báo cáo nội dung giả mạo', category: 'quality' },
  VERIFY_NEIGHBOR: { points: 20, nameVi: 'Xác minh hàng xóm', category: 'quality' },
  MODERATE_DISCUSSION: { points: 20, nameVi: 'Kiểm duyệt thảo luận', category: 'quality' },
  RESOLVE_DISPUTE: { points: 30, nameVi: 'Giải quyết tranh chấp', category: 'quality' },
  PROTECT_COMMUNITY_VALUES: { points: 25, nameVi: 'Bảo vệ giá trị cộng đồng', category: 'quality' },

  // Emergency & Mutual Help
  EMERGENCY_RESPONSE: { points: 40, nameVi: 'Ứng phó khẩn cấp', category: 'emergency' },
  NATURAL_DISASTER_HELP: { points: 50, nameVi: 'Trợ giúp thiên tai', category: 'emergency' },
  COORDINATE_NEIGHBORHOOD_WATCH: { points: 30, nameVi: 'Điều phối tuần tra khu phố', category: 'emergency' }
}

// Ward-level Community Events
export interface CommunityEvent {
  id: string
  title: string
  titleVi: string
  description: string
  descriptionVi: string
  type: 'workshop' | 'festival' | 'safety' | 'cultural' | 'skill_share' | 'social'
  wardName: string
  date: Date
  location: string
  organizer: string
  attendeeCount: number
  maxAttendees: number
  isRecurring: boolean
  culturalSignificance?: 'high' | 'medium' | 'low'
  antiCommercial: boolean
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