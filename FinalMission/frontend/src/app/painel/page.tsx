"use client"

import React, { useEffect, useState } from 'react'
import { Home } from '@/layout-page';
import ListaArrastavel from '@/components/listaArrastavel';
import "./style.css";
import { SemDados } from '@/components/semDados';
import { Coluna } from '@/utilsatividades';

interface PropsProjeto {
    nome_user?: string
}

const Projetos: React.FC<PropsProjeto> = ({ nome_user = 'usuário', }) => {
    const [listaAtividades, setListaAtividades] = useState<Coluna[]>([
        {
            id: 1,
            nome_coluna: 'coluna1',
            atividades: [
              {
                id: '141',
                titulo_atividade: 'Atividade 1',
                desc_atividade: 'Projeto 1',
                cor_projeto: '#9b51e0',
                feito: true,
              },
              {
                id: '444',
                titulo_atividade: 'Atividade 6',
                desc_atividade: 'Projeto 1',
                cor_projeto: '#9b51e0',
                feito: true,
              },
            ],
        }, {
            id: 2,
            nome_coluna: 'coluna2',
            atividades: [
              {
                id: '456',
                titulo_atividade: 'Atividade 5',
                desc_atividade: 'Projeto 1',
                cor_projeto: '#9b51e0',
                feito: false,
              },
            ],
        }
    ]);

    return (
        <Home>
            <div className="header-projeto">
                <p className='titulo-pagina'>Olá, {nome_user}</p>
            </div>
            {listaAtividades ? 
                <div className="container-lista">
                    <ListaArrastavel lista={listaAtividades} tituloLista="Painel" />
                </div>
            :
                <SemDados />
            }
        </Home>
    )
}

export default Projetos;