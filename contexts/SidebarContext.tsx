'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 初回マウント時にlocalStorageから状態を読み込み
  useEffect(() => {
    setMounted(true);
    
    // デバイスサイズに応じたデフォルト値を設定
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    const defaultOpen = isDesktop; // PCはtrue、モバイルはfalse
    
    try {
      const saved = localStorage.getItem('sidebar-open-pc');
      if (saved !== null && isDesktop) {
        // PCビューの場合のみlocalStorageの値を使用
        setIsOpen(JSON.parse(saved));
      } else {
        setIsOpen(defaultOpen);
      }
    } catch (error) {
      console.error('Failed to load sidebar state:', error);
      setIsOpen(defaultOpen);
    }
  }, []);

  // 状態変更時にlocalStorageに保存（PCビューの場合のみ）
  useEffect(() => {
    if (mounted && window.matchMedia('(min-width: 768px)').matches) {
      try {
        localStorage.setItem('sidebar-open-pc', JSON.stringify(isOpen));
      } catch (error) {
        console.error('Failed to save sidebar state:', error);
      }
    }
  }, [isOpen, mounted]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
