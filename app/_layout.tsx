import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/src/infrastructure/hooks/useColorScheme';
import { Provider } from 'react-redux';
import store from '@/src/infrastructure/store/store';
import { useThemeColor } from '@/src/infrastructure/hooks/useThemeColor';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');
  const [loaded] = useFonts({
    SpaceMono: require('@/src/infrastructure/assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false, title: ''}} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
          <Stack.Screen name="details" options={{ headerShown: true, title: 'Details', headerStyle: {backgroundColor}}}/>
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
