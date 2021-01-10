/*
Unified HQ9+-

Interpreter by CatCatDeluxe

Original idea by Cortex (https://esolangs.org/wiki/User:Cortex)

Jan. 8th 2021 - Jan. 9th 2021

I was on the esolang wiki for some reason and decided to implement this
*/

const fs = require("fs") ;

const readline = require("readline-sync");

const { UHQ9Runtime, showUHQ9Info } = require('./UHQ9Interpreter.js');

const version = "1.0.0";

// Run a REPL if a file was not specified.
if (process.argv.length === 0) {
	runUQ9Repl();
	process.exit();
}

// This line of code is absolute shit, it was like 3am when I wrote it but now if I remove
// it the entire program breaks
if (!process.argv[0].endsWith("UHQ9+.js")) process.argv = process.argv.slice(1); // (this one)

let settings = {
	allowComments: false
};

if (process.argv.length >= 2) {
	let filename = undefined;

	// Process args
	for (let i = 1; i < process.argv.length; i++) {
		switch (process.argv[i]) {
		case "--allow-comments":
		case "-c":
			settings.allowComments = true;
			break;
		
		case "-f":
		case "--file":
			filename = process.argv[i + 1];
			break;
		}
	}

	// Make sure the file exists.
	if (!filename) {
		showUHQ9Info(
			"Error: You need to specify a filename with the -f or --file arg", 'err');
		return;
	}

	// Exit the program if it has the wrong file extension just to be annoying.
	if (!(filename.endsWith(".uhq9p") || filename.endsWith(".uhq9+"))) {
		showUHQ9Info("The filename has to end with \".uhq9+\" or \".uhq9p\" because I said so.",
			'err');
		
		process.exit(1);
	}

	// If the file doesnt exist, exit with an error.
	if (!fs.existsSync(filename)) {
		showUHQ9Info(`error: file "${filename}" was not found. You should probably type the name \
right next time.`, 'err');
		process.exit(69420);
	}
	
	interpretFile(filename);
} else {
	runUHQ9Repl();
	process.exit();
}

function interpretFile (filename) {
	// Convert the file read to an array of characters.
	let rawText = fs.readFileSync(filename, 'utf-8');
	let codeText = rawText.split("");

	let runtime = new UHQ9Runtime(settings);

	let rval = runtime.interpretUHQ9Code(codeText, rawText);

	if (rval !== 0) {
		console.log(`\x1b[31mExit code: ${rval}\x1b[0m`);
	}

	process.exit();
}

function runUHQ9Repl () {
	let repl = new UHQ9Runtime(settings);
	console.log(`HQ9+++-*TCIX13BG2DidcoshwNZLEAR7U REPL v${version}`);
	console.log("Type \"Ok i'm done now bye\" or hit Ctrl-C to exit.")

	let input = "";
	while (input !== "ok im done now bye") {
		input = readline.question("\x1b[32;1m>>> \x1b[0m") + "h";
		repl.interpretUHQ9Code(input.split(""), input);
	}
}