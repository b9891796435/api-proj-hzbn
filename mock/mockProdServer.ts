import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import apitem from '../mock/apitem'

// 打包MOCK文件，否则链接请求会404
export function setupProdMockServer() {
  createProdMockServer([...apitem,])
}