"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface IProps {
    chapters: string[];
    saveChapDetails: (arg: string) => void;
}

const ContentSelect = ({
    chapters,
    saveChapDetails
}: IProps) => {
    return (
        <>
            {/* Chapter selection */}
            <Select onValueChange={(val) => saveChapDetails(val)}>
                <SelectTrigger className="w-[250px] md:w-[500px]">
                    <SelectValue placeholder="Select Chapter" />
                </SelectTrigger>
                <SelectContent className="w-[250px] md:w-[500px] h-[250px]">
                    {chapters.map((chap) => (
                        <SelectItem key={chap} value={chap}>
                            {chap.slice(0, chap.length - 3).trim()}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    );
};

export default ContentSelect;
