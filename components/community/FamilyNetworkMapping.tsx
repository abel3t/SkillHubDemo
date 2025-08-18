"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Users, 
  Crown, 
  Heart, 
  Star, 
  Award,
  Home,
  MapPin,
  Calendar,
  Handshake,
  Shield,
  TreePine,
  Baby,
  Sparkles,
  Gift,
  BookOpen,
  Coffee,
  ChevronRight,
  Eye,
  MessageCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

interface FamilyMember {
  id: string
  name: string
  age: number
  relationship: 'grandfather' | 'grandmother' | 'father' | 'mother' | 'uncle' | 'aunt' | 'cousin' | 'self' | 'child' | 'grandchild'
  relationshipVi: string
  avatar: string
  skills: string[]
  skillsVi: string[]
  yearsExperience: number
  studentsCount: number
  isActive: boolean
  reputation: number
  specialties: string[]
  culturalRole: string
  culturalRoleVi: string
  familyStory?: string
}

interface FamilySkillNetwork {
  familyName: string
  familyNameVi: string
  generationsOfSkill: number
  totalFamilyReputation: number
  originVillage: string
  originVillageVi: string
  skillTradition: string
  skillTraditionVi: string
  establishedYear: number
  members: FamilyMember[]
  crossFamilyEndorsements: FamilyEndorsement[]
  culturalLineage: {
    originalVillage: string
    skillOriginStory: string
    skillOriginStoryVi: string
    preservedTechniques: string[]
    preservedTechniquesVi: string[]
    culturalSignificance: 'national_treasure' | 'regional_important' | 'local_tradition'
  }
}

interface FamilyEndorsement {
  endorsingFamily: string
  endorsingFamilyVi: string
  relationship: 'neighborhood' | 'business_partner' | 'cultural_ally' | 'marriage_connection'
  relationshipVi: string
  endorsementText: string
  endorsementTextVi: string
  endorserName: string
  duration: string
  durationVi: string
  trustLevel: 'absolute' | 'high' | 'good'
}

interface GrandmotherEndorsement {
  grandmotherName: string
  age: number
  relationship: string
  relationshipVi: string
  endorsement: string
  endorsementVi: string
  culturalWeight: 'maximum' | 'high' | 'medium'
  verificationMethod: string
  verificationMethodVi: string
  yearsKnown: number
}

