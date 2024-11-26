"use client";

import './style.css';
import Link from 'next/link';
import { Home } from '@/layout-page';
import { BarraPorcentagem } from '@/components/barraPorcentage';
import { Projeto } from '@/utilsatividades';
import { useState } from 'react';

const Projetos: React.FC = () => {
    const [listaProjetos, setListaProjetos] = useState<Projeto[]>([
        {
            id: 123,
            titulo_projeto: 'Projeto 1',
            desc_projeto: 'Descrição do projeto novo teste',
            cor_projeto: '#9b51e0',
            porcentagem_atividade: 20,
        }, {
            id: 456,
            titulo_projeto: 'Projeto 2',
            desc_projeto: 'Descrição do projeto novo teste',
            cor_projeto: '#56ccf2',
            porcentagem_atividade: 50,
        }
    ]);

    return (
        <Home>
            <div className="container-atividades">
                {listaProjetos.map(({ id, titulo_projeto, desc_projeto, cor_projeto, porcentagem_atividade }) => {
                    return (
                        <div 
                            key={id} 
                            className='container-projeto' 
                        >
                            <Link href={`/projeto/${id}`} passHref>
                                <div className="cabecalho-projeto">
                                    <div className="titulo-projeto">{titulo_projeto}</div>
                                    <div className="identificador-atividade" style={{ backgroundColor: cor_projeto }}></div>
                                </div>
                                <div className="desc-projeto">{desc_projeto}</div>
                                <BarraPorcentagem percent={porcentagem_atividade} />
                            </Link>
                        </div>
                    )
                })}
            </div>
        </Home>
    );
}

export default Projetos;
