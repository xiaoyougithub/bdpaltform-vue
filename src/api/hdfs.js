import http from '@/plugins/http'

//上传文件到后端
export function upload(file){
    return http({
        url:'/hdfs/upload',
        method:'post',
        data:file,
        // headers: {
        //     'Content-Type': 'multipart/form-data'
        //   }
    })
}
//获取文件列表
export function getFileList(){
    return http({
        url:'/hdfs/getFileList',
        method:'get',
    })
}