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
import { Api } from '@/apiindex';

interface ProjetoDetalhesParams {
    id: string; // Altere conforme o formato de `params`
}
  
interface ProjetoDetalhesProps {
    params: ProjetoDetalhesParams;
}

const ProjetoDetalhes: React.FC<ProjetoDetalhesProps> = ({ params }) => {
    const [idProjeto, setIdProjeto] = useState('');
    const [projeto, setProjeto] = useState<Projeto[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    
    useEffect(() => {
      const fetchParams = async () => {
        const { id } = await params;
        setIdProjeto(id);
      };
      fetchParams();
    }, [params]);

    useEffect(() => {
        if (idProjeto) {
            const id_usuario = localStorage.getItem("id_usuario");
            
            const fetchProjetos = async () => {
                try {
                    setCarregando(true);
                    const response = await Api({ body: { id_usuario, id: idProjeto }, rota: "projetos" });
                    setProjeto(response)
                    setCarregando(false);
                } catch (error) {
                    setErro('Erro ao buscar os dados!');
                } finally {
                    setCarregando(false);
                }
            }
            
            fetchProjetos();
        }
    })
    
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
                        <ListaArrastavel lista={projeto[0].atividades|| []} tituloLista={projeto[0].titulo_projeto} listaProjetos={listaProjetos} />
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

export default ProjetoDetalhes;
