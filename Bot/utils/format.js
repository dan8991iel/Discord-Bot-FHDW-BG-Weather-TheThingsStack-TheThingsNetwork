function formatKey(key) {
    const sections = splitKeyIntoSections(key);
  
    const formattedSections = sections.map(section => {
      switch (section) {
        case 'in':
          return 'Indoor';
        case 'out':
          return 'Outdoor';
        case 'temp':
          return 'Temperature';
        case 'windrun':
          return 'Wind Run';
        default:
          return section.charAt(0).toUpperCase() + section.slice(1);
      }
    });
  
    return formattedSections.join(' ');
  }
  
  function formatDataWithUnit(key, data) {
    let unit;
    switch (key.toLowerCase()) {
      case 'intemp':
      case 'outtemp':
        unit = '°C';
        break;
      case 'inhumidity':
      case 'outhumidity':
        unit = '%';
        break;
      case 'windgust':
      case 'windspeed':
        unit = 'km/h';
        break;
      case 'windrun':
        unit = 'km';
        break;
      case 'datetime':
        data = new Date(data * 1000).toLocaleString('de-DE');
        unit = 'Uhr';
        break;
      default:
        unit = '';
    }
  
    return `${data} ${unit}`;
  }
  
  function splitKeyIntoSections(key) {
    return key
      .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
      .split(' ')
      .map(word => word.toLowerCase());
  }
  
  module.exports = {
    formatKey,
    formatDataWithUnit,
    splitKeyIntoSections,
  };