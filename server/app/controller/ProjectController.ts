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
import { UserManager } from 'app/core/UserManager';

@HTTPController({
  path: '/projects',
})
export class ProjectController extends AbstractController {
  @Inject()
  private readonly projectService: ProjectService;

  @Inject()
  private readonly userManager: UserManager;

  @HTTPMethod({
    path: '/:pid/members',
    method: HTTPMethodEnum.GET,
  })
  async getMembers(@Context() ctx: EggContext, @HTTPParam() pid: bigint) {
    const currUid = await this.userManager.getAuthorizedUserId(ctx);
    const members = await this.projectService.getMembers(currUid, pid);
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
    const currUid = await this.userManager.getAuthorizedUserId(ctx);
    await this.projectService.changeMemberRole(currUid, pid, uid, vo.role);
    return Response.success();
  }

  @HTTPMethod({
    path: '/:pid/members/:uid',
    method: HTTPMethodEnum.DELETE,
  })
  async removeMember(@Context() ctx: EggContext, @HTTPParam() pid: bigint, @HTTPParam() uid: bigint) {
    const currUid = await this.userManager.getAuthorizedUserId(ctx);
    await this.projectService.removeMember(currUid, pid, uid);
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
    const currUid = await this.userManager.getAuthorizedUserId(ctx);
    await this.projectService.inviteMember(currUid, pid, BigInt(vo.uid), vo.role);
    return Response.success();
  }
}
