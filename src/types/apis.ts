import { oas30 } from 'openapi3-ts'
export interface APIHistory {
    path: string,
    method: string,
    summary: string,
    parameters: oas30.ParameterObject[],
    responses: {
        code: number,
        description: string,
        content: {
            MIME: string,
            schema: oas30.SchemaObject | oas30.ReferenceObject
        }[]
    }[],
    hid: number,
    time: number,
    uid: number
}
export interface APItem {
    aid: number,
    deleted: boolean,
    details: APIHistory
}
export interface Project {
    APItems: APItem,
    members: {
        username: string,
        uid: number
    },
    name: string,
    description: string,
    pid: number
}