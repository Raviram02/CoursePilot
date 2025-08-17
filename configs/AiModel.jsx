// AIModelConfig.js

export const AIModelConfig = {
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY, // Store API key in env variables
  model: "gemini-2.5-flash",
  api: "generateContent", // ✅ Use non-stream for simplicity
  get url() {
    return `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:${this.api}?key=${this.apiKey}`;
  },
  payloads: {
    CourseLayout: {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Generate A Course Tutorial on Following Details with field as Course Name, Description, Along with Chapter Name, about, Duration: Category: 'Programming', Topic: Python, Level:Basic, Duration:1 hours, NoOfChapters:5, in JSON format\n`,
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: `**Developing the JSON Structure**\n\nI'm currently working on structuring the JSON output for the Python course tutorial. My primary focus is on meticulously crafting the \"Chapters\" array, ensuring each chapter object includes the necessary \"Chapter Name,\" \"About,\" and \"Duration\" fields. Additionally, the course will be categorized as \"Programming\" under the topic \"Python.\"\n\n\n**Formulating Chapter Content**\n\nI've moved on to fleshing out the chapter details. Now, I'm generating content, albeit simple, for each of the five chapters. I'm aiming for concise descriptions and realistic durations that fit within the given time constraints, ensuring a solid introduction to Python basics for the tutorial example. My focus now is on creating a comprehensive yet brief overview.\n\n\n`,
            },
            {
              text: `{
  "Course Name": "Python Basics for Beginners",
  "Description": "This introductory course is designed for absolute beginners who want to learn the fundamentals of Python programming. You'll gain a solid understanding of Python's core concepts, syntax, and basic programming constructs, preparing you for more advanced topics.",
  "Category": "Programming",
  "Topic": "Python",
  "Level": "Basic",
  "Duration": "1 hour",
  "NoOfChapters": 5,
  "Chapters": [
    {
      "Chapter Name": "1. Introduction to Python",
      "about": "Learn what Python is, why it's popular, and how to set up your development environment (installing Python and an IDE). This chapter also covers your first 'Hello World!' program.",
      "Duration": "10 minutes"
    },
    {
      "Chapter Name": "2. Python Fundamentals: Variables and Data Types",
      "about": "Explore Python's basic data types such as integers, floats, strings, and booleans. Understand how to declare variables and perform basic operations on different data types.",
      "Duration": "15 minutes"
    },
    {
      "Chapter Name": "3. Control Flow: Conditionals and Loops",
      "about": "Master conditional statements (if, elif, else) to make decisions in your code. Learn about 'for' and 'while' loops to automate repetitive tasks and iterate over data.",
      "Duration": "15 minutes"
    },
    {
      "Chapter Name": "4. Functions: Building Reusable Code",
      "about": "Understand the concept of functions and why they are essential for writing organized and reusable code. Learn how to define, call, and pass arguments to functions.",
      "Duration": "10 minutes"
    },
    {
      "Chapter Name": "5. Basic Input/Output and Next Steps",
      "about": "Discover how to take input from the user and display output to the console. Conclude with a summary of learned concepts and guidance on next steps for your Python learning journey.",
      "Duration": "10 minutes"
    }
  ]
}`,
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: `INSERT_INPUT_HERE`,
            },
          ],
        },
      ],
      generationConfig: {
        thinkingConfig: {
          thinkingBudget: -1,
        },
      },
      tools: [
        {
          googleSearch: {},
        },
      ],
    },

    // 🔹 New payload for Course Content
    ChapterContent: {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Explain the concept in Detail on Topic:C++, Chapter:1. Getting Started with C++ , 
          in JSON Format with array of objects having ONLY these fields: 
          title, description, codeExample (codeExample in <precode> format if applicable, otherwise null).\n`,
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: `**Outlining C++ Fundamentals**  

I'm now outlining the "Getting Started with C++" chapter, translating the user's request into a structured JSON array. Each object will feature a title, description, and code example (using the <precode> format where needed, or null). I'm focusing on clarity and completeness for the user's specific needs, ensuring a solid foundation.  


**Constructing C++ Fundamentals**  

My initial outline for the "Getting Started with C++" chapter is coming together. I've begun populating the JSON array with sub-topics like "Introduction to C++" and "Setting up the Development Environment." Each object will feature the required title, description, and the pertinent code examples, properly formatted with <precode>. The goal is to deliver a clear and comprehensive explanation of these fundamentals.  


**Expanding C++ Subtopics**  

I've refined the initial sub-topics, now incorporating "Comments in C++" and "Basic Output with cout." The structure is sound: title, description, and <precode>-formatted examples. I'm focusing on crafting concise, clear explanations, and planning out basic "Hello, World!" and comment demonstrations. The plan is to create thorough content.  

\`\`\`tool_code
{
  "queries": [
    "C++ getting started basics"
  ]
}
\`\`\`  

**Defining Key C++ Concepts**  

I'm now formulating the content for each sub-topic, drafting descriptions and structuring the <precode> examples. I'm prioritizing clarity for the descriptions and ensuring the code examples are relevant to the explained concepts. I'm focusing on providing comprehensive and easily understandable explanations.  


**Outlining the Structure**  

I've made headway in outlining the structure. I'm focusing on defining the Introduction to C++ and laying the groundwork for Setting Up Your Development Environment. Initial search results clearly define C++ and its general use cases. I'm also finding great material on setting up a development environment, highlighting the need for editors, compilers, and IDEs.  


**Refining Section Details**  

I have a robust foundation in place. The search results confirmed each planned section is well-documented. I will create the JSON response, based on the structure and content I outlined, covering the details on the Introduction to C++, setting up your development environment, and core elements like program structure, writing, compiling, running, and commenting. I am now ready to put together a response.\n\n\n  
`,
            },
            {
              text: `[
  {
    "title": "Introduction to C++",
    "description": "C++ is a powerful, high-performance, and versatile cross-platform programming language. Developed by Bjarne Stroustrup as an extension of the C language, it offers a high level of control over system resources and memory. C++ is widely used for creating operating systems, graphical user interfaces (GUIs), embedded systems, game development, and more. It is an object-oriented programming (OOP) language, which provides a clear structure to programs and promotes code reusability, thereby reducing development costs.",
    "codeExample": null
  },
  {
    "title": "Setting Up Your Development Environment",
    "description": "To write, compile, and run C++ programs on your computer, you need a development environment. This typically consists of two main components: a text editor (or code editor) to write your C++ code and a compiler to translate your human-readable C++ code into machine-readable code (executable programs). Alternatively, an Integrated Development Environment (IDE) combines these tools into a single application, often including additional features like debugging. Popular IDE options for C++ include Visual Studio Code, Code::Blocks, Eclipse, and Visual Studio. Common compilers include GCC (for Linux, MinGW for Windows) and Clang (often with Xcode for macOS).",
    "codeExample": null
  },
  {
    "title": "Basic C++ Program Structure",
    "description": "A fundamental C++ program typically includes several key components. The #include directive is a preprocessor command that tells the compiler to include the contents of a specified header file, such as <iostream> for input/output operations. The using namespace std; line is commonly used to avoid repeatedly typing std:: before elements of the standard library like cout. Every C++ program must have a main() function, which serves as the entry point for program execution. The code within the main() function is enclosed in curly braces {}. Statements within C++ programs usually end with a semicolon ;.",
    "codeExample": "<precode>#include &lt;iostream&gt;\n\nusing namespace std;\n\nint main() {\n    // Program logic goes here\n    return 0;\n}</precode>"
  },
  {
    "title": "Writing, Compiling, and Running Your First Program",
    "description": "The traditional first program for learning a new language is the 'Hello, World!' program. To create it, you'll write the C++ code in a text editor or IDE, save it with a .cpp extension (e.g., hello.cpp), then use a compiler to translate it into an executable file. Finally, you run the executable to see the output.",
    "codeExample": "<precode>#include &lt;iostream&gt;\n\nint main() {\n    std::cout &lt;&lt; \"Hello, World!\";\n    return 0;\n}</precode>"
  },
  {
    "title": "Comments in C++",
    "description": "Comments are explanatory statements within the code that the C++ compiler ignores. They are crucial for documenting code, enhancing readability, and aiding developers in understanding the program logic. C++ supports two types of comments: single-line and multi-line.\n\nSingle-line comments begin with two forward slashes (//). Any text from // to the end of that line is considered a comment.\n\nMulti-line comments, also known as block comments or C-style comments, start with /* and end with */. Any text between these delimiters, spanning multiple lines, is treated as a comment.",
    "codeExample": "<precode>// This is a single-line comment.\n\n/*\nThis is a multi-line comment.\nIt can span several lines.\n*/\n\n#include &lt;iostream&gt;\n\nint main() {\n    std::cout &lt;&lt; \"Hello, World!\"; // This is a comment next to a statement\n    return 0;\n}</precode>"
  },
  {
    "title": "Basic Output with cout",
    "description": "In C++, the cout object (short for 'character output' or 'console output') is used to display output to the standard output device, typically the computer screen. It is part of the iostream header file and is an object of the ostream class.\n\nThe << symbol is known as the stream insertion operator. It is used with cout to 'insert' data into the output stream, which then gets displayed on the console. You can print strings, numbers, or variables. To move the cursor to the next line after printing, you can use \\n or endl.",
    "codeExample": "<precode>#include &lt;iostream&gt;\n\nint main() {\n    std::cout &lt;&lt; \"Hello\";\n    std::cout &lt;&lt; \" World!\";\n    std::cout &lt;&lt; \"\\n\";\n    std::cout &lt;&lt; \"This is a new line.\";\n    std::cout &lt;&lt; std::endl;\n\n    int number = 10;\n    std::cout &lt;&lt; \"The number is: \" &lt;&lt; number &lt;&lt; std::endl;\n\n    return 0;\n}</precode>"
  }
]`,
            },
          ],
        },
        {
          role: "user",
          parts: [{ text: `INSERT_INPUT_HERE` }],
        },
      ],
      generationConfig: {
        thinkingConfig: { thinkingBudget: -1 },
      },
      tools: [{ googleSearch: {} }],
    },
  },
};

// Function For Course Layout
export const GenerateCourseLayout_AI = {
  async sendMessage(userPrompt) {
    const payload = JSON.parse(
      JSON.stringify(AIModelConfig.payloads.CourseLayout)
    );
    payload.contents[payload.contents.length - 1].parts[0].text = userPrompt;

    const response = await fetch(AIModelConfig.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    return {
      response: {
        text: () => data.candidates?.[0]?.content?.parts?.[0]?.text || "",
      },
    };
  },
};

// Function For Course Content
export const GenerateChapterContent_AI = {
  async sendMessage(chapterPrompt) {
    const payload = JSON.parse(
      JSON.stringify(AIModelConfig.payloads.ChapterContent)
    );
    payload.contents[payload.contents.length - 1].parts[0].text = chapterPrompt;

    const response = await fetch(AIModelConfig.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    return {
      response: {
        text: () => data.candidates?.[0]?.content?.parts?.[0]?.text || "",
      },
    };
  },
};
