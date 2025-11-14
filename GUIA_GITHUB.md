# 📦 Guia: Publicar Projeto no GitHub

Este guia mostra como publicar seu projeto de Controle Financeiro Pessoal no GitHub.

## 🚀 Passo a Passo Rápido

### 1. Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Preencha:
    - **Repository name**: `controle-financeiro-pessoal`
    - **Description**: "Aplicativo Android de controle financeiro pessoal desenvolvido com React Native e Expo"
    - **Visibility**: Público ou Privado (escolha conforme necessário)
    - **NÃO marque** "Add a README file" (já temos um)
    - **NÃO marque** "Add .gitignore" (já temos um)
    - **NÃO marque** "Choose a license" (a menos que queira)
3. Clique em **"Create repository"**

### 2. Inicializar Git no Projeto (se ainda não foi feito)

```bash
# Verificar se já existe repositório Git
git status

# Se não existir, inicializar
git init
```

### 3. Adicionar Arquivos

```bash
# Adicionar todos os arquivos
git add .

# Verificar o que será commitado
git status
```

### 4. Fazer Primeiro Commit

```bash
git commit -m "Initial commit - Projeto Controle Financeiro Pessoal"
```

### 5. Conectar com GitHub

```bash
# Adicionar remote (substitua SEU_USUARIO pelo seu usuário do GitHub)
git remote add origin https://github.com/SEU_USUARIO/controle-financeiro-pessoal.git

# Verificar se foi adicionado
git remote -v
```

### 6. Enviar para GitHub

```bash
# Enviar código para o GitHub
git branch -M main
git push -u origin main
```

---

## 📋 Comandos Completos (Copiar e Colar)

```bash
# 1. Inicializar Git (se necessário)
git init

# 2. Adicionar todos os arquivos
git add .

# 3. Fazer commit
git commit -m "Initial commit - Projeto Controle Financeiro Pessoal"

# 4. Adicionar remote (SUBSTITUA SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/controle-financeiro-pessoal.git

# 5. Enviar para GitHub
git branch -M main
git push -u origin main
```

---

## 🔐 Autenticação no GitHub

### Opção 1: Personal Access Token (Recomendado)

1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token"** > **"Generate new token (classic)"**
3. Dê um nome: `controle-financeiro-token`
4. Selecione escopos:
    - ✅ `repo` (acesso completo aos repositórios)
5. Clique em **"Generate token"**
6. **COPIE O TOKEN** (você só verá uma vez!)

Ao fazer push, use:

-   **Username**: seu usuário do GitHub
-   **Password**: o token gerado (não sua senha)

### Opção 2: GitHub CLI

```bash
# Instalar GitHub CLI
# Windows: https://cli.github.com/

# Fazer login
gh auth login

# Depois pode usar comandos normais do git
```

### Opção 3: SSH (Avançado)

Se você já tem chave SSH configurada, use:

```bash
git remote set-url origin git@github.com:SEU_USUARIO/controle-financeiro-pessoal.git
```

---

## 📝 Arquivos que NÃO serão enviados

O arquivo `.gitignore` já está configurado para **NÃO** enviar:

-   ✅ `node_modules/` - Dependências (muito pesado)
-   ✅ `.expo/` - Arquivos temporários do Expo
-   ✅ `*.apk` - Arquivos de build
-   ✅ `.env` - Variáveis de ambiente (se houver)
-   ✅ Arquivos de sistema

**Isso está correto!** Esses arquivos não devem ir para o GitHub.

---

## 🔄 Atualizar Repositório (Futuro)

Quando fizer mudanças:

```bash
# 1. Ver mudanças
git status

# 2. Adicionar arquivos modificados
git add .

# 3. Fazer commit
git commit -m "Descrição das mudanças"

# 4. Enviar para GitHub
git push
```

---

## 📚 Adicionar Informações ao README

O README.md já existe, mas você pode melhorá-lo adicionando:

-   Link para o repositório
-   Screenshots do app
-   Instruções de instalação
-   Link para download do APK (quando tiver)

---

## ✅ Checklist Antes de Publicar

-   [ ] Verificar se `.gitignore` está correto
-   [ ] Verificar se não há informações sensíveis (senhas, tokens)
-   [ ] Verificar se `README.md` está atualizado
-   [ ] Testar se o projeto funciona após clonar
-   [ ] Adicionar descrição no repositório GitHub

---

## 🆘 Problemas Comuns

### "remote origin already exists"

```bash
# Remover remote existente
git remote remove origin

# Adicionar novamente
git remote add origin https://github.com/SEU_USUARIO/controle-financeiro-pessoal.git
```

### "Authentication failed"

-   Verifique se está usando Personal Access Token (não senha)
-   Ou configure SSH

### "Permission denied"

-   Verifique se o nome do repositório está correto
-   Verifique se você tem permissão no repositório

---

## 🎯 Próximos Passos Após Publicar

1. ✅ Adicionar link do repositório no relatório do projeto
2. ✅ Compartilhar link com parceiras
3. ✅ Adicionar screenshots do app
4. ✅ Criar releases com APKs (opcional)

---

**Pronto! Siga os passos acima e seu projeto estará no GitHub! 🚀**
