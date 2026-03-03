import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

export default function TabBar() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.tab}>
                <MaterialCommunityIcons name="home" size={28} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
                <MaterialCommunityIcons name="shield-check" size={28} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
                <MaterialCommunityIcons name="alert-box-outline" size={28} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
                <MaterialCommunityIcons name="comment-text-multiple-outline" size={28} color={COLORS.white} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingBottom: Platform.OS === 'ios' ? 24 : 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: COLORS.glassBorder,
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
