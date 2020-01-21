const UserStorage = function() {
    const that = this;
    let storage = window.localStorage;

    function load(key) {
        return storage.getItem(key);
    }

    function save(key, value) {
        storage.setItem(key, value)
    }
    
    return {save, load};
}();

export default UserStorage;