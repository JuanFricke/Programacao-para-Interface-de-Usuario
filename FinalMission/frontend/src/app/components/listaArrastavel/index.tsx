"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ItemLista, PlaceholderItem } from '../itemLista';
import { Modal } from '../modal';
import Input from '../input';
import "./style.css";
import { Atividade, Coluna, Projeto } from '@/utilsatividades';
import Alerta from '../alerta';
import Select from '../select';

interface PropsItem {
  tituloLista: string;
  lista: Coluna[];
  listaProjetos: Projeto[]
}

function ListaArrastavel({ lista, tituloLista, listaProjetos }: PropsItem) {
  const [listas, setListaAtividades] = useState(lista);
  const [activeItem, setActiveItem] = useState<Atividade | null>(null);
  const [overColumn, setOverColumn] = useState<string | null>(null);
  const [spaceIndex, setSpaceIndex] = useState<number | null>(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [modalItem, setModalItem] = useState(false);
  const [colunaItem, setColunaItem] = useState('');
  const [descItemNovo, setDescItem] = useState('');
  const [projeto, setProjeto] = useState('');
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragCancel = () => {
    setActiveItem(null);
    setOverColumn(null);
    setSpaceIndex(null);
    setDraggedFromColumn(null);
  };
  
  const handleDragStart = (event: any) => {
    const { active } = event;
    const activeColumn = findColumnByItem(active.id);
    if (!activeColumn) return;

    const item = listas.flatMap((coluna) => coluna.atividades).find((atividade) => atividade.id === active.id);

    setActiveItem(item || null);
    setDraggedFromColumn(activeColumn.toString());
  };

  const handleDragOver = (event: any) => {
    const { over } = event;
    if (over) {
      const newOverColumn = findColumnByItem(over.id);
      
      
      if (!newOverColumn) {
        setOverColumn(over.id);
        setSpaceIndex(null);
      } else {
        if (typeof newOverColumn === 'string' && newOverColumn !== draggedFromColumn) {
          setOverColumn(newOverColumn);
          setSpaceIndex(null);
        }

        const columnData = listas.find((coluna) => coluna.nome_coluna === newOverColumn);

        const overIndex = columnData
        ? columnData.atividades.findIndex((item) => item.id === over.id)
        : -1;
        setSpaceIndex(overIndex);
      }
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setActiveItem(null);
    setOverColumn(null);
    setSpaceIndex(null);
    setDraggedFromColumn(null);
  
    if (!over) return;
  
    const activeColumnId = findColumnByItem(active.id);
    const overColumnId = findColumnByItem(over.id);
    
    if (!activeColumnId || !overColumnId) return;

    if (activeColumnId !== overColumnId) {
      setListaAtividades((prevColumns) => {
        const activeColumn = prevColumns.find(col => col.nome_coluna === activeColumnId);
        const overColumn = prevColumns.find(col => col.nome_coluna === overColumnId);
      
        if (!activeColumn || !overColumn) return prevColumns;
        
        const activeItems = [...activeColumn.atividades];
        const overItems = [...overColumn.atividades];
      
        const itemIndex = activeItems.findIndex((item) => item.id === active.id);
        if (itemIndex === -1) return prevColumns;
      
        const [movedItem] = activeItems.splice(itemIndex, 1);
      
        const overIndex = spaceIndex ?? overItems.length;
      
        overItems.splice(overIndex, 0, movedItem);
      
        return prevColumns.map((coluna) => {
          if (coluna.nome_coluna === activeColumnId) {
            return { ...coluna, atividades: activeItems };
          }
          if (coluna.nome_coluna === overColumnId) {
            return { ...coluna, atividades: overItems };
          }
          return coluna;
        });
      });
      
    } else {
      setListaAtividades((prevColumns) => {
        const activeColumn = prevColumns.find(col => col.nome_coluna === activeColumnId);
    
        if (!activeColumn) return prevColumns;
    
        const items = [...activeColumn.atividades];
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = spaceIndex ?? oldIndex;
    
        const updatedItems = arrayMove(items, oldIndex, newIndex);
    
        return prevColumns.map((coluna) => {
          if (coluna.nome_coluna === activeColumnId) {
            return { ...coluna, atividades: updatedItems };
          }
          return coluna;
        });
      });
    }
  };

  const findColumnByItem = (itemId: string) => {
    const column = listas.find(({ atividades }) => 
      atividades.some((item) => item.id === itemId)
    )?.nome_coluna;
    
    if(!column) {
      return itemId;
    }
    
    return column ? column : null;
  };

  const criarNovaAtiv = (nome_coluna: string) => {
    setColunaItem(nome_coluna);
    setModalItem(true)
  };

  const novoItem = async () => {
    try {
      if (carregando || !colunaItem || !descItemNovo) {
        return;
      }
      setCarregando(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/novoItem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ colunaItem, descItemNovo, projeto }),
      });

      const data = await res.json();
      if (res.ok) {
        setListaAtividades([
          ...listas,
          data
        ])    
      } else {
        setErro(data.message);
        setTimeout(() => {
          setErro("");
        }, 5000);
      }
      setCarregando(false);
      setModalItem(false)
      setDescItem('')
    } catch (error) {
      setErro("Erro ao criar item.");
      setTimeout(() => {
        setErro("");
      }, 5000);
      setCarregando(false);
      setModalItem(false)
      setDescItem('')  
    }
  }

  return (
    <>
      <div className="cabecalho-lista">
        <div className="titulo-lista">{tituloLista}</div>
      </div>
      {listas.length > 0 ? 
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <div className='container-listas'>
            {listas.map(({ nome_coluna, atividades, id }) => (
                <div key={id} className="coluna-itens">
                  <div className="container-titulo">
                    <h3 className="titulo-coluna">{nome_coluna}</h3>
                    <button className="btn-nova-atv" title="Criar nova atividade" onClick={() => criarNovaAtiv(nome_coluna)}>
                      <Image src="/plus.png" alt="Nova atividade" className="icon-nova-ativ" width={20} height={20} />
                    </button>
                  </div>
                  <SortableContext
                    items={atividades}
                    strategy={verticalListSortingStrategy}
                  >
                    {atividades.length > 0 ?
                      atividades.map((item: Atividade, index) => (
                        <div key={item.id}>
                          {overColumn === nome_coluna && draggedFromColumn !== nome_coluna && spaceIndex === index && (
                            <div className="placeholder-item"></div>
                          )}
                          <ItemLista
                            id={item.id}
                            titulo_atividade={item.titulo_atividade}
                            nome_projeto={item.nome_projeto}
                            cor_projeto={item.cor_projeto}
                          />
                        </div>
                      ))
                    : (
                      <PlaceholderItem id={nome_coluna} colunaOrigen={draggedFromColumn} />
                    )}
                    <button className="nova-ativ-item" onClick={() => criarNovaAtiv(nome_coluna)}>
                      Criar uma nova atividade
                    </button>
                  </SortableContext>
                </div>
              ))}
          </div>
          <DragOverlay>
            {activeItem ? (
              <ItemLista
                id={activeItem.id}
                titulo_atividade={activeItem.titulo_atividade}
                nome_projeto={activeItem.nome_projeto}
                cor_projeto={activeItem.cor_projeto}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
        :
        <div className="container-vazio">
          <Image src="/sem-dados.gif" alt="Nenhum dado encontrado" className="img-sem-dados" width={200} height={200} />
          <p>Nenhum dado encontrado</p>
        </div>
      }
      {modalItem && 
        <Modal
          titulo="Adicionar Item"
          onClose={() => setModalItem(false)}
          btn={<button className='btn-primary' onClick={novoItem} disabled={!descItemNovo || carregando}>
            {carregando ? 'Salvando...' : 'Salvar'}
          </button>}
          >
          <Input
            text='Descrição da atividade: '
            value={descItemNovo}
            setValue={setDescItem}
            label='desc-item'
          />
          <Select array={listaProjetos} chave='id' text='titulo_projeto' label='Projetos' value={projeto} changeValue={setProjeto} />
        </Modal>
      }
      {erro &&
        <Alerta mensagem={erro} tipo='erro' />
      }
    </>
  );
}

export default ListaArrastavel;
