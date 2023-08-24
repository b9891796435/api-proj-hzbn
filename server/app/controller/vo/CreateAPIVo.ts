import { Static, Type } from '@sinclair/typebox';
import { HTTPMethodEnum } from 'app/dao/bo/APIHistoryBo';

const CreateAPIVoRule = Type.Object({
  path: Type.String(),
  summary: Type.String(),
  method: Type.Enum(HTTPMethodEnum),
  parameters: Type.Optional(Type.Any()),
  responses: Type.Optional(Type.Any()),
});

type CreateAPIVo = Static<typeof CreateAPIVoRule>;

export { CreateAPIVoRule, CreateAPIVo };
