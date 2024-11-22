import React from 'react'
import { Home } from '@/layout-page';
import ListaArrastavel from '@/components/listaArrastavel';
import "./style.css";
import { SemDados } from '@/components/semDados';

interface PropsProjeto {
    nome_user?: string
}

const Projetos: React.FC<PropsProjeto> = ({ nome_user = 'usuário', }) => {
    const listaAtividades = [{
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
        ],
        coluna3: [
            {
                id: '141',
                titulo_atividade: 'Atividade 7',
                desc_atividade: 'Projeto 1',
                cor_projeto: '#9b51e0',
                feito: true
            }, {
                id: '151',
                titulo_atividade: 'Atividade 8',
                desc_atividade: 'Projeto 2',
                cor_projeto: '#56ccf2',
                feito: true
            }, {
                id: '161',
                titulo_atividade: 'Atividade 9',
                desc_atividade: 'Projeto 2',
                cor_projeto: '#56ccf2',
                feito: true
            }
        ]
    }]

    return (
        <Home>
            <div className="header-projeto">
                <p className='titulo-pagina'>Olá, {nome_user}</p>
            </div>
            {listaAtividades ? 
                <div className="container-lista">
                    <ListaArrastavel listas={listaAtividades} />
                </div>
            :
                <SemDados />
            }
        </Home>
    )
}

export default Projetos;