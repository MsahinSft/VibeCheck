import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import GlassCard from '../GlassCard';

export default function AddictionModule() {
    const [isSimulating, setIsSimulating] = useState(false);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const shakeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let shakeLoop;
        if (isSimulating) {
            // Simulate degrading life/health by fading out color and shaking
            Animated.timing(fadeAnim, {
                toValue: 0.3,
                duration: 2000,
                useNativeDriver: false,
            }).start();

            shakeLoop = Animated.loop(
                Animated.sequence([
                    Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: false }),
                    Animated.timing(shakeAnim, { toValue: -10, duration: 100, useNativeDriver: false }),
                    Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: false }),
                    Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: false })
                ])
            );
            shakeLoop.start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false,
            }).start();
            shakeAnim.setValue(0);
        }
        return () => shakeLoop && shakeLoop.stop();
    }, [isSimulating]);

    const colorInterpolate = fadeAnim.interpolate({
        inputRange: [0.3, 1],
        outputRange: ['#888888', COLORS.primary] // Grayscale vs Vibrant
    });

    return (
        <View style={styles.container}>
            <GlassCard style={styles.card}>
                <Text style={styles.title}>Bağımlılığın Etkisi</Text>
                <Text style={styles.description}>
                    Aşağıdaki buton ile kontrolü kaybettiğinizde hayatınızın renklerinin nasıl solduğunu ve dengenizin nasıl sarsıldığını hissedin.
                </Text>

                <Animated.View style={[
                    styles.simulationBox,
                    {
                        backgroundColor: colorInterpolate,
                        transform: [{ translateX: shakeAnim }]
                    }
                ]}>
                    <MaterialCommunityIcons
                        name={isSimulating ? "weather-lightning-rainy" : "weather-sunny"}
                        size={60}
                        color="#FFF"
                    />
                    <Text style={styles.simText}>
                        {isSimulating ? "Kontrol Kaybı..." : "Sağlıklı Yaşam"}
                    </Text>
                </Animated.View>

                <TouchableOpacity
                    style={[styles.btn, isSimulating && styles.btnActive]}
                    onPress={() => setIsSimulating(!isSimulating)}
                >
                    <Text style={styles.btnText}>
                        {isSimulating ? "Simülasyonu Durdur (Tedavi Ol)" : "Bağımlılığı Deneyimle"}
                    </Text>
                </TouchableOpacity>
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
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        marginBottom: 20,
    },
    simulationBox: {
        width: 200,
        height: 150,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    simText: {
        color: 'white',
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 16
    },
    btn: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
    },
    btnActive: {
        backgroundColor: 'rgba(255,107,107,0.4)',
        borderColor: '#FF6B6B'
    },
    btnText: {
        color: 'white',
        fontWeight: '600'
    }
});
