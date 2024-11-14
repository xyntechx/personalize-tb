# 2. Defining and Using Classes

If you do not have prior Java experience, we recommend that you work through the exercises in [HW0](http://sp19.datastructur.es/materials/hw/hw0/hw0.html) before reading this chapter. It will cover various syntax issues that we will not discuss in the book.

#### Static vs. Non-Static Methods <a href="#static-vs-non-static-methods" id="static-vs-non-static-methods"></a>

**Static Methods**

All code in Java must be part of a class (or something similar to a class, which we'll learn about later). Most code is written inside of methods. Let's consider an example that could be analogous to how celestial bodies might have certain behaviors or characteristics defined in a class.

```java
public class Star {
    public static void emitLight() {
        System.out.println("Shine!");
    }
}
```

If we try running the `Star` class, we'll simply get an error message:

```
$ java Star
Error: Main method not found in class Star, please define the main method as:
       public static void main(String[] args)
```

The `Star` class we've defined doesn't do anything on its own. We've simply defined something that `Star` **can** do, namely emit light. To actually run the class, we'd either need to add a main method to the `Star` class, as we saw in chapter 1.1. Or we could create a separate `StarLauncher` class that runs methods from the `Star` class. For example, consider the program below:

```java
public class StarLauncher {
    public static void main(String[] args) {
        Star.emitLight();
    }
}
```

```
$ java StarLauncher
Shine!
```

A class that uses another class is sometimes called a "client" of that class, i.e. `DogLauncher` is a client of `Dog`. Neither of the two techniques is better: Adding a main method to `Dog` may be better in some situations, and creating a client class like `DogLauncher` may be better in others. The relative advantages of each approach will become clear as we gain additional practice throughout the course.

**Instance Variables and Object Instantiation**

Not all celestial bodies are alike. Some stars twinkle gently in the night sky, while others explode in a supernova, illuminating the cosmos with their brilliant light. Often, we write programs to mimic features of the universe we inhabit, and Java's syntax was crafted to easily allow such mimicry.

One approach to allowing us to represent the spectrum of Dogdom would be to create separate classes for each type of Dog.

```java
public class NeutronStar {
    public static void makeNoise() {
        System.out.println("pulsar pulses");
    }
}

public class Supernova {
    public static void makeNoise() {
        System.out.println("kaboom!");
    }
}
```

As you should have seen in the past, classes can be instantiated, and instances can hold data. This leads to a more natural approach, where we create instances of the `Dog` class and make the behavior of the `Dog` methods contingent upon the properties of the specific `Dog`. To make this more concrete, consider the class below:

```java
public class Star {
    public double massInSolarMasses;
    public void emitSound() {
        if (massInSolarMasses < 0.5) {
            System.out.println("whisper of a red dwarf...");
        } else if (massInSolarMasses < 1.5) {
            System.out.println("hum of a yellow star...");
        } else {
            System.out.println("roar of a giant star!");
        }
    }    
}
```

As an example of using such a Star, consider:

```java
public class StarLauncher {
    public static void main(String[] args) {
        Star s;
        s = new Star();
        s.massInSolarMasses = 1.0;
        s.emitSound();
    }
}
```

When run, this program will create a `Star` with a mass of 1.0 solar masses, and that `Star` will soon let out a "hum of a yellow star...".

Some key observations and terminology:

* An `Object` in Java is an instance of any class.

* The `Dog` class has its own variables, also known as _instance variables_ or _non-static variables_. These must be declared inside the class, unlike languages like Python or Matlab, where new variables can be added at runtime.

* The method that we created in the `Dog` class did not have the `static` keyword. We call such methods _instance methods_ or _non-static methods_.

* To call the `emitSound` method, we had to first _instantiate_ a `Star` using the `new` keyword, and then make a specific `Star` emit its sound. In other words, we called `s.emitSound()` instead of `Star.emitSound()`.

* Once an object has been instantiated, it can be _assigned_ to a _declared_ variable of the appropriate type, e.g. `s = new Star();`

* Variables and methods of a class are also called _members_ of a class.

* Members of a class are accessed using _dot notation_.

,**Constructors in Java**,As you've hopefully seen before, we usually construct objects in object oriented languages using a _constructor_:

```java
public class StarLauncher {
    public static void main(String[] args) {
        Star s = new Star(20);
        s.emitLight();
    }
}
```

In this example, the instantiation of the `Star` object is parameterized, which is akin to how stars in the universe have different masses that determine their lifecycle and characteristics. This parameterization saves us the time and complexity of manually setting each star's properties. To enable such syntax, we need to add a "constructor" to our `Star` class, as shown below:

```java
public class Star {
    public int massInSolarMasses;
    public Star(int m) {
        massInSolarMasses = m;
    }
    public void emitLight() {
        if (massInSolarMasses < 1) {
            System.out.println("dim light");
        } else if (massInSolarMasses < 10) {
            System.out.println("bright light");
        } else {
            System.out.println("supernova!");
        }    
    }
}
```

The constructor with signature `public Dog(int w)` will be invoked anytime that we try to create a `Dog` using the `new` keyword and a single integer parameter. For those of you coming from Python, the constructor is very similar to the `__init__` method.

**Terminology Summary**

**Array Instantiation, Arrays of Objects**

In Java, arrays are a fundamental way to store multiple values of the same type. This is similar to how stars are grouped into constellations or galaxies, where each star is a part of a larger structure. Arrays in Java are instantiated using the `new` keyword, which is akin to how new celestial bodies are discovered and cataloged in the vast universe.

```java
public class ArrayDemo {
    public static void main(String[] args) {
        /* Create an array of five integers, much like cataloging a small cluster of stars. */
        int[] someArray = new int[5];
        someArray[0] = 3; // Assigning a value, similar to identifying a star's magnitude.
        someArray[1] = 4; // Another star in our small array cluster.
    }
}
```

Similarly, we can create arrays of instantiated objects in Java, which is quite similar to how we might think about arrays of celestial bodies in astrophysics. For instance, imagine an array of `Star` objects, each representing a different star in a galaxy.

```java
public class StarArrayDemo {
    public static void main(String[] args) {
        /* Create an array of two stars. */
        Star[] stars = new Star[2];
        stars[0] = new Star("Sirius", 8.6);
        stars[1] = new Star("Betelgeuse", 642.5);
        /* Display information about the first star. */
        stars[0].displayInfo();
    }
}
```
In this example, we create an array to hold two `Star` objects, each initialized with a name and distance from Earth in light-years. The `displayInfo` method could be used to print details about the star, similar to how astronomers might catalog stars.

Observe that `new` is used in two different ways: Once to create an array that can hold two `Star` objects, and twice to create each actual `Star`. This is akin to setting up a telescope array to observe multiple stars, and then focusing on each star individually to gather data.

#### Class Methods vs. Instance Methods <a href="#class-methods-vs-instance-methods" id="class-methods-vs-instance-methods"></a>

Java allows us to define two types of methods:

* Class methods, a.k.a. static methods.
* Instance methods, a.k.a. non-static methods.

Instance methods are actions that can be taken only by a specific instance of a class. Static methods are actions that are taken by the class itself. Both are useful in different circumstances. In the context of astrophysics, imagine a class `Star` that has an instance method `calculateLuminosity()` which computes the luminosity based on the specific star's properties like mass and radius. This method would be unique to each star instance. On the other hand, a static method could be something like `Star.calculateDistanceBetweenTwoStars(Star star1, Star star2)`, which calculates the distance between two stars without needing to know the specific details of each star instance beyond their positions.

```java
x = Math.sqrt(100);
```

If `sqrt` had been an instance method, we would have instead the awkward syntax below. Luckily `sqrt` is a static method so we don't have to do this in real programs.

In Java, the `Math` class provides a collection of methods for performing basic numeric operations such as exponentiation, logarithms, and square roots. However, the `Math` class is designed to be used statically, meaning you don't need to create an instance of it to use its methods. This is similar to how celestial bodies like stars and planets follow universal laws of physics without needing individual instructions.

Here's how you can correctly use the `Math` class to calculate the square root of 100, which is akin to calculating the distance light travels in a vacuum over a specific time:

```java
x = Math.sqrt(100);
```

This line of code will set `x` to 10, just as astronomers might calculate the distance to a star using the square root of a parallax measurement.

Sometimes, it makes sense to have a class with both instance and static methods. For example, consider a scenario where you want to compare two celestial bodies, like stars, based on their mass. One way to do this is to add a static method for comparing Stars.

```java
public static Star maxStar(Star s1, Star s2) {
    if (s1.mass > s2.mass) {
        return s1;
    }
    return s2;
}
```

This method could be invoked by, for example:

```java
Star s1 = new Star(1.989e30); // Mass of the Sun in kilograms
Star s2 = new Star(3.3e31); // Mass of a larger star
Star.maxStar(s1, s2);
```

Observe that we've invoked using the class name, since this method is a static method.

We could also have implemented `maxDog` as a non-static method, e.g.

```java
public Star maxStar(Star s2) {
    if (this.luminosity > s2.luminosity) {
        return this;
    }
    return s2;
}
```

In the code above, we use the keyword `this` to refer to the current star object. This method could be invoked, for example, to compare the luminosity of two stars, which is a crucial factor in determining their brightness and energy output in astrophysics.

```java
Star s1 = new Star(1.0); // Luminosity in solar units
Star s2 = new Star(5.0); // Luminosity in solar units
s1.maxStar(s2);
```

Here, we invoke the method using a specific instance variable.

**Exercise 1.2.1**: What would the following method do? If you're not sure, try it out.

In the vast universe, just as we compare celestial bodies like stars and planets based on their mass or size, in programming, we often compare objects based on certain attributes. Here, we have a method `maxDog` that is intended to compare two `Dog` objects based on their weight and return the heavier one. However, there's a small error in the code. The method should compare the weights of `d1` and `d2`, not `this` and `d2`. Let's correct it:

```java
public static Dog maxDog(Dog d1, Dog d2) {
    if (d1.weightInPounds > d2.weightInPounds) {
        return d1;
    }
    return d2;
}
```

This corrected method now accurately reflects the comparison, much like how astronomers might compare the mass of two stars to determine which one is more massive. In this case, `d1` and `d2` are akin to two stars, and `weightInPounds` is their mass.

**Static Variables**

In the realm of astrophysics, static variables can be particularly useful when dealing with constants or properties that are universal to a class of objects, rather than individual instances. For example, consider a class representing stars. A static variable could be used to store the speed of light, a constant that is the same for all stars and crucial for calculations involving distances and time in space.

```java
public class Star {
    public double massInSolarMasses;
    public static final double SPEED_OF_LIGHT = 299792458; // in meters per second
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

In this Java program, the `main` method takes an array of `String` arguments, `args`, which can be thought of as the initial conditions or parameters of a cosmic simulation. Just as astrophysicists input parameters into a model to simulate the behavior of a star or galaxy, here we input command-line arguments to influence the program's behavior. The program then prints the first element of this array, akin to observing the initial state of a celestial body.

This program prints out the 0th command line argument, e.g.,

```
$ java ArgsDemo these are command line arguments
these
```

When you run the program with the command above, it's like setting the initial conditions for a simulation. The output `these` represents the first parameter, similar to how an astrophysicist might first observe the initial mass of a star in a simulation.

In the example above, `args` will be an array of Strings, where the entries are {"these", "are", "command", "line", "arguments"}. This array is analogous to a set of parameters defining the properties of a cosmic event or object, such as the mass, velocity, and composition of a star. Each element in the array can be thought of as a different property or condition that influences the outcome of the simulation.

**Summing Command Line Arguments**

**Exercise 1.2.3**: Try to write a program that sums up the command line arguments, assuming they are numbers. For a solution, see the webcast or the code provided on GitHub.

#### Using Libraries <a href="#using-libraries" id="using-libraries"></a>

One of the most important skills as a programmer is knowing how to find and use existing libraries. In the glorious modern era, it is often possible to save yourself tons of work and debugging by turning to the web for help.

In this course, you're welcome to do this, with the following caveats:

* Do not use libraries that we do not provide.
* Cite your sources.
* Do not search for solutions for specific homework or project problems.

For example, it's perfectly fine to search for "convert String integer Java" when you're trying to understand how to manipulate data types in Java, much like how you might convert units of measurement in astrophysics, such as converting light-years to parsecs. However, it is not OK to search for "Project 2048 Berkeley" as it might refer to a specific assignment or project that requires original work, similar to how astrophysicists must conduct their own research and analysis rather than relying on others' unpublished data.

For more on collaboration and academic honesty policy, see the course syllabus.

