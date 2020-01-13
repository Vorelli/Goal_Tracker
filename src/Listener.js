const Listener = function() {
    let listeners = {};

    function _findListener(triggerName, listener) {
        if(!!listeners[triggerName])
            for (let i = 0; i < listeners[triggerName].length; i++) {
                if(listener == listeners[triggerName][i])
                    return i;
            }
        return -1;
    }

    function addListener (triggerName, listener) {
        if (!listeners[triggerName])
            listeners[triggerName] = [];
        if(_findListener(triggerName, listener) == -1)
            listeners[triggerName].push(listener);
    }

    function removeListener(triggerName, listener) {
        if(!!listeners[triggerName])
            if(_findListener(triggerName, listener) != -1)
                return listeners[triggerName].splice(_findListener(triggerName, listener), 1);
        return null;
    }

    function trigger(triggerName, ...args) {
        if(!!listeners[triggerName])
            return listeners[triggerName][0].call(this, args);
    }

    return {addListener, removeListener, trigger};
}()
export default Listener;