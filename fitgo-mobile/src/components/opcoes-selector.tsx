import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { FitGoColors, Spacing } from '@/constants/theme';

type IconeOpcao = {
  icone: ComponentProps<typeof Ionicons>['name'];
  rotulo: string;
  ativo?: boolean;
};

type Props = {
  titulo: string;
  icones: IconeOpcao[];
};

/** Seletor visual de objetivo (emagrecimento / massa / condicionamento) do Perfil. */
export function OpcoesSelector({ titulo, icones }: Props) {
  return (
    <ThemedView type="backgroundElement" style={styles.container}>
      <ThemedText type="smallBold" themeColor="textSecondary">
        {titulo.toUpperCase()}
      </ThemedText>
      <View style={styles.row}>
        {icones.map((opcao) => (
          <ThemedView
            key={opcao.rotulo}
            style={[styles.item, opcao.ativo && styles.itemAtivo]}>
            <Ionicons
              name={opcao.icone}
              size={22}
              color={opcao.ativo ? FitGoColors.offWhite : FitGoColors.brown}
            />
            <ThemedText
              type="small"
              themeColor={opcao.ativo ? 'background' : 'text'}
              style={styles.label}>
              {opcao.rotulo}
            </ThemedText>
          </ThemedView>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Spacing.four,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.two,
    borderRadius: Spacing.three,
    backgroundColor: FitGoColors.offWhite,
    gap: Spacing.half,
  },
  itemAtivo: {
    backgroundColor: FitGoColors.black,
  },
  label: {
    fontSize: 12,
  },
});
