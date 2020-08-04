import http from '@/plugins/http'

export function selectUserList(){
    return http({
        url:'/user/list',
        method:'get'
    })
}
export function insertUser(user){
    return http({
        url:'/user/insertUser',
        method:'post',
        params:user
    })
}
export function updateUserByUser(user){
    return http({
        url:'/user/updateUserByUser',
        method:'put',
        params:user
    })
}
export function deleteUserById(id){
    return http({
        url:'/user/deleteUserById',
        method:'delete',
        params:id
    })
}
export function selectListByPage(myRequestBody){
    return http({
        url:'/user/selectListByPage',
        method:'get',
        params:myRequestBody
    })
}