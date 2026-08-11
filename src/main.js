import { Mistral } from '@mistralai/mistralai';

const client = new Mistral({ apiKey: "XOMEAAAiUCA47FMM3HdWbIhuuEYIqCFN" });

const response = await client.chat.complete({
  model: 'mistral-large-latest',
  messages: [
    { role: 'user', content: 'What is Mistral AI?' }
  ],
});

console.log(response.choices[0].message.content);