const MOCK_FAMILY_NETWORKS: FamilySkillNetwork[] = [
  {
    familyName: 'Nguyen Traditional Carpentry Family',
    familyNameVi: 'Gia đình mộc Nguyễn',
    generationsOfSkill: 5,
    totalFamilyReputation: 2847,
    originVillage: 'Dong Ky Village, Bac Ninh',
    originVillageVi: 'Làng Đồng Kỵ, Bắc Ninh',
    skillTradition: 'Traditional Vietnamese Carpentry',
    skillTraditionVi: 'Nghề mộc truyền thống Việt Nam',
    establishedYear: 1923,
    members: [
      {
        id: '1',
        name: 'Ông Nguyễn Văn Thọ',
        age: 78,
        relationship: 'grandfather',
        relationshipVi: 'Ông nội',
        avatar: '/vietnamese-elderly-man.png',
        skills: ['Traditional Carpentry', 'Wood Carving', 'Furniture Making'],
        skillsVi: ['Nghề mộc truyền thống', 'Chạm khắc gỗ', 'Làm đồ nội thất'],
        yearsExperience: 58,
        studentsCount: 47,
        isActive: true,
        reputation: 985,
        specialties: ['Mộc cổ truyền', 'Chạm rồng phượng', 'Bàn thờ gia tiên'],
        culturalRole: 'Master craftsman, village elder',
        culturalRoleVi: 'Thầy thợ chính, bề lão trong làng',
        familyStory: 'Học nghề từ thời Pháp thuộc, giữ gìn kỹ thuật cổ truyền của làng Đồng Kỵ'
      },
      {
        id: '2',
        name: 'Anh Nguyễn Văn Hùng',
        age: 52,
        relationship: 'father',
        relationshipVi: 'Bố',
        avatar: '/vietnamese-technician.png',
        skills: ['Modern Carpentry', 'Interior Design', 'Project Management'],
        skillsVi: ['Mộc hiện đại', 'Thiết kế nội thất', 'Quản lý dự án'],
        yearsExperience: 34,
        studentsCount: 23,
        isActive: true,
        reputation: 756,
        specialties: ['Tủ bếp hiện đại', 'Nội thất văn phòng', 'Thiết kế 3D'],
        culturalRole: 'Bridge between tradition and modernity',
        culturalRoleVi: 'Cầu nối giữa truyền thống và hiện đại'
      },
      {
        id: '3',
        name: 'Chị Nguyễn Thị Lan',
        age: 48,
        relationship: 'mother',
        relationshipVi: 'Mẹ',
        avatar: '/vietnamese-user.png',
        skills: ['Wood Finishing', 'Color Matching', 'Customer Relations'],
        skillsVi: ['Hoàn thiện gỗ', 'Phối màu', 'Quan hệ khách hàng'],
        yearsExperience: 26,
        studentsCount: 15,
        isActive: true,
        reputation: 543,
        specialties: ['Sơn PU cao cấp', 'Tư vấn màu sắc', 'Chăm sóc khách hàng'],
        culturalRole: 'Family business manager, quality controller',
        culturalRoleVi: 'Quản lý gia đình, kiểm soát chất lượng'
      },
      {
        id: '4',
        name: 'Em Nguyễn Văn Minh',
        age: 28,
        relationship: 'self',
        relationshipVi: 'Bản thân',
        avatar: '/vietnamese-technician.png',
        skills: ['Digital Design', 'CNC Operation', 'E-commerce'],
        skillsVi: ['Thiết kế số', 'Vận hành CNC', 'Thương mại điện tử'],
        yearsExperience: 10,
        studentsCount: 8,
        isActive: true,
        reputation: 387,
        specialties: ['Thiết kế CAD', 'Gia công CNC', 'Bán hàng online'],
        culturalRole: 'Technology innovator, next generation leader',
        culturalRoleVi: 'Người đổi mới công nghệ, thế hệ kế tiếp'
      },
      {
        id: '5',
        name: 'Bé Nguyễn Hà My',
        age: 8,
        relationship: 'child',
        relationshipVi: 'Con',
        avatar: '/vietnamese-user.png',
        skills: ['Basic Woodworking', 'Drawing'],
        skillsVi: ['Làm đồ gỗ cơ bản', 'Vẽ'],
        yearsExperience: 2,
        studentsCount: 0,
        isActive: false,
        reputation: 45,
        specialties: ['Vẽ thiết kế', 'Làm đồ chơi gỗ'],
        culturalRole: 'Future inheritor, learning family traditions',
        culturalRoleVi: 'Người kế thừa tương lai, học truyền thống gia đình'
      }
    ],
    crossFamilyEndorsements: [
      {
        endorsingFamily: 'Tran Traditional Painting Family',
        endorsingFamilyVi: 'Gia đình họa sĩ Trần',
        relationship: 'business_partner',
        relationshipVi: 'Đối tác kinh doanh',
        endorsementText: '30 years of collaboration on traditional furniture decoration',
        endorsementTextVi: '30 năm hợp tác trang trí nội thất truyền thống',
        endorserName: 'Thầy Trần Văn Đức',
        duration: '30 years',
        durationVi: '30 năm',
        trustLevel: 'absolute'
      },
      {
        endorsingFamily: 'Le Lacquerware Masters',
        endorsingFamilyVi: 'Gia đình sơn mài Lê',
        relationship: 'cultural_ally',
        relationshipVi: 'Đồng minh văn hóa',
        endorsementText: 'Trusted partners in preserving traditional Vietnamese crafts',
        endorsementTextVi: 'Đối tác tin cậy trong việc bảo tồn thủ công truyền thống Việt Nam',
        endorserName: 'Nghệ nhân Lê Văn Sơn',
        duration: '15 years',
        durationVi: '15 năm',
        trustLevel: 'high'
      }
    ],
    culturalLineage: {
      originalVillage: 'Dong Ky Traditional Craft Village',
      skillOriginStory: 'Founded by great-great-grandfather who learned from royal craftsmen in Hue Imperial City',
      skillOriginStoryVi: 'Được thành lập bởi cụ tổ học nghề từ thợ hoàng gia ở Kinh thành Huế',
      preservedTechniques: ['Mortise and tenon joinery', 'Hand carving techniques', 'Natural wood finishing'],
      preservedTechniquesVi: ['Kỹ thuật mộng âm dương', 'Chạm khắc tay', 'Hoàn thiện gỗ tự nhiên'],
      culturalSignificance: 'regional_important'
    }
  },
  {
    familyName: 'Pham Traditional Cuisine Family',
    familyNameVi: 'Gia đình ẩm thực Phạm',
    generationsOfSkill: 4,
    totalFamilyReputation: 1923,
    originVillage: 'Nam Dinh Province',
    originVillageVi: 'Tỉnh Nam Định',
    skillTradition: 'Traditional Vietnamese Cooking',
    skillTraditionVi: 'Nấu ăn truyền thống Việt Nam',
    establishedYear: 1945,
    members: [
      {
        id: '6',
        name: 'Bà Phạm Thị Hoa',
        age: 72,
        relationship: 'grandmother',
        relationshipVi: 'Bà ngoại',
        avatar: '/vietnamese-elderly-woman.png',
        skills: ['Traditional Cooking', 'Fermentation', 'Herb Knowledge'],
        skillsVi: ['Nấu ăn truyền thống', 'Lên men', 'Hiểu biết thảo dược'],
        yearsExperience: 55,
        studentsCount: 32,
        isActive: true,
        reputation: 892,
        specialties: ['Bún bò Huế', 'Nước mắm gia truyền', 'Bánh tết truyền thống'],
        culturalRole: 'Family recipe keeper, community cooking teacher',
        culturalRoleVi: 'Người giữ công thức gia đình, thầy dạy nấu ăn cộng đồng',
        familyStory: 'Học nấu ăn từ cung đình Huế, mang công thức về Nam Định'
      },
      {
        id: '7',
        name: 'Cô Phạm Thị Linh',
        age: 45,
        relationship: 'aunt',
        relationshipVi: 'Dì',
        avatar: '/vietnamese-user.png',
        skills: ['Restaurant Management', 'Modern Fusion', 'Food Safety'],
        skillsVi: ['Quản lý nhà hàng', 'Fusion hiện đại', 'An toàn thực phẩm'],
        yearsExperience: 25,
        studentsCount: 18,
        isActive: true,
        reputation: 654,
        specialties: ['Quản lý nhà hàng', 'Fusion Việt-Âu', 'Đào tạo nhân viên'],
        culturalRole: 'Modern business developer, food innovator',
        culturalRoleVi: 'Phát triển kinh doanh hiện đại, đổi mới ẩm thực'
      },
      {
        id: '8',
        name: 'Anh Phạm Văn Đức',
        age: 31,
        relationship: 'cousin',
        relationshipVi: 'Anh họ',
        avatar: '/vietnamese-technician.png',
        skills: ['Food Blogging', 'Photography', 'Social Media'],
        skillsVi: ['Blog ẩm thực', 'Chụp ảnh', 'Mạng xã hội'],
        yearsExperience: 8,
        studentsCount: 12,
        isActive: true,
        reputation: 377,
        specialties: ['Food photography', 'Content creation', 'Online marketing'],
        culturalRole: 'Digital storyteller, brand ambassador',
        culturalRoleVi: 'Kể chuyện số, đại sứ thương hiệu'
      }
    ],
    crossFamilyEndorsements: [
      {
        endorsingFamily: 'Nguyen Spice Trading Family',
        endorsingFamilyVi: 'Gia đình kinh doanh gia vị Nguyễn',
        relationship: 'business_partner',
        relationshipVi: 'Đối tác kinh doanh',
        endorsementText: 'Exclusive supplier of rare spices for traditional recipes',
        endorsementTextVi: 'Nhà cung cấp độc quyền gia vị hiếm cho công thức truyền thống',
        endorserName: 'Bà Nguyễn Thị Mai',
        duration: '25 years',
        durationVi: '25 năm',
        trustLevel: 'absolute'
      }
    ],
    culturalLineage: {
      originalVillage: 'Traditional fishing village in Nam Dinh',
      skillOriginStory: 'Family recipes passed down from imperial palace cooks who fled to the countryside',
      skillOriginStoryVi: 'Công thức gia đình được truyền từ đầu bếp hoàng gia chạy về nông thôn',
      preservedTechniques: ['Clay pot cooking', 'Natural fermentation', 'Seasonal ingredient selection'],
      preservedTechniquesVi: ['Nấu niêu đất', 'Lên men tự nhiên', 'Chọn nguyên liệu theo mùa'],
      culturalSignificance: 'local_tradition'
    }
  }
]

