import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors, spacing, typography } from '../../theme';
import { api } from '../../services/api';
import { MOCK_CITIES } from '../../constants/mockData';

// Components
import CityChip from './components/CityChip';
import HostelCard from './components/HostelCard';
import SectionHeader from './components/SectionHeader';

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredHostels, setFeaturedHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.getFeaturedHostels();
      if (response.success) {
        setFeaturedHostels(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch featured hostels:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleSearch = (city = searchQuery) => {
    navigation.navigate('Search', { city: city || 'All' });
  };

  // ──────── RENDERING HELPERS ────────

  const renderHeader = () => (
    <View>
      {/* ── HERO SECTION ── */}
      <View style={styles.hero}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Find Your Best</Text>
            <Text style={styles.subGreeting}>Hostel with HostelIn</Text>
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Icon name="bell-o" size={18} color="#FFFFFF" />
            <View style={styles.dot} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Icon name="search" size={14} color={colors.text.placeholder} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by city or area..."
            placeholderTextColor={colors.text.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => handleSearch()}
          />
          <TouchableOpacity style={styles.filterBtn} onPress={() => handleSearch()}>
            <Icon name="sliders" size={14} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── CITIES SECTION (FlatList) ── */}
      <SectionHeader title="Popular Cities" />
      <FlatList
        data={MOCK_CITIES}
        renderItem={({ item }) => (
          <CityChip name={item.name} onPress={() => handleSearch(item.name)} />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.citiesList}
        decelerationRate="fast"
      />

      <SectionHeader title="Featured Hostels" />
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      {featuredHostels.length > 0 && (
        <TouchableOpacity style={styles.viewMoreBtn} onPress={() => handleSearch()}>
          <Text style={styles.viewMoreText}>View More Hostels</Text>
          <Icon name="chevron-right" size={12} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      <FlatList
        data={featuredHostels.slice(0, 2)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <HostelCard 
              hostel={item} 
              onPress={() => navigation.navigate('HostelDetail', { id: item.id })} 
            />
          </View>
        )}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          !loading && <Text style={styles.noDataText}>No featured hostels found.</Text>
        }
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
        }
        ListFooterComponentStyle={styles.listFooter}
      />

      />

      {loading && !refreshing && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  hero: {
    backgroundColor: colors.primary,
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: spacing.md,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 22,
    fontWeight: typography.weight.bold,
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  subGreeting: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: typography.weight.medium,
  },
  notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF4D4D',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingLeft: 12,
    height: 46,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: colors.text.primary,
    fontWeight: typography.weight.medium,
  },
  filterBtn: {
    width: 36,
    height: 36,
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  citiesList: {
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
    paddingBottom: 10,
  },
  cardWrapper: {
    paddingHorizontal: spacing.md,
  },
  footerContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
    marginTop: -8,
  },
  viewMoreBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  viewMoreText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: typography.weight.bold,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  hostBanner: {
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  hostBannerLeft: {
    flex: 1,
    marginRight: 10,
  },
  hostBannerTitle: {
    fontSize: 18,
    fontWeight: typography.weight.bold,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  hostBannerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: typography.weight.medium,
  },
  noDataText: {
    textAlign: 'center',
    color: colors.text.secondary,
    marginTop: 20,
    paddingBottom: 40,
  },
  listFooter: {
    paddingBottom: 20,
  }
});

export default HomeScreen;
