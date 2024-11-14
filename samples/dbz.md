# 2. Defining and Using Classes

If you do not have prior Java experience, we recommend that you work through the exercises in [HW0](http://sp19.datastructur.es/materials/hw/hw0/hw0.html) before reading this chapter. It will cover various syntax issues that we will not discuss in the book.

#### Static vs. Non-Static Methods <a href="#static-vs-non-static-methods" id="static-vs-non-static-methods"></a>

**Static Methods**

In the world of Java programming, much like the world of Dragon Ball Z, everything revolves around powerful entities known as classes. Just as every Z fighter has their unique abilities and techniques, every piece of code in Java must belong to a class. Most of the action happens inside methods, which are like the special moves of a class. Let's dive into an example to see this in action.

```java
public class Saiyan {
    public static void powerUp() {
        System.out.println("Kamehameha!");
    }
}
```

If we try to run the `Saiyan` class directly, we'll encounter an error message, much like a Saiyan trying to power up without proper training:

```
$ java Saiyan
Error: Main method not found in class Saiyan, please define the main method as:
       public static void main(String[] args)
```

The `Saiyan` class we've defined is like Goku preparing to unleash a Kamehameha. We've defined what the Saiyan **can** do, but to actually see it in action, we need to initiate it properly. This is similar to needing a main method to start the process. We can either add a main method to the `Saiyan` class or create a separate `SaiyanLauncher` class to execute the `powerUp` method. Here's how we can do it:

```java
public class SaiyanLauncher {
    public static void main(String[] args) {
        Saiyan.powerUp();
    }
}
```

```
$ java SaiyanLauncher
Kamehameha!
```

A class that uses another class is sometimes called a "client" of that class, i.e. `DogLauncher` is a client of `Dog`. Neither of the two techniques is better: Adding a main method to `Dog` may be better in some situations, and creating a client class like `DogLauncher` may be better in others. The relative advantages of each approach will become clear as we gain additional practice throughout the course.

**Instance Variables and Object Instantiation**

Not all Saiyans are alike. Some Saiyans, like Goku, have a cheerful and energetic aura, while others, like Vegeta, have a more intense and powerful presence, bringing awe to all who witness their might. Often, we write programs to mimic features of the universe we inhabit, and Java's syntax was crafted to easily allow such mimicry.

One approach to allowing us to represent the spectrum of Dogdom would be to create separate classes for each type of Dog.

```java
public class Goku {
    public static void powerUp() {
        System.out.println("Kamehameha!");
    }
}

public class Vegeta {
    public static void powerUp() {
        System.out.println("Final Flash!");
    }
}
```

As you should have seen in the past, classes can be instantiated, and instances can hold data. This leads to a more natural approach, where we create instances of the `Dog` class and make the behavior of the `Dog` methods contingent upon the properties of the specific `Dog`. To make this more concrete, consider the class below:

```java
public class Saiyan {
    public int powerLevel;
    public void powerUp() {
        if (powerLevel < 1000) {
            System.out.println("Kamehameha!");
        } else if (powerLevel < 5000) {
            System.out.println("Galick Gun!");
        } else {
            System.out.println("Final Flash!");
        }
    }    
}
```

As an example of using such a Saiyan, consider:

```java
public class SaiyanLauncher {
    public static void main(String[] args) {
        Saiyan goku;
        goku = new Saiyan();
        goku.powerLevel = 3000;
        goku.powerUp();
    }
}
```

When run, this program will create a `Saiyan` with a power level of 3000, and that `Saiyan` will soon unleash a mighty "Galick Gun!".

Some key observations and terminology:

* An `Object` in Java is an instance of any class.

* The `Saiyan` class has its own variables, also known as _instance variables_ or _non-static variables_. These must be declared inside the class, unlike languages like Python or Matlab, where new variables can be added at runtime.

* The method that we created in the `Dog` class did not have the `static` keyword. We call such methods _instance methods_ or _non-static methods_.

* To call the `powerUp` method, we had to first _instantiate_ a `Saiyan` using the `new` keyword, and then make a specific `Saiyan` power up. In other words, we called `goku.powerUp()` instead of `Saiyan.powerUp()`.

* Once an object has been instantiated, it can be _assigned_ to a _declared_ variable of the appropriate type, e.g. `goku = new Saiyan();`

* Variables and methods of a class are also called _members_ of a class.

* Members of a class are accessed using _dot notation_.

,**Constructors in Java**,As you've hopefully seen before, we usually construct objects in object oriented languages using a _constructor_:

```java
public class SaiyanLauncher {
    public static void main(String[] args) {
        Saiyan goku = new Saiyan(9001);
        goku.powerUp();
    }
}
```

In this example, the instantiation of a Saiyan is parameterized, allowing us to easily set the initial power level without manually assigning it to each instance variable. This is akin to how Saiyans can quickly power up to their desired level. To enable this syntax, we need to add a "constructor" to our Saiyan class, as shown below:

```java
public class Saiyan {
    public int powerLevel;
    public Saiyan(int pl) {
        powerLevel = pl;
    }
    public void powerUp() {
        if (powerLevel < 1000) {
            System.out.println("Kamehameha!");
        } else if (powerLevel < 10000) {
            System.out.println("Kaio-ken!");
        } else {
            System.out.println("Super Saiyan!");
        }    
    }
}
```

The constructor with signature `public Dog(int w)` will be invoked anytime that we try to create a `Dog` using the `new` keyword and a single integer parameter. For those of you coming from Python, the constructor is very similar to the `__init__` method.

**Terminology Summary**

**Array Instantiation, Arrays of Objects**

In the world of Java programming, creating arrays is akin to summoning the power of the Dragon Balls. Just as the Dragon Balls are brought together to summon Shenron, arrays in Java are instantiated using the `new` keyword to bring together a collection of elements. This is a fundamental concept that allows you to store and manipulate multiple values efficiently.

```java
public class ArrayDemo {
    public static void main(String[] args) {
        // Imagine this array as a team of Z Fighters, ready for action.
        int[] zFighterPowerLevels = new int[5];
        zFighterPowerLevels[0] = 9001; // It's over 9000!
        zFighterPowerLevels[1] = 8000; // Another powerful warrior.
    }
}
```

Similarly, we can create arrays of instantiated objects in Java, just like how the Z Fighters might form a team to take on a new threat. Imagine each object in the array as a powerful warrior ready to fight.

```java
public class SaiyanArrayDemo {
    public static void main(String[] args) {
        /* Create an array of two Saiyans. */
        Saiyan[] saiyans = new Saiyan[2];
        saiyans[0] = new Saiyan("Goku", 9001);
        saiyans[1] = new Saiyan("Vegeta", 8500);
        /* Goku will power up, since saiyans[0] is Goku with a power level over 9000. */
        saiyans[0].powerUp();
    }
}
```

Observe that `new` is used in two different ways: Once to create an array that can hold two `Saiyan` objects, and twice to create each actual `Saiyan`. Just like how the Capsule Corp might prepare a space for the Saiyans to train, and then each Saiyan steps in to power up individually.

#### Class Methods vs. Instance Methods <a href="#class-methods-vs-instance-methods" id="class-methods-vs-instance-methods"></a>

Java allows us to define two types of methods:

* Class methods, a.k.a. static methods.
* Instance methods, a.k.a. non-static methods.

In the world of Dragon Ball Z, think of instance methods as the special techniques that only a specific character, like Goku, can perform. For example, Goku's Kamehameha is unique to him and can't be performed by just anyone. Similarly, instance methods are actions that can be taken only by a specific instance of a class. On the other hand, static methods are like the universal techniques that any character can use, like flying. These are actions taken by the class itself, not tied to any one instance. For example, the `Math` class provides a `sqrt` method, which is a static method. Because it is static, we can call it as follows:

```java
x = Math.sqrt(100);
```

If `sqrt` had been an instance method, we would have instead the awkward syntax below. Luckily `sqrt` is a static method so we don't have to do this in real programs.

In contrast, if you tried to create an instance of the `Math` class and call `sqrt` like you would with an instance method, it would be like trying to make Vegeta perform a Kamehameha without learning it first. It doesn't work that way with static methods:

```java
Math m = new Math();
x = m.sqrt(100);
```

Sometimes, it makes sense to have a class with both instance and static methods. For example, suppose you want the ability to compare two Saiyans. One way to do this is to add a static method for comparing Saiyans based on their power levels.

```java
public static Saiyan maxSaiyan(Saiyan s1, Saiyan s2) {
    if (s1.powerLevel > s2.powerLevel) {
        return s1;
    }
    return s2;
}
```

This method could be invoked by, for example:

```java
Saiyan goku = new Saiyan(9001); // It's over 9000!
Saiyan vegeta = new Saiyan(8500);
Saiyan.maxSaiyan(goku, vegeta);
```

Observe that we've invoked using the class name, since this method is a static method.

We could also have implemented `maxDog` as a non-static method, e.g.

```java
public Saiyan maxSaiyan(Saiyan s2) {
    if (this.powerLevel > s2.powerLevel) {
        return this;
    }
    return s2;
}
```

In the code above, we use the keyword `this` to refer to the current Saiyan object. This method could be invoked, for example, with:

```java
Saiyan goku = new Saiyan(9001); // Goku's power level is over 9000!
Saiyan vegeta = new Saiyan(8500); // Vegeta's power level
Saiyan strongerSaiyan = goku.maxSaiyan(vegeta);
```

Here, we invoke the method using a specific instance variable.

**Exercise 1.2.1**: What would the following method do? If you're not sure, try it out.

Imagine you're in the world of Dragon Ball Z, and instead of comparing dogs, you're comparing Saiyans to see who has the higher power level. Let's modify the code to determine which Saiyan is stronger based on their power level.

```java
public static Saiyan maxSaiyan(Saiyan s1, Saiyan s2) {
    if (s1.powerLevel > s2.powerLevel) {
        return s1;
    }
    return s2;
}
```

In this code, `maxSaiyan` takes two Saiyan objects, `s1` and `s2`, and compares their `powerLevel` attributes. It returns the Saiyan with the higher power level, just like how Goku and Vegeta often compare their strengths!

**Static Variables**

In the world of Dragon Ball Z, think of static variables like the power level of a Saiyan race. It's a characteristic that belongs to the entire race, not just one individual Saiyan. For instance, the ability to transform into a Super Saiyan is a trait of the Saiyan race, not just Goku or Vegeta. Similarly, static variables are properties of the class itself, not tied to any single instance.

```java
public class Saiyan {
    public int powerLevel;
    public static String transformation = "Super Saiyan";
    ...
}
```

Static variables should be accessed using the name of the class rather than a specific instance, e.g. you should use `Dog.binomen`, not `d.binomen`.

While Java technically allows you to access a static variable using an instance name, it is bad style, confusing, and in my opinion an error by the Java designers.

**Exercise 1.2.2**: Complete this exercise:

* Video: [link](https://youtu.be/8Gq-8mVbyFU)
* Slide: [link](https://docs.google.com/presentation/d/10BFLHH8VaoYy7XaazwjaoTtLw3zvasX4HCssDruqw84/edit#slide=id.g6caa9a6fe\_057)
* Solution Video: [link](https://youtu.be/Osuy8UEH03M)

#### public static void main(String[] args) <a href="#public-static-void-mainstring-args" id="public-static-void-mainstring-args"></a>

With what we've learned so far, it's time to demystify the declaration we've been using for the main method. Breaking it into pieces, we have:

* `public`: So far, all of our methods start with this keyword.
* `static`: It is a static method, not associated with any particular instance.
* `void`: It has no return type.
* `main`: This is the name of the method.
* `String[] args`: This is a parameter that is passed to the main method.

**Command Line Arguments**

Since main is called by the Java interpreter itself rather than another Java class, it is the interpreter's job to supply these arguments. They refer usually to the command line arguments. For example, consider the program `ArgsDemo` below:

```java
public class ArgsDemo {
    public static void main(String[] args) {
        System.out.println(args[0]);
    }
}
```

This program prints out the 0th command line argument, e.g.,

Imagine you're Goku, and you're about to go on a mission to collect the Dragon Balls. You need to pass specific instructions to your team. In Java, you can pass these instructions as command line arguments. For example:

```java
$ java ArgsDemo find the dragon balls
find
```

Here, `find` is the first instruction you give, just like Goku might say "find" to start the quest.

In the example above, `args` will be an array of Strings, where the entries are {"find", "the", "dragon", "balls"}. Just like Goku's team would break down his instructions into actionable steps, Java breaks down the command line input into an array of strings for the program to process.

**Summing Command Line Arguments**

**Exercise 1.2.3**: Try to write a program that sums up the command line arguments, assuming they are numbers. For a solution, see the webcast or the code provided on GitHub.

#### Using Libraries <a href="#using-libraries" id="using-libraries"></a>

One of the most important skills as a programmer is knowing how to find and use existing libraries. In the glorious modern era, it is often possible to save yourself tons of work and debugging by turning to the web for help.

In this course, you're welcome to do this, with the following caveats:

* Do not use libraries that we do not provide.
* Cite your sources.
* Do not search for solutions for specific homework or project problems.

For example, it's fine to search for "convert String integer Java". However, it is not OK to search for "Project 2048 Berkeley". Just like Goku can train to become stronger by learning new techniques, you can search for programming techniques to improve your skills. But remember, just as Goku wouldn't skip his training by using the Dragon Balls to instantly become stronger, you shouldn't skip the learning process by searching for complete solutions to assignments.

For more on collaboration and academic honesty policy, see the course syllabus.

