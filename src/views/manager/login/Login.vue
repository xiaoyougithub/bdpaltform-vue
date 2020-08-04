<template>
  <div class="bg">
    <v-app id="inspire">
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-12">
                <v-toolbar color="green" dark flat center>
                  <v-toolbar-title>大数据监控平台登录</v-toolbar-title>
                  <v-spacer/>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="手机号"
                      name="login"
                      v-model="user.telephone"
                      prepend-icon="mdi-account-circle"
                      type="text"
                      :rules="[rules.required,rules.phone]"
                      hint="满足11位数哦"
                    />

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
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer/>
                  <v-btn color="green" v-on:click="login">登录</v-btn>
                  <v-btn color="green" v-on:click="register">注册</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { login } from "@/api/login";
export default {
  props: {
    source: String
  },
  data() {
    return {
      user: {
        telephone: "",
        password: ""
      },
      show1: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "至少6个字符",
        phone: v => (v.length >= 11) & (v.length <= 11) || "手机必须为11位数",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  methods: {
    login: function() {
      login(this.user).then(response => {
        if (response.status == 200) {
          var res = JSON.parse(response.data); //data是jason字符串需要解析为json对象
          // alert(response.data);
          if (res.code == 666) {
            alert("登录成功！");
            this.$store.commit("setData", res);
            this.$router.push("/");
          } else {
            alert("登录失败【" + res.message + "】");
          }
        } else {
          alert("登录失败！");
        }
      });
    },
    register: function() {
      this.$router.push("/register");
    }
  },
  created() {
    // console.log(this.$router)
    
  }
};
</script>
