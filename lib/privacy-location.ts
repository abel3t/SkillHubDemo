// Privacy-First Location Control System
// Vietnamese-style location privacy with ward-level visibility

export interface LocationPrivacy {
  // General location (always visible)
  ward: string
  district: string
  city: string
  
  // Precise location (privacy-controlled)
  exactAddress?: string
  coordinates?: {
    lat: number
    lng: number
  }
  
  // Privacy settings
  allowExactLocation: boolean
  sharedWithUserIds: string[]
  autoShareRadius?: number // meters for auto-sharing
  
  // Vietnamese context
  wardCode: string
  vietnameseAddressFormat: {
    houseNumber?: string
    street?: string
    ward: string
    district: string
    city: string
  }
}

export interface LocationSharingRequest {
  id: string
  fromUserId: string
  toUserId: string
  reason: string
  reasonVi: string
  type: 'service_request' | 'emergency' | 'community_event' | 'neighbor_help'
  status: 'pending' | 'approved' | 'denied' | 'expired'
  requestedAt: Date
  expiresAt: Date
  approvedAt?: Date
  isTemporary: boolean
  temporaryDuration?: number // minutes
}

// Ward-level privacy levels
export const PRIVACY_LEVELS = {
  PUBLIC_WARD: {
    id: 'public_ward',
    nameVi: 'Công khai phường',
    description: 'Everyone can see your ward and district',
    descriptionVi: 'Mọi người có thể thấy phường và quận của bạn',
    exactLocationVisible: false,
    wardVisible: true,
    districtVisible: true
  },
  NEIGHBORS_ONLY: {
    id: 'neighbors_only', 
    nameVi: 'Chỉ hàng xóm',
    description: 'Only verified neighbors can see exact location',
    descriptionVi: 'Chỉ hàng xóm được xác minh mới thấy địa chỉ chính xác',
    exactLocationVisible: false,
    requiresVerification: true,
    wardVisible: true,
    districtVisible: true
  },
  FAMILY_FRIENDS: {
    id: 'family_friends',
    nameVi: 'Gia đình và bạn bè',
    description: 'Only family members and close friends',
    descriptionVi: 'Chỉ thành viên gia đình và bạn bè thân thiết',
    exactLocationVisible: false,
    requiresApproval: true,
    wardVisible: true,
    districtVisible: true
  },
  SERVICE_PROVIDERS: {
    id: 'service_providers',
    nameVi: 'Nhà cung cấp dịch vụ',
    description: 'Share with service providers when booking',
    descriptionVi: 'Chia sẻ với nhà cung cấp dịch vụ khi đặt lịch',
    exactLocationVisible: true,
    temporaryOnly: true,
    requiresServiceBooking: true
  }
} as const

// Vietnamese address validation
export function validateVietnameseAddress(address: LocationPrivacy['vietnameseAddressFormat']): boolean {
  // Must have ward, district, city at minimum
  return !!(address.ward && address.district && address.city)
}

// Format address for display with privacy controls
export function formatDisplayAddress(
  location: LocationPrivacy,
  viewerUserId: string,
  privacyLevel: keyof typeof PRIVACY_LEVELS
): string {
  const { vietnameseAddressFormat, sharedWithUserIds, allowExactLocation } = location
  
  // Always show ward/district/city
  let displayParts = [
    vietnameseAddressFormat.ward,
    vietnameseAddressFormat.district, 
    vietnameseAddressFormat.city
  ]
  
  // Check if exact location should be shown
  const canViewExact = allowExactLocation && (
    sharedWithUserIds.includes(viewerUserId) ||
    privacyLevel === 'SERVICE_PROVIDERS'
  )
  
  if (canViewExact && vietnameseAddressFormat.houseNumber && vietnameseAddressFormat.street) {
    displayParts.unshift(
      vietnameseAddressFormat.houseNumber,
      vietnameseAddressFormat.street
    )
  }
  
  return displayParts.filter(Boolean).join(', ')
}

// Request exact location access
export function createLocationSharingRequest(
  fromUserId: string,
  toUserId: string,
  type: LocationSharingRequest['type'],
  reason: string,
  reasonVi: string,
  isTemporary: boolean = true,
  temporaryDuration: number = 120 // 2 hours default
): LocationSharingRequest {
  const now = new Date()
  const expiresAt = new Date(now.getTime() + (isTemporary ? temporaryDuration * 60 * 1000 : 24 * 60 * 60 * 1000))
  
  return {
    id: `loc_req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    fromUserId,
    toUserId,
    reason,
    reasonVi,
    type,
    status: 'pending',
    requestedAt: now,
    expiresAt,
    isTemporary,
    temporaryDuration: isTemporary ? temporaryDuration : undefined
  }
}

// Vietnamese ward-level community verification
export interface WardVerification {
  userId: string
  wardCode: string
  wardName: string
  verificationMethod: 'neighbor_endorsement' | 'community_event' | 'local_business' | 'residence_proof'
  verifiedBy: string[]
  verifiedAt: Date
  expiresAt: Date
  isActive: boolean
  communityTrustScore: number // 0-100, based on neighbor endorsements
}

// Anti-big-tech privacy features
export const PRIVACY_PRINCIPLES = {
  NO_DATA_HARVESTING: {
    nameVi: 'Không thu thập dữ liệu',
    description: 'SkillHub never sells or shares your location data',
    descriptionVi: 'SkillHub không bao giờ bán hoặc chia sẻ dữ liệu vị trí của bạn'
  },
  USER_CONTROLLED: {
    nameVi: 'Người dùng kiểm soát',
    description: 'You decide who sees your exact location and when',
    descriptionVi: 'Bạn quyết định ai thấy vị trí chính xác và khi nào'
  },
  TEMPORARY_SHARING: {
    nameVi: 'Chia sẻ tạm thời',
    description: 'Location sharing automatically expires',
    descriptionVi: 'Chia sẻ vị trí tự động hết hạn'
  },
  COMMUNITY_VERIFICATION: {
    nameVi: 'Xác minh cộng đồng',
    description: 'Neighbors verify each other, not algorithms',
    descriptionVi: 'Hàng xóm xác minh lẫn nhau, không phải thuật toán'
  },
  VIETNAMESE_CONTEXT: {
    nameVi: 'Bối cảnh Việt Nam',
    description: 'Privacy settings designed for Vietnamese family culture',
    descriptionVi: 'Cài đặt riêng tư được thiết kế cho văn hóa gia đình Việt Nam'
  }
} as const

// Hyperlocal safety features
export interface NeighborhoodSafety {
  wardCode: string
  safetyRating: number // 1-5 stars
  reportedIssues: {
    type: 'lighting' | 'traffic' | 'safety' | 'construction' | 'flooding'
    description: string
    descriptionVi: string
    reportedAt: Date
    resolvedAt?: Date
    severity: 'low' | 'medium' | 'high'
  }[]
  communityWatch: {
    activeMembers: number
    lastUpdate: Date
    emergencyContacts: string[]
  }
  transportationSafety: {
    walkingScore: number
    bikingScore: number
    motorcycleRoutes: string[]
    publicTransportAccess: string[]
  }
}