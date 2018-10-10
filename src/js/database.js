const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./db.json');
const db = low(adapter);
const today = new Date().toJSON().slice(0, 10);

db.defaults({ [today]: [] }).write();

module.exports = db;
