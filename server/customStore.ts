const electron = require('electron');
const path = require('path');
const fs = require('fs');

class MyStore {
  path: string;

  data: string;

  constructor(opts: { configName: string }) {
    const userDataPath = (electron.app || electron.remote.app).getPath(
      'userData'
    );
    this.path = path.join(userDataPath, `${opts.configName}.json`);
    this.data = this.parseDataFile(this.path);
  }

  get(key: string) {
    const data = this.parseDataFile(this.path);
    if (data) {
      return data[key];
    }
    return '';
  }

  getAll() {
    return this.parseDataFile(this.path);
  }

  set(key: string, val: string) {
    this.data[key] = val;
    console.log('\n\n');
    console.log('SAVE: ', val);
    console.log('In path: ', this.path);
    fs.writeFileSync(this.path, JSON.stringify(this.data));
    console.log('DATA: ', this.data);
  }

  remove(key: string) {
    const data = this.parseDataFile(this.path);
    if (data) {
      delete data[key];
      this.data = data;
      fs.writeFileSync(this.path, JSON.stringify(this.data));
    }
    return '';
  }

  // eslint-disable-next-line class-methods-use-this
  parseDataFile(filePath: string) {
    try {
      return JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
      // if there was some kind of error, return the passed in defaults instead.
      return `Error: Not found ${error}`;
    }
  }
}

// expose the class
module.exports = MyStore;
