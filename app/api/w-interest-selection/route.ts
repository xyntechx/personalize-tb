import { openai } from "@/app/openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

export async function POST(request: Request) {
    const { interests } = await request.json();

    const UserInterest = z.object({
        interest: z.string(),
    });

    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-mini-2024-07-18",
        temperature: 0,
        messages: [
            {
                role: "system",
                content:
                    "You are an attentive listener who is given a comma-separated list of interests. Determine the one most specific interest. Only choose one interest; never mix interests.",
            },
            {
                role: "user",
                content: `${interests}`,
            },
        ],
        response_format: zodResponseFormat(UserInterest, "interest"),
    });

    const interest = completion.choices[0].message.parsed;
    return Response.json(interest);
}
