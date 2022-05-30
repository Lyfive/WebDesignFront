<template>
  <div>
    <el-table
        ref="userListRef"
        :data=userList
        :default-sort="{prop: 'level', order: 'descending'}"
        table-layout="fixed"
        style="width: 100%">
      <el-table-column
          prop="username"
          label="用户名"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="level"
          sortable
          label="权限"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="name"
          label="用户姓名"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="head"
          label="头像链接"
          align="center"
      >
      </el-table-column>
      <el-table-column
          label="操作"
          align="center"
      >
        <template #default="scope">
          <el-button
              type="primary"
              size="small"
              @click="clickEdit(scope.row)">
            编辑
          </el-button>
          <el-dialog
              title="请输入修改用户信息"
              v-model="dialogModify"
              width="30%"
          >
            <el-form ref="form" :model="userForm" label-width="80px">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="userForm.username" placeholder="用户名" disabled></el-input>
              </el-form-item>
              <el-form-item label="权限" prop="level">
                <el-select v-model="userForm.level" placeholder="选择权限">
                  <el-option
                      v-for="item in levelList"
                      :key="item"
                      :label="item"
                      :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="用户姓名" prop="name">
                <el-input v-model="userForm.name" placeholder="请输入用户姓名"></el-input>
              </el-form-item>
              <el-form-item label="头像链接" prop="head">
                <el-input v-model="userForm.head" placeholder="请输入头像链接"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogModify = false">取 消</el-button>
            <el-button type="primary" @click="handleEdit(scope.row)">确 定</el-button>
          </span>
          </el-dialog>
          <el-popconfirm
              title="你确定要删除吗"
              @confirm="handleDelete(scope.row)"
          >
            <template #reference>
              <el-button
                  type="danger"
                  size="small">
                删除
              </el-button>
            </template>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

function User(id, username, password, level, name, head) {
  return {
    id: id,
    username: username,
    password: password,
    level: level,
    name: name,
    head: head
  }
}

export default defineComponent({
  data() {
    return {
      dialogModify: false,

      levelName: ["", "超级管理员", "管理员", "普通用户"],
      userList: [User(2, 'test', 'test', '管理员', '管理员', ''), User(1, 'admin', 'admin', '普通用户', '管理员', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')],
      userForm: {
        username: '',
        password: '',
        level: '',
        name: '',
        head: ''
      },
      userLevel: 3,
      levelList: [],
    }
  },
  mounted() {
    let index = 0
    const userLevel = this.$cookies.get('LyFive').level
    for (let i = 0; i < this.levelName.length; i++) {
      if (this.levelName[i] === userLevel) {
        index = i
        break
      }
    }
    this.getAllUsers()
    this.levelList = this.levelName.slice(index)
  },
  methods: {
    getAllUsers() {
      if (this.$cookies.get("LyFive").level == '普通用户') {
        this.$message.error("权限不足")
        return
      }
      this.$axios({
        method: 'get',
        url: '/user/users',
        headers: {
          'token': this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        this.userList = res.data.users

        for (let i = 0; i < this.userList.length; i++) {
          this.userList[i].level = this.levelName[this.userList[i].level]
        }
      }).catch(err => {
        if (err.response.status == 401) {
          this.$message.error('登录已过期，请重新登录')
        }
        console.log(err)
      })
    },
    clickEdit(row) {
      // todo
      console.log(row)
      let user = row
      this.userForm = User(user.id, user.username, user.password, user.level, user.name, user.head)

      this.dialogModify = true
    },
    handleEdit(row) {
      // todo
      // 转换等级
      let level = this.userForm.level
      console.log(level)
      for (let i = 0; i < this.levelName.length; i++) {
        if (this.levelName[i] === level) {
          level = i
          break
        }
      }
      console.log(level)
      console.log(row)
      this.$axios({
        method: 'put',
        url: '/user/modify',
        data: {
          id: this.userForm.id,
          level: level,
          name: this.userForm.name,
          head: this.userForm.head
        },
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        },
      }).then(res => {
        if (res.data["code"] == 200) {
          row.id = this.userForm.id
          row.username = this.userForm.username
          row.password = this.userForm.password
          row.level = this.userForm.level
          row.name = this.userForm.name
          row.head = this.userForm.head

          this.$message.success('修改成功')
        }
        console.log(res)
      }).catch(err => {
        if (err.response.status == 401) {
          this.$message.error("权限不足")
        } else {
          this.$message.error("修改失败")
        }
      })
      this.dialogModify = false
    },

    handleDelete(row) {
      // todo
      // 删除索引处
      console.log(row)
      this.$axios({
        method: 'delete',
        url: '/user/delete',
        data: {
          id: row.id
        },
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        },
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success('删除成功')
          this.userList.splice(this.userList.indexOf(row), 1)
        } else {
          this.$message.error('删除失败')
        }
      }).catch(err => {
        if (err.response.status == 401) {
          this.$message.error("权限不足")
        } else {
          this.$message.error('服务错误')
        }
      })
    },
  }
})
</script>

<style lang='stylus' scoped></style>
