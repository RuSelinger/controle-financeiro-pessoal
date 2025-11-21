import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, updateTransaction, deleteTransaction } from '../store/slices/transactionSlice';
import CategorySelector from '../components/CategorySelector';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../constants/categories';
import { formatDate } from '../utils/dateUtils';
import theme from '../constants/theme';

const TransactionFormScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { transaction: existingTransaction, type: initialType, isEdit } = route.params || {};
  
  const [formType, setFormType] = useState(initialType || existingTransaction?.type || 'expense');
  const [amount, setAmount] = useState(existingTransaction?.amount?.toString() || '');
  const [description, setDescription] = useState(existingTransaction?.description || '');
  const [category, setCategory] = useState(existingTransaction?.category || '1');
  const [date, setDate] = useState(
    existingTransaction?.date || new Date().toISOString().split('T')[0]
  );

  const categories = formType === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleSave = () => {
    // Validações
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Erro', 'Por favor, informe um valor válido');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Erro', 'Por favor, informe uma descrição');
      return;
    }

    if (!category) {
      Alert.alert('Erro', 'Por favor, selecione uma categoria');
      return;
    }

    const transactionData = {
      type: formType,
      amount: parseFloat(amount),
      description: description.trim(),
      category,
      date,
    };

    if (isEdit && existingTransaction) {
      dispatch(updateTransaction({ id: existingTransaction.id, transaction: transactionData }));
      Alert.alert('Sucesso', 'Transação atualizada com sucesso!');
    } else {
      dispatch(addTransaction(transactionData));
      Alert.alert('Sucesso', 'Transação adicionada com sucesso!');
    }

    navigation.goBack();
  };

  const handleDelete = () => {
    if (!isEdit || !existingTransaction) return;

    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir esta transação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteTransaction(existingTransaction.id));
            Alert.alert('Sucesso', 'Transação excluída com sucesso!');
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Type Selector */}
      <View style={styles.typeSelector}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            formType === 'income' && styles.typeButtonActive,
            formType === 'income' && styles.incomeButtonActive,
          ]}
          onPress={() => {
            setFormType('income');
            setCategory('1');
          }}
        >
          <Text
            style={[
              styles.typeButtonText,
              formType === 'income' && styles.typeButtonTextActive,
            ]}
          >
            Receita
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.typeButton,
            formType === 'expense' && styles.typeButtonActive,
            formType === 'expense' && styles.expenseButtonActive,
          ]}
          onPress={() => {
            setFormType('expense');
            setCategory('1');
          }}
        >
          <Text
            style={[
              styles.typeButtonText,
              formType === 'expense' && styles.typeButtonTextActive,
            ]}
          >
            Despesa
          </Text>
        </TouchableOpacity>
      </View>

      {/* Amount Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Valor (R$)</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          placeholder="0,00"
          keyboardType="decimal-pad"
          placeholderTextColor="#999"
        />
      </View>

      {/* Description Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Ex: Salário, Almoço, etc."
          placeholderTextColor="#999"
        />
      </View>

      {/* Category Selector */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Categoria</Text>
        <CategorySelector
          categories={categories}
          selectedCategory={category}
          onSelect={setCategory}
        />
      </View>

      {/* Date Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Data</Text>
        <TextInput
          style={styles.input}
          value={formatDate(date)}
          editable={false}
          placeholderTextColor="#999"
        />
        <Text style={styles.dateHint}>
          Data atual: {formatDate(new Date().toISOString().split('T')[0])}
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {isEdit ? 'Atualizar' : 'Salvar'}
          </Text>
        </TouchableOpacity>

        {isEdit && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Excluir</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  content: {
    padding: theme.spacing.md,
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xs,
    ...theme.shadows.small,
  },
  typeButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    borderRadius: theme.borderRadius.sm,
  },
  typeButtonActive: {
    backgroundColor: theme.colors.accent.primary,
  },
  incomeButtonActive: {
    backgroundColor: theme.colors.functional.income,
  },
  expenseButtonActive: {
    backgroundColor: theme.colors.functional.expense,
  },
  typeButtonText: {
    fontSize: theme.fonts.sizes.md,
    color: theme.colors.text.gray,
    fontWeight: theme.fonts.weights.medium,
    letterSpacing: 0.3,
  },
  typeButtonTextActive: {
    color: theme.colors.text.white,
    fontWeight: theme.fonts.weights.semibold,
  },
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.fonts.sizes.sm,
    fontWeight: theme.fonts.weights.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
    letterSpacing: 0.2,
  },
  input: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    fontSize: theme.fonts.sizes.md,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    color: theme.colors.text.primary,
    ...theme.shadows.small,
  },
  dateHint: {
    fontSize: theme.fonts.sizes.xs,
    color: theme.colors.text.gray,
    marginTop: theme.spacing.xs,
    opacity: 0.7,
  },
  actionsContainer: {
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.xl,
  },
  saveButton: {
    backgroundColor: theme.colors.accent.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    ...theme.shadows.medium,
  },
  saveButtonText: {
    color: theme.colors.text.white,
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.semibold,
    letterSpacing: 0.5,
  },
  deleteButton: {
    backgroundColor: theme.colors.functional.expense,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  deleteButtonText: {
    color: theme.colors.text.white,
    fontSize: theme.fonts.sizes.md,
    fontWeight: theme.fonts.weights.semibold,
    letterSpacing: 0.5,
  },
});

export default TransactionFormScreen;

