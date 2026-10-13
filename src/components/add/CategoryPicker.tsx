import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/typography';

interface CategoryPickerProps {
  categories: string[];
  labels: Record<string, string>;
  selectedCategory: string;
  onSelect: (category: string) => void;
}

/**
 * Horizontally-wrapping category chip picker.
 * Active chip: lime bg + black hard shadow (matches reference frontend).
 * Inactive chip: white bg, slate border.
 */
const CategoryPicker: React.FC<CategoryPickerProps> = ({
  categories,
  labels,
  selectedCategory,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.chipsWrap}>
        {categories.map((cat) => {
          const isActive = cat === selectedCategory;
          return (
            <View key={cat}>
              {isActive && <View style={styles.chipShadow} />}
              <TouchableOpacity
                style={[styles.chip, isActive && styles.chipActive]}
                onPress={() => onSelect(cat)}
                activeOpacity={0.75}>
                <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                  {labels[cat] ?? cat}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chipShadow: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: -2,
    bottom: -3,

    backgroundColor: Colors.black,
    borderRadius: 16,
  },
  container: {
    padding: 8,
    borderWidth: 1.5,
    borderColor: Colors.black,
    borderRadius: 16,
    backgroundColor: Colors.white,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },
  chip: {
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderWidth: 1.5,
    borderColor: Colors.black,
    borderRadius: 999,
    backgroundColor: Colors.white,
  },
  chipActive: {
    backgroundColor: Colors.lime,
    borderColor: Colors.black,
  },
  chipText: {
    fontFamily: Fonts.dmSansBold,
    fontSize: 11,
    color: Colors.gray,
  },
  chipTextActive: {
    color: Colors.black,
  },
});

export default CategoryPicker;
