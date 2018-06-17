'use strict';

import storage from '../lib/storage/data-store.js';
import uuid from 'uuid';

class Dogs {
  constructor(config) {
    this.id = config && config.id || uuid();
    this.createdOn = new Date();
    this.title = config && config.title || '';
    this.content = config && config.content || '';
  }
  save() {
    return storage.save(this);
  }
  //static methods below which means that you dont have to call them on new instances of the class

  static fetchAll() {
    return storage.getAll();
  }

  static fetchOne(id) {
    return storage.getOne(id);
  }

  static updateOne(criteria) {
    //should it need the criteria? it shoudl just be like the save and pass in the this or is this how to do it because you cant call static methods on new instances of the class they reside in?
    //   static updateOne(id,change)
  //what should criteria take
  //i think it needs to take an id to know which one and then a parameter that holds an object targeting the specifc keya you want to change with the new value
    return storage.update(this);
    //what should 'this' have in it in terms of info
    //its as if its dependant on the 'new' instance of class Dogs but that cant be right?
  }

  static deleteOne(id) {
    return storage.delete(id);
  }
}

export default Dogs;