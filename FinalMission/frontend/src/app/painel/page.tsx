"use client"

import React, { useEffect, useState } from 'react'
import { Home } from '@/layout-page';
import ListaArrastavel from '@/components/listaArrastavel';
import "./style.css";
import { SemDados } from '@/components/semDados';
import { Coluna, Projeto } from '@/utilsatividades';
import { Api } from '@/apiindex';

interface PropsProjeto {
    nome_user?: string
}

const Projetos: React.FC<PropsProjeto> = ({ nome_user = 'usuário', }) => {
    const [listaAtividades, setListaAtividades] = useState<Coluna[]>([]);
    const [listaProjetos, setListaProjetos] = useState<Projeto[]>([]);
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        const id_usuario = localStorage.getItem("id_usuario");
        
        const fetchAtividades = async () => {
            try {
                setCarregando(true);
                const response = await Api({ body: { id_usuario }, rota: "atividades" });
                setListaAtividades(response)
            } catch (error) {
                setCarregando(false);
            }
        }

        const fetchProjetos = async () => {
            try {
                setCarregando(true);
                const response = await Api({ body: { id_usuario }, rota: "projetos" });
                setListaProjetos(response)
            } catch (error) {
                setCarregando(false);
            }
        }
        
        fetchAtividades();
        fetchProjetos();
    })

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