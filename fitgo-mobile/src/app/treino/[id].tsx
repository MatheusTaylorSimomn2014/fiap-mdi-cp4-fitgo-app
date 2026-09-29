import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FitGoButton } from '@/components/fitgo-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { nivelBadgeStyle } from '@/components/treino-card';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { getExerciciosDoTreino, getTreinoById } from '@/services/fitgo';
import { calcularCargaKg, registrarConclusaoTreino } from '@/storage/sessao';

/** Detalhe de um treino: lista de exercícios com séries/reps/descanso. */
export default function TreinoDetalheScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const treino = getTreinoById(id ?? '');
  const exercicios = treino ? getExerciciosDoTreino(treino) : [];
  const [concluido, setConcluido] = useState(false);
  const [resumo, setResumo] = useState('');

  async function concluirTreino() {
    if (!treino || concluido) return;
    const cargaKg = exercicios.reduce(
      (acc, ex) => acc + calcularCargaKg(ex.series, ex.repeticoes, treino.nivel),
      0,
    );
    const resultado = await registrarConclusaoTreino(treino.duracaoMinutos, cargaKg);
    setResumo(
      `+${resultado.minutos} min · +${resultado.cargaKg.toLocaleString('pt-BR')} kg — total de ${resultado.totalTreinosSemana} treinos na semana`,
    );
    setConcluido(true);
  }

  if (!treino) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ThemedText type="subtitle">Treino não encontrado 😕</ThemedText>
          <ThemedText themeColor="textSecondary">
            Volte na aba Treinos e escolha uma rotina válida.
          </ThemedText>
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <ThemedView style={[styles.badge, { backgroundColor: nivelBadgeStyle[treino.nivel] }]}>
            <ThemedText type="smallBold" style={styles.badgeText}>
              {treino.nivel}
            </ThemedText>
          </ThemedView>

          <ThemedText type="title" style={styles.titulo}>{treino.nome}</ThemedText>
          <ThemedText themeColor="textSecondary">{treino.descricao}</ThemedText>
          <ThemedText type="smallBold">
            ⏱ {treino.duracaoMinutos} min · 🎯 {treino.objetivo} · 💪 {exercicios.length} exercícios
          </ThemedText>

          <FitGoButton
            label={concluido ? 'Treino concluído ✅' : 'Concluir treino'}
            onPress={concluirTreino}
          />
          {concluido && (
            <ThemedText type="small" themeColor="textSecondary">
              {resumo}
            </ThemedText>
          )}

          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Exercícios
          </ThemedText>
          {exercicios.map((ex, i) => (
            <ThemedView key={ex.id} type="backgroundElement" style={styles.exerciseCard}>
              <ThemedText type="smallBold" themeColor="textSecondary">
                {String(i + 1).padStart(2, '0')} · {ex.grupoMuscular} · {ex.equipamento}
              </ThemedText>
              <ThemedText type="subtitle" style={styles.exerciseNome}>{ex.nome}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">{ex.descricao}</ThemedText>
              <ThemedText type="smallBold">
                {ex.series} séries × {ex.repeticoes} · descanso {ex.descansoSegundos}s
              </ThemedText>
            </ThemedView>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, alignItems: 'center', width: '100%' },
  scrollContent: {
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.six,
    gap: Spacing.three,
    alignSelf: 'center',
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
  },
  badgeText: { color: '#FDF9F3', fontSize: 12 },
  titulo: { fontSize: 32, lineHeight: 40 },
  sectionTitle: { marginTop: Spacing.four, fontSize: 24, lineHeight: 32 },
  exerciseCard: {
    borderRadius: Spacing.four,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  exerciseNome: { fontSize: 20, lineHeight: 28 },
});