const GRANDMOTHER_ENDORSEMENTS: GrandmotherEndorsement[] = [
  {
    grandmotherName: 'Bà Tuyết (84 tuổi)',
    age: 84,
    relationship: 'Neighbor for 20 years',
    relationshipVi: 'Hàng xóm 20 năm',
    endorsement: 'Mai makes bánh chưng as delicious as her grandmother used to',
    endorsementVi: 'Cháu Mai làm bánh chưng ngon như thời bà ngoại cháu',
    culturalWeight: 'maximum',
    verificationMethod: 'In-person neighborhood visit',
    verificationMethodVi: 'Thăm hỏi trực tiếp tại khu phố',
    yearsKnown: 20
  },
  {
    grandmotherName: 'Bà Hồng (79 tuổi)',
    age: 79,
    relationship: 'Family friend',
    relationshipVi: 'Bạn thân gia đình',
    endorsement: 'This family has been honest in business for three generations',
    endorsementVi: 'Gia đình này làm ăn chân thật ba đời',
    culturalWeight: 'high',
    verificationMethod: 'Community tea gathering testimony',
    verificationMethodVi: 'Chứng thực tại buổi uống trà cộng đồng',
    yearsKnown: 35
  },
  {
    grandmotherName: 'Bà Xuân (76 tuổi)',
    age: 76,
    relationship: 'Former customer',
    relationshipVi: 'Khách hàng cũ',
    endorsement: 'They fixed my roof during typhoon season, very reliable',
    endorsementVi: 'Họ sửa mái nhà tôi mùa bão, rất đáng tin cậy',
    culturalWeight: 'high',
    verificationMethod: 'Work history verification',
    verificationMethodVi: 'Xác minh lịch sử công việc',
    yearsKnown: 12
  }
]

