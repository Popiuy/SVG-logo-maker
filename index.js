const jest = require("jest");
const fs = require('fs');
const inquirer = require('inquirer');
const { createSVGElement } = require('./lib/shapes.js');

// Regular expression to validate color inputs (hexadecimal or color keywords)
const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^[a-zA-Z]+$/;

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
      if (colorRegex.test(input)) {
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
      if (colorRegex.test(input)) {
        return true;
      }
      return 'Please enter a valid color keyword or hexadecimal number.';
    },
  },
])
.then((answers) => {
  const { text, textColor, shape, shapeColor } = answers;
  let svgShape;

  if (shape === 'circle') {
    svgShape = createSVGElement("circle", {
      cx: "25",
      cy: "75",
      r: "20",
      fill: shapeColor,
    });
  } else if (shape === 'square') {
    svgShape = createSVGElement("rect", {
      x: "60",
      y: "10",
      rx: "10",
      ry: "10",
      width: "30",
      height: "30",
      fill: shapeColor,
    });
  } else if (shape === 'triangle') {
    svgShape = createSVGElement("polygon", {
      points: "100,10 80,40 120,40",
      fill: shapeColor,
    });
  } else {
    console.error('Invalid shape choice.');
    return;
  }

  const svgContent = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${svgShape}
      <text x="50%" y="50%" text-anchor="middle" fill="${textColor}" font-size="48">${text}</text>
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
