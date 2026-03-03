import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import GlassCard from '../GlassCard';

const INITIAL_TASKS = [
    { id: 1, label: 'En az 2 litre su içtin mi?', completed: false },
    { id: 2, label: '30 dakika yürüyüş yaptın mı?', completed: false },
    { id: 3, label: 'Dengeli öğünler tükettin mi?', completed: false },
];

export default function HealthModule() {
    const [tasks, setTasks] = useState(INITIAL_TASKS);

    // Mock Health Profile Data
    const profile = {
        weight: '75 kg',
        height: '180 cm',
        bmi: '23.1',
        issue: 'B12 Vitamini Eksikliği Riski', // Mock warning
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    return (
        <View style={styles.container}>
            {/* Checklist */}
            <GlassCard style={styles.card}>
                <Text style={styles.title}>Günlük Sağlık Rutini</Text>
                {tasks.map(task => (
                    <TouchableOpacity
                        key={task.id}
                        style={styles.taskRow}
                        onPress={() => toggleTask(task.id)}
                        activeOpacity={0.7}
                    >
                        <MaterialCommunityIcons
                            name={task.completed ? "checkbox-marked-circle" : "checkbox-blank-circle-outline"}
                            size={24}
                            color={task.completed ? '#00BFFF' : 'rgba(255,255,255,0.5)'}
                        />
                        <Text style={[styles.taskText, task.completed && styles.taskCompletedText]}>
                            {task.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </GlassCard>

            {/* Health Profile Table */}
            <GlassCard style={styles.card}>
                <View style={styles.headerRow}>
                    <MaterialCommunityIcons name="clipboard-pulse" size={24} color="white" />
                    <Text style={styles.title}>Sağlık Profilim</Text>
                </View>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableLabel}>Boy</Text>
                        <Text style={styles.tableValue}>{profile.height}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableLabel}>Kilo</Text>
                        <Text style={styles.tableValue}>{profile.weight}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableLabel}>VKİ</Text>
                        <Text style={styles.tableValue}>{profile.bmi}</Text>
                    </View>
                </View>

                {/* Warning Banner */}
                <View style={styles.warningBox}>
                    <MaterialCommunityIcons name="alert-circle-outline" size={20} color="#FFD700" />
                    <Text style={styles.warningText}>
                        Uyarı: {profile.issue}. Lütfen en kısa zamanda bir uzmana danışın ve tahlillerinizi yenileyin.
                    </Text>
                </View>
            </GlassCard>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 10,
    },
    card: {
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        marginBottom: 15,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        gap: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 15, // For checklist card
    },
    taskRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 12,
        borderRadius: 15,
    },
    taskText: {
        color: 'white',
        marginLeft: 15,
        fontSize: 16,
        flex: 1,
    },
    taskCompletedText: {
        textDecorationLine: 'line-through',
        color: 'rgba(255,255,255,0.5)',
    },
    table: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 10,
        overflow: 'hidden',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    tableLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 15,
    },
    tableValue: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    warningBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        padding: 15,
        borderRadius: 10,
        marginTop: 15,
        borderLeftWidth: 4,
        borderLeftColor: '#FFD700',
        gap: 10,
    },
    warningText: {
        color: '#FFF',
        fontSize: 13,
        flex: 1,
        lineHeight: 20,
    }
});
