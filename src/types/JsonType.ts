import { expectAssignable, expectNotAssignable } from 'tsd';

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const exampleStatusJSON: Json = {
  available: true,
  username: 'minidonut',
  room: {
    name: 'default',
    // Cannot add functions into the Json type
    // update: () => {},
  },
};

type DataPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];

type DataPropertiesOnly<T> = {
  [P in DataPropertyNames<T>]: T[P] extends Record<string, unknown> ? DTO<T[P]> : T[P];
};

export type DTO<T> = DataPropertiesOnly<T>;

type Ticket = {
  name: string;
  available(now: number): boolean;
};

expectAssignable<Ticket>({ name: '', available: () => true });
expectAssignable<DTO<Ticket>>({ name: '' });
expectNotAssignable<DTO<Ticket>>({ name: '', available: () => true });
