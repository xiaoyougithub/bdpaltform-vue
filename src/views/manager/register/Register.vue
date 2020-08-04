<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="green" dark flat center>
                <v-toolbar-title>大数据监控平台注册</v-toolbar-title>
                <v-spacer/>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="用户名"
                    prepend-icon="mdi-account-circle"
                    type="text"
                    v-model="user.userName"
                  />
                  <v-text-field
                    label="手机号"
                    name="login"
                    v-model="user.telephone"
                    prepend-icon="mdi-phone"
                    type="text"
                    :rules="[rules.required,rules.phone]"
                    hint="满足11位数哦"
                  />
                  <v-text-field
                    label="验证码"
                    :rules="[rules.required]"
                    prepend-icon="mdi-briefcase-account"
                    type="text"
                    v-model="user.code"
                  ></v-text-field>
                  <v-text-field
                    v-model="user.password"
                    prepend-icon="mdi-lock"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="登录密码"
                    hint="达到字符数要求哦"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                  <v-text-field
                    v-model="user.checkPassword"
                    prepend-icon="mdi-lock"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show2 ? 'text' : 'password'"
                    name="input-10-1"
                    label="确认密码"
                    hint="达到字符数要求哦"
                    counter
                    @click:append="show2 = !show2"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn color="green" @click="thisRequireCode">获取验证码</v-btn>
                <v-btn color="green" v-on:click="return_login">返回登录</v-btn>
                <v-btn color="green" v-on:click="registerFun">注册</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { requireCode, register } from "@/api/login";
// import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      show1: false,
      show2: false,
      user: {
        id: null,
        userName: "",
        password: "",
        checkPassword: "",
        telephone: "",
        sex: null,
        sessionId: this.$store.getters.sessionId,
        code:""
      },
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "至少6个字符",
        phone: v => (v.length >= 11) & (v.length <= 11) || "手机必须为11位数",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  props: {
    source: String
  },
  methods: {
    //  ...mapActions(['setSessionId']),
    return_login: function() {
      this.$router.push("/login");
    },
    registerFun: function() {
      register(this.user).then(response => {
        alert(response.status)
        if (response.status == 200) {
            alert("hello")
          // alert(response.data);
          var resBody = JSON.parse(response.data);
          alert(resBody.message)
          if (resBody.code == 666) {
            alert("既然注册成功，那就去登录页登录去吧~");
            this.$router.push("/login");
          }
        } else alert("注册失败");
      });
      // this.$router.push("/");
    },
    // setSessionId(sessionId){},
    thisRequireCode() {
      alert("如没有错误信息，请注意是否收到短信验证码！")
      requireCode({ telephone: this.user.telephone }).then(response => {
        if (response.status == 200) {
          var json = JSON.parse(response.data);
          alert(json.message);
          if (json.code == 666) {
            alert("短信已经发送，请注意查收！");
            this.$store.commit("setSessionId", json.sessionId);
            this.user.sessionId = this.$store.getters.sessionId;
          }else{
              alert(json.message)
          }
          // alert("sessionId成功存入store："+this.customer.sessionId)
        } else {
          alert("请注意您的手机号码是否正确！");
        }
      });
    }
  },
  created() {
    // console.log(this.$router)
  }
};
</script>