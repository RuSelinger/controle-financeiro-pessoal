import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch } from 'react-redux';
import CategorySelector from '../components/CategorySelector';
import CustomConfirmModal from '../components/CustomConfirmModal';
import CustomToast from '../components/CustomToast';
import DatePicker from '../components/DatePicker';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../constants/categories';
import theme from '../constants/theme';
import { addTransaction, deleteTransaction, updateTransaction } from '../store/slices/transactionSlice';

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

  // Estados para o toast
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  // Estados para o modal de confirmação
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const categories = formType === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const showToast = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const validateAmount = (value) => {
    const numValue = parseFloat(value);
    if (!value || value.trim() === '') {
      return { valid: false, message: 'O valor é obrigatório' };
    }
    if (isNaN(numValue)) {
      return { valid: false, message: 'Digite um valor numérico válido' };
    }
    if (numValue <= 0) {
      return { valid: false, message: 'O valor deve ser maior que zero' };
    }
    if (numValue > 999999999) {
      return { valid: false, message: 'Valor muito grande. Máximo: R$ 999.999.999,00' };
    }
    // Validar máximo de 2 casas decimais
    const decimalPart = value.split('.')[1] || value.split(',')[1];
    if (decimalPart && decimalPart.length > 2) {
      return { valid: false, message: 'Use no máximo 2 casas decimais' };
    }
    return { valid: true };
  };

  const validateDescription = (value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return { valid: false, message: 'A descrição é obrigatória' };
    }
    if (trimmed.length < 3) {
      return { valid: false, message: 'A descrição deve ter pelo menos 3 caracteres' };
    }
    if (trimmed.length > 100) {
      return { valid: false, message: 'A descrição deve ter no máximo 100 caracteres' };
    }
    return { valid: true };
  };

  const validateDate = (dateStr) => {
    if (!dateStr) {
      return { valid: false, message: 'A data é obrigatória' };
    }
    const selectedDate = new Date(dateStr);
    const today = new Date();
    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(today.getFullYear() - 10);
    const oneYearAhead = new Date();
    oneYearAhead.setFullYear(today.getFullYear() + 1);

    if (selectedDate < tenYearsAgo) {
      return { valid: false, message: 'Data muito antiga (máximo 10 anos atrás)' };
    }
    if (selectedDate > oneYearAhead) {
      return { valid: false, message: 'Data muito no futuro (máximo 1 ano)' };
    }
    return { valid: true };
  };

  const handleSave = async () => {
    try {
      // Validações detalhadas
      const amountValidation = validateAmount(amount);
      if (!amountValidation.valid) {
        Alert.alert('Valor Inválido', amountValidation.message);
        return;
      }

      const descriptionValidation = validateDescription(description);
      if (!descriptionValidation.valid) {
        Alert.alert('Descrição Inválida', descriptionValidation.message);
        return;
      }

      if (!category) {
        Alert.alert('Categoria Obrigatória', 'Por favor, selecione uma categoria');
        return;
      }

      const dateValidation = validateDate(date);
      if (!dateValidation.valid) {
        Alert.alert('Data Inválida', dateValidation.message);
        return;
      }

      const transactionData = {
        type: formType,
        amount: parseFloat(amount.replace(',', '.')),
        description: description.trim(),
        category,
        date,
      };

      if (isEdit && existingTransaction) {
        await dispatch(updateTransaction({ id: existingTransaction.id, transaction: transactionData })).unwrap();
        showToast('Transação atualizada com sucesso!', 'success');
      } else {
        await dispatch(addTransaction(transactionData)).unwrap();
        showToast('Transação adicionada com sucesso!', 'success');
      }

      // Aguardar um pouco para mostrar o toast antes de voltar
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (err) {
      console.error('Erro ao salvar transação:', err);
      Alert.alert(
        'Erro ao Salvar',
        err.message || 'Não foi possível salvar a transação. Tente novamente.'
      );
    }
  };

  const handleDelete = () => {
    if (!isEdit || !existingTransaction) return;
    setConfirmModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    setConfirmModalVisible(false);
    try {
      await dispatch(deleteTransaction(existingTransaction.id)).unwrap();
      showToast('Transação excluída com sucesso!', 'success');
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (err) {
      console.error('Erro ao excluir transação:', err);
      showToast('Não foi possível excluir a transação', 'error');
    }
  };

  return (
    <View style={styles.wrapper}>
      <CustomToast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
        onHide={() => setToastVisible(false)}
      />
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
          <DatePicker
            value={date}
            onChange={setDate}
            placeholder="Selecione a data da transação"
          />
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
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
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
  inputHint: {
    fontSize: theme.fonts.sizes.xs,
    color: theme.colors.text.gray,
    marginTop: theme.spacing.xs,
    fontStyle: 'italic',
  },
});

export default TransactionFormScreen;

