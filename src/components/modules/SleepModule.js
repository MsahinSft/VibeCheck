import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GlassCard from '../GlassCard';

const SOUNDS = [
    { id: '1', name: 'Yağmur', icon: 'weather-pouring' },
    { id: '2', name: 'Şömine', icon: 'fireplace' },
    { id: '3', name: 'Kamp Ateşi', icon: 'campfire' }
];

export default function SleepModule() {
    const [timer, setTimer] = useState(60);
    const [isActive, setIsActive] = useState(false);
    const [selectedSound, setSelectedSound] = useState(null);

    useEffect(() => {
        let interval = null;
        if (isActive && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsActive(false);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, timer]);

    const toggleTimer = () => {
        if (timer === 0) setTimer(60);
        setIsActive(!isActive);
    };

    return (
        <View style={styles.container}>
            <GlassCard style={styles.card}>
                <Text style={styles.title}>Uyku Hazırlığı</Text>
                <Text style={styles.desc}>Ekranları kapatıp derin nefes alarak uykuya hazırlanın.</Text>

                <View style={styles.timerCircle}>
                    <Text style={styles.timerText}>00:{timer < 10 ? `0${timer}` : timer}</Text>
                </View>

                <TouchableOpacity style={[styles.timerBtn, isActive && styles.stopBtn]} onPress={toggleTimer}>
                    <Text style={styles.timerBtnText}>{isActive ? 'Durdur' : (timer === 0 ? 'Yeniden Başlat' : 'Geri Sayımı Başlat')}</Text>
                </TouchableOpacity>
            </GlassCard>

            <GlassCard style={styles.card}>
                <Text style={styles.title}>Uyku Meditasyonu Sesleri</Text>
                <View style={styles.soundRow}>
                    {SOUNDS.map(sound => (
                        <TouchableOpacity
                            key={sound.id}
                            style={[styles.soundBtn, selectedSound === sound.id && styles.activeSoundBtn]}
                            onPress={() => setSelectedSound(selectedSound === sound.id ? null : sound.id)}
                        >
                            <MaterialCommunityIcons name={sound.icon} size={30} color="white" />
                            <Text style={styles.soundText}>{sound.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                {selectedSound && (
                    <Text style={styles.playingText}>Şu an çalıyor: {SOUNDS.find(s => s.id === selectedSound).name}</Text>
                )}
            </GlassCard>

            <GlassCard style={styles.card}>
                <View style={styles.headerRow}>
                    <MaterialCommunityIcons name="chart-bar" size={24} color="white" />
                    <Text style={styles.title}>Uyku Analizi Özeti</Text>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableLabel}>Bu Geceki Uyku</Text>
                        <Text style={styles.tableValue}>6 Saat 15 Dk</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableLabel}>Ortalama Kalp Ritmi</Text>
                        <Text style={styles.tableValue}>58 bpm</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableLabel}>Uyku Kalitesi</Text>
                        <Text style={[styles.tableValue, { color: '#FFD700' }]}>Orta</Text>
                    </View>
                </View>
            </GlassCard>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { width: '100%', marginVertical: 10 },
    card: { padding: 20, marginBottom: 15, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
    title: { fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 10 },
    headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 10 },
    desc: { fontSize: 14, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginBottom: 20 },
    timerCircle: { width: 120, height: 120, borderRadius: 60, borderWidth: 4, borderColor: '#00BFFF', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    timerText: { fontSize: 32, fontWeight: 'bold', color: 'white' },
    timerBtn: { backgroundColor: '#32CD32', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 },
    stopBtn: { backgroundColor: '#FF6B6B' },
    timerBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    soundRow: { flexDirection: 'row', gap: 15, marginTop: 10 },
    soundBtn: { width: 80, height: 80, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
    activeSoundBtn: { backgroundColor: 'rgba(0,191,255,0.4)', borderColor: '#00BFFF' },
    soundText: { color: 'white', fontSize: 12, marginTop: 5 },
    playingText: { color: '#00BFFF', marginTop: 15, fontSize: 14, fontStyle: 'italic' },
    table: { width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 10, marginTop: 10 },
    tableRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
    tableLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 15 },
    tableValue: { color: 'white', fontSize: 15, fontWeight: 'bold' },
});
