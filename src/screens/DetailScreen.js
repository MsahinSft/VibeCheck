import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import GradientBackground from '../components/GradientBackground';
import GlassCard from '../components/GlassCard';
import { AppContext } from '../data/mockContext';
import { COLORS } from '../constants/theme';
import AddictionModule from '../components/modules/AddictionModule';
import AnxietyModule from '../components/modules/AnxietyModule';
import HealthModule from '../components/modules/HealthModule';
import EatingDisorderModule from '../components/modules/EatingDisorderModule';
import SleepModule from '../components/modules/SleepModule';
import ViolenceModule from '../components/modules/ViolenceModule';
import OtherModule from '../components/modules/OtherModule';

export default function DetailScreen({ navigation, route }) {
  const { topicId, title } = route.params || {};
  const { topics } = useContext(AppContext);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [helpStatus, setHelpStatus] = useState(null); // 'yes' or 'no'

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;

  // Find dynamic data based on clicked item
  const topicData = topics.find(t => t.id === topicId) || topics[0];

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 50,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();

    // Auto hide after 3 seconds
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -50,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start(() => setShowToast(false));
    }, 3000);
  };

  const handleHelpfulToggle = (value) => {
    setHelpStatus(value);
    triggerToast('Geri bildiriminiz için teşekkürler.');
  };

  const handleActionClick = () => {
    if (topicData.isEmergency) {
      triggerToast('Gizli çıkış yapıldı / Güvenlik Modu');
      // In real app, this would route to a blank page or call 112
    } else {
      triggerToast(`${topicData.actionText} Modülü Başlatılıyor...`);
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={28} color={COLORS.white} />
      </TouchableOpacity>
      <View style={styles.headerTitleContainer}>
        {topicData?.icon && <MaterialCommunityIcons name={topicData.icon} size={28} color={topicData.isEmergency ? '#FF6B6B' : COLORS.white} />}
        <Text style={[styles.headerTitle, topicData.isEmergency && { color: '#FFEAEA' }]}>{title || topicData?.title}</Text>
      </View>
      <View style={{ width: 28 }} />
    </View>
  );

  const renderToast = () => {
    if (!showToast) return null;
    return (
      <Animated.View style={[
        styles.toastContainer,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
      ]}>
        <GlassCard style={[styles.toastCard, topicData.isEmergency && { backgroundColor: 'rgba(255, 69, 58, 0.9)' }]}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </GlassCard>
      </Animated.View>
    );
  };

  const renderFeedbackSection = () => {
    if (topicData?.feedbackType === 'none' || topicData?.isEmergency) {
      return null;
    }

    if (topicData?.feedbackType === 'helpful_toggle') {
      return (
        <View style={styles.feedbackSection}>
          <Text style={styles.questionText}>İçeriği faydalı buldunuz mu?</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleBtn, helpStatus === 'yes' && styles.toggleActive]}
              onPress={() => handleHelpfulToggle('yes')}
            >
              <MaterialCommunityIcons name="thumb-up-outline" size={24} color="white" />
              <Text style={styles.toggleText}>Evet</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toggleBtn, helpStatus === 'no' && styles.toggleActiveBad]}
              onPress={() => handleHelpfulToggle('no')}
            >
              <MaterialCommunityIcons name="thumb-down-outline" size={24} color="white" />
              <Text style={styles.toggleText}>Hayır</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null; // Fallback
  };

  return (
    <GradientBackground style={styles.container}>
      {renderToast()}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.safeArea}>
          {renderHeader()}

          <View style={styles.content}>

            <View style={styles.dynamicContentBox}>
              <Text style={styles.descriptionText}>{topicData?.description}</Text>

              {topicData?.id === '1' && <AddictionModule topicData={topicData} />}
              {topicData?.id === '2' && <AnxietyModule topicData={topicData} />}
              {topicData?.id === '3' && <ViolenceModule topicData={topicData} />}
              {topicData?.id === '4' && <HealthModule topicData={topicData} />}
              {topicData?.id === '5' && <EatingDisorderModule topicData={topicData} />}
              {topicData?.id === '7' && <SleepModule topicData={topicData} />}
              {topicData?.id === '6' && <OtherModule topicData={topicData} />}

              <TouchableOpacity style={styles.actionButtonContainer} activeOpacity={0.8} onPress={handleActionClick}>
                <LinearGradient
                  colors={topicData.isEmergency ? ['#FF416C', '#FF4B2B'] : ['#00BFFF', '#8A2BE2']}
                  style={styles.actionButton}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                >
                  <Text style={styles.actionButtonText}>{topicData?.actionText}</Text>
                  <MaterialCommunityIcons
                    name={topicData.isEmergency ? "phone-in-talk" : "arrow-right"}
                    size={20}
                    color="white"
                    style={{ marginLeft: 10 }}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {renderFeedbackSection()}

            {topicData?.isEmergency && (
              <TouchableOpacity style={styles.ghostButton} onPress={() => navigation.navigate('Splash')}>
                <Text style={styles.ghostButtonText}>Gizli Çıkış (Ana Ekrana Dön)</Text>
              </TouchableOpacity>
            )}

          </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 8,
    textTransform: 'uppercase',
    flexShrink: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    alignItems: 'center',
    paddingBottom: 40,
  },
  dynamicContentBox: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  descriptionText: {
    color: 'rgba(255,255,255,0.95)',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 28,
    fontWeight: '400',
  },
  tipsCard: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.25)',
    padding: 20,
    marginBottom: 25,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  tipText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
    lineHeight: 24,
  },
  actionButtonContainer: {
    width: '100%',
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 30,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  feedbackSection: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 25,
  },
  questionText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  toggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  toggleActive: {
    backgroundColor: 'rgba(0, 191, 255, 0.4)',
    borderColor: '#00BFFF',
  },
  toggleActiveBad: {
    backgroundColor: 'rgba(255, 107, 107, 0.4)',
    borderColor: '#FF6B6B',
  },
  toggleText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
  },
  ghostButton: {
    marginTop: 40,
    paddingVertical: 10,
  },
  ghostButtonText: {
    color: 'rgba(255,255,255,0.6)',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  toastContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  toastCard: {
    backgroundColor: 'rgba(0, 191, 255, 0.9)',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
  },
  toastText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
