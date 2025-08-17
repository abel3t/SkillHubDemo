"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ProfileHeader } from "@/components/profile/ProfileHeader"
import { VibrantCard, VibrantCardHeader, VibrantCardContent } from "@/components/ui/VibrantCard"
import { Navigation } from "@/components/shared/Navigation"
import { 
    Pencil, Clock, CheckCircle, Users, ShieldCheck, Star, Briefcase, GraduationCap, 
    Sparkles, Heart, MessageCircle, Share2, TrendingUp, Award, Activity
} from "lucide-react"

// MOCK DATA
const userData = { name: "Lê Thị Hương", title: "Giáo viên Piano & Âm nhạc cao cấp", location: "Quận 3, TP.HCM", connections: 488, isVerified: true, coverImage: "/vietnamese-workshop.png", avatarImage: "/vietnamese-user.png", isOnline: true };
const trustData = { responseTime: "5 phút", completionRate: 98, neighborEndorsements: 23, verifications: ["Số điện thoại", "CMND/CCCD", "Chứng chỉ chuyên môn"] };
const aboutData = "Với hơn 10 năm kinh nghiệm giảng dạy piano cho mọi lứa tuổi, tôi đam mê truyền cảm hứng và giúp học viên phát triển tài năng âm nhạc. Phương pháp của tôi tập trung vào việc xây dựng nền tảng vững chắc và khơi dậy tình yêu với âm nhạc.";
const experienceData = [{ id: 1, title: "Giáo viên Piano Tự do", company: "SkillHub", dates: "2021 - Hiện tại", description: "Cung cấp các khóa học piano cá nhân hóa."}, { id: 2, title: "Giáo viên Âm nhạc", company: "Trung tâm Âm nhạc Harmony", dates: "2018 - 2021", description: "Giảng dạy piano và lý thuyết âm nhạc." }];
const educationData = [{ id: 1, school: "Nhạc viện TP.HCM", degree: "Cử nhân Sư phạm Âm nhạc", dates: "2014 - 2018" }];
const skillsData = [{ id: "1", name: "Piano Cổ điển", endorsements: 18 }, { id: "2", name: "Lý thuyết Âm nhạc", endorsements: 12 }, { id: "3", name: "Sáng tác Nhạc", endorsements: 7 }];

// User Posts Data
const userPostsData = [
  {
    id: 1,
    content: "Chia sẻ một số mẹo luyện ngón tay linh hoạt cho người mới bắt đầu học piano. Hãy bắt đầu với các bài tập đơn giản và kiên trì mỗi ngày nhé! 🎹",
    timestamp: "2 giờ trước",
    likes: 24,
    comments: 8,
    type: "text",
    hasImage: false,
    image: null
  },
  {
    id: 2,
    content: "Hôm nay đã có buổi học piano rất thú vị với em học sinh 8 tuổi. Việc dạy trẻ em luôn mang lại niềm vui và năng lượng tích cực! 🎵",
    timestamp: "1 ngày trước",
    likes: 42,
    comments: 15,
    type: "text_image",
    hasImage: true,
    image: "/vietnamese-workshop.png"
  },
  {
    id: 3,
    content: "Mình vừa hoàn thành khóa học nâng cao về phương pháp giảng dạy piano hiện đại. Rất háo hức được áp dụng những kiến thức mới này vào việc giảng dạy! 📚",
    timestamp: "3 ngày trước",
    likes: 18,
    comments: 6,
    type: "text",
    hasImage: false,
    image: null
  }
];

