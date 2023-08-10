import { Attribute, Model } from '@eggjs/tegg/orm';
import { Bone, DataTypes } from 'leoric';

@Model({
  tableName: 'api',
})
export class APIMapper extends Bone {
  @Attribute(DataTypes.BIGINT as any, {
    primary: true,
    autoIncrement: true,
  })
  aid: bigint;

  @Attribute(DataTypes.BIGINT as any)
  pid: bigint;

  @Attribute(DataTypes.BOOLEAN as any)
  deleted: boolean;
}
