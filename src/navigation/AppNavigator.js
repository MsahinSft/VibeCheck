import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import ListScreen from '../screens/ListScreen';
import DetailScreen from '../screens/DetailScreen';
import { COLORS } from '../constants/theme';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
                headerStyle: {
                    backgroundColor: COLORS.backgroundStart,
                },
                headerTintColor: COLORS.white,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerShadowVisible: false, // Cam hissi bozmasın
            }}
        >
            <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="List"
                component={ListScreen}
                options={{ headerShown: false }} // Kendi headerımızı tasarımı uyarlayarak kullanacağız
            />
            <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={({ route }) => ({
                    title: route.params?.title || 'Detay',
                    headerBackTitleVisible: false,
                    headerTransparent: true, // Gradient arkaplanı üstte göstermek için
                })}
            />
        </Stack.Navigator>
    );
}
