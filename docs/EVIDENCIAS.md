# Evidências do Projeto - Controle Financeiro Pessoal

Este documento serve como guia para organizar as evidências necessárias para o projeto de extensão.

## 📋 Checklist de Evidências

### 1. Evidências de Processo

#### Protótipos no Figma
- [ ] Capturas de tela dos protótipos das telas principais:
  - [ ] Dashboard
  - [ ] Lista de Transações
  - [ ] Formulário de Receita/Despesa
- [ ] Fluxo de navegação entre telas
- [ ] Paleta de cores e design system

**Como obter:**
1. Criar conta no Figma (gratuito)
2. Desenhar os protótipos das telas
3. Tirar screenshots ou exportar como imagens
4. Salvar na pasta `docs/evidencias/processo/`

### 2. Evidências de Código

#### Repositório GitHub
- [x] Código fonte completo do projeto
- [x] README.md com descrição do projeto
- [x] Estrutura organizada de pastas
- [x] Comentários no código explicando funcionalidades

**Link do repositório:** (Adicionar após criar o repositório no GitHub)

**Como criar:**
```bash
# Inicializar repositório Git
git init
git add .
git commit -m "Initial commit - Projeto Controle Financeiro Pessoal"

# Criar repositório no GitHub e conectar
git remote add origin https://github.com/seu-usuario/controle-financeiro-pessoal.git
git branch -M main
git push -u origin main
```

### 3. Evidências de Interação

#### Sessões de Feedback com Parceiras
- [ ] Fotos ou prints das sessões de entrevista inicial (Semana 1)
- [ ] Registros das sessões de teste (Semana 7)
- [ ] Documentação do feedback recebido

**Parceiras:**
- Patrícia Cardoso Selinger
- Ketlin Guerreiro da Silva Selinger
- Sara Selinger Fernandes

**Como documentar:**
1. Tirar fotos durante as reuniões (com permissão)
2. Fazer prints das telas durante os testes
3. Criar um documento com o feedback coletado
4. Salvar na pasta `docs/evidencias/interacao/`

### 4. Evidências de Resultado

#### Aplicativo Finalizado
- [ ] Arquivo APK gerado
- [ ] Screenshots do aplicativo funcionando
- [ ] Vídeo demonstrativo (opcional, mas recomendado)

**Como gerar APK:**
```bash
# Usando EAS Build
eas build --platform android --profile production
```

#### Questionário de Satisfação
- [ ] Formulário aplicado às parceiras
- [ ] Resultados tabulados
- [ ] Análise dos resultados

**Modelo de Questionário:**

1. Em uma escala de 1 a 5, o quanto o aplicativo ajudou você a entender seus gastos?
   - [ ] 1 - Nada
   - [ ] 2 - Pouco
   - [ ] 3 - Moderadamente
   - [ ] 4 - Muito
   - [ ] 5 - Extremamente

2. Você continuaria usando o aplicativo após o período de teste?
   - [ ] Sim
   - [ ] Não
   - [ ] Talvez

3. Qual funcionalidade você mais gostou?
   - [ ] Dashboard com visão geral
   - [ ] Categorização de despesas
   - [ ] Facilidade de adicionar transações
   - [ ] Outro: ___________

4. O que você mudaria ou melhoraria no aplicativo?
   - (Campo de texto livre)

5. Você recomendaria este aplicativo para outras pessoas?
   - [ ] Sim
   - [ ] Não
   - [ ] Talvez

## 📁 Estrutura de Pastas para Evidências

```
docs/
├── evidencias/
│   ├── processo/
│   │   └── prototipos-figma/
│   ├── codigo/
│   │   └── (link do GitHub)
│   ├── interacao/
│   │   ├── entrevistas/
│   │   └── testes/
│   └── resultado/
│       ├── apk/
│       ├── screenshots/
│       └── questionarios/
└── relatorio-final.md
```

## 📊 Indicadores de Sucesso

### Indicador Quantitativo (Adesão)
- **Meta:** 100% do grupo de parceiras usando o aplicativo após 2 semanas
- **Medição:** Verificar uso através de dados do banco ou questionário

### Indicador Qualitativo (Percepção)
- **Meta:** Média de 4+ na escala de 1-5
- **Medição:** Questionário de satisfação

### Indicador Qualitativo (Feedback Direto)
- **Meta:** Coletar pelo menos 3 sugestões de melhoria
- **Medição:** Depoimentos e feedback das parceiras

## 📝 Relatório Final

Ao final do projeto, criar um relatório final incluindo:

1. Resumo executivo
2. Metodologia aplicada
3. Resultados alcançados
4. Análise dos indicadores
5. Lições aprendidas
6. Próximos passos e melhorias futuras

---

**Nota:** Este documento deve ser atualizado ao longo do desenvolvimento do projeto.

