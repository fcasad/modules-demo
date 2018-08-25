# modules-demo

Tiny React app using es5 (without JSX) to demonstrate various historical ways of handling modules in JS, and their disadvantages

1. single script tag - maintaining large file, many global variables
2. multiple script tags - many global variables, order of scripts matters, making many requests
3. iife/revealing module pattern - 1 global variable, order of scripts matters, making many requests
4. requirejs (amd) - making many requests
5. browserify (commonjs) - added build step
6. webpack (universal modules) - added build step
