import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/theme';

export default function GradientBackground({ children, style }) {
    return (
        <LinearGradient
            colors={[COLORS.backgroundStart, COLORS.backgroundEnd]}
            style={[styles.container, style]}
            start={{ x: 0.1, y: 0.2 }}
            end={{ x: 0.8, y: 0.9 }}
        >
            {children}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
