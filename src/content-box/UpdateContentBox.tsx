import React from 'react';

import './ContentBox.css';

import {GymRecord} from '../entities/GymRecord';

// Props do componente UpdateContentBox: recebe uma função onSubmit e um registro (content) para editar
interface ContentBoxProps {
    onSubmit: (record: GymRecord) => void;
    content: GymRecord;
}

const UpdateContentBox: React.FC<ContentBoxProps> = ({ onSubmit, content }) => {
    // Estado local para armazenar o registro que será editado
    const [record, setRecord] = React.useState<GymRecord>(content);

    // Função para formatar a data do registro no formato YYYY/MM/DD
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    // Chama onSubmit passando o registro atualizado ao clicar no botão
    const handleSubmit = () => {
        onSubmit(record);
    };

    return (
        <div className="content-box">
            {/* Input para editar o nome do exercício */}
            <input
                type="text"
                value={record.exercise}
                onChange={(e) => setRecord({...record, exercise: e.target.value})}
                placeholder="Exercise name"
            />
            {/* Input para editar o peso */}
            <input
                type="number"
                value={record.weight}
                onChange={(e) => setRecord({...record, weight: parseInt(e.target.value)})}
                placeholder="Weight in Kg"
            />
            {/* Exibe a data formatada */}
            <p>When: {formatDate(record.date)}</p>
            {/* Botão para enviar atualização */}
            <button onClick={handleSubmit}>Update</button>
        </div>
    );
};

export default UpdateContentBox;
