import React from "react";
import './App.css';
import VerticalContainer from '../vertical-container/VerticalContainer';
import CreateContentBox from '../content-box/CreateContentBox';
import ReadContentBox from '../content-box/ReadContentBox';
import { GymRecord } from '../entities/GymRecord';

export function App() {
  // Estado para armazenar lista de registros (exercícios)
  const [records, setRecords] = React.useState<GymRecord[]>([]);

  // Ao montar o componente, busca os registros do backend via GET
  React.useEffect(() => {
    fetch("http://localhost:8080/gym/records", { method: "GET" })
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        if (data !== null) setRecords(data); // Atualiza o estado com os registros recebidos
      });
  }, []);

  // Função chamada ao criar um novo exercício
  const handleCreateSubmit = (exercise: string, weight: number) => {
    fetch("http://localhost:8080/gym/records", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ exercise, weight }) // Envia dados no corpo da requisição
    }).then(response => response.ok ? response.json() : null)
      .then(data => {
        if (data !== null) setRecords(prev => [...prev, data]); // Adiciona novo registro na lista
      });
  };

  // Função chamada para atualizar um exercício existente
  const handleUpdateSubmit = (recordToUpdate: GymRecord) => {
    fetch(`http://localhost:8080/gym/records/${recordToUpdate.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ exercise: recordToUpdate.exercise, weight: recordToUpdate.weight })
    }).then(response => response.ok ? response.json() : null)
      .then(data => {
        if (data !== null) {
          // Atualiza o registro na lista substituindo pelo retorno atualizado
          setRecords(prev => prev.map(record => record.id === data.id ? data : record));
        }
      });
  };

  // Função chamada para deletar um exercício pelo id
  const handleDeleteSubmit = (id: number) => {
    fetch(`http://localhost:8080/gym/records/${id}`, {
      method: "DELETE"
    }).then(response => response.ok ? response.json() : null)
      .then(data => {
        if (data !== null) {
          // Remove o registro deletado da lista
          setRecords(prev => prev.filter(record => record.id !== data.id));
        }
      });
  };

  return (
    <div className="main-component">
      {/* Área para criar novos exercícios */}
      <VerticalContainer>
        <h2>Criar</h2>
        <CreateContentBox onSubmit={handleCreateSubmit} />
      </VerticalContainer>

      {/* Área para mostrar, atualizar e deletar exercícios */}
      <VerticalContainer>
        <h2>Exercícios</h2>
        {records.length > 0 ? (
          <div className="records-grid">
            {/* Mapeia e renderiza um ReadContentBox para cada registro */}
            {records.map(record => (
              <ReadContentBox
                key={record.id}
                content={record}
                onUpdate={handleUpdateSubmit}
                onDelete={handleDeleteSubmit}
              />
            ))}
          </div>
        ) : (
          <p>Nenhum registro encontrado.</p> // Mensagem quando não há registros
        )}
      </VerticalContainer>
    </div>
  );
}

export default App;
