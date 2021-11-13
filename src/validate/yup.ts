import { SchemaOf, Asserts, object, string, date, number, TypeOf } from 'yup';

type Person = Asserts<typeof personSchema>;

const personSchema = object().shape({
  name: string().required(),
  age: number().required().positive().integer(),
  email: string().email(),
  website: string().url(),
  createdOn: date().default(function () {
    return new Date();
  }),
});

const result = personSchema.validateSync({} as any);

declare const p: Person;

function parseJsonWithSchema<T, S extends SchemaOf<T>>(text: string, schema: S): TypeOf<S> {
  return parseJsonAndValidate(text, value => schema.validateSync(value));
}

function parseJsonAndValidate<T>(text: string, validate: (value: unknown) => asserts value is T): T {
  const json = JSON.parse(text);
  validate(json);
  return json;
}

function parseAndValidateJsonWith(schema) {
  return (text: string) => {
    return value;
  };
}

pipe(tryParseJson, validateJsonWith(personSchema));
