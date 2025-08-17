"use client"

import { useState, useEffect, useCallback } from "react"

export function useGlobalSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const openSearch = useCallback(() => {
    setIsSearchOpen(true)
  }, [])

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false)
  }, [])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        openSearch()
      }
      
      // Escape key to close
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen, openSearch, closeSearch])

  return {
    isSearchOpen,
    openSearch,
    closeSearch
  }
}