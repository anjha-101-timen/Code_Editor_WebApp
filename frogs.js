const Groq = require('groq-sdk');

const groq = new Groq();
async function main() {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "user",
        "content": "write a code on greet in fortran\n"
      },
      {
        "role": "assistant",
        "content": "**Fortran Program: Greeting**\n```fortran\nprogram greet\n    implicit none\n\n    ! Declare a variable to store the user's name\n    character(len=20) :: name\n\n    ! Prompt the user to enter their name\n    print *, \"Please enter your name: \"\n    read *, name\n\n    ! Print a greeting message\n    print *, \"Hello, \", trim(name), \"!\"\n\nend program greet\n```\n**Explanation:**\n\n1. The `program greet` statement begins the program.\n2. The `implicit none` statement ensures that all variables must be explicitly declared.\n3. The `character(len=20) :: name` statement declares a character variable `name` with a maximum length of 20 characters.\n4. The `print *, \"Please enter your name: \"` statement prompts the user to enter their name.\n5. The `read *, name` statement reads the user's input into the `name` variable.\n6. The `print *, \"Hello, \", trim(name), \"!\"` statement prints a greeting message, using the `trim` function to remove any leading or trailing whitespace from the `name` variable.\n7. The `end program greet` statement ends the program.\n\n**Example Use Case:**\n\n1. Save this code in a file named `greet.f90`.\n2. Compile the code using a Fortran compiler, such as `gfortran greet.f90 -o greet`.\n3. Run the program using `./greet`.\n4. When prompted, enter your name, and the program will print a greeting message.\n\n**Note:** This code uses Fortran 90/95 syntax, which is widely supported by most Fortran compilers."
      },
      {
        "role": "user",
        "content": "write hello world program in js"
      },
      {
        "role": "assistant",
        "content": "**JavaScript Program: Hello World**\n```javascript\n// Print \"Hello, World!\" to the console\nconsole.log(\"Hello, World!\");\n```\n**Explanation:**\n\n1. The `console.log()` function is used to print output to the console.\n2. The string \"Hello, World!\" is passed as an argument to the `console.log()` function.\n\n**Running the Program:**\n\n1. You can run this code in a web browser's developer console (e.g., Chrome DevTools, Firefox Developer Edition).\n2. Alternatively, you can save this code in a file with a `.js` extension (e.g., `hello.js`) and run it using Node.js: `node hello.js`.\n\n**HTML Integration (Optional):**\n\nIf you want to display \"Hello, World!\" in a web page, you can use the following HTML and JavaScript code:\n```html\n<!-- index.html -->\n<!DOCTYPE html>\n<html>\n<head>\n  <title>Hello World</title>\n</head>\n<body>\n  <h1 id=\"greeting\"></h1>\n  <script src=\"hello.js\"></script>\n</body>\n</html>\n```\n\n```javascript\n// hello.js\ndocument.getElementById(\"greeting\").innerText = \"Hello, World!\";\n```\nIn this example, the JavaScript code sets the text content of the `<h1>` element with the id \"greeting\" to \"Hello, World!\"."
      }
    ],
    "model": "llama-3.3-70b-versatile",
    "temperature": 1,
    "max_completion_tokens": 1024,
    "top_p": 1,
    "stream": true,
    "stop": null
  });

  for await (const chunk of chatCompletion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();