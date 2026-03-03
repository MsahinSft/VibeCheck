import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GlassCard from '../GlassCard';

export default function OtherModule() {
    const [rating, setRating] = useState(0);

    return (
        <View style={styles.container}>
            <GlassCard style={styles.card}>
                <Text style={styles.title}>İlişki ve İletişim</Text>
                <Text style={styles.desc}>
                    Sağlıklı bir iletişim, karşılıklı saygı ve empatiyle başlar. Kendi sınırlarınızı korurken, karşınızdakinin duygularını anlamaya çalışın.
                </Text>

                <View style={styles.divider} />

                <Text style={styles.subtitle}>Günün İletişim Puanı</Text>
                <Text style={styles.subtext}>Bugün çevrenizdekilerle iletişiminiz nasıldı?</Text>

                <View style={styles.stars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <TouchableOpacity key={star} onPress={() => setRating(star)}>
                            <MaterialCommunityIcons
                                name={star <= rating ? "star" : "star-outline"}
                                size={40}
                                color={star <= rating ? "#FFD700" : "rgba(255,255,255,0.3)"}
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                {rating > 0 && (
                    <Text style={styles.feedbackText}>
                        {rating >= 4 ? "Harika! Pozitif iletişim kurmuşsunuz." : "Yarın daha iyi bir iletişim için fırsat olacak."}
                    </Text>
                )}
            </GlassCard>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { width: '100%', marginVertical: 10 },
    card: { padding: 20, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center' },
    title: { fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 15 },
    desc: { fontSize: 15, color: 'rgba(255,255,255,0.8)', textAlign: 'center', lineHeight: 22 },
    divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', width: '100%', marginVertical: 20 },
    subtitle: { fontSize: 16, fontWeight: 'bold', color: 'white', marginBottom: 5 },
    subtext: { fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 15 },
    stars: { flexDirection: 'row', gap: 10 },
    feedbackText: { marginTop: 15, color: '#00BFFF', fontWeight: 'bold', fontSize: 15, textAlign: 'center' }
});
