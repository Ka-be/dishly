import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { RecipeSearch } from '@/components/recipe-search';
const Navbar = () => {
    return (
        <nav className="w-full h-16 px-4 sticky top-0 left-0 z-50 bg-background">
            <div className="flex items-center justify-between">
                <Image src="/logo.png" alt="Next.js logo" width={64} height={64} />


                <div className="flex items-center gap-4">
                    <Button variant="outline">S'inscrire</Button>
                    <Button>Se connecter</Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;