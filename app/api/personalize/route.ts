import { openai } from "@/app/openai";

export const runtime = "nodejs";

export async function POST(request: Request) {
    const { bio, selectedGraf } = await request.json();

    const userInterestResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content:
                    "You are a helpful teacher who is trying to determine the student's interest, so that they can receive a tailored version of an online textbook for data structure concepts. The learner will write down a short bio in their user message.\nBased on the user's bio, how would you summarize the student's interest to the person who is trying to design the textbook that is tailored to the student's interest? Some information you want to give could be about the field you predict they might be interested in (social sciencies, humanities), or about their major. If they mention very specific examples or interest (Iron Man, Spiderman, video game Genshin Impact), feel free to also put that in your summary.",
            },
            {
                role: "user",
                content: `${bio}`,
            },
        ],
    });

    const userInterest = userInterestResponse.choices[0].message.content;

    const personalizationResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `You are a helpful teacher who is trying to customize a data structures online textbook for a learner.\n${userInterest}\nYou will be given paragraphs in the textbook, and your job is to tailor the paragraph in a way that is relevant and interesting for the learner, while maintaining the technical accuracy and the topic coverage. Sometimes, fundamental concepts may not be customized. In this case, providing content with little to no customization is fine.\nPlease be precise with your customization and output the customized paragraph directly. Try to stick with the same example throughout and maintain a coherent narrative.`,
            },
            {
                role: "user",
                content: `${selectedGraf}`,
            },
        ],
    });

    const personalizedGraf = personalizationResponse.choices[0].message.content;

    return Response.json({ personalizedGraf });
}
