"use client";

import { useEffect, useState } from 'react';
import { Home } from '@/page';
import './style.css';
import Image from 'next/image';

const Pomodoro: React.FC = () => {
    const [projeto, setProjeto] = useState<any>(null);
    const [cronometro, setCronometro] = useState<number>(30*60);
    const [inicioCronometro, setInicioCronometro] = useState<boolean>(false);

    useEffect(() => {
      if (!inicioCronometro || cronometro <= 0) return;
    
      const interval = setInterval(() => {
        setCronometro((prevTime) => prevTime - 1);
      }, 1000);
    
      return () => clearInterval(interval);
    }, [inicioCronometro, cronometro]);
    

    useEffect(() => {
        const projetoSalvo = localStorage.getItem('projetoAtivo');
        if (projetoSalvo) {
            setProjeto(JSON.parse(projetoSalvo));
        }
    }, []);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };
    

    if (!projeto) {
        return <div>Carregando...</div>;
    }

    return (
        <Home>
            <div className="container-pomodoro">
                <div className="container-tempo">
                    <div className="cronometro">
                        {formatTime(cronometro)}
                    </div>
                    <div className="container-btns">
                        {inicioCronometro ?
                            <button className='btn btn-pomodoro' title='Pausar concentração' onClick={() => setInicioCronometro(!inicioCronometro)}>
                                Pausar concentração
                                <Image src="/pouse.png" className='seta' alt='Pausar concentração' width={25} height={25} />
                            </button>
                        :
                            <button className='btn btn-pomodoro' title='Comece a se concentrar' onClick={() => setInicioCronometro(!inicioCronometro)}>
                                Comece a se concentrar
                                <Image src="/seta.png" className='seta' alt='Comece a se concentrar' width={25} height={25} />
                            </button>
                        }
                        <button className='btn-reiniciar' title='Resetar cronometro' onClick={() => setCronometro(30 * 60)}>
                            <Image src="/reiniciar.png" className='reset' alt='Pausar concentração' width={25} height={25} />
                        </button>
                    </div>
                </div>
                <div className="container-tempo-total">
                    <div className="container-atividade-pomodoro container-foco">
                        <div className="titulo">Tempo total em foco hoje:</div>
                        <div className="tempo">{formatTime(cronometro)}</div>
                    </div>
                    {projeto &&
                        <div className="container-atividade-pomodoro atividades-andamento">
                            <div className="titulo-projeto">
                                <div></div>
                                    { projeto.titulo_projeto }
                                <button className="btn-nova-atv" title="Criar nova atividade" onClick={() => console.log('Nova atividade') }>
                                    <Image src="/plus.png" alt="Nova atividade" className="icon-nova-ativ" width={20} height={20} />
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </Home>
    );
};

export default Pomodoro;
