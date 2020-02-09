let listeners = {};
const Listener = (function() {
  function _findListener(triggerName, listener) {
    if (listeners[triggerName])
      for (let i = 0; i < listeners[triggerName].length; i++) {
        if (listener == listeners[triggerName][i].listener) return i;
      }
    return -1;
  }

  function addListener(thisVar, triggerName, listener) {
    listeners[triggerName] = { thisVar, listener };
  }

  function removeListener(triggerName) {
    if (listeners[triggerName]) listeners[triggerName] = undefined;
  }

  function trigger(triggerName, ...args) {
    if (listeners[triggerName])
      return listeners[triggerName].listener.call(
        listeners[triggerName].thisVar,
        args
      );
  }

  return { _findListener, addListener, removeListener, trigger };
})();

export default Listener;
