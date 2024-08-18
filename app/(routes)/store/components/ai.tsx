
interface Pantry {
    id: string;
    name: string;
    date: string;
    quantity: number;
    category: string;
  }

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  export async function generateRecipeSuggestions(pantries:Pantry[], location:any) {
    try {
        const history = [
          { role: 'user', content: `Suggest recipes based on the following ingredients: ${pantries.map(pantry => pantry.name).join(', ')} and user location: ${location}.` }
        ];
    
        const chatSession = model.startChat({
          generationConfig,
          history,
        });
  
      const response = await chatSession.send({
        text: "Please provide the recipe suggestions.",
      });
  
      return response.output;
    } catch (error) {
      console.error("Error generating recipes: ", error);
      throw new Error("Failed to generate recipe suggestions");
    }
  }