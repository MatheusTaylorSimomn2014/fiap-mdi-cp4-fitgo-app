## Estrutura Inicial do Projeto e Pequneno Tutorial de como fazer um:

### 1. Setup Técnico

```bash
# Criar o projeto com Expo
npx create-expo-app fitgo-mobile --template

# Acessar a pasta
cd fitgo-mobile

# Instalar dependências principais
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install react-native-vector-icons
npm install @react-native-async-storage/async-storage
npm install expo-constants

# Instalar EAS CLI globalmente
npm install -g eas-cli

# Configurar EAS
eas build:configure
```

### 2. Organização de Pastas

```
fitgo-mobile/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Home
│   │   ├── treinos.tsx        # Treinos
│   │   ├── progresso.tsx      # Progresso
│   │   └── perfil.tsx         # Perfil
│   └── _layout.tsx            # Layout principal
├── assets/
│   ├── fonts/
│   ├── images/
│   └── icons/
├── src/
│   ├── components/            # Componentes reutilizáveis
│   ├── constants/             # Cores, temas, dados mockados
│   ├── hooks/                 # Hooks customizados
│   ├── services/              # APIs, storage
│   ├── styles/                # Estilos globais
│   └── utils/                 # Funções auxiliares
├── eas.json                   # Configuração do EAS Build
├── app.json                   # Configuração do Expo
├── package.json
└── tsconfig.json
```

### 3. eas.json (Preview)

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {}
  }
}
```