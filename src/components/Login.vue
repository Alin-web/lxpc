<template>
  <div class="login">
    <div class="login_box">
      <el-row class="title">
        <el-col :span="6"><div>账号密码登录</div></el-col>
      </el-row>
      <el-form ref="formref" :model="query" class="form" :rules="rules">
        <el-form-item class="item" prop="mobile">
          <el-input type="text" v-model="query.mobile" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item class="item" prop="passwd">
          <el-input type="password" v-model="query.passwd" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="loginBut" @click="but">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="copyright">版权所有 © xxxx网络科技集团有限公司</div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data() {
    return {
      // 请求参数
      
      query:{
        isWeekNoLogin:0,
        mobile: "18291891996",
        passwd: "akss888",
      },
      // 表单校验规则
      rules:{
        mobile:{ required: true, message: '请输入账号', trigger: 'blur' },
        passwd:{ required: true, message: '请输入密码', trigger: 'blur' }
      }
    };
  },
  methods: {
    but(){
      this.$refs.formref.validate(async (valid) =>{ //保存
        if(!valid) return  
        const {data : res } = await this.$http.post('/api/pc/login/login', )
        
        // 判断请求是否发送成功
        if(res.responseCode !== 200){
          return this.$message.error('请求发送失败')
        }
        this.$message.success('请求发送成功')
        // 把返回的token值保存起来
        window.sessionStorage.setItem('token',res.body.token);
        // 跳转页面
        this.$router.push('/home')
      })
    },
  },
};
</script>
<style lang="less" scope>
.login {
  width: 100%;
  height: 100%;
  background-image: url("../assets/img/login/bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
// 表单盒子
.login_box {
  width: 440px;
  height: 307px;
  background-color: #fff;
  border-radius: 6px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.title {
  height: 66px;
  border-bottom: 1px solid #dcdfe6;
  line-height: 66px;
  div {
    width: 100%;
    text-align: center;
    color: #0080ff;
  }
}
.form {
  position: absolute;
  width: 100%;
  top: 97px;
  .el-form-item {
    width: 100%;
    box-sizing: border-box;
    padding: 0 40px;
  }
}
.loginBut {
  width: 100%;
  position: absolute;
}
// 版权 copyright
.copyright {
  position: relative;
  bottom: -45%;
  text-align: center;
  color: #fff;
}
</style>
