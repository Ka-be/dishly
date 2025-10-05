import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Pressable,
    Image,
    Alert,
    Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';

// 👈 Interface pour les props
interface HeaderProps {
    title: string;
}

export default function Header({
    title
}: HeaderProps) {
    const [showMenu, setShowMenu] = useState(false);
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const { user, profile, signOut } = useAuth();
    const router = useRouter();

    const menuItems = [
        { id: 1, title: 'Mon profil', icon: 'person-outline' },
        { id: 2, title: 'Paramètres', icon: 'settings-outline' },
        { id: 3, title: 'Favoris', icon: 'heart-outline' },
        { id: 4, title: 'Aide', icon: 'help-circle-outline' },
        { id: 5, title: 'Déconnexion', icon: 'log-out-outline', isLogout: true },
    ];

    const handleMenuPress = async (itemId: number) => {
        setShowMenu(false);

        // Handle settings/profile navigation
        if (itemId === 1 || itemId === 2) {
            router.push('/settings');
            return;
        }

        // Handle logout
        if (itemId === 5) {
            const handleLogout = async () => {
                try {
                    await signOut();
                } catch (error) {
                    console.error('❌ Logout error:', error);
                    if (Platform.OS === 'web') {
                        window.alert('Impossible de se déconnecter. Veuillez réessayer.');
                    } else {
                        Alert.alert('Erreur', 'Impossible de se déconnecter. Veuillez réessayer.');
                    }
                }
            };

            // Web confirmation
            if (Platform.OS === 'web') {
                const confirmed = window.confirm('Voulez-vous vraiment vous déconnecter ?');
                if (confirmed) {
                    await handleLogout();
                }
            }
            // Mobile confirmation
            else {
                Alert.alert(
                    'Déconnexion',
                    'Voulez-vous vraiment vous déconnecter ?',
                    [
                        {
                            text: 'Annuler',
                            style: 'cancel',
                        },
                        {
                            text: 'Déconnexion',
                            style: 'destructive',
                            onPress: handleLogout,
                        },
                    ]
                );
            }
        }
        // TODO: Handle other menu items (Favoris, Aide)
    };

    // Get user initials from profile
    const getUserInitials = () => {
        if (profile?.firstname && profile?.lastname) {
            return `${profile.firstname[0]}${profile.lastname[0]}`.toUpperCase();
        }
        return user?.email?.[0].toUpperCase() || 'U';
    };

    // Get avatar URL from user metadata (Google OAuth)
    const avatarUrl = user?.user_metadata?.avatar_url || profile?.avatar_url;

    const styles = StyleSheet.create({
        header: {
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: colorScheme === 'dark' ? '#2A2D30' : '#f0f0f0',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        title: {
            fontSize: 28,
            fontWeight: 'bold',
            color: colors.text,
        },
        avatar: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.tint,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
        },
        avatarImage: {
            width: 40,
            height: 40,
            borderRadius: 20,
        },
        avatarText: {
            color: '#ffffff',
            fontSize: 16,
            fontWeight: 'bold',
        },
        modalOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
        },
        menuContainer: {
            backgroundColor: colors.background,
            borderRadius: 12,
            marginTop: 60,
            marginRight: 16,
            minWidth: 200,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 5,
            borderWidth: 1,
            borderColor: colorScheme === 'dark' ? '#3A3D40' : '#e9ecef',
        },
        menuItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: colorScheme === 'dark' ? '#2A2D30' : '#f0f0f0',
        },
        lastMenuItem: {
            borderBottomWidth: 0,
        },
        menuIcon: {
            marginRight: 12,
        },
        menuText: {
            fontSize: 16,
            color: colors.text,
            flex: 1,
        },
        logoutText: {
            color: '#ff4444',
        },
        logoutIcon: {
            color: '#ff4444',
        },
    });

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>

                <TouchableOpacity
                    style={styles.avatar}
                    onPress={() => setShowMenu(true)}
                >
                    {avatarUrl ? (
                        <Image
                            source={{ uri: avatarUrl }}
                            style={styles.avatarImage}
                        />
                    ) : (
                        <Text style={styles.avatarText}>{getUserInitials()}</Text>
                    )}
                </TouchableOpacity>
            </View>

            {/* Menu */}
            <Modal
                visible={showMenu}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowMenu(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setShowMenu(false)}
                >
                    <View style={styles.menuContainer}>
                        {menuItems.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.menuItem,
                                    index === menuItems.length - 1 && styles.lastMenuItem,
                                ]}
                                onPress={() => handleMenuPress(item.id)}
                            >
                                <Ionicons
                                    name={item.icon as any}
                                    size={20}
                                    color={item.isLogout ? '#ff4444' : colors.icon}
                                    style={styles.menuIcon}
                                />
                                <Text
                                    style={[
                                        styles.menuText,
                                        item.isLogout && styles.logoutText,
                                    ]}
                                >
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Pressable>
            </Modal>
        </>
    );
}