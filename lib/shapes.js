const createSVGE = (type, attributes) => {
    const attrs = Object.entries(attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');
  
    return `<${type} ${attrs} />`;
  };
  
  module.exports = {
    createSVGE,
  };
  