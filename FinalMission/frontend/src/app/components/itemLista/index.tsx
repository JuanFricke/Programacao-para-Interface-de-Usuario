import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import "./style.css";
import { useDroppable } from '@dnd-kit/core';

interface PropsItem {
  titulo_atividade: string;
  desc_atividade: string;
  cor_projeto: string;
  id: string;
  feito: boolean;
}

interface PropsItemVazio {
  id: string;
  colunaOrigen: string | null;
}

export const ItemLista: React.FC<PropsItem> = ({ titulo_atividade, desc_atividade, cor_projeto, id, feito }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  let style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
    pointerEvents: isDragging ? 'none' : 'auto',
  };

  return (
    <div
      style={style}
      className={`container-item ${feito ? 'container-disabled' : ''}`}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <div className="info-atividade">
        <div className="titulo-atividade">{titulo_atividade}</div>
        <div className="descricao-atividade">{desc_atividade}</div>
      </div>
      <div className="identificador-atividade" style={{ backgroundColor: cor_projeto }}></div>
    </div>
  );
};

export const PlaceholderItem: React.FC<PropsItemVazio> = ({ id, colunaOrigen }) => {
  const { isOver, setNodeRef } = useDroppable({ id });
  
  return (
    <div ref={setNodeRef}>
      {colunaOrigen && isOver && (
        <div className="placeholder-item"></div>
      )}
    </div>
  );
};