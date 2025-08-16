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
import { 
    Pencil, Clock, CheckCircle, Users, ShieldCheck, Star, Briefcase, GraduationCap, 
    BarChart2, Eye, MessageSquare, Search, ThumbsUp, Award, Sparkles
} from "lucide-react"

// MOCK DATA
const userData = { name: "Lê Thị Hương", title: "Giáo viên Piano & Âm nhạc cao cấp", location: "Quận 3, TP.HCM", connections: 488, isVerified: true, coverImage: "/vietnamese-workshop.png", avatarImage: "/vietnamese-user.png", isOnline: true };
const analyticsData = { profileViews: 245, postImpressions: 1204, searchAppearances: 98 };
const trustData = { responseTime: "5 phút", completionRate: 98, neighborEndorsements: 23, verifications: ["Số điện thoại", "CMND/CCCD", "Chứng chỉ chuyên môn"] };
const aboutData = "Với hơn 10 năm kinh nghiệm giảng dạy piano cho mọi lứa tuổi, tôi đam mê truyền cảm hứng và giúp học viên phát triển tài năng âm nhạc. Phương pháp của tôi tập trung vào việc xây dựng nền tảng vững chắc và khơi dậy tình yêu với âm nhạc.";
const experienceData = [{ id: 1, title: "Giáo viên Piano Tự do", company: "SkillHub", dates: "2021 - Hiện tại", description: "Cung cấp các khóa học piano cá nhân hóa."}, { id: 2, title: "Giáo viên Âm nhạc", company: "Trung tâm Âm nhạc Harmony", dates: "2018 - 2021", description: "Giảng dạy piano và lý thuyết âm nhạc." }];
const educationData = [{ id: 1, school: "Nhạc viện TP.HCM", degree: "Cử nhân Sư phạm Âm nhạc", dates: "2014 - 2018" }];
const skillsData = [{ id: "1", name: "Piano Cổ điển", endorsements: 18 }, { id: "2", name: "Lý thuyết Âm nhạc", endorsements: 12 }, { id: "3", name: "Sáng tác Nhạc", endorsements: 7 }];

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
const AnalyticsSection = ({ data }) => (
    <Section icon={<BarChart2 className="w-6 h-6 text-emerald-600" />} title="Private Analytics">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[ { icon: Eye, label: "Profile Views", value: data.profileViews, color: "blue" }, { icon: MessageSquare, label: "Post Impressions", value: data.postImpressions, color: "purple" }, { icon: Search, label: "Search Appearances", value: data.searchAppearances, color: "amber" } ].map(stat => (
                <div key={stat.label} className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 p-4 rounded-xl text-center shadow-inner border border-${stat.color}-200/50`}>
                    <stat.icon className={`w-8 h-8 mx-auto mb-2 text-${stat.color}-600`} />
                    <p className={`text-3xl font-bold text-${stat.color}-800`}>{stat.value}</p>
                    <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
                </div>
            ))}
        </div>
    </Section>
);

const TrustAndReliabilitySection = ({ data }) => (
    <Section icon={<Sparkles className="w-6 h-6 text-emerald-600" />} title="Trust & Reliability">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
             {[ { icon: Clock, label: "Response Time", value: data.responseTime, color: "emerald" }, { icon: CheckCircle, label: "Job Completion", value: `${data.completionRate}%`, color: "blue" }, { icon: Users, label: "Neighbor Endorsements", value: data.neighborEndorsements, color: "purple" } ].map(stat => (
                <div key={stat.label} className="text-center">
                    <div className={`flex items-center justify-center gap-2 text-${stat.color}-600`}>
                        <stat.icon className="w-6 h-6" />
                        <span className="text-2xl font-bold">{stat.value}</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                </div>
            ))}
        </div>
        <div className="flex flex-wrap gap-2">
            {data.verifications.map(v => <Badge key={v} className="bg-green-100 text-green-800 border border-green-200/80 text-sm py-1 px-3 shadow-sm"><ShieldCheck className="w-4 h-4 mr-2"/>{v}</Badge>)}
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

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <main className="max-w-4xl mx-auto p-4">
        <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
          <ProfileHeader user={userData} isOwnProfile={true} />
          <AnalyticsSection data={analyticsData} />
          <TrustAndReliabilitySection data={trustData} />
          <AboutSection about={aboutData} />
          <ExperienceSection experiences={experienceData} />
          <EducationSection educations={educationData} />
          <SkillsSection skills={skillsData} />
        </motion.div>
      </main>
    </div>
  )
}
