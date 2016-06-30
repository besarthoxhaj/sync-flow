'use strict';

module.exports = function (exec,callFunc,timer) {
  let count = 0;
  const id = setInterval(() => {
    try {
      exec[count]();
      if (count === exec.length - 1) {
        clearInterval(id);
      } else {
        count = count + 1;
      }
    } catch (e) {
      callFunc(e);
      clearInterval(id);
    }
  },timer);
};
