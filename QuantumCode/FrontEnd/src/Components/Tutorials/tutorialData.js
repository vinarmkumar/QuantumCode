export const tutorialData = {
  python: {
    title: 'Python Tutorials',
    description: 'Master Python from basics to advanced concepts',
    color: '#3776ab',
    icon: '🐍',
    sections: [
      {
        id: 'python-intro',
        title: 'Python Introduction',
        topics: [
          {
            title: 'What is Python?',
            content: `Python is a high-level, interpreted programming language that prioritizes code readability and simplicity. Created by Guido van Rossum in 1991, Python has become one of the most popular programming languages in the world.

## What Makes Python Special?

Python is designed to be:
• Easy to Learn - Simple syntax that resembles natural English
• Powerful - Can handle complex tasks and large-scale applications
• Versatile - Works across web, data science, AI, automation, and more
• Community-Driven - Large ecosystem with countless libraries and frameworks

## Key Characteristics

**Dynamic Typing**
You don't need to declare variable types. Python figures them out automatically:
\`\`\`python
x = 10              # Integer
x = "Hello"         # String (same variable, different type)
x = 3.14            # Float
# No type declarations needed!
\`\`\`

**Interpreted Language**
Python code is executed line-by-line by an interpreter, making it easy to test and debug:
• No compilation step needed
• Instant feedback during development
• Easy to debug errors

**Multiple Paradigms**
Python supports multiple programming styles:
• Procedural programming - Step-by-step instructions
• Object-oriented programming - Organizing code with classes
• Functional programming - Using functions as first-class objects

## Python's Philosophy: "The Zen of Python"

When you run \`import this\` in Python, you see:
• Beautiful is better than ugly
• Explicit is better than implicit
• Simple is better than complex
• Complex is better than complicated
• Readability counts
• Code is read much more often than it is written

## Why Companies Use Python

**Tech Giants:**
• Google - For system administration and testing
• Netflix - Data analysis and machine learning
• Instagram - Web backend development
• Spotify - Data analytics and recommendations
• Facebook - Infrastructure and tools

**Industries:**
• Data Science & AI - Primary language for ML/AI development
• Web Development - Frameworks like Django, Flask
• Finance - Algorithmic trading and financial analysis
• Scientific Research - Computing and simulations
• Automation - Scripting and task automation

## Python Versions: Python 2 vs Python 3

**Python 2** (Deprecated since 2020)
• Legacy version, no longer supported
• Many libraries have moved to Python 3
• You should NOT use this

**Python 3** (Current Standard)
• Modern features and improvements
• Better Unicode support
• All new libraries support Python 3
• Always use Python 3 for new projects

## Your Python Journey

This tutorial will guide you through:
1. Setting up Python and your development environment
2. Learning basic syntax and data types
3. Understanding control flow and functions
4. Exploring data structures and algorithms
5. Mastering object-oriented programming
6. Building real-world applications

By the end, you'll be able to write clean, efficient Python code and understand how to solve real problems with Python.`
          },
          {
            title: 'Setting Up Python',
            content: `Getting Python installed and ready to use is quick and easy. Let me walk you through the process step by step.

## Step 1: Download Python

Visit https://www.python.org/downloads/ and:
1. Click the download button
2. Choose Python 3.x (latest stable version)
3. Download the installer for your operating system:
   - Windows: .exe file
   - macOS: .pkg file
   - Linux: Usually comes pre-installed, or use package manager

## Step 2: Install Python

**On Windows:**
1. Run the downloaded .exe file
2. Check the box "Add Python to PATH" (Important!)
3. Click "Install Now"
4. Wait for installation to complete
5. You may see "Disable path length limit" - click it

**On macOS:**
1. Open the downloaded .pkg file
2. Follow the installation wizard
3. Enter your password when prompted
4. Finish installation

**On Linux:**
Open terminal and run:
\`\`\`bash
sudo apt update
sudo apt install python3 python3-pip   # Ubuntu/Debian
sudo yum install python3 python3-pip    # CentOS/RHEL
brew install python3                    # macOS with Homebrew
\`\`\`

## Step 3: Verify Installation

Open your terminal or command prompt and type:
\`\`\`
python --version
python -m pip --version
\`\`\`

You should see output like:
\`\`\`
Python 3.11.0
pip 22.0.1 from /path/to/pip (python 3.11)
\`\`\`

If not, check that Python is in your PATH.

## Step 4: Choose Your Editor

**For Beginners: Thonny**
- Simplest option
- Built-in Python interpreter
- Download from thonny.org
- Great for learning

**For Web Development: VS Code**
- Lightweight and fast
- Install Python extension
- Huge community and resources
- Download from code.visualstudio.com

**For Data Science: Jupyter Notebook**
- Interactive notebooks
- Great for learning and experimentation
- Install with: \`pip install jupyter\`
- Run with: \`jupyter notebook\`

**For Professional Development: PyCharm**
- Full-featured IDE
- Free Community Edition
- Many advanced features
- Download from jetbrains.com

## Step 5: Test Your Setup

Create a file named \`hello.py\` with:
\`\`\`python
print("Hello, Python!")
name = input("What's your name? ")
print(f"Nice to meet you, {name}!")
\`\`\`

Run it with:
\`\`\`
python hello.py
\`\`\`

You should see your greeting! Congratulations, Python is working!

## Common Issues and Solutions

**"python: command not found"**
- Python is not in your PATH
- Reinstall and check "Add Python to PATH"
- Try \`python3\` instead of \`python\`

**"pip: command not found"**
- Python wasn't installed with pip
- Reinstall Python and select pip during installation
- Try \`python -m pip install package_name\`

**Editor Issues**
- Restart the editor after installing Python
- Make sure Python is in your system PATH
- Check editor settings for Python interpreter path`
          },
          {
            title: 'Your First Python Program',
            content: `Now that you have Python installed, let's write your first program! Don't worry, it will be simple but exciting.

## The Classic "Hello, World!"

The traditional first program prints text to the screen:

\`\`\`python
print("Hello, World!")
\`\`\`

That's it! Save this in a file called \`hello.py\` and run:
\`\`\`
python hello.py
\`\`\`

Output:
\`\`\`
Hello, World!
\`\`\`

## Breaking It Down

**\`print()\`** is a function that:
- Displays text on your screen
- Takes the text inside parentheses
- Automatically adds a new line at the end

**String (Text)**
- Text is wrapped in quotes: "Hello, World!"
- Single quotes or double quotes both work

## Your First Interactive Program

Let's make something more interesting:

\`\`\`python
# Get input from user
name = input("What is your name? ")
age = input("How old are you? ")

# Display the information
print("Your name is:", name)
print("You are", age, "years old")

# Formatted output (more elegant)
print(f"Hello {name}, you are {age} years old!")
\`\`\`

When you run this:
\`\`\`
What is your name? Alice
How old are you? 25
Your name is: Alice
You are 25 years old
Hello Alice, you are 25 years old!
\`\`\`

## Understanding Variables

\`\`\`python
# Variables store data
name = "Alice"           # String variable
age = 25                 # Integer variable
height = 5.8             # Float variable (decimal)
is_student = True        # Boolean variable (True/False)

# You can use variables in operations
birth_year = 2025 - age
print(f"{name} was born around {birth_year}")
\`\`\`

## Comments

Comments explain your code (computers ignore them):

\`\`\`python
# This is a single-line comment

# Multi-line comments
# are useful for longer explanations
# especially at the top of files

"""
This is a multi-line string
that can also be used as a comment
"""
\`\`\`

## Common Beginner Mistakes

**Mistake 1: Forgetting quotes around text**
\`\`\`python
# Wrong
print(Hello)          # ❌ Error!

# Right
print("Hello")        # ✅ Works
\`\`\`

**Mistake 2: Using wrong quote type**
\`\`\`python
# Wrong
print("Hello World')   # ❌ Mismatched quotes!

# Right
print("Hello World")   # ✅ Works
\`\`\`

**Mistake 3: Spelling mistakes**
\`\`\`python
# Wrong
Print("Hello")        # ❌ Capital P (Python is case-sensitive)

# Right
print("Hello")        # ✅ Lowercase p
\`\`\`

## Running Your Code

Three ways to run Python code:

**1. Direct File Execution**
\`\`\`bash
python filename.py
\`\`\`

**2. Interactive Shell**
\`\`\`bash
python
>>> print("Hello!")
>>> name = "Alice"
>>> exit()
\`\`\`

**3. IDE Built-in (VS Code, PyCharm, etc.)**
- Write your code
- Click the "Run" button
- See output in console

## What You Learned

✓ How to write and run Python programs
✓ Using the print() function
✓ Creating and using variables
✓ Getting input from users
✓ Writing comments
✓ Common mistakes to avoid

Next, let's dive into Python basics and learn about different data types!`
          }
        ]
      },
      {
        id: 'python-basics',
        title: 'Python Basics',
        topics: [
          {
            title: 'Data Types and Variables',
            content: `Python has several basic data types that you need to understand. These are the building blocks for all Python programs.

## What are Data Types?

Data types define what kind of value a variable holds. Different types are used for different purposes:

\`\`\`python
age = 25              # Number
name = "Alice"        # Text
height = 5.8          # Decimal number
is_student = True     # True or False
\`\`\`

## Numbers: Integers (int)

Integers are whole numbers (no decimal point):

\`\`\`python
# Positive integers
students = 30
year = 2025

# Negative integers
temperature = -5
debt = -1000

# Zero
empty = 0

# Basic math with integers
total = 10 + 20         # Addition
difference = 50 - 15    # Subtraction
product = 4 * 5         # Multiplication
quotient = 20 // 3      # Integer division (result: 6)
remainder = 20 % 3      # Modulo (result: 2)
power = 2 ** 3          # Exponentiation (result: 8)

print(quotient)  # 6
print(remainder) # 2
print(power)     # 8
\`\`\`

## Numbers: Floats (float)

Floats are decimal numbers:

\`\`\`python
# Decimal numbers
pi = 3.14159
temperature = 98.6
price = 19.99

# Float division always gives decimal result
result = 7 / 2        # Result: 3.5
result = 10 / 3       # Result: 3.333...

# Mixing integers and floats
total = 10 + 3.5      # Result: 13.5 (becomes float)

# Converting between types
num_str = "25"
num_int = int(num_str)        # Convert string to int: 25
num_float = float(num_int)    # Convert int to float: 25.0
back_to_str = str(num_float)  # Convert to string: "25.0"
\`\`\`

## Strings (str)

Strings are sequences of characters (text):

\`\`\`python
# Creating strings
message = "Hello, World!"
name = 'Alice'
sentence = """This is a
multi-line
string"""

# String concatenation (joining)
greeting = "Hello" + " " + "World"
print(greeting)  # Hello World

# String repetition
stars = "*" * 10
print(stars)     # **********

# String length
text = "Python"
length = len(text)
print(length)    # 6

# Accessing characters
word = "Python"
first_letter = word[0]      # "P"
last_letter = word[-1]      # "n"
middle = word[1:4]          # "yth"

# String methods
text = "hello world"
text.upper()              # "HELLO WORLD"
text.capitalize()         # "Hello world"
text.replace("world", "Python")  # "hello Python"
\`\`\`

## Booleans (bool)

Booleans are True or False values:

\`\`\`python
# Direct boolean values
is_raining = True
is_sunny = False

# Booleans from comparisons
age = 25
is_adult = age >= 18    # True
is_child = age < 13     # False

# Logical operations
a = True
b = False

result = a and b        # False (both must be True)
result = a or b         # True (at least one is True)
result = not a          # False (opposite of True)

# Booleans in conditions
if is_adult:
    print("You can vote")
\`\`\`

## Type Checking and Conversion

\`\`\`python
# Check the type
print(type(25))          # <class 'int'>
print(type(3.14))        # <class 'float'>
print(type("Hello"))     # <class 'str'>
print(type(True))        # <class 'bool'>

# Convert between types
# String to number
num = int("42")          # 42
decimal = float("3.14")  # 3.14

# Number to string
text = str(100)          # "100"

# Any to boolean
bool(0)                  # False
bool(1)                  # True
bool("")                 # False
bool("hello")            # True
bool([])                 # False
bool([1, 2, 3])          # True
\`\`\`

## Special Value: None

\`\`\`python
# None means no value
result = None

# Used to indicate absence of value
def get_value():
    if something_wrong:
        return None     # Return nothing
    return "value"

# Check for None
if result is None:
    print("No value found")
\`\`\`

## Naming Variables (Best Practices)

\`\`\`python
# Good names (clear and descriptive)
student_name = "Alice"
total_price = 29.99
is_active = True
max_attempts = 3

# Bad names (unclear)
x = "Alice"             # What is x?
tp = 29.99              # What is tp?
a = True                # What is a?

# Rules
# ✓ Start with letter or underscore
# ✓ Can contain letters, numbers, underscores
# ✓ Case-sensitive (name ≠ Name)
# ✓ Cannot be reserved keywords (if, for, while, etc.)

# Common naming conventions
student_age           # snake_case (preferred in Python)
StudentAge            # PascalCase (for classes)
CONSTANT_VALUE = 100  # UPPERCASE (for constants)
_private_var          # Leading underscore (convention for private)
\`\`\`

## Summary

| Type | Example | Description |
|------|---------|-------------|
| int | 42, -5 | Whole numbers |
| float | 3.14, -0.5 | Decimal numbers |
| str | "Hello" | Text strings |
| bool | True, False | True or False |
| None | None | No value |

Now you understand Python's basic data types! Next, let's learn about operations and how to work with these types.`
          },
          {
            title: 'Operators and Expressions',
            content: `Operators are symbols that perform operations on variables and values. Understanding them is crucial for writing Python programs.

## Arithmetic Operators

These perform mathematical calculations:

\`\`\`python
a = 10
b = 3

# Addition
print(a + b)      # 13

# Subtraction
print(a - b)      # 7

# Multiplication
print(a * b)      # 30

# Division (always gives float)
print(a / b)      # 3.333...

# Floor Division (rounds down)
print(a // b)     # 3

# Modulo (remainder)
print(a % b)      # 1
print(10 % 3)     # 1
print(10 % 5)     # 0

# Exponentiation (power)
print(2 ** 3)     # 8 (2 to the power of 3)
print(4 ** 0.5)   # 2.0 (square root)
\`\`\`

## Comparison Operators

These compare two values and return True or False:

\`\`\`python
a = 10
b = 5

# Equal to
print(a == b)     # False

# Not equal to
print(a != b)     # True

# Greater than
print(a > b)      # True

# Less than
print(a < b)      # False

# Greater than or equal to
print(a >= b)     # True

# Less than or equal to
print(a <= b)     # False

# Real-world examples
age = 25
print(age >= 18)          # True (can vote)
print(age < 21)           # True (can't drink legally in US)

password = "secret123"
print(password == "secret123")  # True
print(len(password) >= 8)       # True
\`\`\`

## Logical Operators

These combine multiple conditions:

\`\`\`python
a = True
b = False

# AND operator (both must be True)
print(a and b)            # False
print(a and a)            # True

# Real-world AND
age = 25
has_license = True
can_drive = age >= 18 and has_license     # True

# OR operator (at least one must be True)
print(a or b)             # True
print(b or b)             # False

# Real-world OR
is_weekend = True
is_holiday = False
day_off = is_weekend or is_holiday        # True

# NOT operator (reverses the value)
print(not a)              # False
print(not b)              # True

# Complex conditions
age = 25
income = 50000
credit_score = 750

approved = (age >= 21) and (income >= 30000) or (credit_score >= 700)
print(approved)           # True
\`\`\`

## Assignment Operators

These assign or modify values:

\`\`\`python
x = 10              # Simple assignment

# Assignment with operation
x += 5              # x = x + 5 → x = 15
x -= 3              # x = x - 3 → x = 12
x *= 2              # x = x * 2 → x = 24
x /= 4              # x = x / 4 → x = 6.0
x //= 2             # x = x // 2 → x = 3.0
x %= 2              # x = x % 2 → x = 1.0
x **= 2             # x = x ** 2 → x = 1.0

# String assignment operators
text = "Hello"
text += " World"    # text = text + " World" → "Hello World"
text *= 2           # text = text * 2 → "Hello WorldHello World"
\`\`\`

## Membership Operators

These check if a value exists in a sequence:

\`\`\`python
# With strings
text = "Hello World"
print("H" in text)        # True
print("xyz" in text)      # False
print("o" not in text)    # False

# With lists
numbers = [1, 2, 3, 4, 5]
print(3 in numbers)       # True
print(10 in numbers)      # False
print(1 not in numbers)   # False

# With dictionaries
person = {"name": "Alice", "age": 25}
print("name" in person)   # True
print("email" in person)  # False
\`\`\`

## Operator Precedence (Order of Operations)

Python follows the same order as mathematics:

\`\`\`python
# PEMDAS/BODMAS
# Parentheses/Brackets
# Exponents/Orders
# Multiplication and Division (left to right)
# Addition and Subtraction (left to right)

print(2 + 3 * 4)        # 14 (not 20!) - multiplication first
print((2 + 3) * 4)      # 20 - parentheses first

print(10 - 5 - 2)       # 3 (left to right: (10-5)-2)

print(2 ** 3 ** 2)      # 512 (right to left: 2**(3**2))
\`\`\`

## Practical Examples

**Calculate BMI (Body Mass Index)**
\`\`\`python
weight = 70          # kg
height = 1.75        # meters

bmi = weight / (height ** 2)
print(f"BMI: {bmi:.1f}")    # BMI: 22.9

if bmi < 18.5:
    category = "Underweight"
elif bmi < 25:
    category = "Normal weight"
elif bmi < 30:
    category = "Overweight"
else:
    category = "Obese"

print(category)      # Normal weight
\`\`\`

**Validate User Input**
\`\`\`python
age = int(input("Enter your age: "))
income = int(input("Enter your income: "))

# Check eligibility
eligible = (age >= 21) and (income >= 25000)

if eligible:
    print("✓ You are eligible for the loan")
else:
    print("✗ You don't meet the requirements")
\`\`\`

**Grade Calculation**
\`\`\`python
math_score = 85
english_score = 92
science_score = 88

average = (math_score + english_score + science_score) / 3

if average >= 90:
    grade = "A"
elif average >= 80:
    grade = "B"
elif average >= 70:
    grade = "C"
else:
    grade = "F"

print(f"Average: {average:.1f}, Grade: {grade}")
\`\`\``
          }
        ]
      },
      {
        id: 'python-control-flow',
        title: 'Control Flow',
        topics: [
          {
            title: 'If-Else Statements',
            content: `Control flow statements allow your program to make decisions and execute different code based on conditions.

## What is a Conditional Statement?

A conditional statement lets your program choose what to do based on a condition:

\`\`\`python
age = 18

# If the condition is True, execute the code block
if age >= 18:
    print("You are an adult")
\`\`\`

## The if Statement

The simplest form of conditional:

\`\`\`python
# Syntax:
# if condition:
#     code to execute if condition is True

score = 85

if score >= 80:
    print("Great job!")
    print("You passed")

# Output:
# Great job!
# You passed

# If condition is False, nothing happens
score = 70
if score >= 80:
    print("Great job!")    # This won't print

print("Done")              # This always prints
# Output: Done
\`\`\`

## The if-else Statement

Execute one block if condition is True, another if False:

\`\`\`python
age = 15

if age >= 18:
    print("You can vote")
else:
    print("You're too young to vote")

# Output: You're too young to vote

# Real-world example
temperature = 30

if temperature > 25:
    print("It's hot, wear light clothes")
else:
    print("It's cool, bring a jacket")
\`\`\`

## The if-elif-else Statement

Check multiple conditions:

\`\`\`python
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Your grade is: {grade}")
# Output: Your grade is: B

# Another example
color = input("Enter a color: ")

if color == "red":
    print("You chose red")
elif color == "blue":
    print("You chose blue")
elif color == "green":
    print("You chose green")
else:
    print("Unknown color")
\`\`\`

## Nested If Statements

If statements inside other if statements:

\`\`\`python
age = 25
has_license = True

if age >= 18:
    if has_license:
        print("You can drive")
    else:
        print("Get your license first")
else:
    print("You're too young to drive")

# Output: You can drive

# Complex example
income = 50000
has_savings = True
credit_score = 700

if income >= 30000:
    if has_savings:
        if credit_score >= 600:
            print("✓ Loan approved!")
        else:
            print("✗ Credit score too low")
    else:
        print("✗ Need savings")
else:
    print("✗ Income too low")
\`\`\`

## The Ternary Operator (Conditional Expression)

A quick way to assign a value based on a condition:

\`\`\`python
# Syntax: value_if_true if condition else value_if_false

age = 20
status = "Adult" if age >= 18 else "Minor"
print(status)    # Adult

# Equivalent to:
if age >= 18:
    status = "Adult"
else:
    status = "Minor"

# More examples
score = 85
result = "Pass" if score >= 60 else "Fail"
print(result)    # Pass

# Nested ternary
grade = "A" if score >= 90 else "B" if score >= 80 else "C"
print(grade)     # A
\`\`\`

## Common Mistakes

**Mistake 1: Using = instead of ==**
\`\`\`python
# Wrong
if age = 18:     # ❌ SyntaxError

# Right
if age == 18:    # ✅ Correct
\`\`\`

**Mistake 2: Forgetting the colon**
\`\`\`python
# Wrong
if age > 18      # ❌ SyntaxError
    print("Adult")

# Right
if age > 18:     # ✅ Correct
    print("Adult")
\`\`\`

**Mistake 3: Indentation errors**
\`\`\`python
# Wrong
if age > 18:
print("Adult")   # ❌ IndentationError

# Right
if age > 18:
    print("Adult")    # ✅ Correctly indented
\`\`\`

## Real-World Applications

**Login System**
\`\`\`python
username = input("Enter username: ")
password = input("Enter password: ")

if username == "admin" and password == "password123":
    print("✓ Login successful!")
elif username == "admin":
    print("✗ Incorrect password")
else:
    print("✗ User not found")
\`\`\`

**Number Classification**
\`\`\`python
num = int(input("Enter a number: "))

if num > 0:
    print("Positive")
elif num < 0:
    print("Negative")
else:
    print("Zero")

# Additional check
if num % 2 == 0:
    print("Even")
else:
    print("Odd")
\`\`\``
          },
          {
            title: 'Loops: For and While',
            content: `Loops allow you to repeat code multiple times. They're essential for handling repetitive tasks efficiently.

## What is a Loop?

A loop executes a block of code repeatedly until a condition is met:

\`\`\`python
# Without loop (boring and repetitive)
print("Hello")
print("Hello")
print("Hello")
print("Hello")
print("Hello")

# With loop (elegant and efficient)
for i in range(5):
    print("Hello")
\`\`\`

## For Loops

Execute code a specific number of times:

\`\`\`python
# Loop through a range
for i in range(5):
    print(i)

# Output:
# 0
# 1
# 2
# 3
# 4

# range(start, stop, step)
for i in range(1, 6):
    print(i)    # 1, 2, 3, 4, 5

for i in range(0, 10, 2):
    print(i)    # 0, 2, 4, 6, 8

# Countdown
for i in range(5, 0, -1):
    print(i)    # 5, 4, 3, 2, 1
\`\`\`

## Looping Through Lists

\`\`\`python
fruits = ["apple", "banana", "orange"]

for fruit in fruits:
    print(fruit)

# Output:
# apple
# banana
# orange

# With index
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Output:
# 0: apple
# 1: banana
# 2: orange

# Loop through strings
word = "Python"
for letter in word:
    print(letter)   # P, y, t, h, o, n
\`\`\`

## While Loops

Continue executing while a condition is True:

\`\`\`python
# Simple while loop
count = 0
while count < 5:
    print(count)
    count += 1

# Output: 0, 1, 2, 3, 4

# User input loop
password = ""
while password != "secret":
    password = input("Enter password: ")

print("Access granted!")

# Loop until user says stop
while True:
    response = input("Continue? (yes/no): ")
    if response.lower() == "no":
        break
    print("Continuing...")
\`\`\`

## Break and Continue

Control loop execution:

\`\`\`python
# break: Exit the loop immediately
for i in range(10):
    if i == 5:
        break
    print(i)

# Output: 0, 1, 2, 3, 4

# continue: Skip to next iteration
for i in range(5):
    if i == 2:
        continue
    print(i)

# Output: 0, 1, 3, 4

# Real-world break example
for num in range(1, 100):
    if num % 2 == 0:
        print(f"Found even number: {num}")
        break
\`\`\`

## Nested Loops

Loops inside loops:

\`\`\`python
# Multiplication table
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i} × {j} = {i*j}", end="  ")
    print()

# Output:
# 1 × 1 = 1  1 × 2 = 2  1 × 3 = 3
# 2 × 1 = 2  2 × 2 = 4  2 × 3 = 6
# 3 × 1 = 3  3 × 2 = 6  3 × 3 = 9

# Pattern printing
for i in range(1, 6):
    for j in range(i):
        print("*", end="")
    print()

# Output:
# *
# **
# ***
# ****
# *****
\`\`\`

## Loop Control: else

The else block runs if loop completes normally (no break):

\`\`\`python
# Search for a number
numbers = [1, 2, 3, 4, 5]
search = 6

for num in numbers:
    if num == search:
        print("Found!")
        break
else:
    print("Not found in list")

# Output: Not found in list

# With breaking loop
search = 3

for num in numbers:
    if num == search:
        print("Found!")
        break
else:
    print("Not found in list")

# Output: Found! (else doesn't run because we broke)
\`\`\`

## Practical Examples

**Sum of Numbers**
\`\`\`python
# Sum 1 to 10
total = 0
for i in range(1, 11):
    total += i

print(f"Sum: {total}")  # Sum: 55

# Or using sum()
total = sum(range(1, 11))
print(total)  # 55
\`\`\`

**Multiplication Table**
\`\`\`python
num = int(input("Enter a number: "))

for i in range(1, 11):
    print(f"{num} × {i} = {num * i}")

# Output (if num = 5):
# 5 × 1 = 5
# 5 × 2 = 10
# ...
# 5 × 10 = 50
\`\`\`

**Validate Input**
\`\`\`python
while True:
    try:
        age = int(input("Enter your age: "))
        if 0 < age < 150:
            break
        else:
            print("Please enter a valid age")
    except ValueError:
        print("Please enter a number")

print(f"Your age is {age}")
\`\`\`

## Summary

| Loop | Use Case |
|------|----------|
| for | Known number of iterations |
| while | Unknown number of iterations |
| break | Exit loop immediately |
| continue | Skip to next iteration |
| else | Run if loop completes normally |`
          }
        ]
      },
      {
        id: 'python-functions',
        title: 'Functions',
        topics: [
          {
            title: 'Defining and Using Functions',
            content: `Functions are reusable blocks of code that perform specific tasks. They're fundamental to writing clean, organized Python code.

## What is a Function?

A function is a named block of code that:
• Performs a specific task
• Can accept input (parameters)
• Can return output (return values)
• Can be called multiple times

\`\`\`python
# Define a function
def greet():
    print("Hello, World!")

# Call the function
greet()     # Hello, World!
greet()     # Hello, World!
\`\`\`

## Functions with Parameters

Parameters allow you to pass data to functions:

\`\`\`python
# Function with one parameter
def greet_person(name):
    print(f"Hello, {name}!")

greet_person("Alice")   # Hello, Alice!
greet_person("Bob")     # Hello, Bob!

# Function with multiple parameters
def add(a, b):
    print(f"{a} + {b} = {a + b}")

add(5, 3)       # 5 + 3 = 8
add(10, 20)     # 10 + 20 = 30

# Default parameters
def introduce(name, age=25):
    print(f"My name is {name} and I'm {age}")

introduce("Alice")          # My name is Alice and I'm 25
introduce("Bob", 30)        # My name is Bob and I'm 30
\`\`\`

## Return Values

Functions can return values using the return statement:

\`\`\`python
# Simple return
def add(a, b):
    return a + b

result = add(5, 3)
print(result)       # 8

# Multiple return values
def get_user_info():
    return "Alice", 25, "alice@email.com"

name, age, email = get_user_info()
print(name)         # Alice

# Return with conditions
def check_age(age):
    if age >= 18:
        return "Adult"
    else:
        return "Minor"

print(check_age(20))    # Adult
print(check_age(15))    # Minor

# Early return
def find_number(numbers, target):
    for num in numbers:
        if num == target:
            return True     # Return immediately
    return False            # If not found

print(find_number([1, 2, 3, 4], 3))     # True
print(find_number([1, 2, 3, 4], 5))     # False
\`\`\`

## Scope and Variables

Variables have different scopes (where they can be accessed):

\`\`\`python
# Global scope
global_var = "I'm global"

def my_function():
    # Local scope
    local_var = "I'm local"
    print(global_var)   # Can access global
    print(local_var)    # Can access local

my_function()
print(global_var)       # Can access global
# print(local_var)      # ❌ Error! local_var not accessible

# Modifying global variables
counter = 0

def increment():
    global counter      # Tell Python to use the global variable
    counter += 1

increment()
print(counter)          # 1
\`\`\`

## *args and **kwargs

Handle variable numbers of arguments:

\`\`\`python
# *args: Multiple positional arguments as tuple
def sum_all(*numbers):
    total = 0
    for num in numbers:
        total += num
    return total

print(sum_all(1, 2, 3))         # 6
print(sum_all(1, 2, 3, 4, 5))   # 15

# **kwargs: Multiple keyword arguments as dictionary
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25, city="NYC")
# Output:
# name: Alice
# age: 25
# city: NYC

# Combined
def print_all(name, *args, **kwargs):
    print(f"Name: {name}")
    print(f"Args: {args}")
    print(f"Kwargs: {kwargs}")

print_all("Alice", 1, 2, 3, age=25, city="NYC")
\`\`\`

## Lambda Functions (Anonymous Functions)

Short, unnamed functions for simple operations:

\`\`\`python
# Regular function
def square(x):
    return x ** 2

# Lambda function (same thing, shorter)
square = lambda x: x ** 2
print(square(5))    # 25

# Lambda with multiple parameters
add = lambda x, y: x + y
print(add(3, 4))    # 7

# Lambda with map()
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
print(squared)      # [1, 4, 9, 16, 25]

# Lambda with filter()
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)        # [2, 4, 6, 8, 10]

# Lambda with sorted()
students = [("Alice", 85), ("Bob", 75), ("Charlie", 90)]
sorted_by_score = sorted(students, key=lambda x: x[1])
print(sorted_by_score)
# [('Bob', 75), ('Alice', 85), ('Charlie', 90)]
\`\`\`

## Documentation (Docstrings)

Document your functions:

\`\`\`python
def calculate_bmi(weight, height):
    """
    Calculate Body Mass Index.
    
    Parameters:
    weight (float): Weight in kilograms
    height (float): Height in meters
    
    Returns:
    float: The calculated BMI
    """
    return weight / (height ** 2)

# Access documentation
print(calculate_bmi.__doc__)
help(calculate_bmi)
\`\`\`

## Real-World Function Examples

**Temperature Converter**
\`\`\`python
def celsius_to_fahrenheit(celsius):
    """Convert Celsius to Fahrenheit"""
    return (celsius * 9/5) + 32

def fahrenheit_to_celsius(fahrenheit):
    """Convert Fahrenheit to Celsius"""
    return (fahrenheit - 32) * 5/9

print(celsius_to_fahrenheit(0))    # 32.0
print(celsius_to_fahrenheit(100))  # 212.0
\`\`\`

**Validate Password**
\`\`\`python
def is_valid_password(password):
    """Check if password is strong"""
    if len(password) < 8:
        return False
    if not any(c.isupper() for c in password):
        return False
    if not any(c.isdigit() for c in password):
        return False
    return True

print(is_valid_password("abc"))           # False (too short)
print(is_valid_password("abcdefgh"))      # False (no uppercase)
print(is_valid_password("Abcdefgh1"))     # True
\`\`\``
          }
        ]
      },
      {
        id: 'python-data-structures',
        title: 'Data Structures',
        topics: [
          {
            title: 'Lists and List Operations',
            content: `Lists are ordered, changeable collections that can store multiple items of different types.

## Creating Lists

\`\`\`python
# Empty list
empty_list = []

# List with items
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True, None]

# Using list() constructor
list_from_string = list("Python")
print(list_from_string)     # ['P', 'y', 't', 'h', 'o', 'n']
\`\`\`

## Accessing Elements

\`\`\`python
fruits = ["apple", "banana", "cherry", "date"]

# Index access (0-based)
print(fruits[0])        # apple
print(fruits[1])        # banana
print(fruits[-1])       # date (last element)
print(fruits[-2])       # cherry (second last)

# Slicing
print(fruits[1:3])      # ['banana', 'cherry']
print(fruits[:2])       # ['apple', 'banana']
print(fruits[2:])       # ['cherry', 'date']
print(fruits[::2])      # ['apple', 'cherry'] (every 2nd)
print(fruits[::-1])     # ['date', 'cherry', 'banana', 'apple'] (reversed)
\`\`\`

## Modifying Lists

\`\`\`python
numbers = [1, 2, 3, 4, 5]

# Add elements
numbers.append(6)               # [1, 2, 3, 4, 5, 6]
numbers.insert(0, 0)            # [0, 1, 2, 3, 4, 5, 6]
numbers.extend([7, 8, 9])       # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Remove elements
numbers.pop()                   # Remove last element
numbers.pop(0)                  # Remove first element
numbers.remove(5)               # Remove element with value 5
del numbers[0]                  # Delete by index

# Clear all
numbers.clear()                 # Empty list

# Change elements
fruits = ["apple", "banana", "cherry"]
fruits[1] = "blueberry"         # ["apple", "blueberry", "cherry"]
\`\`\`

## List Methods

\`\`\`python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# Count occurrences
print(numbers.count(1))         # 2

# Find index
print(numbers.index(4))         # 2

# Sort (in-place)
numbers_copy = numbers.copy()
numbers_copy.sort()             # [1, 1, 2, 3, 4, 5, 6, 9]
numbers_copy.sort(reverse=True) # [9, 6, 5, 4, 3, 2, 1, 1]

# Reverse (in-place)
numbers_copy.reverse()

# Length
print(len(numbers))             # 8

# Check membership
print(3 in numbers)             # True
print(10 in numbers)            # False
\`\`\`

## List Comprehension

Create lists in a concise way:

\`\`\`python
# Traditional way
squares = []
for i in range(5):
    squares.append(i ** 2)
print(squares)  # [0, 1, 4, 9, 16]

# List comprehension (shorter)
squares = [i ** 2 for i in range(5)]
print(squares)  # [0, 1, 4, 9, 16]

# With conditions
evens = [i for i in range(10) if i % 2 == 0]
print(evens)    # [0, 2, 4, 6, 8]

# Nested
matrix = [[i + j for j in range(3)] for i in range(3)]
# [[0, 1, 2], [1, 2, 3], [2, 3, 4]]
\`\`\`

## Real-World Examples

**Grade Processing**
\`\`\`python
scores = [85, 92, 78, 95, 88]
average = sum(scores) / len(scores)
passed = [s for s in scores if s >= 80]

print(f"Average: {average:.1f}")
print(f"Passed: {passed}")
print(f"Pass rate: {len(passed)/len(scores)*100:.0f}%")
\`\`\`

**Remove Duplicates**
\`\`\`python
numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
unique = list(dict.fromkeys(numbers))
print(unique)   # [1, 2, 3, 4]
\`\`\``
          },
          {
            title: 'Dictionaries and Sets',
            content: `Dictionaries store data as key-value pairs, while sets store unique values.

## Dictionaries

\`\`\`python
# Create dictionary
person = {
    "name": "Alice",
    "age": 25,
    "city": "NYC"
}

# Access values
print(person["name"])           # Alice
print(person.get("age"))        # 25
print(person.get("email", "N/A"))  # N/A (default if key doesn't exist)

# Modify
person["age"] = 26
person["email"] = "alice@email.com"

# Delete
del person["city"]
person.pop("email")

# Check existence
if "name" in person:
    print("Name exists")

# Iteration
for key, value in person.items():
    print(f"{key}: {value}")

# Keys and values
print(person.keys())            # dict_keys(['name', 'age'])
print(person.values())          # dict_values(['Alice', 26])
\`\`\`

## Sets

\`\`\`python
# Create set
colors = {"red", "green", "blue"}

# Add/Remove
colors.add("yellow")
colors.discard("green")
colors.remove("blue")  # Error if not found

# Set operations
set_a = {1, 2, 3}
set_b = {3, 4, 5}

intersection = set_a & set_b  # {3}
union = set_a | set_b          # {1, 2, 3, 4, 5}
difference = set_a - set_b     # {1, 2}

# Check membership
print(2 in set_a)              # True
\`\`\``
          }
        ]
      },
      {
        id: 'python-oop',
        title: 'Object-Oriented Programming',
        topics: [
          {
            title: 'Classes and Objects',
            content: `Object-Oriented Programming (OOP) is a way to organize code using objects and classes.

## What is a Class?

A class is a blueprint for creating objects. An object is an instance of a class.

\`\`\`python
# Define a class
class Car:
    # Constructor (runs when creating an object)
    def __init__(self, brand, model, year):
        # Instance variables
        self.brand = brand
        self.model = model
        self.year = year
    
    # Methods
    def start(self):
        return f"{self.brand} {self.model} is starting"
    
    def get_age(self):
        return 2025 - self.year
    
    def info(self):
        return f"{self.year} {self.brand} {self.model}"

# Create objects
car1 = Car("Toyota", "Camry", 2020)
car2 = Car("Honda", "Civic", 2022)

# Access properties
print(car1.brand)           # Toyota
print(car1.get_age())       # 5

# Call methods
print(car1.start())         # Toyota Camry is starting
print(car1.info())          # 2020 Toyota Camry
\`\`\`

## Inheritance

Classes can inherit from other classes:

\`\`\`python
# Parent class
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        return f"{self.name} makes a sound"

# Child class
class Dog(Animal):
    def speak(self):
        return f"{self.name} barks"
    
    def fetch(self):
        return f"{self.name} is fetching"

# Using inheritance
dog = Dog("Buddy")
print(dog.speak())          # Buddy barks
print(dog.fetch())          # Buddy is fetching

# Another example
class Cat(Animal):
    def speak(self):
        return f"{self.name} meows"

cat = Cat("Whiskers")
print(cat.speak())          # Whiskers meows
\`\`\`

## Encapsulation

Hide internal details and protect data:

\`\`\`python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance  # Private (starts with __)
    
    def get_balance(self):
        return self.__balance
    
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            return f"Deposited {amount}. New balance: {self.__balance}"
        return "Invalid amount"
    
    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            return f"Withdrew {amount}. New balance: {self.__balance}"
        return "Insufficient funds"

account = BankAccount(1000)
print(account.get_balance())      # 1000
print(account.deposit(500))       # Deposited 500. New balance: 1500
print(account.withdraw(200))      # Withdrew 200. New balance: 1300
\`\`\`

## Polymorphism

Same method name, different implementations:

\`\`\`python
class Shape:
    def area(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14 * self.radius ** 2

# Polymorphism in action
shapes = [Rectangle(5, 10), Circle(7)]

for shape in shapes:
    print(f"Area: {shape.area()}")
# Output:
# Area: 50
# Area: 153.86
\`\``
          }
        ]
      }
    ]
  },
  java: {
    title: 'Java Tutorials',
    description: 'Master Java programming language',
    color: '#f89820',
    icon: '☕',
    sections: [
      {
        id: 'java-intro',
        title: 'Java Introduction',
        topics: [
          {
            title: 'What is Java?',
            content: `Java is a powerful, object-oriented programming language created by James Gosling at Sun Microsystems (now owned by Oracle) in 1995.

## Key Features of Java

**Platform Independent (Write Once, Run Anywhere)**
Java code runs on any system with a Java Virtual Machine (JVM):
• Compile once → Run anywhere
• JVM handles platform-specific details
• Huge advantage for large applications

**Object-Oriented**
Everything in Java is organized as objects:
• Classes and objects
• Inheritance and polymorphism
• Encapsulation and abstraction
• Promotes code reusability

**Secure and Robust**
• Strong type checking
• Automatic memory management (garbage collection)
• Exception handling
• No pointers (eliminates many bugs)

**High Performance**
• Just-in-Time (JIT) compilation
• Bytecode optimization
• Fast execution comparable to C++

## Why Learn Java?

• Most widely used enterprise language
• Powers millions of applications worldwide
• Strong job market demand
• Large ecosystem and libraries
• Great for building scalable systems
• Used in Android app development
• Essential for backend services

## How Java Works

\`\`\`
Source Code (.java)
        ↓
   Compiler
        ↓
   Bytecode (.class)
        ↓
   JVM (Java Virtual Machine)
        ↓
   Machine Code (platform-specific)
\`\`\`

## Setting Up Java

1. Download JDK from oracle.com
2. Set JAVA_HOME environment variable
3. Add bin directory to PATH
4. Verify: \`java -version\`

## Your First Java Program

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

## Java Applications

Java is used in:
• Enterprise applications (banking, finance)
• Android mobile apps
• Web applications (backend)
• Big data (Hadoop, Spark)
• Desktop applications
• IoT devices`
          },
          {
            title: 'Data Types and Variables',
            content: `Java requires you to specify data types for variables. Understanding these types is fundamental.

## Primitive Data Types

\`\`\`java
// Integer types
byte age = 25;                    // 1 byte, -128 to 127
short year = 2025;                // 2 bytes
int salary = 50000;               // 4 bytes
long population = 8000000000L;    // 8 bytes (L suffix)

// Decimal types
float pi = 3.14f;                 // 4 bytes, single precision (f suffix)
double height = 5.8;              // 8 bytes, double precision

// Character type
char grade = 'A';                 // Single character

// Boolean type
boolean isActive = true;          // true or false
\`\`\`

## Type Casting

\`\`\`java
// Widening (automatic)
int num = 100;
double decimal = num;            // Automatic conversion
System.out.println(decimal);     // 100.0

// Narrowing (explicit)
double pi = 3.14;
int rounded = (int) pi;          // Explicit cast
System.out.println(rounded);     // 3
\`\`\`

## Strings

\`\`\`java
String name = "Alice";
String greeting = "Hello, " + name;
System.out.println(greeting);    // Hello, Alice

// String methods
System.out.println(name.length());           // 5
System.out.println(name.toUpperCase());      // ALICE
System.out.println(name.charAt(0));          // A
System.out.println(name.substring(1));       // lice
\`\``
          }
        ]
      },
      {
        id: 'java-oop',
        title: 'Object-Oriented Programming',
        topics: [
          {
            title: 'Classes and Objects',
            content: `Java is fundamentally object-oriented. Everything revolves around classes and objects.

## Creating Classes

\`\`\`java
public class Student {
    // Variables (attributes)
    private String name;
    private int age;
    private double gpa;
    
    // Constructor
    public Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }
    
    // Methods
    public void study(String subject) {
        System.out.println(name + " is studying " + subject);
    }
    
    public double getGPA() {
        return gpa;
    }
    
    public void display() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("GPA: " + gpa);
    }
}
\`\`\`

## Using Objects

\`\`\`java
public class Main {
    public static void main(String[] args) {
        // Create objects
        Student student1 = new Student("Alice", 20, 3.8);
        Student student2 = new Student("Bob", 21, 3.5);
        
        // Use objects
        student1.display();
        student1.study("Mathematics");
        
        System.out.println("GPA: " + student1.getGPA());
    }
}
\`\`\``
          },
          {
            title: 'Inheritance and Polymorphism',
            content: `Inheritance allows classes to inherit properties from other classes.

## Inheritance

\`\`\`java
// Parent class
public class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    public void speak() {
        System.out.println(name + " makes a sound");
    }
}

// Child class
public class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }
    
    @Override
    public void speak() {
        System.out.println(name + " barks");
    }
}

// Using inheritance
public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog("Buddy");
        dog.speak();  // Buddy barks
    }
}
\`\`\`

## Polymorphism

\`\`\`java
Animal myDog = new Dog("Buddy");
myDog.speak();  // Buddy barks
\`\``
          }
        ]
      }
    ]
  },
  dsa: {
    title: 'Data Structures & Algorithms',
    description: 'Master DSA for interviews',
    color: '#00d4ff',
    icon: '🧩',
    sections: [
      {
        id: 'dsa-arrays',
        title: 'Arrays',
        topics: [
          {
            title: 'Array Fundamentals',
            content: `Arrays are fundamental data structures that store multiple elements in contiguous memory locations.

## What is an Array?

An array is a collection of elements of the same type stored in consecutive memory locations.

\`\`\`python
# Array basics
arr = [1, 2, 3, 4, 5]

# Access by index
print(arr[0])        # 1 (first element)
print(arr[4])        # 5 (last element)
print(arr[-1])       # 5 (last, using negative index)

# Length
print(len(arr))      # 5
\`\`\`

## Time Complexity

| Operation | Complexity |
|-----------|-----------|
| Access    | O(1)      |
| Search    | O(n)      |
| Insert    | O(n)      |
| Delete    | O(n)      |

## Common Array Problems

**Reverse an Array**
\`\`\`python
def reverse_array(arr):
    return arr[::-1]

# Or manually
def reverse_manual(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr
\`\`\`

**Find Maximum Element**
\`\`\`python
def find_max(arr):
    max_val = arr[0]
    for num in arr:
        if num > max_val:
            max_val = num
    return max_val

# Or using built-in
max_val = max(arr)
\`\`\`

**Remove Duplicates**
\`\`\`python
def remove_duplicates(arr):
    return list(dict.fromkeys(arr))

# Or using set
arr = list(set(arr))
\`\``
          },
          {
            title: 'Two Pointer Technique',
            content: `Two pointers is an efficient technique for solving array problems.

## Two Sum Problem

\`\`\`python
def two_sum(arr, target):
    # Using hash map
    seen = {}
    for i, num in enumerate(arr):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Time: O(n), Space: O(n)
\`\`\`

## Two Pointer Approach

\`\`\`python
def two_pointer_sum(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target:
            return [arr[left], arr[right]]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return []

# Works on sorted arrays
# Time: O(n), Space: O(1)
\`\``
          }
        ]
      },
      {
        id: 'dsa-linked-lists',
        title: 'Linked Lists',
        topics: [
          {
            title: 'Singly Linked List',
            content: `Linked lists are dynamic data structures where elements are connected via pointers.

## Node Structure

\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
\`\`\`

## Linked List Implementation

\`\`\`python
class LinkedList:
    def __init__(self):
        self.head = None
    
    def insert_at_beginning(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
    
    def insert_at_end(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node
    
    def delete(self, data):
        if not self.head:
            return
        if self.head.data == data:
            self.head = self.head.next
            return
        current = self.head
        while current.next:
            if current.next.data == data:
                current.next = current.next.next
                return
            current = current.next
\`\`\`

## Time Complexity

| Operation | Complexity |
|-----------|-----------|
| Access    | O(n)      |
| Search    | O(n)      |
| Insert    | O(1)      |
| Delete    | O(n)      |
\`\``
          }
        ]
      }
    ]
  }
};
