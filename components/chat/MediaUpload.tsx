"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Paperclip, 
  Image, 
  Video, 
  FileText, 
  Camera,
  X,
  Upload
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MediaUploadProps {
  onMediaUpload: (mediaUrl: string, type: 'image' | 'video' | 'document', fileName?: string) => void
  className?: string
}

export function MediaUpload({ onMediaUpload, className = "" }: MediaUploadProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const documentInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File, type: 'image' | 'video' | 'document') => {
    setUploading(true)
    setIsOpen(false)

    try {
      // Create a URL for the file (in production, you'd upload to a server)
      const mediaUrl = URL.createObjectURL(file)
      
      // Simulate upload delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      onMediaUpload(mediaUrl, type, file.name)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file, 'image')
    }
  }

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file, 'video')
    }
  }

  const handleDocumentSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file, 'document')
    }
  }

  const uploadOptions = [
    {
      id: 'image',
      label: 'Hình ảnh',
      icon: Image,
      accept: 'image/*',
      color: 'text-green-600 bg-green-50 hover:bg-green-100',
      inputRef: imageInputRef,
      onChange: handleImageSelect
    },
    {
      id: 'video',
      label: 'Video',
      icon: Video,
      accept: 'video/*',
      color: 'text-blue-600 bg-blue-50 hover:bg-blue-100',
      inputRef: videoInputRef,
      onChange: handleVideoSelect
    },
    {
      id: 'document',
      label: 'Tài liệu',
      icon: FileText,
      accept: '.pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx',
      color: 'text-purple-600 bg-purple-50 hover:bg-purple-100',
      inputRef: documentInputRef,
      onChange: handleDocumentSelect
    },
    {
      id: 'camera',
      label: 'Camera',
      icon: Camera,
      accept: 'image/*',
      color: 'text-orange-600 bg-orange-50 hover:bg-orange-100',
      capture: true,
      inputRef: imageInputRef,
      onChange: handleImageSelect
    }
  ]

  if (uploading) {
    return (
      <Button variant="ghost" size="sm" disabled className="rounded-full p-2">
        <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </Button>
    )
  }

  return (
    <div className={cn("relative", className)}>
      {/* Main Upload Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full p-2 hover:bg-gray-100 transition-colors"
      >
        {isOpen ? (
          <X className="h-5 w-5 text-gray-600" />
        ) : (
          <Paperclip className="h-5 w-5 text-gray-600" />
        )}
      </Button>

      {/* Upload Options Menu */}
      {isOpen && (
        <div className="absolute bottom-12 left-0 bg-white rounded-2xl shadow-xl border border-gray-200 p-2 min-w-48 animate-in slide-in-from-bottom-2 duration-200">
          <div className="grid gap-1">
            {uploadOptions.map((option) => {
              const IconComponent = option.icon
              return (
                <div key={option.id}>
                  <input
                    ref={option.inputRef}
                    type="file"
                    accept={option.accept}
                    onChange={option.onChange}
                    className="hidden"
                    capture={option.capture ? "environment" : undefined}
                  />
                  <Button
                    variant="ghost"
                    onClick={() => option.inputRef.current?.click()}
                    className={cn(
                      "w-full justify-start gap-3 p-3 h-auto rounded-xl transition-all duration-200",
                      option.color
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-sm">{option.label}</p>
                      <p className="text-xs opacity-70">
                        {option.id === 'image' && 'PNG, JPG, GIF'}
                        {option.id === 'video' && 'MP4, MOV, AVI'}
                        {option.id === 'document' && 'PDF, DOC, XLS, PPT'}
                        {option.id === 'camera' && 'Chụp ảnh trực tiếp'}
                      </p>
                    </div>
                  </Button>
                </div>
              )
            })}
          </div>

          {/* Upload Instructions */}
          <div className="mt-2 p-2 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Upload className="h-3 w-3" />
              <span>Tối đa 25MB mỗi tệp</span>
            </div>
          </div>
        </div>
      )}

      {/* Hidden File Inputs */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        onChange={handleVideoSelect}
        className="hidden"
      />
      <input
        ref={documentInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
        onChange={handleDocumentSelect}
        className="hidden"
      />
    </div>
  )
}