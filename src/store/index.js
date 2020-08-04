import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'//使用yarn add vuex-persist命令添加到项目里
import * as getters from './getters' //相当于引入这个组件下导出的所有实例
import * as mutations from './mutation'
import * as actions from './action'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)
const state={
  sessionId:null,//前台sesssionId
  stageSessionId:null,//后台sessionId
  data:null,//保存前后公共数据，如用户信息
  stageData:null//保存后台公共数据，如管理员信息
}
export default new Vuex.Store({
  state,
  actions,//提交修改方法的组件
  getters,//获取数据的组件
  mutations,//突变，定义修改方法的组件
  plugins: [vuexLocal.plugin]
})