# Resumo do Projeto - Controle Financeiro Pessoal

## 📱 Sobre o Projeto

Aplicativo Android desenvolvido com React Native (Expo) para controle financeiro pessoal da comunidade local. O projeto foi desenvolvido como trabalho de extensão universitária, focando em uma solução simples, acessível e segura para organização financeira pessoal.

## ✅ Funcionalidades Implementadas

### 1. Dashboard
- ✅ Visualização do saldo atual (receitas - despesas)
- ✅ Total de receitas do mês
- ✅ Total de despesas do mês
- ✅ Transações recentes (últimas 5)
- ✅ Botões de ação rápida para adicionar receitas/despesas

### 2. CRUD Completo
- ✅ **Criar**: Adicionar novas receitas e despesas
- ✅ **Ler**: Visualizar todas as transações
- ✅ **Atualizar**: Editar transações existentes
- ✅ **Deletar**: Remover transações

### 3. Categorização
- ✅ **Receitas**: Salário, Freelance, Investimentos, Outros
- ✅ **Despesas**: Alimentação, Transporte, Lazer, Contas, Saúde, Educação, Compras, Outros
- ✅ Seleção visual de categorias com ícones

### 4. Segurança
- ✅ Criptografia de dados sensíveis usando expo-crypto
- ✅ Hash criptográfico para validação de integridade
- ✅ Armazenamento local (100% offline)

### 5. Persistência de Dados
- ✅ Banco de dados SQLite embarcado
- ✅ Padrão DAO (Data Access Object) implementado
- ✅ Índices para otimização de consultas

### 6. Arquitetura
- ✅ Redux Toolkit para gerenciamento de estado
- ✅ Estrutura modular e organizada
- ✅ Separação de responsabilidades (components, screens, services, store)

### 7. Testes
- ✅ Testes unitários com Jest
- ✅ Testes para utilitários (dateUtils)
- ✅ Testes para Redux slice (transactionSlice)

## 🛠️ Tecnologias Utilizadas

- **React Native** (via Expo SDK 49)
- **Redux Toolkit** - Gerenciamento de estado global
- **SQLite** (expo-sqlite) - Banco de dados local
- **expo-crypto** - Criptografia de dados
- **React Navigation** - Navegação entre telas
- **React Native Paper** - Componentes UI
- **date-fns** - Manipulação de datas
- **Jest** - Framework de testes

## 📁 Estrutura do Projeto

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
│   │   ├── dateUtils.js
│   │   └── dateUtils.test.js
│   └── constants/           # Constantes
│       └── categories.js
├── docs/                    # Documentação
│   └── QUESTIONARIO_SATISFACAO.md
├── assets/                  # Imagens e recursos
├── App.js                   # Componente principal
├── package.json
├── app.json
├── README.md
├── INSTALACAO.md
├── EVIDENCIAS.md
└── RESUMO_PROJETO.md
```

## 🚀 Como Executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Iniciar o projeto:**
   ```bash
   npm start
   ```

3. **Executar no Android:**
   ```bash
   npm run android
   ```

4. **Executar testes:**
   ```bash
   npm test
   ```

## 📊 Objetivos Alcançados

### Objetivo Geral ✅
Desenvolver um aplicativo Android funcional, utilizando React Native, que permita à comunidade registrar e organizar suas finanças pessoais de forma simples, rápida e segura.

### Objetivos Específicos ✅
- ✅ Dashboard com saldo, receitas e despesas do mês
- ✅ CRUD completo para receitas e despesas
- ✅ Sistema de categorização de despesas
- ✅ Criptografia de dados financeiros
- ✅ Armazenamento local no SQLite
- ✅ Validação com grupo de parceiras (em andamento)

## 🔒 Segurança

- Todos os dados financeiros são criptografados antes de serem armazenados
- Hash criptográfico para validação de integridade
- Dados armazenados localmente no dispositivo (privacidade garantida)
- Nenhum dado é enviado para servidores externos

## 👥 Parceiras de Validação

- Patrícia Cardoso Selinger
- Ketlin Guerreiro da Silva Selinger
- Sara Selinger Fernandes

## 📝 Próximos Passos

1. **Testes com parceiras** (Semana 7)
   - Distribuir aplicativo para teste
   - Coletar feedback
   - Realizar ajustes necessários

2. **Questionário de satisfação** (Semana 8)
   - Aplicar questionário
   - Analisar resultados
   - Documentar evidências

3. **Geração de APK**
   - Configurar EAS Build
   - Gerar APK para distribuição
   - Documentar processo

4. **Documentação final**
   - Organizar evidências
   - Criar relatório final
   - Preparar apresentação

## 📚 Documentação Adicional

- **README.md** - Visão geral do projeto
- **INSTALACAO.md** - Guia de instalação detalhado
- **EVIDENCIAS.md** - Checklist de evidências do projeto
- **docs/QUESTIONARIO_SATISFACAO.md** - Modelo de questionário

## 🎯 Métricas de Sucesso

- **Adesão**: Percentual de parceiras que continuaram usando após 2 semanas
- **Satisfação**: Média de 4+ na escala de 1-5
- **Feedback**: Coleta de pelo menos 3 sugestões de melhoria

---

**Desenvolvido como projeto de extensão universitária**

