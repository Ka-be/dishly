import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import Header from '@/components/Header';

export default function NewRecipeScreen() {
  const [recipeName, setRecipeName] = useState('');
  const [description, setDescription] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [difficulty, setDifficulty] = useState('Facile');
  const [cuisineType, setCuisineType] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const difficulties = ['Facile', 'Moyen', 'Difficile'];

  const handleSubmit = () => {
    if (!recipeName.trim()) {
      Alert.alert('Erreur', 'Le nom de la recette est obligatoire');
      return;
    }

    // Sauvegarde recette logique
    Alert.alert('Succès', 'Recette créée avec succès !');

    // Reset du formulaire
    setRecipeName('');
    setDescription('');
    setCookingTime('');
    setDifficulty('Facile');
    setCuisineType('');
    setIngredients('');
    setInstructions('');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    formContainer: {
      padding: 16,
    },
    inputGroup: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? '#3A3D40' : '#e9ecef',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: colors.text,
      backgroundColor: colorScheme === 'dark' ? '#2A2D30' : '#f8f9fa',
    },
    textArea: {
      minHeight: 100,
      textAlignVertical: 'top',
    },
    difficultyContainer: {
      flexDirection: 'row',
      gap: 12,
    },
    difficultyButton: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? '#3A3D40' : '#e9ecef',
      backgroundColor: colorScheme === 'dark' ? '#2A2D30' : '#f8f9fa',
      alignItems: 'center',
    },
    difficultyButtonActive: {
      backgroundColor: colors.tint,
      borderColor: colors.tint,
    },
    difficultyText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text,
    },
    difficultyTextActive: {
      color: '#ffffff',
    },
    submitButton: {
      backgroundColor: colors.tint,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 40,
    },
    submitButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
    requiredText: {
      color: '#ff4444',
      fontSize: 12,
      marginTop: 4,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Nouvelle recette" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.formContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Nom */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nom de la recette *</Text>
            <TextInput
              style={styles.input}
              value={recipeName}
              onChangeText={setRecipeName}
              placeholder="Ex: Tarte aux pommes"
              placeholderTextColor={colors.icon}
            />
            {!recipeName.trim() && (
              <Text style={styles.requiredText}>Ce champ est obligatoire</Text>
            )}
          </View>

          {/* Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Décrivez votre recette..."
              placeholderTextColor={colors.icon}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Temps de cuisson */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Temps de cuisson (minutes)</Text>
            <TextInput
              style={styles.input}
              value={cookingTime}
              onChangeText={setCookingTime}
              placeholder="Ex: 30"
              placeholderTextColor={colors.icon}
              keyboardType="numeric"
            />
          </View>

          {/* Difficulté */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Difficulté</Text>
            <View style={styles.difficultyContainer}>
              {difficulties.map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.difficultyButton,
                    difficulty === level && styles.difficultyButtonActive,
                  ]}
                  onPress={() => setDifficulty(level)}
                >
                  <Text
                    style={[
                      styles.difficultyText,
                      difficulty === level && styles.difficultyTextActive,
                    ]}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Type de cuisine */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Type de cuisine</Text>
            <TextInput
              style={styles.input}
              value={cuisineType}
              onChangeText={setCuisineType}
              placeholder="Ex: Française, Italienne, Asiatique..."
              placeholderTextColor={colors.icon}
            />
          </View>

          {/* Ingrédients */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ingrédients</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={ingredients}
              onChangeText={setIngredients}
              placeholder="Listez les ingrédients (un par ligne)..."
              placeholderTextColor={colors.icon}
              multiline
              numberOfLines={5}
            />
          </View>

          {/* Instructions */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Instructions</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={instructions}
              onChangeText={setInstructions}
              placeholder="Décrivez les étapes de préparation..."
              placeholderTextColor={colors.icon}
              multiline
              numberOfLines={6}
            />
          </View>

          
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Créer la recette</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
