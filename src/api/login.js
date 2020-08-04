import http from '@/plugins/http'

export function login(user){
    return http({
        url:'/user/login',
        method:'post',
        params:user
    })
}

export function requireCode(telephone){
    return http({
        url:'/user/requireCode',
        method:'post',
        params:telephone
    })
}

export function register(user){
    return http({
        url:'/user/register',
        method:'post',
        params:user
    })
}