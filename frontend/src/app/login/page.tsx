import { Navbar } from "@/components/molecules/Navbar"

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-outfit)]">
            <Navbar />

            <main className="flex flex-col items-center justify-center w-full max-w-screen-lg mx-auto">
                <h2 className="text-2xl font-bold">Connexion</h2>
            </main>
        </div>
    );
}
