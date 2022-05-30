<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6"></el-col>
      <el-col :span="6">
        <el-input v-model="number" placeholder="请输入学号"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="handleFind()">查询</el-button>
        <el-button type="primary" @click="addStudent()" style="margin-right: 15px;margin-left: 15px">添加学生</el-button>
        <el-dialog
            title="请输入学生信息"
            v-model="dialogAdd"
            width="30%"
        >
          <el-form ref="addForm" :model="studentForm" label-width="120px">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="studentForm.student.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="studentForm.student.sex" placeholder="性别">
                <el-option
                    label="男"
                    value="男">
                </el-option>
                <el-option
                    label="女"
                    value="女">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出生日期" prop="birthday">
              <el-date-picker
                  v-model="studentForm.student.birthday"
                  type="date"
                  placeholder="选择出生日期"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
              />
            </el-form-item>
            <el-form-item label="请选择学院">
              <el-select v-model="studentForm.fid" placeholder="学院" @change="updateDepartments(studentForm.fid)">
                <el-option
                    v-for="item in faculties"
                    :key="item.fid"
                    :label="item.name"
                    :value="item.fid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="请选择系">
              <el-select v-model="studentForm.did" clearable placeholder="系" @change="updateSessions(studentForm.did)">
                <el-option
                    v-for="item in departments"
                    :key="item.did"
                    :label="item.name"
                    :value="item.did">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="请选择年级">
              <el-select v-model="studentForm.session" placeholder="年级"
                         @change="updateClasses(studentForm.did,studentForm.session)">
                <el-option
                    v-for="item in sessions"
                    :key="item.session"
                    :label="item.session"
                    :value="item.session">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="请选择班级">
              <el-select v-model="studentForm.sid" placeholder="班级">
                <el-option
                    v-for="item in classes"
                    :key="item.sid"
                    :label="item.name"
                    :value="item.sid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-row :gutter="10" justify="center">
            <el-col :span="6">
              <el-button @click="dialogAdd = false">取 消</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" @click="handleAdd()">确 定</el-button>
            </el-col>
          </el-row>
        </el-dialog>
        <el-popconfirm
            title="你确定要删除选择项吗"
            @confirm="handleDeleteChecked()"
        >
          <template #reference>
            <el-button type="danger" v-if="showDelete">删除</el-button>
          </template>
        </el-popconfirm>
      </el-col>
    </el-row>
  </div>
  <el-table
      ref="multipleTableRef"
      :data=studentList
      @selection-change="isShow()"
      table-layout="fixed"
      style="width: 100%">
    <el-table-column
        prop="number"
        label="学号"
        align="center"
    >
    </el-table-column>
    <el-table-column
        prop="name"
        label="姓名"
        align="center"
    >
    </el-table-column>
    <el-table-column
        prop="sex"
        label="性别"
        align="center"
    >
    </el-table-column>
    <el-table-column
        prop="birthday"
        label="生日"
        align="center"
    >
    </el-table-column>
    <el-table-column
        prop="session"
        label="年级"
        align="center"
    >
    </el-table-column>
    <el-table-column
        prop="class"
        label="班级"
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
            @click="clickEdit(scope.$index)">
          编辑
        </el-button>
        <el-dialog
            title="请输入修改学生信息"
            v-model="dialogModify"
            width="30%"
        >
          <el-form ref="form" :model="studentForm" label-width="80px">
            <el-form-item label="学号" prop="number">
              <el-input v-model="studentForm.student.number" placeholder="请输入学号" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="studentForm.student.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="studentForm.student.sex" placeholder="性别">
                <el-option
                    label="男"
                    value="男">
                </el-option>
                <el-option
                    label="女"
                    value="女">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出生日期" prop="birthday">
              <el-date-picker
                  v-model="studentForm.student.birthday"
                  type="date"
                  placeholder="选择出生日期"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
              />
            </el-form-item>
            <el-form-item label="学院">
              <el-select v-model="studentForm.fid" placeholder="学院" @change="updateDepartments(studentForm.fid)">
                <el-option
                    v-for="item in faculties"
                    :key="item.fid"
                    :label="item.name"
                    :value="item.fid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="系">
              <el-select v-model="studentForm.did" clearable placeholder="系" @change="updateSessions(studentForm.did)">
                <el-option
                    v-for="item in departments"
                    :key="item.did"
                    :label="item.name"
                    :value="item.did">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年级">
              <el-select v-model="studentForm.session" placeholder="年级"
                         @change="updateClasses(studentForm.did,studentForm.session)">
                <el-option
                    v-for="item in sessions"
                    :key="item.session"
                    :label="item.session"
                    :value="item.session">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="班级">
              <el-select ref="className" v-model="studentForm.sid" placeholder="班级">
                <el-option
                    v-for="item in classes"
                    :key="item.sid"
                    :label="item.name"
                    :value="item.sid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogModify = false">取 消</el-button>
            <el-button type="primary" @click="handleEdit(scope.$index)">确 定</el-button>
          </span>
        </el-dialog>

        <el-popconfirm
            title="你确定要删除吗"
            @confirm="handleDelete(scope.$index)"
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
    <el-table-column
        type="selection"
        label="多选"
    >
    </el-table-column>
  </el-table>
