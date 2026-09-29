import {
  Conquista,
  Exercise,
  PerfilUsuario,
  ProgressoDia,
  Treino,
} from './types';

/**
 * Dados mockados do FitGo — usados no lugar de uma API real nesta fase do projeto.
 */

export const exercises: Exercise[] = [
  {
    id: 'ex-01',
    nome: 'Flexão de braço',
    descricao:
      'Deite de bruços, apoie as mãos na largura dos ombros e empurre o corpo até estender os braços, mantendo o abdômen contraído.',
    grupoMuscular: 'Peito',
    nivel: 'Iniciante',
    series: 3,
    repeticoes: '10-12',
    descansoSegundos: 45,
    equipamento: 'Nenhum',
  },
  {
    id: 'ex-02',
    nome: 'Agachamento livre',
    descricao:
      'Pés na largura dos ombros, desça o quadril como se fosse sentar, mantendo a coluna reta e os joelhos alinhados com os pés.',
    grupoMuscular: 'Pernas',
    nivel: 'Iniciante',
    series: 4,
    repeticoes: '12-15',
    descansoSegundos: 60,
    equipamento: 'Nenhum',
  },
  {
    id: 'ex-03',
    nome: 'Prancha isométrica',
    descricao:
      'Apoie antebraços e pontas dos pés no chão, mantendo o corpo reto como uma tábua. Contraia o abdômen durante toda a execução.',
    grupoMuscular: 'Abdômen',
    nivel: 'Iniciante',
    series: 3,
    repeticoes: '30-45s',
    descansoSegundos: 30,
    equipamento: 'Nenhum',
  },
  {
    id: 'ex-04',
    nome: 'Remada unilateral',
    descricao:
      'Com um joelho apoiado no banco, puxe o halter em direção ao quadril contraindo as escápulas. Troque de lado ao final da série.',
    grupoMuscular: 'Costas',
    nivel: 'Intermediário',
    series: 4,
    repeticoes: '10 cada lado',
    descansoSegundos: 60,
    equipamento: 'Halter',
  },
  {
    id: 'ex-05',
    nome: 'Afundo alternado',
    descricao:
      'Dê um passo à frente e desça o joelho de trás quase até o chão. Alterne as pernas a cada repetição.',
    grupoMuscular: 'Pernas',
    nivel: 'Intermediário',
    series: 3,
    repeticoes: '12 cada perna',
    descansoSegundos: 60,
    equipamento: 'Halter',
  },
  {
    id: 'ex-06',
    nome: 'Desenvolvimento de ombros',
    descricao:
      'Sentado ou em pé, empurre os halteres da altura das orelhas até a extensão completa dos braços acima da cabeça.',
    grupoMuscular: 'Ombros',
    nivel: 'Intermediário',
    series: 4,
    repeticoes: '10-12',
    descansoSegundos: 60,
    equipamento: 'Halter',
  },
  {
    id: 'ex-07',
    nome: 'Rosca direta',
    descricao:
      'Em pé, cotovelos colados ao corpo, flexione os antebraços elevando a barra até contrair o bíceps. Desça controladamente.',
    grupoMuscular: 'Braços',
    nivel: 'Iniciante',
    series: 3,
    repeticoes: '12',
    descansoSegundos: 45,
    equipamento: 'Barra',
  },
  {
    id: 'ex-08',
    nome: 'Supino reto',
    descricao:
      'Deitado no banco, puxe a barra até o peito e empurre até estender os braços, com escápulas retraídas.',
    grupoMuscular: 'Peito',
    nivel: 'Avançado',
    series: 5,
    repeticoes: '8-10',
    descansoSegundos: 90,
    equipamento: 'Barra + Banco',
  },
  {
    id: 'ex-09',
    nome: 'Levantamento terra',
    descricao:
      'Pés afastados, barra à frente. Empurre o chão com os pés estendendo quadril e joelhos, mantendo a coluna neutra.',
    grupoMuscular: 'Costas',
    nivel: 'Avançado',
    series: 4,
    repeticoes: '6-8',
    descansoSegundos: 90,
    equipamento: 'Barra',
  },
  {
    id: 'ex-10',
    nome: 'Burpee',
    descricao:
      'Agache, jogue os pés para trás em posição de flexão, retorne e salte explosivamente. Excelente para condicionamento.',
    grupoMuscular: 'Corpo todo',
    nivel: 'Avançado',
    series: 4,
    repeticoes: '15',
    descansoSegundos: 45,
    equipamento: 'Nenhum',
  },
  {
    id: 'ex-11',
    nome: 'Abdominal bicicleta',
    descricao:
      'Deitado, alterne cotovelo e joelho opostos em movimento fluido, tocando levemente e girando o tronco.',
    grupoMuscular: 'Abdômen',
    nivel: 'Iniciante',
    series: 3,
    repeticoes: '20',
    descansoSegundos: 30,
    equipamento: 'Nenhum',
  },
  {
    id: 'ex-12',
    nome: 'Polichinelo',
    descricao:
      'Salte abrindo braços e pernas simultaneamente. Aquecimento clássico para elevar a frequência cardíaca.',
    grupoMuscular: 'Corpo todo',
    nivel: 'Iniciante',
    series: 3,
    repeticoes: '40',
    descansoSegundos: 30,
    equipamento: 'Nenhum',
  },
];

