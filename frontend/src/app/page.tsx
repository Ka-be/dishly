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

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col  items-center justify-center w-full">
        <Image
          src="/logo.png"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <h1 className="text-2xl font-bold">Hello Dishly</h1>
        <Card className="w-full max-w-sm flex flex-col items-center justify-center hover:scale-101 transition-all duration-300 hover:shadow-lg hover:cursor-pointer">
          <CardHeader className="w-full">
            <CardTitle>Lasagnes à la bolognaise</CardTitle>
            <CardDescription>Crée le 07/05/2025 par Dishly</CardDescription>
          </CardHeader>
          <CardContent className="w-full flex items-center justify-center">
            <Image src="/lasagna.png" alt="Lasagnes" width={100} height={100} className="rounded-lg" />
          </CardContent>
          <CardFooter>
            <Button>Modifier la recette</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
