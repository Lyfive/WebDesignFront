<script>
import axios from "axios"
export default {
  data() {
    return {
      username: "",
      password: "",
      status_22: "public\\22_open.png", 
      status_33: "public\\33_open.png",
      // 构建版本去掉public
    }
  },
  methods: {
    submit() {
      let username = this.username;
      let password = this.password;
      console.log(this.username, this.password)
      axios.post("//127.0.0.1:8080/login", {
        id: "LyFive",
        username: username,
        password: password,
      })
        .then(res => {
          console.log(res)
          if (res.code == 200 && res.data["msg"] == 200) {
            alert("登录成功！")
          } else {
            console.log(this.username + this.password)
            alert("账号或密码错误！")
          }
        })
        .catch(err => {
          console.error(err);
        })
    },
    print() {
      console.log(this.$data)
    },
    close() {
      this.status_22 = "public\\22_close.png";
      this.status_33 = "public\\33_close.png";
    },
    open() {
      this.status_22 = "public\\22_open.png";
      this.status_33 = "public\\33_open.png";
    }
  },
}
</script>

<template>
  <div class="left-22"><img :src=status_22 width="185"></div>
  <div class="right-33"><img :src=status_33 width="185"> </div>
  <div class="mini-content">
    <div class="left">
      <img src="./assets/school.png" alt id="school" />
    </div>
    <div class="right">
      <div class="top" v-on:click="print">学生系统登录</div>
      <div class="split"></div>
      <div class="center">
        <div class="box">
          <div class="search">
            <label for="username">账号：</label>
            <input type="text" id="username" v-model="username" placeholder="请输入账号" />
          </div>
        </div>
        <div class="box">
          <div class="search">
            <label for="password">密码：</label>
            <input type="password" id="password" v-model="password" placeholder="请输入密码" @focusin="close"
              @focusout="open" />
          </div>
        </div>
        <div class="clk-button">
          <button>
            <p>注册</p>
          </button>
          <button v-on:click="submit">
            <p>登录</p>
          </button>
        </div>
      </div>
    </div>
    <div class="footer">
      <span>
        <a href="https://github.com/Lyfive">
          <img src="./assets/Github.png" alt />
        </a>
        <a href="https://www.luogu.com.cn/user/364366">
          <img src="https://www.luogu.com.cn/favicon.ico" alt />
        </a>
        <a href="https://codeforces.com/profile/LyFive">
          <img src="https://codeforces.org/s/0/favicon-32x32.png" alt />
        </a>
      </span>
      <span>学生成绩管理系统&nbsp;by&nbsp;LyFive</span>
    </div>
  </div>
</template>

<style>
* {
  border: 0;
  margin: 0;
  padding: 0;
}

html {
  font-size: 100%;
}

body {
  background-color: rgb(99, 99, 99);
}

#app {
  position: absolute;
  left: 50%;
  top: 10%;
  height: 32.4rem;
  width: 60rem;
  transform: translateX(-50%);

  background-color: rgb(255, 255, 255);
}

.mini-content {
  position: absolute;
  top: 12%;
  left: 12%;
  width: 80%;
  height: 80%;
}

.position-left {
  position: absolute;
  left: 0%;
}

.left {
  position: absolute;
  left: 0%;
  width: 40%;
  height: 100%;
  background-color: rgb(255, 255, 255);
}

#school {
  display: block;
  position: absolute;
  width: 90%;
  top: 40%;
  transform: translateY(-50%);
}

.right {
  position: absolute;
  right: 0%;
  width: 60%;
  height: 100%;
}

.top {
  position: relative;
  width: 100%;
  height: 3rem;
  font-size: 2rem;
  font-weight: 600;
  line-height: 3rem;
  text-align: center;
}

.split {
  position: relative;
  width: 100%;
  height: 0.5rem;
  margin-bottom: 4rem;
  background-color: rgb(182, 182, 182);
}

.center {
  position: relative;
  width: 100%;
  height: 20rem;
}

.box {
  position: relative;
  width: 100%;
  height: 4rem;
}

.search {
  position: absolute;
  height: 3rem;
  width: 95%;
  border: 2px solid black;
  border-radius: 8px 8px 8px 8px;
  border-color: rgb(143, 143, 143);
  padding-left: 1rem;
  box-shadow: inset 1px #333;
  overflow: hidden;
  line-height: 3rem;
  font-size: 1.2rem;
}

.search input {
  font-size: 1.2rem;
  width: 80%;
  border: none;
  padding-left: 0.2rem;
}

.search input:focus {
  border: none;
  outline: none;
}

#user {
  height: 2rem;
}

#password {
  height: 2rem;
}

.clk-button {
  position: relative;

  height: 2rem;
  width: 100%;
  display: flex;
  flex-direction: row;
}

.clk-button button {
  display: flex;
  width: 100%;
  font-size: 1.25rem;
  line-height: 2rem;
  text-align: center;
  border-radius: 8px 8px 8px 8px;
  margin-right: 0.5rem;
}

.clk-button p {
  width: 100%;
  height: 100%;
  text-align: center;
}

.footer {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 0%;
  height: 10%;
  width: 60%;

  display: flex;
  flex-direction: row;

  color: darkgray;
}

.footer span {
  display: flex;
  margin-right: 1rem;
  height: 2rem;
  width: 100%;
  line-height: 2rem;
}

.footer a {
  position: relative;
  display: inline-block;
  height: 100%;
}

.footer img {
  position: relative;
  margin-right: 0.5rem;
  width: 2rem;
}

.left-22 {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
}

.right-33 {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
}
</style>
