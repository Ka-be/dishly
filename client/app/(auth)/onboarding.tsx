import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Pressable, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { YStack, Text } from 'tamagui';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { supabase } from '@/lib/supabase';
import { Colors } from '@/constants/Colors';
import Logo from '@/assets/images/logo_full.svg';

export default function OnboardingScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { user, refreshProfile } = useAuth();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    if (!firstname.trim() || !lastname.trim()) {
      Alert.alert('Erreur', 'Veuillez renseigner votre prénom et nom.');
      return;
    }

    if (!user) {
      Alert.alert('Erreur', 'Session utilisateur introuvable.');
      return;
    }

    setIsLoading(true);
    try {
      // Get default user role
      const { data: roleId, error: roleError } = await supabase
        .rpc('get_default_user_role');

      if (roleError) throw roleError;

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          user_id: user.id,
          firstname: firstname.trim(),
          lastname: lastname.trim(),
          role_id: roleId,
          avatar_url: user.user_metadata?.avatar_url || null,
        });

      if (profileError) throw profileError;

      // Refresh profile in context
      await refreshProfile();

      // Redirect to home
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error creating profile:', error);
      Alert.alert('Erreur', 'Impossible de créer votre profil. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
        <YStack gap="$6" alignItems="center" paddingHorizontal="$6" width="100%" maxWidth={400}>
          {/* Logo */}
          <Logo width={250} height={80} style={styles.logo} />

          {/* Welcome Text */}
          <YStack gap="$2" alignItems="center">
            <Text
              fontSize={28}
              fontWeight="700"
              color={Colors[colorScheme ?? 'light'].text}
            >
              Bienvenue !
            </Text>
            <Text
              fontSize={16}
              color={Colors[colorScheme ?? 'light'].icon}
              textAlign="center"
            >
              Pour commencer, dites-nous comment vous vous appelez
            </Text>
          </YStack>

          {/* Input Fields */}
          <YStack gap="$4" width="100%">
            <View>
              <Text
                fontSize={14}
                fontWeight="600"
                color={Colors[colorScheme ?? 'light'].text}
                marginBottom="$2"
              >
                Prénom
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: Colors[colorScheme ?? 'light'].badge,
                    color: Colors[colorScheme ?? 'light'].text,
                  }
                ]}
                placeholder="Votre prénom"
                placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
                value={firstname}
                onChangeText={setFirstname}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

            <View>
              <Text
                fontSize={14}
                fontWeight="600"
                color={Colors[colorScheme ?? 'light'].text}
                marginBottom="$2"
              >
                Nom
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: Colors[colorScheme ?? 'light'].badge,
                    color: Colors[colorScheme ?? 'light'].text,
                  }
                ]}
                placeholder="Votre nom"
                placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
                value={lastname}
                onChangeText={setLastname}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>
          </YStack>

          {/* Submit Button */}
          <Pressable
            onPress={handleComplete}
            disabled={isLoading || !firstname.trim() || !lastname.trim()}
            style={[
              styles.submitButton,
              {
                backgroundColor: (!firstname.trim() || !lastname.trim())
                  ? Colors[colorScheme ?? 'light'].badge
                  : Colors[colorScheme ?? 'light'].tint,
              }
            ]}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text fontSize={16} fontWeight="600" color="#fff">
                Continuer
              </Text>
            )}
          </Pressable>

          {/* Info Text */}
          <Text
            fontSize={12}
            color={Colors[colorScheme ?? 'light'].icon}
            textAlign="center"
            marginTop="$2"
          >
            Vous pourrez modifier ces informations plus tard dans votre profil
          </Text>
        </YStack>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 250,
    height: 80,
    marginBottom: 20,
  },
  input: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
    marginTop: 12,
  },
});
