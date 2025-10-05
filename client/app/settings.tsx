import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
  ScrollView,
  Image,
  Switch,
  Platform,
} from 'react-native';
import { YStack, XStack, Text } from 'tamagui';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { supabase } from '@/lib/supabase';
import { Colors } from '@/constants/Colors';

export default function SettingsScreen() {
  const router = useRouter();
  const { user, profile, refreshProfile } = useAuth();
  const { colorScheme, isDarkMode, setThemeMode } = useTheme();

  const [firstname, setFirstname] = useState(profile?.firstname || '');
  const [lastname, setLastname] = useState(profile?.lastname || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || user?.user_metadata?.avatar_url || '');
  const [isLoading, setIsLoading] = useState(false);

  const colors = Colors[colorScheme];

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission requise', 'Nous avons besoin de votre permission pour accéder à vos photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const image = result.assets[0];
      setIsLoading(true);

      try {
        // Upload to Supabase Storage
        const fileExt = image.uri.split('.').pop();
        const fileName = `${user?.id}-${Date.now()}.${fileExt}`;
        const filePath = `avatars/${fileName}`;

        // Convert image to blob for upload
        const response = await fetch(image.uri);
        const blob = await response.blob();

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, blob, {
            contentType: `image/${fileExt}`,
            upsert: true,
          });

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);

        setAvatarUrl(publicUrl);

        Alert.alert('Succès', 'Photo de profil mise à jour !');
      } catch (error) {
        console.error('Error uploading avatar:', error);
        Alert.alert('Erreur', 'Impossible de télécharger la photo.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSave = async () => {
    if (!firstname.trim() || !lastname.trim()) {
      Alert.alert('Erreur', 'Le prénom et le nom sont requis.');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          firstname: firstname.trim(),
          lastname: lastname.trim(),
          avatar_url: avatarUrl,
        })
        .eq('user_id', user?.id);

      if (error) throw error;

      await refreshProfile();

      Alert.alert('Succès', 'Profil mis à jour avec succès !');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Erreur', 'Impossible de mettre à jour le profil.');
    } finally {
      setIsLoading(false);
    }
  };

  const getUserInitials = () => {
    if (firstname && lastname) {
      return `${firstname[0]}${lastname[0]}`.toUpperCase();
    }
    return user?.email?.[0].toUpperCase() || 'U';
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <YStack gap="$6" padding="$6" maxWidth={600} alignSelf="center" width="100%">
        {/* Header */}
        <XStack alignItems="center" justifyContent="space-between">
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <Text fontSize={24} fontWeight="600" color={colors.text}>
            Paramètres
          </Text>
          <View style={{ width: 40 }} />
        </XStack>

        {/* Avatar Section */}
        <YStack gap="$4" alignItems="center" paddingVertical="$4">
          <Pressable onPress={handlePickImage} style={styles.avatarContainer}>
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatarPlaceholder, { backgroundColor: colors.tint }]}>
                <Text fontSize={32} fontWeight="600" color={colors.tintContrast}>
                  {getUserInitials()}
                </Text>
              </View>
            )}
            <View style={[styles.editBadge, { backgroundColor: colors.tint }]}>
              <Ionicons name="camera" size={16} color={colors.tintContrast} />
            </View>
          </Pressable>
          <Text fontSize={14} color={colors.icon}>
            Appuyez pour changer votre photo
          </Text>
        </YStack>

        {/* Profile Information */}
        <YStack gap="$4">
          <Text fontSize={18} fontWeight="600" color={colors.text}>
            Informations personnelles
          </Text>

          <YStack gap="$2">
            <Text fontSize={14} fontWeight="500" color={colors.text}>
              Prénom
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.badge,
                  color: colors.text,
                  borderColor: colorScheme === 'dark' ? '#3A3D40' : '#DDDDDD',
                }
              ]}
              placeholder="Votre prénom"
              placeholderTextColor={colors.icon}
              value={firstname}
              onChangeText={setFirstname}
              autoCapitalize="words"
            />
          </YStack>

          <YStack gap="$2">
            <Text fontSize={14} fontWeight="500" color={colors.text}>
              Nom
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.badge,
                  color: colors.text,
                  borderColor: colorScheme === 'dark' ? '#3A3D40' : '#DDDDDD',
                }
              ]}
              placeholder="Votre nom"
              placeholderTextColor={colors.icon}
              value={lastname}
              onChangeText={setLastname}
              autoCapitalize="words"
            />
          </YStack>

          <YStack gap="$2">
            <Text fontSize={14} fontWeight="500" color={colors.text}>
              Email
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.badge,
                  color: colors.icon,
                  borderColor: colorScheme === 'dark' ? '#3A3D40' : '#DDDDDD',
                }
              ]}
              value={user?.email}
              editable={false}
            />
            <Text fontSize={12} color={colors.icon}>
              L'email ne peut pas être modifié
            </Text>
          </YStack>
        </YStack>

        {/* Appearance Settings */}
        <YStack gap="$4" marginTop="$4">
          <Text fontSize={18} fontWeight="600" color={colors.text}>
            Apparence
          </Text>

          <XStack
            alignItems="center"
            justifyContent="space-between"
            padding="$4"
            borderRadius={12}
            style={{
              backgroundColor: colors.badge,
              borderWidth: 1,
              borderColor: colorScheme === 'dark' ? '#3A3D40' : '#DDDDDD',
            }}
          >
            <XStack gap="$3" alignItems="center">
              <Ionicons
                name={isDarkMode ? 'moon' : 'sunny'}
                size={24}
                color={colors.text}
              />
              <YStack gap="$1">
                <Text fontSize={16} fontWeight="500" color={colors.text}>
                  Mode sombre
                </Text>
                <Text fontSize={12} color={colors.icon}>
                  {isDarkMode ? 'Activé' : 'Désactivé'}
                </Text>
              </YStack>
            </XStack>
            <Switch
              value={isDarkMode}
              onValueChange={async (value) => {
                await setThemeMode(value ? 'dark' : 'light');
              }}
              trackColor={{ false: '#767577', true: colors.tint }}
              thumbColor={isDarkMode ? colors.tintContrast : '#f4f3f4'}
            />
          </XStack>
        </YStack>

        {/* Save Button */}
        <Pressable
          onPress={handleSave}
          disabled={isLoading}
          style={({ pressed }) => [
            styles.saveButton,
            {
              backgroundColor: colors.tint,
              opacity: pressed ? 0.8 : isLoading ? 0.6 : 1,
            }
          ]}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.tintContrast} />
          ) : (
            <Text fontSize={16} fontWeight="600" color={colors.tintContrast}>
              Enregistrer les modifications
            </Text>
          )}
        </Pressable>
      </YStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  input: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
  },
  saveButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
});
