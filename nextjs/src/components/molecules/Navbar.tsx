"use client"

import { useState } from "react"
import Link from "next/link"
import { LogOut, Menu, User } from "lucide-react"
import Logo from "@/components/molecules/Logo"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"




interface NavbarProps {
    user?: {
        name: string
        email: string
        image?: string
    }
}

export const Navbar = ({ user = { name: "Kevin", email: "kaabe@gmail.com" } }: NavbarProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleLogout = () => {
        // Add your logout logic here
        console.log("User logged out")
        // For example: signOut() or router.push('/login')
    }

    return (
        <header className="sticky top-0 left-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-2 mb-4">
            <div className=" flex h-16 items-center justify-between w-full ">
                <div className="flex items-center gap-2 md:gap-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <Logo
                            primary="var(--primary)"
                            secondary="var(--secondary)"
                            background="var(--background)"
                        />
                    </Link>
                </div>

                {/* Desktop Navigation
                <nav className="hidden md:flex md:gap-6">
                    <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                        Accueil
                    </Link>
                    <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
                        Top recettes
                    </Link>
                    <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                        A propos
                    </Link>
                </nav> */}

                <div className="flex items-center gap-4">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-xs">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user.image || "https://github.com/ka-be.png"} alt={user.name} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">Bonjour {user.name} !</p>
                                        <p className="text-xs leading-none text-muted-foreground/50">{user.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <Link href="/profile">
                                        <DropdownMenuItem>
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Profil</span>
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Se déconnecter</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button asChild variant="outline" size="sm">
                                <Link href="/register">S'inscrire</Link>
                            </Button>
                            <Button asChild variant="default" size="sm">
                                <Link href="/login">Se connecter</Link>
                            </Button>
                        </div>

                    )}

                    {/* Mobile Menu
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <nav className="flex flex-col gap-4">
                                <Link
                                    href="/"
                                    className="text-sm font-medium transition-colors hover:text-primary"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/dashboard"
                                    className="text-sm font-medium transition-colors hover:text-primary"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/about"
                                    className="text-sm font-medium transition-colors hover:text-primary"
                                    onClick={() => setIsOpen(false)}
                                >
                                    About
                                </Link>
                                {user && (
                                    <Button variant="ghost" className="justify-start px-2" onClick={handleLogout}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Disconnect</span>
                                    </Button>
                                )}
                            </nav>
                        </SheetContent>
                    </Sheet> */}
                </div>
            </div>
        </header>
    )
}
