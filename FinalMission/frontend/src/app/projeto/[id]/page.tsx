"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BarraPorcentagem } from '@/components/barraPorcentage';
import { Home } from '@/layout-page';
import './style.css';
import ListaArrastavel from '@/components/listaArrastavel';
import { Pomodoro } from '@/components/pomodoro';
import { Projeto } from '@/utilsatividades';
import { SemDados } from '@/components/semDados';

interface ProjetoDetalhesParams {
    id: string; // Altere conforme o formato de `params`
}
  
interface ProjetoDetalhesProps {
    params: ProjetoDetalhesParams;
}

const ProjetoDetalhes: React.FC<ProjetoDetalhesProps> = ({ params }) => {
    const [idProjeto, setIdProjeto] = useState('');
    const [projeto, setProjeto] = useState<Projeto[]>([]);
    const [listaProjetos, setListaProjetos] = useState<Projeto[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const router = useRouter();
    
    useEffect(() => {
      const fetchParams = async () => {
        const { id } = await params;
        setIdProjeto(id);
      };
      fetchParams();
    }, [params]);

    useEffect(() => {
        if (idProjeto) {
            setCarregando(true);
            res()
            .then((dados) => setProjeto(dados))
            .catch((error) => setErro("Erro ao processar a requisição."));
            setCarregando(false);
        }
    })
    
    const res = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projetos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: idProjeto }),
        });
    
        if (!response.ok) throw new Error("Erro na requisição");
    
        return response.json();
    };
    
    return (
        <Home>
            {projeto.length > 0 ?
                <>
                    <div className="projeto-cabecalho">
                        <div className="projeto-container">
                            <h1 className='projeto-titulo'>{projeto[0].titulo_projeto}</h1>
                            <div className="identificador-atividade" style={{ backgroundColor: projeto[0].cor_projeto }}></div>
                        </div>
                    <div className='projeto-descricao'>{projeto[0].desc_projeto}</div>
                    <BarraPorcentagem percent={projeto[0].porcentagem_atividade} />
                    </div>
                    <div className="container-lista">
                        <ListaArrastavel listas={projeto[0].atividades} tituloLista={projeto[0].titulo_projeto} listaProjetos={listaProjetos} />
                    </div>
                    <Pomodoro />
                </>
            : 
            carregando ? 
                <div className="container-carregando">
                    <div className="icone-carregando">
                        <div className="boble-icon"></div>
                        <div className="boble-icon"></div>
                        <div className="boble-icon"></div>
                    </div>
                </div>
                :
                <SemDados texto={erro} />
            }
        </Home>
    );
};


{/*  */}

export default ProjetoDetalhes;
