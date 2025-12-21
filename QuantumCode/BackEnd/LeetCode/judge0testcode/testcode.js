const json = {
  "title": "Sum of Two Numbers",
  "description": "Write a program that reads two integers from standard input and prints their sum.",
  "difficulty": "Easy",
  "tags": ["Math", "Sorting"],
  "visibleTestCases": [
    {
      "input": "5 3\n",
      "output": "8\n",
      "explanation": "The sum of 5 and 3 is 8."
    },
    {
      "input": "10 20\n",
      "output": "30\n",
      "explanation": "The sum of 10 and 20 is 30."
    }
  ],
  "hiddenTestCases": [
    {
      "input": "100 200\n",
      "output": "300\n"
    },
    {
      "input": "0 0\n",
      "output": "0\n"
    }
  ],
  "startCode": [
    {
      "language": "javascript",
      "initialCode": "// Read input and solve the problem\nconst readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nrl.on('line', (input) => {\n    const [a, b] = input.split(' ').map(Number);\n    console.log(a + b);\n    rl.close();\n});"
    },
    {
      "language": "java",
      "initialCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int a = scanner.nextInt();\n        int b = scanner.nextInt();\n        System.out.println(a + b);\n        scanner.close();\n    }\n}"
    },
    {
      "language": "c++",
      "initialCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b << endl;\n    return 0;\n}"
    }
  ],
  "referenceSolution": [
    {
      "language": "javascript",
      "completeCode": "const readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nrl.on('line', (input) => {\n    const [a, b] = input.split(' ').map(Number);\n    console.log(a + b);\n    rl.close();\n});"
    },
    {
      "language": "java",
      "completeCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int a = scanner.nextInt();\n        int b = scanner.nextInt();\n        System.out.println(a + b);\n        scanner.close();\n    }\n}"
    },
    {
      "language": "c++",
      "completeCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b << endl;\n    return 0;\n}"
    }
  ]
}


// path = localhost:3000/problem/create