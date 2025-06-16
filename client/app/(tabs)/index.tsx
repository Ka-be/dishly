import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Recipe } from '@/@types/recipe';
import mockRecipes from '@/mock/recipes';
import Logo from '@/components/Logo';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 colonnes avec padding

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(mockRecipes);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredRecipes(mockRecipes);
    } else {
      const filtered = mockRecipes.filter(recipe =>
        recipe.name.toLowerCase().includes(text.toLowerCase()) ||
        recipe.description.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  };

  const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
    <TouchableOpacity style={[styles.card, { width: cardWidth, backgroundColor: colors.background }]}>
      <Image source={{ uri: recipe.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: colors.text }]} numberOfLines={1}>
          {recipe.name}
        </Text>
        <Text style={[styles.cardDescription, { color: colors.icon }]} numberOfLines={2}>
          {recipe.description}
        </Text>

        <View style={styles.cardInfo}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={16} color={colors.icon} />
            <Text style={[styles.infoText, { color: colors.icon }]}>{recipe.cookingTime} min</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="restaurant-outline" size={16} color={colors.icon} />
            <Text style={[styles.infoText, { color: colors.icon }]}>{recipe.difficulty}</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View style={[styles.badge, { backgroundColor: colorScheme === 'dark' ? '#2A2D30' : '#f1f3f4' }]}>
            <Text style={[styles.badgeText, { color: colors.text }]}>{recipe.cuisineType}</Text>
          </View>
          <TouchableOpacity style={styles.likeButton}>
            <Ionicons name="heart-outline" size={20} color={colors.tint} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colorScheme === 'dark' ? '#2A2D30' : '#f0f0f0',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
    },
    searchContainer: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 12,
    },
    searchBar: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colorScheme === 'dark' ? '#2A2D30' : '#f8f9fa',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? '#3A3D40' : '#e9ecef',
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
    },
    filterButton: {
      backgroundColor: colorScheme === 'dark' ? '#2A2D30' : '#f8f9fa',
      borderRadius: 12,
      padding: 12,
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? '#3A3D40' : '#e9ecef',
      justifyContent: 'center',
      alignItems: 'center',
    },
    recipesList: {
      padding: 16,
    },
    row: {
      justifyContent: 'space-between',
    },
    card: {
      borderRadius: 12,
      marginBottom: 16,
      shadowColor: colorScheme === 'dark' ? '#000' : '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: colorScheme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
      overflow: 'hidden',
      borderWidth: colorScheme === 'dark' ? 1 : 0,
      borderColor: colorScheme === 'dark' ? '#2A2D30' : 'transparent',
    },
    cardImage: {
      width: '100%',
      height: 120,
      backgroundColor: colorScheme === 'dark' ? '#2A2D30' : '#f0f0f0',
    },
    cardContent: {
      padding: 12,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
    },
    cardDescription: {
      fontSize: 12,
      lineHeight: 16,
      marginBottom: 8,
    },
    cardInfo: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 8,
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    infoText: {
      fontSize: 12,
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    badgeText: {
      fontSize: 10,
      fontWeight: '500',
    },
    likeButton: {
      padding: 4,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header avec titre */}
      <View style={styles.header}>
        <Logo
          primary={colors.tint}
          secondary={colorScheme === 'dark' ? '#2A2D30' : '#f1f3f4'}
          background={colors.background}
          width={120}
          height={30}
        />
      </View>

      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.icon} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une recette..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor={colors.icon}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close" size={20} color={colors.icon} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Liste des recettes */}
      <FlatList
        data={filteredRecipes}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.recipesList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}