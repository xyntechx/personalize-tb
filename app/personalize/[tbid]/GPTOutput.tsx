"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";

import { encode } from "gpt-tokenizer";

import { Button } from "@/components/ui/button";
import { textbooks } from "@/app/_utils/textbooks";

interface GrafInfo {
    block: string;
    index: number;
    is_example_based: boolean;
}

interface ExampleChunk {
    index: number;
    example_id: number;
}

interface GroupedGraf {
    [key: number]: GrafInfo[];
}

interface PersonalizedGrafInfo {
    block: string;
    index: number;
}

const GPTOutput = ({
    tbid,
    selectedChapter,
}: {
    tbid: string;
    selectedChapter: string | undefined;
}) => {
    const [bio, setBio] = useState<string | undefined>(undefined);
    const [personalizedChapter, setPersonalizedChapter] = useState<string>();

    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState<string>();

    useEffect(() => {
        if (typeof window !== undefined) {
            const savedBio = localStorage.getItem("personalize-tb-my-bio");
            if (savedBio) {
                setBio(savedBio);
            }
        }
    }, []);

    const extractInterest = async () => {
        const res = await fetch(`/api/v-interest-extraction`, {
            method: "POST",
            body: JSON.stringify({
                bio,
            }),
        });

        const data = await res.json();
        return data.interests;
    };

    const selectInterest = async (interests: string[]) => {
        const res = await fetch(`/api/w-interest-selection`, {
            method: "POST",
            body: JSON.stringify({
                interests,
            }),
        });

        const data = await res.json();
        return data.interest;
    };

    const classifyGrafs = async () => {
        if (!selectedChapter) return;

        const chapterText = textbooks[tbid][selectedChapter];
        const chapterTextPerGraf = chapterText.split("\n\n");
        const TOKEN_LIMIT = 400;

        const chunks: string[][] = [[]];
        let currIdx = 0;
        let currTokenCount = 0;

        for (const graf of chapterTextPerGraf) {
            const tokenCount = encode(graf).length;

            // Push first so that there won't be an empty array
            // in case the first graf has tokenCount > TOKEN_LIMIT
            chunks[currIdx].push(graf);
            currTokenCount += tokenCount;

            if (currTokenCount > TOKEN_LIMIT) {
                chunks.push([]);
                currIdx++;
                currTokenCount = 0;
            }
        }

        const classifications: GrafInfo[] = [];
        let baseIdx = 0;

        for (const chunk of chunks) {
            const res = await fetch(`/api/x-graf-classification`, {
                method: "POST",
                body: JSON.stringify({
                    chapterText: chunk,
                }),
            });

            const data = await res.json();
            for (const graf of data.classifications) {
                classifications.push({
                    block: graf.block,
                    index: graf.index + baseIdx,
                    is_example_based: graf.is_example_based,
                });
            }

            baseIdx = classifications.length;
        }

        return classifications;
    };

    const extractExampleGrafs = (classifications: GrafInfo[]) => {
        if (!classifications) return;

        let exampleGrafs = "";

        for (const graf of classifications) {
            if (!graf.is_example_based) continue;

            const text = `${graf.index}. ${graf.block}\n\n`;
            exampleGrafs += text;
        }

        return exampleGrafs;
    };

    const chunkGrafs = async (classifications: GrafInfo[]) => {
        const exampleGrafs = extractExampleGrafs(classifications);

        const res = await fetch(`/api/y-graf-chunking`, {
            method: "POST",
            body: JSON.stringify({
                exampleGrafs,
            }),
        });

        const data = await res.json();
        return data.chunks;
    };

    const groupGrafs = (
        classifications: GrafInfo[],
        chunks: ExampleChunk[]
    ) => {
        const indexToExampleID: { [key: number]: number } = {};
        for (const c of chunks) {
            indexToExampleID[c.index] = c.example_id;
        }

        const groups: GroupedGraf = {};
        groups[-1] = [];

        for (const graf of classifications) {
            if (graf.is_example_based) {
                const index = indexToExampleID[graf.index];
                if (!(index in groups)) {
                    groups[index] = [];
                }
                groups[index].push({
                    block: graf.block,
                    index: graf.index,
                    is_example_based: true,
                });
            } else {
                groups[-1].push({
                    block: graf.block,
                    index: graf.index,
                    is_example_based: false,
                });
            }
        }

        return groups;
    };

    const generatePersonalization = async (
        userInterest: string,
        classifications: GrafInfo[],
        chunks: ExampleChunk[]
    ) => {
        const groups = groupGrafs(classifications, chunks);
        const nonExampleGroup = [];
        const exampleGroups: GroupedGraf = {};
        for (const exampleID in groups) {
            if (exampleID === "-1") {
                nonExampleGroup.push(...groups[exampleID]);
            } else {
                exampleGroups[exampleID] = groups[exampleID];
            }
        }

        const personalizedGrafs: PersonalizedGrafInfo[] = [];
        for (const id in exampleGroups) {
            const grafText = extractExampleGrafs(exampleGroups[id]);

            const res = await fetch(`/api/z-personalize`, {
                method: "POST",
                body: JSON.stringify({
                    userInterest,
                    grafText,
                }),
            });

            const data = await res.json();
            personalizedGrafs.push(...data.grafs);
        }

        for (const graf of nonExampleGroup) {
            personalizedGrafs.push({
                block: graf.block,
                index: graf.index,
            });
        }

        personalizedGrafs.sort((a, b) => a.index - b.index);

        return personalizedGrafs;
    };

    const personalize = async () => {
        setIsLoading(true);

        setLoadingText("Extracting user interest...");
        const userInterests = await extractInterest();

        setLoadingText("Selecting most specific interest...");
        const selectedInterest = await selectInterest(userInterests);

        setLoadingText("Finding example-based paragraphs...");
        const classifications = await classifyGrafs();

        if (!classifications) {
            setLoadingText("ERROR");
            return;
        }

        setLoadingText("Grouping paragraphs based on examples...");
        const chunks = await chunkGrafs(classifications);

        setLoadingText("Personalizing chapter...");
        const personalizedGrafs = await generatePersonalization(
            selectedInterest,
            classifications,
            chunks
        );
        let chapter = "";
        for (const graf of personalizedGrafs) {
            const text = `${graf.block}\n\n`;
            chapter += text;
        }
        setPersonalizedChapter(chapter);

        setIsLoading(false);
    };

    return (
        <div className="flex items-center justify-start flex-col w-full h-fit gap-y-2 p-4">
            <Button
                onClick={() => personalize()}
                variant="default"
                disabled={!bio || !selectedChapter || isLoading}
            >
                Personalize
            </Button>

            {isLoading && <p>{loadingText}</p>}

            {!isLoading && personalizedChapter && (
                <Markdown
                    className="w-full md:w-4/5 pt-4 flex items-center justify-center gap-y-6 flex-col text-left"
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        h1({ ...rest }) {
                            return (
                                <h1
                                    className="font-bold text-4xl pt-4 w-full"
                                    {...rest}
                                />
                            );
                        },
                        h2({ ...rest }) {
                            return (
                                <h2
                                    className="font-bold text-2xl pt-4 w-full"
                                    {...rest}
                                />
                            );
                        },
                        h3({ ...rest }) {
                            return (
                                <h3
                                    className="font-bold text-lg pt-4 w-full"
                                    {...rest}
                                />
                            );
                        },
                        h4({ ...rest }) {
                            return (
                                <h4
                                    className="font-bold text-lg pt-4 w-full"
                                    {...rest}
                                />
                            );
                        },
                        h5({ ...rest }) {
                            return (
                                <h5
                                    className="font-bold text-lg pt-4 w-full"
                                    {...rest}
                                />
                            );
                        },
                        h6({ ...rest }) {
                            return (
                                <h6
                                    className="font-bold text-lg pt-4 w-full"
                                    {...rest}
                                />
                            );
                        },
                        p({ ...rest }) {
                            return <p className="w-full leading-8" {...rest} />;
                        },
                        a({ href, ...rest }) {
                            return (
                                <Link
                                    href={href!}
                                    className="text-blue-400 hover:text-blue-500 transition-colors underline"
                                    {...rest}
                                />
                            );
                        },
                        ul({ ...rest }) {
                            return (
                                <ul
                                    className="list-disc pl-8 w-full"
                                    {...rest}
                                />
                            );
                        },
                        code(props) {
                            const { children, className, ...rest } = props;
                            const match = /language-(\w+)/.exec(
                                className || ""
                            );
                            return match || String(children).includes("\n") ? (
                                <SyntaxHighlighter
                                    PreTag="div"
                                    language={match ? match[1] : "txt"}
                                    style={atomDark}
                                    customStyle={{
                                        width: "80vw",
                                        fontSize: "0.875rem",
                                    }}
                                >
                                    {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                            ) : (
                                <code
                                    {...rest}
                                    className="text-sm bg-gray-700 py-1 px-1 border border-transparent rounded-md font-bold text-gray-50"
                                >
                                    {children}
                                </code>
                            );
                        },
                    }}
                >
                    {personalizedChapter}
                </Markdown>
            )}
        </div>
    );
};

export default GPTOutput;
