import { Colors } from "@/constants/colors";
import { View, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

export const QRCard: React.FC<{
  qrCodeData: string;
  qrCodeSize?: number;
}> = ({ qrCodeData, qrCodeSize = 220 }) => {
  return (
    <View style={styles.qrCard}>
      <QRCode
      value={qrCodeData}
      size={qrCodeSize}
      color={Colors.lime}
      backgroundColor={Colors.black}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    qrCard: {
        
    }
});