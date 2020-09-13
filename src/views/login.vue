<template>
  <div class="loginE">

    <div class="grid-content bg-purple">
      <h2>登录</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-position="left"
        ref="ruleForm"
        label-width="68px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="用户名"
          prop="user"
        >
          <el-input
            v-model="ruleForm.user"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="pass"
        >
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>

          <el-button
            type="primary"
            class="loginG"
            @click="submitForm('ruleForm')"
            style="width:100%;"
          >登录</el-button>

        </el-form-item>
        <el-form-item class="clearBottom">
          <el-row class="loginB">
            <!-- <a href="">忘记密码</a> -->

            <router-link
              to="/register"
              @click="doRegister()"
            >用户注册</router-link>

          </el-row>
        </el-form-item>
      </el-form>
    </div>

  </div>

</template>
<script>
export default {
  data() {
    var checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    return {
      ruleForm: {
        pass: "",
        user: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        user: [{ validator: checkUser, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          let _this = this;

          this.axios
            .post("/api/login", {
              username: _this.ruleForm.user,
              password: _this.ruleForm.pass,
            })
            .then(function (response) {
              if (parseInt(response.data.code) === 400) {
                // 登录失败
                _this.username = "";
                _this.password = "";
                _this.$message({
                  showClose: true,
                  message: "账号密码错误",
                });
              } else if (parseInt(response.data.code) === 200) {

                // token无效，测试用
                // sessionStorage.setItem("token", response.data.token);

                localStorage.setItem("userInfo", `{
                  "username":${_this.ruleForm.user},
                  "password":${_this.ruleForm.pass}
                }`);
                let flag = true;
                _this.$store.dispatch("login", flag);
                _this.$router.push("/");
              }
            })
            .catch(function (error) {});
        } else {
          return false;
        }
      });
    },

    doRegister() {
      this.$router.push({
        path: "/register",
      });
    },
  },
};
</script>

<style lang="less" scoped>
html {
  height: 100%;
}
body {
  padding: 0;
  margin: 0;
  //   height:100%;
  //   display: flex;
  //   align-items: center;
  // justify-content: center;
}
.loginE {
  height: 100%;
  max-width: 380px;
  margin: 160px auto;
  padding: 15px;
  //  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.grid-content {
  text-align: center;
  // width:380px;
}
h2 {
  margin: 0 0 24px 68px;
}

@media screen and (max-width: 400px) {
  .login {
    height: 100%;
  }
  .grid-content {
    text-align: center;
    width: 300px;
    margin: 0 auto;
  }
}

.clearBottom {
  margin-bottom: 0;
}
.loginG {
  margin: auto;
}

a {
  color: #1ab2ff;
  text-decoration: none;
}
.loginB {
  float: right;
  margin-top: -17px;
  margin-bottom: 17px;
  font-size: 14px;
  line-height: 22px;
  color: #1ab2ff;
  cursor: pointer;
}

.loginB a {
  margin: 3px;
}
.loginB a:hover {
  text-decoration: none;
  color: #2c2fd6;
}
</style>