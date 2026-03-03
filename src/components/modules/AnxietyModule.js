import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../../constants/theme';
import GlassCard from '../GlassCard';

export default function AnxietyModule() {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const opacityAnim = useRef(new Animated.Value(0.7)).current;

    useEffect(() => {
        const breatheAnimation = Animated.loop(
            Animated.sequence([
                // Inhale (Grow)
                Animated.parallel([
                    Animated.timing(scaleAnim, {
                        toValue: 1.5,
                        duration: 4000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 1,
                        duration: 4000,
                        useNativeDriver: true,
                    })
                ]),
                // Hold
                Animated.delay(1000),
                // Exhale (Shrink)
                Animated.parallel([
                    Animated.timing(scaleAnim, {
                        toValue: 1,
                        duration: 4000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 0.7,
                        duration: 4000,
                        useNativeDriver: true,
                    })
                ]),
                // Hold
                Animated.delay(1000)
            ])
        );

        breatheAnimation.start();

        return () => breatheAnimation.stop();
    }, []);

    return (
        <View style={styles.container}>
            <GlassCard style={styles.card}>
                <Text style={styles.title}>Birlikte Nefes Alalım</Text>
                <Text style={styles.description}>
                    Daire büyürken nefes alın, küçülürken nefes verin. Zihninizi yavaşlatmaya odaklanın.
                </Text>

                <View style={styles.animationContainer}>
                    <Animated.View style={[
                        styles.circle,
                        {
                            transform: [{ scale: scaleAnim }],
                            opacity: opacityAnim
                        }
                    ]} />
                    {/* Static inner circle overlay to add depth */}
                    <View style={styles.innerCircle}>
                        <Text style={styles.breatheText}>Nefes</Text>
                    </View>
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
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: 350,
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
        marginBottom: 40,
    },
    animationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 150,
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#00BFFF',
        position: 'absolute',
    },
    innerCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    breatheText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    }
});
