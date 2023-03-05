import { setupRenderingTest, TestContext } from '../../../helpers';
import {
  create,
  property,
  value
} from 'ember-cli-page-object';
import { getter } from 'ember-cli-page-object/macros';
import { module, test } from 'qunit';

module('getter', function(hooks) {
  setupRenderingTest(hooks);

  test('returns the result of the passed-in function', function(this: TestContext, assert) {
    assert.expect(2);

    const page = create({
      foo: getter(function() {
        return 'lorem';
      }),
      bar: getter(function() {
        return 'ipsum';
      })
    });

    assert.equal(page.foo, 'lorem');
    assert.equal(page.bar, 'ipsum');
  });

  test('executes the passed-in function with the correct context for `this`', async function (this: TestContext, assert) {
    assert.expect(1);

    type Getter<T> = ReturnType<typeof getter<Record<string, unknown>, T>>;

    type Definition = {
      inputValue: Getter<string>,
      isSubmitButtonDisabled: Getter<boolean>,
      isFormEmpty: Getter<boolean>
    }

    const def: Definition = {
      inputValue: value('input'),
      isSubmitButtonDisabled: property('disabled', 'button'),
      isFormEmpty: getter<Definition> (function() {
        return !this.inputValue && this.isSubmitButtonDisabled;
      })
    }
    const page = create(def);

    await this.createTemplate(`
      <input value="">
      <button disabled="true">Submit</button>
    `);

    assert.true(page.isFormEmpty);
  });

  test('calls the passed-in function with the property key', function(this: TestContext, assert) {
    assert.expect(2);

    const page = create({
      foo: getter(function(key: string) {
        assert.equal(key, 'foo');
        return true;
      })
    });

    assert.ok(page.foo);
  });

  test('throws an error if a function is not passed in', function(this: TestContext, assert) {
    assert.expect(1);

    const page = create({
      foo: getter('not a function' as any)
    });

    assert.throws(
      () => page.foo,
      /must be a function/,
      'Argument passed to getter must be a function'
    );
  });
});