export const treinos: Treino[] = [
  {
    id: 'tr-01',
    nome: 'Corpo Todo — Start',
    descricao: 'Treino rápido de adaptação para quem está começando a treinar em casa.',
    nivel: 'Iniciante',
    objetivo: 'Condicionamento',
    duracaoMinutos: 25,
    exercicioIds: ['ex-12', 'ex-02', 'ex-01', 'ex-03', 'ex-11'],
  },
  {
    id: 'tr-02',
    nome: 'Queima Total',
    descricao: 'Circuito metabólico focado em gasto calórico e resistência.',
    nivel: 'Iniciante',
    objetivo: 'Emagrecimento',
    duracaoMinutos: 30,
    exercicioIds: ['ex-12', 'ex-10', 'ex-03', 'ex-02', 'ex-11'],
  },
  {
    id: 'tr-03',
    nome: 'Empurrar — Peito & Ombros',
    descricao: 'Movimentos de empurrar para desenvolver peito, ombros e tríceps.',
    nivel: 'Intermediário',
    objetivo: 'Ganho de massa',
    duracaoMinutos: 45,
    exercicioIds: ['ex-01', 'ex-06', 'ex-08'],
  },
  {
    id: 'tr-04',
    nome: 'Puxar — Costas & Bíceps',
    descricao: 'Remadas e rosca direta para postura e força de puxada.',
    nivel: 'Intermediário',
    objetivo: 'Ganho de massa',
    duracaoMinutos: 45,
    exercicioIds: ['ex-04', 'ex-07', 'ex-09'],
  },
  {
    id: 'tr-05',
    nome: 'Pernas de Aço',
    descricao: 'Agachamentos e afundos para força e volume de membros inferiores.',
    nivel: 'Avançado',
    objetivo: 'Ganho de massa',
    duracaoMinutos: 50,
    exercicioIds: ['ex-02', 'ex-05', 'ex-09'],
  },
  {
    id: 'tr-06',
    nome: 'HIIT Explosivo',
    descricao: 'Tiros de alta intensidade para condicionar e queimar em pouco tempo.',
    nivel: 'Avançado',
    objetivo: 'Emagrecimento',
    duracaoMinutos: 20,
    exercicioIds: ['ex-10', 'ex-12', 'ex-03'],
  },
];

export const perfilMock: PerfilUsuario = {
  nome: 'Alex Silva',
  email: 'alex@fitgo.app',
  objetivo: 'Condicionamento',
  nivel: 'Intermediário',
  equipamentos: ['Halter', 'Barra', 'Banco'],
  premium: false,
};

export const progressoMock: ProgressoDia[] = [
  { data: '2026-09-17', treinosConcluidos: 1, minutos: 25, cargaTotalKg: 320 },
  { data: '2026-09-18', treinosConcluidos: 0, minutos: 0, cargaTotalKg: 0 },
  { data: '2026-09-19', treinosConcluidos: 1, minutos: 45, cargaTotalKg: 640 },
  { data: '2026-09-20', treinosConcluidos: 1, minutos: 30, cargaTotalKg: 410 },
  { data: '2026-09-21', treinosConcluidos: 2, minutos: 50, cargaTotalKg: 890 },
  { data: '2026-09-22', treinosConcluidos: 1, minutos: 20, cargaTotalKg: 260 },
  { data: '2026-09-23', treinosConcluidos: 1, minutos: 45, cargaTotalKg: 720 },
];

export const conquistasMock: Conquista[] = [
  {
    id: 'ct-01',
    titulo: 'Primeiro treino',
    descricao: 'Concluiu o primeiro treino no app.',
    icone: '🏁',
    desbloqueada: true,
    data: '2026-09-17',
  },
  {
    id: 'ct-02',
    titulo: 'Semana ativa',
    descricao: 'Treinou 5 dias na mesma semana.',
    icone: '🔥',
    desbloqueada: true,
    data: '2026-09-21',
  },
  {
    id: 'ct-03',
    titulo: 'Mil kilos',
    descricao: 'Acumulou 1.000 kg de carga levantada.',
    icone: '🏋️',
    desbloqueada: false,
  },
  {
    id: 'ct-04',
    titulo: 'Consistência total',
    descricao: 'Mantenha um streak de 30 dias seguidos.',
    icone: '📅',
    desbloqueada: false,
  },
];

/** Streak atual (dias consecutivos com treino concluído). */
export const streakAtual = 3;
