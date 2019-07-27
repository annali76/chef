import { Record, String } from 'runtypes';
import { isError } from 'lodash';
import { asyncAttempt, validate } from '.';

describe('validate', () => {
  const Message = Record({
    text: String,
  });

  test('returns true if value matches runType', () => {
    const message = { text: 'this is a message' };
    expect(validate(message, Message)).toBe(true);
  });

  test('returns false if value does not match runType', () => {
    const notAMessage = { notAText: 1 };
    expect(validate(notAMessage, Message)).toBe(false);
  });
});

describe('asyncAttempt', () => {
  const result = 'result';

  const successfulFunc = () => result;
  const failingFunc = () => {
    throw new Error();
  };

  describe('successful', () => {
    test('returns result of given function', async () => {
      expect(await asyncAttempt(successfulFunc)).toBe(result);
    });
  });

  describe('failure', () => {
    test('returns error', async () => {
      expect(isError(await asyncAttempt(failingFunc))).toBe(true);
    });
  });
});
