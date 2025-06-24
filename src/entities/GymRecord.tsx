// Interface que define a estrutura de um registro de academia (GymRecord)
export interface GymRecord {
    id: number;         // Identificador único do registro
    exercise: string;   // Nome do exercício realizado
    weight: number;     // Peso utilizado no exercício
    date: string;       // Data em que o registro foi criado (formato string)
}
