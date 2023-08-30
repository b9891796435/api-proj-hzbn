import { OAUTH } from "../constant/login";
import { ElMessage } from 'element-plus';
import router from "../router";
import baseResponse from '../types/Response'
import { APIHistory } from "@/types/apis";
let baseUrl = 'http://49.233.63.192:7001'
export const authRequest: (url: string, headers: Headers, init?: RequestInit,) => null | Promise<baseResponse<any>> = async (url, headers, init?) => {
    const auth = localStorage.getItem(OAUTH.TOKEN);
    if (auth == null || auth == '') {
        ElMessage({
            message: OAUTH.NO_AUTH_ERROR,
            type: 'error'
        })
        setTimeout(() => {
            router.push('/')
        }, 1500)
        return;
    }
    headers.append('Authorization', auth);
    headers.append('Content-Type', 'application/json')
    return (await fetch(baseUrl + url, { ...init, headers })).json()
}
export const apis = {
    login: async (args: { username: string, password: string }) => {
        return (await fetch(baseUrl + '/login', { method: 'POST', body: JSON.stringify(args), headers: { 'Content-Type': 'application/json' } })).json() as Promise<baseResponse<{
            token: string,
            uid: number,
            username: string
        }>>;
    },
    register: async (args: { username: string, password: string }) => {
        return (await fetch(baseUrl + '/register', { method: 'POST', body: JSON.stringify(args), headers: { 'Content-Type': 'application/json' } })).json() as Promise<baseResponse<{
            token: string
        }>>;
    },
    Projects: {
        getAll: async (args: { page: number, per_page: number }) => {
            return authRequest(`/projects?page=${args.page}&per_page=${args.per_page}`, new Headers(), { method: 'GET' });
        },
        create: async (args: { name: string }) => {
            return authRequest('/projects', new Headers(), { method: 'POST', body: JSON.stringify(args) });
        },
        Project: {
            getAllMembers: async (pid: number) => {
                return authRequest(`/projects/${pid}/members`, new Headers(), { method: 'GET' });
            },
            editMemberRole: async (pid: number, uid: number) => {
                return authRequest(`/projects/${pid}/members/${uid}`, new Headers(), { method: 'GET' });
            },
            deleteMember: async (pid: number, uid: number) => {
                return authRequest(`/projects/${pid}/members/${uid}`, new Headers(), { method: 'DELETE' });
            },
            inviteMember: async (pid: number, uid: number, role: number) => {
                return authRequest(`/projects/${pid}/members/invitation`, new Headers(), {
                    method: 'POST', body: JSON.stringify({
                        uid, role
                    })
                });
            },
            getBasicInfo: async (pid: number) => {
                return authRequest(`/projects/${pid}`, new Headers(), { method: 'GET' });
            },
            setBasicInfo: async (pid: number, args: {
                description: string,
                name: string
            }) => {
                return authRequest(`/projects/${pid}`, new Headers(), { method: 'PUT', body: JSON.stringify(args) });
            },
            deleteProject: async (pid: number) => {
                return authRequest(`/projects/${pid}`, new Headers(), { method: 'DELETE' });
            },
            Interface: {
                getAll: async (pid: number) => {
                    return authRequest(`/projects/${pid}/apis`, new Headers(), { method: 'GET' });
                },
                updateInterface: async (pid: number, aid: number, args: Partial<APIHistory>) => {
                    return authRequest(`/projects/${pid}/apis/${aid}`, new Headers(), { method: 'PUT', body: JSON.stringify(args) });
                },
                deleteInterface: async (pid: number, aid: number) => {
                    return authRequest(`/projects/${pid}/apis/${aid}`, new Headers(), { method: 'DELETE' });
                },
                createInterface: async (pid: number, args: APIHistory) => {
                    return authRequest(`/projects/${pid}/apis`, new Headers(), { method: 'POST', body: JSON.stringify(args) });
                },
                getHistory: async (pid: number, aid: number) => {
                    return authRequest(`/projects/${pid}/apis/${aid}/history`, new Headers(), { method: 'GET' });
                },
                recoverHistory: async (pid: number, aid: number, hid: number) => {
                    return authRequest(`/projects/${pid}/apis/${aid}/history`, new Headers(), { method: 'PUT', body: JSON.stringify({ hid }) });
                },
            }
        }
    }
}