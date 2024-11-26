export interface Atividade {
    id: string;
    titulo_atividade: string;
    desc_atividade: string;
    cor_projeto: string;
    feito: boolean;
}
  
export interface Coluna {
    id: number;
    nome_coluna: string;
    atividades: Atividade[];
  }