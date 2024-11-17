"use client";

import "./style.css";
import React from 'react'
import {
    useSortable,
  } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface PropsItem {
    titulo_atividade: string
    desc_atividade: string
    cor_projeto: string
    id: string;
}

 
export const ItemLista: React.FC<PropsItem> = ({ titulo_atividade, desc_atividade, cor_projeto, id }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div style={style} className="container-item" ref={setNodeRef} {...attributes} {...listeners}>
            <div className="info-atividade">
                <div className="titulo-atividade">{ titulo_atividade }</div>
                <div className="descricao-atividade">{ desc_atividade }</div>
            </div>
            <div className="identificador-atividade" style={{backgroundColor: cor_projeto}}></div>
        </div>
    );
}
