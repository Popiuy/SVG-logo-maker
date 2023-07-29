const jest = require("jest");
const fs = require('fs');
const inquirer = require('inquirer');
const { createSVGE } = require('./lib/shapes.js');

const color = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^[a-zA-Z]+$/;

inquirer.prompt([
  {
    type: 'input',
    name: 'text',
    message: 'Enter 3 characters:',
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter the text color (color keyword or hexadecimal number):',
    validate: function (input) {
      if (color.test(input)) {
        return true;
      }
      return 'Please enter a valid color keyword or hexadecimal number.';
    },
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape:',
    choices: ['circle', 'triangle', 'square'],
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the shape color (color keyword or hexadecimal number):',
    validate: function (input) {
      if (color.test(input)) {
        return true;
      }
      return 'Please enter a valid color keyword or hexadecimal number.';
    },
  },
])
.then((answers) => {
  const { text, textColor, shape, shapeColor } = answers;
  let svgShape;
  let textX, textY;
  
  if (shape === 'circle') {
    svgShape = createSVGE("circle", {
      cx: "150",
      cy: "100",
      r: "40", 
      fill: shapeColor,
    });
    textX = 150;
    textY = 100;
  } else if (shape === 'square') {
    svgShape = createSVGE("rect", {
      x: "120", 
      y: "70", 
      rx: "10",
      ry: "10",
      width: "60", 
      height: "60", 
      fill: shapeColor,
    });
    textX = 150;
    textY = 100;
  } else if (shape === 'triangle') {
    svgShape = createSVGE("polygon", {
      points: "120,60 90,100 150,100", 
      fill: shapeColor,
    });
    textX = 150;
    textY = 100;
  } else {
    console.error('Invalid shape choice.');
    return;
  }
  const svgContent = `<svg version="1.1"
  width="300" height="200"
  xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="red" />
      ${svgShape}
      <text x="${textX}" y="${textY}" font-size="30" text-anchor="middle" fill="${textColor}">${text}</text>
    </svg>
  `;

  fs.writeFile('logo.svg', svgContent, (err) => {
    if (err) {
      console.error('Error generating logo.svg:', err);
    } else {
      console.log('Generated logo.svg');
    }
  });
})
.catch((error) => {
  console.error(error);
});
