"use client";

import { useState } from "react";
import ContentSelect from "@/app/personalize/[tbid]/ContentSelect";
import GPTOutput from "@/app/personalize/[tbid]/GPTOutput";

const Interactive = ({
    tbid,
    chapters,
}: {
    tbid: string;
    chapters: string[];
}) => {
    const [selectedChapter, setSelectedChapter] = useState<string | undefined>(
        undefined
    );

    const saveChapDetails = (chap: string) => {
        setSelectedChapter(chap);
    };

    return (
        <div className="flex items-center justify-start flex-col w-full h-fit gap-y-2">
            <ContentSelect
                {...{
                    chapters,
                    saveChapDetails,
                }}
            />
            <GPTOutput {...{ tbid, selectedChapter }} />
        </div>
    );
};

export default Interactive;
