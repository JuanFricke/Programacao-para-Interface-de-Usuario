import Image from "next/image";
import "./style.css";
 
export function SemDados() {
    return (
        <div className="container-sem-dados">
            <Image src="/sem-dados.gif" alt="Pomodoro" className="sem-dados-icon" width={500} height={50} />
            <p className="msg-sem-dados">Sem Dados</p>
        </div>
    );
}
