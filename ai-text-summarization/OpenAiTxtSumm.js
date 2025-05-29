import { OpenAI } from "openai";

// ================================ Design % Implementation =========================================
const openai = new OpenAI({
  apiKey: 'YOUR_OPENAI_API_KEY',
});

async function summarizeWithOpenAI(text) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',  // Or other: 'gpt-4' etc.
      messages: [
        { role: 'system', content: 'You are a helpful assistant that summarizes resumes.' },
        { role: 'user', content: text },
      ],
    });
    
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error summarizing with OpenAI:", error);
    return null;
  }
}

// Usage
const text = "John Doe is a software engineer with experience in JavaScript and Node.js...";
summarizeWithOpenAI(text).then(console.log);

// ================================ Testing =========================================

jest.mock("openai");

describe("summarizeWithOpenAI", () => {
  const mockResponse = {
    choices: [
      {
        message: {
          content: "This is a summary of the text.",
        },
      },
    ],
  };

  beforeEach(() => {
    OpenAI.mockImplementation(() => {
      return {
        chat: {
          completions: {
            create: jest.fn().mockResolvedValue(mockResponse),
          },
        },
      };
    });
  });

  it("should return a summary when provided with text", async () => {
    const text = "John Doe is a software engineer with experience in JavaScript and Node.js...";
    const summary = await summarizeWithOpenAI(text);
    
    expect(summary).toBe("This is a summary of the text.");
  });

  it("should handle errors gracefully", async () => {
    OpenAI.mockImplementationOnce(() => {
      return {
        chat: {
          completions: {
            create: jest.fn().mockRejectedValue(new Error("API error")),
          },
        },
      };
    });

    const summary = await summarizeWithOpenAI("Some text");
    
    expect(summary).toBeNull();
  });
});
