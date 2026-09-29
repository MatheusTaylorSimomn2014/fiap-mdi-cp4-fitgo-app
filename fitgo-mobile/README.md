# FitGo — App Mobile (CP5/CP6)

App de rotinas de treino personalizadas construído com **Expo (React Native) + TypeScript**, usando dados mockados locais (sem backend nesta fase).

## Como executar

```bash
npm install
npx expo start        # Android (emulador), iOS (simulador) ou Web (--web)
```

- `npm run android` / `npm run ios` / `npm run web` — atalhos de execução.
- `npm test` — testes unitários da lógica de negócio e dos mocks (Jest + jest-expo).
- `npm run typecheck` — checagem de tipos (TypeScript estrito).

## Build do APK (EAS)

```bash
npx eas-cli login          # conta Expo
npx eas-cli build --platform android --profile preview
```

O perfil `preview` em `eas.json` já está configurado para gerar **APK** instalável (`buildType: apk`).

## Estrutura

```
src/
├── app/            # Rotas (expo-router): index, treinos, progresso, perfil, treino/[id]
├── components/     # UI reutilizável (cards, botões, tabs)
├── constants/      # Tema e paleta de cores da marca FitGo
├── data/           # Tipos de domínio + dados mockados (JSON local em TS)
├── services/       # Lógica de negócio (recomendação de treino, métricas)
├── hooks/          # Hooks de tema/esquema de cores
└── __tests__/      # Testes unitários (Jest)
```
