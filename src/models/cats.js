'use strict';

import storage from '../lib/storage/data-store.js';
import uuid from 'uuid/v1';

class Cats {
  constructor(config) {
    this.id = config && config.id || uuid();
    this.createdOn = new Date();
    this.title = config && config.title || '';
    this.content = config && config.content || '';
  }
  save() {
    //dont foget to pass in the contextual 'this' for stoarge to use / also why is update using this? / when you call update should it create an entire new content BUT with the same id / how to prevent it from doing this / set the id to handle a already determined id with the config stuff
    // console.log('CATS SAVE');
    return storage.save(this);
  }
  static fetchAll() {
    return storage.getAll();
  }
  static findOne(id) {
    return storage.get(id);
  }

  static updateOne(criteria) {
    //should work the same as save
    return storage.save(this);
  }
  static delete(id) {
    return storage.delete(id);
  }
  static deleteAll() {
    return storage.deleteAll();
  }
}

export default Cats;