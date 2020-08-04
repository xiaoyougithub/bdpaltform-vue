import http from '@/plugins/http'

export function getChildren(){
    return http({
        url:'/zookeeper/getChildren',
        method:'get'
    })
}
export function deleteNode(path){
    return http({
        url:'/zookeeper/deleteNode',
        method:'delete',
        params:path
    })
}
//创建持久化节点
export function createPersistentNode(params){
    return http({
        url:'/zookeeper/createPersistentNode',
        method:'post',
        params
    })
}
//查看节点数据
export function getDataByPath(path){
    return http({
        url:'/zookeeper/getDataByPath',
        method:'get',
        params:path
    })
}
//修改节点数据
export function updateDataByPath(params){
    return http({
        url:'/zookeeper/updateDataByPath',
        method:'put',
        params
    })
}