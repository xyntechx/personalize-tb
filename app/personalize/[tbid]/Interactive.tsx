"use client";

import { useState } from "react";
import { textbooks } from "@/app/_utils/textbooks";
import ContentSelect from "@/app/personalize/[tbid]/ContentSelect";
import GPTOutput from "@/app/personalize/[tbid]/GPTOutput";

const Interactive = ({
    tbid,
    chapters,
}: {
    tbid: string;
    chapters: string[];
}) => {
    const [selectedGraf, setSelectedGraf] = useState<string | undefined>(
        undefined
    );

    const saveChapDetails = (chap: string) => {
        // Join the grafs to form a single string
        setSelectedGraf(textbooks[tbid][chap].join("\n"));
    };


    return (
        <div className="flex items-center justify-start flex-col w-full h-fit gap-y-2">
            <ContentSelect
                {...{
                    chapters,
                    saveChapDetails
                }}
            />
            <GPTOutput {...{ selectedGraf }} />
        </div>
    );
};

export default Interactive;
