//Copia de frontend\src\app\projeto\page.tsx


"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home } from '@/layout-page';
import { BarraPorcentagem } from '@/components/barraPorcentage';
import { Projeto } from '@/utilsatividades';
import './style.css';
import { Modal } from '@/components/modal';
import Input from '@/components/input';
import Alerta from '@/components/alerta';
import { Api } from '@/apiindex';
import { SemDados } from '@/components/semDados';

const Projetos: React.FC = () => {
    const [listaProjetos, setListaProjetos] = useState<Projeto[]>([]);
    const [modal, setModal] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');
    const [nomeProjeto, setNomeProjeto] = useState('');
    const [descProjeto, setDescProjeto] = useState('');
    const [corProjeto, setCorProjeto] = useState("#000000");

    useEffect(() => {
        const id_usuario = localStorage.getItem("id_usuario");

        const fetchProjetos = async () => {
            try {
                setCarregando(true);

                /*
                    Vinícius
                    Alterei a rota para buscar os projects 
                    (daria pra avaliar em fazer uma rota get e passar o id do usuário pela url)
                    Coloquei explicitamente o método POST também.
                */
                const response = await Api({ body: { id_usuario }, rota: "/api/get/projects", method: 'POST' });
                setListaProjetos(response)
            } catch (error) {
                setCarregando(false);
            }
        }
        
        fetchProjetos();
    })

    const novoItem = async () => {
        const id_usuario = localStorage.getItem("id_usuario");

        try {
            if (carregando || !nomeProjeto || !descProjeto || !corProjeto) {
                return;
            }
            setCarregando(true);

            //const body = { id_usuario, nomeProjeto, descProjeto, corProjeto }; //Comentado por Vinícius

            /*
                Vinícius
                O backend espera receber um status mas acho que não precisaria receber
                na inclusão do projeto. O projeto podera 'nascer' com um status
                predeterminado.
                Adicionei um status qualquer só para não dar erro
            */
            const statusProjeto = "PENDENTE"; //Vinícius
            const body = { id_usuario, nomeProjeto, descProjeto, statusProjeto, corProjeto };  //Vinícius

            //Vinícius - Alterei a rota para adicionar os projects             
            const response = await Api({ body, rota: "/api/add/project", method: 'POST' });

            setListaProjetos([
                ...listaProjetos,
                response
            ])
        } catch (error) {
            setErro("Erro ao criar o projeto.");
            setTimeout(() => {
                setErro("");
            }, 5000);
        } finally {
            setCarregando(false);
            setModal(false)
            setNomeProjeto('')
            setDescProjeto('')
            setCorProjeto('#000')
        }
    }

    return (
        <Home>
            <div className="container-btn">
                <button className="config-lista" title='Adicionar coluna' onClick={() => setModal(true)}>
                    <Image src="/plus.png" className="config-icon" alt="Logo da empresa" width={20} height={20} />
                </button>
            </div>
            { listaProjetos.length > 0 ?
                (<div className="container-atividades">
                    {listaProjetos.map(({ id, titulo_projeto, desc_projeto, cor_projeto, porcentagem_atividade }) => {
                        return (
                            <div
                                key={id}
                                className='container-projeto'
                            >
                                <Link href={`/projeto/${id}`} passHref>
                                    <div className="cabecalho-projeto">
                                        <div className="titulo-projeto">{titulo_projeto}</div>
                                        <div className="identificador-atividade" style={{ backgroundColor: cor_projeto }}></div>
                                    </div>
                                    <div className="desc-projeto">{desc_projeto}</div>
                                    <BarraPorcentagem percent={porcentagem_atividade} />
                                </Link>
                            </div>
                        )
                    })}
                </div>
                )
            : <SemDados/> }
            {modal &&
                <Modal
                    titulo="Adicionar Item"
                    onClose={() => setModal(false)}
                    btn={<button className='btn-primary' onClick={novoItem} disabled={!descProjeto || !nomeProjeto || carregando}>
                        {carregando ? 'Salvando...' : 'Salvar'}
                    </button>}
                >
                    <Input
                        text='Nome do Projeto: '
                        value={nomeProjeto}
                        setValue={setNomeProjeto}
                        label='nome-projeto'
                    />
                    <Input
                        text='Descrição do Projeto: '
                        value={descProjeto}
                        setValue={setDescProjeto}
                        label='desc-projeto'
                    />
                    <Input
                        text='Cor do Projeto: '
                        value={corProjeto}
                        setValue={setCorProjeto}
                        label='cor-projeto'
                        type='color'
                    />
                </Modal>
            }
            {erro &&
                <Alerta mensagem={erro} tipo='erro' />
            }
        </Home>
    );
}

export default Projetos;
