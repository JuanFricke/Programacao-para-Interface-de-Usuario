"use client"
import React, { useState } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

interface Atividade {
  id: string;
  titulo_atividade: string;
  desc_atividade: string;
  cor_projeto: string;
}

interface PropsItem {
  listas: Atividade[];
}

// Tipagem para os itens
type Item = string;

// Componente de item individual
const SortableItem = SortableElement(({ value }: { value: Item }) => (
  <div className="item">{value}</div>
));

// Componente da lista de itens
const SortableList = SortableContainer(({ items }: { items: Item[] }) => (
  <div className="list">
    {items.map((value, index) => (
      <SortableItem key={`item-${index}`} index={index} value={value} />
    ))}
  </div>
));

const ListaArrastavel: React.FC = () => {
  // Estado das colunas
  const [column1Items, setColumn1Items] = useState<Item[]>(['Item 1', 'Item 2', 'Item 3']);
  const [column2Items, setColumn2Items] = useState<Item[]>(['Item A', 'Item B', 'Item C']);

  // Função chamada quando a ordem dos itens mudar
  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }, column: 1 | 2) => {
    if (column === 1) {
      setColumn1Items(arrayMove(column1Items, oldIndex, newIndex));
    } else if (column === 2) {
      setColumn2Items(arrayMove(column2Items, oldIndex, newIndex));
    }
  };

  return (
    <div className="app">
      <div className="column">
        <h3>Coluna 1</h3>
        <SortableList
          items={column1Items}
          onSortEnd={(args) => onSortEnd(args, 1)}
          axis="y"
        />
      </div>
      <div className="column">
        <h3>Coluna 2</h3>
        <SortableList
          items={column2Items}
          onSortEnd={(args) => onSortEnd(args, 2)}
          axis="y"
        />
      </div>
    </div>
  );
};

export default ListaArrastavel;
