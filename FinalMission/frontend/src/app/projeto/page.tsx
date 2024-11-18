import React from 'react'
import { Home } from '@/page';
import "./style.css";

interface PropsProjeto {
    nome_user?: string
}

const Projetos: React.FC<PropsProjeto> = ({ nome_user = 'usuário', }) => {
    const teste = [
        {
            id: '123',
            titulo_projeto: 'Projeto 1',
            desc_projeto: 'Descrição do projeto novo teste',
            cor_projeto: '#9b51e0',
            porcentagem_atividade: 20,
            feito: false
        }, {
            id: '456',
            titulo_projeto: 'Projeto 2',
            desc_projeto: 'Descrição do projeto novo teste',
            cor_projeto: '#56ccf2',
            porcentagem_atividade: 50,
            feito: false
        }, {
            id: '789',
            titulo_projeto: 'Projeto 3',
            desc_projeto: 'Descrição do projeto novo teste',
            cor_projeto: '#56ccf2',
            porcentagem_atividade: 90,
            feito: false
        }
    ]
    return (
        <Home>
            <div className="container-atividades">
                {teste.map(({ id, titulo_projeto, desc_projeto, cor_projeto, porcentagem_atividade, feito }) => (
                    <div key={id} className='container-projeto'>
                        <div className="cabecalho-projeto">
                            <div className="titulo-projeto">{titulo_projeto}</div>
                            <div className="identificador-atividade" style={{backgroundColor: cor_projeto}}></div>
                        </div>
                        <div className="desc-projeto">{desc_projeto}</div>
                        <div className="container-porcent">
                            <div className="barra-porcent fundo-porcent"></div>
                            <div className="barra-porcent porcent-progress" style={{ width: `${porcentagem_atividade}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </Home>
    )
}

export default Projetos;