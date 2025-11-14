# 🚀 Início Rápido

## Instalação Rápida

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o projeto
npm start

# 3. Escanear QR Code com Expo Go (Android) ou executar no emulador
npm run android
```

## Estrutura Básica

- **App.js** - Ponto de entrada do aplicativo
- **src/screens/** - Telas principais
- **src/components/** - Componentes reutilizáveis
- **src/store/** - Redux store e slices
- **src/services/** - Serviços (banco de dados, criptografia)

## Funcionalidades Principais

1. **Dashboard** - Visão geral das finanças
2. **Lista de Transações** - Ver todas as receitas e despesas
3. **Adicionar Transação** - Criar nova receita ou despesa
4. **Editar/Excluir** - Gerenciar transações existentes

## Comandos Úteis

```bash
# Desenvolvimento
npm start              # Iniciar servidor Expo
npm run android        # Executar no Android
npm run ios           # Executar no iOS (Mac apenas)

# Testes
npm test              # Executar testes unitários

# Build
eas build --platform android  # Gerar APK (requer EAS CLI)
```

## Primeiros Passos

1. Execute `npm install` para instalar todas as dependências
2. Execute `npm start` para iniciar o servidor
3. Use o Expo Go no seu celular Android para escanear o QR Code
4. Ou execute `npm run android` se tiver um emulador configurado

## Problemas Comuns

### Erro ao instalar dependências
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro de conexão com banco
Certifique-se de que o Expo SQLite está instalado:
```bash
npx expo install expo-sqlite
```

### App não carrega
Verifique se todas as dependências estão instaladas:
```bash
npm install
npx expo install --fix
```

## Próximos Passos

1. ✅ Projeto configurado
2. ⏳ Testar funcionalidades
3. ⏳ Coletar feedback das parceiras
4. ⏳ Gerar APK final

---

**Dúvidas?** Consulte o arquivo `INSTALACAO.md` para instruções detalhadas.

