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
    }
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
      this.$router.push('/login')
    }
  }
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="this.$router.path"
                 class="menu"
                 @open="handleOpen"
                 @close="handleClose"
                 unique-opened
                 router
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
            <el-menu-item index="modifyUser">用户信息修改</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <icon-menu/>
              </el-icon>
              <span>学生管理</span>
            </template>
            <el-menu-item index="studentList">学生列表</el-menu-item>
<!--            <el-menu-item index="addStudent">添加学生</el-menu-item>-->
<!--            <el-menu-item index="modifyStudent">修改学生信息</el-menu-item>-->
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <document/>
              </el-icon>
              <span>成绩管理</span>
            </template>
            <el-menu-item index="queryGrade">成绩查询</el-menu-item>
            <el-menu-item index="addGrade">添加成绩</el-menu-item>
            <el-menu-item index="createGrade">生成成绩报表</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="adminSet">
            <el-icon>
              <setting/>
            </el-icon>
            <span>系统设置</span>
          </el-menu-item>
        </el-menu>

      </el-aside>
      <el-container>
        <el-header>
          <el-row :gutter="0" justify="center">
            <el-col :span="7">
              <el-carousel direction="vertical" height="65px">
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
            <el-col :span="2">
                <el-avatar
                    src="https://avatars0.githubusercontent.com/u/24394918?s=460&v=4"
                />
            </el-col>
            <el-col :span="2">
              <el-dropdown trigger="hover">
                <span>{{ userName }}</span>
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
            </el-col>
            <el-col :span="2">
              <el-link href="https://github.com/Lyfive/WebDesignFront"
                       type="info"
              >
                <el-icon>
                  <Link/>
                </el-icon>
                <span>关于</span>
              </el-link>
            </el-col>
            <el-col :span="2"></el-col>
          </el-row>

        </el-header>
        <el-main>
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

.tac {
  flex: none;
  width: 100%;
  height: 100%;
  font-size: 2rem;
  background-color: #fff;
}

.menu {
  background-image: url("https://github.com/Lyfive/Mypictures/blob/master/Picture/%E8%BE%A3%E4%B8%AA%E5%A5%B3%E4%BA%BA0.jpg?raw=true");
  background-size: cover;
}

</style>


