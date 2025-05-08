import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RecipeSearch } from "@/components/recipe-search"
export default function Home() {
    return (
        <div className="flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-outfit)]">
            <nav className="w-screen h-16 px-4">
                <div className="flex items-center justify-between">
                    <Image src="/logo.png" alt="Next.js logo" width={64} height={64} />
                    <Button>Se connecter</Button>
                </div>
            </nav>

            <main className="flex flex-col items-center justify-center w-full max-w-screen-lg mx-auto">
                <RecipeSearch />
            </main>
        </div>
    );
}
