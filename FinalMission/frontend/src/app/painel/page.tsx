import React from 'react'
import { Home } from '@/page';
import ListaArrastavel from '@/components/listaArrastavel';
import "./style.css";


interface PropsProjeto {
    nome_user?: string
}

const Projetos: React.FC<PropsProjeto> = ({ nome_user = 'usuário', }) => {
    const teste = [
        {
            id: '123',
            titulo_atividade: 'Atividade 1',
            desc_atividade: 'Projeto 1',
            cor_projeto: '#9b51e0',
        }, {
            id: '456',
            titulo_atividade: 'Atividade 2',
            desc_atividade: 'Projeto 2',
            cor_projeto: '#56ccf2',
        }, {
            id: '789',
            titulo_atividade: 'Atividade 7',
            desc_atividade: 'Projeto 2',
            cor_projeto: '#56ccf2',
        }
    ]
    return (
        <Home>
            <div className="header-projeto">
                <p className='titulo-pagina'>Olá, {nome_user}</p>
            </div>
            <div className="container-atividades">
                <ListaArrastavel listas={teste} />                
            </div>
        </Home>
    )
}

export default Projetos;