"use client";

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ItemLista } from '../itemLista';
import "./style.css";
import Image from 'next/image';

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
      feito={feito} />
  );
}

function ListaArrastavel({ listas }: PropsItem) {
  const [columns, setColumns] = useState<Columns>(listas[0]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeColumn = findColumnByItem(active.id);
    const overColumn = findColumnByItem(over.id);

    if (!activeColumn || !overColumn) return;
    if (activeColumn !== overColumn) {
      setColumns((prevColumns) => {
        const activeItems = [...prevColumns[activeColumn]];
        const overItems = [...prevColumns[overColumn]];

        const itemIndex = activeItems.findIndex((item) => item.id === active.id);
        const [movedItem] = activeItems.splice(itemIndex, 1);
        overItems.splice(overItems.findIndex((item) => item.id === over.id), 0, movedItem);

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
        const newIndex = items.findIndex((item) => item.id === over.id);
        return {
          ...prevColumns,
          [activeColumn]: arrayMove(items, oldIndex, newIndex),
        };
      });
    }
  };

  const findColumnByItem = (itemId: string): keyof Columns | null => {
    const column = Object.keys(columns).find((column) =>
      columns[column as keyof Columns].some((item: Atividade) => item.id === itemId)
    );
    return column ? (column as keyof Columns) : null;
  };

  const criarNovaAtiv = () => {
    console.log('Click nova atividade');
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div style={{ display: 'flex', gap: '16px' }}>
        {Object.keys(columns).map((columnId) => (
          <div key={columnId} className='coluna-itens'>
            <div className="container-titulo">
              <h3 className='titulo-coluna'>{columnId}</h3>
              <button className="btn-nova-atv" title='Criar nova atividade' onClick={criarNovaAtiv}>
                <Image src="/plus.png" alt="Nova atividade" className="icon-nova-ativ" width={20} height={20} />
              </button>
            </div>
            <SortableContext
              items={columns[columnId as keyof Columns]}
              strategy={verticalListSortingStrategy}
            >
              {columns[columnId as keyof Columns].map((item: Atividade) => (
                <SortableItem key={item.id} {...item} />
              ))}
            </SortableContext>
          </div>
        ))}
      </div>
    </DndContext>
  );
}

export default ListaArrastavel;
