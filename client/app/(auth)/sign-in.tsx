import React, { useState } from 'react';
import { StyleSheet, View, Pressable, ActivityIndicator, Alert } from 'react-native';
import { YStack, Text, XStack } from 'tamagui';
import { Link } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import Logo from '@/components/Logo';
import { Svg, Path } from 'react-native-svg';

// Google Logo Component
const GoogleLogo = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24">
    <Path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <Path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <Path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <Path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </Svg>
);

export default function SignInScreen() {
  const colorScheme = useColorScheme();
  const { signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in error:', error);
      Alert.alert('Erreur', 'Impossible de se connecter. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <YStack gap="$8" alignItems="center" paddingHorizontal="$6" width="100%" maxWidth={480}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Logo
            primary={colors.tint}
            secondary={colors.text}
            background={colors.background}
            width={200}
            height={60}
          />
        </View>

        {/* Welcome Text */}
        <YStack gap="$3" alignItems="center" width="100%">
          <Text
            fontSize={32}
            fontWeight="600"
            color={colors.text}
            style={styles.title}
          >
            Bienvenue sur Dishly
          </Text>
          <Text
            fontSize={16}
            color={colors.icon}
            textAlign="center"
            lineHeight={24}
          >
            Connectez-vous pour créer, sauvegarder et partager vos recettes préférées
          </Text>
        </YStack>

        {/* Google Sign In Button */}
        <YStack gap="$4" width="100%" marginTop="$4">
          <Pressable
            onPress={handleGoogleSignIn}
            disabled={isLoading}
            style={({ pressed }) => [
              styles.googleButton,
              {
                backgroundColor: colors.background,
                borderColor: colorScheme === 'dark' ? '#3A3D40' : '#DDDDDD',
                opacity: pressed ? 0.7 : 1,
              }
            ]}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.tint} />
            ) : (
              <XStack gap="$3" alignItems="center">
                <GoogleLogo />
                <Text fontSize={16} fontWeight="500" color={colors.text}>
                  Continuer avec Google
                </Text>
              </XStack>
            )}
          </Pressable>

          {/* Divider */}
          <XStack gap="$3" alignItems="center" width="100%" marginVertical="$2">
            <View style={[styles.divider, { backgroundColor: colorScheme === 'dark' ? '#3A3D40' : '#DDDDDD' }]} />
            <Text fontSize={14} color={colors.icon}>ou</Text>
            <View style={[styles.divider, { backgroundColor: colorScheme === 'dark' ? '#3A3D40' : '#DDDDDD' }]} />
          </XStack>

          {/* Sign Up Link */}
          <YStack gap="$3" alignItems="center">
            <Text fontSize={15} color={colors.icon}>
              Première visite ?
            </Text>
            <Link href={'/(auth)/sign-up' as any} asChild>
              <Pressable style={({ pressed }) => [
                styles.signUpButton,
                {
                  backgroundColor: colors.tint,
                  opacity: pressed ? 0.8 : 1,
                }
              ]}>
                <Text fontSize={16} fontWeight="600" color="#ffffff">
                  Créer un compte
                </Text>
              </Pressable>
            </Link>
          </YStack>
        </YStack>

        {/* Footer */}
        <Text
          fontSize={12}
          color={colors.icon}
          textAlign="center"
          marginTop="$6"
          lineHeight={18}
        >
          En continuant, vous acceptez nos Conditions d'utilisation et notre Politique de confidentialité
        </Text>
      </YStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logoContainer: {
    marginBottom: 16,
  },
  title: {
    letterSpacing: -0.5,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    width: '100%',
  },
  divider: {
    flex: 1,
    height: 1,
  },
  signUpButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
});
