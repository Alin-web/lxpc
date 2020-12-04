<template>
  <div class="extensionQimao">
    <h1>推广项目-七猫</h1>
    <!-- 卡片视图区域 -->
    <el-card class="card">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form label-position="left" label-width="75px">
            <el-form-item label="推广位ID:">
              <el-input placeholder="推广位ID" v-model="search"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="11">
          <span class="start">创建时间:</span>
          <el-date-picker
            v-model="datevalue1"
            type="date"
            placeholder="选择日期"
            @change="date"
          >
          </el-date-picker>
          <span class="and">至</span>
          <el-date-picker
            v-model="datevalue2"
            type="date"
            placeholder="选择日期"
            @change="date"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-button type="primary">查询</el-button>
          <el-button type="success" icon="el-icon-download">导出</el-button>
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
        <el-table-column prop="code" label="推广码" width="120">
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
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
    </el-card>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import qs from "qs";
export default {
  data() {
    return {
      search: "",
      datevalue1: "",
      datevalue2: "",
      // 页码
      code: "",
      etime: "",
      stime: "",
      pageRequest: {
        page: 1,
        pagesize: 50,
      },
    };
  },
  created() {
    this.getPromotionCode(qs.stringify(this.pageRequest));
  },
  methods: {
    ...mapActions(["getPromotionCode"]),
    date() {
      console.log(this.datevalue);
    },
  },
  computed: {
    ...mapState(["PromotionCode"]),
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
.table{
  margin-bottom: 30px;
}
</style>