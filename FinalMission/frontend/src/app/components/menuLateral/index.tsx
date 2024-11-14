"use client"
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation'
import "./style.css";
 
export function MenuLateral() {
    const pathname = usePathname();

    return (
        <div className="menu-lateral">
            <div className="nav-item conta-user">
                <Link href='/conta' className={pathname === '/perfil' ? 'link-ativo' : ''}>
                    <Image src="/user.png" className="icon-nav icon-user" alt="Perfil" width={20} height={20} />
                </Link>
            </div>
            <div className="nav-item">
                <Link href='/painel' className={`${pathname === '/painel' ? 'link-ativo' : ''} link-nav`}>
                    <Image src="/home.png" alt="Início" className="icon-nav" width={20} height={20} />
                </Link>
                <Link href='/projeto' className={`${pathname === '/projeto' ? 'link-ativo' : ''} link-nav`}>
                    <Image src="/projetos.png" alt="Projetos" className="icon-nav" width={20} height={20} />
                </Link>
            </div>
        </div>
    );
}
