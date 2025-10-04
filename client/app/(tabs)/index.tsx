import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card, XStack, YStack, Image, Button, View } from 'tamagui';
import { Colors } from '@/constants/Colors';
import { Recipe } from '@/@types/recipe';
import mockRecipes from '@/mock/recipes';
import Header from '@/components/Header';
import { useResponsive } from '@/hooks/useResponsive';
import { testSupabaseConnection } from '@/lib/test-supabase';





export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(mockRecipes);
  const [likedRecipes, setLikedRecipes] = useState<{ [key: number]: boolean }>({});
  const [recipeLikes, setRecipeLikes] = useState<{ [key: number]: number }>(() => {
    // Initialiser avec les likes du mock
    const initialLikes: { [key: number]: number } = {};
    mockRecipes.forEach(recipe => {
      initialLikes[recipe.id] = recipe.likesCount || 0;
    });
    return initialLikes;
  });
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Hook responsive
  const { columns, cardWidth } = useResponsive();

  useEffect(() => {
    testSupabaseConnection();
  }, []);

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

  const toggleLike = (recipeId: number) => {
    setLikedRecipes(prev => {
      const newLikedState = { ...prev };
      const wasLiked = newLikedState[recipeId] || false;
      newLikedState[recipeId] = !wasLiked;

      setRecipeLikes(prevLikes => ({
        ...prevLikes,
        [recipeId]: wasLiked
          ? (prevLikes[recipeId] || 0) - 1
          : (prevLikes[recipeId] || 0) + 1
      }));

      return newLikedState;
    });
  };

  const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
    <Card
      elevate
      size="$4"
      bordered
      width={cardWidth}
      marginBottom="$3"
      marginHorizontal="$1"
      overflow="hidden"
      backgroundColor="$background"
      hoverStyle={{ scale: 0.98 }}
      pressStyle={{ scale: 0.96 }}
      animation="bouncy"
    >
      <Card.Header padding="$0">
        <Image
          source={{ uri: recipe.image }}
          width={cardWidth}
          height={200}
        />
      </Card.Header>

      <Card.Footer padding="$3">
        <YStack flex={1}>
          {/* Titre */}
          <Text
            style={[styles.cardTitle, { color: colors.text }]}
            numberOfLines={1}
          >
            {recipe.name}
          </Text>

          {/* Description */}
          <Text
            style={[styles.cardDescription, { color: colors.icon }]}
            numberOfLines={2}
          >
            {recipe.description}
          </Text>

          {/* Info temps et difficulté */}
          <XStack alignItems="center" justifyContent="space-between" marginTop="$2">
            <XStack alignItems="center" gap="$1">
              <Ionicons name="time-outline" size={16} color={colors.icon} />
              <Text style={[styles.infoText, { color: colors.icon }]}>
                {recipe.cookingTime} min
              </Text>
            </XStack>
            <XStack alignItems="center" gap="$1">
              <Ionicons name="restaurant-outline" size={16} color={colors.icon} />
              <Text style={[styles.infoText, { color: colors.icon }]}>
                {recipe.difficulty}
              </Text>
            </XStack>
          </XStack>

          {/* Footer */}
          <XStack justifyContent="space-between" alignItems="center" marginTop="$2">
            <View
              style={[styles.badge, {
                backgroundColor: colors.badge
              }]}
            >
              <Text style={[styles.badgeText, { color: colors.text }]}>
                {recipe.cuisineType}
              </Text>
            </View>

            <Button
              backgroundColor="transparent"
              borderWidth={0}
              padding={0}
              hoverStyle={{ backgroundColor: 'transparent' }}
              pressStyle={{ scale: 0.95 }}
              onPress={() => toggleLike(recipe.id)}
            >
              <XStack
                alignItems="center"
                gap="$2"
                style={[
                  styles.likeContainer,
                  {
                    backgroundColor: likedRecipes[recipe.id] ? colors.secondary : "transparent",
                    borderColor: likedRecipes[recipe.id] ? "transparent" : colors.icon,
                  }
                ]}
              >
                <Text style={[
                  styles.likesCount,
                  {
                    color: likedRecipes[recipe.id] ? "#fff" : colors.icon,
                    fontWeight: likedRecipes[recipe.id] ? '700' : '400'
                  }
                ]}>
                  {recipeLikes[recipe.id] || 0}
                </Text>

                <Ionicons
                  name={likedRecipes[recipe.id] ? "heart" : "heart-outline"}
                  size={16}
                  color={likedRecipes[recipe.id] ? "#fff" : colors.icon}
                />
              </XStack>
            </Button>
          </XStack>
        </YStack>
      </Card.Footer>
    </Card>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
    },
    cardDescription: {
      fontSize: 12,
      lineHeight: 16,
    },
    infoText: {
      fontSize: 12,
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
    likesCount: {
      fontSize: 12,
      fontWeight: '500',
    },
    likeContainer: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 6,
      borderWidth: 1,
      minWidth: 50,
      justifyContent: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.container}>

      <Header title="Accueil" />


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

      <FlatList
        data={filteredRecipes}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={columns}
        key={columns}
        contentContainerStyle={styles.recipesList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}