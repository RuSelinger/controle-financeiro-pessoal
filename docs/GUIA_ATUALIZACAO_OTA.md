# 📱 Guia de Atualização OTA (Over-The-Air)

Este guia explica como atualizar seu aplicativo **sem gerar um novo APK**, usando o EAS Update para enviar atualizações de código JavaScript diretamente para os usuários.

## 🎯 O que é EAS Update?

O **EAS Update** permite atualizar o código JavaScript, assets e configurações do seu app sem precisar gerar um novo build nativo (APK/IPA). Os usuários recebem as atualizações automaticamente ao abrir o app.

### ✅ O que PODE ser atualizado via OTA:
- Código JavaScript/TypeScript
- Componentes React Native
- Estilos e layouts
- Assets (imagens, fontes, etc.)
- Configurações do app.json (algumas)
- Lógica de negócio

### ❌ O que NÃO pode ser atualizado via OTA:
- Dependências nativas (expo-sqlite, expo-crypto, etc.)
- Plugins nativos
- Ícone do app
- Nome do app
- Permissões nativas
- Mudanças no `app.json` que requerem rebuild

## 🚀 Como Usar

### 1. Primeira Vez - Gerar o APK Inicial

Se ainda não gerou o APK, você precisa gerar uma vez:

```bash
npm run build:android:preview
```

Este APK será usado como base. Todas as atualizações futuras serão enviadas via OTA.

### 2. Fazer Alterações no Código

Faça suas alterações normalmente no código JavaScript/React Native:

```javascript
// Exemplo: Alterar uma cor, adicionar funcionalidade, etc.
// src/screens/DashboardScreen.js
```

### 3. Atualizar a Versão (Opcional mas Recomendado)

Atualize a versão no `app.json` para rastrear as atualizações:

```json
{
  "expo": {
    "version": "1.0.1"  // Incremente: 1.0.0 -> 1.0.1 -> 1.0.2
  }
}
```

**Importante**: O `versionCode` do Android só precisa ser atualizado quando gerar um novo APK.

### 4. Publicar a Atualização

#### Para Preview/Teste:
```bash
npm run update:preview "Descrição da atualização"
```

#### Para Produção:
```bash
npm run update:production "Descrição da atualização"
```

Ou use diretamente:
```bash
# Preview
eas update --branch preview --message "Correção de bugs"

# Produção
eas update --branch production --message "Nova funcionalidade adicionada"
```

### 5. Verificar Atualizações Publicadas

```bash
npm run update:list
```

Ou:
```bash
eas update:list
```

## 📋 Fluxo Completo de Trabalho

### Cenário 1: Atualização Simples (Sem mudanças nativas)

1. **Fazer alterações no código**
   ```bash
   # Edite seus arquivos .js/.jsx
   ```

2. **Atualizar versão no app.json**
   ```json
   "version": "1.0.1"
   ```

3. **Publicar atualização**
   ```bash
   npm run update:production "Adicionei novos ícones"
   ```

4. **Usuários recebem automaticamente** na próxima vez que abrirem o app

### Cenário 2: Mudança que Requer Novo APK

Se você adicionar uma nova dependência nativa ou mudar o ícone:

1. **Atualizar versionCode no app.json**
   ```json
   "android": {
     "versionCode": 2  // Incremente de 1 para 2
   }
   ```

2. **Gerar novo APK**
   ```bash
   npm run build:android:preview
   ```

3. **Distribuir o novo APK** para os usuários

4. **A partir daí**, continue usando OTA para atualizações futuras

## 🔧 Configuração Atual

Seu projeto já está configurado com:

- ✅ `expo-updates` instalado
- ✅ `app.json` configurado com `updates.url` e `runtimeVersion`
- ✅ `eas.json` com perfis de update (development, preview, production)
- ✅ Scripts npm para facilitar o uso

## 📝 Comandos Disponíveis

```bash
# Publicar atualização para preview
npm run update:preview "Mensagem da atualização"

# Publicar atualização para produção
npm run update:production "Mensagem da atualização"

# Listar atualizações publicadas
npm run update:list

# Gerar novo APK (quando necessário)
npm run build:android:preview
```

## ⚠️ Importante

1. **Primeira vez**: Você PRECISA gerar o APK inicial pelo menos uma vez
2. **VersionCode**: Só atualize quando gerar novo APK
3. **Version**: Atualize sempre que publicar uma atualização OTA
4. **Canais**: Use `preview` para testes, `production` para usuários finais
5. **Mensagem**: Sempre inclua uma mensagem descritiva nas atualizações

## 🎯 Exemplo Prático

```bash
# 1. Fiz alterações no código (mudei cores, adicionei botão, etc.)

# 2. Atualizo a versão no app.json
# "version": "1.0.1"

# 3. Publico a atualização
npm run update:production "Atualização do tema e novos ícones"

# 4. Usuários recebem automaticamente ao abrir o app!
```

## 📚 Documentação Oficial

- [EAS Update Documentation](https://docs.expo.dev/eas-update/introduction/)
- [Runtime Versions](https://docs.expo.dev/eas-update/runtime-versions/)

---

**Resumo**: Use `npm run update:production "mensagem"` para atualizar o app sem gerar novo APK! 🚀

