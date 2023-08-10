import { Attribute, Model } from '@eggjs/tegg/orm';
import { Bone, DataTypes } from 'leoric';

@Model({
  tableName: 'api_history',
})
export class APIHistoryMapper extends Bone {
  @Attribute(DataTypes.BIGINT as any, {
    primary: true,
    autoIncrement: true,
  })
  hid: bigint;

  @Attribute(DataTypes.BIGINT as any)
  aid: bigint;

  @Attribute(DataTypes.BIGINT as any)
  uid: bigint;

  @Attribute(DataTypes.STRING(1024) as any)
  path: string;

  @Attribute(DataTypes.STRING(10) as any)
  method: string;

  @Attribute(DataTypes.DATE as any)
  time: Date;

  @Attribute(DataTypes.TEXT as any)
  summary: string;

  @Attribute(DataTypes.JSON as any)
  parameters: JSON;

  @Attribute(DataTypes.JSON as any)
  responses: JSON;
}
