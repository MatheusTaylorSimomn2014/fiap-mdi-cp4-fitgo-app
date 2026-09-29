import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FitGoButton } from '@/components/fitgo-button';
import { OpcoesSelector } from '@/components/opcoes-selector';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, FitGoColors, MaxContentWidth, Spacing } from '@/constants/theme';
import { perfilMock } from '@/data/mockData';

/** Linha "chave / valor" dos dados de configuração do perfil. */
function InfoRow({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <View style={styles.infoRow}>
      <ThemedText type="small" themeColor="textSecondary">
        {rotulo}
      </ThemedText>
      <ThemedText type="smallBold">{valor}</ThemedText>
    </View>
  );
}

export default function PerfilScreen() {
  const inicial = perfilMock.nome.charAt(0).toUpperCase();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <ThemedView type="backgroundElement" style={styles.headerCard}>
            <ThemedView style={styles.avatar} type="backgroundSelected">
              <ThemedText type="subtitle">{inicial}</ThemedText>
            </ThemedView>
            <View style={styles.headerInfo}>
              <ThemedText type="subtitle" style={styles.nome}>
                {perfilMock.nome}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {perfilMock.email}
              </ThemedText>
            </View>
          </ThemedView>

          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Configurações de treino
          </ThemedText>
          <OpcoesSelector
            titulo="Objetivo"
            icones={[
              { icone: 'flame-outline', rotulo: 'Emagrecer', ativo: perfilMock.objetivo === 'Emagrecimento' },
              { icone: 'barbell-outline', rotulo: 'Ganhar massa', ativo: perfilMock.objetivo === 'Ganho de massa' },
              { icone: 'pulse-outline', rotulo: 'Condicionar', ativo: perfilMock.objetivo === 'Condicionamento' },
            ]}
          />
          <ThemedView type="backgroundElement" style={styles.card}>
            <InfoRow rotulo="Nível" valor={perfilMock.nivel} />
            <InfoRow rotulo="Equipamentos" valor={perfilMock.equipamentos.join(', ')} />
          </ThemedView>

          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Plano
          </ThemedText>
          <ThemedView type="backgroundElement" style={styles.card}>
            <View style={styles.infoRow}>
              <ThemedText type="smallBold">
                {perfilMock.premium ? 'FitGo Premium ✨' : 'FitGo Gratuito'}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {perfilMock.premium
                  ? 'Todos os recursos desbloqueados.'
                  : 'Treinos ilimitados, estatísticas detalhadas e sem anúncios por R$ 19,90/mês.'}
              </ThemedText>
            </View>
            {!perfilMock.premium && <FitGoButton label="Assinar Premium" />}
          </ThemedView>

          <FitGoButton label="Sair" variant="secondary" />
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
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    borderRadius: Spacing.four,
    padding: Spacing.four,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: FitGoColors.brown,
  },
  headerInfo: {
    flex: 1,
    gap: Spacing.half,
  },
  nome: {
    fontSize: 22,
    lineHeight: 30,
  },
  sectionTitle: {
    marginTop: Spacing.four,
    fontSize: 24,
    lineHeight: 32,
  },
  card: {
    borderRadius: Spacing.four,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  infoRow: {
    gap: Spacing.half,
  },
});
