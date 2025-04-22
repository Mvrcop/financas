import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/webhook", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: "Mensagem vazia" });
  }

  try {
   const completion = {
  data: {
    choices: [
      {
        message: {
          content: `🧠 Simulação GPT: Você disse "${userMessage}". E eu, como um assistente financeiro sarcástico, diria: talvez cortar o cafezinho não resolva sua vida financeira, mas é um começo dramático.`,
        },
      },
    ],
  },
};

    const gptResponse = completion?.choices?.[0]?.message?.content || "Erro: resposta vazia ou inesperada da OpenAI.";
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
  console.log("Resposta bruta da OpenAI:", completion);
});
