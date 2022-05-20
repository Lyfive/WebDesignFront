```vue
<div class="common-layout">
    <el-container>
      <el-header>
        <el-aside width="200px">
          LyFive
        </el-aside>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen"
                       @close="handleClose" unique-opened>
                <el-sub-menu index="1">
                  <template #title>
                    <el-icon>
                      <avatar/>
                    </el-icon>
                    <span>用户管理</span>
                  </template>
                  <el-menu-item index="1-1">
                    用户列表
                  </el-menu-item>
                  <el-menu-item index="1-2">用户注册</el-menu-item>
                  <el-menu-item index="1-3">用户信息修改</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="2">
                  <template #title>
                    <el-icon>
                      <icon-menu/>
                    </el-icon>
                    <span>学生管理</span>
                  </template>
                  <el-menu-item index="2-1">学生列表</el-menu-item>
                  <el-menu-item index="2-2">添加学生</el-menu-item>
                  <el-menu-item index="2-3">修改学生信息</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="3">
                  <template #title>
                    <el-icon>
                      <document/>
                    </el-icon>
                    <span>成绩管理</span>
                  </template>
                  <el-menu-item index="3-1">成绩查询</el-menu-item>
                  <el-menu-item index="3-2">添加成绩</el-menu-item>
                  <el-menu-item index="3-3">生成成绩报表</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="4">
                  <el-icon>
                    <setting/>
                  </el-icon>
                  <span>系统设置</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <router-view>
            {{ $route.params.id }}
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
```

```vue
  <el-container>
    <el-header>
      <el-aside width="200px">
        LyFive
      </el-aside>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-row>
         <el-col :span="24">
           <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
             <el-sub-menu indx="1">

             </el-sub-menu>
           </el-menu>
         </el-col>
        </el-row>
      </el-aside>
    </el-container>
  </el-container>
```