// Community Contributions Data
const contributionsData = {
  totalContributions: 127,
  helpedPeople: 89,
  postsShared: 45,
  answersGiven: 32,
  badges: [
    { id: 1, name: "Mentor Xuất sắc", description: "Đã giúp đỡ hơn 50 người", icon: "🏆", color: "bg-yellow-100 text-yellow-800" },
    { id: 2, name: "Chia sẻ tích cực", description: "Đã đăng hơn 40 bài viết hữu ích", icon: "📝", color: "bg-blue-100 text-blue-800" },
    { id: 3, name: "Phản hồi nhanh", description: "Luôn phản hồi trong vòng 5 phút", icon: "⚡", color: "bg-green-100 text-green-800" },
    { id: 4, name: "Được tin tưởng", description: "Có 20+ lời chứng thực từ hàng xóm", icon: "🤝", color: "bg-purple-100 text-purple-800" }
  ],
  recentActivities: [
    { type: "helped", description: "Đã giúp Nguyễn Văn A học piano cơ bản", time: "2 giờ trước" },
    { type: "posted", description: "Chia sẻ mẹo luyện ngón tay linh hoạt", time: "2 giờ trước" },
    { type: "answered", description: "Trả lời câu hỏi về lý thuyết âm nhạc", time: "1 ngày trước" },
    { type: "endorsed", description: "Nhận chứng thực từ Trần Thị B", time: "2 ngày trước" }
  ]
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// Reusable Section Component using VibrantCard
const Section = ({ icon, title, onEdit, children }) => (
    <VibrantCard as={motion.div} variants={containerVariants}>
        <VibrantCardHeader>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-emerald-50 to-green-100">
                    {icon}
                </div>
                <h2 className="text-xl font-bold text-slate-800">{title}</h2>
            </div>
            {onEdit && <Button variant="ghost" size="icon" onClick={onEdit}><Pencil className="w-4 h-4 text-slate-500" /></Button>}
        </VibrantCardHeader>
        <VibrantCardContent>
            {children}
        </VibrantCardContent>
    </VibrantCard>
);

// Individual Sections rebuilt with the new style

const TrustAndReliabilitySection = ({ data }) => (
    <Section icon={<Sparkles className="w-6 h-6 text-emerald-600" />} title="Trust & Reliability">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
             {[ { icon: Clock, label: "Response Time", value: data.responseTime, color: "emerald" }, { icon: CheckCircle, label: "Job Completion", value: `${data.completionRate}%`, color: "blue" }, { icon: Users, label: "Neighbor Endorsements", value: data.neighborEndorsements, color: "purple" } ].map(stat => (
                <div key={stat.label} className="text-center">
                    <div className={`flex items-center justify-center gap-2 text-${stat.color}-600`}>
                        <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span className="text-xl sm:text-2xl font-bold">{stat.value}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">{stat.label}</p>
                </div>
            ))}
        </div>
        <div className="flex flex-wrap gap-1 sm:gap-2">
            {data.verifications.map(v => <Badge key={v} className="bg-green-100 text-green-800 border border-green-200/80 text-xs sm:text-sm py-1 px-2 sm:px-3 shadow-sm"><ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"/>{v}</Badge>)}
        </div>
    </Section>
);

const AboutSection = ({ about }) => (
    <Section icon={<Briefcase className="w-6 h-6 text-emerald-600" />} title="About" onEdit={() => {}}>
        <p className="text-slate-700 text-base leading-relaxed whitespace-pre-line">{about}</p>
    </Section>
);

const ExperienceSection = ({ experiences }) => (
    <Section icon={<Briefcase className="w-6 h-6 text-emerald-600" />} title="Experience" onEdit={() => {}}>
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-slate-200">
            {experiences.map((exp) => (
                <div key={exp.id} className="relative flex gap-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md z-10">
                        <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-slate-800">{exp.title}</h3>
                        <p className="font-semibold text-md text-slate-600">{exp.company}</p>
                        <p className="text-sm text-slate-400 mb-2">{exp.dates}</p>
                        <p className="text-slate-700">{exp.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </Section>
);

const EducationSection = ({ educations }) => (
    <Section icon={<GraduationCap className="w-6 h-6 text-emerald-600" />} title="Education" onEdit={() => {}}>
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-slate-200">
            {educations.map((edu) => (
                <div key={edu.id} className="relative flex gap-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white shadow-md z-10">
                        <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-slate-800">{edu.school}</h3>
                        <p className="font-semibold text-md text-slate-600">{edu.degree}</p>
                        <p className="text-sm text-slate-400">{edu.dates}</p>
                    </div>
                </div>
            ))}
        </div>
    </Section>
);

const SkillsSection = ({ skills }) => (
    <Section icon={<Star className="w-6 h-6 text-emerald-600" />} title="Skills" onEdit={() => {}}>
        <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
                <div key={skill.id} className="bg-slate-100 border border-slate-200 rounded-lg px-4 py-2">
                    <h3 className="font-semibold text-slate-800">{skill.name}</h3>
                    <p className="text-sm text-emerald-600 font-medium">{skill.endorsements} endorsements</p>
                </div>
            ))}
        </div>
    </Section>
);

// User Posts Section
const UserPostsSection = ({ posts }) => {
  const [likedPosts, setLikedPosts] = useState(new Set());

  const handleLike = (postId) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  return (
    <Section icon={<MessageCircle className="w-6 h-6 text-emerald-600" />} title={`Bài viết (${posts.length})`}>
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="border border-slate-200 rounded-xl p-4 bg-white">
            {/* Post Header */}
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/vietnamese-user.png" alt="Lê Thị Hương" />
                <AvatarFallback>H</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800">Lê Thị Hương</h4>
                <p className="text-sm text-slate-500">{post.timestamp}</p>
              </div>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <p className="text-slate-700 leading-relaxed">{post.content}</p>
              {post.hasImage && post.image && (
                <div className="mt-3">
                  <img 
                    src={post.image} 
                    alt="Shared content from user post" 
                    className="w-full rounded-lg shadow-sm max-h-64 object-cover"
                  />
                </div>
              )}
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div className="flex items-center gap-6">
                <button 
                  type="button"
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                    likedPosts.has(post.id) 
                      ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                  <span className="text-sm font-medium">
                    {likedPosts.has(post.id) ? post.likes + 1 : post.likes}
                  </span>
                </button>
                <button type="button" className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>
                <button type="button" className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Chia sẻ</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

// Community Contributions Section
const CommunityContributionsSection = ({ contributions }) => (
  <Section icon={<Award className="w-6 h-6 text-emerald-600" />} title="Đóng góp cộng đồng">
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Tổng đóng góp", value: contributions.totalContributions, icon: TrendingUp, color: "emerald" },
          { label: "Người đã giúp", value: contributions.helpedPeople, icon: Users, color: "blue" },
          { label: "Bài viết chia sẻ", value: contributions.postsShared, icon: MessageCircle, color: "purple" },
          { label: "Câu trả lời", value: contributions.answersGiven, icon: CheckCircle, color: "orange" }
        ].map((stat) => (
          <div key={stat.label} className="text-center p-4 bg-slate-50 rounded-xl">
            <div className={`flex items-center justify-center gap-2 text-${stat.color}-600`}>
              <stat.icon className="w-5 h-5" />
              <span className="text-2xl font-bold">{stat.value}</span>
            </div>
            <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Achievement Badges */}
      <div>
        <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-600" />
          Huy hiệu thành tích
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {contributions.badges.map((badge) => (
            <div key={badge.id} className={`${badge.color} rounded-xl p-4 border border-opacity-20`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <h4 className="font-semibold">{badge.name}</h4>
                  <p className="text-sm opacity-80">{badge.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div>
        <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-600" />
          Hoạt động gần đây
        </h3>
        <div className="space-y-3">
          {contributions.recentActivities.map((activity, index) => (
            <div key={`${activity.type}-${index}`} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'helped' ? 'bg-green-500' :
                activity.type === 'posted' ? 'bg-blue-500' :
                activity.type === 'answered' ? 'bg-purple-500' :
                'bg-orange-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm text-slate-700">{activity.description}</p>
                <p className="text-xs text-slate-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navigation />
      
      {/* Clean Single-Column Layout */}
      <main className="max-w-4xl mx-auto px-2 sm:px-4 py-4">
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Section */}
          <motion.div variants={containerVariants}>
            <ProfileHeader user={userData} isOwnProfile={true} />
          </motion.div>

          {/* Trust & Quick Stats - Right after header */}
          <motion.div variants={containerVariants}>
            <TrustAndReliabilitySection data={trustData} />
          </motion.div>

          {/* About Section */}
          <motion.div variants={containerVariants}>
            <AboutSection about={aboutData} />
          </motion.div>

          {/* Skills */}
          <motion.div variants={containerVariants}>
            <SkillsSection skills={skillsData} />
          </motion.div>

          {/* User Posts */}
          <motion.div variants={containerVariants}>
            <UserPostsSection posts={userPostsData} />
          </motion.div>

          {/* Community Contributions */}
          <motion.div variants={containerVariants}>
            <CommunityContributionsSection contributions={contributionsData} />
          </motion.div>

          {/* Experience & Education Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div variants={containerVariants}>
              <ExperienceSection experiences={experienceData} />
            </motion.div>
            <motion.div variants={containerVariants}>
              <EducationSection educations={educationData} />
            </motion.div>
          </div>

        </motion.div>
      </main>
    </div>
  )
}
