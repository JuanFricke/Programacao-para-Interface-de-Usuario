import './style.css'; // Corrigido o nome do arquivo

interface BotaoPrimarioProps {
    textButton: string,
    className: string;
}

export default function BotaoPrimario({ textButton, className }: BotaoPrimarioProps) {
    return (
        <div className="container-botao">
            <button className={`btn ${className}`} >{textButton}</button>
        </div>
    );
}
