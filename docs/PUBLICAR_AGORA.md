# 🚀 Como Publicar Agora - Passo a Passo Rápido

## ⚡ Método Mais Rápido (5 minutos)

### 1. Instalar EAS CLI

```bash
npm install -g eas-cli
```

### 2. Fazer Login no Expo

```bash
eas login
```

Se não tiver conta, crie em: https://expo.dev/signup (gratuito)

### 3. Configurar Projeto (já está feito!)

Os arquivos `eas.json` e `app.json` já estão configurados! ✅

### 4. Gerar Build

```bash
npm run build:android
```

Ou manualmente:

```bash
eas build --platform android --profile production
```

### 5. Aguardar Build (10-20 minutos)

O build será processado na nuvem. Você receberá:
- Link para acompanhar o progresso
- Notificação quando estiver pronto
- Link para download do APK

### 6. Baixar e Compartilhar

Após o build:
1. Acesse o link fornecido
2. Baixe o APK
3. Compartilhe com as parceiras

---

## 📱 Como Instalar o APK no Android

### Opção 1: Via Link Direto
1. Abra o link do APK no celular
2. Toque em "Baixar"
3. Após baixar, toque no arquivo
4. Permita "Instalar de fontes desconhecidas" se solicitado
5. Toque em "Instalar"

### Opção 2: Via Transferência
1. Transfira o APK para o celular (WhatsApp, email, etc.)
2. Abra o arquivo no celular
3. Permita instalação de fontes desconhecidas
4. Instale

---

## 🔗 Compartilhar APK Gratuitamente

### Google Drive (Recomendado)
1. Faça upload do APK no Google Drive
2. Clique com botão direito > Compartilhar
3. Defina como "Qualquer pessoa com o link"
4. Copie o link e compartilhe

### GitHub Releases
1. Crie um repositório no GitHub
2. Vá em Releases > Criar nova release
3. Anexe o APK
4. Publique e compartilhe o link

### WhatsApp/Email
- Envie o APK diretamente via WhatsApp ou email
- Instrua a pessoa a instalar

---

## ✅ Checklist Rápido

Antes de gerar o build:

- [ ] Testar app no dispositivo físico
- [ ] Verificar se todas funcionalidades estão OK
- [ ] Ícone do app está na pasta `assets/icon.png` (512x512px)
- [ ] Splash screen está na pasta `assets/splash.png`

---

## 🎯 Comandos Úteis

```bash
# Ver builds anteriores
npm run build:list

# Baixar build mais recente
npm run build:download

# Build para testes (mais rápido)
npm run build:android:preview
```

---

## 💡 Dicas

1. **Primeira vez?** Use `preview` primeiro para testar:
   ```bash
   npm run build:android:preview
   ```

2. **Build falhou?** Verifique os logs no dashboard do Expo

3. **APK muito grande?** Normal para React Native, geralmente 20-50MB

4. **Testar antes?** Instale o APK no seu celular primeiro

---

## 🆘 Problemas Comuns

### "eas: command not found"
```bash
npm install -g eas-cli
```

### "Not logged in"
```bash
eas login
```

### Build falha
- Verifique se todas as dependências estão instaladas
- Execute `npx expo-doctor` para verificar problemas

---

**Pronto! Siga esses passos e seu app estará disponível em minutos! 🚀**

