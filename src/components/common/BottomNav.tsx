import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../constants/colors";

export interface NavItem {
  key: string;
  icon: any;
  label: string;
}

interface BottomNavProps {
  items: NavItem[];
  activePanel: string;
  onSelect: (key: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({
  items,
  activePanel,
  onSelect,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          bottom: insets.bottom - 15,
        },
      ]}
    >
      {items.map((item) => {
        const active = activePanel === item.key;

        return (
          <TouchableOpacity
            key={item.key}
            activeOpacity={0.85}
            onPress={() => onSelect(item.key)}
            style={[
              styles.button,
              active && styles.activeButton,
            ]}
          >
            {item.icon}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FEFFFD",
    borderRadius: 18,
    padding: 8,
    borderWidth: 2,
    borderColor: Colors.black,
  },

  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
  },

  activeButton: {
    backgroundColor: Colors.lime,
  }
});

export default BottomNav;