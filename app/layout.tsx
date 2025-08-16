import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { MiniChatManager } from "@/components/chat/MiniChatManager"
import "./globals.css"

export const metadata: Metadata = {
  title: "SkillHub - Mạng xã hội tài năng Việt Nam",
  description: "Kết nối khách hàng với các nhà cung cấp dịch vụ chuyên nghiệp tại Việt Nam",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="font-body antialiased">
        {children}
        <MiniChatManager currentUserId="user123" />
      </body>
    </html>
  )
}
