"use client";

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { isAuthenticated } from '@/utilsauth';
import { MenuLateral } from "@/components/menuLateral";

interface HomeProps {
  children: React.ReactNode;
}

export const Home: React.FC<HomeProps> = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    } else {
      if (pathname.startsWith('/')) {
        router.push("/painel");
      }
    }
    return;
  }, [router]);
  
  return (
    <div className="container-principal">
      <MenuLateral />
      <main className='container-pages'>
        {children}
      </main>
    </div>
  );
}