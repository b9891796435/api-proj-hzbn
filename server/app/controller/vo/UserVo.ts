import { Static, Type } from '@sinclair/typebox';

const UserVoRule = Type.Object({
  username: Type.String({ minLength: 3, maxLength: 20 }),
  password: Type.String({ minLength: 8, maxLength: 100 }),
});

type UserVo = Static<typeof UserVoRule>;

export { UserVoRule, UserVo };
