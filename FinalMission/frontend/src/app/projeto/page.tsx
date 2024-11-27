"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home } from '@/layout-page';
import { BarraPorcentagem } from '@/components/barraPorcentage';
import { Projeto } from '@/utilsatividades';
import './style.css';
import { Modal } from '@/components/modal';
import Input from '@/components/input';
import Alerta from '@/components/alerta';

const Projetos: React.FC = () => {
    const [listaProjetos, setListaProjetos] = useState<Projeto[]>([
        {
            id: 123,
            titulo_projeto: 'Projeto 1',
            desc_projeto: 'Descrição do projeto novo teste',
            cor_projeto: '#9b51e0',
            porcentagem_atividade: 20,
        }, {
            id: 456,
            titulo_projeto: 'Projeto 2',
            desc_projeto: 'Descrição do projeto novo teste',
            cor_projeto: '#56ccf2',
            porcentagem_atividade: 50,
        }
    ]);

    const [modal, setModal] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');
    const [nomeProjeto, setNomeProjeto] = useState('');
    const [descProjeto, setDescProjeto] = useState('');
    const [corProjeto, setCorProjeto] = useState("#000000");

    const novoItem = async () => {
        try {
            if (carregando || !nomeProjeto || !descProjeto || !corProjeto) {
                return;
            }
            setCarregando(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/novoProjeto`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nomeProjeto, descProjeto, corProjeto }),
            });

            const data = await res.json();
            if (res.ok) {
                setListaProjetos([
                    ...listaProjetos,
                    data
                ])
            } else {
                setErro(data.message);
                setTimeout(() => {
                    setErro("");
                }, 5000);
            }
            setCarregando(false);
            setModal(false)
            setNomeProjeto('')
            setDescProjeto('')
            setCorProjeto('#000')
        } catch (error) {
            setErro("Erro ao criar o projeto.");
            setTimeout(() => {
                setErro("");
            }, 5000);
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
            <div className="container-atividades">
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
