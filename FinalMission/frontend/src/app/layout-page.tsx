"use client";

import React, { Suspense, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { isAuthenticated } from '@/utilsauth';
import { MenuLateral } from "@/components/menuLateral";
import Image from 'next/image';

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
      <Suspense fallback={<>
        <div className="pagina-erro">
            <Image   src="/logo.png" alt="Falha ao encontrar a página" className="img-error-page" width={500} height={500} />
            <p className="mensagem-erro">
              Carregando...
            </p>
          </div>
        </>}>
        <MenuLateral />
        <main className='container-pages'>
          {children}
        </main>
      </Suspense>
    </div>
  );
}