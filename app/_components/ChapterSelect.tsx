"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const ChapterSelect = ({
    tbid,
    chapters,
}: {
    tbid: string;
    chapters: string[];
}) => {
    const saveDetails = (val: string) => {
        localStorage.setItem("personalize-tb-tbid", tbid);
        localStorage.setItem("personalize-tb-chapter", val);
    };

    return (
        <Select onValueChange={(val) => saveDetails(val)}>
            <SelectTrigger className="w-1/2">
                <SelectValue placeholder="Select Chapter" />
            </SelectTrigger>
            <SelectContent className="w-full h-[250px]">
                {chapters.map((chap) => (
                    <SelectItem key={chap} value={chap}>
                        {chap}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default ChapterSelect;
