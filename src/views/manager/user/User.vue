<template>
  <div>
    <v-row justify="left">
      <!-- 添加按钮和添加弹框 -->
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="green" dark v-on="on">
            <v-icon dark>mdi-plus</v-icon>添加
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">添加系统用户</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    label="用户名*"
                    required
                    v-model="user.userName"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    label="手机号*"
                    required
                    v-model="user.telephone"
                    :rules="[rules.required,rules.phone]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    label="密码*"
                    hint="至少6位数"
                    required
                    v-model="user.password"
                    :rules="[rules.required, rules.min]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    :items="this.genders"
                    label="性别*"
                    required
                    v-model="user.sex"
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
            <small>*表示是必填的字段</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">关闭</v-btn>
            <v-btn color="blue darken-1" text v-on:click="funInsertUserByUser">添加</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!--修改弹出层  -->
    <v-dialog v-model="editDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">修改用户信息</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  label="用户名*"
                  required
                  v-model="user.userName"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  label="手机号*"
                  required
                  v-model="user.telephone"
                  :rules="[rules.required,rules.phone]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  label="密码*"
                  hint="至少8位数"
                  required
                  v-model="user.password"
                  :rules="[rules.required, rules.min]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  :items="this.genders"
                  label="性别*"
                  required
                  v-model="user.sex"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*表示是必填的字段</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editDialog = false">关闭</v-btn>
          <v-btn color="blue darken-1" text v-on:click="funUpdateUserByUser">更新</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 表格 -->
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">序号</th>
            <th class="text-left">用户id</th>
            <th class="text-left">系统用户</th>
            <th class="text-left">手机号</th>
            <th class="text-left">系统密码</th>
            <th class="text-left">性别</th>
            <th class="text-left">注册时间</th>
            <th colspan="2" class="text-left">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,name) in desserts" :key="item.name">
            <td>{{ name+1 }}</td>
            <td>{{ item.id }}</td>
            <td>{{ item.userName }}</td>
            <td>{{item.telephone}}</td>
            <td>{{item.password}}</td>
            <td>{{ item.sex }}</td>
            <td>{{item.createTime}}</td>
            <td>
              <v-btn small color="primary" @click="showEditPoppu(item)">
                <v-icon dark>mdi-pencil</v-icon>编辑
              </v-btn>
            </td>
            <td>
              <v-btn small color="error" @click="showDeletePoppu(item)">
                <v-icon dark>mdi-minus</v-icon>删除
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <!-- 分页 -->
    <template>
      <div class="text-center">
        <v-container>
          <v-row justify="center">
            <v-col cols="8">
              <v-container class="max-width">
                <v-pagination v-model="pageNo" :length="this.pages" circle :total-visible="8"></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </template>
  </div>
</template>
<script>
import {
  selectListByPage,
  insertUser,
  updateUserByUser,
  deleteUserById
} from "@/api/user";

export default {
  data() {
    return {
      desserts: null,
      dialog: false,
      editDialog: false,
      genders: ["男", "女"],
      user: {
        id: null,
        userName: "", //属性值必须要初始化
        telephone: "",
        password: "",
        sex: "",
        createTime: null
      },
      pageNo: 1,
      pages: 3, //默认总页数
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "至少6个字符",
        phone: v => (v.length >= 11) & (v.length <= 11) || "手机必须为11位数",
        emailMatch: () => "The email and password you entered don't match"
      },
      myRequestBody: {
        pageNo: 1, //默认请求页编号
        pageSize: 2, //请求的每页数量
        data: null,
        sessionId: null,
        token: null
      }
    };
  },
  created() {
    //查询用户列表
    selectListByPage(this.myRequestBody).then(response => {
      if (response.status == 200) {
        // alert("页面加载第一步，看看200返回数据：" + response.data);
        var res = JSON.parse(response.data); //data是jason字符串需要解析为json对象
        this.desserts = res.data;
        this.pages = res.pages;
      } else {
        alert("error");
      }
    });
  },
  methods: {
    //显示编辑弹框
    showEditPoppu(item) {
      this.user.id = item.id;
      this.user.userName = item.userName;
      this.user.telephone = item.telephone;
      this.user.password = item.password;
      this.user.sex = item.sex;
      this.user.createTime = item.createTime;
      this.editDialog = true;
    },
    //更新用户
    funUpdateUserByUser() {
      this.editDialog = false;
      // alert("请求前让我看一眼请求数据："+JSON.stringify(this.employee))
      updateUserByUser(this.user).then(response => {
        if (response.status == 200) {
          alert("修改成功!");
          selectListByPage(this.myRequestBody).then(response => {
            if (response.status == 200) {
              // alert("页面加载第一步，看看200返回数据：" + response.data);
              var res = JSON.parse(response.data); //data是jason字符串需要解析为json对象
              this.desserts = res.data;
              this.pages = res.pages;
              this.$forceUpdate(); //进行局部页面刷新
            } else {
              alert("error");
            }
          });
        }
      });
    },
    // 添加用户
    funInsertUserByUser() {
      this.dialog = false;
      insertUser(this.user).then(response => {
        //如果添加成功我就
        if (response.status == 200) {
          alert("添加用户成功");
          selectListByPage(this.myRequestBody).then(response => {
            if (response.status == 200) {
              // alert("页面加载第一步，看看200返回数据：" + response.data);
              var res = JSON.parse(response.data); //data是jason字符串需要解析为json对象
              this.desserts = res.data;
              this.pages = res.pages;
              this.$forceUpdate(); //进行局部页面刷新
            } else {
              alert("error");
            }
          });
        } else {
          alert("添加用户失败");
        }
      });
    },
    //删除用户
    showDeletePoppu(item) {
      var message = window.confirm("确认删除：用户" + item.userName + "?");
      if (message == true) {
        deleteUserById({
          id: item.id
        }).then(response => {
          if (response.status == 200) {
            alert("删除成功!");
            selectListByPage(this.myRequestBody).then(response => {
              if (response.status == 200) {
                // alert("页面加载第一步，看看200返回数据：" + response.data);
                var res = JSON.parse(response.data); //data是jason字符串需要解析为json对象
                this.desserts = res.data;
                this.pages = res.pages;
                this.$forceUpdate(); //进行局部页面刷新
              } else {
                alert("error");
              }
            });
          }
        });
      }
    }
  },
  watch: {
    pageNo: function(value) {
      this.myRequestBody.pageNo = value;
      selectListByPage(this.myRequestBody).then(response => {
        if (response.status == 200) {
          // alert("页面加载第一步，看看200返回数据：" + response.data);
          var res = JSON.parse(response.data); //data是jason字符串需要解析为json对象
          this.desserts = res.data;
          this.pages = res.pages;
          this.$forceUpdate(); //进行局部页面刷新
        } else {
          alert("error");
        }
      });
    }
  }
};
</script>