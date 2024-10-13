"use client";

import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";

const GPTOutput = ({ selectedGraf }: { selectedGraf: string | undefined }) => {
    const [bio, setBio] = useState<string | undefined>(undefined);
    const [personalizedGraf, setPersonalizedGraf] = useState<string | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (typeof window !== undefined) {
            const savedBio = localStorage.getItem("personalize-tb-my-bio");
            if (savedBio) {
                setBio(savedBio);
            }
        }
    }, []);

    const generatePersonalization = async () => {
        setIsLoading(true);

        const res = await fetch(`/api/personalize`, {
            method: "POST",
            body: JSON.stringify({
                bio,
                selectedGraf,
            }),
        });

        const data = await res.json();

        setPersonalizedGraf(data.personalizedGraf);

        setIsLoading(false);
    };

    return (
        <div className="flex items-center justify-start flex-col w-full h-fit gap-y-2">
            <Button
                onClick={() => generatePersonalization()}
                variant="default"
                disabled={!(bio && selectedGraf) || isLoading}
            >
                Personalize
            </Button>
            {isLoading && <p>Loading...</p>}
            {!isLoading && personalizedGraf && (
                <Markdown
                    className="w-full md:w-1/2 pt-4"
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1({ node, ...rest }) {
                            return (
                                <h1
                                    className="font-bold text-2xl py-2"
                                    {...rest}
                                />
                            );
                        },
                        h2({ node, ...rest }) {
                            return (
                                <h2
                                    className="font-bold text-xl py-2"
                                    {...rest}
                                />
                            );
                        },
                        h3({ node, ...rest }) {
                            return (
                                <h3
                                    className="font-bold text-lg py-2"
                                    {...rest}
                                />
                            );
                        },
                        code(props) {
                            const { children, className, node, ...rest } =
                                props;
                            const match = /language-(\w+)/.exec(
                                className || ""
                            );
                            return match ? (
                                <SyntaxHighlighter
                                    // {...rest}
                                    PreTag="div"
                                    children={String(children).replace(
                                        /\n$/,
                                        ""
                                    )}
                                    language={match[1]}
                                    style={atomDark}
                                />
                            ) : (
                                <code {...rest} className={className}>
                                    {children}
                                </code>
                            );
                        },
                    }}
                >
                    {personalizedGraf}
                </Markdown>
            )}
        </div>
    );
};

export default GPTOutput;
