import React, { useState } from 'react';
import './ContentBox.css';

interface ContentBoxProps {
  onSubmit: (exercise: string, weight: number) => void;
}

const CreateContentBox: React.FC<ContentBoxProps> = ({ onSubmit }) => {
  // Guarda o nome do exercício
  const [exercise, setExercise] = useState('');
  // Guarda o peso (pode estar vazio)
  const [weight, setWeight] = useState<number | ''>('');

  // Quando o formulário é enviado
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita recarregar a página

    // Se algum campo estiver vazio ou peso menor ou igual a 0, não envia
    if (exercise.trim() === '' || weight === '' || weight <= 0) {
      return;
    }

    // Envia os dados e limpa os campos
    onSubmit(exercise.trim(), Number(weight));
    setExercise('');
    setWeight('');
  };

  return (
    <form className="content-box" onSubmit={handleSubmit}>
      <input
        type="text"
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
        placeholder="Nome do Exercicio"
      />
      <input
        type="number"
        value={weight}
        onChange={(e) => {
          const val = e.target.value;
          setWeight(val === '' ? '' : Number(val));
        }}
        placeholder="Peso em kilos"
        min="0"
        step="1"
      />
      <button type="submit">Criar</button>
    </form>
  );
};

export default CreateContentBox;
