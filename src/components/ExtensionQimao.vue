<template>
  <div class="extensionQimao">
    <h1>推广项目-七猫</h1>
    <!-- 卡片视图区域 -->
    <el-card class="card">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form label-position="left" label-width="75px">
            <el-form-item label="推广位ID:">
              <el-input
                placeholder="推广位ID"
                clearable
                v-model="params.code"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="11">
          <span class="start">创建时间:</span>
          <el-date-picker
            v-model="params.stime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
          <span class="and">至</span>
          <el-date-picker
            v-model="params.etime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="7">
          <el-button type="primary" @click="query">查询</el-button>
          <el-button
            type="success"
            icon="el-icon-download"
            @click="downloadFiles"
            >导出</el-button
          >
          <el-button type="primary" @click="add">批量新增子渠道</el-button>
        </el-col>
      </el-row>
      <!-- table表格 -->
      <el-table class="table" :data="PromotionCode">
        <el-table-column type="index" prop="" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="id" label="自增ID" width="120">
        </el-table-column>
        <el-table-column prop="code" label="推广位ID" width="120">
        </el-table-column>
        <el-table-column prop="link" label="推广链接" width="240">
        </el-table-column>
        <el-table-column prop="code" label="推广码" width="120" >
            <vue-qr  text='code'  :size='30'> </vue-qr>          
        </el-table-column>
        <el-table-column prop="parentName" label="直属上级名称" width="240">
        </el-table-column>
        <el-table-column prop="ctime" label="创建时间" width="180">
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.pageRequest.page"
        :page-sizes="[5, 10, 25, 50]"
        :page-size="params.pageRequest.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total < 60 ? total : 60"
      >
      </el-pagination>
      <!-- dialog对话框 -->
      <el-dialog
        title="批量新增子渠道"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose"
      >
        <div class="dialog">
          <span>批量新增子渠道数量：</span>
          <el-input
            v-model="dialoginput"
            clearable
            placeholder="请输入数字"
          ></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import qs from "qs";
import VueQr  from 'vue-qr'
export default {
  components: {VueQr},
  data() {
    return {
      // 请求参数
      params: {
        code: "",
        etime: "",
        stime: "",
        pageRequest: {
          page: 1,
          pagesize: 5,
        },
      },
      //total 总计
      total: 0,
      // 数据
      PromotionCode: [],
      // dialog对话框控制
      dialogVisible: false,
      // dialoginput
      dialoginput: "",
      // 二维码
      /* config: {
          logo: './warn.jpg',//默认二维码中间图片
          text: "ASDEEFDDSS223DXX 2" //二维码内容,编码格式默认使用base64
      }, */
      // 二维码数据
      code:[],
    };
  },
  created() {
    this.getPromotionCode(this.params);
  },
  methods: {
    // 初始化获得数据
    async getPromotionCode(options) {
      const { data: res } = await this.$http.get("/api/pc/qrcode/qm/list", {
        params: {
          'code': options.code === null ? " " : options.code,
          'etime': options.etime === null ? " " : options.etime,
          'stime': options.stime === null ? " " : options.stime,
          "pageRequest.page": options.pageRequest.page,
          "pageRequest.pagesize": options.pageRequest.pagesize,
        },
      });
      /* console.log(res.body.list); */
      let codelist = res.body.list
      /* codelist.push[item.code] */
     /*  console.log(codelist);
      codelist.forEach(item => {
        console.log(item);
        this.code.push(item.code)
      }); */
      if (res.responseCode !== 200) return;
      this.PromotionCode = res.body.list;
      this.total = res.body.pageSize * res.body.pages;
     
    },

    date() {
      console.log(this.params.etime);
    },
    // 查询
    query() {
      this.getPromotionCode(this.params);
    },
    // 批量新增子渠道按钮 控制dialog对话框事件
    add() {
      this.dialogVisible = true;
    },
    //handleClose dialog对话框
    handleClose() {
      this.dialogVisible = false;
    },
    // 分页
    handleSizeChange(sizechange) {
      this.params.pageRequest.pagesize = sizechange;
      this.getPromotionCode(this.params);
    },
    handleCurrentChange(page) {
      this.params.pageRequest.page = page;
      this.getPromotionCode(this.params);
    },
    // 下载 文件 downloadFiles
   async downloadFiles() {
    const res = await this.$http.get('/api/pc/qrcode/qm/download',{params:{
      'code':this.params.code === null ? " " : this.params.code,
          'etime': this.params.etime === null ? " " : this.params.etime,
          'stime': this.params.stime === null ? " " : this.params.stime,
          "pageRequest.page":this.params.pageRequest.page,
          "pageRequest.pagesize": this.params.pageRequest.pagesize,
    }})
    if(res.status !== 200) return
    console.log(res.request.responseURL);
    const alink = document.createElement("a");
    alink.href = res.request.responseURL;
    alink.click();
  },
  //qrCode 二维码事件
  qrCode(item){
    /* console.log(item.code);
    let codelist = []
    codelist.push[item.code]
    console.log(codelist); */
    /* this.code = item.code */
  }
  },
};
</script>
<style lang="less" scoped>
.extensionQimao {
  padding: 0 20px;
  h1 {
    margin-bottom: 20px;
    font-size: 20px;
  }
}
.start {
  padding-right: 10px;
}
.and {
  padding: 0 10px;
}
.table {
  margin-bottom: 30px;
}
.dialog {
  display: flex;
  span {
    line-height: 35px;
  }
  .el-input {
    width: 60%;
  }
}
</style>
