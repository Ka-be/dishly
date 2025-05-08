
import { RecipeSearch } from "@/components/recipe-search"
import { Navbar } from "@/components/Navbar"

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-outfit)]">
            <Navbar />

            <main className="flex flex-col items-center justify-center w-full max-w-screen-lg mx-auto">
                <RecipeSearch />
            </main>
        </div>
    );
}
