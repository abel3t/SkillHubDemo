"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { VibrantCard, VibrantCardHeader, VibrantCardContent } from "@/components/ui/VibrantCard"
import { 
  Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Play, ExternalLink 
} from "lucide-react"

// Re-defining props for clarity, assuming this is the structure
interface FeedPostProps {
  post: any; // Using any for brevity, but this should be a strong type
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

export function FeedPost({ post }: FeedPostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  const isLongText = post.content.text.length > 200;

  const getPostTypeLabel = () => {
    switch (post.type) {
      case "tip": return "💡 Mẹo hay";
      case "success_story": return "✅ Câu chuyện thành công";
      case "ad": return "📢 Được tài trợ";
      default: return "";
    }
  };

  return (
    <VibrantCard as={motion.div} variants={cardVariants} className="w-full">
      <VibrantCardHeader>
        <div className="flex items-center gap-3 flex-grow">
          <Avatar className="w-11 h-11 border-2 border-white">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800">{post.author.name}</h3>
            <p className="text-xs text-slate-500">{post.author.title} • {post.timeAgo}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-slate-500"><MoreHorizontal className="w-5 h-5" /></Button>
      </VibrantCardHeader>

      <VibrantCardContent className="pt-4">
        <div className="mb-4">
            <p className="text-slate-700 whitespace-pre-line">
                {isLongText && !showFullText ? `${post.content.text.slice(0, 200)}...` : post.content.text}
            </p>
            {isLongText && (
                <Button variant="link" onClick={() => setShowFullText(!showFullText)} className="p-0 h-auto text-emerald-600">
                    {showFullText ? "Thu gọn" : "Xem thêm"}
                </Button>
            )}
        </div>

        {post.content.images && post.content.images[0] && (
            <div className="mb-4 rounded-lg overflow-hidden shadow-inner border border-slate-200/80">
                <img src={post.content.images[0]} alt="Post content" className="w-full h-auto object-cover" />
            </div>
        )}

        {post.tags && (
            <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => <Badge key={tag} variant="secondary" className="bg-emerald-50 text-emerald-700">#{tag}</Badge>)}
            </div>
        )}

        {post.type === "ad" && post.adData && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-4">
                <div className="flex-grow">
                    <p className="text-xs font-semibold text-amber-800">Tài trợ bởi {post.adData.sponsor}</p>
                    <p className="text-sm text-slate-600">{post.adData.ctaText}</p>
                </div>
                <Button asChild variant="outline" size="sm"><a href={post.adData.ctaLink} target="_blank"><ExternalLink className="w-4 h-4 mr-2"/> Truy cập</a></Button>
            </div>
        )}

      </VibrantCardContent>
      
      <div className="border-t border-slate-200/80 px-6 py-2">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" onClick={() => setIsLiked(!isLiked)} className={`flex items-center gap-1.5 ${isLiked ? 'text-red-500' : 'text-slate-600'} hover:text-red-500`}>
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    <span className="font-medium">{post.engagement.likes + (isLiked ? 1 : 0)}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-slate-600 hover:text-emerald-600">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">{post.engagement.comments}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600">
                    <Share2 className="w-5 h-5" />
                    <span className="font-medium">{post.engagement.shares}</span>
                </Button>
            </div>
            <Button variant="ghost" size="icon" className="text-slate-600 hover:text-emerald-600">
                <Bookmark className="w-5 h-5" />
            </Button>
        </div>
      </div>
    </VibrantCard>
  )
}
