import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/typography';
import { formatCurrency } from '../utils/currency';
import {
  formatTransactionData,
  FormattedTransaction,
  computeTodaySpent,
  computeMonthlyCredit,
  computeMonthlyDebit,
} from '../utils/transactions';
import { getUserData, getTransactions, UserData } from '../services/api';
import TopBar from '../components/common/TopBar';
import BottomNav, { NavItem } from '../components/common/BottomNav';
import EyebrowText from '../components/common/EyebrowText';
import TodaySummary from '../components/add/TodaySummary';
import AddBanner from '../components/add/AddBanner';
import TransactionForm from '../components/add/TransactionForm';
import { Profile } from './Profile';
import { ChartColumnBig, EyeClosed, HandCoins, House, ScanLine, Target, User, Users } from 'lucide-react-native';

type Panel = 'home' | 'add' | 'stats' | 'profile';

const NAV_ITEMS: NavItem[] = [
  { key: 'home', icon: <House />, label: 'Home' },
  { key: 'add', icon: <HandCoins />, label: 'Add' },
  { key: 'stats', icon: <ChartColumnBig />, label: 'Stats' },
  { key: 'profile', icon: <User />, label: 'Profile' },
];

/**
 * Main app screen — holds Home, Add, Stats, Profile panels.
 * Redesigned with universal palette, animations, and modern UI.
 */
