import { Static, Type } from '@sinclair/typebox';
import { RoleEnum } from '../../dao/bo/ProjectUserBo';

const ChangeRoleVoRule = Type.Object({
  role: Type.Enum(RoleEnum),
});

type ChangeRoleVo = Static<typeof ChangeRoleVoRule>;

export { ChangeRoleVoRule, ChangeRoleVo };
