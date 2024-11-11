import { Handler } from '@netlify/functions';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { childrenAge, numberOfChildren, theme, spaceDetails } = JSON.parse(event.body || '{}');

    const prompt = `Create an engaging treasure hunt story and riddles for children.
Details:
- Age of children: ${childrenAge} years
- Number of children: ${numberOfChildren}
- Theme: ${theme}
- Available spaces: ${spaceDetails}

Please provide:
1. An engaging introduction story (3-4 sentences)
2. 3-5 age-appropriate riddles that lead to different locations
3. A brief conclusion
4. Setup instructions for parents

Make the story and riddles specifically tailored to the theme and age group. For younger children (under 7), use simpler language and more direct clues. For older children, include more complex riddles and story elements.`;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are an expert at creating engaging, age-appropriate treasure hunts for children. Your stories are creative and your riddles are clever but solvable."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        story: completion.data.choices[0]?.message?.content || ''
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate story' })
    };
  }
};

export { handler };