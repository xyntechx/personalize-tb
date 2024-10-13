"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const BioInput = () => {
    const [bio, setBio] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== undefined) {
            const savedBio = localStorage.getItem("personalize-tb-my-bio");
            if (savedBio) {
                setBio(savedBio);
            }
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== undefined) {
            localStorage.setItem("personalize-tb-my-bio", bio);
        }
    }, [bio]);

    return (
        <>
            <label htmlFor="bio" className="text-center font-bold">
                About Me
            </label>
            <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.currentTarget.value)}
                placeholder={isLoading ? "Loading..." : "Enter your bio..."}
                className="w-full h-[150px] resize-none"
            />
        </>
    );
};

export default BioInput;
