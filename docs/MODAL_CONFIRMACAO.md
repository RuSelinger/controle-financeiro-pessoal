# 🎨 Modal de Confirmação Customizado

## 📋 Visão Geral

Substituído o `Alert.alert()` nativo para confirmações por um **Modal customizado** que segue o design system "Calma e Orgânica" do aplicativo.

---

## ✨ Características do CustomConfirmModal

### 🎭 Visual
- **Cores do tema:** Terracota para danger, Laranja para warning, Verde Sálvia para info
- **Animação suave:** Fade + scale animation para entrada/saída
- **Ícones grandes:** MaterialCommunityIcons 48px em círculo destacado
- **Fundo escurecido:** Overlay semitransparente (50% opacity)
- **Sombra:** Elevation alta para destaque
- **Responsivo:** Largura máxima 400px, adaptável

### ⚙️ Funcionalidade
- **Tipos:** Danger (vermelho), Warning (laranja), Info (verde)
- **Customizável:** Título, mensagem, textos dos botões, ícone
- **Animações:** Spring para entrada + Timing para saída
- **Backdrop:** Toque fora fecha o modal (onCancel)
- **Acessível:** Respeita onRequestClose do Android

---

## 🎨 Tipos de Modal

### 🔴 Danger (Vermelho - Terracota)
```javascript
<CustomConfirmModal
  visible={true}
  title="Excluir Transação"
  message="Esta ação não pode ser desfeita."
  confirmText="Excluir"
  cancelText="Cancelar"
  onConfirm={handleDelete}
  onCancel={handleCancel}
  type="danger"
  icon="delete-outline"
/>
```
- **Cor:** `#C97D60` (Terracota escuro)
- **Uso:** Ações destrutivas (excluir, remover)

### 🟠 Warning (Laranja)
```javascript
<CustomConfirmModal
  visible={true}
  title="Atenção"
  message="Esta operação pode afetar outros dados."
  confirmText="Continuar"
  cancelText="Cancelar"
  onConfirm={handleContinue}
  onCancel={handleCancel}
  type="warning"
  icon="alert-outline"
/>
```
- **Cor:** `#E37D5A` (Terracota)
- **Uso:** Avisos importantes

### 🟢 Info (Verde Sálvia)
```javascript
<CustomConfirmModal
  visible={true}
  title="Confirmar Ação"
  message="Deseja realmente fazer isso?"
  confirmText="Sim"
  cancelText="Não"
  onConfirm={handleYes}
  onCancel={handleNo}
  type="info"
  icon="information-outline"
/>
```
- **Cor:** `#9CAF88` (Verde Sálvia)
- **Uso:** Confirmações neutras

---

## 📱 Implementação

### 1. Importar o Componente
```javascript
import CustomConfirmModal from '../components/CustomConfirmModal';
```

### 2. Adicionar Estado
```javascript
const [confirmModalVisible, setConfirmModalVisible] = useState(false);
```

### 3. Adicionar no JSX
```javascript
<CustomConfirmModal
  visible={confirmModalVisible}
  title="Excluir Transação"
  message="Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita."
  confirmText="Excluir"
  cancelText="Cancelar"
  onConfirm={handleConfirmDelete}
  onCancel={() => setConfirmModalVisible(false)}
  type="danger"
  icon="delete-outline"
/>
```

### 4. Abrir o Modal
```javascript
const handleDelete = () => {
  setConfirmModalVisible(true);
};
```

### 5. Ação de Confirmação
```javascript
const handleConfirmDelete = async () => {
  setConfirmModalVisible(false);
  // Executar ação...
  await deleteItem();
};
```

---

