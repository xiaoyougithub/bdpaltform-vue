import http from '@/plugins/http'

export function selectCpuList(){
    return http({
        url:'/performance/cpu/list',
        method:'get'
    })
}