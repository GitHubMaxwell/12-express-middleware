import fs from 'fs';

const debug = require('debug')('storage');
//whats this debug and its specific to storage and app etc???

const storage = {};
const dataDirectory = `${__dirname}/../../../data`;

//promisify the fs.readFile() method
//what that means is we wrap it in a promise and have it resolve or reject / expand on this explanation

let readFilePromise =  function(filename) {
  debug(`readFilePromise ${filename}`);

  return new Promise(function(resolve,reject) {
    fs.readFile(filename, function(err,data){
      //error first callback combined with Promise
      if(err)
        reject(err);
      else
      //you can do an else like this without the brackets??
        resolve(data);
    });
  });
};

// GET ALL
storage.getAll = () => {
  console.log('FILESAVE GETALL');

  debug('getting all');

  return new Promise( (resolve,reject) => {
    fs.readdir(dataDirectory, (err, files) => {
      if(err) {reject(err);}
      let promises = [];
      //loop through the files and push calls to the "readFilePromise" into an array of promises and because were awesome were going to have a Promise.all resolve them IN ORDER that they are in the array.
      while (files.length) {
        let file = files.shift();
        file = `${dataDirectory}/${file}`;
        //i thought to target anything at the END of a word you had to put a $ at the end of the regex  /check out regex101
        if(file.match(/\.json/)) {promises.push( readFilePromise(file));}
      }

      Promise.all(promises)
        .then(contents => {
          let database = contents.reduce((db,data) => {
            let obj = JSON.parse(data.toString());
            db[obj.id] = obj;
            return db;
            //what does reduce do taking in an empty object like this???
          },{});
          resolve(database);
        })
        .catch(console.log);
      //we can you console like this without passing anything into it because it assumes you are passing something into it???
    });
  });
};

storage.get = (id) => {
  // console.log('FILESAVE GET');

  debug(`getting ${id}`);

  return new Promise((resolve,reject) => {
    let file = `${dataDirectory}/${id}.json`;
    //this is createing the relative path to be passed into the fs.readFile async function
    fs.readFile(file, (err,data) => {
      //werwe using error first callback but not in correct order / whats the logic behind this organization??? is there harm in doing it this way? / it may let errors go unchecked 
    //   if (err) {
    //     reject(err);
    //   } else {
    //     let obj = JSON.parse(data.toString());
    //     resolve(obj);
    //   }

      if(data) {
        let obj = JSON.parse(data.toString());
        resolve(obj);
      } else {
        reject(`${id} not found`);
      }
    });
  });

};

storage.save = (data) => {
  console.log('FILESAVE SAVE');
  debug(`saving ${JSON.stringify(data)}`);

  return new Promise((resolve,reject) => {
    if(!data.id) {reject('No Record ID Specified');}

    let file = `${dataDirectory}/${data.id}.json`;
    let text = JSON.stringify(data);

    fs.writeFile( file, text, (err) => {
      if(err) {reject(err);}
      resolve(data);
    });
  });
};

storage.deleteAll = () => {
  console.log('FILESAVE Delete');

  return new Promise((resolve,reject) => {
    // let file = `${dataDirectory}/${data.id}.json`;
    fs.readdir(dataDirectory, (err, files) => {
      console.log('dataDirectory',dataDirectory);
      if (err) throw err;
    
      for (let file of files) {
        file = `${dataDirectory}/${file}`;
        fs.unlink(file, (err) => {
          if (err) {
            console.log('unlink ERROR');
            reject(err);}
          console.log(`${file} was deleted`);
        });
      }
      resolve('DELETE ALL SUCCESS');
    });
  });
};

export default storage;