## 🎨 Props do Componente

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `visible` | boolean | - | Controla visibilidade do modal |
| `title` | string | - | Título do modal |
| `message` | string | - | Mensagem de confirmação |
| `confirmText` | string | "Confirmar" | Texto do botão de confirmação |
| `cancelText` | string | "Cancelar" | Texto do botão de cancelar |
| `onConfirm` | function | - | Callback ao confirmar |
| `onCancel` | function | - | Callback ao cancelar |
| `type` | string | "danger" | Tipo: danger, warning, info |
| `icon` | string | "alert-circle-outline" | Nome do ícone (MaterialCommunityIcons) |

---

## 🎯 Melhorias Implementadas

### Antes (Alert.alert)
```javascript
Alert.alert(
  'Confirmar Exclusão',
  'Tem certeza que deseja excluir?',
  [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'Excluir', style: 'destructive', onPress: handleDelete }
  ]
);
```

**Problemas:**
- ❌ Visual nativo (não personalizável)
- ❌ Diferente entre Android/iOS
- ❌ Sem animações suaves
- ❌ Sem ícones destacados
- ❌ Cores não customizáveis

### Depois (CustomConfirmModal)
```javascript
<CustomConfirmModal
  visible={confirmModalVisible}
  title="Excluir Transação"
  message="Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita."
  confirmText="Excluir"
  cancelText="Cancelar"
  onConfirm={handleConfirmDelete}
  onCancel={() => setConfirmModalVisible(false)}
  type="danger"
  icon="delete-outline"
/>
```

**Vantagens:**
- ✅ Visual totalmente customizado
- ✅ Consistente em todas plataformas
- ✅ Animações suaves (fade + scale)
- ✅ Ícone grande e destacado
- ✅ Cores do tema aplicadas
- ✅ Backdrop com blur effect
- ✅ Melhor hierarquia visual

---

## 🎨 Design Specifications

### Layout
```
┌─────────────────────────────────────┐
│                                     │
│         ╔═══════════╗              │
│         ║           ║              │
│         ║   [🗑️]    ║  ← Ícone 48px│
│         ║           ║              │
│         ╚═══════════╝              │
│                                     │
│      Excluir Transação  ← Título   │
│                                     │
│   Tem certeza que deseja excluir   │
│   esta transação? Esta ação não    │
│   pode ser desfeita.    ← Mensagem │
│                                     │
│  ┌──────────┐  ┌──────────┐       │
│  │ Cancelar │  │ Excluir  │       │
│  └──────────┘  └──────────┘       │
│                                     │
└─────────────────────────────────────┘
```

### Cores por Tipo
```javascript
Danger:  
  - Background: #C97D6015 (15% opacity)
  - Icon: #C97D60 (Terracota escuro)
  
Warning: 
  - Background: #E37D5A15 (15% opacity)
  - Icon: #E37D5A (Terracota)
  
Info:    
  - Background: #9CAF8815 (15% opacity)
  - Icon: #9CAF88 (Verde Sálvia)
```

### Animações
```javascript
Entrada:
  - Fade: 0 → 1 (200ms timing)
  - Scale: 0.9 → 1 (spring, tension: 100, friction: 10)

Saída:
  - Fade: 1 → 0 (150ms timing)
  - Scale: 1 → 0.9 (150ms timing)
```

### Dimensões
```javascript
Modal:
  - Width: 100% (max 400px)
  - Padding: 32px
  - Border radius: 16px

Ícone:
  - Container: 80x80px
  - Icon size: 48px
  - Border radius: full (circle)

Botões:
  - Height: auto (padding 16px)
  - Gap: 8px
  - Border radius: 12px
```

---

## 📊 Ícones Sugeridos (MaterialCommunityIcons)

### Ações Destrutivas (type="danger")
- `delete-outline` - Excluir
- `trash-can-outline` - Remover
- `cancel` - Cancelar operação
- `close-circle-outline` - Fechar/Descartar

### Avisos (type="warning")
- `alert-outline` - Alerta geral
- `alert-circle-outline` - Atenção
- `information-outline` - Informação importante
- `help-circle-outline` - Ajuda/Dúvida

