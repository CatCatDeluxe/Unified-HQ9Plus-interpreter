const readline = require("readline-sync");

// I tried to wite my own one of these and it failed, so i just copied one from a tutorial.
function interpretBf(program) {
	let end = false;

	let mem = Array(30000).fill(0);
	let mpointer = 15000;
	let ipointer = 0;
	let stack = [];

	while (!end) {
		switch (program[ipointer]) {
			case '>':
				if (mpointer == mem.length - 1)
					mem.push(0, 0, 0, 0, 0);
				mpointer++;
				break;
			case '<':
				if (mpointer > 0)
					mpointer--;
				break;
			case '+':
				mem[mpointer]++;
				break;
			case '-':
				mem[mpointer]--;
				break;
			case '.':
				process.stdout.write(String.fromCharCode(mem[mpointer]));
				break;
			case ',':
				mem[mpointer] = readline.keyIn(": ").charCodeAt(0);
				break;
			case '[':
				if (mem[mpointer]) {
					stack.push(ipointer);
				} else {
					let count = 0;
					while (true) {
						ipointer++;

						if (!program[ipointer]) break;
						if (program[ipointer] === "[") count++;

						else if (program[ipointer] === "]") {
							if (count) {
								count--;
							} else {
								break;
							}
						}
					}
				}
				break;
			case ']':
				ipointer = stack.pop() - 1;
				break;
			case undefined:
				end = true;
				break;
			default:
				break;
		}
		ipointer++;
	}
}

module.exports = { interpretBf }