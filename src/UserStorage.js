const UserStorage = (function() {
  let storage = window.localStorage;

  function load(key) {
    return storage.getItem(key);
  }

  function save(key, value) {
    storage.setItem(key, value);
  }

  return { load, save };
})();

export default UserStorage;
