import Link from "next/link";
import Image from "next/image";
import "./style.css";

export default function MenuLateral() {
  return (
    <div className="menu-lateral">
        <div className="conta-user">
            <Link href='/'>
                <Image src="/user.png" className="icon-nav" alt="Perfil" width={20} height={20} />
            </Link>
        </div>
        <div className="nav-item">
            <Link href='/' className="link-nav">
                <Image src="/home.png" alt="Início" className="icon-nav" width={20} height={20} />
            </Link>
            <Link href='/' className="link-nav">
                <Image src="/projetos.png" alt="Projetos" className="icon-nav" width={20} height={20} />
            </Link>
        </div>
    </div>
  );
}
