<template>
  <div class="signupFrm" id="body">
    <div action="" class="form">
      <h1 class="title">注册</h1>

      <div class="inputContainer">
        <input type="text" class="input" v-model="name" placeholder="a">
        <label for="" class="label">姓名</label>
      </div>
      <div class="inputContainer">
        <input type="text" class="input" v-model="username" placeholder="a">
        <label for="" class="label">账号</label>
      </div>

      <div class="inputContainer">
        <input type="password" class="input" v-model="password" placeholder="a">
        <label for="" class="label">密码</label>
      </div>

      <div class="inputContainer">
        <input type="text" class="input" v-model="head" placeholder="a">
        <label for="" class="label">头像</label>
      </div>

      <div class="inputContainer">
        <el-select v-model="level" class="checkbox" placeholder="权限" size="20px">
          <el-option
              :value="1"
              label="超级管理员"
          />
          <el-option
              :value="2"
              label="管理员"
          />
          <el-option
              :value="3"
              label="普通用户"
          />
        </el-select>
      </div>
      <input type="submit" class="submitBtn" value="注册" @click="register()">
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  data() {
    return {
      name: '',
      username: "",
      password: "",
      level: '',
      head: "",
    }
  },
  mounted() {
    this.name = "";
    this.username = "";
    this.password = "";
    this.level = "";
    this.head = "";
  },
  methods: {
    register() {
      let data = {
        name: this.name,
        username: this.username,
        password: this.password,
        level: this.level,
        head: this.head,
      }
      console.log(this.level)
      this.$axios({
        method: 'post',
        url: 'user/register',
        data: data,
        headers: {
          'token': this.$cookies.get("LyFiveToken")
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("注册成功");
        } else {
          this.$message.error("注册失败");
        }
      }).catch(err => {
        this.$message.error("注册失败,权限不足");
      })
    }
  }
})
</script>

<style scoped>

@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjxAwXjeu.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

/* latin */
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjx4wXg.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

#body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "lato", sans-serif;
}

.signupFrm {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.form {
  background-color: white;
  width: 400px;
  border-radius: 8px;
  padding: 20px 40px;
  box-shadow: 0 10px 25px rgba(92, 99, 105, .2);
}

.title {
  font-size: 25px;
  margin-bottom: 25px;
}

.inputContainer {
  position: relative;
  height: 50px;
  width: 90%;
  margin-bottom: 17px;
}

/* 设置输入框的样式 */

.input {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 90%;
  width: 85%;
  border: 1px solid #DADCE0;
  border-radius: 7px;
  font-size: 16px;
  padding: 0 20px;
  outline: none;
  background: none;
  z-index: 1;
}

/* 隐藏占位符文本（a）*/

::placeholder {
  color: transparent;
}

/* 设置文本标签的样式 */

.checkbox {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  border-radius: 3px;
  outline: none;
  background: none;
  z-index: 1;
}

.label {
  position: absolute;
  top: 15px;
  left: 15px;
  padding: 0 4px;
  background-color: white;
  color: #DADCE0;
  font-size: 16px;
  transition: 0.5s;
  z-index: 0;
}

.submitBtn {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-left: auto;
  padding: 15px 30px;
  border: none;
  background-color: lightskyblue;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 30px;
}

.submitBtn:hover {
  background-color: deepskyblue;
  animation: gradient 0.5s linear;
}

@keyframes gradient {
  0% {
    background-color: lightskyblue;
  }
  100% {
    background-color: deepskyblue;
  }
}

.input:focus + .label {
  top: -2px;
  left: 3px;
  z-index: 10;
  font-size: 14px;
  font-weight: 600;
  color: dodgerblue;
}


.input:not(:placeholder-shown) + .label {
  top: -4px;
  left: 3px;
  z-index: 10;
  font-size: 14px;
  font-weight: 600;
}

.input:focus {
  border: 2px solid deepskyblue;
}
</style>
