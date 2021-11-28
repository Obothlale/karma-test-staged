# karma-test-staged
```Library to test git staged Angular 2+ spec files on pre-commit```


# Install
Install karma-test-staged in a git managed Angular 2+ project

```npm install @coderunscode/karma-test-staged --save-dev```

# How to use karma-test-staged
You can execute karma-test-staged within your project

```npx karma-test-staged```

You would most likely want to integrate and execute **karma-test-staged** with **husky**. Inside a script file called **.husky/pre-commit**, just write **```npx karma-test-staged```**

Follow this link on how to [setup husky for your project](https://www.npmjs.com/package/husky).

