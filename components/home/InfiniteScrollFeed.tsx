"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { FeedPost } from "./FeedPost"
import { Button } from "@/components/ui/button"
import { Heart, RefreshCw } from "lucide-react"

interface InfiniteScrollFeedProps {
  helpers: any[]
  onHelperSelect?: (helper: any) => void
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

export function InfiniteScrollFeed({ helpers, onHelperSelect }: InfiniteScrollFeedProps) {
  const [feedItems, setFeedItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)

  const generateFeedItems = (pageNum: number) => {
    const contentVariations = [
      {
        id: `post-${pageNum}-1`,
        type: "tip",
        author: { name: "Lê Thị Hương", avatar: "/vietnamese-user.png", title: "Giáo viên Piano", verified: true },
        content: { text: "🎹 Mẹo nhỏ cho người mới học piano:\n\n✨ Luôn khởi động bằng các bài tập ngón tay\n✨ Luyện tập 30 phút/ngày hiệu quả hơn 3 tiếng cuối tuần\n✨ Chú ý tư thế ngồi và cách đặt tay", images: ["/placeholder-vnnq5.png"] },
        engagement: { likes: 234, comments: 45, shares: 12, views: 1890, bookmarks: 67 },
        timeAgo: "2 giờ trước",
        tags: ["piano", "âmnhạc", "mẹohay"]
      },
      {
        id: `story-${pageNum}-2`,
        type: "success_story",
        author: { name: "Mai Thị Lan", avatar: "/vietnamese-cleaning-lady.png", title: "Học viên tiếng Anh", verified: false },
        content: { text: "🎉 Vừa đạt 7.5 IELTS sau 3 tháng học với cô Mai qua SkillHub! Cảm ơn cô và SkillHub rất nhiều!", images: ["/placeholder-ofxfx.png"] },
        engagement: { likes: 567, comments: 123, shares: 89, views: 3456, bookmarks: 234 },
        timeAgo: "1 giờ trước",
        tags: ["IELTS", "tiếngAnh", "thànhcông"]
      },
      {
        id: `ad-${pageNum}-3`,
        type: "ad",
        author: { name: "SkillHub Premium", avatar: "/placeholder-logo.svg", title: "Nâng cấp trải nghiệm", verified: true },
        content: { text: "🌟 Nâng cấp lên SkillHub Premium để có значок VIP, ưu tiên hiển thị và nhiều hơn nữa!" },
        engagement: { likes: 12, comments: 2, shares: 1, views: 500, bookmarks: 5 },
        timeAgo: "Được tài trợ",
        adData: { sponsor: "SkillHub Premium", ctaText: "Nâng cấp ngay", ctaLink: "/premium" }
      },
    ];
    return pageNum < 5 ? [...contentVariations].sort(() => Math.random() - 0.5) : [];
  }

  const loadMoreItems = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      const newItems = generateFeedItems(page);
      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setFeedItems(prev => [...prev, ...newItems]);
        setPage(prev => prev + 1);
      }
      setIsLoading(false);
    }, 800);
  }, [page, isLoading, hasMore]);

  useEffect(() => { loadMoreItems(); }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500) {
        loadMoreItems();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreItems]);

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {feedItems.map((item) => (
        <FeedPost key={item.id} post={item} />
      ))}

      {isLoading && (
        <div className="text-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
        </div>
      )}

      {!hasMore && (
        <div className="text-center py-10">
          <Heart className="w-12 h-12 mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-semibold text-slate-700">You've reached the end!</h3>
          <p className="text-slate-500 mb-4">Follow more people to see more posts in your feed.</p>
          <Button size="sm" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Back to Top
          </Button>
        </div>
      )}
    </motion.div>
  )
}