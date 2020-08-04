//普通写法
export function setSessionId ({commit} ,sessionId) {
    alert("进来了")
    alert(sessionId)
    return commit('setSessionId',sessionId)
}
//普通写法
export function setStageSessionId ({commit} ,stageSessionId) {
    return commit('setStageSessionId',stageSessionId)
}
//es6的简洁写法
export const setNull=({commit})=>{
    commit('setNull')
}
//设置data的方法
export const setData=({commit},data)=>{
    commit('setData',data)
}
//设置stageData的方法
export const setStageData=({commit},stageData)=>{
    commit('setStageData',stageData)
}