/**
 * Sample test to verify Jest setup is working.
 * This file can be removed once real tests are added.
 */

describe('Jest Setup', () => {
  it('should run a basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle async tests', async () => {
    const result = await Promise.resolve('success');
    expect(result).toBe('success');
  });

  it('should work with TypeScript types', () => {
    interface TestInterface {
      name: string;
      value: number;
    }

    const testObj: TestInterface = {
      name: 'test',
      value: 42,
    };

    expect(testObj.name).toBe('test');
    expect(testObj.value).toBe(42);
  });
});
