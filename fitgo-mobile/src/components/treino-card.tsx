import { Link } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Spacing } from '@/constants/theme';
import { Nivel, Treino } from '@/data/types';

type TreinoCardProps = {
  treino: Treino;
  /** Quando informado, o card navega para esta rota (ex.: /treino/tr-01). */
  href?: string;
  onPress?: () => void;
};

export const nivelBadgeStyle: Record<Nivel, string> = {
  Iniciante: '#B4A390',
  Intermediário: '#8B695C',
  Avançado: '#0B0A0A',
};

function CardInterior({ treino }: { treino: Treino }) {
  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <ThemedView style={[styles.badge, { backgroundColor: nivelBadgeStyle[treino.nivel] }]}>
        <ThemedText type="smallBold" style={styles.badgeText}>
          {treino.nivel}
        </ThemedText>
      </ThemedView>

      <ThemedText type="subtitle" style={styles.nome}>
        {treino.nome}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.descricao}>
        {treino.descricao}
      </ThemedText>

      <ThemedText type="smallBold">
        ⏱ {treino.duracaoMinutos} min · 💪 {treino.exercicioIds.length} exercícios
      </ThemedText>

      <ThemedView type="backgroundSelected" style={styles.cta}>
        <ThemedText type="smallBold">Iniciar treino</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

/** Card de lista de treino (nome, duração estimada, nível e ação de iniciar). */
export function TreinoCard({ treino, href, onPress }: TreinoCardProps) {
  if (href) {
    return (
      <Link href={href} asChild>
        <Pressable style={({ pressed }) => pressed && styles.pressed}>
          <CardInterior treino={treino} />
        </Pressable>
      </Link>
    );
  }

  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      <CardInterior treino={treino} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.four,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  pressed: {
    opacity: 0.8,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
  },
  badgeText: {
    color: '#FDF9F3',
    fontSize: 12,
  },
  nome: {
    fontSize: 22,
    lineHeight: 30,
  },
  descricao: {},
  cta: {
    marginTop: Spacing.one,
    borderRadius: Spacing.three,
    paddingVertical: Spacing.two,
    alignItems: 'center',
  },
});
