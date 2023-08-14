import {
  Context,
  EggContext,
  HTTPBody,
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  HTTPParam,
  HTTPQuery,
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
import { CreateAPIVo, CreateAPIVoRule } from './vo/CreateAPIVo';
import { RestoreAPIHistoryVo, RestoreAPIHistoryVoRule } from './vo/RestoreAPIHistoryVo';
import { CreateProjectVo, CreateProjectVoRule } from './vo/CreateProjectVo';
import { ModifyProjectVo, ModifyProjectVoRule } from './vo/ModifyProjectVo';

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

  @HTTPMethod({
    path: '/:pid/apis',
    method: HTTPMethodEnum.GET,
  })
  async getAPIs(
    @Context() ctx: EggContext,
    @HTTPParam() pid: bigint,
  ) {
    const currUid = await this.userManager.getAuthorizedUserId(ctx);
    const apis = await this.projectService.getAPIs(currUid, pid);
    return Response.success({ apis });
  }

  @HTTPMethod({
    path: '/:pid/apis',
    method: HTTPMethodEnum.POST,
  })
  async createAPI(
    @Context() ctx: EggContext,
    @HTTPParam() pid: bigint,
    @HTTPBody() vo: CreateAPIVo,
  ) {
    ctx.tValidate(CreateAPIVoRule, vo);
    const currUid = await this.userManager.getAuthorizedUserId(ctx);
    await this.projectService.createAPI(currUid, pid, vo);
    return Response.success();
  }

  @HTTPMethod({
    path: ':pid/apis/:aid',
    method: HTTPMethodEnum.PUT,
  })
  async modifyAPI(
    @Context() ctx: EggContext,
    @HTTPParam() pid: bigint,
    @HTTPParam() aid: bigint,
    @HTTPBody() vo: CreateAPIVo,
  ) {
    ctx.tValidate(CreateAPIVoRule, vo);
    const currUid = await this.userManager.getAuthorizedUserId(ctx);
    await this.projectService.modifyAPI(currUid, pid, aid, vo);
    return Response.success();
  }

  @HTTPMethod({
    path: ':pid/apis/:aid',
    method: HTTPMethodEnum.DELETE,
  })
  async trashAPI(
    @Context() ctx: EggContext,
    @HTTPParam() pid: bigint,
    @HTTPParam() aid: bigint,
  ) {
    const currUid = await this.userManager.getAuthorizedUserId(ctx);
    await this.projectService.trashAPI(currUid, pid, aid);
    return Response.success();
  }

  @HTTPMethod({
    path: ':pid/recycle_bin',
    method: HTTPMethodEnum.GET,
  })
  async getAPIsInRecycleBin(
    @Context() ctx: EggContext,
    @HTTPParam() pid: bigint,
  ) {
    const currUid = await this.userManager.getAuthorizedUserId(ctx);
    const apis = await this.projectService.getAPIsInRecycleBin(currUid, pid);
    return Response.success({ apis });
  }

  @HTTPMethod({
    path: ':pid/recycle_bin/:aid',
    method: HTTPMethodEnum.POST,
  })
  async recoveryAPIsInRecycleBin(
    @Context() ctx: EggContext,
    @HTTPParam() pid: bigint,
    @HTTPParam() aid: bigint,
  ) {
    const currUid = await this.userManager.getAuthorizedUserId(ctx);
    await this.projectService.recoveryAPIsInRecycleBin(currUid, pid, aid);
    return Response.success();
  }

  @HTTPMethod({
    path: ':pid/apis/:aid/history',
    method: HTTPMethodEnum.GET,
  })
  async getAPIHistories(
    @Context() ctx: EggContext,
    @HTTPParam() pid: bigint,
    @HTTPParam() aid: bigint,
  ) {
    const currUid = await this.userManager.getAuthorizedUserId(ctx);
    const apis = await this.projectService.getAPIHistories(currUid, pid, aid);
    return Response.success({ apis });
  }

  @HTTPMethod({
    path: ':pid/apis/:aid/history',
    method: HTTPMethodEnum.PUT,
  })
  async restoreAPIHistory(
    @Context() ctx: EggContext,
    @HTTPParam() pid: bigint,
    @HTTPParam() aid: bigint,
    @HTTPBody() vo: RestoreAPIHistoryVo,
  ) {
    ctx.tValidate(RestoreAPIHistoryVoRule, vo);
    const currUid = await this.userManager.getAuthorizedUserId(ctx);
    const apis = await this.projectService.restoreAPiHistory(currUid, pid, aid, BigInt(vo.hid));
    return Response.success({ apis });
  }

  @HTTPMethod({
    path: '/',
    method: HTTPMethodEnum.POST,
  })
  async createProject(
    @Context() ctx: EggContext,
    @HTTPBody() vo: CreateProjectVo,
  ) {
    ctx.tValidate(CreateProjectVoRule, vo);
    const currUid = await this.userManager.getAuthorizedUserId(ctx);
    await this.projectService.createProject(currUid, vo.name);
    return Response.success();
  }

  @HTTPMethod({
    path: '',
    method: HTTPMethodEnum.GET,
  })
  async getProjects(
    @Context() ctx: EggContext,
    @HTTPQuery() page: number,
    @HTTPQuery() per_page: number,
  ) {
    const currUid = await this.userManager.getAuthorizedUserId(ctx);
    const projects = await this.projectService.getProjects(currUid, page, per_page);
    return Response.success(projects);
  }

  @HTTPMethod({
    path: ':pid',
    method: HTTPMethodEnum.GET,
  })
  async getProject(
    @Context() ctx: EggContext,
    @HTTPParam() pid: bigint,
  ) {
    const currUid = await this.userManager.getAuthorizedUserId(ctx);
    const project = await this.projectService.getProject(currUid, pid);
    return Response.success(project);
  }

  @HTTPMethod({
    path: ':pid',
    method: HTTPMethodEnum.PUT,
  })
  async modifyProject(
    @Context() ctx: EggContext,
    @HTTPParam() pid: bigint,
    @HTTPBody() vo: ModifyProjectVo,
  ) {
    ctx.tValidate(ModifyProjectVoRule, vo);
    const currUid = await this.userManager.getAuthorizedUserId(ctx);
    await this.projectService.modifyProject(currUid, pid, vo);
    return Response.success();
  }

  @HTTPMethod({
    path: ':pid',
    method: HTTPMethodEnum.DELETE,
  })
  async removeProject(
    @Context() ctx: EggContext,
    @HTTPParam() pid: bigint,
  ) {
    const currUid = await this.userManager.getAuthorizedUserId(ctx);
    await this.projectService.removeProject(currUid, pid);
    return Response.success();
  }
}
