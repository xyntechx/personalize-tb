import { textbooks } from "@/app/_utils/textbooks";
import Interactive from "./Interactive";
import Link from "next/link";

const Personalize = async ({ params }: { params: { tbid: string } }) => {
    const textbook = textbooks[params.tbid];
    const chapters = Object.keys(textbook);
    chapters.sort((a, b) => Number(a.split(".")[0]) - Number(b.split(".")[0]));

    return (
        <main className="w-screen min-h-screen flex items-center justify-start flex-col p-4">
            <div className="w-full flex items-center justify-start">
                <Link
                    href="/"
                    className="font-bold text-gray-400 hover:text-gray-500 transition-colors text-left"
                >
                    &lt;
                </Link>
            </div>
            <Interactive tbid={params.tbid} chapters={chapters} />
        </main>
    );
};

export default Personalize;
