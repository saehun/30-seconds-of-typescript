import Joi from 'joi';

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  follower: Omit<User, 'follower' | 'name' | 'createdAt'>[];
}

/* ---------------------------------------------------------- *
 *
 *  1. User validation
 *
 * ---------------------------------------------------------- */
const userSchema = Joi.object<User>({
  id: Joi.number(),
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({ ignoreLength: true }),
  createdAt: Joi.date().iso(),
  follower: Joi.array().items(
    Joi.object({
      id: Joi.number(),
      name: Joi.string().min(3).max(30),
      email: Joi.string().email({ ignoreLength: true }),
    })
  ),
});

export function validateUser(user: User) {
  const { error, value } = userSchema.validate(user, { presence: 'required' });
  if (error) {
    throw error;
  }
  return value;
}
