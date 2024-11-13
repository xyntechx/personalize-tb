import { openai } from "@/app/openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

export async function POST(request: Request) {
    const { userInterest, grafText } = await request.json();

    const GrafInfo = z.object({
        index: z.number().int(),
        block: z.string(),
    });

    const PersonalizedGrafs = z.object({
        grafs: GrafInfo.array(),
    });

    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-2024-08-06",
        temperature: 0,
        messages: [
            {
                role: "system",
                content: `You are a helpful teacher who personalizes a Computer Science textbook for a student based on their interest. The student is interested in ${userInterest}. You are given text blocks in the textbook, and your job is to tailor the text block in a way that is relevant and interesting for the learner, while maintaining the technical accuracy and the topic coverage. Sometimes, fundamental concepts may not be customized; in this case, providing content with little to no customization is fine. Please be precise with your customization. You can personalize code snippets, but keep code snippets as code snippets.\nInclude the following items in your output: the text block index, and the personalized text block (please exclude the index before the text block).`,
            },
            {
                role: "user",
                content: `${grafText}`,
            },
        ],
        response_format: zodResponseFormat(
            PersonalizedGrafs,
            "personalized_grafs"
        ),
    });

    const personalized_grafs = completion.choices[0].message.parsed;
    return Response.json(personalized_grafs);
}
