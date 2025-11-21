# 📄 Como Converter para Word

O arquivo `QUESTIONARIOS_PREENCHIDOS.md` foi criado com todas as respostas das três parceiras.

## Opções para Converter para Word:

### Opção 1: Copiar e Colar (Mais Rápido)

1. Abra o arquivo `docs/QUESTIONARIOS_PREENCHIDOS.md`
2. Selecione todo o conteúdo (Ctrl+A)
3. Copie (Ctrl+C)
4. Abra o Microsoft Word
5. Cole (Ctrl+V)
6. O Word manterá a formatação básica
7. Ajuste formatação se necessário (títulos, espaçamento, etc.)

### Opção 2: Usar Pandoc (Mais Profissional)

```bash
# Instalar Pandoc (se não tiver)
# Windows: https://pandoc.org/installing.html

# Converter para Word
pandoc docs/QUESTIONARIOS_PREENCHIDOS.md -o docs/Questionarios_Preenchidos.docx
```

### Opção 3: Usar Ferramenta Online

1. Acesse: https://www.markdowntoword.com/
2. Faça upload do arquivo `.md`
3. Baixe o arquivo `.docx` gerado

### Opção 4: GitHub/GitLab (Se o repositório estiver online)

1. Abra o arquivo no GitHub
2. Clique em "Raw"
3. Copie o conteúdo
4. Cole no Word

## Formatação Sugerida no Word:

-   **Títulos principais:** Fonte 16pt, Negrito
-   **Subtítulos:** Fonte 14pt, Negrito
-   **Texto normal:** Fonte 12pt
-   **Checkboxes:** Use símbolos ✓ ou ☑
-   **Espaçamento:** 1.5 entre linhas
-   **Margens:** 2.5cm em todos os lados

## Estrutura do Documento:

O documento contém:

1. Questionário completo da Ketlin (páginas 1-3)
2. Questionário completo da Patrícia (páginas 4-6)
3. Questionário completo da Sara (páginas 7-9)
4. Resumo das avaliações (página final)

---

**O arquivo está pronto para ser convertido!**
