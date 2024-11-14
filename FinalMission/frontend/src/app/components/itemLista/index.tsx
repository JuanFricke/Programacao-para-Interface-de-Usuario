import "./style.css";

interface PropsItem {
    titulo_atividade: string
    desc_atividade: string
    cor_projeto: string
}

 
export const ItemLista: React.FC<PropsItem> = ({ titulo_atividade, desc_atividade, cor_projeto }) => {
    return (
        <div className="container-item">
            <div className="info-atividade">
                <div className="titulo-atividade">{ titulo_atividade }</div>
                <div className="descricao-atividade">{ desc_atividade }</div>
            </div>
            <div className="identificador-atividade" style={{backgroundColor: cor_projeto}}></div>
        </div>
    );
}
