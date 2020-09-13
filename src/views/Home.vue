<template>
  <div class="home">
    <el-row
      type="flex"
      justify="space-between"
    >
      <el-col :span="6"> <img
          src="../assets/imgs/天羽.png"
          alt=""
          height="90px"
        ></el-col>
      <el-col
        :span="12"
        :offset="12"
      >
        <div class="grid-content grid-contentA ">

          <div class="z_index"> <span>
              <span v-if="this.$store.state.loginVuex.islogin">
                <router-link to="/">已登录/<span v-show="username"></span>{{username}}</router-link>
              </span>
              <span v-else>
                <router-link to="/login">登录</router-link>
              </span>
            </span>

            <span>
              <router-link to="/register">注册</router-link>
            </span>
          </div>

          <div class="serach">
            <div
              style=" float:right"
              @mouseover="mouseEvent()"
            >
              <el-button
                type="primary"
                icon="el-icon-search"
                style="float:right"
              >搜索</el-button>
            </div>
            <div
              class="searchC"
              style="display:none "
              @mouseleave="mouseEventTwo()"
            >
              <el-input
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                v-model="input"
                @keyup.enter.native="getGameList(input)"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="submit_search"
                ></el-button>
              </el-input>
            </div>
          </div>

        </div>
      </el-col>
    </el-row>

    <el-collapse-transition>
      <div
        v-show="show"
        class="content-wrap"
      >

        <el-row
          type="flex"
          justify="center"
        >
          <el-col
            :span="12"
            :gutter="20"
          >
            <div class="grid-content bg-purple-dark">
              <el-button
                type="primary"
                size="medium"
                round
              >
                <router-link
                  class="normal"
                  to="/snake"
                >贪吃蛇</router-link>
              </el-button>
            </div>
          </el-col>
        </el-row>
        <el-row
          type="flex"
          justify="center"
        >
          <el-col :span="12">
            <div class="grid-content bg-purple-dark">
              <el-button
                type="primary"
                size="medium"
                round
              >
                <router-link
                  class="normal"
                  to="/Gobang"
                >五子棋</router-link>
              </el-button>
            </div>
          </el-col>
        </el-row>
        <el-row
          type="flex"
          justify="center"
        >

          <el-col :span="12">
            <div class="grid-content bg-purple-dark">
              <el-button
                type="primary"
                size="medium"
                round
              >
                <router-link
                  class="normal"
                  to="/2048"
                >2048</router-link>
              </el-button>
            </div>
          </el-col>
        </el-row>
        <el-row
          type="flex"
          justify="center"
        >
          <el-col :span="12">
            <div class="grid-content bg-purple-dark">
              <el-button
                type="primary"
                size="medium"
                round
                @click="exit"
              >注销登录</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-collapse-transition>

  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      activeName: "first",
      input: "",
      timeA: false,
      flexibleStatus: false,
      flag: false,
      username:""
    };
  },

  created() {
    this.flag = this.$store.state.loginVuex.islogin;
    if(localStorage.getItem("userInfo")){
      this.username=JSON.parse(localStorage.getItem("userInfo")).username

    }
  },
  mounted() {
    this.show = true;
    var home = document.getElementsByClassName("home")[0];
    home.style.width = window.innerWidth + "px";
    home.style.height = window.innerHeight + "px";
  },

  computed: {},
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    a({ row, rowIndex }) {
      return "floatRight";
    },
    doLogin() {
      this.$router.push({
        path: "/login",
      });
    },
    getGameList(e) {
      try {
        var _this = this;
        switch (e) {
          case "贪吃蛇":
            var stateObject = {};
            var title = "Wow Title";
            var newUrl = "/snake";
            history.pushState(stateObject, title, newUrl);
            _this.$router.go(0);
            // changeURLArg("http://localhost:8080/snake");
            // _this.$router.push({path:"/snake"});
            break;
          case "五子棋":
            var stateObject = {};
            var title = "Wow Title";
            var newUrl = "/Gobang";
            history.pushState(stateObject, title, newUrl);
            _this.$router.go(0);
            break;
          case "2048":
            var stateObject = {};
            var title = "Wow Title";
            var newUrl = "/2048";
            history.pushState(stateObject, title, newUrl);
            _this.$router.go(0);
            break;
          default:
            var stateObject = {};
            var title = "Wow Title";
            var newUrl = "/no_game";
            history.pushState(stateObject, title, newUrl);
            _this.$router.go(0);
            break;
        }
      } catch {
        var stateObject = {};
        var title = "Wow Title";
        var newUrl = "/no_game";
        history.pushState(stateObject, title, newUrl);
        _this.$router.go(0);
      }
    },
    timeout() {
      setTimeout(function () {
        self.timeA = true;
      }, 350);
    },
    mouseEvent() {
      document.querySelector(".searchC").style.display = "inline";
      let self = this;
      self.timeout();
    },
    mouseEventTwo() {
      self = this;
      if (self.timeA) {
        document.querySelector(".searchC").style.display = "none";
        self.timeA = false;
      }
    },
    submit_search() {
      self = this;
      // console.log(self.input);
    },

    exit: function () {
      let flag = false;
      this.$store.dispatch("login", flag);
      localStorage.removeItem("userInfo");
      // this.$router.go(0);
    },
  },
};
</script>

<style lang="less" scoped>
.normal {
  color: #ffffff;
}

.home {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 10px;
  background: url("../assets/imgs/backstage.jpg");
  background-size: cover;
  text-align: center;
}
/deep/ .el-row {
  margin-top: 10px;
}
/deep/ .el-button {
  width: 50%;
  min-width: 200px !important;
}

.content-wrap {
  padding-top: 150px;
}

.el-foot {
  padding: 0 20px;
  height: 20%;
  background: dimgrey;
  position: fixed;
  bottom: 0;
  left: 0;
}

.grid-content {
  height: 40px;
  line-height: 40px;
}

.grid-contentA {
  .z_index {
    display: inline;
    z-index: 9999;
    a {
      text-decoration: none;
    }
  }
  .serach {
    display: inline;
  }
  a {
    font-size: 14px;
    font-weight: 500;
    padding: 0 6px;
    color: #409eff;
    padding: 0 3px 0 0;
  }
}
.z_index {
  display: inline;
  z-index: 9999;
  a {
    text-decoration: none;
  }
}
.serach {
  display: inline;
}

.el-row {
  margin-top: 0px;
}
</style>