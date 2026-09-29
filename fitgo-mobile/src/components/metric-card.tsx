import { StyleSheet, View } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Spacing } from '@/constants/theme';

type MetricCardProps = {
  valor: string;
  rotulo: string;
};

/** Card de métrica rápida usado na Home e no Progresso. */
export function MetricCard({ valor, rotulo }: MetricCardProps) {
  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <View style={styles.valueRow}>
        <ThemedText type="subtitle">{valor}</ThemedText>
      </View>
      <ThemedText type="small" themeColor="textSecondary">
        {rotulo}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: Spacing.four,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
});
