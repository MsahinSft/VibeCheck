import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GlassCard from '../GlassCard';

export default function ViolenceModule() {
    const [msgSent, setMsgSent] = useState(false);

    const handleCall = (number) => {
        // In a real app, this would use Linking.openURL(`tel:${number}`);
        Alert.alert("Arama Başlatılıyor", `${number} aranıyor...`);
    };

    const handleMessage = () => {
        setMsgSent(true);
        setTimeout(() => setMsgSent(false), 3000);
    };

    return (
        <View style={styles.container}>
            <GlassCard style={styles.card}>
                <Text style={styles.title}>Farkındalık</Text>
                <View style={styles.infoBox}>
                    <MaterialCommunityIcons name="shield-alert-outline" size={24} color="#FFD700" />
                    <Text style={styles.infoText}>
                        Kontrolcü davranışlar, izole etme çabası, psikolojik baskı ve fiziksel zorlama şiddettir. Yalnız değilsin!
                    </Text>
                </View>
            </GlassCard>

            <GlassCard style={styles.card}>
                <Text style={styles.title}>Acil Durum İşlemleri</Text>

                <TouchableOpacity style={[styles.actionBtn, styles.callBtn]} onPress={() => handleCall('112')}>
                    <MaterialCommunityIcons name="phone-in-talk" size={24} color="white" />
                    <View style={styles.btnTextContainer}>
                        <Text style={styles.btnTitle}>112 Acil Çağrı Merkezi</Text>
                        <Text style={styles.btnSub}>Polis, Ambulans</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionBtn, styles.callBtn, { backgroundColor: '#8A2BE2' }]} onPress={() => handleCall('183')}>
                    <MaterialCommunityIcons name="phone-classic" size={24} color="white" />
                    <View style={styles.btnTextContainer}>
                        <Text style={styles.btnTitle}>183 Sosyal Destek Hattı</Text>
                        <Text style={styles.btnSub}>Aile, Kadın, Çocuk Destek</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionBtn, styles.msgBtn]} onPress={handleMessage}>
                    <MaterialCommunityIcons name={msgSent ? "check-circle" : "message-alert"} size={24} color="white" />
                    <View style={styles.btnTextContainer}>
                        <Text style={styles.btnTitle}>{msgSent ? 'Mesaj İletildi!' : 'Acil Durum Mesajı Gönder'}</Text>
                        <Text style={styles.btnSub}>Önceden seçilen kişilere konum iletir</Text>
                    </View>
                </TouchableOpacity>
            </GlassCard>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { width: '100%', marginVertical: 10 },
    card: { padding: 20, marginBottom: 15, backgroundColor: 'rgba(0,0,0,0.3)' },
    title: { fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 15, textAlign: 'center' },
    infoBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 215, 0, 0.1)', padding: 15, borderRadius: 10, gap: 10 },
    infoText: { color: 'white', fontSize: 14, flex: 1, lineHeight: 20 },
    actionBtn: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 15, marginBottom: 10, gap: 15 },
    callBtn: { backgroundColor: '#FF416C' },
    msgBtn: { backgroundColor: '#00BFFF' },
    btnTextContainer: { flex: 1 },
    btnTitle: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    btnSub: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 2 }
});
