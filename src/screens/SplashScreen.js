import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GradientBackground from '../components/GradientBackground';
import { COLORS } from '../constants/theme';

export default function SplashScreen({ navigation }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('List');
        }, 2500); // 2.5 saniye sonra geçiş
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <GradientBackground style={styles.container}>
            <Text style={styles.logo}>MODUM</Text>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        fontSize: 48,
        color: '#E0E0E0',
        fontWeight: 'bold',
        letterSpacing: 2,
    },
});
