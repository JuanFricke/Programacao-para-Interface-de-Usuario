"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarraPorcentagem } from '@/components/barraPorcentage';
import { Home } from '@/page';
import './style.css';
import ListaArrastavel from '@/components/listaArrastavel';

const ProjetoDetalhes: React.FC = () => {
    const router = useRouter();
    console.log(router);
    

    const [projeto, setProjeto] = useState<any>(null);

    useEffect(() => {
        const projetoSalvo = localStorage.getItem('projetoAtivo');
        if (projetoSalvo) {
            setProjeto(JSON.parse(projetoSalvo));
        }
    }, []);

    if (!projeto) {
        return <div>Carregando...</div>;
    }

    console.log(projeto.projetos);
    
    return (
        <Home>
            <div className="projeto-cabecalho">
              <div className="projeto-container">
                <h1 className='projeto-titulo'>{projeto.titulo_projeto}</h1>
                <div className="identificador-atividade" style={{ backgroundColor: projeto.cor_projeto }}></div>
              </div>
              <div className='projeto-descricao'>{projeto.desc_projeto}</div>
              <BarraPorcentagem percent={projeto.porcentagem_atividade} />
            </div>
            <div className="container-lista">
                <ListaArrastavel listas={projeto.projetos} />
            </div>
        </Home>
    );
};

export default ProjetoDetalhes;
