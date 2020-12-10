<template>
  <div>
    <div class="extensionQimao">
      <h1>常规管理-提现设置</h1>
      <!-- 卡片视图区域 -->
      <el-card class="card">
        <el-form class="form2" ref="fRef"   :model="form" :rules="rulesForm" label-width="80px" hide-required-asterisk>
          <el-form-item label="登录账号:" label-width="130px">
            <span>{{form.userNum}}</span>
          </el-form-item>
          <el-form-item label="用户名称:" label-width="130px">
            <span>{{ form.userName }}</span>
          </el-form-item>
          
          <el-form-item label="原密码:" label-width="130px" prop="oldPasswd" :inline-message='true'>
            <el-input placeholder="请输入原密码" show-password v-model=" form.oldPasswd" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="新密码:" label-width="130px"  prop="newPasswd" :inline-message='true' >
            <el-input  placeholder="请输入新密码" show-password  v-model=" form.newPasswd" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="重复新密码:" label-width="130px"  >
            <el-input placeholder="请再次输入新密码" show-password  v-model="newPasswd" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label-width="130px">
            <el-button type="primary" @click="submit"  class="bc">保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      form: {
        // 账号
        userNum:'',
        // 用户名称
        userName:'',
        // 原密码
        oldPasswd:'',
        //新密码
        newPasswd:'',
      },
      // 重复新密码
      newPasswd:'',
       rulesForm:{
        oldPasswd: [
            {required: true, min: 6, max: 12, message: '请输入6~12位数字加字母组合', trigger: 'blur' }
        ],
        newPasswd: [
            { required: true,min: 6, max: 12, message: '请输入6~12位数字加字母组合', trigger: 'blur' }
        ],
      },
    };
  },
  created() {
    this.getUserInfo()
  },
  mounted() {},
  methods: {
    getUserInfo(){
      this.form.userName =  window.sessionStorage.getItem('name')
      this.form.userNum =  window.sessionStorage.getItem('mobile')
    },
    //submit 提交修改信息
    submit(){
      if(this.newPasswd !== this.form.newPasswd)  return this.$message.error('两次新密码输入不一致')
      this.$refs.fRef.validate(async valid=>{
        console.log(valid);
        if(!valid){
          return 
        }
        const {data:res} = await this.$http.post('/api/pc/passwd/update',qs.stringify({
            'newPasswd':this.form.newPasswd,
            'oldPasswd':this.form.oldPasswd
          }))
        
        if(res.responseCode !== 200){
          return this.$message.error('密码修改失败')
        }
        this.$message.success('修改密码成功')
        this.$router.push('/Login')
      })
    }
  },
  
};
</script>
<style lang="less" scoped>
.extensionQimao {
  margin: 20px 0 0 0;
  padding: 0 20px;
  h1 {
    margin-bottom: 20px;
    font-size: 20px;
  }
}
.el-form-item {
  
  margin: 10px 0;
  box-sizing: border-box;
}
.el-input {
  width: 30%;
  margin-left: 10px;
  padding: 0 -10px;
  box-sizing: border-box;
}
.form2 {
  span {
    margin-left: 10px;
    padding: 0 -10px;
    box-sizing: border-box;
  }
}
.bc{
  margin-left: 10px;
  padding: 0 -10px;
}
</style>