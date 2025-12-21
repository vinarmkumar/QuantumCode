// Detailed Java Tutorial Content
// This file contains comprehensive Java tutorials matching javatutorial.md reference level

export const javaDetailedContent = `
java: {
  title: 'Java Tutorials - Comprehensive Guide',
  description: 'Master Java programming from basics to advanced concepts',
  color: '#f89820',
  icon: '☕',
  sections: [
    {
      id: 'java-intro',
      title: 'Java Introduction & Setup',
      topics: [
        {
          title: 'What is Java?',
          content: \`Java is a high-level, object-oriented programming language created by James Gosling at Sun Microsystems (now owned by Oracle) in 1995. It has become one of the most widely used programming languages in the world.

## Key Characteristics of Java

**1. Platform Independence (WORA - Write Once, Run Anywhere)**

Java programs are compiled into bytecode that can run on any device with a Java Virtual Machine (JVM):

Source Code (.java)
         ↓
    Compiler (javac)
         ↓
    Bytecode (.class)
         ↓
    JVM (Windows/Linux/Mac)
         ↓
    Platform-specific execution

This is a major advantage for enterprise applications because:
• Code written on Windows can run on Linux without recompilation
• Reduces deployment costs
• Simplifies cross-platform development
• Essential for enterprise software

**Example:**
\\\`\\\`\\\`java
// This code runs on ANY platform with JVM
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello from any platform!");
    }
}
\\\`\\\`\\\`

**2. Object-Oriented Programming (OOP)**

Java is fundamentally object-oriented, promoting code organization and reusability:

• Classes and Objects - Everything is organized as objects
• Encapsulation - Hiding implementation details
• Inheritance - Reusing code through parent-child relationships
• Polymorphism - One interface, multiple implementations
• Abstraction - Simplifying complexity

**3. Secure and Robust**

Java includes built-in security features:

• Strong type checking at compile time (prevents type errors)
• Automatic memory management (Garbage Collection - GC)
• No pointer arithmetic (eliminates buffer overflow vulnerabilities)
• Exception handling built into the language
• Runtime error checking and validation
• Bytecode verification before execution

This makes Java ideal for mission-critical applications:
• Banking systems
• Healthcare applications
• Financial trading platforms
• Government systems

**4. High Performance**

Java provides excellent performance through:

• Just-In-Time (JIT) Compilation - Bytecode compiled to machine code at runtime
• Bytecode optimization
• Efficient memory management
• Comparable performance to C++
• Improved with each JVM version (HotSpot technology)

**5. Multithreading Support**

• Built-in threading capabilities
• Easier to write concurrent programs
• Thread synchronization mechanisms
• Thread pool management

**6. Rich Ecosystem**

• Extensive standard library (Java API)
• Third-party libraries (Maven, Gradle)
• Frameworks (Spring, Hibernate, Struts)
• Tools (IDE, debuggers, profilers)

## Java vs Other Languages

| Feature | Java | C++ | Python | JavaScript |
|---------|------|-----|--------|-----------|
| Platform Independent | ✓ | ✗ | ✓ | ✓ |
| Compiled/Interpreted | Both | Compiled | Interpreted | Interpreted |
| Memory Management | Automatic | Manual | Automatic | Automatic |
| Type Safety | Strong | Strong | Dynamic | Dynamic |
| Learning Curve | Medium | Steep | Easy | Easy |
| Performance | Fast | Very Fast | Slower | Slower |
| Enterprise Use | Excellent | Good | Growing | Growing |
| Multithreading | Excellent | Good | Limited | N/A |

## Java Editions

**Java SE (Standard Edition)**
• Core Java for desktops and console applications
• Foundation for other editions
• What we focus on in these tutorials
• Includes JVM, JDK, and libraries
• Free download from Oracle

**Java EE (Enterprise Edition)**
• Building large-scale distributed applications
• Web services and APIs
• Application servers (Tomcat, JBoss)
• Enterprise features beyond SE
• Used in production systems

**Java ME (Micro Edition)**
• Mobile and embedded device development
• Limited resources
• Smaller footprint
• Less common nowadays (Android uses different approach)

## Why Companies Use Java

**Tech Giants:**
• Google - Infrastructure, backend systems
• Netflix - Streaming service backend, microservices
• Facebook - Large-scale systems, data processing
• Amazon - AWS services, enterprise solutions
• Twitter - High-traffic real-time systems

**Industries:**
• Banking & Finance - Secure, robust, reliable
• E-commerce - Large-scale transactions
• Healthcare - Critical systems, data security
• Government - Enterprise applications
• Telecommunications - Complex distributed systems
• Insurance - Risk management systems

## Java Versions

• Java 8 (LTS) - Most widely used, stable
• Java 11 (LTS) - Enterprise standard
• Java 17 (LTS) - Modern features
• Java 21 (Latest LTS) - Current recommendation

(LTS = Long-Term Support)

## Learning Path

This comprehensive tutorial covers:

1. **Basics** - Program structure, syntax, comments
2. **Data Types** - Primitive types, strings, conversions
3. **Variables** - Declaration, scope, initialization
4. **Operators** - Arithmetic, logical, comparison
5. **Control Flow** - If-else, switch, loops
6. **Arrays** - Single and multi-dimensional arrays
7. **Methods** - Function basics, parameters, return values
8. **OOP** - Classes, objects, inheritance, polymorphism
9. **Exception Handling** - Try-catch, finally, custom exceptions
10. **Collections** - Lists, sets, maps
11. **File Handling** - Reading/writing files
12. **Threading** - Concurrent programming
13. **Advanced Topics** - Generics, reflection, streams

By the end, you'll build professional Java applications!
\`
        },
        {
          title: 'Setting Up Java Development Environment',
          content: \`Getting Java installed and ready to code is the first step. Here's a complete guide.

## What You Need

**1. JDK (Java Development Kit)**
• Compiler (javac) - Converts source code to bytecode
• JVM (Java Virtual Machine) - Runs bytecode
• Standard Library - Pre-built classes and methods
• Development Tools - Debugger, profiler, documentation

**2. IDE (Integrated Development Environment) - Optional but Recommended**
• IntelliJ IDEA (Best for Java)
• Eclipse (Lightweight, popular)
• VS Code (Modern, minimal)
• NetBeans (Educational, comprehensive)

**3. JRE vs JDK**

JRE (Java Runtime Environment):
• Only contains JVM
• Runs Java programs
• No compiler
• Smaller download (~80 MB)

JDK (Java Development Kit):
• Contains JVM + Compiler + Tools
• Develops Java programs
• Larger download (~180 MB)
• What developers need

## Step-by-Step Installation Guide

### Windows Installation

**Step 1: Download JDK**
1. Visit https://www.oracle.com/java/technologies/downloads/
2. Click on latest JDK version (21 or latest LTS)
3. Accept license agreement
4. Choose "Windows x64 Installer"
5. File size: ~180 MB

**Step 2: Run Installer**
1. Double-click the .exe file
2. Click "Next" to accept defaults
3. Choose installation folder (default: C:\\\\Program Files\\\\Java\\\\jdk-21)
4. Complete installation (~5 minutes)

**Step 3: Set Environment Variables**

\\\`Setting JAVA_HOME:\\\`

1. Press \\\`Win + R\\\`, type \\\`sysdm.cpl\\\`, press Enter
2. Go to "Advanced" tab
3. Click "Environment Variables"
4. Click "New" under System variables
5. Variable name: \\\`JAVA_HOME\\\`
6. Variable value: \\\`C:\\\\Program Files\\\\Java\\\\jdk-21\\\`
7. Click OK

\\\`Update PATH:\\\`

1. In Environment Variables, select \\\`PATH\\\`
2. Click "Edit"
3. Click "New"
4. Add: \\\`%JAVA_HOME%\\\\bin\\\`
5. Click OK

**Step 4: Verify Installation**

Open Command Prompt and run:
\\\`\\\`\\\`bash
java -version
javac -version
\\\`\\\`\\\`

Expected output:
\\\`\\\`\\\`
java version "21.0.1" 2023-10-17 LTS
Java(TM) SE Runtime Environment (build 21.0.1+12-LTS-29)
Java HotSpot(TM) 64-Bit Server VM (build 21.0.1+12-LTS-29)
\\\`\\\`\\\`

### Mac Installation

**Using Homebrew (Easiest):**
\\\`\\\`\\\`bash
# Install Homebrew if not present
/bin/bash -c "\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install JDK
brew install openjdk

# Check version
java -version
\\\`\\\`\\\`

**Using DMG Installer:**
1. Download .dmg file from Oracle
2. Double-click to mount
3. Run installer
4. Follow on-screen instructions

### Linux Installation

**Debian/Ubuntu:**
\\\`\\\`\\\`bash
sudo apt update
sudo apt install openjdk-21-jdk

# Verify
java -version
\\\`\\\`\\\`

**RedHat/CentOS:**
\\\`\\\`\\\`bash
sudo yum install java-21-openjdk-devel

# Verify
java -version
\\\`\\\`\\\`

## IDE Installation

### IntelliJ IDEA (Recommended)

1. Download from https://www.jetbrains.com/idea/
2. Choose "Community Edition" (Free)
3. Run installer for your OS
4. First launch automatically detects JDK
5. Create new Java project
6. Full IDE experience with all features

**Features:**
• Intelligent code completion
• Built-in debugger
• Code inspections
• Integrated terminal
• Maven/Gradle support
• Git integration

### VS Code (Lightweight)

1. Download from https://code.visualstudio.com/
2. Install "Extension Pack for Java"
3. Open VS Code extensions (Ctrl+Shift+X)
4. Search "Extension Pack for Java" by Microsoft
5. Install (includes debugging, testing, Maven)

**Setup:**
• Automatically finds JDK
• Lightweight environment
• Great for beginners
• Fast startup time

## First Java Program

**Create file:** \\\`HelloWorld.java\\\`

\\\`\\\`\\\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\\\`\\\`\\\`

## Compile and Run

**Using Command Line:**

\\\`\\\`\\\`bash
# Compile Java source to bytecode
javac HelloWorld.java
# Creates: HelloWorld.class

# Run the program
java HelloWorld

# Output:
# Hello, World!
\\\`\\\`\\\`

**Using IDE:**
1. Open file in IDE
2. Click "Run" button (usually green play icon)
3. Output appears in console
4. Much simpler than command line

## Troubleshooting Common Issues

**Issue: 'javac' is not recognized**

Causes:
• JAVA_HOME not set correctly
• System not restarted after setting PATH

Solution:
1. Verify JAVA_HOME exists: \\\`echo %JAVA_HOME%\\\`
2. Verify bin directory: \\\`dir %JAVA_HOME%\\\\bin\\\`
3. Restart computer
4. Open new Command Prompt window

**Issue: 'java' command not found**

Solution:
• Check PATH includes \\\`%JAVA_HOME%\\\\bin\\\`
• Verify JDK installation location
• Reinstall JDK if paths are incorrect

**Issue: Class not found or file not found**

Solution:
• Check filename matches class name exactly (case-sensitive)
• Ensure .class file exists in same directory
• Use: \\\`java -cp . HelloWorld\\\` to specify classpath

## Java Development Workflow

\\\`
Write Code (.java file)
    ↓
Compile with javac
    ↓
Create Bytecode (.class file)
    ↓
Run with java command
    ↓
JVM executes bytecode
    ↓
Program output
\\\`

## Next Steps

Now that Java is installed:
1. Write simple programs
2. Understand Java syntax
3. Learn data types and variables
4. Master object-oriented concepts
5. Build real applications

Let's continue with Java basics!
\`
        }
      ]
    },
    {
      id: 'java-basics',
      title: 'Java Fundamentals',
      topics: [
        {
          title: 'Program Structure & Syntax',
          content: \`Understanding how Java programs are organized is fundamental to writing good code.

## Java Program Structure

\\\`\\\`\\\`java
public class HelloWorld {              // Class declaration
    public static void main(String[] args) {   // Main method
        System.out.println("Hello!");          // Statement
    }
}
\\\`\\\`\\\`

**Breaking it down:**

### 1. Class Declaration
\\\`\\\`\\\`java
public class HelloWorld {
    // Class body
}
\\\`\\\`\\\`

• \\\`public\\\` - Access modifier (accessible from anywhere)
• \\\`class\\\` - Keyword declaring a class
• \\\`HelloWorld\\\` - Class name (matches filename)
• \\\`{}\\\` - Class body/scope

**Naming rules:**
• Must start with letter or underscore
• Case-sensitive (HelloWorld ≠ helloworld)
• Filename must match exactly: HelloWorld.java
• Convention: PascalCase (FirstLetterCapital)

### 2. Main Method

\\\`\\\`\\\`java
public static void main(String[] args) {
    // Code here executes when program runs
}
\\\`\\\`\\\`

• \\\`public\\\` - Accessible everywhere
• \\\`static\\\` - Belongs to class, not to instances
• \\\`void\\\` - Doesn't return any value
• \\\`main\\\` - Entry point (JVM looks for this)
• \\\`String[] args\\\` - Command-line arguments (array of strings)

Every Java application needs exactly one main method to start execution.

### 3. Statements and Expressions

\\\`\\\`\\\`java
System.out.println("Hello, World!");   // Statement
int x = 5;                              // Statement
x = x + 3;                              // Statement
\\\`\\\`\\\`

• Each statement ends with semicolon ;
• Statements execute top to bottom
• Expressions produce values
• Statements execute actions

## Comments in Java

Comments are ignored by compiler and explain code to humans.

\\\`\\\`\\\`java
// Single-line comment
// Useful for brief explanations
// One line per comment

/*
 Multi-line comment
 Can span multiple lines
 Useful for longer explanations
*/

/**
 * Javadoc comment
 * Generates HTML documentation
 * @param name - Description
 * @return - Description
 */
public void myMethod(String name) {
    // Method implementation
}
\\\`\\\`\\\`

## Java Keywords (Reserved Words)

These have special meaning and can't be used as variable names:

**Control Flow:**
\\\`if else switch case break continue default\\\`

**Loops:**
\\\`for while do\\\`

**Object-Oriented:**
\\\`class interface extends implements this super new\\\`

**Access Modifiers:**
\\\`public private protected static final\\\`

**Data Types:**
\\\`int double boolean void String char float long short byte\\\`

**Exception Handling:**
\\\`try catch finally throw throws\\\`

\\\`\\\`\\\`java
// ✓ Valid variable names
int score = 100;
String firstName = "Alice";
boolean isValid = true;

// ✗ Invalid (using keywords)
int if = 10;              // Error: if is keyword
String class = "A";       // Error: class is keyword
void method = null;       // Error: void is keyword
\\\`\\\`\\\`

## Naming Conventions

Following conventions makes code readable and maintainable:

\\\`\\\`\\\`java
// Classes: PascalCase
public class StudentManagementSystem { }
public class BankAccount { }

// Methods: camelCase
public void calculateGPA() { }
public String getStudentName() { }

// Variables: camelCase
int studentAge = 20;
String firstName = "Alice";
double accountBalance = 5000.50;

// Constants: UPPER_SNAKE_CASE
final int MAX_STUDENTS = 100;
final double PI = 3.14159;
final String DATABASE_URL = "jdbc:mysql://localhost:3306/mydb";
\\\`\\\`\\\`

## Indentation and Formatting

\\\`\\\`\\\`java
// Proper indentation (4 spaces or 1 tab per level)
public class Example {
    public static void main(String[] args) {
        if (5 > 3) {
            System.out.println("Five is greater");
        }
    }
}
\\\`\\\`\\\`

**Benefits:**
• Improves readability dramatically
• Easier to debug
• Professional appearance
• Most IDEs auto-indent

## Program Execution Flow

\\\`\\\`\\\`java
public class ExecutionFlow {
    public static void main(String[] args) {
        System.out.println("Step 1");    // Prints first
        System.out.println("Step 2");    // Prints second
        System.out.println("Step 3");    // Prints third
        // Program ends here
    }
}

// Output:
// Step 1
// Step 2
// Step 3
\\\`\\\`\\\`

Execution order:
1. JVM finds main() method
2. Executes statements line by line
3. Returns when main() completes

## Common Program Structures

### Structure 1: Simple One-Class Program
\\\`\\\`\\\`java
public class Calculator {
    public static void main(String[] args) {
        int result = 5 + 3;
        System.out.println("Result: " + result);
    }
}
\\\`\\\`\\\`

### Structure 2: Multiple Methods
\\\`\\\`\\\`java
public class MathOperations {
    public static void main(String[] args) {
        int sum = add(5, 3);
        int product = multiply(5, 3);
        System.out.println("Sum: " + sum);
        System.out.println("Product: " + product);
    }
    
    public static int add(int a, int b) {
        return a + b;
    }
    
    public static int multiply(int a, int b) {
        return a * b;
    }
}
\\\`\\\`\\\`

### Structure 3: Multiple Classes
\\\`\\\`\\\`java
// Student.java
public class Student {
    private String name;
    private int age;
    
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

// School.java
public class School {
    public static void main(String[] args) {
        Student student = new Student("Alice", 20);
        System.out.println("Student created");
    }
}
\\\`\\\`\\\`

## Common Mistakes and Solutions

**Mistake 1: Missing main method**
\\\`\\\`\\\`java
// ✗ Wrong
public class MyClass {
    System.out.println("Hello");
}

// ✓ Right
public class MyClass {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}
\\\`\\\`\\\`

**Mistake 2: Wrong filename**
\\\`\\\`\\\`
// Class name: Main
// ✓ Correct: Save as Main.java
// ✗ Wrong: Save as main.java (case-sensitive!)
\\\`\\\`\\\`

**Mistake 3: Missing semicolons**
\\\`\\\`\\\`java
// ✗ Wrong
int x = 5     // Compilation error

// ✓ Right
int x = 5;    // Semicolon required
\\\`\\\`\\\`

**Mistake 4: Wrong curly braces**
\\\`\\\`\\\`java
// ✗ Wrong
public class Test {
    public static void main(String[] args) {
        System.out.println("Hello");
}  // Missing closing brace

// ✓ Right
public class Test {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}  // All braces matched
\\\`\\\`\\\`

Now you understand Java program structure! Let's learn data types.
\`
        },
        {
          title: 'Primitive Data Types',
          content: \`Java has 8 primitive data types. Understanding them is essential for working with data.

## The 8 Primitive Data Types

### Integer Types (Whole Numbers)

**byte** - Smallest integer type
\\\`\\\`\\\`java
byte age = 25;
byte temperature = -10;
byte range = 127;

// Characteristics:
// - Size: 8 bits (1 byte)
// - Range: -128 to 127
// - Default value: 0
// - Memory efficient
\\\`\\\`\\\`

Use case: When you need to save memory and values are small. Example: pixel values in images (0-255).

**short** - Small integer type
\\\`\\\`\\\`java
short year = 2025;
short population = 10000;

// Characteristics:
// - Size: 16 bits (2 bytes)
// - Range: -32,768 to 32,767
// - Default value: 0
// - Rarely used in practice
\\\`\\\`\\\`

Use case: Specialized applications. Less common than byte or int.

**int** - Most common integer type
\\\`\\\`\\\`java
int count = 100;
int salary = 50000;
int population = 1000000;

// Characteristics:
// - Size: 32 bits (4 bytes)
// - Range: -2,147,483,648 to 2,147,483,647 (about -2B to +2B)
// - Default value: 0
// - Default choice for integers
\\\`\\\`\\\`

Use case: Default for most integer values. Use for general counting and calculations.

**long** - Large integer type
\\\`\\\`\\\`java
long largeNumber = 1000000000000L;  // Note: L suffix required
long distance = 384400L;             // Earth to Moon in km
long fileSize = 5000000000L;         // 5 GB

// Characteristics:
// - Size: 64 bits (8 bytes)
// - Range: -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
// - Default value: 0L
// - MUST use L suffix
\\\`\\\`\\\`

Use case: Very large numbers. Example: database IDs, file sizes, timestamps.

### Floating-Point Types (Decimal Numbers)

**float** - Single precision decimal
\\\`\\\`\\\`java
float price = 19.99f;        // Note: f suffix required
float temperature = 98.6f;
float percentage = 33.33f;

// Characteristics:
// - Size: 32 bits (4 bytes)
// - Range: ±1.4e-45 to ±3.4e+38
// - Precision: ~6-7 decimal places
// - Default value: 0.0f
// - MUST use f suffix
\\\`\\\`\\\`

Use case: When memory is critical and high precision not needed.

**double** - Double precision decimal
\\\`\\\`\\\`java
double pi = 3.14159;
double salary = 50000.50;
double gpa = 3.85;

// Characteristics:
// - Size: 64 bits (8 bytes)
// - Range: ±4.9e-324 to ±1.7e+308
// - Precision: ~15-17 decimal places
// - Default value: 0.0
// - No suffix required
// - Preferred for decimal numbers
\\\`\\\`\\\`

Use case: Default for decimal numbers. Higher precision than float.

### Character Type

**char** - Single Unicode character
\\\`\\\`\\\`java
char grade = 'A';
char symbol = '@';
char currency = '€';
char newline = '\\\\n';

// Characteristics:
// - Size: 16 bits (2 bytes)
// - Range: 0 to 65535 (Unicode)
// - Default value: '\\\\u0000' (null character)
// - Single quotes only (not double quotes)
\\\`\\\`\\\`

**Unicode values:**
\\\`\\\`\\\`java
char a = 97;                 // ASCII code for 'a'
char A = 65;                 // ASCII code for 'A'
char unicode = '\\\\u0041';      // Unicode escape for 'A'
\\\`\\\`\\\`

### Boolean Type

**boolean** - True or False
\\\`\\\`\\\`java
boolean isRaining = true;
boolean isAdult = false;
boolean isActive = (age >= 18);

// Characteristics:
// - Size: 1 bit (1 byte in memory)
// - Values: true or false only
// - Default value: false
// - Widely used in conditions
\\\`\\\`\\\`

## Type Widening (Automatic Conversion)

Automatic conversion from smaller to larger type (no data loss):

\\\`\\\`\\\`java
byte b = 10;
short s = b;        // byte → short (automatic)
int i = s;          // short → int (automatic)
long l = i;         // int → long (automatic)
float f = l;        // long → float (automatic)
double d = f;       // float → double (automatic)

System.out.println(d);  // 10.0
\\\`\\\`\\\`

**Widening hierarchy:**
\\\`
byte → short → int → long → float → double
  (8)   (16)   (32)   (64)   (32)    (64) bits
\\\`

## Type Narrowing (Explicit Casting)

Manual conversion from larger to smaller type (possible data loss):

\\\`\\\`\\\`java
double decimal = 3.14;
int integer = (int) decimal;        // Explicit cast needed
System.out.println(integer);        // 3 (decimal part lost)

long large = 1000000000000L;
int small = (int) large;            // May overflow
System.out.println(small);          // -727379968 (overflow!)
\\\`\\\`\\\`

## Default Values

When variables are declared but not initialized (in objects):

\\\`\\\`\\\`java
public class DefaultValues {
    int intVar;              // Default: 0
    double doubleVar;        // Default: 0.0
    float floatVar;          // Default: 0.0f
    long longVar;            // Default: 0L
    char charVar;            // Default: '\\\\u0000' (empty)
    boolean boolVar;         // Default: false
    
    public static void main(String[] args) {
        DefaultValues obj = new DefaultValues();
        System.out.println(obj.intVar);      // 0
        System.out.println(obj.boolVar);     // false
        System.out.println(obj.charVar == '\\\\u0000');  // true
    }
}

// Local variables in methods must be initialized before use
public void example() {
    int x;                    // Not initialized
    System.out.println(x);    // Compilation error!
    x = 5;                    // Now can use
}
\\\`\\\`\\\`

## Type Comparison Table

| Type | Size | Range | Default | Suffix |
|------|------|-------|---------|--------|
| byte | 8 bit | -128 to 127 | 0 | (none) |
| short | 16 bit | -32K to 32K | 0 | (none) |
| int | 32 bit | -2B to 2B | 0 | (none) |
| long | 64 bit | Very large | 0L | L |
| float | 32 bit | ±3.4e+38 | 0.0f | f |
| double | 64 bit | ±1.7e+308 | 0.0 | (none) |
| char | 16 bit | 0 to 65535 | '\\\\u0000' | (none) |
| boolean | 1 bit | true/false | false | (none) |

## Choosing the Right Data Type

\\\`\\\`\\\`java
// Age of a person (0-150) → byte
byte age = 25;

// Number of students in school (0-5000) → int
int studentCount = 3500;

// Population of country (1 billion+) → long
long population = 1400000000L;

// Price with cents → double (default for decimals)
double price = 19.99;

// Grade letter → char
char grade = 'A';

// Student enrolled status → boolean
boolean enrolled = true;

// Percentage (integer) → int
int percentageScore = 95;

// GPA (decimal, high precision) → double
double gpa = 3.75;
\\\`\\\`\\\`

## Common Mistakes

**Mistake 1: Missing L suffix for long**
\\\`\\\`\\\`java
// ✗ Wrong - Too large for int
long x = 1000000000000;      // Compilation error

// ✓ Right
long x = 1000000000000L;     // L suffix required
\\\`\\\`\\\`

**Mistake 2: Missing f suffix for float**
\\\`\\\`\\\`java
// ✗ Wrong - Double by default
float f = 3.14;              // Compilation error

// ✓ Right
float f = 3.14f;             // f suffix required
\\\`\\\`\\\`

**Mistake 3: Using double quotes for char**
\\\`\\\`\\\`java
// ✗ Wrong
char c = "A";                // String, not char

// ✓ Right
char c = 'A';                // Single quotes for char
\\\`\\\`\\\`

Now you understand primitive data types! Next, let's learn the String type.
\`
        },
        {
          title: 'Strings and String Methods',
          content: \`Strings are one of the most important data types. They represent text/sequences of characters.

## What is a String?

A String is an object that represents a sequence of characters:

\\\`\\\`\\\`java
String message = "Hello, World!";
String name = "Alice";
String empty = "";            // Empty string
String withSpaces = "  ";      // String with spaces
\\\`\\\`\\\`

**Important:** Unlike primitives, String is an object (reference type).

## Creating Strings

### String Literals (Preferred)
\\\`\\\`\\\`java
String str1 = "Hello";
String str2 = "World";

// Stored in String Pool (memory efficient)
// Reused if same value exists
\\\`\\\`\\\`

### Using new keyword
\\\`\\\`\\\`java
String str3 = new String("Hello");
String str4 = new String("World");

// Creates new object each time
// Uses more memory
// Not recommended
\\\`\\\`\\\`

## String Concatenation

### Using + operator (Most Common)
\\\`\\\`\\\`java
String firstName = "John";
String lastName = "Doe";
String fullName = firstName + " " + lastName;
System.out.println(fullName);  // John Doe

String greeting = "Hello, " + firstName + "!";
System.out.println(greeting);  // Hello, John!

// Concatenate with numbers
int age = 25;
String info = "I am " + age + " years old";
System.out.println(info);  // I am 25 years old

// Concatenate with boolean
boolean isStudent = true;
String status = "Student: " + isStudent;
System.out.println(status);  // Student: true
\\\`\\\`\\\`

### Using concat() method
\\\`\\\`\\\`java
String result = "Hello".concat(" ").concat("World");
System.out.println(result);  // Hello World

// More efficient for multiple concatenations
String str = "Java"
    .concat(" ")
    .concat("is")
    .concat(" ")
    .concat("awesome");
\\\`\\\`\\\`

### Using StringBuilder (Best for Loops)
\\\`\\\`\\\`java
StringBuilder sb = new StringBuilder();
sb.append("Hello");
sb.append(" ");
sb.append("World");
String result = sb.toString();
System.out.println(result);  // Hello World

// More efficient for many concatenations
StringBuilder message = new StringBuilder();
for (int i = 0; i < 100; i++) {
    message.append("Item ").append(i).append(", ");
}
\\\`\\\`\\\`

## Important String Methods

### Length
\\\`\\\`\\\`java
String text = "Java";
int length = text.length();
System.out.println(length);  // 4
\\\`\\\`\\\`

### Case Conversion
\\\`\\\`\\\`java
String text = "Hello World";
String upper = text.toUpperCase();
String lower = text.toLowerCase();

System.out.println(upper);  // HELLO WORLD
System.out.println(lower);  // hello world
\\\`\\\`\\\`

### Searching
\\\`\\\`\\\`java
String text = "Hello World";

// Find first occurrence
int index = text.indexOf("o");
System.out.println(index);  // 4

// Find last occurrence
int lastIndex = text.lastIndexOf("o");
System.out.println(lastIndex);  // 7

// Check if contains substring
boolean contains = text.contains("World");
System.out.println(contains);  // true

// Check starts/ends with
System.out.println(text.startsWith("Hello"));  // true
System.out.println(text.endsWith("World"));    // true
\\\`\\\`\\\`

### Extracting Parts
\\\`\\\`\\\`java
String text = "Hello World";

// Get character at index
char firstChar = text.charAt(0);
System.out.println(firstChar);  // H

// Get substring from start index
String sub1 = text.substring(0, 5);
System.out.println(sub1);  // Hello

// Get substring from index to end
String sub2 = text.substring(6);
System.out.println(sub2);  // World
\\\`\\\`\\\`

### Trimming
\\\`\\\`\\\`java
String text = "  Hello World  ";
String trimmed = text.trim();
System.out.println("'" + trimmed + "'");  // 'Hello World'

// Remove leading spaces only
String stripLeading = text.stripLeading();

// Remove trailing spaces only
String stripTrailing = text.stripTrailing();
\\\`\\\`\\\`

### Replacing
\\\`\\\`\\\`java
String text = "Hello World";
String replaced = text.replace("World", "Java");
System.out.println(replaced);  // Hello Java

// Replace first occurrence only
String replaced2 = text.replaceFirst("l", "L");
System.out.println(replaced2);  // HeLlo World

// Replace with regex pattern
String text2 = "apple apple banana apple";
String result = text2.replaceAll("apple", "orange");
System.out.println(result);  // orange orange banana orange
\\\`\\\`\\\`

### Splitting
\\\`\\\`\\\`java
String csv = "Alice,Bob,Charlie";
String[] names = csv.split(",");

for (String name : names) {
    System.out.println(name);
}
// Output:
// Alice
// Bob
// Charlie
\\\`\\\`\\\`

## String Comparison

### Using equals() - Exact match
\\\`\\\`\\\`java
String str1 = "Hello";
String str2 = "Hello";
String str3 = new String("Hello");

System.out.println(str1.equals(str2));      // true
System.out.println(str1.equals(str3));      // true (content same)

// Using == checks reference, not content
System.out.println(str1 == str2);           // true (same reference)
System.out.println(str1 == str3);           // false (different objects)
\\\`\\\`\\\`

**Important:** Always use equals() for String content comparison, not ==!

### Using equalsIgnoreCase()
\\\`\\\`\\\`java
String str1 = "Hello";
String str2 = "HELLO";

System.out.println(str1.equals(str2));           // false
System.out.println(str1.equalsIgnoreCase(str2)); // true
\\\`\\\`\\\`

### Using compareTo()
\\\`\\\`\\\`java
String str1 = "Apple";
String str2 = "Banana";

int result = str1.compareTo(str2);
System.out.println(result);  // Negative number (Apple < Banana)

// Return values:
// 0 if equal
// Negative if first < second
// Positive if first > second
\\\`\\\`\\\`

## Practical String Examples

### Validate Email Format
\\\`\\\`\\\`java
String email = "user@example.com";

if (email.contains("@") && email.contains(".")) {
    System.out.println("Valid email format");
} else {
    System.out.println("Invalid email");
}
\\\`\\\`\\\`

### Extract Domain from Email
\\\`\\\`\\\`java
String email = "john.doe@gmail.com";

int atIndex = email.indexOf("@");
String domain = email.substring(atIndex + 1);
System.out.println(domain);  // gmail.com
\\\`\\\`\\\`

### Check if String is Palindrome
\\\`\\\`\\\`java
String text = "racecar";

String reversed = new StringBuilder(text).reverse().toString();
if (text.equals(reversed)) {
    System.out.println("Palindrome!");
} else {
    System.out.println("Not a palindrome");
}
\\\`\\\`\\\`

### Format Names Properly
\\\`\\\`\\\`java
String name = "alice johnson";

String formatted = name.substring(0, 1).toUpperCase() + 
                   name.substring(1).toLowerCase();
System.out.println(formatted);  // Alice johnson
\\\`\\\`\\\`

### Count Occurrences
\\\`\\\`\\\`java
String text = "apple apple banana apple";
int count = text.split("apple").length - 1;
System.out.println("Count: " + count);  // Count: 3
\\\`\\\`\\\`

## Common String Mistakes

**Mistake 1: Using == for comparison**
\\\`\\\`\\\`java
String s1 = "Hello";
String s2 = new String("Hello");

// ✗ Wrong
if (s1 == s2) {             // false! Different objects
    System.out.println("Equal");
}

// ✓ Right
if (s1.equals(s2)) {        // true! Same content
    System.out.println("Equal");
}
\\\`\\\`\\\`

**Mistake 2: Forgetting null check**
\\\`\\\`\\\`java
String text = null;

// ✗ Wrong - NullPointerException
int length = text.length();

// ✓ Right
if (text != null) {
    int length = text.length();
}
\\\`\\\`\\\`

**Mistake 3: Strings are immutable**
\\\`\\\`\\\`java
String text = "Hello";
text.toUpperCase();         // Creates new string
System.out.println(text);   // Still "Hello"

// ✓ Right
text = text.toUpperCase();  // Reassign
System.out.println(text);   // "HELLO"
\\\`\\\`\\\`

Now you understand Strings thoroughly! Let's learn variables and operators.
\`
        }
      ]
    }
  ]
}
`;
