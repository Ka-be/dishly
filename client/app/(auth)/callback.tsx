import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackScreen() {
  const router = useRouter();

  useEffect(() => {
    // Handle OAuth callback
    const handleCallback = async () => {
      try {
        // Get the session after OAuth redirect
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('❌ Session error:', error);
          throw error;
        }

        if (session) {
          // Check if user has a profile
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          if (profileError && profileError.code !== 'PGRST116') {
            // PGRST116 = no rows returned
            console.error('❌ Profile error:', profileError);
            throw profileError;
          }

          // Redirect based on profile existence
          if (profile) {
            router.replace('/(tabs)' as any);
          } else {
            router.replace('/(auth)/onboarding' as any);
          }
        } else {
          router.replace('/(auth)/sign-in' as any);
        }
      } catch (error) {
        console.error('❌ Error in auth callback:', error);
        router.replace('/(auth)/sign-in' as any);
      }
    };

    handleCallback();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
