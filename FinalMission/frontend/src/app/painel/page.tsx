"use client"

import React, { useEffect, useState } from 'react'
import { Home } from '@/layout-page';
import ListaArrastavel from '@/components/listaArrastavel';
import "./style.css";
import { SemDados } from '@/components/semDados';
import { Coluna, Projeto } from '@/utilsatividades';

interface PropsProjeto {
    nome_user?: string
}

const Projetos: React.FC<PropsProjeto> = ({ nome_user = 'usuário', }) => {
    const [listaAtividades, setListaAtividades] = useState<Coluna[]>([]);
    const [listaProjetos, setListaProjetos] = useState<Projeto[]>([]);

    return (
        <Home>
            <div className="header-projeto">
                <p className='titulo-pagina'>Olá, {nome_user}</p>
            </div>
            {listaAtividades ? 
                <div className="container-lista">
                    <ListaArrastavel lista={listaAtividades} tituloLista="Painel" listaProjetos={listaProjetos} />
                </div>
            : <SemDados />
            }
        </Home>
    )
}

export default Projetos;