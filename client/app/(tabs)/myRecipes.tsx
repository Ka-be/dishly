import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card, XStack, YStack, Image, Button, View } from 'tamagui';
import { Colors } from '@/constants/Colors';
import { Recipe } from '@/@types/recipe';
import mockRecipes from '@/mock/recipes';
import Header from '@/components/Header';

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
    <Card
      elevate
      size="$4"
      bordered
      width={cardWidth}
      marginBottom="$3"
      overflow="hidden"
      backgroundColor="$background"
      hoverStyle={{ scale: 0.98 }}
      pressStyle={{ scale: 0.96 }}
      animation="bouncy"
    >
      <Card.Header padding="$0">
        <Image
          source={{ uri: recipe.image }}
          width="100%"
          height={120}
          backgroundColor="$color2"
        />
      </Card.Header>

      <Card.Footer padding="$3">
        <YStack space="$2" flex={1}>
 
          <Text
            style={[styles.cardTitle, { color: colors.text }]}
            numberOfLines={1}
          >
            {recipe.name}
          </Text>

  
          <Text
            style={[styles.cardDescription, { color: colors.icon }]}
            numberOfLines={2}
          >
            {recipe.description}
          </Text>


          <XStack alignItems="center">
            <XStack alignItems="center">
              <Ionicons name="time-outline" size={16} color={colors.icon} />
              <Text style={[styles.infoText, { color: colors.icon }]}>
                {recipe.cookingTime} min
              </Text>
            </XStack>
            <XStack alignItems="center">
              <Ionicons name="restaurant-outline" size={16} color={colors.icon} />
              <Text style={[styles.infoText, { color: colors.icon }]}>
                {recipe.difficulty}
              </Text>
            </XStack>
          </XStack>


          <XStack justifyContent="space-between" alignItems="center" marginTop="$2">
            <View
              style={[styles.badge, {
                backgroundColor: colorScheme === 'dark' ? '#2A2D30' : '#f1f3f4'
              }]}
            >
              <Text style={[styles.badgeText, { color: colors.text }]}>
                {recipe.cuisineType}
              </Text>
            </View>

            <Button
              size="$2"
              circular
              icon={<Ionicons name="heart-outline" size={20} color={colors.tint} />}
              backgroundColor="transparent"
              borderWidth={0}
              hoverStyle={{ backgroundColor: '$color3' }}
              pressStyle={{ scale: 0.9 }}
            />
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
    row: {
      justifyContent: 'space-between',
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
  });

  return (
    <SafeAreaView style={styles.container}>

      <Header title="Mes recettes" />


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
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.recipesList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}