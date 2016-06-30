'use strict';

const test = require('tape');
const syncFlow = require('./index.js');

test('should work', t => {

  let counter = 0;

  const exec = [
    () => {
      counter++
    },
    () => {
      counter++
    },
    () => {
      t.equal(counter,2,'got count');
      t.end();
    }
  ];

  syncFlow(exec,t.end,500);
});

test('should fail', t => {

  const fakeTestEnd = (error) => {
    t.equal(error.name,'TypeError','got stop with TypeError');
    t.end();
  };

  let counter = 0;

  const exec = [
    () => {
      counter++
    },
    () => {
      function causeError () {counter.split()};
      causeError();
    },
    () => {
      t.end();
    }
  ];

  syncFlow(exec,fakeTestEnd,500);
});
