import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

const ExpoSecureStoreAdapter = {
	getItem: (key: string) => {
		if (Platform.OS === "web") {
			if (typeof window !== "undefined" && window.localStorage) {
				return Promise.resolve(localStorage.getItem(key));
			}
			return Promise.resolve(null);
		}
		return SecureStore.getItemAsync(key);
	},
	setItem: (key: string, value: string) => {
		if (Platform.OS === "web") {
			if (typeof window !== "undefined" && window.localStorage) {
				localStorage.setItem(key, value);
			}
			return Promise.resolve();
		}
		return SecureStore.setItemAsync(key, value);
	},
	removeItem: (key: string) => {
		if (Platform.OS === "web") {
			if (typeof window !== "undefined" && window.localStorage) {
				localStorage.removeItem(key);
			}
			return Promise.resolve();
		}
		return SecureStore.deleteItemAsync(key);
	},
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: ExpoSecureStoreAdapter,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: Platform.OS === 'web',
	},
});