const AddTransactionScreen: React.FC = () => {
  const [activePanel, setActivePanel] = useState<Panel>('home');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [transactions, setTransactions] = useState<FormattedTransaction[]>([]);
  const [todaySpent, setTodaySpent] = useState(0);
  const [monthlyCredit, setMonthlyCredit] = useState(0);
  const [monthlyDebit, setMonthlyDebit] = useState(0);
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  // Panel fade-in animation
  const panelOpacity = useRef(new Animated.Value(1)).current;

  const switchPanel = (panel: Panel) => {
    if (panel === activePanel) return;
    Animated.sequence([
      Animated.timing(panelOpacity, { toValue: 0, duration: 120, useNativeDriver: true }),
      Animated.timing(panelOpacity, { toValue: 1, duration: 220, useNativeDriver: true }),
    ]).start();
    setActivePanel(panel);
  };

  const loadData = async () => {
    const user = await getUserData();
    const rawTransactions = await getTransactions();
    const formatted = formatTransactionData(rawTransactions);
    setUserData(user);
    setTransactions(formatted);
    setTodaySpent(computeTodaySpent(rawTransactions));
    setMonthlyCredit(computeMonthlyCredit(rawTransactions));
    setMonthlyDebit(computeMonthlyDebit(rawTransactions));
  };

  useEffect(() => { loadData(); }, []);

  const profileInitials = userData?.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() ?? 'AS';

  const displayedTransactions = showAllTransactions
    ? transactions
    : transactions.slice(0, 5);

  // ── Home panel ──
  const renderHomePanel = () => (
    <View style={styles.panel}>
      {/* Balance card — lime bg, black hard shadow */}
      <View>
        <View style={styles.balanceCardShadow} />
        <View style={styles.balanceCard}>
        <TouchableOpacity style={styles.refreshBtn} onPress={loadData} activeOpacity={0.8}>
          <Text style={styles.refreshBtnText}><EyeClosed /></Text>
        </TouchableOpacity>

        <EyebrowText>Total Balance</EyebrowText>
        <Text style={styles.balanceAmount}>
          {formatCurrency(userData?.balance)}
        </Text>

        <View style={styles.balanceStats}>
          <View style={[styles.balanceStat, styles.balanceStatCredit]}>
            <Text style={styles.balanceStatLabel}>Monthly Credit</Text>
            <Text style={styles.balanceStatValue}>{formatCurrency(monthlyCredit)}</Text>
          </View>
          <View style={[styles.balanceStat, styles.balanceStatDebit]}>
            <Text style={styles.balanceStatLabel}>Monthly Debit</Text>
            <Text style={styles.balanceStatValue}>{formatCurrency(monthlyDebit)}</Text>
          </View>
        </View>
      </View>
      
      </View>

      {/* Quick actions */}
      <View style={styles.quickActions}>
        {[
          { icon: <ScanLine size={32} />, label: 'Scan QR', color: Colors.black },
          { icon: <Users size={32} />, label: 'Friends', color: Colors.black },
          { icon: <Target size={32} />, label: 'Insights', color: Colors.black },
        ].map((action) => (
          <TouchableOpacity key={action.label} style={styles.actionBtn} activeOpacity={0.85}>
            <View style={[styles.actionIcon]}>
              <Text style={styles.actionIconText}>{action.icon}</Text>
            </View>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent activity */}
      <View style={styles.activity}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent activity</Text>
          <TouchableOpacity onPress={() => setShowAllTransactions((p) => !p)} activeOpacity={0.8}>
            <Text style={styles.seeAllBtn}>
              {showAllTransactions ? 'Show less' : 'See all →'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionList}>
          {displayedTransactions.length === 0 ? (
            <View style={styles.transactionEmpty}>
              <Text style={styles.transactionEmptyText}>No transactions yet 🌱</Text>
            </View>
          ) : (
            displayedTransactions.map((txn, index) => (
              <View
                key={txn.id ?? index}
                style={[
                  styles.transaction,
                  index === displayedTransactions.length - 1 && styles.transactionLast,
                ]}
              >
                <View style={styles.transactionInfo}>
                  <View style={[styles.transactionIcon, { backgroundColor: txn.iconBg }]}>
                    <Text style={styles.transactionIconEmoji}>{txn.icon}</Text>
                  </View>
                  <View>
                    <Text style={styles.transactionTitle}>{txn.title}</Text>
                    <Text style={styles.transactionMeta}>
                      {txn.timeLabel} · {txn.category}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.transactionAmount,
                    txn.type === 'CREDIT' ? styles.credit : styles.debit,
                  ]}
                >
                  {txn.type === 'CREDIT' ? '+' : '-'} {formatCurrency(txn.amount)}
                </Text>
              </View>
            ))
          )}
        </View>
      </View>
    </View>
  );

  // ── Add panel ──
  const renderAddPanel = () => (
    <View style={styles.panel}>
      <TodaySummary todaySpent={todaySpent} />
      <AddBanner />
      {/* Transaction form inside a card */}
      <View style={styles.formCard}>
        <TransactionForm onTransactionAdded={loadData} />
      </View>
    </View>
  );

  // ── Stats panel ──
  const renderStatsPanel = () => (
    <View style={styles.panel}>
      <View style={styles.emptyCard}>
        <Text style={styles.emptyEmoji}>📊</Text>
        <EyebrowText>STATISTICS</EyebrowText>
        <Text style={styles.emptyTitle}>Coming soon</Text>
        <Text style={styles.emptyCopy}>
          Charts and spending insights will live here. Stay tuned!
        </Text>
      </View>
    </View>
  );

  // ── Profile panel ──
  const renderProfilePanel = () => (
    <View style={styles.panel}>
      {/* Avatar hero */}
      <Profile userData={userData} profileInitials={profileInitials} todaySpent={todaySpent} />
    </View>
  );

  const renderActivePanel = () => {
    switch (activePanel) {
      case 'home': return renderHomePanel();
      case 'add': return renderAddPanel();
      case 'stats': return renderStatsPanel();
      case 'profile': return renderProfilePanel();
    }
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.black} barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.screen}>
          <TopBar
            eyebrow="Your Wallet"
            title="HoneyMoney"
            profileInitials={profileInitials}
            onProfilePress={() => switchPanel('profile')}
          />

          <Animated.ScrollView
            style={{ opacity: panelOpacity }}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {renderActivePanel()}
          </Animated.ScrollView>

          <BottomNav
            items={NAV_ITEMS}
            activePanel={activePanel}
            onSelect={(key) => switchPanel(key as Panel)}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

