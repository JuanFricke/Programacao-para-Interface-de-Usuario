"use client"
import Link from "next/link";
import Image from "next/image";
import "./style.css";
 
export default function MenuLateral() {
    return (
        <div className="menu-lateral">
            <div className="nav-item conta-user">
                <Link href='/conta'>
                    <Image src="/user.png" className="icon-nav icon-user" alt="Perfil" width={20} height={20} />
                </Link>
            </div>
            <div className="nav-item">
                <Link href='/' className="link-nav">
                    <Image src="/home.png" alt="Início" className="icon-nav" width={20} height={20} />
                </Link>
                <Link href='/projeto' className="link-nav">
                    <Image src="/projetos.png" alt="Projetos" className="icon-nav" width={20} height={20} />
                </Link>
            </div>
        </div>
    );
}
