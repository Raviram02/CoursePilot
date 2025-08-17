// AIModelConfig.js

export const AIModelConfig = {
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY, // Store API key in env variables
  model: "gemini-2.5-flash",
  api: "generateContent", // ✅ Use non-stream for simplicity
  get url() {
    return `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:${this.api}?key=${this.apiKey}`;
  },

  // 🔹 Multiple payloads supported
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
              text: `**Developing the JSON Structure**\n\nI'm currently working on structuring the JSON output for the Python course tutorial. My primary focus is on meticulously crafting the "Chapters" array...`,
            },
            {
              text: `{
  "Course Name": "Python Basics for Beginners",
  "Description": "This introductory course is designed for absolute beginners...",
  "Category": "Programming",
  "Topic": "Python",
  "Level": "Basic",
  "Duration": "1 hour",
  "NoOfChapters": 5,
  "Chapters": [
    {
      "Chapter Name": "1. Introduction to Python",
      "about": "Learn what Python is...",
      "Duration": "10 minutes"
    }
  ]
}`,
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

    // 🔹 New payload for Course Content
    CourseContent: {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Explain the concept in Detail on Topic:C++, Chapter:1. Getting Started with C++, in JSON Format with list of array with field as title, description in detail, Code Example(Code field in <precode> format) if applicable\n`,
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: `**Developing C++ Outline**\n\nI'm currently structuring a JSON outline for "Getting Started with C++," focusing on clear explanations and practical code examples...`,
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

// ✅ For Course Layout
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

// ✅ For Course Content
export const GenerateCourseContent_AI = {
  async sendMessage(chapterPrompt) {
    const payload = JSON.parse(
      JSON.stringify(AIModelConfig.payloads.CourseContent)
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


const courseContent = {
  contents: [
    {
      role: "user",
      parts: [
        {
          text: `Explain the concept in Detail on Topic:C++, Chapter:1. Getting Started with C++ , 
          in JSON Format with array of objects having ONLY these fields: 
          title, description, codeExample (codeExample in <precode> format if applicable, otherwise null).`
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `Outlining C++ Fundamentals: I'm now outlining the "Getting Started with C++" chapter, 
translating the user's request into a structured JSON array. Each object will feature a title, description, 
and code example (using the <precode> format where needed, or null). I'm focusing on clarity and completeness 
for the user's specific needs, ensuring a solid foundation.`
        },
        {
          text: ````json
[
  {
    "title": "Introduction to C++",
    "description": "C++ is a powerful, high-performance, and versatile cross-platform programming language. Developed by Bjarne Stroustrup as an extension of the C language, it offers a high level of control over system resources and memory. C++ is widely used for creating operating systems, graphical user interfaces (GUIs), embedded systems, game development, and more. It is an object-oriented programming (OOP) language, which provides a clear structure to programs and promotes code reusability, thereby reducing development costs. [8, 19]",
    "codeExample": null
  },
  {
    "title": "Setting Up Your Development Environment",
    "description": "To write, compile, and run C++ programs on your computer, you need a development environment. This typically consists of two main components: a text editor (or code editor) to write your C++ code and a compiler to translate your human-readable C++ code into machine-readable code (executable programs). Alternatively, an Integrated Development Environment (IDE) combines these tools into a single application, often including additional features like debugging. Popular IDE options for C++ include Visual Studio Code, Code::Blocks, Eclipse, and Visual Studio. Common compilers include GCC (for Linux, MinGW for Windows) and Clang (often with Xcode for macOS). [8, 13]",
    "codeExample": null
  },
  {
    "title": "Basic C++ Program Structure",
    "description": "A fundamental C++ program typically includes several key components. The `#include` directive is a preprocessor command that tells the compiler to include the contents of a specified header file, such as `<iostream>` for input/output operations. [10, 14] The `using namespace std;` line is commonly used to avoid repeatedly typing `std::` before elements of the standard library like `cout`. [4, 5, 10] Every C++ program must have a `main()` function, which serves as the entry point for program execution. [10, 12, 14] The code within the `main()` function is enclosed in curly braces `{}`. [10, 14] Statements within C++ programs usually end with a semicolon `;`. [14]",
    "codeExample": "<precode>#include &lt;iostream&gt; // Includes the input/output stream library\n\nusing namespace std; // Allows direct use of standard library elements (e.g., cout)\n\nint main() { // The main function where program execution begins\n    // Program logic goes here\n    return 0; // Indicates successful program termination\n}</precode>"
  },
  {
    "title": "Writing, Compiling, and Running Your First Program",
    "description": "The traditional first program for learning a new language is the 'Hello, World!' program. To create it, you'll write the C++ code in a text editor or IDE, save it with a `.cpp` extension (e.g., `hello.cpp`), then use a compiler to translate it into an executable file. Finally, you run the executable to see the output. [8, 10, 13]",
    "codeExample": "<precode>#include &lt;iostream&gt;\n\nint main() {\n    std::cout &lt;&lt; \\\"Hello, World!\\\"; // Prints 'Hello, World!' to the console\n    return 0;\n}</precode>"
  },
  {
    "title": "Comments in C++",
    "description": "Comments are explanatory statements within the code that the C++ compiler ignores. They are crucial for documenting code, enhancing readability, and aiding developers in understanding the program logic. C++ supports two types of comments: single-line and multi-line. [1, 3, 6, 9]\n\nSingle-line comments begin with two forward slashes (`//`). Any text from `//` to the end of that line is considered a comment. [1, 2, 9]\n\nMulti-line comments, also known as block comments or C-style comments, start with `/*` and end with `*/`. Any text between these delimiters, spanning multiple lines, is treated as a comment. [1, 2, 3, 9]",
    "codeExample": "<precode>// This is a single-line comment.\n\n/*\nThis is a multi-line comment.\nIt can span several lines.\n*/\n\n#include &lt;iostream&gt;\n\nint main() {\n    std::cout &lt;&lt; \\\"Hello, World!\\\"; // This is a comment next to a statement\n    /*\n    std::cout &lt;&lt; \\\"This line is commented out\\\";\n    */\n    return 0;\n}</precode>"
  },
  {
    "title": "Basic Output with `cout`",
    "description": "In C++, the `cout` object (short for 'character output' or 'console output') is used to display output to the standard output device, typically the computer screen. [4, 15, 18] It is part of the `iostream` header file and is an object of the `ostream` class. [15, 18]\n\nThe `&lt;&lt;` symbol is known as the stream insertion operator. It is used with `cout` to 'insert' data into the output stream, which then gets displayed on the console. [4, 7, 11, 18] You can print strings (text enclosed in double quotes), numbers, or variables. To move the cursor to the next line after printing, you can use `\\\\n` (newline character) or `endl` (end line manipulator), both of which achieve a similar effect. [7]",
    "codeExample": "<precode>#include &lt;iostream&gt;\n\nint main() {\n    std::cout &lt;&lt; \\\"Hello\\\"; // Prints \\\"Hello\\\"\n    std::cout &lt;&lt; \\\" World!\\\"; // Prints \\\" World!\\\" on the same line\n    std::cout &lt;&lt; \\\"\\\\n\\\"; // Inserts a newline character\n    std::cout &lt;&lt; \\\"This is a new line.\\\"; // Prints on the new line\n    std::cout &lt;&lt; std::endl; // Inserts a newline and flushes the buffer\n\n    int number = 10;\n    std::cout &lt;&lt; \\\"The number is: \\\" &lt;&lt; number &lt;&lt; std::endl; // Combining text and variable\n\n    return 0;\n}</precode>"
  }
]````
        }
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
};
