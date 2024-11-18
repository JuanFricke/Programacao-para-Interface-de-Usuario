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
import "./style.css";

interface Atividade {
  id: string;
  titulo_atividade: string;
  desc_atividade: string;
  cor_projeto: string;
  feito: boolean;
}

interface Columns {
  [key: string]: Atividade[];
}

interface PropsItem {
  listas: Columns[];
}

function SortableItem({ id, titulo_atividade, cor_projeto, desc_atividade, feito }: Atividade) {
  return (
    <ItemLista
      id={id}
      titulo_atividade={titulo_atividade}
      desc_atividade={desc_atividade}
      cor_projeto={cor_projeto}
      feito={feito}
    />
  );
}

function ListaArrastavel({ listas }: PropsItem) {
  const [columns, setColumns] = useState<Columns>(listas[0]);
  const [activeItem, setActiveItem] = useState<Atividade | null>(null);
  const [overColumn, setOverColumn] = useState<string | null>(null);
  const [spaceIndex, setSpaceIndex] = useState<number | null>(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event: any) => {
    const { active } = event;
    const activeColumn = findColumnByItem(active.id);
    if (!activeColumn) return;

    const item = columns[activeColumn].find((item) => item.id === active.id);
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

        const overIndex = columns[newOverColumn].findIndex((item) => item.id === over.id);
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
  
    const activeColumn = findColumnByItem(active.id);
    const overColumn = findColumnByItem(over.id);
    
    if (!activeColumn || !overColumn) return;

    if (activeColumn !== overColumn) {
      setColumns((prevColumns) => {
        const activeItems = [...prevColumns[activeColumn]];
        const overItems = prevColumns[overColumn] ? [...prevColumns[overColumn]] : [];
  
        const itemIndex = activeItems.findIndex((item) => item.id === active.id);
        const [movedItem] = activeItems.splice(itemIndex, 1);
  
        if (overItems.length === 0) {
          overItems.push(movedItem);
        } else {
          const overIndex = spaceIndex ?? overItems.length;
          overItems.splice(overIndex, 0, movedItem);
        }
  
        return {
          ...prevColumns,
          [activeColumn]: activeItems,
          [overColumn]: overItems,
        };
      });
    } else {
      setColumns((prevColumns) => {
        const items = [...prevColumns[activeColumn]];
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = spaceIndex ?? oldIndex;
  
        return {
          ...prevColumns,
          [activeColumn]: arrayMove(items, oldIndex, newIndex),
        };
      });
    }
  };
  

  const handleDragCancel = () => {
    setActiveItem(null);
    setOverColumn(null);
    setSpaceIndex(null);
    setDraggedFromColumn(null);
  };

  const findColumnByItem = (itemId: string): keyof Columns | null => {
    const column = Object.keys(columns).find((column) =>
      columns[column as keyof Columns].some((item: Atividade) => item.id === itemId)
    );

    if(!column) {
      return itemId;
    }
    
    return column ? (column as keyof Columns) : null;
  };

  const criarNovaAtiv = () => {
    console.log('Click nova atividade');
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div style={{ display: 'flex', gap: '16px' }}>
        {Object.keys(columns).map((columnId) => (
          <div key={columnId} className="coluna-itens">
            <div className="container-titulo">
              <h3 className="titulo-coluna">{columnId}</h3>
              <button className="btn-nova-atv" title="Criar nova atividade" onClick={criarNovaAtiv}>
                <Image src="/plus.png" alt="Nova atividade" className="icon-nova-ativ" width={20} height={20} />
              </button>
            </div>
            <SortableContext
              items={columns[columnId as keyof Columns]}
              strategy={verticalListSortingStrategy}
            >
              {columns[columnId as keyof Columns].length > 0 ?
                columns[columnId as keyof Columns].map((item: Atividade, index) => (
                  <div key={item.id}>
                    {overColumn === columnId && draggedFromColumn !== columnId && spaceIndex === index && (
                      <div className="placeholder-item"></div>
                    )}
                    <SortableItem {...item} />
                  </div>
                ))
              : (
                <PlaceholderItem id={columnId} colunaOrigen={draggedFromColumn} />
              )}
              <button className="nova-ativ-item" onClick={criarNovaAtiv}>
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
            desc_atividade={activeItem.desc_atividade}
            cor_projeto={activeItem.cor_projeto}
            feito={activeItem.feito}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default ListaArrastavel;
