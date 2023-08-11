import {
  Context,
  EggContext,
  HTTPBody,
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  HTTPParam,
  Inject,
} from '@eggjs/tegg';
import Response from 'app/core/Response';
import { AbstractController } from './AbstractController';
import { ProjectService } from 'app/service/ProjectService';
import { ChangeRoleVo, ChangeRoleVoRule } from './vo/ChangeRoleVo';

@HTTPController({
  path: '/projects',
})
export class ProjectController extends AbstractController {
  @Inject()
  private readonly projectService: ProjectService;

  @HTTPMethod({
    path: '/:pid/members',
    method: HTTPMethodEnum.GET,
  })
  async getMembers(@HTTPParam() pid: bigint) {
    const members = await this.projectService.getMembers(pid);
    return Response.success({ members });
  }

  @HTTPMethod({
    path: '/:pid/members/:uid',
    method: HTTPMethodEnum.PUT,
  })
  async changeMemberRole(
    @Context() ctx: EggContext,
    @HTTPParam() pid: bigint,
    @HTTPParam() uid: bigint,
    @HTTPBody() vo: ChangeRoleVo,
  ) {
    ctx.tValidate(ChangeRoleVoRule, vo);
    return Response.success({
      pid,
      uid,
      role: vo.role,
    });
  }
}
