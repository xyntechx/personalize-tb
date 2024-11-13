import { openai } from "@/app/openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

export async function POST(request: Request) {
    const { bio } = await request.json();

    const UserInterest = z.object({
        interests: z.string().array(),
    });

    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-mini-2024-07-18",
        temperature: 0,
        messages: [
            {
                role: "system",
                content:
                    "You are a helpful teacher who determines a student's interests to personalize a textbook for them. The student gives you a short bio in the user message.\nBased on the bio, extract keywords indicating their interests. The student may provide you with one or more interests. Example keywords include astronomy, basketball, Spiderman. Some keywords may be a subset of other keywords (for example, 'Dragon Ball Z' is a subset of 'anime'); in this case, only extract the subset and ignore the more general keyword.",
            },
            {
                role: "user",
                content: `${bio}`,
            },
        ],
        response_format: zodResponseFormat(UserInterest, "user_interest"),
    });

    const user_interest = completion.choices[0].message.parsed;
    return Response.json(user_interest);
}
