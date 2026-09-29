import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MetricCard } from '@/components/metric-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, FitGoColors, MaxContentWidth, Spacing } from '@/constants/theme';
import { conquistasMock } from '@/data/mockData';
import { ProgressoDia } from '@/data/types';
import { getTotalMinutos, getTotalTreinosSemana } from '@/services/fitgo';
import { carregarProgresso } from '@/storage/sessao';

/** Converte "yyyy-mm-dd" em "dd/mm". */
function formatarDia(iso: string): string {
  const [, mes, dia] = iso.split('-');
  return `${dia}/${mes}`;
}

export default function ProgressoScreen() {
  const [dias, setDias] = useState<ProgressoDia[]>([]);

  useEffect(() => {
    carregarProgresso().then(setDias);
  }, []);

  const maxCarga = Math.max(...dias.map((d) => d.cargaTotalKg), 1);
  const cargaAcumulada = dias.reduce((acc, d) => acc + d.cargaTotalKg, 0);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <ThemedText type="subtitle">Progresso</ThemedText>
          <ThemedText themeColor="textSecondary">
            Acompanhe sua evolução semana a semana.
          </ThemedText>

          <View style={styles.metricsRow}>
            <MetricCard valor={String(getTotalTreinosSemana(dias))} rotulo="treinos na semana" />
            <MetricCard valor={`${getTotalMinutos(dias)} min`} rotulo="tempo treinando" />
          </View>
          <MetricCard valor={`${cargaAcumulada.toLocaleString('pt-BR')} kg`} rotulo="carga acumulada levantada" />

          <ThemedView type="backgroundElement" style={styles.chartCard}>
            <ThemedText type="smallBold" themeColor="textSecondary">
              CARGA POR DIA (KG)
            </ThemedText>
            <View style={styles.chart}>
              {dias.map((dia) => (
                <View key={dia.data} style={styles.barWrapper}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: Math.max(4, (dia.cargaTotalKg / maxCarga) * 120),
                        backgroundColor:
                          dia.cargaTotalKg > 0 ? FitGoColors.brown : FitGoColors.beigeGray,
                      },
                    ]}
                  />
                  <ThemedText type="small" themeColor="textSecondary" style={styles.barLabel}>
                    {formatarDia(dia.data)}
                  </ThemedText>
                </View>
              ))}
            </View>
          </ThemedView>

          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Conquistas
          </ThemedText>
          {conquistasMock.map((c) => (
            <ThemedView key={c.id} type="backgroundElement" style={styles.conquistaCard}>
              <ThemedText style={styles.conquistaIcone}>{c.icone}</ThemedText>
              <View style={styles.conquistaInfo}>
                <ThemedText type="smallBold">
                  {c.titulo} {c.desbloqueada ? '✅' : '🔒'}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {c.descricao}
                  {c.desbloqueada && c.data ? ` — ${formatarDia(c.data)}` : ''}
                </ThemedText>
              </View>
            </ThemedView>
          ))}
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
  metricsRow: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  chartCard: {
    borderRadius: Spacing.four,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  barWrapper: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.one,
  },
  bar: {
    width: '70%',
    borderRadius: Spacing.one,
  },
  barLabel: {
    fontSize: 10,
  },
  sectionTitle: {
    marginTop: Spacing.four,
    fontSize: 24,
    lineHeight: 32,
  },
  conquistaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Spacing.four,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  conquistaIcone: {
    fontSize: 28,
  },
  conquistaInfo: {
    flex: 1,
    gap: Spacing.half,
  },
});
