import {
  getExerciciosDoTreino,
  getSaudacao,
  getTreinoById,
  getTreinoDoDia,
  getTreinosPorNivel,
  getTotalMinutos,
  getTotalTreinosSemana,
} from '../services/fitgo';
import { calcularCargaKg, paraIso } from '../storage/sessao';
import { conquistasMock, exercises, progressoMock, treinos } from '../data/mockData';

describe('FitGo — camada de dados (mocks)', () => {
  it('possui exercícios e treinos cadastrados', () => {
    expect(exercises.length).toBeGreaterThan(0);
    expect(treinos.length).toBeGreaterThanOrEqual(6);
  });

  it('todos os exercicioIds dos treinos apontam para exercícios existentes', () => {
    for (const treino of treinos) {
      expect(getExerciciosDoTreino(treino).length).toBe(treino.exercicioIds.length);
    }
  });

  it('getTreinoById retorna undefined para id inexistente', () => {
    expect(getTreinoById('nao-existe')).toBeUndefined();
    expect(getTreinoById('tr-01')?.nome).toBe('Corpo Todo — Start');
  });
});

describe('FitGo — lógica de negócio', () => {
  it('getSaudacao varia conforme o horário', () => {
    expect(getSaudacao(new Date(2026, 8, 24, 8))).toBe('Bom dia');
    expect(getSaudacao(new Date(2026, 8, 24, 15))).toBe('Boa tarde');
    expect(getSaudacao(new Date(2026, 8, 24, 21))).toBe('Boa noite');
  });

  it('totais da semana batem com os mocks', () => {
    expect(getTotalTreinosSemana()).toBe(
      progressoMock.reduce((a, d) => a + d.treinosConcluidos, 0),
    );
    expect(getTotalMinutos()).toBe(progressoMock.reduce((a, d) => a + d.minutos, 0));
  });

  it('treino do dia respeita objetivo/nível do perfil', () => {
    const t = getTreinoDoDia({
      nome: 'Teste',
      email: 't@t.com',
      objetivo: 'Emagrecimento',
      nivel: 'Iniciante',
      equipamentos: [],
      premium: false,
    });
    expect(t.objetivo).toBe('Emagrecimento');
    expect(t.nivel).toBe('Iniciante');
  });

  it('conquistas possuem id único', () => {
    const ids = new Set(conquistasMock.map((c) => c.id));
    expect(ids.size).toBe(conquistasMock.length);
  });

  it('getTreinosPorNivel agrupa na ordem Iniciante → Avançado sem duplicar', () => {
    const grupos = getTreinosPorNivel();
    const niveisValidos = ['Iniciante', 'Intermediário', 'Avançado'];
    expect(grupos.map((g) => g.nivel)).toEqual(
      niveisValidos.filter((n) => treinos.some((t) => t.nivel === n)),
    );
    const total = grupos.reduce((acc, g) => acc + g.treinos.length, 0);
    expect(total).toBe(treinos.length);
  });
});

describe('FitGo — sessão de treino (storage)', () => {
  it('paraIso formata datas como yyyy-mm-dd', () => {
    expect(paraIso(new Date(2026, 8, 24))).toBe('2026-09-24');
    expect(paraIso(new Date(2026, 0, 5))).toBe('2026-01-05');
  });

  it('calcularCargaKg multiplica séries × reps × peso do nível', () => {
    expect(calcularCargaKg(3, '10-12', 'Iniciante')).toBe(300);
    expect(calcularCargaKg(4, '12 cada perna', 'Intermediário')).toBe(960);
    expect(calcularCargaKg(3, '30-45s', 'Iniciante')).toBe(900);
  });
});
