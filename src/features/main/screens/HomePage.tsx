// ==========================================================================
// HOME PAGE SCREEN
//
// Main home screen for guest users and authenticated members.
//
// Dependencies: theme tokens, React Navigation, icons
// Used by: Navigation stack (from LoginScreen guest login)
// ==========================================================================

import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {theme} from '@/theme';
import type {RootStackScreenProps} from '@/navigation/types';
import {
  HamburgerIcon,
  SearchIcon,
  HomeIcon,
  PlansIcon,
  StatsIcon,
  ProfileIcon,
} from '@/components/icons';

// === TYPES ===

type HomePageProps = RootStackScreenProps<'HomePage'>;

type TabItem = 'home' | 'plans' | 'performance' | 'profile';

// === COMPONENT ===

export const HomePage: React.FC<HomePageProps> = ({navigation}) => {
  // === STATE ===
  // Component state management

  const [activeTab, setActiveTab] = useState<TabItem>('home');

  // === EVENT HANDLERS ===
  // User interaction callbacks

  const handleMenuPress = () => {
    console.log('Menu pressed');
    // TODO: Open sidebar menu
  };

  const handleSearchPress = () => {
    console.log('Search pressed');
    // TODO: Open search screen
  };

  const handleTabPress = (tab: TabItem) => {
    setActiveTab(tab);
    console.log('Tab pressed:', tab);
    // TODO: Implement navigation to different sections
  };

  // === RENDER ===
  // Main component JSX structure

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.pureBlack}
      />
      <SafeAreaView style={styles.container}>
        {/* Top Navigation Bar */}
        <View style={styles.topNavBar}>
          {/* Search Icon - Left aligned */}
          <Pressable onPress={handleSearchPress} style={styles.searchButton}>
            <SearchIcon
              size={theme.layout.topNav.searchIconSize}
              color={theme.colors.textPrimary}
            />
          </Pressable>

          {/* Hamburger Menu - Right aligned */}
          <Pressable onPress={handleMenuPress} style={styles.menuButton}>
            <HamburgerIcon
              size={theme.layout.topNav.menuIconSize}
              color={theme.colors.textPrimary}
            />
          </Pressable>
        </View>

        {/* Bottom Tab Bar */}
        <View style={styles.bottomTabBar}>
          {/* Home Tab */}
          <Pressable
            style={styles.tabButton}
            onPress={() => handleTabPress('home')}>
            <HomeIcon
              size={theme.layout.bottomNav.iconSize}
              color={
                activeTab === 'home'
                  ? theme.colors.navActive
                  : theme.colors.navInactive
              }
            />
            <Text
              style={[
                styles.tabLabel,
                activeTab === 'home' && styles.tabLabelActive,
              ]}>
              Home
            </Text>
          </Pressable>

          {/* Plans Tab */}
          <Pressable
            style={styles.tabButton}
            onPress={() => handleTabPress('plans')}>
            <PlansIcon
              size={theme.layout.bottomNav.iconSize}
              color={
                activeTab === 'plans'
                  ? theme.colors.navActive
                  : theme.colors.navInactive
              }
            />
            <Text
              style={[
                styles.tabLabel,
                activeTab === 'plans' && styles.tabLabelActive,
              ]}>
              Plans
            </Text>
          </Pressable>

          {/* Performance Tab */}
          <Pressable
            style={styles.tabButton}
            onPress={() => handleTabPress('performance')}>
            <StatsIcon
              size={theme.layout.bottomNav.iconSize}
              color={
                activeTab === 'performance'
                  ? theme.colors.navActive
                  : theme.colors.navInactive
              }
            />
            <Text
              style={[
                styles.tabLabel,
                activeTab === 'performance' && styles.tabLabelActive,
              ]}>
              Performance
            </Text>
          </Pressable>

          {/* Profile Tab */}
          <Pressable
            style={styles.tabButton}
            onPress={() => handleTabPress('profile')}>
            <ProfileIcon
              size={theme.layout.bottomNav.iconSize}
              color={
                activeTab === 'profile'
                  ? theme.colors.navActive
                  : theme.colors.navInactive
              }
            />
            <Text
              style={[
                styles.tabLabel,
                activeTab === 'profile' && styles.tabLabelActive,
              ]}>
              Profile
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
};

// === STYLES ===
// StyleSheet definitions using global theme tokens

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pureBlack,
  },
  topNavBar: {
    position: 'absolute',
    top: theme.layout.topNav.topSpacing,
    left: 0,
    right: 0,
    height: theme.layout.topNav.height,
    backgroundColor: theme.colors.pureBlack,
    borderWidth: theme.layout.topNav.borderWidth,
    borderColor: theme.colors.textPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.layout.topNav.paddingHorizontal,
  },
  menuButton: {
    padding: 0,
  },
  searchButton: {
    padding: 0,
  },

  // === BOTTOM TAB BAR STYLES ===

  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: theme.layout.bottomNav.height,
    backgroundColor: theme.colors.backgroundPrimary,
    paddingVertical: theme.layout.bottomNav.paddingVertical,
    paddingHorizontal: theme.layout.bottomNav.paddingHorizontal,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingTop: theme.layout.bottomNav.iconTopSpacing,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.navInactive,
    marginTop: theme.spacing.xs,
  },
  tabLabelActive: {
    color: theme.colors.navActive,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
