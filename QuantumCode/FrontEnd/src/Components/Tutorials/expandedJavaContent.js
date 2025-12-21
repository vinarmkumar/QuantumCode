// This is a detailed Java content expansion to add to tutorialData.js
// To be merged with existing content

export const expandedJavaContent = {
  title: 'Java Tutorials - Comprehensive',
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
          content: `Java is a high-level, object-oriented programming language that was created by James Gosling at Sun Microsystems (now owned by Oracle) in 1995. It has become one of the most popular programming languages in the world.

## Key Characteristics of Java

**Platform Independence (WORA - Write Once, Run Anywhere)**

Java programs are compiled into bytecode that can run on any device with a Java Virtual Machine (JVM):
• Source code (.java) → Compile → Bytecode (.class)
• JVM → Interprets bytecode → Runs on any platform
• No need to recompile for different operating systems
• This is a major advantage for enterprise applications

\`\`\`
Windows/Linux/Mac
     ↓
Java Compiler (javac)
     ↓
Bytecode (.class)
     ↓
JVM (Windows/Linux/Mac)
     ↓
Platform-specific execution
\`\`\`

**Object-Oriented Programming (OOP)**

Java is fundamentally object-oriented:
• Everything is organized as objects
• Supports classes, inheritance, polymorphism
• Encapsulation for data hiding
• Abstraction for complexity management

\`\`\`java
// Example of OOP in Java
class Car {
    private String color;
    private int speed;
    
    public Car(String color) {
        this.color = color;
    }
    
    public void drive() {
        System.out.println("Driving " + color + " car");
    }
}

public class Main {
    public static void main(String[] args) {
        Car mycar = new Car("Red");
        mycar.drive();  // Output: Driving Red car
    }
}
\`\`\`

**Secure and Robust**

Security features built into Java:
• Strong type checking at compile time
• Automatic memory management (Garbage Collection)
• No pointer arithmetic (eliminates buffer overflow)
• Exception handling built-in
• Runtime error checking

## Java vs Other Languages

| Feature | Java | C++ | Python |
|---------|------|-----|--------|
| Platform Independent | ✓ | ✗ | ✓ |
| Compiled/Interpreted | Both | Compiled | Interpreted |
| Memory Management | Automatic | Manual | Automatic |
| Learning Curve | Medium | Steep | Easy |
| Performance | Fast | Very Fast | Slower |
| Enterprise Use | Excellent | Good | Growing |

## Why Companies Use Java

**Tech Giants:**
• Google - Infrastructure and backend systems
• Netflix - Streaming service backend
• Facebook - Large-scale systems
• Amazon AWS - Cloud services
• Twitter - High-traffic systems

**Industries:**
• Banking & Finance - Secure, robust systems
• E-commerce - Large-scale applications
• Healthcare - Critical systems
• Government - Enterprise applications
• Telecommunications - Complex systems

## Java Editions

**Java SE (Standard Edition)**
• Core Java for desktop and console applications
• What we'll focus on in this tutorial
• Foundation for other editions

**Java EE (Enterprise Edition)**
• Building large-scale enterprise applications
• Web services, distributed systems
• Advanced features for business logic

**Java ME (Micro Edition)**
• Mobile and embedded devices
• Limited resources
• Smaller footprint

## Your Learning Path

This comprehensive tutorial covers:
1. **Basics** - Syntax, data types, variables
2. **Control Flow** - If-else, loops, switch statements
3. **Object-Oriented Concepts** - Classes, objects, inheritance
4. **Collections** - Lists, sets, maps
5. **Advanced Topics** - Exceptions, file handling, threading
6. **Project Building** - Real-world applications

By the end, you'll be able to build professional Java applications!`
        },
        {
          title: 'Setting Up Java',
          content: `Getting Java installed and ready to code is straightforward. Let me guide you through the complete process.

## Step 1: Download the JDK

**What is JDK?**
• JDK = Java Development Kit
• Contains compiler (javac), runtime (JVM), and libraries
• Essential for Java development
• Download from Oracle's official website

**How to Download:**
1. Visit https://www.oracle.com/java/technologies/downloads/
2. Click on "JDK 21" or the latest version
3. Accept the license agreement
4. Choose your operating system:
   - Windows (64-bit recommended)
   - macOS
   - Linux

**File Size:** Approximately 150-200 MB

## Step 2: Install JDK

### Windows Installation

1. Run the installer (.exe file)
2. Click "Next" to proceed
3. Choose installation location (default is fine)
4. Complete the installation
5. Installation creates:
   - bin/ folder (contains javac, java commands)
   - lib/ folder (Java libraries)
   - include/ folder (header files)

### Mac Installation

\`\`\`bash
# Using Homebrew (easiest)
brew install openjdk

# Or download .dmg and run installer
\`\`\`

### Linux Installation

\`\`\`bash
# Debian/Ubuntu
sudo apt update
sudo apt install default-jdk

# RedHat/CentOS
sudo yum install java-latest-openjdk
\`\`\`

## Step 3: Set Up Environment Variables

### Windows

\`Set JAVA_HOME:
1. Right-click "This PC" → Properties
2. Click "Advanced system settings"
3. Click "Environment Variables"
4. Under System variables, click "New"
5. Variable name: JAVA_HOME
6. Variable value: C:\\Program Files\\Java\\jdk-21 (your installation path)
7. Click OK

Update PATH:
1. In Environment Variables, find PATH
2. Click Edit
3. Click New
4. Add: %JAVA_HOME%\\bin
5. Click OK
\`\`\`

### Mac/Linux

\`\`\`bash
# Add to ~/.zshrc or ~/.bashrc
export JAVA_HOME=$(/usr/libexec/java_home)
export PATH=$JAVA_HOME/bin:$PATH

# Reload
source ~/.zshrc
\`\`\`

## Step 4: Verify Installation

Open terminal/command prompt and run:

\`\`\`bash
java -version
javac -version
\`\`\`

Expected output:
\`\`\`
java version "21.0.1" 2023-10-17 LTS
Java(TM) SE Runtime Environment (build 21.0.1+12-LTS-29)
Java HotSpot(TM) 64-Bit Server VM (build 21.0.1+12-LTS-29, mixed mode, sharing)
\`\`\`

## Step 5: Set Up IDE (Optional but Recommended)

### IntelliJ IDEA (Recommended)
- Download from https://www.jetbrains.com/idea/
- Free Community Edition available
- Features:
  - Code completion
  - Debugging tools
  - Built-in terminal
  - Project management

### Eclipse
- Download from https://www.eclipse.org/
- Free and open-source
- Good for beginners
- Lightweight

### VS Code
- Download from https://code.visualstudio.com/
- Install Extension Pack for Java
- Lightweight but powerful
- Good for learning

## Step 6: Write Your First Program

Create a file called \`HelloWorld.java\`:

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
\`\`\`

## Step 7: Compile and Run

\`\`\`bash
# Compile
javac HelloWorld.java

# This creates HelloWorld.class

# Run
java HelloWorld

# Output:
# Hello, Java!
\`\`\`

## Troubleshooting

**Problem: 'javac' is not recognized**
• JAVA_HOME not set correctly
• Check environment variables
• Restart terminal after setting JAVA_HOME

**Problem: 'java' command not found**
• JDK not installed properly
• Add JDK bin folder to PATH
• Verify installation with java -version

**Problem: FileNotFound when running**
• Check filename matches class name
• Ensure .class file exists in same directory
• Use correct case (HelloWorld, not helloworld)

## Java Development Workflow

\`\`\`
1. Write code (.java file)
   ↓
2. Compile with javac
   ↓
3. Creates bytecode (.class file)
   ↓
4. Run with java command
   ↓
5. JVM executes bytecode
   ↓
6. Program output
\`\`\`

## Next Steps

Now that Java is installed, you're ready to:
• Learn Java syntax and basics
• Understand data types and variables
• Master object-oriented programming
• Build real applications

Let's continue with the fundamentals!`
        },
        {
          title: 'Java Program Structure',
          content: `Understanding how Java programs are organized is fundamental to writing good code.

## Anatomy of a Java Program

\`\`\`java
// This is a comment - compiler ignores it
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

**Breaking it down:**

**1. Class Declaration**
\`\`\`java
public class HelloWorld {
    // Class body
}
\`\`\`
• \`public\` - Accessible from anywhere
• \`class\` - Declares a class
• \`HelloWorld\` - Class name (must match filename)
• \`{ }\` - Class body

**2. Main Method**
\`\`\`java
public static void main(String[] args) {
    // Code here executes when program runs
}
\`\`\`
• \`public\` - Accessible everywhere
• \`static\` - Belongs to class, not objects
• \`void\` - Doesn't return any value
• \`main\` - Entry point of program
• \`String[] args\` - Command-line arguments array

**3. Statements**
\`\`\`java
System.out.println("Hello, World!");
\`\`\`
• \`System\` - Class from Java library
• \`out\` - Output stream
• \`println\` - Print with newline
• Each statement ends with \`;

## File Naming Rules

Important rules:
• Filename must match public class name
• Extension must be .java
• Case-sensitive (HelloWorld.java, not helloworld.java)

\`\`\`
✓ Correct:
public class MyProgram { }    → Save as MyProgram.java

✗ Wrong:
public class MyProgram { }    → Saved as myprogram.java (error!)
\`\`\`

## Comments in Java

Comments document code and are ignored by compiler:

\`\`\`java
// Single-line comment
// Useful for short explanations

/*
 Multi-line comment
 Useful for longer explanations
 Can span multiple lines
*/

/**
 * Javadoc comment
 * Used for generating documentation
 * Includes special tags like @param, @return
 */
public void myMethod() {
    int x = 5;  // This is a variable
}
\`\`\`

## Blocks and Indentation

Java uses braces {} to define blocks:

\`\`\`java
public class Example {
    public static void main(String[] args) {
        if (5 > 3) {
            System.out.println("5 is greater");
        }
    }
}
\`\`\`

**Indentation Best Practices:**
• Use 4 spaces or 1 tab per level
• Improves readability
• Not required by Java, but strongly recommended
• Most IDEs auto-indent

## Naming Conventions

Follow Java naming standards:

\`\`\`java
// Classes: PascalCase
public class Student { }
public class DatabaseConnection { }

// Methods: camelCase
public void calculateGrade() { }
public String getStudentName() { }

// Variables: camelCase
int studentAge = 20;
String firstName = "Alice";

// Constants: UPPER_CASE
final int MAX_STUDENTS = 100;
final double PI = 3.14159;
\`\`\`

## Keywords (Reserved Words)

These words have special meaning in Java:

**Control Flow:**
\`if, else, switch, case, break, default\`

**Loops:**
\`for, while, do\`

**OOP:**
\`class, interface, extends, implements, this, super\`

**Access Modifiers:**
\`public, private, protected, default\`

**Data Types:**
\`int, double, boolean, String, void\`

**Other:**
\`static, final, try, catch, throw, new, import\`

\`\`\`java
// ✓ Valid names
int age = 25;
String message = "Hello";

// ✗ Invalid - using keywords
int if = 10;           // Error: if is keyword
String class = "A";    // Error: class is keyword
\`\`\`

## Program Execution Flow

When you run a Java program:

\`\`\`
1. JVM loads the .class file
2. Looks for main() method
3. Executes main() line by line
4. Exits when main() completes

public class Sequence {
    public static void main(String[] args) {
        System.out.println("1");   // Prints first
        System.out.println("2");   // Prints second
        System.out.println("3");   // Prints third
        // Program ends
    }
}

Output:
1
2
3
\`\`\`

## Different Program Structures

**Simple Single-File Program:**
\`\`\`java
public class Calculator {
    public static void main(String[] args) {
        int result = 5 + 3;
        System.out.println("Result: " + result);
    }
}
\`\`\`

**Multiple Methods:**
\`\`\`java
public class MathOperations {
    public static void main(String[] args) {
        int sum = add(5, 3);
        System.out.println("Sum: " + sum);
    }
    
    public static int add(int a, int b) {
        return a + b;
    }
}
\`\`\`

**Multiple Classes (advanced):**
\`\`\`java
// Student.java
public class Student {
    String name;
    int age;
}

// School.java
public class School {
    public static void main(String[] args) {
        Student student = new Student();
        student.name = "Alice";
        student.age = 20;
    }
}
\`\`\`

## Common Mistakes

**Mistake 1: Forgetting class declaration**
\`\`\`java
// ✗ Wrong
public static void main(String[] args) {
    System.out.println("Hello");
}

// ✓ Right
public class MyClass {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}
\`\`\`

**Mistake 2: Wrong filename**
\`\`\`java
// This class is named Main
public class Main {
    public static void main(String[] args) { }
}

// Must save as: Main.java (not main.java or myfile.java)
\`\`\`

**Mistake 3: Forgetting semicolons**
\`\`\`java
// ✗ Wrong
System.out.println("Hello")    // Syntax error

// ✓ Right
System.out.println("Hello");   // Correct
\`\`\`

Now you understand the structure of Java programs. Let's dive deeper into data types and variables!`
        }
      ]
    },
    {
      id: 'java-basics',
      title: 'Java Data Types and Variables',
      topics: [
        {
          title: 'Primitive Data Types',
          content: `Java has 8 primitive data types. Understanding them is essential for working with data.

## Integer Types

**byte** - 8-bit signed integer
\`\`\`java
byte age = 25;
byte temperature = -10;
byte range: -128 to 127

// Usage: Save memory for small numbers
byte[] pixelData = new byte[1024]; // Common in graphics
\`\`\`

**short** - 16-bit signed integer
\`\`\`java
short year = 2025;
short population = 5000;
short range: -32,768 to 32,767

// Usage: Less common, mainly for arrays
short[] audioSamples = new short[44100];
\`\`\`

**int** - 32-bit signed integer (Most commonly used!)
\`\`\`java
int count = 100;
int population = 1000000;
int range: -2,147,483,648 to 2,147,483,647

// Usage: Default choice for integers
int age = 25;
int salary = 50000;
int[] numbers = new int[10];
\`\`\`

**long** - 64-bit signed integer
\`\`\`java
long largeNumber = 1000000000000L;
long distance = 384400L;
long range: -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807

// Usage: Very large numbers
long fileSize = 5000000000L;     // 5 GB
long nanoTime = System.nanoTime();
\`\`\`

## Floating-Point Types

**float** - 32-bit decimal number
\`\`\`java
float price = 19.99f;      // Note: 'f' suffix required
float temperature = 98.6f;
float range: ±1.4e-45 to ±3.4e+38

// Usage: When memory is critical
float[] prices = new float[1000];
\`\`\`

**double** - 64-bit decimal number (Most common for decimals!)
\`\`\`java
double pi = 3.14159;
double salary = 50000.50;
double range: ±4.9e-324 to ±1.7e+308

// Usage: Default for decimal numbers
double result = Math.sqrt(16);  // 4.0
double average = totalScore / count;
\`\`\`

## Boolean Type

**boolean** - True or False
\`\`\`java
boolean isRaining = true;
boolean hasLicense = false;
boolean isAdult = age >= 18;

// Usage: Conditions and flags
if (isRaining) {
    System.out.println("Bring an umbrella");
}
\`\`\`

## Character Type

**char** - Single character (16-bit Unicode)
\`\`\`java
char grade = 'A';
char symbol = '@';
char currency = '€';

// Unicode values
char a = 97;         // 'a'
char unicode = '\u0041';  // 'A'

// Usage: Storing single characters
char firstLetter = 'J';
char[] letters = {'H', 'e', 'l', 'l', 'o'};
\`\`\`

## Type Conversion (Casting)

**Automatic (Widening) - Smaller to Larger**
\`\`\`java
// Safe conversion, done automatically
int intValue = 100;
long longValue = intValue;          // int → long (automatic)
double doubleValue = intValue;      // int → double (automatic)

// Works fine
byte b = 10;
int i = b;  // No error
\`\`\`

**Manual (Narrowing) - Larger to Smaller**
\`\`\`java
// Potential data loss, must be explicit
double decimal = 3.14;
int integer = (int) decimal;        // 3 (decimal part lost)

long large = 1000L;
byte small = (byte) large;          // Casted to byte

System.out.println(integer);  // 3
System.out.println(small);    // 232 (overflow)
\`\`\`

## Default Values

When variables are declared but not initialized:

\`\`\`java
public class DefaultValues {
    int intVar;              // Default: 0
    double doubleVar;        // Default: 0.0
    boolean boolVar;         // Default: false
    char charVar;            // Default: '\\u0000' (empty)
    String stringVar;        // Default: null
    
    public static void main(String[] args) {
        DefaultValues obj = new DefaultValues();
        System.out.println(obj.intVar);      // 0
        System.out.println(obj.boolVar);     // false
    }
}
\`\`\`

## Type Comparison Table

| Type | Size | Range | Default |
|------|------|-------|---------|
| byte | 8 bits | -128 to 127 | 0 |
| short | 16 bits | -32K to 32K | 0 |
| int | 32 bits | -2B to 2B | 0 |
| long | 64 bits | Very large | 0L |
| float | 32 bits | ±3.4e+38 | 0.0f |
| double | 64 bits | ±1.7e+308 | 0.0 |
| char | 16 bits | 0 to 65535 | '\\u0000' |
| boolean | 1 bit | true/false | false |

## Choosing the Right Type

\`\`\`java
// Age of person → byte (small number)
byte age = 25;

// Population of country → long (large number)
long population = 1000000000L;

// Price with cents → double (decimals)
double price = 19.99;

// Grade letter → char (single character)
char grade = 'A';

// Student enrolled → boolean (yes/no)
boolean enrolled = true;

// Count of items → int (most common)
int count = 50;
\`\`\`

Now you understand primitive data types. Let's learn about the reference type: String!`
        },
        {
          title: 'Working with Strings',
          content: `Strings are one of the most important data types in Java. They represent text data.

## What is a String?

A string is a sequence of characters:

\`\`\`java
String message = "Hello, World!";
String name = "Alice";
String sentence = "Java is fun!";

// Important: String is an object, not primitive
\`\`\`

## Creating Strings

**String Literals**
\`\`\`java
String str1 = "Hello";
String str2 = "World";
\`\`\`

**Using the new keyword**
\`\`\`java
String str3 = new String("Hello");
String str4 = new String("World");

// Note: Both work, but String literals are preferred
\`\`\`

## String Concatenation

**Using + operator**
\`\`\`java
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
\`\`\`

**Using concat() method**
\`\`\`java
String result = "Hello".concat(" ").concat("World");
System.out.println(result);  // Hello World
\`\`\`

## String Methods

**Finding Length**
\`\`\`java
String text = "Java";
int length = text.length();
System.out.println(length);  // 4
\`\`\`

**Converting Case**
\`\`\`java
String text = "Hello World";
String upper = text.toUpperCase();
String lower = text.toLowerCase();

System.out.println(upper);  // HELLO WORLD
System.out.println(lower);  // hello world
\`\`\`

**Searching in Strings**
\`\`\`java
String text = "Hello World";

// Find first occurrence
int index = text.indexOf("o");
System.out.println(index);  // 4

// Find last occurrence
int lastIndex = text.lastIndexOf("o");
System.out.println(lastIndex);  // 7

// Check if contains
boolean contains = text.contains("World");
System.out.println(contains);  // true
\`\`\`

**Extracting Parts**
\`\`\`java
String text = "Hello World";

// Get character at index
char ch = text.charAt(0);
System.out.println(ch);  // H

// Get substring
String sub1 = text.substring(0, 5);
System.out.println(sub1);  // Hello

String sub2 = text.substring(6);
System.out.println(sub2);  // World
\`\`\`

**Trimming Whitespace**
\`\`\`java
String text = "  Hello World  ";
String trimmed = text.trim();
System.out.println("'" + trimmed + "'");  // 'Hello World'
\`\`\`

**Replacing Text**
\`\`\`java
String text = "Hello World";
String replaced = text.replace("World", "Java");
System.out.println(replaced);  // Hello Java

// Replace all with regex
String text2 = "apple apple banana apple";
String result = text2.replaceAll("apple", "orange");
System.out.println(result);  // orange orange banana orange
\`\`\`

**Splitting Strings**
\`\`\`java
String csv = "Alice,Bob,Charlie";
String[] names = csv.split(",");

for (String name : names) {
    System.out.println(name);
}
// Output:
// Alice
// Bob
// Charlie
\`\`\`

## String Comparison

**Using equals() - Exact match**
\`\`\`java
String str1 = "Hello";
String str2 = "Hello";
String str3 = new String("Hello");

System.out.println(str1.equals(str2));  // true
System.out.println(str1.equals(str3));  // true
\`\`\`

**Using equalsIgnoreCase() - Case-insensitive**
\`\`\`java
String str1 = "Hello";
String str2 = "HELLO";

System.out.println(str1.equals(str2));           // false
System.out.println(str1.equalsIgnoreCase(str2)); // true
\`\`\`

**Using compareTo() - Lexicographic order**
\`\`\`java
String str1 = "Apple";
String str2 = "Banana";

int result = str1.compareTo(str2);
System.out.println(result);  // Negative (Apple < Banana)

// 0 if equal
// Negative if first < second
// Positive if first > second
\`\`\`

## Practical Examples

**Check Password Strength**
\`\`\`java
String password = "SecurePass123!";

boolean hasLength = password.length() >= 8;
boolean hasUpper = password.matches(".*[A-Z].*");
boolean hasLower = password.matches(".*[a-z].*");
boolean hasDigit = password.matches(".*\\\\d.*");

boolean isStrong = hasLength && hasUpper && hasLower && hasDigit;

if (isStrong) {
    System.out.println("✓ Strong password");
} else {
    System.out.println("✗ Weak password");
}
\`\`\`

**Extract Email Domain**
\`\`\`java
String email = "user@example.com";

if (email.contains("@")) {
    int atIndex = email.indexOf("@");
    String domain = email.substring(atIndex + 1);
    System.out.println(domain);  // example.com
}
\`\`\`

**Format Personal Information**
\`\`\`java
String name = "alice johnson";
String formatted = name.substring(0, 1).toUpperCase() + 
                   name.substring(1).toLowerCase();
System.out.println(formatted);  // Alice johnson
\`\`\`

You now understand strings thoroughly! Next, let's master objects and classes!`
        }
      ]
    },
    {
      id: 'java-oop',
      title: 'Object-Oriented Programming',
      topics: [
        {
          title: 'Classes and Objects',
          content: `Classes and objects are the foundation of Java's object-oriented programming paradigm.

## What are Classes and Objects?

**Class:** A blueprint or template for creating objects
**Object:** An instance created from a class

Think of a class as a cookie cutter and objects as the cookies made from it.

\`\`\`java
// Class: Cookie Cutter (blueprint)
public class Student {
    String name;
    int age;
    double gpa;
}

// Objects: Actual Cookies
Student alice = new Student();
Student bob = new Student();
Student charlie = new Student();
\`\`\`

## Creating a Simple Class

\`\`\`java
public class Car {
    // Attributes (data members)
    String color;
    String model;
    int year;
    
    // Method (behavior)
    void drive() {
        System.out.println("Driving " + color + " " + model);
    }
    
    void stop() {
        System.out.println("Car stopped");
    }
}

// Create objects
Car mycar = new Car();
mycar.color = "Red";
mycar.model = "Tesla";
mycar.year = 2023;

mycar.drive();  // Output: Driving Red Tesla
\`\`\`

## Constructors

Constructors initialize objects when they're created:

\`\`\`java
public class Student {
    String name;
    int age;
    
    // Constructor (same name as class)
    public Student(String name, int age) {
        this.name = name;    // 'this' refers to current object
        this.age = age;
    }
    
    void display() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}

// Create objects using constructor
Student alice = new Student("Alice", 20);
Student bob = new Student("Bob", 21);

alice.display();  // Name: Alice, Age: 20
bob.display();    // Name: Bob, Age: 21
\`\`\`

## Multiple Constructors (Constructor Overloading)

\`\`\`java
public class Person {
    String name;
    int age;
    String city;
    
    // Constructor 1: No parameters
    public Person() {
        this.name = "Unknown";
        this.age = 0;
        this.city = "Unknown";
    }
    
    // Constructor 2: Name only
    public Person(String name) {
        this.name = name;
        this.age = 0;
        this.city = "Unknown";
    }
    
    // Constructor 3: Name and age
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
        this.city = "Unknown";
    }
    
    // Constructor 4: All parameters
    public Person(String name, int age, String city) {
        this.name = name;
        this.age = age;
        this.city = city;
    }
}

// Use different constructors
Person p1 = new Person();
Person p2 = new Person("Alice");
Person p3 = new Person("Bob", 25);
Person p4 = new Person("Charlie", 30, "New York");
\`\`\`

## Access Modifiers

Control who can access class members:

\`\`\`java
public class BankAccount {
    private String accountNumber;    // Only within this class
    private double balance;
    
    protected String holderName;     // This class + subclasses
    
    public String accountType;       // Accessible from anywhere
    
    public void deposit(double amount) {
        balance += amount;  // Private member accessed within class
    }
    
    public double getBalance() {
        return balance;
    }
}

// Usage
BankAccount account = new BankAccount();
account.accountType = "Savings";                // ✓ Allowed
// account.balance = 1000;                      // ✗ Error: private
// account.accountNumber = "123456789";        // ✗ Error: private
\`\`\`

## Getters and Setters

Provide controlled access to private members:

\`\`\`java
public class Employee {
    private String name;
    private int salary;
    
    // Constructor
    public Employee(String name, int salary) {
        this.name = name;
        this.salary = salary;
    }
    
    // Getter for name
    public String getName() {
        return name;
    }
    
    // Setter for name
    public void setName(String name) {
        if (name != null && !name.isEmpty()) {
            this.name = name;
        }
    }
    
    // Getter for salary
    public int getSalary() {
        return salary;
    }
    
    // Setter for salary with validation
    public void setSalary(int salary) {
        if (salary > 0) {
            this.salary = salary;
        }
    }
}

// Usage
Employee emp = new Employee("Alice", 50000);
System.out.println(emp.getName());      // Alice
emp.setName("Bob");
System.out.println(emp.getName());      // Bob

emp.setSalary(-1000);                   // Invalid, not set
System.out.println(emp.getSalary());    // 50000 (unchanged)
\`\`\`

## toString() Method

Provide a string representation of an object:

\`\`\`java
public class Student {
    String name;
    int rollNo;
    double gpa;
    
    public Student(String name, int rollNo, double gpa) {
        this.name = name;
        this.rollNo = rollNo;
        this.gpa = gpa;
    }
    
    // Override toString()
    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\\'' +
                ", rollNo=" + rollNo +
                ", gpa=" + gpa +
                '}';
    }
}

// Usage
Student s = new Student("Alice", 101, 3.8);
System.out.println(s);  // Student{name='Alice', rollNo=101, gpa=3.8}
\`\`\`

## Practical Example: Bank Account Class

\`\`\`java
public class BankAccount {
    private String accountNumber;
    private String holderName;
    private double balance;
    
    public BankAccount(String accountNumber, String holderName) {
        this.accountNumber = accountNumber;
        this.holderName = holderName;
        this.balance = 0.0;
    }
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: ₹" + amount);
        }
    }
    
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: ₹" + amount);
        } else {
            System.out.println("Invalid withdrawal");
        }
    }
    
    public double getBalance() {
        return balance;
    }
    
    public void displayInfo() {
        System.out.println("Account Number: " + accountNumber);
        System.out.println("Holder Name: " + holderName);
        System.out.println("Balance: ₹" + balance);
    }
}

// Usage
BankAccount account = new BankAccount("123456789", "Alice");
account.deposit(5000);
account.withdraw(1000);
account.displayInfo();

// Output:
// Deposited: ₹5000.0
// Withdrawn: ₹1000.0
// Account Number: 123456789
// Holder Name: Alice
// Balance: ₹4000.0
\`\`\`

Now you understand classes and objects! Next, let's learn inheritance!`
        }
      ]
    }
  ]
}