### Confirmações (type="info")
- `check-circle-outline` - Confirmar
- `shield-check-outline` - Segurança
- `information-outline` - Informação
- `lightbulb-outline` - Dica

---

## 🔄 Fluxo de Uso Completo

### Exemplo Real: Excluir Transação

```javascript
// 1. Estados
const [confirmModalVisible, setConfirmModalVisible] = useState(false);
const [toastVisible, setToastVisible] = useState(false);

// 2. Abrir modal ao clicar em excluir
const handleDelete = () => {
  setConfirmModalVisible(true);
};

// 3. Confirmar exclusão
const handleConfirmDelete = async () => {
  setConfirmModalVisible(false); // Fechar modal
  
  try {
    await dispatch(deleteTransaction(id)).unwrap();
    
    // Mostrar toast de sucesso
    setToastMessage('Transação excluída com sucesso!');
    setToastType('success');
    setToastVisible(true);
    
    // Voltar após 1.5s
    setTimeout(() => navigation.goBack(), 1500);
    
  } catch (err) {
    // Mostrar toast de erro
    setToastMessage('Não foi possível excluir a transação');
    setToastType('error');
    setToastVisible(true);
  }
};

// 4. JSX
<CustomConfirmModal
  visible={confirmModalVisible}
  title="Excluir Transação"
  message="Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita."
  confirmText="Excluir"
  cancelText="Cancelar"
  onConfirm={handleConfirmDelete}
  onCancel={() => setConfirmModalVisible(false)}
  type="danger"
  icon="delete-outline"
/>

<CustomToast
  visible={toastVisible}
  message={toastMessage}
  type={toastType}
  onHide={() => setToastVisible(false)}
/>
```

---

## 📝 Arquivos Modificados

1. ✅ `src/components/CustomConfirmModal.js` (NOVO - 213 linhas)
2. ✅ `src/screens/TransactionFormScreen.js` (modal integrado)

---

## ✅ Checklist de Implementação

- [x] Componente CustomConfirmModal criado
- [x] Animações suaves implementadas
- [x] 3 tipos (danger, warning, info)
- [x] Cores do tema aplicadas
- [x] Ícones customizáveis
- [x] TransactionFormScreen atualizado
- [x] Backdrop dismissível
- [x] Linting sem erros
- [x] Documentação completa
- [ ] Testes E2E (próximo passo)

---

## 🚀 Próximas Melhorias (Opcional)

### Recursos Adicionais
- [ ] Suporte a inputs no modal (prompt customizado)
- [ ] Terceiro botão (neutral action)
- [ ] Loading state no botão de confirmar
- [ ] Som de feedback
- [ ] Vibração haptic
- [ ] Animação de shake ao erro
- [ ] Variação de tamanho (small, medium, large)

### Exemplos de Uso Avançado
```javascript
// Com loading no botão
<CustomConfirmModal
  confirmText="Excluindo..."
  confirmLoading={isDeleting}
/>

// Com terceiro botão
<CustomConfirmModal
  neutralText="Salvar antes"
  onNeutral={handleSave}
/>

// Tamanho pequeno
<CustomConfirmModal
  size="small"
  title="Confirmar"
  message="Deseja continuar?"
/>
```

---

## 🎉 Resultado Final

### Experiência do Usuário

**Antes:** 
- Alerta nativo simples
- Visual genérico
- Sem ícone destacado

**Depois:**
- Modal customizado elegante
- Visual profissional
- Ícone grande e destacado
- Animações suaves
- Cores do tema

### Feedback Visual
- 🎨 Design consistente e profissional
- 💚 Cores harmoniosas do tema
- ⭕ Ícones grandes (48px) e destacados
- 🎭 Animações suaves (fade + spring)
- 📱 Responsivo e adaptável

---

**Desenvolvido em:** 21/11/2025  
**Status:** ✅ Implementado e Funcionando  
**Compatibilidade:** iOS e Android  
**Design System:** Tema "Calma e Orgânica"

