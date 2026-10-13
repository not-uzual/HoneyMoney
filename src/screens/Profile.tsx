import EyebrowText from '@/components/common/EyebrowText';
import { QRCard } from '@/components/common/QRCard';
import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/typography';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatCurrency } from 'referenceFrontend/utils';

export const Profile: React.FC<{
  userData: { name: string; username: string; balance: number } | null;
  profileInitials: string;
  todaySpent: number;
}> = ({ userData, profileInitials, todaySpent }) => {
  return (
    <>
      <View style={styles.profileHeroCard}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>{profileInitials}</Text>
        </View>
        <View style={styles.profileInfo}>
          <EyebrowText>PROFILE</EyebrowText>
          <Text style={styles.profileName}>{userData?.name ?? 'Arya Sharma'}</Text>
          <Text style={styles.profileUsername}>@{userData?.username ?? 'honey.money'}</Text>
        </View>
      </View>

      <View style={styles.scannerBox}>
        <QRCard qrCodeData='ujjwalsahu' />
      </View>

      {/* Action buttons — with black hard shadow */}
      <View style={styles.profileActions}>
        {[
          { label: 'Edit profile' },
          { label: 'Refer & Earn' },
          { label: 'Policy & Security' },
          { label: 'Help & Support' },
        ].map((action) => (
          <View style={styles.container} key={action.label}>
            <View style={styles.shadow}></View>
            <TouchableOpacity
              key={action.label}
              style={styles.profileActionBtn}
              activeOpacity={0.85}>
              <Text style={styles.profileActionBtnText}>{action.label}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  // ── Profile panel ──
  profileHeroCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 2,
    borderColor: Colors.black,
  },

  profileAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.black,
  },
  profileAvatarText: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 20,
    color: Colors.black,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 22,
    letterSpacing: -0.5,
    color: Colors.black,
    marginTop: 2,
    marginBottom: 2,
  },
  profileUsername: {
    fontFamily: Fonts.dmSans,
    fontSize: 12,
    color: Colors.gray,
  },

  profileActions: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 20,
    padding: 5,
  },
  container: {
    flex: 1,
    minWidth: 120,
    minHeight: 40,
  },
  profileActionBtn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.black,
    backgroundColor: Colors.lime,
    textAlign: 'center',
  },
  profileActionBtnText: {
    fontFamily: Fonts.dmSansBold,
    fontSize: 15,
    color: Colors.black,
  },
  scannerBox: {
    flex: 1,
    height: 320,
    backgroundColor: Colors.black,
    borderColor: Colors.lime,
    borderWidth: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    position: 'absolute',
    backgroundColor: Colors.black,
    borderRadius: 10,
    top: 0,
    left: 0,
    bottom: -4,
    right: -3,
    zIndex: -1
  }
});
