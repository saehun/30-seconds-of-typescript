/**
 * Problem introduced by - Karl Saehun Chung (https://github.com/minidonut)
 * Solved by - https://github.com/sokcuri
 */
type User = { id: string; name: string };

type AssertsType<T extends (...args: any) => any> = T extends (arg: any, ...args: any) => asserts arg is infer R
  ? R
  : any;

declare function assertUser(value: unknown): asserts value is User;
declare function assertUserDerived(value: unknown): asserts value is AssertsType<typeof assertUser>;
//                                                                   ^^^^^^^^^^^
//                                                doesn't work with: ReturnType<typeof assertUser>;

declare const user1: unknown;
declare const user2: unknown;

let user: User;

assertUser(user1);
user = user1;

assertUserDerived(user2);
user = user2;
