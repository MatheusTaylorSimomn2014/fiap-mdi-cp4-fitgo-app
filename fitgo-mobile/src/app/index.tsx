import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FitGoButton } from '@/components/fitgo-button';
import { MetricCard } from '@/components/metric-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { perfilMock, streakAtual } from '@/data/mockData';
import { ProgressoDia } from '@/data/types';
import { getSaudacao, getTreinoDoDia, getTotalMinutos, getTotalTreinosSemana } from '@/services/fitgo';
import { carregarProgresso } from '@/storage/sessao';

export default function HomeScreen() {
  const treino = getTreinoDoDia(perfilMock);
  const [dias, setDias] = useState<ProgressoDia[]>([]);

  useEffect(() => {
    carregarProgresso().then(setDias);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <ThemedText type="subtitle">
            {getSaudacao()}, {perfilMock.nome.split(' ')[0]}!
          </ThemedText>
          <ThemedText themeColor="textSecondary">Pronto para o treino de hoje? 💪</ThemedText>

          <ThemedView type="backgroundElement" style={styles.heroCard}>
            <ThemedText type="smallBold" themeColor="textSecondary">
              TREINO DO DIA · {treino.nivel.toUpperCase()}
            </ThemedText>
            <ThemedText type="title" style={styles.heroTitle}>
              {treino.nome}
            </ThemedText>
            <ThemedText style={styles.heroDescription}>{treino.descricao}</ThemedText>
            <ThemedText type="smallBold">
              ⏱ {treino.duracaoMinutos} min · 🎯 {treino.objetivo} · 💪{' '}
              {treino.exercicioIds.length} exercícios
            </ThemedText>
            <Link href={`/treino/${treino.id}`} asChild>
              <FitGoButton label="Iniciar agora" />
            </Link>
          </ThemedView>

          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Sua semana
          </ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.metricsRow}>
            <MetricCard valor={String(getTotalTreinosSemana(dias))} rotulo="treinos concluídos" />
            <MetricCard valor={`${streakAtual} dias`} rotulo="streak atual 🔥" />
            <MetricCard valor={`${getTotalMinutos(dias)} min`} rotulo="de treino na semana" />
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  scrollContent: {
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.six,
    gap: Spacing.three,
    alignSelf: 'center',
  },
  heroCard: {
    borderRadius: Spacing.five,
    padding: Spacing.four,
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  heroTitle: {
    fontSize: 32,
    lineHeight: 40,
  },
  heroDescription: {
    opacity: 0.9,
  },
  sectionTitle: {
    marginTop: Spacing.four,
    fontSize: 24,
    lineHeight: 32,
  },
  metricsRow: {
    gap: Spacing.three,
    paddingVertical: Spacing.one,
  },
});
