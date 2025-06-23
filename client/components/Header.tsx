import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

// 👈 Interface pour les props
interface HeaderProps {
    title: string;
}

export default function Header({
    title
}: HeaderProps) {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const styles = StyleSheet.create({
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
    });

    return (
        <View style={styles.header}>
            {/* <Logo
        primary={colors.tint}
        secondary={colorScheme === 'dark' ? '#2A2D30' : '#f1f3f4'}
        background={colors.background}
        width={120}
        height={30}
      /> */}
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}