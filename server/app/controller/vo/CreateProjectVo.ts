import { Static, Type } from '@sinclair/typebox';

const CreateProjectVoRule = Type.Object({
  name: Type.String(),
});

type CreateProjectVo = Static<typeof CreateProjectVoRule>;

export { CreateProjectVoRule, CreateProjectVo };
