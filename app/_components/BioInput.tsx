"use client";

import { useEffect, useState } from "react";

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
    }, [, bio]);

    return (
        <>
            <label htmlFor="bio" className="text-center font-bold">
                About Me
            </label>
            <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.currentTarget.value)}
                placeholder={isLoading ? "Loading..." : "Enter your bio..."}
                className="w-full h-[150px] bg-gray-100 px-4 py-2 outline-none rounded-md resize-none border border-transparent focus:border-black"
            />
        </>
    );
};

export default BioInput;
