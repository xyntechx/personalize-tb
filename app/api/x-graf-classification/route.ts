import { openai } from "@/app/openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

export async function POST(request: Request) {
    const { chapterText } = await request.json();

    const GrafInfo = z.object({
        block: z.string(),
        index: z.number().int(),
        is_example_based: z.boolean(),
    });

    const ClassifiedGrafs = z.object({
        classifications: GrafInfo.array(),
    });

    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-2024-08-06",
        temperature: 0,
        messages: [
            {
                role: "system",
                content:
                    "You are a systematic textbook reading expert. You are given a chapter from a Computer Science textbook in Markdown format in the user message. Each chapter contains multiple text blocks; a block can be a header, a code snippet, a paragraph, etc. Your task is to determine whether each text block is example-based. An example-based text block elaborates on some previously-outlined concept using specific examples (e.g. bananas).\nInclude the following items in your output: the unmodified block itself, the index of the block (starts at 1 and increments by 1 for each block), and a boolean that is true when the block is example-based and false otherwise. Do not exclude any block in your output; your output must contain all headers, code snippets, paragraphs, and other blocks that are found in the user message. Also, do not merge two blocks together.\nNote: headers and paragraphs that explain fundamental Computer Science concepts should have false in their is_example_based field. Blocks that contain specific everyday words (e.g. 'bananas') are should have true in their is_example_based field. When in doubt about a block, put true in its is_example_based field.",
            },
            {
                role: "user",
                content: `${chapterText}`,
            },
        ],
        response_format: zodResponseFormat(ClassifiedGrafs, "classified_grafs"),
    });

    const classified_grafs = completion.choices[0].message.parsed;
    return Response.json(classified_grafs);
}
