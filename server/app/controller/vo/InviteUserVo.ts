import { Static, Type } from '@sinclair/typebox';
import { RoleEnum } from '../../dao/bo/ProjectUserBo';

const InviteUserVoRule = Type.Object({
  // FIXME: uid 应为 bigint，但是设置成 bigint 会校验失败
  uid: Type.Number(),
  role: Type.Enum(RoleEnum),
});

type InviteUserVo = Static<typeof InviteUserVoRule>;

export { InviteUserVoRule, InviteUserVo };
