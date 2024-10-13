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
    grafs: string[];
    selectedGraf: string | undefined;
    saveChapDetails: (arg: string) => void;
    savedGrafDetails: (arg: string) => void;
}

const ContentSelect = ({
    chapters,
    grafs,
    selectedGraf,
    saveChapDetails,
    savedGrafDetails,
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

            {/* Paragraph selection */}
            <Select
                value={selectedGraf || ""}
                onValueChange={(val) => savedGrafDetails(val)}
                disabled={grafs.length === 0}
            >
                <SelectTrigger className="w-[250px] md:w-[500px]">
                    <SelectValue placeholder="Select Paragraph" />
                </SelectTrigger>
                <SelectContent className="w-[250px] md:w-[500px] h-[250px]">
                    {grafs.map(
                        (graf) =>
                            graf && (
                                <SelectItem key={graf} value={graf}>
                                    {graf}
                                </SelectItem>
                            )
                    )}
                </SelectContent>
            </Select>
        </>
    );
};

export default ContentSelect;
