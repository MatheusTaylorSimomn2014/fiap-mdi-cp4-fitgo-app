/**
 * Tipos de domínio do FitGo.
 */

export type Nivel = 'Iniciante' | 'Intermediário' | 'Avançado';

export type Objetivo = 'Emagrecimento' | 'Ganho de massa' | 'Condicionamento';

export type GrupoMuscular =
  | 'Peito'
  | 'Costas'
  | 'Pernas'
  | 'Braços'
  | 'Ombros'
  | 'Abdômen'
  | 'Corpo todo';

export interface Exercise {
  id: string;
  nome: string;
  descricao: string;
  grupoMuscular: GrupoMuscular;
  nivel: Nivel;
  series: number;
  repeticoes: string;
  descansoSegundos: number;
  equipamento: string;
}

export interface Treino {
  id: string;
  nome: string;
  descricao: string;
  nivel: Nivel;
  objetivo: Objetivo;
  duracaoMinutos: number;
  exercicioIds: string[];
}

export interface PerfilUsuario {
  nome: string;
  email: string;
  objetivo: Objetivo;
  nivel: Nivel;
  equipamentos: string[];
  premium: boolean;
}

export interface ProgressoDia {
  data: string; // ISO yyyy-mm-dd
  treinosConcluidos: number;
  minutos: number;
  cargaTotalKg: number;
}

export interface Conquista {
  id: string;
  titulo: string;
  descricao: string;
  icone: string;
  desbloqueada: boolean;
  data?: string;
}
