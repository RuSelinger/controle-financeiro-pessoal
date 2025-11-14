# Guia de Instalação e Configuração

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**
- **Expo CLI** (instalado globalmente)
- **Android Studio** (para testar no Android)
- **Git** (para controle de versão)

## Instalação

### 1. Instalar dependências

```bash
npm install
```

### 2. Instalar Expo CLI globalmente (se ainda não tiver)

```bash
npm install -g expo-cli
```

### 3. Iniciar o projeto

```bash
npm start
```

Ou para executar diretamente no Android:

```bash
npm run android
```

## Configuração do Ambiente Android

### Para testar no dispositivo físico:

1. Instale o aplicativo **Expo Go** na Play Store
2. Escaneie o QR Code que aparece no terminal
3. O aplicativo será carregado no seu dispositivo

### Para testar no emulador:

1. Abra o Android Studio
2. Configure um emulador Android (AVD)
3. Execute `npm run android`
4. O Expo abrirá automaticamente no emulador

## Estrutura do Projeto

```
project/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── TransactionCard.js
│   │   ├── CategorySelector.js
│   │   └── StatCard.js
│   ├── screens/             # Telas do aplicativo
│   │   ├── DashboardScreen.js
│   │   ├── TransactionListScreen.js
│   │   └── TransactionFormScreen.js
│   ├── store/               # Redux Store
│   │   ├── store.js
│   │   └── slices/
│   │       └── transactionSlice.js
│   ├── services/            # Serviços e DAO
│   │   ├── database.js
│   │   ├── transactionDAO.js
│   │   └── cryptoService.js
│   ├── utils/               # Funções utilitárias
│   │   └── dateUtils.js
│   └── constants/           # Constantes
│       └── categories.js
├── assets/                  # Imagens e recursos
├── App.js                   # Componente principal
├── package.json
└── app.json                 # Configuração do Expo
```

## Executar Testes

```bash
npm test
```

## Gerar APK para Android

Para gerar o arquivo APK para distribuição:

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Configurar EAS
eas build:configure

# Gerar build Android
eas build --platform android
```

## Troubleshooting

### Erro ao instalar dependências

Se encontrar erros ao instalar, tente:

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Erro de conexão com o banco de dados

Certifique-se de que o Expo SQLite está instalado corretamente:

```bash
npx expo install expo-sqlite
```

### Problemas com o emulador Android

1. Verifique se o Android Studio está instalado
2. Certifique-se de que o emulador está rodando antes de executar `npm run android`
3. Verifique as variáveis de ambiente ANDROID_HOME

## Próximos Passos

1. Adicione os assets (ícones e splash screen) na pasta `assets/`
2. Configure as credenciais do app no `app.json`
3. Teste todas as funcionalidades
4. Gere o APK final para distribuição

