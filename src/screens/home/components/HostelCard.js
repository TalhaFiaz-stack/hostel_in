import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors, spacing, typography } from '../../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HostelCard = ({ hostel, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: hostel.image }} style={styles.image} />
        {hostel.is_featured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>FEATURED</Text>
          </View>
        )}
        <View style={styles.priceBadge}>
          <Text style={styles.priceText}>Rs. {hostel.price}</Text>
          <Text style={styles.perMonth}>/mo</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.name} numberOfLines={1}>{hostel.name}</Text>
          <View style={styles.ratingRow}>
            <Icon name="star" size={14} color="#F59E0B" />
            <Text style={styles.ratingText}>{hostel.rating}</Text>
          </View>
        </View>

        <View style={styles.locationRow}>
          <Icon name="map-marker" size={12} color={colors.text.secondary} />
          <Text style={styles.locationText} numberOfLines={1}>
            {hostel.area}, {hostel.city}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.footerRow}>
          <View style={styles.infoItem}>
            <Icon name="user" size={12} color={colors.text.secondary} />
            <Text style={styles.infoText}>{hostel.type}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="check-circle" size={12} color={colors.primary} />
            <Text style={[styles.infoText, { color: colors.primary }]}>Verified</Text>
          </View>
          <TouchableOpacity style={styles.viewBtn} onPress={onPress}>
            <Text style={styles.viewBtnText}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    width: '100%',
  },
  imageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#F1F5F9',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  featuredText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: typography.weight.black,
  },
  priceBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: typography.weight.bold,
  },
  perMonth: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 10,
    marginLeft: 2,
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    flex: 1,
    marginRight: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: typography.weight.bold,
    color: '#92400E',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: typography.weight.medium,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 14,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: colors.text.secondary,
    fontWeight: typography.weight.semiBold,
  },
  viewBtn: {
    backgroundColor: colors.primary + '15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  viewBtnText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: typography.weight.bold,
  },
});

export default HostelCard;
