const shortid = require('shortid');
const db = window.require('./src/js/database.js');

module.exports = {
  get() {
    return `${JSON.stringify(db.getState())}`;
  },
  saveNewItem(title, timer) {
    const today = new Date().toJSON().slice(0, 10);
    return db
      .get(today)
      .push({
        id: shortid.generate(),
        title,
        timer,
        currentTime: new Date().toLocaleTimeString('en-US')
      })
      .write();
  },
  getItems() {
    return db.getState();
  }
};
