'use strict';

import storage from '../lib/storage/data-store.js';
import uuid from 'uuid/v1';
//why is this one v1 and the other isnt / check the npm docs on this i remember that you can set it to between v1-v4 for some reason

class Cats {
  constructor(config) {
    this.id = config && config.id || uuid();
    this.createdOn = new Date();
    this.title = config && config.title || '';
    this.content = config && config.content || '';
  }
  save() {
    //dont foget to pass in the contextual 'this' for stoarge to use / also why is update using this? / when you call update should it create an entire new content BUT with the same id / how to prevent it from doing this / set the id to handle a already determined id with the config stuff
    return storage.save(this);
  }

  //static methods

  //get all
  static fetchAll() {
    return storage.getAll();
  }
  //get one
  static findOne(id) {
    //is it get one or its actually just getting all those bound to the id
    return storage.get(id);
  }
  //update one

  static updateOne(criteria) {
    return storage.update(this);
  }
  //delete one
  static delete(id) {
  //delete all tied to the id not just one
  //could tie it to take in another parameter the title || by content or soemthing
    return storage.delete(id);
  }
}

export default Cats;