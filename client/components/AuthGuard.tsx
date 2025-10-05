import React, { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, profile, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const inAuthGroup = segments[0] === '(auth)';

    // User is not authenticated
    if (!user) {
      // If not in auth group, redirect to sign-in
      if (!inAuthGroup) {
        router.replace('/(auth)/sign-in' as any);
      }
    }
    // User is authenticated
    else {
      // User has no profile yet, redirect to onboarding
      if (!profile) {
        router.replace('/(auth)/onboarding' as any);
      }
      // User has profile but is in auth group, redirect to tabs
      else if (inAuthGroup) {
        router.replace('/(tabs)' as any);
      }
    }
  }, [user, profile, isLoading, segments]);

  // Show loading screen while checking auth state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
