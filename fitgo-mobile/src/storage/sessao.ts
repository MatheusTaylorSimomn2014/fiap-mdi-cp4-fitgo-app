import AsyncStorage from '@react-native-async-storage/async-storage';

import { progressoMock, streakAtual } from '@/data/mockData';
import { ProgressoDia } from '@/data/types';

/**
 * Persistência local da sessão de treinos (sem backend nesta fase).
 *
 * Toda a leitura passa por aqui: se nunca houve um "Concluir treino",
 * caímos nos dados mockados da semana — mantendo o protótipo funcional
 * mesmo antes de qualquer interação do usuário.
 */

const CHAVE_PROGRESSO = 'fitgo:progresso:v1';

export type ConcluirTreinoResultado = {
  data: string;
  minutos: number;
  cargaKg: number;
  totalTreinosSemana: number;
  cargaAcumuladaKg: number;
  streakDias: number;
};

/** Formata uma data como `yyyy-mm-dd` (mesmo formato dos mocks). */
export function paraIso(date: Date): string {
  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const dia = String(date.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

/** Carga estimada levantada em um treino (séries × reps × peso médio por nível). */
export function calcularCargaKg(
  series: number,
  repeticoes: string,
  nivel: string,
): number {
  const pesoPorNivel: Record<string, number> = {
    Iniciante: 10,
    Intermediário: 20,
    Avançado: 30,
  };
  const primeiroNumero = Number.parseInt(repeticoes.replace(',', '.'), 10);
  const reps = Number.isFinite(primeiroNumero) ? primeiroNumero : 10;
  return Math.round(series * reps * (pesoPorNivel[nivel] ?? 15));
}

/** Lê o progresso persistido; usa os mocks da semana quando não há sessão salva. */
export async function carregarProgresso(): Promise<ProgressoDia[]> {
  try {
    const salvo = await AsyncStorage.getItem(CHAVE_PROGRESSO);
    if (!salvo) return progressoMock;
    const parsed = JSON.parse(salvo) as ProgressoDia[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : progressoMock;
  } catch {
    return progressoMock;
  }
}

/** Registra a conclusão de um treino no dia atual e retorna o resumo da sessão. */
export async function registrarConclusaoTreino(
  duracaoMinutos: number,
  cargaKg: number,
): Promise<ConcluirTreinoResultado> {
  const progresso = await carregarProgresso();
  const hoje = paraIso(new Date());
  const indice = progresso.findIndex((d) => d.data === hoje);

  if (indice >= 0) {
    const dia = progresso[indice];
    progresso[indice] = {
      ...dia,
      treinosConcluidos: dia.treinosConcluidos + 1,
      minutos: dia.minutos + duracaoMinutos,
      cargaTotalKg: dia.cargaTotalKg + cargaKg,
    };
  } else {
    progresso.push({
      data: hoje,
      treinosConcluidos: 1,
      minutos: duracaoMinutos,
      cargaTotalKg: cargaKg,
    });
    progresso.sort((a, b) => a.data.localeCompare(b.data));
  }

  await AsyncStorage.setItem(CHAVE_PROGRESSO, JSON.stringify(progresso));

  const ultimoComTreino = [...progresso].reverse().find((d) => d.treinosConcluidos > 0);
  return {
    data: hoje,
    minutos: duracaoMinutos,
    cargaKg,
    totalTreinosSemana: progresso.reduce((acc, d) => acc + d.treinosConcluidos, 0),
    cargaAcumuladaKg: progresso.reduce((acc, d) => acc + d.cargaTotalKg, 0),
    streakDias: ultimoComTreino?.data === hoje ? streakAtual : 0,
  };
}

/** Limpa a sessão persistida (volta aos dados mockados). */
export async function limparSessao(): Promise<void> {
  await AsyncStorage.removeItem(CHAVE_PROGRESSO);
}
