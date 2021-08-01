import 'reflect-metadata';
import { classToPlain, Expose, plainToClass } from 'class-transformer';
import { IsString } from 'class-validator';

class User {
  @Expose({ name: 'user_id' })
  id: number;

  @Expose({ name: 'user_name' })
  @IsString()
  name: string;

  isRegistered: boolean;
}

(() => {
  const user = plainToClass(User, { user_id: 1, user_name: true });
  console.log(user);
  console.log(classToPlain(user, { strategy: 'excludeAll' }));
})();
