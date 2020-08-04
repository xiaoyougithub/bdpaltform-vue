<template>
  <v-container>
    <h2>hdfs</h2>
    <input type="file" ref="myfile">
    <v-btn @click="FunUpload" color="primary" ref="file">导入数据</v-btn>
  </v-container>
</template>
<script>
import { upload } from "@/api/hdfs";
export default {
  methods: {
    FunUpload() {
      let myfile = this.$refs.myfile;
      let files = myfile.files;
      let file = files[0];
      var formData = new FormData();
      formData.append("file", file);
       alert("jjj");
      upload(formData).then(response => {
        alert("jjj");
        if (response.status == 200) {
          alert(response.data);
        }
      });
      alert("hello");
    }
  }
};
</script>

