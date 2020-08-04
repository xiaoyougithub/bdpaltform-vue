<template>
  <v-app id="inspire">
    <!-- 左侧抽屉 -->
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" link :to="child.to">
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <!-- 菜单列表项 -->
          <v-list-item v-else :key="item.text" link :to="item.to">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">大数据监控平台</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      />
      <v-spacer/>
      <v-btn icon width="150px" @click="clickUser">
        <v-icon>mdi-account</v-icon>
        {{this.$store.getters.data.data.userName}}
      </v-btn>
      <v-btn icon width="150px" @click="exit">
        <v-icon>mdi-hail</v-icon>安全退出
      </v-btn>
    </v-app-bar>
    <v-content>
      <!-- 暂时不用面包屑 -->
      <!-- <div>
        <v-breadcrumbs :items="breadItems" divider="-"></v-breadcrumbs>
      </div> -->
      <router-view/>
    </v-content>

    <v-footer app>
      <v-row justify="center">SI-TECH 黄茂俊_bds 2020/07/27-2020/08/15（两周）</v-row>
    </v-footer>

    <v-btn bottom color="pink" dark fab fixed right @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey darken-2">Create contact</v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col class="align-center justify-space-between" cols="12">
              <v-row align="center" class="mr-0">
                <v-avatar size="40px" class="mx-3">
                  <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt>
                </v-avatar>
                <v-text-field placeholder="Name"/>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-text-field prepend-icon="mdi-account-card-details-outline" placeholder="Company"/>
            </v-col>
            <v-col cols="6">
              <v-text-field placeholder="Job title"/>
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="mdi-mail" placeholder="Email"/>
            </v-col>
            <v-col cols="12">
              <v-text-field type="tel" prepend-icon="mdi-phone" placeholder="(000) 000 - 0000"/>
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="mdi-text" placeholder="Notes"/>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn text color="primary">More</v-btn>
          <v-spacer/>
          <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    dialog: false,
    drawer: null,
    drawerRight: null,
    // breadItems:[
    //     {
    //       text: 'Dashboard',
    //       disabled: false,
    //       href: 'breadcrumbs_dashboard',
    //     }, {
    //       text: 'Dashboard',
    //       disabled: false,
    //       href: 'breadcrumbs_dashboard',
    //     },
    // ],
    items: [
      { icon: "mdi-home", text: "首页", to: "/" },
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-file",
        text: "集群主机管理",
        model: false,
        children: [
          { icon: "mdi-grid", text: "serverA", to: "/performance/serverA" },
          { icon: "mdi-grid", text: "serverB", to: "/performance/serverB" },
          { icon: "mdi-grid", text: "serverC", to: "/performance/serverC" }
        ]
      },
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-file",
        text: "hadoop集群管理",
        model: false,
        children: [
          { icon: "mdi-grid", text: "zookeeper集群", to: "/hadoop/zookeeper" },
          { icon: "mdi-grid", text: "hdfs集群", to: "/hadoop/hdfsCluster" }
        ]
      },
      {
        icon: "mdi-chevron-up",
        text: "系统用户管理",
        "icon-alt": "mdi-account",
        children: [{ icon: "mdi-grid", text: "人员列表", to: "/user" }]
      },
      { icon: "mdi-help-circle", text: "Help", to: "/" },
      { icon: "mdi-hail", text: "退出", to: "/login" },
      { icon: "mdi-hail", text: "傻瓜欢乐多", to: "/fool" }
    ]
  }),
  created() {
    if (this.$store.getters.data == null) {
      alert("token不存在，即将退出到登录页！");
      this.$router.push("/login");
    }
  },
  methods: {
    exit() {
      var message = window.confirm("确认退出嘛？");
      if (message == true) {
        this.$store.commit("setNull");
        if (this.$store.getters.data == null) {
          alert("token被清除了，即将退出到登录页！");
          this.$router.push("/Login");
        }
      }
    },
    clickUser() {
      alert("點你個瓜皮~我是你爸爸！");
    }
  }
};
</script>