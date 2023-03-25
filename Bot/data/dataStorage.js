const fs = require('fs');
const path = require('path');

const DATA_FILE_PATH = path.join(__dirname, 'subscribedChannels.json');

function readData() {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const rawData = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      const idArray = JSON.parse(rawData);
      return new Set(idArray);
    } else {
      return new Set();
    }
  }
  
  function writeData(idSet) {
    const idArray = Array.from(idSet);
    const jsonData = JSON.stringify(idArray, null, 2);
    fs.writeFileSync(DATA_FILE_PATH, jsonData, 'utf-8');
  }
  
  function addData(newId) {
    const idSet = readData();
    idSet.add(newId);
    writeData(idSet);
  }

  function containsId(id) {
    const idSet = readData();
    return idSet.has(id);
  }
  
  function removeData(idToRemove) {
    const idSet = readData();
    const updatedSet = new Set(Array.from(idSet).filter(id => id !== idToRemove));
    writeData(updatedSet);
  }

  function isEmpty() {
    const data = readData();
    return data.size === 0;
  }

  function getSize() {
    const data = readData();
    return data.size;
  }

  function clearData() {
    const emptySet = new Set();
    writeData(emptySet);
  }
  
  module.exports = {
    readData,
    writeData,
    addData,
    removeData,
    containsId,
    isEmpty,
    clearData,
    getSize,
  };