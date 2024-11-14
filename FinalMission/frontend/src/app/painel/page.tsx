import React from 'react'
import { Home } from '@/page';
import { ItemLista } from '@/components/itemLista';
import "./style.css";

interface PropsProjeto {
    nome_user?: string
}

const Projetos: React.FC<PropsProjeto> = ({ nome_user = 'usuário', }) => {
    return (
        <Home>
            <div className="header-projeto">
                <p className='titulo-pagina'>Olá, {nome_user}</p>
            </div>
            <div className="container-atividades">
                
            </div>
        </Home>
    )
}

export default Projetos;