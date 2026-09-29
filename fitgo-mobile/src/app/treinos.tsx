import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TreinoCard } from '@/components/treino-card';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { getTreinosPorNivel } from '@/services/fitgo';

export default function TreinosScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <ThemedText type="subtitle">Treinos</ThemedText>
          <ThemedText themeColor="textSecondary">
            Rotinas organizadas por nível — escolha a sua e comece agora.
          </ThemedText>

          {getTreinosPorNivel().map(({ nivel, treinos: doNivel }) => (
            <ThemedView key={nivel} style={styles.section}>
              <ThemedText type="smallBold" themeColor="textSecondary">
                {nivel.toUpperCase()} · {doNivel.length}{' '}
                {doNivel.length === 1 ? 'treino' : 'treinos'}
              </ThemedText>
              {doNivel.map((treino) => (
                <TreinoCard
                  key={treino.id}
                  treino={treino}
                  href={`/treino/${treino.id}`}
                />
              ))}
            </ThemedView>
          ))}

          <ThemedText type="small" themeColor="textSecondary" style={styles.footer}>
            Novos treinos premium chegam toda semana 🚀
          </ThemedText>
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
  section: {
    gap: Spacing.three,
    marginTop: Spacing.four,
  },
  footer: {
    textAlign: 'center',
    marginTop: Spacing.four,
  },
});
