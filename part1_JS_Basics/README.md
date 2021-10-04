# JavaScript Basics for Beginners

This is the beginning courses from Mosh for javascript, per description:

> An ideal place to start for people who have never programmed with JavaScript or need to refresh the fundamentals.
> https://codewithmosh.com/courses/324741/lectures/5088148

## Note:

I figured it will be worth while to get a solid fundation of javascript.
I will try to finish this fundemental part ASAP. Hope we can get js right the first try. - 10/03/2021

---

### Chapter 1. Basics

#### 1. Variables

```js
let name = "Mosh"; // define variable
```

Naming:

1. avoid reserved keyword.
2. the name shall be meaningful
3. name can NOT start with a number
4. name can NOT contain a space or hyphen
5. prefer to use lower camel `let firstName = "Mosh";`

#### 2. Constant

```js
const interestRate = 0.3;
interestRate = 1; // will give you error.
```

`const` shall be your default choice for anything that you won't change.

#### 3. Primitive Types (Value types)

> String, Number Boolean, undefined, null

notice that:

```js
let firstName = undefined;
typeof firstName; // -> "undefined"

let selectColor = null;
typeof selectColor; // -> "object"
```

ps -> Reference types = [Object, Array, Function]

#### 4. Dynamic Typing

In static language, once a data type is assigned, it can not change `string name = "John"`.

In dynamic language, once a data type is assigned, it could be changed `let name = "John";`.

#### 5. Object

```js
// {} -> object
let person = {
  name: "Mosh",
  age: 30,
};
```

#### 6. Arrays

```js
let colors = ["red", "blue"];
color[2] = 1;
console.log(colors); // ->["red", "blue", 1]
typeof colors; // -> object
```

#### 7. Functions

```js
function greet(firstName, lastName) {
  console.log("Hello " + firstName + " " + lastName);
}

greet("John", "Smith");
```

### Chapter 2. Operators

#### 2. Arithmetic Operators

aka, mathmatical operators, such as `+, -, *, /, %, **, ++, -- `

notice that there's a difference between `++x` and `x++`.

`++x` will increase first, and `x++` will increase after:

```js
let x = 10;
console.log(++x); // 11

let y = 20;
console.log(y++); // 20
```

#### 3. Assignment Operators

`=, +=, -=`

#### 4. Comparison Operators

`>, >=, <, <=, !==, ===`

#### 5. Equality Operators

Strict equality `===` vs. lose equality `==`:
stict: "type" and "value" both are the same.

```js
console.log(1 === 1); // true
console.log("1" === 1); // false
```

lose: convert the type first, and then see whether the value is the same.

```js
console.log(1 == 1); // true
console.log("1" == 1); // true
console.log("1" == true); // true
```

#### 6. Ternary Operator

formula = condition ? (true result) : (false result)

```js
let points = 110;
let type = points > 100 ? "gold" : "silver";
```

#### 7. Logical Operator

`AND, && ` return true if both operands are true.

`OR, ||` return true if one of the operands is true.

#### 8. Logical Operator with Non-booleans

```js
false || "Mosh"; // -> "Mosh"
false || 1; // -> 1
```

"falsy" = `undefined, null, 0, false, '', NaN`
"truthy" = anything that is not "falsy"

"short-circuiting"

```js
false || 1 || 2; // -> 1, it returns as soon as we find a truthy
```

#### 9. Bitwise Operator

In 8-bit system,

1 = 00000001

2 = 00000010

R = `1 | 2` = 00000011 = 3 <- bitwise OR

A = `1 & 2` = 00000000 = 0 <- bitwise AND
