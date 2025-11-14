# Controle Financeiro Pessoal

Aplicativo Android desenvolvido com React Native para controle financeiro pessoal da comunidade local.

## 📋 Descrição

Aplicativo simples e acessível para organizar finanças pessoais, com foco em privacidade e usabilidade. Todos os dados são armazenados localmente no dispositivo com criptografia.

## 🚀 Tecnologias

-   **Expo SDK 54** - Framework React Native (Setembro 2025)
-   **React 19.1.0** - Biblioteca JavaScript
-   **React Native 0.81.0** - Framework mobile
-   **Redux Toolkit 2.3.0** - Gerenciamento de estado
-   **Expo SQLite 15.0.0** - Banco de dados local
-   **expo-crypto 14.0.0** - Criptografia de dados
-   **React Navigation 6** - Navegação
-   **React Native Paper 5.12.5** - Componentes UI
-   **Jest 29.7.0** - Testes unitários
-   **date-fns 3.6.0** - Manipulação de datas

## 📱 Funcionalidades

-   ✅ Dashboard com saldo atual, receitas e despesas do mês
-   ✅ CRUD completo para receitas e despesas
-   ✅ Categorização de despesas
-   ✅ Criptografia de dados sensíveis
-   ✅ Funcionamento 100% offline
-   ✅ Interface simples e intuitiva

## 🛠️ Instalação

### Pré-requisitos

-   Node.js 18+ instalado
-   npm ou yarn
-   Expo CLI (instalado globalmente ou via npx)
-   Android Studio (para desenvolvimento Android)

### Passos

```bash
# 1. Instalar dependências
npm install

# OU usar o comando oficial do Expo para garantir compatibilidade
npx expo install --fix

# 2. Iniciar o projeto
npm start

# 3. Executar no Android
npm run android

# 4. Executar no iOS (apenas Mac)
npm run ios
```

### Verificar Instalação

```bash
# Verificar problemas de compatibilidade
npx expo-doctor

# Executar testes
npm test
```

> **Nota**: Se encontrar problemas de compatibilidade, use `npm install --legacy-peer-deps`

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch
```

Os testes incluem:

-   Testes unitários para utilitários (dateUtils)
-   Testes para Redux slices (transactionSlice)
-   Validação de formatação de moeda e datas

## 📁 Estrutura do Projeto

```
src/
├── components/      # Componentes reutilizáveis
├── screens/         # Telas do aplicativo
├── store/           # Configuração Redux
├── services/        # Serviços (DAO, criptografia)
├── utils/           # Funções utilitárias
└── constants/       # Constantes e configurações
```

## 🔒 Segurança

Todos os dados financeiros são criptografados antes de serem armazenados no SQLite, garantindo privacidade e segurança dos usuários.

## 👥 Parceiros de Validação

-   Patrícia Cardoso Selinger
-   Ketlin Guerreiro da Silva Selinger
-   Sara Selinger Fernandes

## 📄 Licença

Projeto acadêmico - Extensão Universitária
