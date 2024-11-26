export interface Atividade {
    id: string;
    titulo_atividade: string;
    nome_projeto: string;
    cor_projeto: string;
}
  
export interface Coluna {
    id: number;
    nome_coluna: string;
    atividades: Atividade[];
}
  
export interface Projeto {
    id: number;
    titulo_projeto: string;
    desc_projeto: string;
    cor_projeto: string;
    porcentagem_atividade: number;
    atividades?: Atividade[];
}