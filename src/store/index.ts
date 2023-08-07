import { createStore } from 'vuex'
import apis, { APIState } from './apis/index.ts'


/* 定义根级State类型 */
export type RootState = {
    apis: APIState
}

const store = createStore<RootState>({
    modules: {
        apis,
    }
})

export default store;