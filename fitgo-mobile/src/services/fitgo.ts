import { exercises, perfilMock, progressoMock, treinos } from '@/data/mockData';
import { Exercise, Nivel, PerfilUsuario, ProgressoDia, Treino } from '@/data/types';

/**
 * Lógica de negócio (recomendação personalizada) do FitGo.
 *
 * Nesta fase os dados vêm de mocks; quando a API existir, basta trocar as
 * importações acima por chamadas assíncronas mantendo as mesmas assinaturas.
 */

/** Saudação dinâmica conforme o horário atual ("Bom dia/Boa tarde/Boa noite"). */
export function getSaudacao(date = new Date()): string {
  const hora = date.getHours();
  if (hora < 12) return 'Bom dia';
  if (hora < 18) return 'Boa tarde';
  return 'Boa noite';
}

/** Total de treinos concluídos na semana dos dados mockados. */
export function getTotalTreinosSemana(progresso: ProgressoDia[] = progressoMock): number {
  return progresso.reduce((acc, dia) => acc + dia.treinosConcluidos, 0);
}

/** Total de minutos treinados no período. */
export function getTotalMinutos(progresso: ProgressoDia[] = progressoMock): number {
  return progresso.reduce((acc, dia) => acc + dia.minutos, 0);
}

/**
 * Sugere o treino do dia com base no objetivo e nível do usuário:
 * 1. prioriza treinos que batem com o objetivo;
 * 2. depois os que estão no mesmo nível ou abaixo;
 * 3. faz um rodízio determinístico pelo dia do ano para variar a sugestão.
 */
export function getTreinoDoDia(perfil: PerfilUsuario = perfilMock): Treino {
  const compativeisObjetivo = treinos.filter((t) => t.objetivo === perfil.objetivo);
  const pool = compativeisObjetivo.length > 0 ? compativeisObjetivo : treinos;

  const niveisAceitos: Record<string, string[]> = {
    Iniciante: ['Iniciante'],
    Intermediário: ['Intermediário', 'Iniciante'],
    Avançado: ['Avançado', 'Intermediário', 'Iniciante'],
  };
  const filtrados = pool.filter((t) => niveisAceitos[perfil.nivel]?.includes(t.nivel));
  const candidatos = filtrados.length > 0 ? filtrados : pool;

  const inicioAno = new Date(new Date().getFullYear(), 0, 0);
  const diaDoAno = Math.floor(
    (new Date().getTime() - inicioAno.getTime()) / (1000 * 60 * 60 * 24)
  );
  return candidatos[diaDoAno % candidatos.length];
}

/** Retorna os exercícios de um treino, preservando a ordem definida. */
export function getExerciciosDoTreino(treino: Treino): Exercise[] {
  return treino.exercicioIds
    .map((id) => exercises.find((ex) => ex.id === id))
    .filter((ex): ex is Exercise => ex != null);
}

/** Busca um treino pelo id. */
export function getTreinoById(id: string): Treino | undefined {
  return treinos.find((t) => t.id === id);
}

/** Agrupa o catálogo de treinos por nível, na ordem Iniciante → Avançado. */
export function getTreinosPorNivel(
  lista: Treino[] = treinos,
): { nivel: Nivel; treinos: Treino[] }[] {
  const ordem: Nivel[] = ['Iniciante', 'Intermediário', 'Avançado'];
  return ordem
    .map((nivel) => ({ nivel, treinos: lista.filter((t) => t.nivel === nivel) }))
    .filter((grupo) => grupo.treinos.length > 0);
}
