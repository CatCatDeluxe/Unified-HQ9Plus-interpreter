const fs = require("fs");
const readline = require("readline-sync");

const { interpretBf } = require("./bf.js");

const rot13 = (arr) => {
	// Literally just pasted from StackOverflow, but slightly modified to be dumber
	let index = x => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".indexOf(x);
	let translate = x => index(x) > -1 ? "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm"[index(x)] : x;
	return arr.map(translate);
}

const showUHQ9Info = (text, type='err') => {
	// Types can be 'err', 'warn', or basically anything else.
	let col = type === 'err' ? '\x1b[31m' : type === 'warn' ? '\x1b[33m' : '';
	
	console.log(`\n${col}${text}\x1b[0m`);
}

class UHQ9Runtime {
	/*
	A runtime for UHQ9+ code.
	Each one has its own variables.
	*/
	constructor(settings) {
		// Settings
		this.settings = {
			allowComments: false
		};

		// Make sure he class isn't missing anything
		Object.keys(settings).forEach(key => {
			this.settings[key] = settings[key];
		});

		this.acc = -1.2354 * Math.E;
		this.accIsChar = false;
	}

	interpretUHQ9Code (code, rawText) {
		/*
		This parses all Unified HQ9+ code, so you want to use this function
		to do stuff
		*/

		let inComment = false;

		for (let i = 0; i < code.length; i++) {
			// This is the main program loop.
			let char = code[i];

			// Comments
			if (this.settings.allowComments) {
				if (!inComment && char === "/" && code[i + 1] === "/") inComment = true;
				if (inComment && char === "\n") inComment = false;
				if (inComment) continue;
			}

			switch (char) {
			case "H":
				// 'H': Prints "Hello World!"
				console.log("Hello World!");
				break;

			case "w":
				// 'w': Prints "Hello world!"
				console.log("Hello world!");
				break;
			
			case "Q":
				// 'Q': Print the program's source code. Also the easiest quine ever.
				console.log(rawText);
				break;
			
			case "C":
				// 'C': Take input to output.
				console.log(readline.question(": "));
				break;

			case "3":
				// '3': Nop, for convenience.
				break;
			
			case "I":
				// Interpret input as Unified HQ9+ code.
				let rawCode = readline.question("UHQ9+> ");
				// Interpret the code in a new runtime
				new UHQ9Runtime(this.settings).interpretUHQ9Code(rawCode.split(''), rawCode);
				break;
			
			case "B":
				// Interpret user input as brainfuck code.
				interpretBf(readline.question("bf> "));
				break;
			
			case "h":
				// 'h':  Exit the program.
				return 0;
			
			case "1":
				// '1': Interpret the rest of the program as it's ROT13 variant.
				code = rot13(code);
				break;
			
			case "2":
				// Increment the accumulator twice.
				this.acc += 2;
				break;

			case "R":
				showUHQ9Info("Error", 'err');
				return Math.floor(Math.random() * 1000);

			case "L":
				// 'L': Blink LEDs (on embedded systems)
				showUHQ9Info("Error: Blinking LEDs are only available in embedded HQ9+.", 'err');
				return "f";

			// Accumulator thingies
			case "+":
				// '+' and '++' behavour.
				// '++': Create a new object and increment the accumulator twice.
				if (code[i + 1] === "+") {
					new Object();
					this.acc += 2;
					// Increment i to skip the next +.
					i++;
				} else {
					// '+': Increment the accumulator.
					this.acc++;
				}
				break;

			case "i":
				// 'i': Increment the accumulator
				this.acc++;
				break;
			
			case "-":
			case "d":
				// '-' or 'd': Decrement the accumulator.
				this.acc--;
				break;
			
			case "s":
				// 's': Square the accumulator.
				this.acc = this.acc * this.acc;
				break;
			
			case "Z":
				this.acc = 0;
				break;
				
			case "*":
				// '*': Double the accumulator.
				this.acc *= 2;
				break;
			
			case "c":
				// 'c': turn the accumulator into a char.
				// This just makes its output a char, because otherwise a lot of
				//  math funtions woudn't work.
				this.accIsChar = true;
				break;
			
			case "U":
				// 'U': Does whatever the creator of the interpreter wants it to do.
				// I decided it should turn the accumulator back to an int.
				this.accIsChar = false;
				break;
			
			case "o":
				// 'o': Prints the accumulator.
				// If accIsChar is true, it will display it as a character
				process.stdout.write(this.accIsChar ? String.fromCharCode(this.acc) : this.acc.toString());
				break;

			case "G":
				// "G": Prints the source code of the program.
				let text = fs.readFileSync(__filename, "utf-8").split("\n");
				for (let line = 0; line < text.length; line++) {
					console.log(`${line}| ${text[line]}`);
				}

				break;

			case "A":
				// 'A": Print the language te interpreter was written in.
				console.log("JavaScript");
				break;

			case "E":
				console.log("https://esolangs.org/wiki/Unified_HQ9%2B");
				break;
			
			case "N":
				// Increment the accumulator by 10.
				this.acc += 10;
				break;

			case "7":
				// '7': 
				if (code[i + 1] === "7") {
					if (code[i + 2] === "7") {
						// Look through the program until it finds something that's
						// not a 7.
						for (; i < code.length; i++) {
							if (code[i] !== "7") {
								// Decrase i by 3, 1 because it'll be increased 2 times anyways
								// and another time to still cound the last 7.
								i -= 3;
								break;
							}
						}
					} else {
						// Repeat 49 times, because that's 7 * 7.
						// The string repeats 48 times because otherwise it repeats 50
						// times for some reason
						let execStr = code[i + 2].repeat(48) + 'h';
						this.interpretUHQ9Code(execStr.split(""), execStr);
					}
				} else {
					// Repeat it just 7 times.
					let execStr = code[i + 1].repeat(7) + 'h';
					this.interpretUHQ9Code(execStr.split(""), execStr);
				}

				// Increase i to skip the next thingy
				i++;
				break;
			
			case "9":
				// "9": print the lyrics to "99 bottles of beer".
				for (let i = 99; i > 0; i--) {
					let bottles = i === 1 ? "bottle" : "bottles"
						console.log(`\
	${i} ${bottles} of beer on the wall,
	${i} ${bottles} of beer
	Take one down, pass it around,
	${i - 1} ${i - 1 === 1 ? "bottle" : "bottles"} of beer on the wall.${i !== 1 ? "\n" : ""}`);
				}
				break;

			default:
				break;
			}
		}

		showUHQ9Info(
			"Fatal Error:"
			+" The program exited but you didn't put an h at the end", 'err');

		return Math.sqrt(2);
	}
}

module.exports = { UHQ9Runtime, showUHQ9Info };