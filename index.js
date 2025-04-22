import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

app.post("/webhook", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: "Mensagem vazia" });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Você é um assistente financeiro sarcástico e empático. Ajude o usuário a refletir sobre seus gastos com inteligência emocional e ironia, mas sem ser cruel."
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      temperature: 0.75
    });

    const gptResponse = completion.data.choices[0].message.content;
    return res.json({ reply: gptResponse });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao gerar resposta" });
  }
});

app.get("/", (_, res) => {
  res.send("Servidor Lovable + GPT funcionando.");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
