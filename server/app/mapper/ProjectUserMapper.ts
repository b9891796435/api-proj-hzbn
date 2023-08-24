import { Attribute, Model } from '@eggjs/tegg/orm';
import { Bone, DataTypes } from 'leoric';

@Model({
  tableName: 'project_user',
})
export class ProjectUserMapper extends Bone {
  @Attribute(DataTypes.BIGINT as any, {
    primary: true,
  })
  pid: bigint;

  @Attribute(DataTypes.BIGINT as any, {
    primary: true,
  })
  uid: bigint;

  @Attribute(DataTypes.INTEGER as any)
  role: number;
}
