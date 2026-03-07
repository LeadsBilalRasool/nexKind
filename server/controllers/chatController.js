// Academic keywords to filter out non-academic questions
const ACADEMIC_KEYWORDS = [
  "academic", "study", "studies", "university", "college", "school", "student",
  "assignments", "assignment", "homework", "exam", "exams", "test", "tests",
  "quiz", "course", "courses", "class", "classes", "lecture", "lectures",
  "syllabus", "grade", "grades", "gpa", "degree", "diploma", "major", "minor",
  "semester", "project", "research", "thesis", "dissertation", "scholarship",
  "scholarships", "grant", "tutor", "tutoring", "learn", "learning", "read",
  "reading", "write", "writing", "essay", "report", "presentation", "math",
  "science", "history", "literature", "english", "physics", "chemistry",
  "biology", "computer", "programming", "engineering", "art", "music",
  "geography", "economics", "business", "psychology", "sociology", "book",
  "books", "textbook", "library", "notes", "revision", "pass", "fail",
  "marks", "score", "question", "answer", "explain", "help me understand",
  "how to", "what is", "why does", "career", "job", "internship",
  "admission", "campus", "faculty", "professor", "teacher", "deadline",
  "registration", "fee", "tuition", "nexkind", "AI assistant", "hello", "hi", "hey"
];

function isAcademicQuery(text) {
  if (!text) return false;
  const s = String(text).toLowerCase();
  return ACADEMIC_KEYWORDS.some((k) => s.includes(k));
}

const handleChatMessage = async (req, res) => {
  try {
    const { messages } = req.body;
    
    // Check if the latest user message is academic
    const lastUserMessage = messages.slice().reverse().find(m => m.role === 'user');
    
    if (lastUserMessage && !isAcademicQuery(lastUserMessage.content)) {
      return res.status(200).json({
        choices: [{
          message: {
            content: "I am an academic assistant and can only answer questions related to your studies, courses, school, or related academic topics. Please ask me an academic question!"
          }
        }]
      });
    }

    // Add system prompt for academic assistant
    const systemPrompt = {
      role: "system",
      content: "You are a specialized academic and school assistant for the platform NexKind. You must ONLY answer questions related to education, studies, learning, courses, tutoring, grades, scholarships, exams, campus life, research, and general knowledge helpful for students. Keep your answers clear, concise, and helpful. If the user asks something outside of these bounds that somehow bypassed the filter, politely remind them that you can only help with academic topics."
    };

    const apiMessages = [systemPrompt, ...messages];

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ message: "OpenRouter API key is not configured on the server." });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.FRONTEND_URL || "http://localhost:5173",
        "X-Title": "NexKind Academic Assistant",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat", // Deepseek model as requested
        messages: apiMessages,
        max_tokens: 1000,
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OpenRouter API Error:', data);
      return res.status(response.status).json({ message: "Error communicating with AI service." });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Chat controller error:", error);
    res.status(500).json({ message: "Server error handling chat." });
  }
};

module.exports = { handleChatMessage };
