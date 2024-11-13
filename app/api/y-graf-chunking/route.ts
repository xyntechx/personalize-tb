import { openai } from "@/app/openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

export async function POST(request: Request) {
    const { exampleGrafs } = await request.json();

    const GrafInfo = z.object({
        index: z.number().int(),
        example_id: z.number().int(),
    });

    const ChunkedGrafs = z.object({
        chunks: GrafInfo.array(),
    });

    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-2024-08-06",
        temperature: 0,
        messages: [
            {
                role: "system",
                content:
                    "You are a systematic textbook reading expert. You are given paragraphs in a Computer Science textbook consisting of examples, and your job is to determine which of them belong to the same example, and which of them belong to different examples. Paragraphs start with their respective paragraph index that is an integer, and are split by empty lines. If paragraphs belong to the same example, use the same id.\nInclude the following items in your output: the paragraph index, and the id of the example.",
            },
            {
                role: "user",
                content: `${exampleGrafs}`,
            },
        ],
        response_format: zodResponseFormat(ChunkedGrafs, "chunked_grafs"),
    });

    const chunked_grafs = completion.choices[0].message.parsed;
    return Response.json(chunked_grafs);
}
