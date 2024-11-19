"use client";

import React from 'react';
import { Home } from '@/page';
import './style.css';
import Link from 'next/link';
import { BarraPorcentagem } from '@/components/barraPorcentage';

interface PropsProjeto {
    nome_user?: string;
}

const Projetos: React.FC<PropsProjeto> = ({ nome_user = 'usuário' }) => {
    const projetos = [
        {
            id: '123',
            titulo_projeto: 'Projeto 1',
            desc_projeto: 'Descrição do projeto novo teste',
            cor_projeto: '#9b51e0',
            porcentagem_atividade: 20,
            feito: false,
            projetos: [{
                coluna1: [
                    {
                        id: '123',
                        titulo_atividade: 'Atividade 1',
                        desc_atividade: 'Projeto 1',
                        cor_projeto: '#9b51e0',
                        feito: false
                    }, {
                        id: '456',
                        titulo_atividade: 'Atividade 2',
                        desc_atividade: 'Projeto 2',
                        cor_projeto: '#56ccf2',
                        feito: false
                    }, {
                        id: '789',
                        titulo_atividade: 'Atividade 7',
                        desc_atividade: 'Projeto 2',
                        cor_projeto: '#56ccf2',
                        feito: false
                    }
                ],
                coluna2: [
                    {
                        id: '101',
                        titulo_atividade: 'Atividade 7',
                        desc_atividade: 'Projeto 1',
                        cor_projeto: '#9b51e0',
                        feito: true
                    }, {
                        id: '112',
                        titulo_atividade: 'Atividade 8',
                        desc_atividade: 'Projeto 2',
                        cor_projeto: '#56ccf2',
                        feito: true
                    }, {
                        id: '131',
                        titulo_atividade: 'Atividade 9',
                        desc_atividade: 'Projeto 2',
                        cor_projeto: '#56ccf2',
                        feito: true
                    }
                ]
            }]
        }, {
            id: '456',
            titulo_projeto: 'Projeto 2',
            desc_projeto: 'Descrição do projeto novo teste',
            cor_projeto: '#56ccf2',
            porcentagem_atividade: 50,
            feito: false,
            projetos: [{
                coluna1: [
                    {
                        id: '123',
                        titulo_atividade: 'Atividade 1',
                        desc_atividade: 'Projeto 1',
                        cor_projeto: '#9b51e0',
                        feito: false
                    }, {
                        id: '456',
                        titulo_atividade: 'Atividade 2',
                        desc_atividade: 'Projeto 2',
                        cor_projeto: '#56ccf2',
                        feito: false
                    }, {
                        id: '789',
                        titulo_atividade: 'Atividade 7',
                        desc_atividade: 'Projeto 2',
                        cor_projeto: '#56ccf2',
                        feito: false
                    }
                ],
                coluna2: [
                    {
                        id: '101',
                        titulo_atividade: 'Atividade 7',
                        desc_atividade: 'Projeto 1',
                        cor_projeto: '#9b51e0',
                        feito: true
                    }, {
                        id: '112',
                        titulo_atividade: 'Atividade 8',
                        desc_atividade: 'Projeto 2',
                        cor_projeto: '#56ccf2',
                        feito: true
                    }, {
                        id: '131',
                        titulo_atividade: 'Atividade 9',
                        desc_atividade: 'Projeto 2',
                        cor_projeto: '#56ccf2',
                        feito: true
                    }
                ]
            }]
        }, {
            id: '789',
            titulo_projeto: 'Projeto 3',
            desc_projeto: 'Descrição do projeto novo teste',
            cor_projeto: '#56ccf2',
            porcentagem_atividade: 90,
            feito: false,
            projetos: [{
                coluna1: [
                    {
                        id: '123',
                        titulo_atividade: 'Atividade 1',
                        desc_atividade: 'Projeto 1',
                        cor_projeto: '#9b51e0',
                        feito: false
                    }, {
                        id: '456',
                        titulo_atividade: 'Atividade 2',
                        desc_atividade: 'Projeto 2',
                        cor_projeto: '#56ccf2',
                        feito: false
                    }, {
                        id: '789',
                        titulo_atividade: 'Atividade 7',
                        desc_atividade: 'Projeto 2',
                        cor_projeto: '#56ccf2',
                        feito: false
                    }
                ],
                coluna2: [
                    {
                        id: '101',
                        titulo_atividade: 'Atividade 7',
                        desc_atividade: 'Projeto 1',
                        cor_projeto: '#9b51e0',
                        feito: true
                    }, {
                        id: '112',
                        titulo_atividade: 'Atividade 8',
                        desc_atividade: 'Projeto 2',
                        cor_projeto: '#56ccf2',
                        feito: true
                    }, {
                        id: '131',
                        titulo_atividade: 'Atividade 9',
                        desc_atividade: 'Projeto 2',
                        cor_projeto: '#56ccf2',
                        feito: true
                    }
                ]
            }]
        }
    ];

    const abrirDetalheProjeto = (projeto: any) => {
        localStorage.setItem('projetoAtivo', JSON.stringify(projeto));
    };

    return (
        <Home>
            <div className="container-atividades">
                {projetos.map(projeto => {
                    const { id, titulo_projeto, desc_projeto, cor_projeto, porcentagem_atividade } = projeto;
                    return (
                        <div 
                            key={id} 
                            className='container-projeto' 
                            onClick={() => abrirDetalheProjeto(projeto)}
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
