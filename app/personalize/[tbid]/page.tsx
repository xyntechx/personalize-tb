import { textbooks } from "@/app/_utils/textbooks";
import ChapterSelect from "@/app/_components/ChapterSelect";

const Personalize = async ({ params }: { params: { tbid: string } }) => {
    const textbook = textbooks[params.tbid];
    const chapters = [];
    for (const chap in textbook) {
        chapters.push(chap.slice(0, chap.length - 3).trim());
    }
    chapters.sort((a, b) => Number(a.split(".")[0]) - Number(b.split(".")[0]));

    return (
        <main className="w-screen min-h-screen flex items-center justify-center flex-col p-4">
            <ChapterSelect tbid={params.tbid} chapters={chapters} />
        </main>
    );
};

export default Personalize;
