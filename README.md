# Setup

Run with:

```
run http-server in the root of the project (npm -g http-server if you need to install)
In the browser, go to localhost:8080
```




Rework of the gSchool polymorphic-activity-feed OO refactoring demo in a functional style.

Key Aspects:
* use of .bind for partial application
* remove many jQuery calls in favor of string concatenation
* purify functions - remove side effects in favor of returning a value
* push side effects (reading JSON feeds and updating DOM) to the edges of the system and encapsulate them in functions
* decorate data structures (in this case JS objects) with functions that will be executed later, providing the equivalent of type polymorphism