// ── Styles ──
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.lightBg,
  },
  screen: {
    flex: 1,
    paddingHorizontal: 18,
    backgroundColor: Colors.lightBg,
    position: 'relative',
  },
  scrollContent: {
    paddingBottom: 88,
  },
  panel: {
    flexDirection: 'column',
    gap: 16,
  },

  // ── Balance card ──
  balanceCard: {
    width: "99%",
    height: 200,
    padding: 20,
    borderRadius: 24,
    backgroundColor: Colors.lime,
    position: 'relative',
    borderWidth: 2,
    borderColor: Colors.black,
  },
  balanceCardShadow: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: "99%",
    height: 201,
    borderRadius: 24,
    backgroundColor: Colors.black,
    zIndex: -1,
  },
  refreshBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.black,
    backgroundColor: Colors.paper,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  refreshBtnText: {
    fontSize: 18,
    color: Colors.black,
    lineHeight: 20,
  },
  balanceAmount: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 42,
    letterSpacing: -2,
    color: Colors.black,
    marginTop: 6,
    marginBottom: 18,
  },
  balanceStats: {
    flexDirection: 'row',
    gap: 10,
  },
  balanceStat: {
    flex: 1,
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.black,
    borderRadius: 14,
  },
  balanceStatCredit: {
    backgroundColor: 'rgb(226,255,128)',
  },
  balanceStatDebit: {
    backgroundColor: 'rgb(226,255,128)',
  },
  balanceStatLabel: {
    fontFamily: Fonts.dmSansBold,
    fontSize: 10,
    color: "#4F6600",
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  balanceStatValue: {
    fontFamily: Fonts.dmSansBold,
    fontSize: 15,
    color: Colors.black,
  },

  // ── Quick actions ──
  quickActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    minHeight: 72,
    borderColor: Colors.black,
    borderRadius: 12,
    backgroundColor: Colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  actionIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIconText: {
    fontSize: 18,
    color: Colors.black,
  },
  actionLabel: {
    fontFamily: Fonts.dmSansBold,
    fontSize: 11,
    color: Colors.black,
  },

  // ── Activity ──
  activity: {
    flexDirection: 'column',
    gap: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 17,
    color: Colors.black,
  },
  seeAllBtn: {
    fontFamily: Fonts.dmSansBold,
    fontSize: 12,
    color: Colors.gray,
  },
  transactionList: {
    borderWidth: 2,
    borderColor: Colors.black,
    borderRadius: 20,
    backgroundColor: '#FEFFFD',
    overflow: 'hidden',
  },
  transactionEmpty: {
    padding: 28,
    alignItems: 'center',
  },
  transactionEmptyText: {
    fontFamily: Fonts.dmSans,
    fontSize: 13,
    color: Colors.gray,
  },
  transaction: {
    minHeight: 60,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 3,
    borderBottomColor: Colors.line,
  },
  transactionLast: {
    borderBottomWidth: 0,
  },
  transactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  transactionIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionIconEmoji: {
    fontSize: 17,
  },
  transactionTitle: {
    fontFamily: Fonts.dmSansBold,
    fontSize: 13,
    color: Colors.black,
  },
  transactionMeta: {
    fontFamily: Fonts.dmSans,
    fontSize: 10,
    color: Colors.gray,
    marginTop: 2,
  },
  transactionAmount: {
    fontFamily: Fonts.dmSansBold,
    fontSize: 13,
  },
  debit: { color: '#ef4444' },
  credit: { color: '#16a34a' },

  // ── Form card (Add panel) ──
  formCard: {
    padding: 4
  },

  // ── Empty / Stats card ──
  emptyCard: {
    minHeight: 260,
    padding: 24,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 24,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: Colors.lime,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: 4,
  },
  emptyTitle: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 26,
    letterSpacing: -1,
    color: Colors.black,
  },
  emptyCopy: {
    fontFamily: Fonts.dmSans,
    fontSize: 13,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default AddTransactionScreen;
