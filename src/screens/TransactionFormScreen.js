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
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 16,
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 4,
    elevation: 2,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  typeButtonActive: {
    backgroundColor: '#3498DB',
  },
  incomeButtonActive: {
    backgroundColor: '#2ECC71',
  },
  expenseButtonActive: {
    backgroundColor: '#E74C3C',
  },
  typeButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  typeButtonTextActive: {
    color: '#FFF',
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dateHint: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  actionsContainer: {
    marginTop: 8,
    marginBottom: 32,
  },
  saveButton: {
    backgroundColor: '#3498DB',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TransactionFormScreen;

