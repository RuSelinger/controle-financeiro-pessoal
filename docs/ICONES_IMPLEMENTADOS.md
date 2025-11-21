# 🎨 Ícones Implementados - MaterialCommunityIcons

## Escolha do Conjunto de Ícones

Foi escolhido o **MaterialCommunityIcons** do `@expo/vector-icons` por ser:
- ✅ Moderno e elegante
- ✅ Estilo orgânico e suave
- ✅ Amplo catálogo de ícones
- ✅ Compatível com tema "Calma e Orgânico"
- ✅ Fácil de usar com Expo

## Ícones por Categoria

### Despesas (EXPENSE_CATEGORIES)

| Categoria | Ícone | Nome do Ícone | Cor |
|-----------|-------|---------------|-----|
| Alimentação | 🍴 | `food-fork-drink` | Terracota (#E37D5A) |
| Transporte | 🚗 | `car` | Terracota Escuro (#C97D60) |
| Lazer | 🎬 | `movie` | Marrom Claro (#D4A574) |
| Contas | 💡 | `lightbulb` | Marrom Suave (#A52A2A) |
| Saúde | ❤️ | `heart-pulse` | Verde Sálvia (#9CAF88) |
| Educação | 📖 | `book-open` | Marrom Médio (#8B6F47) |
| Compras | 🛒 | `shopping` | Terracota (#E37D5A) |
| Outros | ⚪ | `dots-horizontal-circle` | Verde Oliva (#808000) |

### Receitas (INCOME_CATEGORIES)

| Categoria | Ícone | Nome do Ícone | Cor |
|-----------|-------|---------------|-----|
| Salário | 💼 | `wallet` | Verde Sálvia (#9CAF88) |
| Freelance | 💼 | `briefcase` | Verde Oliva (#808000) |
| Investimentos | 📈 | `chart-line` | Verde Sálvia (#9CAF88) |
| Outros | 💵 | `cash-multiple` | Marrom Médio (#8B6F47) |

### Dashboard

| Elemento | Ícone | Nome do Ícone |
|----------|-------|---------------|
| Saldo Positivo | 💰 | `wallet` |
| Saldo Negativo | ⚠️ | `alert-circle` |
| Receitas | 📈 | `arrow-up-circle` |
| Despesas | 📉 | `arrow-down-circle` |
| Nova Receita | ➕ | `plus-circle` |
| Nova Despesa | ➖ | `minus-circle` |

## Componentes Atualizados

### ✅ StatCard
- Substituído emoji por `MaterialCommunityIcons`
- Ícone com cor dinâmica baseada na prop `color`
- Tamanho: 28px

### ✅ TransactionCard
- Ícones de categoria com cores personalizadas
- Background com opacidade da cor da categoria
- Tamanho: 26px

### ✅ CategorySelector
- Ícones em cada categoria
- Cor muda quando selecionado (branco) ou não (cor da categoria)
- Tamanho: 24px

### ✅ DashboardScreen
- Ícones nos cards de estatísticas
- Ícones nos botões de ação
- Tamanho: 20px nos botões

## Como Usar

### Importar
```javascript
import { MaterialCommunityIcons } from '@expo/vector-icons';
```

### Usar
```javascript
<MaterialCommunityIcons 
  name="wallet" 
  size={24} 
  color="#9CAF88" 
/>
```

## Referência de Ícones

Para encontrar mais ícones, consulte:
- **Documentação**: https://oblador.github.io/react-native-vector-icons/
- **Explorador de Ícones**: https://icons.expo.fyi/
- **Material Community Icons**: https://materialdesignicons.com/

## Vantagens dos Ícones

✅ **Consistência**: Todos os ícones do mesmo conjunto
✅ **Escalabilidade**: Vetoriais, ficam nítidos em qualquer tamanho
✅ **Customização**: Fácil mudar cor e tamanho
✅ **Performance**: Melhor que emojis em alguns casos
✅ **Profissionalismo**: Visual mais polido e moderno

---

**Todos os emojis foram substituídos por ícones modernos do MaterialCommunityIcons!** 🎨✨

