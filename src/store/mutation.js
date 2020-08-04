export const setSessionId =(state,sessionId) =>{
    state.sessionId=sessionId
}
export const setStageSessionId =(state,stageSessionId) =>{
    state.stageSessionId=stageSessionId
}
export const setNull= (state) =>{
    state.sessionId=null
    state.data=null
}
export const setData= (state,data) =>{
    state.data=data
}
export const setStageData= (state,stageData) =>{
    state.stageData=stageData
}