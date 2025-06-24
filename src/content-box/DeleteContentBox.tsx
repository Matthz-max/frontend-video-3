import React from 'react';

import './ContentBox.css';

import {GymRecord} from '../entities/GymRecord';

// Props para o componente DeleteContentBox:
// onSubmit: função que recebe o id para deletar o registro
// content: o registro (exercício) a ser exibido
interface ContentBoxProps {
    onSubmit: (id: number) => void;
    content: GymRecord;
}

const DeleteContentBox: React.FC<ContentBoxProps> = ({ onSubmit, content }) => {
    // Guarda localmente o registro recebido via props
    const [record, setRecord] = React.useState<GymRecord>(content);

    // Função para formatar a data no formato YYYY/MM/DD
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    // Ao clicar no botão, chama a função onSubmit com o id do registro para deletar
    const handleSubmit = () => {
        onSubmit(record.id);
    };

    return (
        <div className="content-box">
            {/* Mostra informações do registro */}
            <p>Exercise: {record.exercise}</p>
            <p>Weight: {record.weight} kg</p>
            <p>When: {formatDate(record.date)}</p>
            {/* Botão para deletar o registro */}
            <button onClick={handleSubmit}>Delete</button>
        </div>
    );
};

export default DeleteContentBox;
