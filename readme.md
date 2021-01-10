# Unified HQ9+ Interpreter v1.0.0

## By CatCatDeluxe

First release: Jan. 9th, 2021

thanks to [Cortex](https://esolangs.org/wiki/User:Cortex) for creating the language.

This is an interpreter for a joke language called Unified HQ9+ or HQ9+++-\*TCIX13BG2DidcoshwNZLEAR7U.
I saw it one day and decided to make the one and only (for now) interpreter for it.

You can find the language specifications here:
["Specifications"](https://esolangs.org/wiki/Unified_HQ9%2B)

The non-executable (node) version requires the readline-sync package. You can get it with `npm i readline-sync`

## How to use
This interpreter has some weird features specifically for it, because why not.

for example, the accumulator starts at -1.2354e, instead if 0 which is what you'd probably think.
Don't worry, though, you can just use 'Z' to set it to 0.

To open the REPL, just run the program without specifying the file.
To run a program, you need to use the `-f` or `--file` argument followed by the filename.
The file extension has to be '.uhq9+' or '.uhq9p'. I didn't need to do this, but it makes
the language slightly harder to use.

## Notes and Issues

- The 2d mode is not yet implemented, this would require a partial rewrite of the parsing code that I'm too lazy to do.
- In brainfuck mode you can create inescapable infinite loops, like so: `+[,]` You can't exit it, as far as I know...
- The interpreter source code showing command outputs `source-code-not-available` when running the executable.
