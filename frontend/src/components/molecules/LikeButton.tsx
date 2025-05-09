"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaHeart, FaRegHeart } from "react-icons/fa6";


const LikeButton = () => {
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    const initialLikeCount = 13;

    return (
        <>
            <Button
                variant="outline"
                className="text-xs w-16"
                onClick={handleLike}
            >
                {isLiked ? (
                    <FaHeart className="text-primary" size={6} aria-hidden="true" />
                ) : (
                    <FaRegHeart className="opacity-60" size={6} aria-hidden="true" />
                )}
                <span className="text-muted-foreground before:bg-border relative ms-1 inline-flex h-full items-center justify-center pl-2 text-xs font-medium before:absolute before:inset-0 before:left-0 before:w-px">
                    {isLiked ? initialLikeCount + 1 : initialLikeCount}
                </span>
            </Button>
        </>
    );
};

export default LikeButton;