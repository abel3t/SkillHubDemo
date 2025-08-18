"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  Award, 
  Clock, 
  Heart,
  BookOpen,
  Star,
  Crown,
  ChevronRight,
  Calendar,
  MessageCircle,
  Gift,
  Sparkles,
  TreePine,
  Home,
  Coffee
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SkillLineage {
  id: string
  skillName: string
  skillNameVi: string
  category: 'traditional_craft' | 'culinary' | 'cultural' | 'practical' | 'artistic'
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'master'
  culturalImportance: 'essential' | 'important' | 'valuable'
  generations: {
    generation: number
    masterName: string
    avatar: string
    yearsExperience: number
    studentsCount: number
    isActive: boolean
    specialties: string[]
    culturalStory?: string
  }[]
  currentlyLearning: number
  waitingList: number
  isTraditionalVietnameseSkill: boolean
}

const mockSkillLineages: SkillLineage[] = [
  {
    id: '1',
    skillName: 'Traditional Bánh Chưng Making',
    skillNameVi: 'Làm bánh chưng truyền thống',
    category: 'culinary',
    difficulty: 'advanced',
    culturalImportance: 'essential',
    generations: [
      {
        generation: 1,
        masterName: 'Bà Tuyết (84 tuổi)',
        avatar: '/vietnamese-elderly-woman.png',
        yearsExperience: 60,
        studentsCount: 23,
        isActive: true,
        specialties: ['Bánh chưng Tết cổ truyền', 'Bánh tét miền Nam', 'Lá dong tự nhiên'],
        culturalStory: 'Học từ bà ngoại ở làng Đông Hồ, giữ gìn công thức gia đình 4 đời'
      },
      {
        generation: 2,
        masterName: 'Cô Lan (52 tuổi)',
        avatar: '/vietnamese-user.png',
        yearsExperience: 35,
        studentsCount: 12,
        isActive: true,
        specialties: ['Bánh chưng đậu xanh', 'Gói lá chuối nghệ thuật']
      },
      {
        generation: 3,
        masterName: 'Chị Hương (31 tuổi)',
        avatar: '/vietnamese-user.png',
        yearsExperience: 12,
        studentsCount: 4,
        isActive: true,
        specialties: ['Bánh chưng mini hiện đại', 'Kết hợp truyền thống-hiện đại']
      }
    ],
    currentlyLearning: 8,
    waitingList: 15,
    isTraditionalVietnameseSkill: true
  },
  {
    id: '2',
    skillName: 'Traditional Lacquerware Crafting',
    skillNameVi: 'Nghề sơn mài truyền thống',
    category: 'traditional_craft',
    difficulty: 'master',
    culturalImportance: 'essential',
    generations: [
      {
        generation: 1,
        masterName: 'Thầy Minh (72 tuổi)',
        avatar: '/vietnamese-craftsman.png',
        yearsExperience: 45,
        studentsCount: 8,
        isActive: true,
        specialties: ['Sơn mài Hà Nội', 'Khảm trai truyền thống', 'Vẽ hoa văn cổ'],
        culturalStory: 'Nghệ nhân được Nhà nước phong tặng, truyền nghề từ làng Hạ Thái'
      },
      {
        generation: 2,
        masterName: 'Anh Đức (45 tuổi)',
        avatar: '/vietnamese-technician.png',
        yearsExperience: 20,
        studentsCount: 3,
        isActive: true,
        specialties: ['Sơn mài hiện đại', 'Kỹ thuật mới']
      }
    ],
    currentlyLearning: 3,
    waitingList: 12,
    isTraditionalVietnameseSkill: true
  },
  {
    id: '3',
    skillName: 'Traditional Vietnamese Tea Ceremony',
    skillNameVi: 'Nghệ thuật trà đạo Việt Nam',
    category: 'cultural',
    difficulty: 'intermediate',
    culturalImportance: 'important',
    generations: [
      {
        generation: 1,
        masterName: 'Cô Hạnh (68 tuổi)',
        avatar: '/vietnamese-elderly-woman.png',
        yearsExperience: 40,
        studentsCount: 15,
        isActive: true,
        specialties: ['Trà Thái Nguyên', 'Nghi thức trà cung đình', 'Pha trà sen'],
        culturalStory: 'Học trà đạo từ thời thực dân Pháp, giữ gìn nét văn hóa dân tộc'
      },
      {
        generation: 2,
        masterName: 'Chị Mai (43 tuổi)',
        avatar: '/vietnamese-user.png',
        yearsExperience: 18,
        studentsCount: 7,
        isActive: true,
        specialties: ['Trà hoa lài', 'Trà shan tuyết']
      }
    ],
    currentlyLearning: 5,
    waitingList: 8,
    isTraditionalVietnameseSkill: true
  },
  {
    id: '4',
    skillName: 'Traditional Medicine & Herbal Knowledge',
    skillNameVi: 'Y học cổ truyền & thuốc nam',
    category: 'practical',
    difficulty: 'master',
    culturalImportance: 'essential',
    generations: [
      {
        generation: 1,
        masterName: 'Thầy thuốc Tuấn (76 tuổi)',
        avatar: '/vietnamese-elderly-man.png',
        yearsExperience: 50,
        studentsCount: 6,
        isActive: true,
        specialties: ['Châm cứu', 'Bài thuốc gia truyền', 'Chẩn đoán mạch'],
        culturalStory: 'Dòng họ thầy thuốc 7 đời, giữ gìn bài thuốc cổ truyền miền Bắc'
      },
      {
        generation: 2,
        masterName: 'Bác sĩ Hà (48 tuổi)',
        avatar: '/vietnamese-user.png',
        yearsExperience: 22,
        studentsCount: 4,
        isActive: true,
        specialties: ['Y học hiện đại kết hợp', 'Dinh dưỡng truyền thống']
      }
    ],
    currentlyLearning: 2,
    waitingList: 18,
    isTraditionalVietnameseSkill: true
  },
  {
    id: '5',
    skillName: 'Traditional Silk Weaving',
    skillNameVi: 'Dệt lụa truyền thống',
    category: 'traditional_craft',
    difficulty: 'master',
    culturalImportance: 'essential',
    generations: [
      {
        generation: 1,
        masterName: 'Bà Hồng (78 tuổi)',
        avatar: '/vietnamese-elderly-woman.png',
        yearsExperience: 55,
        studentsCount: 12,
        isActive: true,
        specialties: ['Dệt lụa Hà Đông', 'Nhuộm tự nhiên', 'Thêu tay cổ truyền'],
        culturalStory: 'Gia đình dệt lụa 5 đời ở làng Vạn Phúc, giữ bí quyết nhuộm màu từ lá cây'
      },
      {
        generation: 2,
        masterName: 'Chị Linh (46 tuổi)',
        avatar: '/vietnamese-user.png',
        yearsExperience: 28,
        studentsCount: 8,
        isActive: true,
        specialties: ['Lụa cao cấp', 'Thiết kế hiện đại', 'Áo dài truyền thống']
      },
      {
        generation: 3,
        masterName: 'Em Như (25 tuổi)',
        avatar: '/vietnamese-user.png',
        yearsExperience: 7,
        studentsCount: 3,
        isActive: true,
        specialties: ['Lụa fusion', 'Marketing online', 'Lụa eco-friendly']
      }
    ],
    currentlyLearning: 6,
    waitingList: 22,
    isTraditionalVietnameseSkill: true
  },
  {
    id: '6',
    skillName: 'Traditional Water Puppet Making',
    skillNameVi: 'Làm múa rối nước truyền thống',
    category: 'artistic',
    difficulty: 'advanced',
    culturalImportance: 'essential',
    generations: [
      {
        generation: 1,
        masterName: 'Ông Thắng (71 tuổi)',
        avatar: '/vietnamese-elderly-man.png',
        yearsExperience: 48,
        studentsCount: 9,
        isActive: true,
        specialties: ['Rối nước Hà Nội', 'Chạm khắc rối', 'Âm nhạc dân gian'],
        culturalStory: 'Nghệ nhân Nhân dân, học từ thời còn biểu diễn ở đình làng'
      },
      {
        generation: 2,
        masterName: 'Thầy Hùng (44 tuổi)',
        avatar: '/vietnamese-technician.png',
        yearsExperience: 25,
        studentsCount: 6,
        isActive: true,
        specialties: ['Rối nước du lịch', 'Kỹ thuật biểu diễn', 'Dạy trẻ em']
      }
    ],
    currentlyLearning: 4,
    waitingList: 16,
    isTraditionalVietnameseSkill: true
  },
  {
    id: '7',
    skillName: 'Traditional Pottery & Ceramics',
    skillNameVi: 'Gốm sứ truyền thống',
    category: 'traditional_craft',
    difficulty: 'advanced',
    culturalImportance: 'essential',
    generations: [
      {
        generation: 1,
        masterName: 'Thầy Đạt (69 tuổi)',
        avatar: '/vietnamese-craftsman.png',
        yearsExperience: 44,
        studentsCount: 14,
        isActive: true,
        specialties: ['Gốm Bát Tràng', 'Men lam cổ', 'Tráng men truyền thống'],
        culturalStory: 'Gia đình làm gốm 6 đời ở Bát Tràng, bí quyết nung gốm theo mùa'
      },
      {
        generation: 2,
        masterName: 'Anh Việt (42 tuổi)',
        avatar: '/vietnamese-technician.png',
        yearsExperience: 23,
        studentsCount: 10,
        isActive: true,
        specialties: ['Gốm nghệ thuật', 'Gia công CNC', 'Xuất khẩu quốc tế']
      },
      {
        generation: 3,
        masterName: 'Chị Thu (28 tuổi)',
        avatar: '/vietnamese-user.png',
        yearsExperience: 9,
        studentsCount: 5,
        isActive: true,
        specialties: ['Gốm handmade', 'Workshop du lịch', 'Social media marketing']
      }
    ],
    currentlyLearning: 9,
    waitingList: 25,
    isTraditionalVietnameseSkill: true
  },
  {
    id: '8',
    skillName: 'Traditional Fish Sauce Making',
    skillNameVi: 'Làm nước mắm truyền thống',
    category: 'culinary',
    difficulty: 'master',
    culturalImportance: 'essential',
    generations: [
      {
        generation: 1,
        masterName: 'Ông Ba (74 tuổi)',
        avatar: '/vietnamese-elderly-man.png',
        yearsExperience: 52,
        studentsCount: 7,
        isActive: true,
        specialties: ['Nước mắm Phú Quốc', 'Ủ cá cơm 3 năm', 'Kiểm định chất lượng'],
        culturalStory: 'Gia đình làm nước mắm từ đời ông cố ở Phú Quốc, bí quyết ủ theo thủy triều'
      },
      {
        generation: 2,
        masterName: 'Chú Tám (49 tuổi)',
        avatar: '/vietnamese-technician.png',
        yearsExperience: 31,
        studentsCount: 5,
        isActive: true,
        specialties: ['Nước mắm công nghiệp', 'Kiểm soát chất lượng', 'Đóng chai xuất khẩu']
      }
    ],
    currentlyLearning: 2,
    waitingList: 14,
    isTraditionalVietnameseSkill: true
  },
  {
    id: '9',
    skillName: 'Traditional Vietnamese Massage',
    skillNameVi: 'Massage truyền thống Việt Nam',
    category: 'practical',
    difficulty: 'intermediate',
    culturalImportance: 'important',
    generations: [
      {
        generation: 1,
        masterName: 'Bà Xuân (67 tuổi)',
        avatar: '/vietnamese-elderly-woman.png',
        yearsExperience: 42,
        studentsCount: 18,
        isActive: true,
        specialties: ['Bấm huyệt truyền thống', 'Massage bà bầu', 'Trị liệu đau lưng'],
        culturalStory: 'Học nghề từ bà nội, chuyên trị đau nhức cho nông dân sau mùa gặt'
      },
      {
        generation: 2,
        masterName: 'Chị Lan (41 tuổi)',
        avatar: '/vietnamese-user.png',
        yearsExperience: 19,
        studentsCount: 12,
        isActive: true,
        specialties: ['Massage thư giãn', 'Bấm huyệt hiện đại', 'Spa truyền thống']
      }
    ],
    currentlyLearning: 11,
    waitingList: 19,
    isTraditionalVietnameseSkill: true
  },
  {
    id: '10',
    skillName: 'Traditional Conical Hat Making',
    skillNameVi: 'Làm nón lá truyền thống',
    category: 'traditional_craft',
    difficulty: 'intermediate',
    culturalImportance: 'important',
    generations: [
      {
        generation: 1,
        masterName: 'Bà Tám (73 tuổi)',
        avatar: '/vietnamese-elderly-woman.png',
        yearsExperience: 49,
        studentsCount: 16,
        isActive: true,
        specialties: ['Nón lá Huế', 'Nón bài thơ', 'Khâu viền truyền thống'],
        culturalStory: 'Gia đình làm nón lá từ thời vua Minh Mạng, giữ kỹ thuật khâu viền độc đáo'
      },
      {
        generation: 2,
        masterName: 'Cô Hường (48 tuổi)',
        avatar: '/vietnamese-user.png',
        yearsExperience: 26,
        studentsCount: 11,
        isActive: true,
        specialties: ['Nón lá du lịch', 'Nón lá nghệ thuật', 'Dạy workshop']
      },
      {
        generation: 3,
        masterName: 'Chị Trang (29 tuổi)',
        avatar: '/vietnamese-user.png',
        yearsExperience: 8,
        studentsCount: 6,
        isActive: true,
        specialties: ['Nón lá fashion', 'Thiết kế hiện đại', 'Xuất khẩu international']
      }
    ],
    currentlyLearning: 13,
    waitingList: 21,
    isTraditionalVietnameseSkill: true
  }
]

