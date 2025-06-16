import { Navbar } from "@/components/molecules/Navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ProfilePage() {
    return (
        <div className="flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-outfit)]">
            <Navbar />

            <main className="flex flex-col items-center justify-center w-full max-w-screen-lg mx-auto">
                <h2 className="text-2xl font-bold">Profil</h2>
                <Link href="/">
                    <Button variant="outline" className="mt-4">
                        <ArrowLeft />
                        Retour à l'accueil
                    </Button>

                </Link>
            </main>
        </div>
    );
}
