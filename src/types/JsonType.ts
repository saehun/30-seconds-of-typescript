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
