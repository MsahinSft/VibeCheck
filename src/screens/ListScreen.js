import React, { useContext, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Animated, ScrollView, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GradientBackground from '../components/GradientBackground';
import GlassCard from '../components/GlassCard';
import TabBar from '../components/TabBar';
import { AppContext } from '../data/mockContext';
import { COLORS } from '../constants/theme';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const TopicNode = ({ topic, isCenter, onPress }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.9,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <AnimatedTouchable
            activeOpacity={0.8}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => onPress(topic)}
            style={[
                styles.topicNode,
                isCenter && styles.centerNode,
                { transform: [{ scale: scaleAnim }] }
            ]}
        >
            <MaterialCommunityIcons name={topic.icon} size={36} color={COLORS.white} />
            <Text style={styles.topicText}>{topic.title}</Text>
        </AnimatedTouchable>
    );
};


export default function ListScreen({ navigation }) {
    const { topics, loading, clearTopics, restoreTopics } = useContext(AppContext);

    const handleTopicPress = (topic) => {
        // Pass the entire topic object, especially the ID, to DetailScreen
        navigation.navigate('Detail', { topicId: topic.id, title: topic.title });
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity>
                <MaterialCommunityIcons name="arrow-left" size={28} color={COLORS.white} />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
                <MaterialCommunityIcons name="head-lightbulb-outline" size={32} color={COLORS.white} />
                <Text style={styles.headerTitle}>Ruhsal İyi Oluş</Text>
            </View>
            <View style={{ width: 28 }} />
        </View>
    );

    return (
        <GradientBackground style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {renderHeader()}

                <View style={styles.content}>
                    <GlassCard style={styles.questionCard}>
                        <Text style={styles.questionText}>Hangi konuda destek almak istersin?</Text>
                    </GlassCard>

                    {loading ? (
                        <View style={styles.centerContainer}>
                            <ActivityIndicator size="large" color={COLORS.white} />
                            <Text style={styles.loadingText}>İçerikler Yükleniyor...</Text>
                        </View>
                    ) : topics.length === 0 ? (
                        <View style={styles.centerContainer}>
                            <Text style={styles.emptyText}>Henüz bir konu bulunmuyor.</Text>
                            <TouchableOpacity activeOpacity={0.7} style={styles.resultsButton} onPress={restoreTopics}>
                                <Text style={styles.resultsButtonText}>Yenile</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.gridContainer}>
                            {topics.map((topic, index) => {
                                return (
                                    <TopicNode
                                        key={topic.id}
                                        topic={topic}
                                        onPress={handleTopicPress}
                                    />
                                );
                            })}
                        </View>
                    )}

                    {!loading && topics.length > 0 && (
                        <View style={styles.bottomActions}>
                            <TouchableOpacity activeOpacity={0.7} style={styles.resultsButton} onPress={() => { }}>
                                <Text style={styles.resultsButtonText}>Sonuçlarım</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <TabBar />
            </SafeAreaView>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        color: 'white',
        fontSize: 26, // Increased typography
        fontWeight: 'bold', // Increased typography
        marginLeft: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    questionCard: {
        marginTop: 30,
        width: '100%',
        alignItems: 'center',
        paddingVertical: 18,
        backgroundColor: 'rgba(0, 0, 0, 0.25)', // deeper card
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
    },
    questionText: {
        color: '#F0F0F0',
        fontSize: 18,
        fontWeight: '500',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: 'white',
        marginTop: 15,
        fontSize: 18,
        fontWeight: '500',
    },
    emptyText: {
        color: 'white',
        fontSize: 16,
        marginBottom: 20,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        width: '100%',
    },
    topicNode: {
        width: 105,
        height: 105,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        // Deeper shadows
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    centerNode: {
        backgroundColor: 'rgba(0,191,255,0.25)',
        borderColor: 'rgba(0,191,255,0.6)',
        shadowColor: '#00BFFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 15,
    },
    topicText: {
        color: 'white',
        fontSize: 13,
        textAlign: 'center',
        marginTop: 8,
        fontWeight: '600',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    bottomActions: {
        marginTop: 'auto',
        marginBottom: 100,
        alignItems: 'center',
    },
    resultsButton: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingVertical: 14,
        paddingHorizontal: 45,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    resultsButtonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
});
