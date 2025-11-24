# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [1.1.0] - 21 Novembro 2025

### 🎨 Melhorias de UX/UI

#### Adicionado
- **Sistema de Notificações Customizado (CustomToast)**
  - Toast animado com cores do tema "Calma e Orgânica"
  - Ícones MaterialCommunityIcons para melhor comunicação visual
  - Auto-hide após 3 segundos
  - Tipos: success, error, warning, info
  - Animações suaves (fade + spring)
  
- **Modal de Confirmação Customizado (CustomConfirmModal)**
  - Modal elegante para confirmações
  - Ícone grande destacado (48px)
  - 3 tipos: danger, warning, info
  - Animações suaves de entrada/saída
  - Backdrop dismissível
  - Totalmente customizável

- **Calendário em Português**
  - Configuração completa do LocaleConfig
  - Meses, dias e abreviações em PT-BR
  - Interface 100% localizada

#### Melhorado
- **Tratamento de Erros Robusto**
  - Try/catch em todas operações assíncronas
  - Mensagens de erro amigáveis e específicas
  - Sistema de retry em App.js
  - Validação de dados antes de ações críticas
  
- **Validações de Formulário**
  - Validação de valor (0.01 a 999.999.999,00)
  - Validação de descrição (3 a 100 caracteres)
  - Validação de data (10 anos atrás até 1 ano futuro)
  - Mensagens de erro específicas e claras
  - Contador de caracteres em tempo real

- **Serviço de Criptografia**
  - Reescrito usando apenas expo-crypto
  - Removida dependência quebrada de CryptoJS
  - Hash SHA256 para proteção de dados
  - Funções: encryptData, validateDataIntegrity, hashValue, generateUUID
  - Tratamento de erros em todos os métodos

#### Removido
- Alert.alert() nativo (substituído por CustomToast e CustomConfirmModal)
- Código não funcional de CryptoJS
- Emojis das mensagens (substituídos por ícones do sistema)
- Dependências duplicadas

### 🔧 Melhorias Técnicas

#### Corrigido
- Dependências duplicadas (react-native-safe-area-context)
- Versões desatualizadas (expo-updates)
- Código de criptografia não funcional
- Variáveis e funções não definidas em cryptoService.js

#### Otimizado
- Tempo de execução dos testes (27s → 14s)
- 5 pacotes duplicados removidos
- Build pronto para produção
- Zero vulnerabilidades

### 📊 Qualidade

#### Testes
- ✅ 11/11 testes passando
- ✅ 2 suítes de teste funcionando
- ✅ Cobertura: utilitários e Redux Store

#### Verificações
- ✅ 17/17 checks do expo-doctor
- ✅ Zero linting errors
- ✅ Zero vulnerabilidades npm
- ✅ Compatibilidade SDK 54

### 📚 Documentação

#### Adicionada
- BUILD_PRODUCTION.md - Guia completo de build
- QUICK_BUILD.md - Guia rápido (3 comandos)
- docs/MELHORIAS_21_11_2025.md - Detalhes técnicos
- docs/TOAST_CUSTOMIZADO.md - Sistema de notificações
- docs/MODAL_CONFIRMACAO.md - Modal de confirmação

#### Atualizada
- README.md - Versões atualizadas
- CHANGELOG.md - Este arquivo

### 🎯 Impacto

**Experiência do Usuário:**
- 🎨 Interface mais profissional e bonita
- 💬 Feedback visual melhorado
- 🌍 Calendário 100% em português
- ✅ Mensagens de sucesso elegantes
- 🔴 Confirmações elegantes para ações críticas
- ⚡ Animações suaves em toda interface

**Qualidade do Código:**
- 🛡️ Tratamento de erros robusto
- ✔️ Validações completas
- 🔒 Criptografia funcional
- 🧪 Testes passando
- 📦 Dependências otimizadas

**Status:** ✅ Pronto para produção

---

## [1.0.0] - Novembro 2025

### 🚀 Atualização Completa para Versões Mais Recentes

#### Adicionado
- Suporte ao Expo SDK 54
- Suporte ao React 19.1.0
- Suporte ao React Native 0.81.0
- Documentação completa de atualização (`ATUALIZACAO_COMPLETA.md`)
- Scripts adicionais no package.json (test:watch, lint)

#### Atualizado
- **Expo SDK**: 49.0.0 → 54.0.0
- **React**: 18.2.0 → 19.1.0
- **React Native**: 0.72.6 → 0.81.0
- **Redux Toolkit**: 1.9.7 → 2.3.0
- **react-redux**: 8.1.3 → 9.2.0
- **expo-sqlite**: 11.3.0 → 15.0.0
- **expo-crypto**: 12.4.1 → 14.0.0
- **date-fns**: 2.30.0 → 3.6.0
- **react-native-paper**: 5.11.1 → 5.12.5
- **react-native-screens**: 3.22.0 → 4.4.0
- **react-native-safe-area-context**: 4.6.3 → 4.14.0
- **react-native-gesture-handler**: 2.12.0 → 2.20.0
- **@testing-library/react-native**: 12.1.2 → 12.8.0
- **jest**: 29.2.1 → 29.7.0
- **@babel/core**: 7.20.0 → 7.26.0

#### Melhorado
- Configuração do app.json com plugins do Expo
- Jest config atualizado para incluir date-fns no transformIgnorePatterns
- README atualizado com informações sobre versões e instalação
- Documentação de troubleshooting

#### Compatibilidade
- ✅ Compatível com React 19
- ✅ Compatível com React Native 0.81
- ✅ Compatível com Expo SDK 54
- ✅ Nova Arquitetura do React Native suportada
- ✅ Suporte ao Android 16

#### Notas
- Todas as funcionalidades existentes foram mantidas
- Nenhuma mudança breaking no código
- Testes atualizados e funcionando
- Código compatível com todas as novas versões

---

## [0.1.0] - Versão Inicial

### Adicionado
- Estrutura inicial do projeto
- Dashboard com saldo, receitas e despesas
- CRUD completo para transações
- Sistema de categorização
- Criptografia de dados
- Banco de dados SQLite local
- Testes unitários básicos
- Documentação inicial

