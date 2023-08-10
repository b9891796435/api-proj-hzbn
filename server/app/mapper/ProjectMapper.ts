import { Attribute, Model } from '@eggjs/tegg/orm';
import { Bone, DataTypes } from 'leoric';

@Model({
  tableName: 'project',
})
export class ProjectMapper extends Bone {
  @Attribute(DataTypes.BIGINT as any, {
    primary: true,
    autoIncrement: true,
  })
  pid: bigint;

  @Attribute(DataTypes.STRING(255) as any)
  name: string;

  @Attribute(DataTypes.TEXT as any)
  description: string;
}
