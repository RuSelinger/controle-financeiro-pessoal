# 🚀 Guia de Publicação Gratuita - Controle Financeiro Pessoal

Este guia mostra como colocar seu aplicativo em produção de forma **100% gratuita** para distribuição.

## 📱 Opções Gratuitas Disponíveis

### 1. **EAS Build (Recomendado) - Expo Application Services**
✅ **Totalmente Gratuito** para projetos pessoais/acadêmicos
- Builds gratuitos ilimitados
- Gera APK para Android
- Gera IPA para iOS (requer Mac)
- Sem custos para desenvolvimento

### 2. **Google Play Store (Android)**
⚠️ **Quase Gratuito** - Requer taxa única de $25 USD
- Publicação permanente
- Acesso a milhões de usuários
- Distribuição profissional

### 3. **Distribuição Direta via APK**
✅ **100% Gratuito**
- Gera arquivo APK
- Compartilha via link direto
- Instalação manual no dispositivo

---

## 🎯 Opção 1: EAS Build (Recomendado - Gratuito)

### Passo 1: Criar Conta no Expo

```bash
# Instalar EAS CLI globalmente
npm install -g eas-cli

# Fazer login na sua conta Expo
eas login
```

Se não tiver conta, crie em: https://expo.dev/signup

### Passo 2: Configurar o Projeto

```bash
# Configurar EAS no projeto
eas build:configure
```

Isso criará um arquivo `eas.json` na raiz do projeto.

### Passo 3: Gerar Build Android (APK)

```bash
# Build para Android (APK)
eas build --platform android --profile production
```

**Opções de perfil:**
- `production` - Build final para distribuição
- `preview` - Build para testes

### Passo 4: Baixar o APK

Após o build (pode levar 10-20 minutos):
1. Acesse https://expo.dev/accounts/[seu-usuario]/projects/controle-financeiro-pessoal/builds
2. Baixe o APK gerado
3. Compartilhe o arquivo ou link

### Passo 5: Compartilhar o APK

**Opções gratuitas para compartilhar:**

1. **Google Drive** (Gratuito)
   - Upload do APK
   - Compartilhar link público
   - Usuários baixam e instalam

2. **GitHub Releases** (Gratuito)
   - Criar release no GitHub
   - Anexar APK
   - Link direto para download

3. **Firebase App Distribution** (Gratuito)
   - Distribuição para testadores
   - Até 100 testadores gratuitos

---

## 🎯 Opção 2: Google Play Store (Quase Gratuito)

### Requisitos:
- Conta Google Play Developer ($25 USD - taxa única)
- APK assinado
- Ícones e imagens de marketing

### Passo 1: Criar Conta de Desenvolvedor

1. Acesse: https://play.google.com/console/signup
2. Pague a taxa única de $25 USD
3. Complete o cadastro

### Passo 2: Gerar APK Assinado

```bash
# Build assinado para produção
eas build --platform android --profile production
```

### Passo 3: Preparar Recursos

Você precisará de:
- Ícone do app (512x512px)
- Screenshots (pelo menos 2)
- Descrição do app
- Política de privacidade (URL)

### Passo 4: Publicar na Play Store

1. Acesse Google Play Console
2. Crie novo aplicativo
3. Preencha informações
4. Faça upload do APK
5. Envie para revisão

**Tempo de revisão:** 1-7 dias

---

## 🎯 Opção 3: Build Local (100% Gratuito)

### Gerar APK Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Fazer prebuild (gera pastas android/ios)
npx expo prebuild

# 3. Entrar na pasta android
cd android

# 4. Gerar APK de debug (para testes)
./gradlew assembleDebug

# O APK estará em: android/app/build/outputs/apk/debug/app-debug.apk
```

**Limitações:**
- APK de debug (não pode publicar na Play Store)
- Requer Android Studio instalado
- Mais complexo de configurar

---

## 📋 Checklist Antes de Publicar

### ✅ Preparação do App

- [ ] Testar todas as funcionalidades
- [ ] Verificar se não há erros no console
- [ ] Testar em dispositivo físico
- [ ] Verificar performance
- [ ] Coletar feedback das parceiras

### ✅ Recursos Visuais

- [ ] Ícone do app (512x512px)
- [ ] Splash screen
- [ ] Screenshots para loja (opcional)
- [ ] Logo/banner (opcional)

### ✅ Documentação

- [ ] Descrição do app
- [ ] Política de privacidade (URL)
- [ ] Termos de uso (opcional)
- [ ] FAQ (opcional)

### ✅ Configurações

- [ ] Versão do app atualizada
- [ ] Nome do pacote correto
- [ ] Permissões configuradas
- [ ] app.json configurado

---

## 🛠️ Configuração Rápida - EAS Build

### 1. Criar arquivo `eas.json`

```json
{
  "cli": {
    "version": ">= 5.2.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

### 2. Atualizar `app.json`

```json
{
  "expo": {
    "name": "Controle Financeiro Pessoal",
    "slug": "controle-financeiro-pessoal",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "android": {
      "package": "com.controlefinanceiro.pessoal",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "permissions": []
    }
  }
}
```

---

## 📦 Comandos Rápidos

### Build para Produção (EAS)

```bash
# Build Android APK
eas build --platform android --profile production

# Ver status do build
eas build:list

# Baixar build
eas build:download
```

### Compartilhar APK

```bash
# Após build, você receberá um link
# Compartilhe esse link ou baixe e compartilhe o arquivo
```

---

## 🔗 Links Úteis

- **Expo Dashboard**: https://expo.dev
- **EAS Build Docs**: https://docs.expo.dev/build/introduction/
- **Google Play Console**: https://play.google.com/console
- **Firebase App Distribution**: https://firebase.google.com/products/app-distribution

---

## 💡 Dicas Importantes

1. **Teste antes de distribuir**: Sempre teste o APK em um dispositivo físico antes de compartilhar

2. **Versão do app**: Atualize a versão no `app.json` a cada nova release

3. **Backup**: Mantenha backups dos APKs gerados

4. **Feedback**: Colete feedback dos usuários para melhorias futuras

5. **Atualizações**: Use EAS Update para atualizar o app sem rebuild (gratuito)

---

## 🎓 Para Projeto Acadêmico

Como este é um projeto de extensão universitária, você pode:

1. **Distribuir via EAS Build** (gratuito)
2. **Compartilhar APK via Google Drive** (gratuito)
3. **Usar GitHub Releases** (gratuito)
4. **Documentar no relatório final** com link para download

**Não é necessário publicar na Play Store** para validar o projeto acadêmico!

---

## ✅ Próximos Passos Recomendados

1. ✅ Gerar build com EAS
2. ✅ Testar APK em dispositivo físico
3. ✅ Compartilhar com parceiras (Patrícia, Ketlin, Sara)
4. ✅ Coletar feedback
5. ✅ Documentar no relatório final

---

**Boa sorte com a publicação! 🚀**

