<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="8">
          <h2>傻瓜欢乐多--定时怼你多happy！</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-alert type="success">
      I'm a success alert.
    </v-alert>
         <v-btn color="primary"> 连接状态</v-btn>{{this.status}}
      </v-row>
       <v-row>
        <v-btn color="primary"> 消息</v-btn> {{this.messages}}
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      test: "hello",
      ws: {}, //
      status: "123", //websocket连接状态
      messages:["message1","message2","message3","message4","message5"]
    };
  },
  created() {
    this.ws = this.conWs();
  },
  methods: {
    conWs() {
        const vm=this
      //websoket客户端在这里搞哈~
      var websocket = null;
      //判断当前浏览器是否支持WebSocket
      if ("WebSocket" in window) {
        //连接WebSocket节点
        websocket = new WebSocket(
          "ws://localhost:8280/bdpaltform/websocket/host/status"
        );
      } else {
        alert("Not support websocket");
      }
      //连接发生错误的回调方法
      websocket.onerror = function() {
        alert("连接websocket服务发生错误！");
         vm.$data.status = "WS连接错误";
      };
      //连接成功建立的回调方法
      websocket.onopen = function(event) {
        vm.$data.status = "WS成功连接";
        this.$forceUpdate
        console.log(event);
      };
      //接收到消息的回调方法
      websocket.onmessage = function(event) {
        // alert("连接websocket服务有新消息！");
        var hostInfo=JSON.parse(event.data)
        vm.$data.messages.shift()
        vm.$data.messages.push(hostInfo)
        console.log(hostInfo.id);
      };

      websocket.onclose = function() {
         vm.$data.status  = "WS连接关闭";
        alert("连接websocket服务关闭！");
      };
    }
  }
};
</script>