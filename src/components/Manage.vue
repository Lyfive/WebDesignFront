<script>
import {
  Document,
  Menu as IconMenu,
  Avatar,
  Location,
  Setting,
  HomeFilled,
  CaretBottom,
  Delete,
  UserFilled,
  List,
  Link,
} from '@element-plus/icons-vue'

import "vue-router";

import {
  ElContainer,
  ElBreadcrumb,
  ElButton,
} from 'element-plus'

export default {
  components: {
    Link,
    List,
    UserFilled,
    Delete,
    ElButton,
    CaretBottom,
    Document,
    Avatar,
    IconMenu,
    Location,
    ElContainer,
    Setting,
    ElBreadcrumb,
    HomeFilled,
  },
  data() {
    return {
      userName: 'LyFive',
      head: "https://github.githubassets.com/apple-touch-icon-144x144.png",
      color: "rgb(235, 241, 246)",
    }
  },
  mounted() {
    this.userName = this.$cookies.get('LyFive').username
    this.head = this.$cookies.get('LyFive').head
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleCommand() {

    },
    baseImgPath() {

    },
    logout() {
      this.$cookies.remove('LyFiveToken')
      this.$cookies.remove("LyFive")
      this.$router.push('/login')
    },
    changeBgcolor() {
      this.$refs.bg.style.backgroundColor = this.color;
    },

    goToAdminSet() {
      this.$router.push('/admin')
    },
  },
  computed: {
    userInfo() {
      return {
        username: this.userName,
        head: this.head,
      }
    }
  },
}
</script>

<template>
  <div ref="bg" class="common-layout" style="height: 100%;">
    <el-container style="height: 100%;">
      <el-header style="width: 100%;padding:0;">
        <el-container style="height: 100%;width: 100%">
          <el-aside
              style="border:0;height: 100%;width:17%;background-color: rgb(25, 70, 112);padding: 0;">
            <el-image src="https://github.com/Lyfive/MyPictures/blob/master/background/autograph.png?raw=true"
                      style="width: 100%;top: 50%;transform: translateY(-50%)"/>
          </el-aside>
          <el-main style="padding: 0;">
            <el-row :gutter="0">
              <el-col :span="4"></el-col>
              <el-col :span="7">
                <el-carousel direction="vertical" height="60px">
                  <el-carousel-item style="background-color: #fff;">
                    <el-link href="https://codeforces.com/profile/LyFive">
                      <el-image :src="'https://codeforces.org/s/96279/images/codeforces-logo-with-telegram.png'"/>
                    </el-link>
                  </el-carousel-item>
                  <el-carousel-item style="background-color: rgb(35, 29, 32);">
                    <el-link href="https://github.com/Lyfive">
                      <el-image :src="'https://github.githubassets.com/apple-touch-icon-144x144.png'"
                                style="height: 65px;"/>
                    </el-link>
                  </el-carousel-item>
                </el-carousel>
              </el-col>
              <el-col :span="9">
                <div id="introduce-head">
                <span>
                  <el-button type="primary" style="height: 100%;width: 100%" :color="color" plain
                             @click="goToAdminSet()">
                  <el-image style="" class="center"
                            :src="head"
                            fit="scale-down"
                  />
                  </el-button>
                </span>
                  <span>
                   <el-button type="primary" style="height: 100%;width: 100%" :color="color" plain>
                <el-dropdown trigger="hover" class="center">
                  <span style="font-size: 1.5rem;">{{ userName }}</span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="logout">
                        <el-icon>
                          <delete/>
                        </el-icon>
                        注销
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
                   </el-button>
                </span>
                  <span>
                   <el-button type="primary" style="height: 100%;width: 100%" :color="color" plain>
                  <el-link href="https://github.com/Lyfive/WebDesignFront"
                           type="info"
                           class="center"
                  >
                  <el-icon>
                    <Link/>
                  </el-icon>
                  <span>关于</span>
                </el-link>
                   </el-button>
                </span>
                  <span>
                   <el-button type="primary" style="height: 100%;width: 100%" :color="color" plain>
                  <div class="center">
                  <el-color-picker v-model="color" @change="changeBgcolor()"/>
                  </div>
                   </el-button>
                </span>
                  <span>
                </span>
                </div>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </el-header>
      <el-container style="height: 100%;">
        <el-aside style="height: 100%;width: 17%;">
          <el-menu :default-active="this.$router.path"
                   background-color="rgb(25, 70, 112)"
                   class="menu"
                   @open="handleOpen"
                   @close="handleClose"
                   unique-opened
                   router
                   style="height: 100%;border: none;"
                   text-color="rgb(235, 241, 246)"
                   active-text-color="#ffd04b"
          >
            <el-menu-item index="home">
              <el-icon>
                <HomeFilled/>
              </el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <avatar/>
                </el-icon>
                <span>用户管理</span>
              </template>
              <el-menu-item index="userList">
                用户列表
              </el-menu-item>
              <el-menu-item index="registerUser">用户注册</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="studentList">
              <template #title>
                <el-icon>
                  <icon-menu/>
                </el-icon>
                <span>学生管理</span>
              </template>
              <!--            <el-menu-item index="studentList">学生列表</el-menu-item>-->
              <!--            <el-menu-item index="addStudent">添加学生</el-menu-item>-->
              <!--            <el-menu-item index="modifyStudent">修改学生信息</el-menu-item>-->
            </el-menu-item>
            <el-sub-menu index="3">
              <template #title>
                <el-icon>
                  <document/>
                </el-icon>
                <span>成绩管理</span>
              </template>
              <el-menu-item index="queryGrade">成绩查询</el-menu-item>
              <el-menu-item index="updateGrade">成绩更新</el-menu-item>
              <!--            <el-menu-item index="createGrade">生成成绩报表</el-menu-item>-->
            </el-sub-menu>
            <el-menu-item index="education">
              <el-icon>
                <List/>
              </el-icon>
              <span>教务管理</span>
            </el-menu-item>
            <el-menu-item index="admin">
              <el-icon>
                <setting/>
              </el-icon>
              <span>系统设置</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main style="height: 100%;">
          <router-view>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  height: 100%;
  background-color: rgb(235, 241, 246);
}

.menu {
  background-image: url("https://github.com/Lyfive/MyPictures/blob/master/background/back.jpg?raw=true");
  background-size: cover;

}

#introduce-head {
  position: relative;
  display: flex;
  flex-direction: row;
  height: 100%;
}

#introduce-head span {
  position: relative;
  height: 100%;
  width: 100%;
}

.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
