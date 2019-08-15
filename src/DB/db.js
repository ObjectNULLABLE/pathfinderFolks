import Dexie from "dexie"

const db = new Dexie('pathfinder');
db.version(1).stores({ folks: '++,name,class,cr,race,xp,fort,ref,will' });

db.folks.hook("creating", function (primKey, obj, trans) {
  if (typeof obj.name == 'string') obj.searchableName = getAllWords(obj.name);
});

db.folks.hook("updating", function (mods, primKey, obj, trans) {
  if (mods.hasOwnProperty("name")) {
      // "name" property is being updated
      if (typeof mods.name == 'string')
          // "name" property was updated to another valid value. Re-index searchableName:
          return { searchableName: getAllWords(mods.name) };
      else
          // "name" property was deleted (typeof mods.name === 'undefined') or changed to an unknown type. Remove indexes:
          return { searchableName: [] };
  }

});

function getAllWords(text) {
  /// <param name="text" type="String"></param>
  var allWordsIncludingDups = text.split(' ');
  var wordSet = allWordsIncludingDups.reduce(function (prev, current) {
      prev[current] = true;
      return prev;
  }, {});
  return Object.keys(wordSet);
}

export default db;