const categoryConfig = {
  traditional_craft: { icon: Award, color: 'bg-purple-100 text-purple-700', label: 'Thủ công truyền thống' },
  culinary: { icon: Coffee, color: 'bg-orange-100 text-orange-700', label: 'Ẩm thực' },
  cultural: { icon: Heart, color: 'bg-pink-100 text-pink-700', label: 'Văn hóa' },
  practical: { icon: BookOpen, color: 'bg-emerald-100 text-emerald-700', label: 'Thực hành' },
  artistic: { icon: Sparkles, color: 'bg-blue-100 text-blue-700', label: 'Nghệ thuật' }
}

const importanceConfig = {
  essential: { color: 'bg-red-100 text-red-700', label: 'Thiết yếu' },
  important: { color: 'bg-yellow-100 text-yellow-700', label: 'Quan trọng' },
  valuable: { color: 'bg-green-100 text-green-700', label: 'Có giá trị' }
}

interface GenerationalSkillTransferProps {
  className?: string
}

export function GenerationalSkillTransfer({ className = "" }: GenerationalSkillTransferProps) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'overview' | 'lineage' | 'learning'>('overview')

  const handleJoinWaitingList = (skillId: string) => {
    console.log(`Joining waiting list for skill ${skillId}`)
  }

  const handleContactMaster = (skillId: string, generation: number) => {
    console.log(`Contacting master for skill ${skillId}, generation ${generation}`)
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TreePine className="w-5 h-5 text-emerald-600" />
          Truyền nghề qua các thế hệ
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-red-100 text-red-700">
            <Heart className="w-3 h-3 mr-1" />
            Văn hóa Việt Nam
          </Badge>
          <Badge variant="outline" className="text-xs">
            Không thể sao chép bởi công nghệ
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
            variant={viewMode === 'lineage' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('lineage')}
          >
            Dòng dõi nghề
          </Button>
          <Button
            variant={viewMode === 'learning' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('learning')}
          >
            Học nghề
          </Button>
        </div>

        {viewMode === 'overview' && (
          <div className="space-y-4">
            {/* Cultural Context */}
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-semibold text-emerald-800 mb-2 flex items-center gap-2">
                <Home className="w-4 h-4" />
                Giá trị truyền thống Việt Nam
              </h4>
              <p className="text-sm text-emerald-700 mb-3">
                Trong văn hóa Việt Nam, việc truyền nghề từ thế hệ này sang thế hệ khác không chỉ là việc dạy kỹ năng, 
                mà còn là sự truyền đạt giá trị, đạo đức và tình yêu với nghề nghiệp.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Crown className="w-3 h-3" />
                  <span>Tôn kính bậc thầy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-3 h-3" />
                  <span>Trách nhiệm truyền đạt</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3 h-3" />
                  <span>Mối quan hệ gia đình</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="w-3 h-3" />
                  <span>Bảo tồn văn hóa</span>
                </div>
              </div>
            </div>

            {/* Skills Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockSkillLineages.map((skill) => {
                const categoryConf = categoryConfig[skill.category]
                const importanceConf = importanceConfig[skill.culturalImportance]
                const CategoryIcon = categoryConf.icon
                const oldestMaster = skill.generations[0]
                
                return (
                  <Card key={skill.id} className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => {
                          setSelectedSkill(skill.id)
                          setViewMode('lineage')
                        }}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", categoryConf.color)}>
                          <CategoryIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm">{skill.skillNameVi}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className={cn("text-xs", importanceConf.color)}>
                              {importanceConf.label}
                            </Badge>
                            {skill.isTraditionalVietnameseSkill && (
                              <Badge variant="secondary" className="text-xs bg-red-50 text-red-600">
                                Truyền thống
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={oldestMaster.avatar} alt={oldestMaster.masterName} />
                          <AvatarFallback>{oldestMaster.masterName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-900">{oldestMaster.masterName}</p>
                          <p className="text-xs text-gray-500">{oldestMaster.yearsExperience} năm kinh nghiệm</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Dòng dõi: {skill.generations.length} thế hệ</span>
                          <span>Đang học: {skill.currentlyLearning}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="text-xs flex-1">
                            Xem dòng dõi
                          </Button>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {viewMode === 'lineage' && selectedSkill && (
          <div className="space-y-4">
            {(() => {
              const skill = mockSkillLineages.find(s => s.id === selectedSkill)
              if (!skill) return null

              return (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <Button variant="ghost" size="sm" onClick={() => setViewMode('overview')}>
                      ← Quay lại
                    </Button>
                    <h3 className="font-semibold text-lg">{skill.skillNameVi}</h3>
                  </div>

                  {/* Generational Tree */}
                  <div className="space-y-4">
                    {skill.generations.map((generation, index) => (
                      <div key={generation.generation} className="relative">
                        {index < skill.generations.length - 1 && (
                          <div className="absolute left-6 top-16 w-0.5 h-8 bg-emerald-300"></div>
                        )}
                        
                        <Card className="border-l-4 border-l-emerald-500">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="relative">
                                <Avatar className="w-12 h-12">
                                  <AvatarImage src={generation.avatar} alt={generation.masterName} />
                                  <AvatarFallback>{generation.masterName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                  {generation.generation}
                                </div>
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-semibold text-gray-900">{generation.masterName}</h4>
                                  {generation.generation === 1 && (
                                    <Badge className="bg-yellow-100 text-yellow-700">
                                      <Crown className="w-3 h-3 mr-1" />
                                      Thế hệ đầu
                                    </Badge>
                                  )}
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{generation.yearsExperience} năm kinh nghiệm</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    <span>{generation.studentsCount} học trò</span>
                                  </div>
                                </div>

                                {generation.culturalStory && (
                                  <div className="p-3 bg-yellow-50 rounded border border-yellow-200 mb-3">
                                    <p className="text-sm text-yellow-800 italic">
                                      "{generation.culturalStory}"
                                    </p>
                                  </div>
                                )}

                                <div className="flex flex-wrap gap-2 mb-3">
                                  {generation.specialties.map((specialty, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {specialty}
                                    </Badge>
                                  ))}
                                </div>

                                <div className="flex gap-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleContactMaster(skill.id, generation.generation)}
                                  >
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Liên hệ
                                  </Button>
                                  {generation.isActive && (
                                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                                      Đang nhận học trò
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

                  {/* Join Learning */}
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Tham gia học nghề</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Hiện có {skill.currentlyLearning} người đang học và {skill.waitingList} người trong danh sách chờ.
                    </p>
                    <Button 
                      onClick={() => handleJoinWaitingList(skill.id)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Tham gia danh sách chờ
                    </Button>
                  </div>
                </>
              )
            })()}
          </div>
        )}

        {viewMode === 'learning' && (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-semibold text-emerald-800 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Triết lý học nghề Việt Nam
              </h4>
              <div className="text-sm text-emerald-700 space-y-2">
                <p><strong>Thái độ học trò:</strong> Kính trọng thầy, chăm chỉ luyện tập, kiên nhẫn</p>
                <p><strong>Quá trình học:</strong> Từ việc nhỏ đến việc lớn, từ đơn giản đến phức tạp</p>
                <p><strong>Mối quan hệ:</strong> Như cha con, thầy trò suốt đời</p>
                <p><strong>Trách nhiệm:</strong> Sau khi thành thạo phải truyền lại cho thế hệ sau</p>
              </div>
            </div>

            {/* Learning Opportunities */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Cơ hội học nghề hiện tại</h4>
              {mockSkillLineages.filter(skill => skill.currentlyLearning < skill.generations[skill.generations.length-1].studentsCount * 2).map(skill => {
                const activeMaster = skill.generations.find(g => g.isActive) || skill.generations[0]
                return (
                  <Card key={skill.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={activeMaster.avatar} alt={activeMaster.masterName} />
                            <AvatarFallback>{activeMaster.masterName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h5 className="font-medium">{skill.skillNameVi}</h5>
                            <p className="text-sm text-gray-600">Thầy {activeMaster.masterName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Còn {Math.max(0, activeMaster.studentsCount * 2 - skill.currentlyLearning)} chỗ</p>
                          <Button size="sm" className="mt-1">
                            Đăng ký học
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Anti-BigTech Message */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <TreePine className="w-4 h-4" />
            Tại sao BigTech không thể sao chép?
          </h4>
          <p className="text-sm text-gray-700">
            Mối quan hệ thầy-trò trong văn hóa Việt Nam được xây dựng qua thời gian, niềm tin, và sự tôn kính. 
            Đây không phải là dữ liệu có thể thu thập hay thuật toán có thể mô phỏng - 
            mà là mối liên kết con người thực sự, dựa trên giá trị văn hóa sâu sắc.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}