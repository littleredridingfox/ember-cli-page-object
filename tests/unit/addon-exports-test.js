import { test, module } from 'qunit';

module('Unit | Exports');

/* global require */
const Addon = require('ember-cli-page-object');
const Extend = require('ember-cli-page-object/extend');
const Macros = require('ember-cli-page-object/macros');

const EXPECTED_METHODS = [
  'attribute',
  'clickOnText',
  'clickable',
  'collection',
  'contains',
  'count',
  'create',
  'fillable',
  'hasClass',
  'isHidden',
  'isPresent',
  'isVisible',
  'notHasClass',
  'property',
  'selectable',
  'text',
  'value',
  'visitable',
];

const HELPER_METHODS = [
  'buildSelector',
  'findElement',
  'findElementWithAssert',
];

const EXTEND_METHODS = HELPER_METHODS.concat(['findOne', 'findMany']);

const EXPECTED_MACROS = ['alias', 'getter'];

EXPECTED_METHODS.forEach((method) => {
  test(`imports PageObject.${method} from addon`, function (assert) {
    assert.equal(
      typeof Addon['default'][method],
      'function',
      `Imports PageObject.${method}`
    );
  });
});

EXPECTED_METHODS.concat(HELPER_METHODS).forEach((method) => {
  test(`imports { ${method} } from addon`, function (assert) {
    assert.equal(
      typeof Addon[method],
      'function',
      `Imports PageObject.${method}`
    );
  });
});

EXTEND_METHODS.forEach((method) => {
  test(`imports { ${method} } from extend folder`, function (assert) {
    assert.equal(
      typeof Extend['default'][method],
      'function',
      `Imports ${method}`
    );
  });
});

EXPECTED_MACROS.forEach((method) => {
  test(`imports { ${method} } from macros`, function (assert) {
    assert.equal(typeof Macros[method], 'function', `Imports ${method} macro`);
  });
});
