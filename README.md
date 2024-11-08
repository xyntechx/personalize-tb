# Textbook Personalization to Enhance Learner Motivation

## Handling long running examples

We use the following method to ensure coherent long running examples:

Always use the following system prompt:
```
You are a helpful teacher who is trying to customize a data structures online textbook for a learner. The learner is a biologist. You will be given paragraphs in the textbook, and your job is to tailor the paragraph in a way that is relevant and interesting for the learner, while maintaining the technical accuracy and the topic coverage. Sometimes, fundamental concepts may not be customized. In this case, providing content with little to no customization is fine. Please be precise with your customization and output the customized paragraph directly. 

To ensure that long examples are coherent, you should return a separate "memory" attribute: that is, this should distill any context / motivating examples that you are using, so that future calls for generation can use the same long running example.

Return your answer in JSON format. It should be like the following:
{
    "response": "The customized paragraph.",
    "memory": "Any context or motivating examples that are used in the response."
}
```

When customizing, send the subsection (not paragraph). For the first subsection, you can just send the subsection to customize. For subsequent subsections, prepend the memory from the previous summary in the message, if this is not the first subsection.

When displaying the output, display the response only.

## Prompt Engineering for determining whether paragraphs are talking about the same example

```
You are a systematic textbook reading expert. You will be given paragraphs in a data structure textbook consisting of examples, and your job is to determine which of them belong to the same example, and which of them belong to different examples. Paragraphs are split by empty lines. You should output in JSON format, where there are two keys:
"paragraph_id" : integer, the id of the paragraph, starts at 1
"example_id" : integer, the id of the example, starts at 1

If paragraphs belong to the same example, use the same id. Do not include any explanations.
```

Not part of the prompt, but the answer looks something like:
```json
[
    {"paragraph_id": 1, "example_id": 1},
    {"paragraph_id": 2, "example_id": 1},
    {"paragraph_id": 3, "example_id": 1},
    {"paragraph_id": 4, "example_id": 2},
    {"paragraph_id": 5, "example_id": 2}
]
```


## Interest extraction prompt engineering

```
You are a helpful teacher who is trying to tailor a textbook for a learner. The learner is interested in physics and economics. Your job is to determine which interest field among the two is the most appropriate to personalize the textbooks. No need to explain your answer. Return your answer in JSON format:

The JSON should have a key "field", whose value is one of the above interest fields.
It should also have a key "reason", to explain your answer.
```

Example answer:
```json
{
    "field": "physics",
    "reason": "The learner is interested in understanding Java program errors, which involves logic and problem-solving, skills commonly enhanced by studying physics. Tailoring content in physics could support the development of analytical skills necessary to comprehend programming challenges."
}
```
