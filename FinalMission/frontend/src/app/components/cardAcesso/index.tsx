import './style.css';
import Image from 'next/image';

interface cartaoInicial {
    title: string,
    children: React.ReactNode;
}

export function CardAcesso({title, children}: cartaoInicial) {
    return (
        <div className="container-cartao">
            <Image src="/logo.png" className="logo" alt="Logo da empresa" width={160} height={160} />
            <h1>{title}</h1>
            {children}
        </div>
    );
}