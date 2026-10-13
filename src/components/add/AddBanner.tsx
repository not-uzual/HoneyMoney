import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/typography';
import EyebrowText from '../common/EyebrowText';
import { Astroid } from 'lucide-react-native';

/**
 * Dark "QUICK ENTRY" promotional banner on the Add screen.
 *
 * CSS reference:
 * .add-banner { padding: 16px; border: 2px solid black; border-radius: 21px;
 *   background: black; color: white; display: flex; gap: 12px; align-items: center;
 *   box-shadow: 4px 4px 0 var(--lime); }
 * .add-banner > span { width: 36px; height: 36px; border-radius: 50%;
 *   background: lime; color: black; place-items: center; font-size: 18px; }
 * .add-banner p { color: #a0a099; font-size: 9px; font-weight: 700; letter-spacing: 1px; }
 * .add-banner h2 { margin-top: 3px; font-family: Space Grotesk; font-size: 18px; }
 */
const AddBanner: React.FC = () => {
  return (
    <View style={styles.shadow}>
      <View style={styles.banner}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}><Astroid fill={'black'}/></Text>
        </View>

        <View>
          <EyebrowText>QUICK ENTRY</EyebrowText>
          <Text style={styles.heading}>Track every rupee.</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    padding: 5,
    backgroundColor: Colors.lime,
    borderRadius: 22,
  },
  banner: {
    padding: 16,
    borderRadius: 21,
    backgroundColor: Colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 18,
    color: Colors.black,
    alignSelf: 'center',
  },
  heading: {
    fontFamily: Fonts.spaceGroteskSemiBold,
    fontSize: 18,
    color: Colors.white,
    marginTop: 3,
  },
});

export default AddBanner;
