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
    const [grafs, setGrafs] = useState<string[]>([]);
    const [selectedGraf, setSelectedGraf] = useState<string | undefined>(
        undefined
    );

    const saveChapDetails = (chap: string) => {
        setGrafs(textbooks[tbid][chap]);
        setSelectedGraf(undefined);
    };

    const savedGrafDetails = async (graf: string) => {
        setSelectedGraf(graf);
    };

    return (
        <div className="flex items-center justify-start flex-col w-full h-fit gap-y-2">
            <ContentSelect
                {...{
                    chapters,
                    grafs,
                    selectedGraf,
                    saveChapDetails,
                    savedGrafDetails,
                }}
            />
            <GPTOutput {...{ selectedGraf }} />
        </div>
    );
};

export default Interactive;
