import React from 'react';
import './VerticalContainer.css';

// Define os tipos de props esperadas pelo componente
interface VerticalContainerProps {
    children: React.ReactNode; // O componente aceita qualquer conteúdo React dentro dele
}

// Componente funcional que simplesmente envolve seus filhos em uma div com classe "vertical-container"
const VerticalContainer: React.FC<VerticalContainerProps> = ({ children }) => {
    return (
        <div className="vertical-container">
            {children}  {/* Renderiza o conteúdo passado dentro do container */}
        </div>
    );
};

export default VerticalContainer;
