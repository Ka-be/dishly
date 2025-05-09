
import { RecipeSearch } from "@/components/organisms/recipe-search"
import LikeButton from "@/components/molecules/LikeButton"
import { Navbar } from "@/components/molecules/Navbar"
import Logo from "@/components/molecules/Logo"

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
