const execute = require('execute');

window.addEventListener('DOMContentLoaded', () => {

  const { Terminal } = require("xterm");
  const { FitAddon } = require("xterm-addon-fit");

  const term = new Terminal();
  const prompt = "[zterm]$ ";
  let line = "";
  const fitAddon = new FitAddon();
  term.loadAddon(fitAddon);

  term.open(document.getElementById('xterm-container'));
  term.write("\x1B[1;3;31mWelcome to zterm\x1B[0m (exec debug to open Developer Tools)\r\n");
  term.write(prompt);
  fitAddon.fit();

  term.onKey(({ key, ev }) => {
    console.log(`Pressed ${key} "${key.charCodeAt(0)}"`);

    const pressedEnter = key.charCodeAt(0) == 13; // define condition
    const printableASCII = /^[\x20-\x7F]*$/.test(key);
    const backspace = key.charCodeAt(0) == 127;

    if (pressedEnter){
      const lineIsNotEmpty = !!(line.trim()); // define condition
      term.write("\r\n"); // start a new line.
      if(lineIsNotEmpty) execute({line,term}); // let execute deal with all the rest
      line = ""; // clear line as it has been executed
      term.write(prompt);
    }else if(printableASCII){
      term.write(key); // print the character user pressed on the screen
      line += key; // add caracter to our line
    }else if(backspace){
      term.write(key);
    }else{
      // non printable ascii

    }
  });

  term.focus();

});
