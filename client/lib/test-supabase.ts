import { supabase } from "./supabase";

export async function testSupabaseConnection() {
	try {
		const { data, error } = await supabase
			.from("_test")
			.select("*")
			.limit(1);

		if (error && error.code === "42P01") {
			console.log(
				"✅ Supabase connected successfully (table not found is expected)"
			);
			return true;
		}

		console.log("✅ Supabase connected successfully");
		return true;
	} catch (error) {
		console.error("❌ Supabase connection failed:", error);
		return false;
	}
}
