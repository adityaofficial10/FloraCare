const SerialPort = require('serialport').SerialPort;
const port = new SerialPort({path: "COM7", baudRate: 9600 });
const Readline = require('@serialport/parser-readline').ReadlineParser;

const parser = port.pipe(new Readline({ delimiter: '\n' }));


port.on("open", () => {
  console.log('serial port open');
});

parser.on('data', data =>{
  console.log('got word from arduino:', data);
});
