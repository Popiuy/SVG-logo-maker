class Triangle {
    constructor() {
      // constructor logic here
    }
  
    setColor(color) {
      // set color logic here
    }
  
    render() {
      // render logic here
    }
  }

const shape = new Triangle();
shape.setColor("blue");
expect(shape.render()).toEqual('<polygon points="150, 18 244, 182 56, 182" fill="blue" />');
