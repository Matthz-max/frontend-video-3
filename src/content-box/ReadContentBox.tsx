import React, { useState } from 'react';
import { GymRecord } from '../entities/GymRecord';
import './ReadContentBox.css';

interface ReadContentBoxProps {
  content: GymRecord;
  onUpdate: (record: GymRecord) => void;
  onDelete: (id: number) => void;
}

const ReadContentBox: React.FC<ReadContentBoxProps> = ({ content, onUpdate, onDelete }) => {
  // Estados locais para editar o exercício e o peso
  const [exercise, setExercise] = useState(content.exercise);
  const [weight, setWeight] = useState(content.weight);

  // Atualiza o registro com os novos valores
  const handleUpdateClick = () => {
    onUpdate({ ...content, exercise, weight });
  };

  // Deleta o registro atual
  const handleDeleteClick = () => {
    onDelete(content.id);
  };

  return (
    <div className="read-content-box">
      {/* Campo para editar o nome do exercício */}
      <p><strong>Exercicio:</strong></p>
      <input value={exercise} onChange={(e) => setExercise(e.target.value)} />

      {/* Campo para editar o peso */}
      <p><strong>Peso:</strong></p>
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(Number(e.target.value))}
      />

      {/* Botão para atualizar o registro */}
      <button onClick={handleUpdateClick}>Atualizar</button>

      {/* Botão para deletar o registro */}
      <button onClick={handleDeleteClick}>Deletar</button>
    </div>
  );
};

export default ReadContentBox;
