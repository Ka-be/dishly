import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


const Navbar = () => {
    return (
        <nav className="flex w-full h-16 px-4 sticky top-0 left-0 z-50 bg-background ">
            <div className="flex items-center justify-between w-full">
                <Link href="/">
                    <Image src="/logo_full.webp" alt="Dishly logo" width={100} height={100} />
                </Link>

                <div className="flex items-center gap-4">
                    <Link href="/register">
                        <Button variant="outline">S'inscrire</Button>
                    </Link>
                    <Link href="/connexion">
                        <Button>Se connecter</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;