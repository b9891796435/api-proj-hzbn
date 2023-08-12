import { Static, Type } from '@sinclair/typebox';

const RestoreAPIHistoryVoRule = Type.Object({
  // FIXME: hid 应为 bigint，但是设置成 bigint 会校验失败
  hid: Type.Number(),
});

type RestoreAPIHistoryVo = Static<typeof RestoreAPIHistoryVoRule>;

export { RestoreAPIHistoryVoRule, RestoreAPIHistoryVo };