</template>

<script>
import {defineComponent} from 'vue'

function student(number, name, sex, birthday, Class, Session) {
  return {
    number: number,
    name: name,
    sex: sex,
    birthday: birthday,
    class: Class,
    session: Session
  }
}

export default defineComponent({
  data() {
    return {
      number: "",
      studentList: [student('2005010705', '李映飞', '男', '2002-11-15', '计算机科学与技术七班', '20'), student("2005010704", "LyFive", "男", "2002-11-15", "计算机科学与技术七班", '20')],
      dialogModify: false,
      dialogAdd: false,
      showDelete: false,
      done: false,
      studentForm: {
        student: student(),
        fid: "",
        did: "",
        session: "",
        sid: "",
      },
      faculties: [],
      departments: [],
      sessions: [],
      classes: [],
    }
  },
  created() {
    // 创建完成把所有学生都查询出来
    console.log(this.$cookies.get('LyFiveToken'))
    this.getAllStudents()
  },
  methods: {
    getAllStudents() {
      this.$axios.get('/student/view', {
        params: {
          number: "%",
        },
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        this.studentList = res.data.students
        console.log(res)
      }).catch(err => {
        if (err.response.status == 401) {
          this.$message.error('登录已过期，请重新登录')
          this.$cookies.remove('LyFiveToken')
          this.$router.push('/login')
        }
      })
    },
    clickEdit(index) {
      // todo
      console.log(index)
      let stu = this.studentList[index]
      this.studentForm.student = student(stu.number, stu.name, stu.sex, stu.birthday, stu.class)
      this.$axios.get("/mid/faculties", {
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        console.log(res.data.data)
        this.faculties = res.data.data
      }).catch(err => {
        if (err.response.status == 401) {
          this.$message.error('登录已过期，请重新登录')
          this.$cookies.remove('LyFiveToken')
          this.$router.push('/login')
        }
      })
      this.dialogModify = true
    },
    handleEdit(index) {
      // todo
      this.studentList[index] = this.studentForm.student
      this.studentList[index].class = this.$refs.className.selectedLabel
      const sid = this.studentForm.sid
      console.log(this.studentList[index])
      console.log(sid)
      this.$axios({
        method: 'put',
        url: '/student/modify',
        data: {
          number: this.studentList[index].number,
          name: this.studentList[index].name,
          sex: this.studentList[index].sex,
          birthday: this.studentList[index].birthday,
          sid: this.studentForm.sid
        },
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        },
      }).then(res => {
        console.log(res)
      }).catch(err => {
        if (err.response.status == 401) {
          this.$message.error("权限不足")
        }
      })
      this.getAllStudents()
      this.dialogModify = false
    },
    handleFind() {
      // 按查询按钮发送学号查询学生
      this.$axios.get('/student/view', {
        params: {
          number: this.number,
        },
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        this.studentList = res.data.students
        console.log(res)
      }).catch(err => {
        if (err.response.status == 401) {
          this.$message.error('登录已过期，请重新登录')
          this.$cookies.remove('LyFiveToken')
          this.$router.push('/login')
        } else {
          this.$message.error('服务错误')
        }
      })
    },
    handleDelete(index) {
      // todo
      // 删除索引处
      console.log(index)
      this.$axios({
        method: 'delete',
        url: '/student/delete',
        data: {
          numbers: [this.studentList[index].number]
        },
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        },
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success('删除成功')
          this.studentList.splice(index, 1)
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
    handleDeleteChecked() { // 删除选中的行
      // todo
      let numbers = []
      for (let i = 0; i < this.$refs.multipleTableRef.getSelectionRows().length; i++) {
        numbers.push(this.$refs.multipleTableRef.getSelectionRows()[i].number)
      }
      console.log(numbers)
      this.$axios({
        method: 'delete',
        url: '/student/delete',
        data: {
          numbers: numbers
        },
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        },
      }).then(res => {
        if (res.data['code'] == 200) {
          this.$message.success('删除成功')
          for (let i = 0; i < this.$refs.multipleTableRef.getSelectionRows().length; i++) {
            this.studentList.splice(this.$refs.multipleTableRef.getSelectionRows()[i].index, 1)
          }
        } else {
          this.$message.error('删除失败')
        }
      }).catch(err => {
        if (err.response.status == 401) {
          this.$message.error("权限不足")
        }
      })

    },
    handleAdd() {
      // todo
      // 将表单信息传上去
      this.$axios({
        method: 'post',
        url: '/student/join',
        data: {
          name: this.studentForm.student.name,
          sex: this.studentForm.student.sex,
          birthday: this.studentForm.student.birthday,
          sid: this.studentForm.sid,
          session: this.studentForm.session,
        },
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        console.log(res)
        this.getAllStudents()
      }).catch(err => {
        console.log(err.response)
        if (err.response.status == 401) {
          this.$message.error("权限不足")
        } else {
          this.$message.error('服务错误')
        }
      })
      this.dialogAdd = false
    },
    isShow() {
      // todo
      console.log(this.$refs.multipleTableRef.getSelectionRows().length)
      this.$refs.multipleTableRef.getSelectionRows().length === 0 ? this.showDelete = false : this.showDelete = true
    },
    addStudent() {
      // todo
      this.studentForm.student = student('', '', '男', '', '')
      this.departments = []
      this.sessions = []
      this.classes = []
      this.studentForm.fid = ""
      this.studentForm.did = ""
      this.studentForm.session = ""
      this.studentForm.sid = ""

      this.$axios.get("/mid/faculties", {
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        console.log(res.data.data)
        this.faculties = res.data.data
      })
      this.dialogAdd = true
    },

    updateDepartments(fid) {
      // todo
      this.departments = []
      this.studentForm.did = ""
      this.$axios.get("/mid/departments", {
        params: {
          fid: fid,
        },
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        console.log(res.data.data)
        this.departments = res.data.data
      })
    },

    updateSessions(did) {
      // todo
      this.sessions = []
      this.studentForm.session = ""
      this.$axios.get("/mid/sessions", {
        params: {
          did: did,
        },
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        console.log(res.data.data)
        this.sessions = res.data.data
      })
    },

    updateClasses(did, session) {
      // todo
      this.classes = []
      this.studentForm.sid = ""
      this.$axios.get("/mid/classes", {
        params: {
          did: did,
          session: session,
        },
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        console.log(res.data.data)
        this.classes = res.data.data
      })
    },
  }
})
</script>

<style lang='stylus' scoped></style>
