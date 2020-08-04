<template>
  <div>
    <!-- 展示主机性能指标数据 -->
    <div>
      <v-breadcrumbs :items="breadItems" divider="/"></v-breadcrumbs>
    </div>

    <v-container>
      <v-row>
        <!-- 展示cpu实时变化折线图 -->
        <v-col cols="12" md="6">
          <div id="cpuLineChart" :style="style"></div>
        </v-col>
        <!-- 展示内存使用饼状图 -->
        <v-col cols="12" md="6">
          <div id="memeryPieChart" :style="style"></div>
        </v-col>
      </v-row>
      <v-row cols="12" md="6">
        <!-- 展示内存直方图 -->
        <v-col>
          <div id="memeryBarChart" :style="style"></div>
        </v-col>
        <!-- 展示磁盘利用直方图 -->
        <v-col cols="12" md="6">
          <div id="diskBarChart" :style="style"></div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { selectCpuList } from "@/api/cpu";
export default {
  data() {
    return {
      temp: "",
      breadItems: [
        {
          text: "首页",
          disabled: false,
          href: "/"
        },
        {
          text: "大数据主机性能指标展示",
          disabled: false,
          href: "/performance/cpu"
        }
      ],
      style: { height: "250px", width: "450px" },
      styleMax: { height: "250px", width: "1250px" },
      styleMin: { height: "350px", width: "350px" },
      desserts: null,
      memeryBarChart: null,
      memeryPieChart: null,
      cpuLineChart: null,
      diskBarChart: null,
      option: {
        title: {
          text: "主机内存使用情况"
        },
        legend: {
          data: ["图例"]
        },
        xAxis: {
          data: ["使用", "空闲", "总量"]
        },
        yAxis: {
          // max: 100
        },
        grid: {
          // top: 48,
          left: 70, // 调整这个属性
          // right: 50,
          // bottom: 50
        },
        tooltip: {
          show: true //显示提示框
        },
        series: [
          {
            name: "内存使用",
            type: "bar",
            data: [0, 0, 0]
          }
        ]
      },
      memeryPieChartOption: {
        title: {
          text: "主机内存使用情况"
        },
        legend: {
          data: ["图例"]
        },
        tooltip: {
          show: true //显示提示框
        },
        series: [
          {
            name: "内存使用",
            type: "pie",
            data: [
              { name: "使用", value: 80 },
              { name: "空闲", value: 50 },
              { name: "总量", value: 25 }
            ]
          }
        ]
      },
      cpuLineChartOption: {
        title: {
          text: "主机cpu使用情况"
        },
        legend: {
          data: ["图例"]
        },
        tooltip: {
          show: true //显示提示框
        },
        xAxis: {
          data: [
            "30秒前",
            "25秒前",
            "20秒前",
            "15秒前",
            "10秒前",
            "05秒前",
            "当前"
          ]
        },
        yAxis: {
          max: 100
        },
        series: [
          {
            name: "磁盘使用",
            type: "line",
            smooth: true,
            areaStyle: {
              color: "#0000CD",
              origin: "start",
              opacity: 0.5
            },
            color: "blue",
            data: [0, 0, 0, 0, 0, 0, 0]
          }
        ]
      },
      diskBarChartOption: {
        title: {
          text: "主机磁盘使用情况"
        },
        legend: {
          data: ["图例"]
        },
        tooltip: {
          show: true //显示提示框
        },
        xAxis: {
          data: [
            "/",
            "/run",
            "/run/user/",
            "/dev",
            "/dev/shm",
            "/boot",
            "/run/user/0",
            "/sys/fs/cgroup"
          ]
        },
        yAxis: {
          max: 100
        },
        series: [
          {
            name: "磁盘使用",
            type: "bar",
            data: [0,0,0,0,0,0,0,1]
          }
        ]
      }
    };
  },
  created() {
    selectCpuList().then(response => {
      if (response.status == 200) {
        // alert("页面加载第一步，看看200返回数据：" + response.data);
        var res = JSON.parse(response.data); //data是jason字符串需要解析为json对象
        this.desserts = res;
      } else {
        alert("error");
      }
    });
    //实例创建时请求连接websocket服务
    this.ws = this.conWs();
  },
  mounted() {
    this.init();
  },
  methods: {
    //初始化四张图表
    init() {
      this.memeryBarChart = this.$echarts.init(
        document.getElementById("memeryBarChart")
      );
      this.memeryBarChart.setOption(this.option);
      window.addEventListener("resize", this.memeryBarChart.resize);

      this.memeryPieChart = this.$echarts.init(
        document.getElementById("memeryPieChart")
      );
      this.memeryPieChart.setOption(this.memeryPieChartOption);
      window.addEventListener("resize", this.memeryPieChart.resize);

      this.cpuLineChart = this.$echarts.init(
        document.getElementById("cpuLineChart")
      );
      this.cpuLineChart.setOption(this.cpuLineChartOption);
      window.addEventListener("resize", this.cpuLineChart.resize);

      this.diskBarChart = this.$echarts.init(
        document.getElementById("diskBarChart")
      );
      this.diskBarChart.setOption(this.diskBarChartOption);
      window.addEventListener("resize", this.diskBarChart.resize);
    },
    //连接到websocket服务
    conWs() {
      const vm = this;
      //websoket客户端在这里搞哈~
      var websocket = null;
      //判断当前浏览器是否支持WebSocket
      if ("WebSocket" in window) {
        //连接WebSocket节点
        websocket = new WebSocket(
          "ws://huangmaojun2.5gzvip.idcfengye.com/bdpaltform/websocket/host/status"
        );
      } else {
        alert("Not support websocket");
      }
      //连接发生错误的回调方法
      websocket.onerror = function() {
        alert("连接websocket服务发生错误！");
      };
      //连接成功建立的回调方法
      websocket.onopen = function(event) {
        alert("连接websocket服务成功！");
        console.log(event);
      };
      //接收到消息的回调方法
      websocket.onmessage = function(event) {
        // alert("连接websocket服务有新消息！");
        var hostInfo = JSON.parse(event.data);
        vm.$data.temp = hostInfo.id;

        //cpu折现表更新表数据
        console.log(vm.$data.cpuLineChartOption.series[0].data);
        vm.$data.cpuLineChartOption.series[0].data.shift();
        vm.$data.cpuLineChartOption.series[0].data.push(hostInfo.cpuUsage);
        vm.$data.cpuLineChart.setOption(vm.$data.cpuLineChartOption);

        //内存直方图更新标数据
        vm.$data.option.series[0].data[0] =
          hostInfo.memoryTotal - hostInfo.memoryFree;
        vm.$data.option.series[0].data[1] = hostInfo.memoryFree;
        vm.$data.option.series[0].data[2] = hostInfo.memoryTotal;
        vm.$data.memeryBarChart.setOption(vm.$data.option);

        //内存饼状图更新数据
        vm.$data.memeryPieChartOption.series[0].data[0].value =
          hostInfo.memoryTotal - hostInfo.memoryFree;
        vm.$data.memeryPieChartOption.series[0].data[1].value =
          hostInfo.memoryFree;
        vm.$data.memeryPieChartOption.series[0].data[2].value =
          hostInfo.memoryTotal;
        vm.$data.memeryPieChart.setOption(vm.$data.memeryPieChartOption);

        //磁盘使用情况直方图更新数据["/", "/run", "/run/user/","/dev","/dev/shm","/boot","/run/user/0","/sys/fs/cgroup"]
        // console.log(hostInfo.diskUsageMap["/"])
        console.log(hostInfo.diskUsageMap["/"].replace(/%/g,''))
        vm.$data.diskBarChartOption.series[0].data[0] =
          hostInfo.diskUsageMap["/"].replace(/%/g,'');
        vm.$data.diskBarChartOption.series[0].data[1] =
          hostInfo.diskUsageMap["/run"].replace(/%/g,'');
        vm.$data.diskBarChartOption.series[0].data[2] =
          hostInfo.diskUsageMap["/run/user/42"].replace(/%/g,'');
        vm.$data.diskBarChartOption.series[0].data[3] =
          hostInfo.diskUsageMap["/dev"].replace(/%/g,'');
        vm.$data.diskBarChartOption.series[0].data[4] =
          hostInfo.diskUsageMap["/dev/shm"].replace(/%/g,'');
        vm.$data.diskBarChartOption.series[0].data[5] =
          hostInfo.diskUsageMap["/boot"].replace(/%/g,'');
        vm.$data.diskBarChartOption.series[0].data[6] =
          hostInfo.diskUsageMap["/run/user/0"].replace(/%/g,'');
        vm.$data.diskBarChartOption.series[0].data[7] =
          hostInfo.diskUsageMap["/sys/fs/cgroup"].replace(/%/g,'');
        vm.$data.diskBarChart.setOption(vm.$data.diskBarChartOption);

        vm.$forceUpdate;
      };

      websocket.onclose = function() {
        vm.$data.status = "WS连接关闭";
        alert("连接websocket服务关闭！");
      };
    }
  }
};
</script>