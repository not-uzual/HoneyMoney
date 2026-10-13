import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/typography';
import EyebrowText from './EyebrowText';
interface TopBarProps {
  eyebrow: string;
  title: string;
  profileInitials?: string;
  onProfilePress?: () => void;
}
/** * App top bar — eyebrow + title + optional profile avatar. * Profile button now uses a pink border + lime background for modern palette feel. */
const TopBar: React.FC<TopBarProps> = ({ eyebrow, title, profileInitials, onProfilePress }) => {
  return (
    <View style={styles.topbar}>
      <View>
        <EyebrowText>{eyebrow}</EyebrowText><Text style={styles.title}>{title}</Text>
      </View>
      {profileInitials ? (
        <View style={{ width: 55, height: 55 }}>
          <View
            style={{
              position: 'absolute',
              left: 4,
              top: 4,
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: '#000',
            }}
          />

          <TouchableOpacity
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              backgroundColor: Colors.lime,
              borderWidth: 3,
              borderColor: '#000',
              justifyContent: 'center',
              alignItems: 'center',
            }} activeOpacity={0.85} onPress={onProfilePress}>
            <Text
              style={{
                fontFamily: Fonts.spaceGroteskBold, fontSize: 16, color: Colors.black 
              }}>
              AS
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  topbar: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 22,
    letterSpacing: -1,
    color: Colors.black,
    marginTop: 2,
  }
});

export default TopBar;