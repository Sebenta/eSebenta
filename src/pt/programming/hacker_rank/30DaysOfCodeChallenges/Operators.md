# Day 2: Operators

## Objective

In this challenge, you will work with arithmetic operators. Check out the [Tutorial](https://www.hackerrank.com/challenges/30-operators/tutorial) tab for learning materials and an instructional video.

### Task

Given the meal price (base cost of a meal), tip percent (the percentage of the meal price being added as tip), and tax percent (the percentage of the meal price being added as tax) for a meal, find and print the meal's total cost. Round the result to the nearest integer.

### Example

$meal_{cost} = 100$

$tip_{percent} = 15$

$tax_{percent} = 8$

A tip of $15% * 100 = 15$, and the taxes are $8% \* 100 = 8$. Print the value `123` and return from the function.

### Function Description

Complete the solve function in the editor below.

solve has the following parameters:

- `int meal_cost`: the cost of food before tip and tax
- `int tip_percent`: the tip percentage
- `int tax_percent`: the tax percentage

Returns The function returns nothing. Print the calculated value, rounded to the nearest integer.

__Note:__ Be sure to use precise values for your calculations, or you may end up with an incorrectly rounded result.

### Input Format

There are `3` lines of numeric input:

The first line has a double, $meal_{cost}$ (the cost of the meal before tax and tip).

The second line has an integer, $tip_{percent}$ (the percentage of $meal_{cost}$ being added as tip).

The third line has an integer, $tax_{percent}$ (the percentage of $meal_{cost}$ being added as tax).

### Sample Input

```shell
12.00
20
8
```

### Sample Output

```shell
15
```

### Explanation

Given:

$meal_{cost} = 12, tip_{percent} = 20, tax_{percent} = 8$

Calculations:

$tip = 12 and \frac{12}{100} \times 20 = 2.4$

$tip = 8 and \frac{8}{100} \times 20 = 0.96$

$total_{cost} = meal_cost + tip + tax = 12 +2.4 + 0.96 = 15.36$

$round(total_{const}) = 15$

We round  to the nearest integer and print the result, `15`.

## Solution

### Java

```java
import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.regex.*;

public class Solution {

    // Complete the solve function below.
    static void solve(double meal_cost, int tip_percent, int tax_percent) {
        double tip = meal_cost * tip_percent / 100;
        double tax = meal_cost * tax_percent / 100;
        int total_cost = (int) Math.round(meal_cost + tip + tax);
        System.out.println(total_cost);
    }

    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        double meal_cost = scanner.nextDouble();
        scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

        int tip_percent = scanner.nextInt();
        scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

        int tax_percent = scanner.nextInt();
        scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

        solve(meal_cost, tip_percent, tax_percent);

        scanner.close();
    }
}
```
