import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/typography';
import {
  DEBIT_CATEGORIES,
  CREDIT_CATEGORIES,
  DEBIT_CATEGORY_LABELS,
  CREDIT_CATEGORY_LABELS,
} from '../../constants/categories';
import { useTransactionForm } from '../../hooks/useTransactionForm';
import { createTransaction } from '../../services/api';
import TypeSwitch from './TypeSwitch';
import CategoryPicker from './CategoryPicker';
import AmountInput from './AmountInput';
import { ModernInput } from '../common/ModernInput';

interface TransactionFormProps {
  onTransactionAdded?: () => void;
}

/**
 * Complete Add Transaction form — uses ModernInput, TypeSwitch, CategoryPicker.
 */
const TransactionForm: React.FC<TransactionFormProps> = ({ onTransactionAdded }) => {
  const {
    state,
    setType,
    setDebitCategory,
    setCreditCategory,
    setAmount,
    setTitle,
    reset,
    getActiveCategory,
  } = useTransactionForm();

  const isCredit = state.selectedType === 'CREDIT';

  const handleSubmit = async () => {
    const amount = Number(state.amount);
    if (!state.title.trim()) {
      Alert.alert('Validation', 'Please enter a description for this transaction.');
      return;
    }
    if (amount <= 0) {
      Alert.alert('Validation', 'Please enter a valid amount greater than 0.');
      return;
    }
    await createTransaction({
      title: state.title.trim(),
      type: state.selectedType,
      category: getActiveCategory(),
      amount,
    });
    Alert.alert('Success', 'Transaction added!', [
      {
        text: 'OK',
        onPress: () => {
          reset();
          onTransactionAdded?.();
        },
      },
    ]);
  };

  return (
    <View style={styles.form}>
      {/* Type toggle */}
      <TypeSwitch selected={state.selectedType} onSelect={setType} />

      {/* Amount */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Amount</Text>
        <AmountInput value={state.amount} onChangeText={setAmount} />
      </View>

      {/* Description */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>What was it for?</Text>
        <ModernInput
          value={state.title}
          onChangeText={setTitle}
          placeholder="e.g. Grocery, Salary"
          returnKeyType="done"
          autoCapitalize="sentences"
        />
      </View>

      {/* Debit category */}
      {!isCredit && (
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Category</Text>
          <CategoryPicker
            categories={[...DEBIT_CATEGORIES]}
            labels={DEBIT_CATEGORY_LABELS}
            selectedCategory={state.selectedDebitCategory}
            onSelect={(cat) => setDebitCategory(cat as any)}
          />
        </View>
      )}

      {/* Credit category */}
      {isCredit && (
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Category</Text>
          <CategoryPicker
            categories={[...CREDIT_CATEGORIES]}
            labels={CREDIT_CATEGORY_LABELS}
            selectedCategory={state.selectedCreditCategory}
            onSelect={(cat) => setCreditCategory(cat as any)}
          />
        </View>
      )}

      {/* Submit */}
      <View>
        <View style={styles.shadow}></View>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit} activeOpacity={0.85}>
          <Text style={styles.saveBtnText}>＋ Add Transaction</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 13,
  },
  fieldGroup: { gap: 6 },
  label: {
    fontFamily: Fonts.dmSansBold,
    fontSize: 11,
    color: Colors.black,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  saveBtn: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: Colors.black,
    borderRadius: 14,
    backgroundColor: Colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    fontFamily: Fonts.dmSansBold,
    fontSize: 14,
    color: Colors.black,
  },
  shadow: {
    position: "absolute",
    top: 2,
    left: 2,
    right: -4,
    bottom: -4,
    backgroundColor: Colors.black,
    borderRadius: 14,
  }
});

export default TransactionForm;
