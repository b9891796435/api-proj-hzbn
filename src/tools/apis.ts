import { OAUTH } from "../constant/login";
import { ElMessage } from 'element-plus';
import router from "../router";
import baseResponse from '../types/Response'
let baseUrl = 'http://localhost:5173/api'
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
    return (await fetch(url, { ...init, headers })).json()
}
export const apis = {
    login: async (args: { username: string, password: string }) => {
        return (await fetch(baseUrl + '/login', { method: 'POST', body: JSON.stringify(args) })).json() as Promise<baseResponse<{
            token: string
        }>>;
    },
    register: async (args: { username: string, password: string }) => {
        return (await fetch(baseUrl + '/register', { method: 'POST', body: JSON.stringify(args) })).json() as Promise<baseResponse<{
            token: string
        }>>;
    },
    Projects: {
        getAll: async () => {
            return authRequest('/projects', new Headers(), { method: 'GET' });
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
            Interface: {
                getAll: async (pid: number) => {
                    return authRequest(`/projects/${pid}/apis`, new Headers(), { method: 'GET' });
                }
            }
        }
    }
}