interface FamilyNetworkMappingProps {
  className?: string
}

export function FamilyNetworkMapping({ className = "" }: FamilyNetworkMappingProps) {
  const [selectedFamily, setSelectedFamily] = useState<FamilySkillNetwork | null>(null)
  const [viewMode, setViewMode] = useState<'overview' | 'family_tree' | 'endorsements'>('overview')

  const getRelationshipIcon = (relationship: FamilyMember['relationship']) => {
    switch (relationship) {
      case 'grandfather':
      case 'grandmother':
        return <Crown className="w-4 h-4 text-yellow-600" />
      case 'father':
      case 'mother':
        return <Home className="w-4 h-4 text-blue-600" />
      case 'uncle':
      case 'aunt':
        return <Users className="w-4 h-4 text-green-600" />
      case 'self':
        return <Star className="w-4 h-4 text-purple-600" />
      case 'child':
      case 'grandchild':
        return <Baby className="w-4 h-4 text-pink-600" />
      default:
        return <Users className="w-4 h-4 text-gray-600" />
    }
  }

  const getReputationColor = (reputation: number) => {
    if (reputation >= 800) return 'text-purple-600'
    if (reputation >= 600) return 'text-blue-600'
    if (reputation >= 400) return 'text-emerald-600'
    return 'text-gray-600'
  }

  const getTrustLevelColor = (level: FamilyEndorsement['trustLevel']) => {
    switch (level) {
      case 'absolute': return 'bg-purple-100 text-purple-700'
      case 'high': return 'bg-blue-100 text-blue-700'
      case 'good': return 'bg-emerald-100 text-emerald-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getCulturalWeightIcon = (weight: GrandmotherEndorsement['culturalWeight']) => {
    switch (weight) {
      case 'maximum': return <Crown className="w-4 h-4 text-yellow-600" />
      case 'high': return <Award className="w-4 h-4 text-blue-600" />
      case 'medium': return <Star className="w-4 h-4 text-emerald-600" />
      default: return <Heart className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TreePine className="w-5 h-5 text-emerald-600" />
          Bản đồ mạng lưới gia đình
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            <Heart className="w-3 h-3 mr-1" />
            Truyền thống gia đình
          </Badge>
          <Badge variant="outline" className="text-xs">
            Không thể giả mạo bởi AI
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Mode Selector */}
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'overview' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('overview')}
          >
            Tổng quan
          </Button>
          <Button
            variant={viewMode === 'family_tree' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('family_tree')}
            disabled={!selectedFamily}
          >
            Cây gia đình
          </Button>
          <Button
            variant={viewMode === 'endorsements' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('endorsements')}
          >
            Chứng thực từ bà
          </Button>
        </div>

        {viewMode === 'overview' && (
          <div className="space-y-4">
            {/* Family Networks */}
            {MOCK_FAMILY_NETWORKS.map((family) => (
              <Card key={family.familyNameVi} className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedFamily(family)
                      setViewMode('family_tree')
                    }}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{family.familyNameVi}</h3>
                        <Badge variant="outline" className="text-xs">
                          {family.generationsOfSkill} thế hệ
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{family.skillTraditionVi}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {family.originVillageVi}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={cn("text-lg font-bold", getReputationColor(family.totalFamilyReputation))}>
                        {family.totalFamilyReputation.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">uy tín</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {family.members.slice(0, 4).map((member) => (
                          <Avatar key={member.id} className="w-6 h-6 border-2 border-white">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                        {family.members.length > 4 && (
                          <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                            <span className="text-xs text-gray-600">+{family.members.length - 4}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        {family.members.length} thành viên
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-emerald-100 text-emerald-700">
                        <Calendar className="w-3 h-3 mr-1" />
                        {family.establishedYear}
                      </Badge>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {viewMode === 'family_tree' && selectedFamily && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Button variant="ghost" size="sm" onClick={() => setViewMode('overview')}>
                ← Quay lại
              </Button>
              <h3 className="font-semibold text-lg">{selectedFamily.familyNameVi}</h3>
            </div>

            {/* Cultural Lineage Info */}
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-semibold text-emerald-800 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Di sản văn hóa
              </h4>
              <p className="text-sm text-emerald-700 mb-2">
                {selectedFamily.culturalLineage.skillOriginStoryVi}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-emerald-600">
                {selectedFamily.culturalLineage.preservedTechniquesVi.map((technique, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{technique}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Family Tree */}
            <div className="space-y-4">
              {selectedFamily.members.map((member, index) => (
                <div key={member.id} className="relative">
                  {index < selectedFamily.members.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-8 bg-emerald-300"></div>
                  )}
                  
                  <Card className="border-l-4 border-l-emerald-500">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1">
                            {getRelationshipIcon(member.relationship)}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{member.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {member.relationshipVi}
                            </Badge>
                            <div className={cn("text-sm font-medium", getReputationColor(member.reputation))}>
                              {member.reputation} uy tín
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{member.age} tuổi, {member.yearsExperience} năm kinh nghiệm</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>{member.studentsCount} học trò</span>
                            </div>
                          </div>

                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-700 mb-1">Vai trò văn hóa:</p>
                            <p className="text-sm text-gray-600 italic">{member.culturalRoleVi}</p>
                          </div>

                          {member.familyStory && (
                            <div className="p-3 bg-yellow-50 rounded border border-yellow-200 mb-3">
                              <p className="text-sm text-yellow-800 italic">
                                "{member.familyStory}"
                              </p>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2 mb-3">
                            {member.skillsVi.map((skill, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-2" />
                              Xem hồ sơ
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Liên hệ
                            </Button>
                            {member.isActive && (
                              <Badge variant="secondary" className="bg-green-100 text-green-700">
                                Đang hoạt động
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Cross-Family Endorsements */}
            {selectedFamily.crossFamilyEndorsements.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Handshake className="w-4 h-4" />
                  Chứng thực từ gia đình khác
                </h4>
                <div className="space-y-3">
                  {selectedFamily.crossFamilyEndorsements.map((endorsement, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900">{endorsement.endorsingFamilyVi}</h5>
                        <Badge className={getTrustLevelColor(endorsement.trustLevel)}>
                          {endorsement.trustLevel === 'absolute' ? 'Tuyệt đối' :
                           endorsement.trustLevel === 'high' ? 'Cao' : 'Tốt'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{endorsement.endorsementTextVi}</p>
                      <p className="text-xs text-gray-500">
                        Mối quan hệ: {endorsement.relationshipVi} • {endorsement.durationVi}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {viewMode === 'endorsements' && (
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                <Crown className="w-4 h-4" />
                Hệ thống chứng thực từ bà
              </h4>
              <p className="text-sm text-purple-700">
                Trong văn hóa Việt Nam, lời chứng thực từ các bà lão trong cộng đồng có giá trị cao nhất. 
                Đây là điều mà AI hay công nghệ không thể tạo ra - chỉ có mối quan hệ con người thực sự.
              </p>
            </div>

            {/* Grandmother Endorsements */}
            <div className="space-y-3">
              {GRANDMOTHER_ENDORSEMENTS.map((endorsement, index) => (
                <Card key={index} className="border-l-4 border-l-yellow-400">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="/vietnamese-elderly-woman.png" alt={endorsement.grandmotherName} />
                        <AvatarFallback>👵</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{endorsement.grandmotherName}</h4>
                          {getCulturalWeightIcon(endorsement.culturalWeight)}
                          <Badge className="bg-yellow-100 text-yellow-700">
                            {endorsement.culturalWeight === 'maximum' ? 'Trọng lượng tối đa' :
                             endorsement.culturalWeight === 'high' ? 'Trọng lượng cao' : 'Trọng lượng trung bình'}
                          </Badge>
                        </div>
                        
                        <div className="p-3 bg-yellow-50 rounded border border-yellow-200 mb-3">
                          <p className="text-sm text-yellow-800 italic font-medium">
                            "{endorsement.endorsementVi}"
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Mối quan hệ:</span> {endorsement.relationshipVi}
                          </div>
                          <div>
                            <span className="font-medium">Biết nhau:</span> {endorsement.yearsKnown} năm
                          </div>
                        </div>
                        
                        <div className="mt-2 text-xs text-gray-500">
                          <Shield className="w-3 h-3 inline mr-1" />
                          Phương thức xác minh: {endorsement.verificationMethodVi}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Why This Cannot Be Faked */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Tại sao không thể giả mạo?
              </h4>
              <div className="text-sm text-green-700 space-y-1">
                <p>• <strong>Xác minh vật lý:</strong> Cần thăm hỏi trực tiếp tại cộng đồng</p>
                <p>• <strong>Mối quan hệ lâu dài:</strong> Mất nhiều năm để xây dựng uy tín</p>
                <p>• <strong>Văn hóa địa phương:</strong> Hiểu biết sâu về tập tục và truyền thống</p>
                <p>• <strong>Ngôn ngữ và thái độ:</strong> Cách nói chuyện đặc trưng của từng vùng</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}