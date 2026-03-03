import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GlassCard from '../GlassCard';

const QUOTES = [
    "Senin değerin yansımandan ibaret değil.",
    "Bedenin bir savaş alanı değil, evindir.",
    "Yemek bir düşman değil, yakıttır.",
    "Her bedende güzellik saklıdır.",
    "Kendine şefkat göstermeyi hak ediyorsun."
];

export default function EatingDisorderModule() {
    const [quote, setQuote] = useState(QUOTES[0]);
    const [simState, setSimState] = useState(0); // 0: Neutral, 1: Unhealthy, 2: Healthy
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const generateQuote = () => {
        const randomIndex = Math.floor(Math.random() * QUOTES.length);
        setQuote(QUOTES[randomIndex]);
    };

    const handleSimulation = (type) => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setSimState(type);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        });
    };

    return (
        <View style={styles.container}>
            <GlassCard style={styles.card}>
                <Text style={styles.title}>Günün Notu</Text>
                <Text style={styles.quoteText}>"{quote}"</Text>
                <TouchableOpacity style={styles.quoteBtn} onPress={generateQuote}>
                    <Text style={styles.quoteBtnText}>Yeni Bir Söz</Text>
                </TouchableOpacity>
            </GlassCard>

            <GlassCard style={styles.card}>
                <Text style={styles.title}>Beslenmenin Gücü (Simülasyon)</Text>

                <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
                    {simState === 0 && (
                        <Text style={styles.simDesc}>Bedenimiz bir makinedir. İhtiyacı olan yakıtı vermediğimizde yavaşlar, verdiğimizde ise parlar.</Text>
                    )}
                    {simState === 1 && (
                        <View style={styles.simResult}>
                            <MaterialCommunityIcons name="battery-10-bluetooth" size={50} color="#FF6B6B" />
                            <Text style={styles.simDescResult}>Yetersiz beslenme enerji düşüklüğüne, organ hasarına ve depresyona yol açar. Hayatın renkleri kısıtlanır.</Text>
                        </View>
                    )}
                    {simState === 2 && (
                        <View style={styles.simResult}>
                            <MaterialCommunityIcons name="battery-charging-100" size={50} color="#32CD32" />
                            <Text style={styles.simDescResult}>Dengeli beslenme; zihin açıklığı, fiziksel güç ve hayattan keyif alacak pozitif bir enerji sağlar.</Text>
                        </View>
                    )}
                </Animated.View>

                {simState === 0 ? (
                    <View style={styles.btnRow}>
                        <TouchableOpacity style={[styles.actionBtn, styles.badBtn]} onPress={() => handleSimulation(1)}>
                            <Text style={styles.actionBtnText}>Kısıtlayıcı Diyet</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionBtn, styles.goodBtn]} onPress={() => handleSimulation(2)}>
                            <Text style={styles.actionBtnText}>Dengeli Beslenme</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity style={styles.resetBtn} onPress={() => handleSimulation(0)}>
                        <Text style={styles.resetBtnText}>Geri Dön</Text>
                    </TouchableOpacity>
                )}

            </GlassCard>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { width: '100%', marginVertical: 10 },
    card: { padding: 20, marginBottom: 15, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
    title: { fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 15 },
    quoteText: { fontSize: 16, color: 'white', fontStyle: 'italic', textAlign: 'center', marginBottom: 20, minHeight: 40 },
    quoteBtn: { backgroundColor: 'rgba(255,255,255,0.2)', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
    quoteBtnText: { color: 'white', fontWeight: 'bold' },
    simContainer: { minHeight: 120, justifyContent: 'center', alignItems: 'center' },
    simDesc: { color: 'rgba(255,255,255,0.8)', textAlign: 'center', fontSize: 15, lineHeight: 22 },
    simResult: { alignItems: 'center' },
    simDescResult: { color: 'white', textAlign: 'center', marginTop: 10, fontSize: 15, lineHeight: 22 },
    btnRow: { flexDirection: 'row', gap: 10, width: '100%' },
    actionBtn: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
    badBtn: { backgroundColor: 'rgba(255,107,107,0.3)', borderWidth: 1, borderColor: '#FF6B6B' },
    goodBtn: { backgroundColor: 'rgba(50,205,50,0.3)', borderWidth: 1, borderColor: '#32CD32' },
    actionBtnText: { color: 'white', fontWeight: 'bold', fontSize: 13 },
    resetBtn: { marginTop: 10, paddingVertical: 8, paddingHorizontal: 20, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 15 },
    resetBtnText: { color: 'white', fontSize: 14 }
});
