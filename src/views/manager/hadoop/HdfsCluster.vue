<template>
  <div>
    <!-- hdfs集群可视化操作 -->
    <div>
      <v-breadcrumbs :items="breadItems" divider="/"></v-breadcrumbs>
    </div>

    <v-row justify="left">
      <!-- 添加按钮和添加弹框 -->
      <!-- <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="green" dark v-on="on">
            <v-icon dark>mdi-plus</v-icon>创建持久化节点
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">创建持久化节点</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="7">
                  <v-text-field
                    label="节点名称*"
                    required
                    v-model="node.path"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="9">
                  <v-textarea label="节点数据*" required v-model="node.data" :rules="[rules.required]"></v-textarea>
                </v-col>
              </v-row>
            </v-container>
            <small>*表示是必填的字段</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">关闭</v-btn>
            <v-btn color="blue darken-1" text v-on:click="FunCreatePersistentNode">创建</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->
    </v-row>

    <!--查询弹出层  -->
    <!-- <v-dialog v-model="queryDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">查看节点信息</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="7">
                <v-text-field label="节点名称*" required v-model="node.path" :rules="[rules.required]"></v-text-field>
              </v-col>
              <v-col cols="12" md="9">
                <v-textarea label="节点数据*" required v-model="node.data" :rules="[rules.required]"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*表示是必填的字段</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="queryDialog = false">阅</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->

    <!-- 修改弹出框 -->
    <!-- <v-dialog v-model="editDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">修改节点信息</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="7">
                <v-text-field label="节点名称*" required v-model="node.path" :rules="[rules.required]"></v-text-field>
              </v-col>
              <v-col cols="12" md="9">
                <v-textarea label="节点数据*" required v-model="node.data" :rules="[rules.required]"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*表示是必填的字段</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editDialog = false">关闭</v-btn>
          <v-btn color="blue darken-1" text v-on:click="FunUpdateDataByPath">修改</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    <!-- 表格 -->
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">序号</th>
            <th class="text-left">文件列表</th>
            <th colspan="2" class="text-left">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,name) in desserts" :key="item.name">
            <td>{{ name+1 }}</td>
            <td>{{ item }}</td>
            <td>
              <v-btn small color="primary" @click="FunGetDataByPath(item)">
                <v-icon dark>mdi-magnify</v-icon>查看
              </v-btn>
            </td>
            <td>
              <v-btn small color="primary" @click="FunPopEditFrame(item)">
                <v-icon dark>mdi-upload</v-icon>上传
              </v-btn>
            </td>
            <td>
              <v-btn small color="error" @click="FunDeleteNode(item)">
                <v-icon dark>mdi-download</v-icon>下载
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
import {
    getFileList
} from "@/api/hdfs";

export default {
  data() {
    return {
      breadItems: [
        {
          text: "首页",
          disabled: false,
          href: "/"
        },
        {
          text: "hdfs集群可视化操作",
          disabled: false,
          href: "/hadoop/hdfsCluster"
        }
      ],
      desserts: ["alt1", "alt2", "alt3"],
      dialog: false,
      editDialog: false,
      queryDialog: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "至少6个字符",
        phone: v => (v.length >= 11) & (v.length <= 11) || "手机必须为11位数",
        emailMatch: () => "The email and password you entered don't match"
      },
      node: {
        path: "",
        data: ""
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
    //实例创建时就把hdfs集群的节点树获取到
    getFileList().then(response => {
      if (response.status == 200) {
        // alert("页面加载第一步，看看200返回数据：" + response.data);
        var res = JSON.parse(response.data); //data是jason字符串需要解析为json对象
        this.desserts = res;
      } else {
        alert("error");
      }
    });
  },
  methods: {
    //查看节点信息
    // FunGetDataByPath(item) {
    //   this.node.path = item;
    //   getDataByPath({ path: item }).then(response => {
    //     if (response.status == 200) {
    //       this.node.data = response.data;
    //     } else {
    //       alert("error");
    //     }
    //   });
    //   this.queryDialog = true;
    // },
    // 创建持久化节点
    // FunCreatePersistentNode() {
    //   this.dialog = false;
    //   createPersistentNode(this.node).then(response => {
    //     //如果添加成功我就
    //     if (response.status == 200) {
    //       alert("创建节点成功");
    //       this.desserts.push(this.node.path);
    //     } else {
    //       alert("创建节点失败");
    //     }
    //     this.node.path = "";
    //     this.node.data = "";
    //   });
    // },
    //删除节点
    // FunDeleteNode(item) {
    //   var message = window.confirm("确认删除节点:/" + item + "?");
    //   if (message == true) {
    //     deleteNode({
    //       path: item
    //     }).then(response => {
    //       if (response.status == 200) {
    //         var json = response.data;
    //         if (json) {
    //           alert("删除成功!");
    //           this.desserts.splice(this.desserts.indexOf(item), 1); //删除指定下表的数组元素
    //           this.$forceUpdate;
    //         } else {
    //           alert("删除失败！");
    //         }
    //       }
    //     });
    //   }
    // },
    //弹出编辑框
    // FunPopEditFrame(item) {
    //   this.node.path = item;
    //   getDataByPath({ path: item }).then(response => {
    //     if (response.status == 200) {
    //       this.node.data = response.data;
    //     } else {
    //       alert("error");
    //     }
    //   });
    //   this.editDialog = true;
    // },
    //修改节点信息
    // FunUpdateDataByPath() {
    //   this.editDialog = false;
    //   updateDataByPath(this.node).then(response => {
    //     if (response.data == "ok") {
    //       alert("修改成功！");
    //     } else {
    //       alert("修改失败！");
    //     }
    //   });
    // }
  }
};
</script>