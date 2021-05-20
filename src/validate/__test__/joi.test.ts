import { validateUser } from '../joi';

describe('joi', () => {
  it('can validate', () => {
    const result = validateUser({
      email: 'nycom13@gmail.com',
      name: 'Karl Saehun Chung',
      id: 1234,
      createdAt: new Date().toISOString(),
      follower: [],
    });
    expect(result).toBeTruthy();
  });

  it('can throw error', () => {
    const fn = () =>
      validateUser({
        name: 'Saehun',
        email: 'nycom13@gmail.com',
        id: 1234,
        follower: [],
      } as any);
    expect(fn).toThrowError();
  });
});
