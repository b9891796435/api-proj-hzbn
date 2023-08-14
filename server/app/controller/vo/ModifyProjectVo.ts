import { Static, Type } from '@sinclair/typebox';

const ModifyProjectVoRule = Type.Object({
  name: Type.Optional(Type.String()),
  description: Type.Optional(Type.String()),
});

type ModifyProjectVo = Static<typeof ModifyProjectVoRule>;

export { ModifyProjectVoRule, ModifyProjectVo };
