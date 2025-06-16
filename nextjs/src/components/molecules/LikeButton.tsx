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
                aria-label={isLiked ? "Retirer le like" : "Liker"}
                className={`
        group
        text-xs
        w-20
        h-8
        flex items-center justify-center gap-1
        border
        transition-all duration-200
        ${isLiked ? "bg-primary/10 border-background hover:bg-background hover:border-primary" : "hover:bg-primary/5"}
        relative
        overflow-hidden
      `}
                onClick={handleLike}
            >
                <span
                    className={`
          flex items-center justify-center
          transition-transform duration-200
          ${isLiked ? "scale-105" : "scale-100"}
        `}
                >
                    {isLiked ? (
                        <FaHeart className="text-primary drop-shadow" size={18} aria-hidden="true" />
                    ) : (
                        <FaRegHeart className="opacity-60" size={18} aria-hidden="true" />
                    )}
                </span>
                <span
                    className={`
          text-xs font-medium ml-2
          transition-colors duration-200
          ${isLiked ? "text-foreground" : "text-muted-foreground"}
        `}
                >
                    {isLiked ? initialLikeCount + 1 : initialLikeCount}
                </span>
            </Button>
        </>
    );
};

export default LikeButton;