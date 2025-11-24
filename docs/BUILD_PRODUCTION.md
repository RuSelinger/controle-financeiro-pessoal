# Guia de Build de Produção

## 📱 Gerando APK para Produção

### Pré-requisitos
- Conta no Expo (gratuita)
- EAS CLI instalado (`npm install -g eas-cli`)
- Projeto configurado no Expo Application Services

### Opção 1: Build na Nuvem (Recomendado)

```bash
# 1. Fazer login no EAS
eas login

# 2. Configurar o projeto (se primeira vez)
eas build:configure

# 3. Gerar APK de produção
eas build --platform android --profile production

# 4. Quando concluído, baixar o APK
eas build:download --latest
```

### Opção 2: Build Local (Requer Docker)

```bash
# 1. Fazer login no EAS
eas login

# 2. Gerar APK local
eas build --platform android --profile production --local

# O APK será gerado no diretório local
```

### Opção 3: Expo Go (Apenas para testes)

```bash
# Para desenvolvimento/testes rápidos
npm start

# Escanear QR code com Expo Go no celular
```

---

## ✅ Checklist Pré-Build

- [x] ✅ Todos os testes passando (`npm test`)
- [x] ✅ Expo Doctor sem erros (`npx expo-doctor`)
- [x] ✅ Dependências atualizadas
- [x] ✅ Tratamento de erros implementado
- [x] ✅ Validações de formulário robustas
- [x] ✅ Código limpo (sem linting errors)
- [ ] ⏳ Build de produção gerado
- [ ] ⏳ APK testado em dispositivo físico

---

## 📦 Perfis de Build (eas.json)

### Production
```json
{
  "production": {
    "android": {
      "buildType": "apk"  // Gera APK (fácil distribuição)
    }
  }
}
```

### Preview
```json
{
  "preview": {
    "distribution": "internal",
    "android": {
      "buildType": "apk"
    }
  }
}
```

---

## 🚀 Após Gerar o APK

### 1. Distribuir para Teste
- Enviar APK por e-mail/WhatsApp para testadores
- Instalar no celular Android
- Testar todas as funcionalidades

### 2. Coletar Feedback
- Usar questionário de satisfação (`docs/QUESTIONARIO_SATISFACAO.md`)
- Documentar bugs encontrados
- Registrar sugestões de melhoria

### 3. Atualização OTA (Over-The-Air)
```bash
# Atualizar sem refazer build completo
eas update --branch production --message "Correção de bugs"
```

---

## 📊 Status do Projeto

### ✅ Concluído
- [x] Correção do cryptoService.js
- [x] Tratamento de erros robusto
- [x] Validações de formulário aprimoradas
- [x] Testes unitários (11 testes passando)
- [x] Dependências otimizadas
- [x] Configuração EAS pronta

### 🔄 Em Progresso
- [ ] Build de produção (aguardando execução)
- [ ] Testes em dispositivos físicos
- [ ] Coleta de feedback de usuários

### 📝 Próximos Passos
1. Executar `eas build --platform android --profile production`
2. Baixar e distribuir APK para testadores
3. Aplicar questionário de satisfação
4. Documentar evidências finais

---

## 🛠️ Troubleshooting

### Erro: "You need to be authenticated"
```bash
eas login
```

### Erro: "Project not configured"
```bash
eas build:configure
```

### Erro: "Build failed"
- Verificar logs em: https://expo.dev
- Executar `npx expo-doctor`
- Verificar `eas.json` e `app.json`

### APK muito grande
- Remover dependências não utilizadas
- Otimizar assets/imagens
- Usar build AAB para Play Store

---

## 📱 Testando o APK

### Instalação no Android
1. Transferir APK para o celular
2. Habilitar "Fontes desconhecidas" nas configurações
3. Tocar no APK e instalar
4. Abrir o aplicativo

### Testes Essenciais
- [ ] Adicionar receita
- [ ] Adicionar despesa
- [ ] Editar transação
- [ ] Excluir transação
- [ ] Verificar cálculo de saldo
- [ ] Testar filtros na lista
- [ ] Verificar persistência de dados

---

## 🎯 Métricas de Qualidade

### Performance
- App inicia em < 3 segundos
- Transições suaves (60 FPS)
- Banco de dados responsivo

### Estabilidade
- Zero crashes nos testes
- Tratamento de erros em todas as ações críticas
- Validações robustas

### Usabilidade
- Interface intuitiva
- Mensagens de erro claras
- Feedback visual em todas as ações

---

**Última atualização:** 21/11/2025
**Status:** ✅ Pronto para build de produção

