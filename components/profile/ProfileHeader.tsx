"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Pen, Save, X, MapPin, Users, Star, Shield, CircleCheckBig, Clock, TrendingUp, MessageCircle, Award } from "lucide-react"

export function ProfileHeader({ user, isOwnProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    title: user.title,
    location: user.location,
  });

  const handleSave = () => {
    // In a real app, you'd call an API here.
    console.log("Saving data:", editData);
    setIsEditing(false);
    // You might want to update the parent component's state here as well.
  };

  return (
    <Card className="overflow-hidden shadow-sm">
      {/* Cover Image */}
      <div className="h-32 md:h-48 bg-cover bg-center" style={{ backgroundImage: `url(${user.coverImage})` }} />

      {/* Profile Info */}
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row">
          {/* Avatar */}
          <div className="-mt-16 md:-mt-24 flex-shrink-0">
            <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-white shadow-lg">
              <AvatarImage src={user.avatarImage} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>

          {/* Name, Title, Actions */}
          <div className="mt-4 md:mt-0 md:ml-6 flex-grow">
            {isEditing ? (
              <div className="space-y-3">
                <Input 
                  className="text-2xl font-bold" 
                  value={editData.name} 
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                />
                <Textarea 
                  value={editData.title} 
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                />
                <Input 
                  value={editData.location} 
                  onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                />
                <div className="flex gap-2">
                  <Button onClick={handleSave}><Save className="w-4 h-4 mr-2"/> Save</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}><X className="w-4 h-4 mr-2"/> Cancel</Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{editData.name}</h1>
                    {user.isVerified && <Shield className="w-6 h-6 text-emerald-500" />}
                  </div>
                  {isOwnProfile && <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}><Pen className="w-5 h-5" /></Button>}
                </div>
                <p className="text-lg text-slate-600">{editData.title}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {editData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {user.connections} kết nối
                  </span>
                  {user.isOnline && (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                      Đang hoạt động
                    </Badge>
                  )}
                </div>

                {/* Activity Summary */}
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-emerald-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-lg font-bold">5 phút</span>
                    </div>
                    <p className="text-xs text-slate-500">Phản hồi</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-blue-600">
                      <Star className="w-4 h-4" />
                      <span className="text-lg font-bold">4.9</span>
                    </div>
                    <p className="text-xs text-slate-500">Đánh giá</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-purple-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-lg font-bold">89</span>
                    </div>
                    <p className="text-xs text-slate-500">Đã giúp</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-orange-600">
                      <Award className="w-4 h-4" />
                      <span className="text-lg font-bold">4</span>
                    </div>
                    <p className="text-xs text-slate-500">Huy hiệu</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
