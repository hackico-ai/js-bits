import nlp from 'compromise';

// ================================ Design % Implementation =========================================
function summarizeWithCompromise(text) {
  try {
    const doc = nlp(text);
    const summary = doc.sentences().toNegative().out('text');
    return summary;
  } catch (error) {
    console.error("Error summarizing with Compromise:", error);
    return null;
  }
}

// Usage
const text = "John Doe is an experienced software engineer skilled in JavaScript, Node.js, and React...";
console.log(summarizeWithCompromise(text));

// ================================ Testing =========================================

jest.mock('compromise');

describe('summarizeWithCompromise', () => {
  const mockSummary = "This is a negative summary of the text.";

  beforeEach(() => {
    nlp.mockImplementation(() => {
      return {
        sentences: jest.fn().mockReturnValue({
          toNegative: jest.fn().mockReturnValue({
            out: jest.fn().mockReturnValue(mockSummary),
          }),
        }),
      };
    });
  });

  it('should return a summary when provided with text', () => {
    const text = "John Doe is an experienced software engineer skilled in JavaScript, Node.js, and React...";
    const summary = summarizeWithCompromise(text);
    expect(summary).toBe(mockSummary);
  });

  it('should handle errors gracefully', () => {
    nlp.mockImplementationOnce(() => {
      throw new Error("NLP processing error");
    });

    const summary = summarizeWithCompromise("Some text");
    expect(summary).toBeNull();
  });
});
