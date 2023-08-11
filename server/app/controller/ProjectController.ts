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
import Response, { ResponseCode } from 'app/core/Response';
import { AbstractController } from './AbstractController';
import { ProjectService } from 'app/service/ProjectService';
import { ChangeRoleVo, ChangeRoleVoRule } from './vo/ChangeRoleVo';
import { InviteUserVo, InviteUserVoRule } from './vo/InviteUserVo';
import { RoleEnum } from 'app/dao/bo/ProjectUserBo';
import BusinessException from 'app/core/BusinessException';

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
    await this.projectService.changeMemberRole(pid, uid, vo.role);
    return Response.success();
  }

  @HTTPMethod({
    path: '/:pid/members/:uid',
    method: HTTPMethodEnum.DELETE,
  })
  async removeMember(@HTTPParam() pid: bigint, @HTTPParam() uid: bigint) {
    await this.projectService.removeMember(pid, uid);
    return Response.success();
  }

  @HTTPMethod({
    path: '/:pid/members/invitation',
    method: HTTPMethodEnum.POST,
  })
  async inviteMember(
    @Context() ctx: EggContext,
    @HTTPParam() pid: bigint,
    @HTTPBody() vo: InviteUserVo,
  ) {
    this.logger.debug('invite member', pid, vo);
    ctx.tValidate(InviteUserVoRule, vo);
    this.logger.debug(vo.role === RoleEnum.OWNER);
    if (vo.role === RoleEnum.OWNER) {
      throw new BusinessException(
        ResponseCode.BAD_REQUEST,
        '被邀请人的角色不能为项目拥有者',
      );
    }
    await this.projectService.inviteMember(pid, BigInt(vo.uid), vo.role);
    return Response.success();
  }
}
