import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

interface ResponsiveConfig {
	columns: number;
	cardWidth: number;
	spacing: number;
}

// Breakpoints (en largeur)
const BREAKPOINTS = {
	mobile: 768, // < 768px = mobile
	tablet: 1024, // 768-1024px = tablet
	desktop: 1024, // > 1024px = desktop
};

export const useResponsive = (): ResponsiveConfig => {
	const [screenData, setScreenData] = useState(Dimensions.get("window"));

	useEffect(() => {
		const onChange = (result: { window: any }) => {
			setScreenData(result.window);
		};

		const subscription = Dimensions.addEventListener("change", onChange);
		return () => subscription?.remove();
	}, []);

	const { width } = screenData;

	// Déterminer le nombre de colonnes selon la largeur
	const getColumns = (): number => {
		if (width < BREAKPOINTS.mobile) {
			return 1; // Mobile: 1 colonne (Instagram style)
		} else if (width < BREAKPOINTS.desktop) {
			return 2; // Tablet: 2 colonnes
		} else {
			return 4; // Desktop: 4 colonnes
		}
	};

	const columns = getColumns();
	const spacing = 16; // Padding horizontal total
	const cardSpacing = 12; // Espace entre les cartes

	// Calculer la largeur des cartes selon le nombre de colonnes
	const cardWidth =
		(width - spacing * 2 - cardSpacing * (columns - 1)) / columns;

	return {
		columns,
		cardWidth,
		spacing,
	};
};
