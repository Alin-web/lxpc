<template>
  <div>
    <div class="extensionQimao">
     <h1>常规管理-提现设置</h1>
      <!-- 卡片视图区域 -->
      <el-card class="card">
        <el-form  class="form1"  :model="form" label-width="80px" ref="formRef" :rules="rulesForm" hide-required-asterisk>
          <!-- 提现方式 -->
          <el-form-item label="提现方式:" label-width="130px">
            <el-select class="select" v-model="form.bankType" value-key="1">
              <el-option label="银行卡转账-个人" value="1" selected></el-option>
              <el-option label="银行卡转账-公司" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label=" form.bankType ==='1' ? '持卡人姓名:' : '公司名称:'" label-width="130px"  prop="realName" :inline-message="true" >
            <el-input v-model="form.realName" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <!-- 银行卡号 -->
          <el-form-item label="银行卡号:" label-width="130px"  prop="bankAccount" :inline-message="true" >
            <el-input v-model="form.bankAccount" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <!-- 开户银行 -->
          <el-form-item label="开户银行:" label-width="130px"  prop="bankAddress" :inline-message="true" >
            <el-input v-model="form.bankAddress" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <!-- 持卡人身份证号 -->
          <el-form-item label="持卡人身份证号:" label-width="130px"  prop="idcard" :inline-message="true" >
            <el-input v-model="form.idcard" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <!--到款通知手机号  -->
          <el-form-item label="到款通知手机号:" label-width="130px"  prop="mobile" :inline-message="true" >
            <el-input v-model="form.mobile" placeholder="请输入" clearable></el-input>
          </el-form-item>
          <!-- 短信验证码 -->
          <el-form-item  class="getCode" label="短信验证码:" label-width="130px" prop="qrcode" :inline-message="true" >
            <el-input class="inputCode" v-model="form.qrcode" placeholder="请输入" clearable></el-input>
            <el-button type="success"  ref="but" :disabled="butDis" class="code" @click="getCode" ><span  ref="codeRef">获取验证码</span></el-button>
          </el-form-item>
          <el-form-item  label-width="130px" class="clickBut">
            <el-button type="primary" class="sure" @click="sureSave">保存</el-button>
            <el-button class="cancel" @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
        <!-- 填写的数据 -->
        <el-form  class="form2"  :model="form" label-width="80px">
          <!-- 提现方式 -->
          <el-form-item label="提现方式:" label-width="130px">
            <el-select class="select" disabled v-model="form.bankType" value-key="1">
              <el-option label="银行卡转账-个人" value="1"></el-option>
              <el-option label="银行卡转账-公司" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label=" form.bankType ==='1' ? '持卡人姓名:' : '公司名称:'" label-width="130px" >
            <span>{{form.realName}}</span>
          </el-form-item>
          <el-form-item label="银行卡号:" label-width="130px"   >
             <span>{{form.bankAccount}}</span>
          </el-form-item>
          <el-form-item label="开户银行:" label-width="130px"   >          
             <span>{{form.bankAddress}}</span>
          </el-form-item>
          <el-form-item label="持卡人身份证号:" label-width="130px"  >           
             <span>{{form.idcard}}</span>
          </el-form-item>
          <el-form-item label="到款通知手机号:" label-width="130px"    >          
             <span>{{form.mobile}}</span>
          </el-form-item>
          <el-form-item  label-width="130px">
            <el-button  type="primary" @click="ModifyInfo">修改信息</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data() {
    return {
      form:{
        // 提现方式
        bankType:'1',
        // 姓名
        realName:'光头强',
        // 银行卡号
        bankAccount:'65465134165413216',
        //开户银行
        bankAddress:'163541635134',
        //持卡人身份证号
        idcard:'6546513416541321',
        // 到款通知手机号:
        mobile:'',
        // 短信验证码
        qrcode:''
      },
      // 后台获取的验证码
      resQrcode:'',
      butDis:false,
      // 表单规则
      rulesForm:{
        realName: [
             { required: true, message: '请输入持卡人姓名', trigger: 'blur' }
        ],
        bankAccount: [
            { required: true, message: '请输入银行卡号', trigger: 'blur' },
            { min: 16, max: 19, message: '请输入最短16位最长19位的银行卡号', trigger: 'blur' }
        ],
        bankAddress: [
             { required: true, message: '请输入开户银行', trigger: 'blur' }
          ],
        idcard: [
            { required: true, message: '请输入持卡人身份证号', trigger: 'blur' },
             { min: 16, max: 16, message: '请输入16位长度的身份证号码', trigger: 'blur' }
          ],
        mobile: [
            { required: true, message: '请输入到款通知手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '请输入11位长度的手机号', trigger: 'blur' }
          ],
        qrcode:[
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
    }
  },
  created(){
  },
  mounted(){

  },
  methods:{
    // 提交
    sureSave(){
      if(this.resQrcode !== this.form.qrcode) return this.$message.error('验证码输入错误')
      this.$refs.formRef.validate(valid=>{
        console.log(valid);
        if(!valid){
          return this.$message.error('请填写信息')
        }
        let form1 = document.querySelector('.form1')
        let form2 = document.querySelector('.form2')
        form1.style.display = 'none';
        form2.style.display = 'block';
      })
      console.log(this.form);
    },
    // 取消
    cancel(){
      this.$refs.formRef.resetFields()
      this.form.qrcode = ''
    },
    // 获取验证码
    async getCode(){
      if(this.form.mobile.length !== 11) return this.$message.error('请输入十一位手机号')
      if(this.form.qrcode.length !== 0) return this.$message.error('请勿重复获取验证码')
       const {data:result} = await this.$http.post('/api/pc/sms/qrcode',qs.stringify({
           'mobile': this.form.mobile
         })
       )
      if(result.responseCode == 200){
        this.resQrcode = result.body.qrcode
        this.countDown();
      }else{
        if(result.responseCode == 2){
         return this.$message.error('验证码获取失败')
        }
        return
      }
    },
    // 倒计时
     countDown(){
      let timeId = null
      let code = this.$refs.codeRef  
      let but = this.$refs.but
      let seconds = 59;
      timeId = setInterval(()=>{
        let html =  ((seconds < 10) ? '重新获取'+"0" + seconds+'s' : '重新获取'+ seconds+ 's')
        console.log(html);
        code.innerHTML = html;
       this.butDis = true
        seconds--;
        if( seconds == 0){
          code.innerHTML = '获取验证码';
          this.butDis = false
          clearInterval(timeId)
        }
       },1000)
    },
    //ModifyInfo 修改提交数据
    ModifyInfo(){
      let form1 = document.querySelector('.form1')
      let form2 = document.querySelector('.form2')
      form1.style.display = 'block';
      form2.style.display = 'none';
    }
  }
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
.el-form-item{
 
  margin: 10px 0 ;
  box-sizing: border-box;
}
.el-input{
  width: 25%;
  margin-left: 20px;
  padding: 0 -10px;
  box-sizing: border-box;
}
.select{
  margin-left: 20px;
  padding: 0 -10px;
  box-sizing: border-box;
}
.getCode{
  .inputCode{
     width: 10%;
  }
  .code{
    margin-left: 10px;
  }
}
.clickBut{
  margin: 20px 0;
}

.sure{
    margin-left: 20px;
  padding: 0 -10px;
}
.cancel{
    margin-left: 20px;
  padding: 0 -10px;
}
.form1{
  display: block;
}
.form2{
   display: none;
  span{
  margin-left: 20px;
  padding: 0 -10px;
  box-sizing: border-box;
  }
}
</style>