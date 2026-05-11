import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, typography } from '../../theme';
import { api } from '../../services/api';

// Components
import InfoTile from './components/InfoTile';
import ContactCard from './components/ContactCard';
import AccordionItem from './components/AccordionItem';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HostelDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await api.getHostelDetail(id);
        setHostel(response);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!hostel) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Hostel not found.</Text>
      </View>
    );
  }

  // Get the main image from the first building if not at root
  const mainImage = hostel.buildings?.[0]?.main_image || '';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── IMAGE HEADER ── */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: mainImage }} style={styles.image} />
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={16} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* ── TITLE & LOCATION ── */}
          <View style={styles.header}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{hostel.type}</Text>
            </View>
            <Text style={styles.name}>{hostel.name}</Text>
            <View style={styles.locationRow}>
              <Icon name="location-outline" size={14} color={colors.primary} />
              <Text style={styles.address}>{hostel.address}, {hostel.area}, {hostel.city}</Text>
            </View>
          </View>

          {/* ── STATS TILES ── */}
          <View style={styles.statsRow}>
            <InfoTile label="Price" value={`Rs.${hostel.startingPrice}`} icon="cash-outline" />
            <InfoTile label="Beds" value={hostel.totalBeds} icon="bed-outline" />
            <InfoTile label="Available" value={hostel.availableBeds} icon="checkmark-circle-outline" />
          </View>

          {/* ── BUILDINGS & ROOMS ── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Accommodations</Text>
            {hostel.buildings?.map((building) => (
              <View key={building._id} style={styles.buildingCard}>
                <Text style={styles.buildingName}>
                  {building.name} ({building.building_number})
                </Text>
                {building.floors?.map((floor) => (
                  <View key={floor._id} style={styles.floorContainer}>
                    <Text style={styles.floorTitle}>{floor.name}</Text>
                    {floor.rooms?.map((room) => (
                      <AccordionItem 
                        key={room._id} 
                        title={room.room_name} 
                        rightTitle={`Rs. ${room.pricing.per_month}`}
                      >
                        <View style={styles.roomInfoGrid}>
                          <View style={styles.roomInfoItem}>
                            <Icon name="people-outline" size={16} color={colors.text.secondary} />
                            <Text style={styles.roomInfoText}>{room.capacity.max_occupancy} {room.capacity.gender}</Text>
                          </View>
                          <View style={styles.roomInfoItem}>
                            <Icon name="bed-outline" size={16} color={colors.primary} />
                            <View style={styles.availabilityBadge}>
                              <Text style={styles.availabilityText}>{room.beds_available} Available</Text>
                            </View>
                          </View>
                        </View>
                      </AccordionItem>
                    ))}
                  </View>
                ))}
              </View>
            ))}
          </View>

          {/* ── CONTACT SECTION ── */}
          <View style={[styles.section, { marginBottom: 30 }]}>
            <Text style={styles.sectionTitle}>Contact Owner</Text>
            <ContactCard contact={hostel.contact} />
          </View>
        </View>
      </ScrollView>

      {/* ── FOOTER CTA ── */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerPriceLabel}>Starting from</Text>
          <Text style={styles.footerPrice}>Rs. {hostel.startingPrice}<Text style={styles.footerMonth}>/mo</Text></Text>
        </View>
        <TouchableOpacity style={styles.bookBtn}>
          <Text style={styles.bookBtnText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: 280,
    backgroundColor: '#F1F5F9',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
  header: {
    marginBottom: 20,
  },
  badge: {
    backgroundColor: colors.primary + '15',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: typography.weight.bold,
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 24,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  address: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: typography.weight.medium,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginHorizontal: -4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    marginBottom: 16,
  },
  buildingCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  buildingName: {
    fontSize: 16,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    marginBottom: 12,
  },
  floorContainer: {
    marginTop: 8,
  },
  floorTitle: {
    fontSize: 14,
    fontWeight: typography.weight.semiBold,
    color: colors.text.secondary,
    marginBottom: 8,
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  roomItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  roomName: {
    fontSize: 15,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
  roomPrice: {
    fontSize: 15,
    fontWeight: typography.weight.bold,
    color: colors.primary,
  },
  roomDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roomInfoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  roomInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  roomInfoText: {
    fontSize: 13,
    color: colors.text.secondary,
    fontWeight: typography.weight.medium,
  },
  availabilityBadge: {
    backgroundColor: colors.primary + '10',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  availabilityText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: typography.weight.bold,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  footerPriceLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  footerPrice: {
    fontSize: 20,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
  footerMonth: {
    fontSize: 12,
    fontWeight: typography.weight.medium,
    color: colors.text.secondary,
  },
  bookBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 14,
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  bookBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: typography.weight.bold,
  },
});

export default HostelDetailScreen;
