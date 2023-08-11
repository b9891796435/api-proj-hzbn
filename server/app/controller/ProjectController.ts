import {
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  HTTPParam,
  Inject,
} from '@eggjs/tegg';
import Response from 'app/core/Response';
import { AbstractController } from './AbstractController';
import { ProjectService } from 'app/service/ProjectService';

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
}
