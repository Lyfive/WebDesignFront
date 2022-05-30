<template>
  <el-form ref="gradeForm" :model="gradeForm" label-width="auto" class="center">
    <el-form-item label="请选择学院">
      <el-select v-model="gradeForm.fid" placeholder="学院" @change="updateDepartments(gradeForm.fid)">
        <el-option
            v-for="item in faculties"
            :key="item.fid"
            :label="item.name"
            :value="item.fid">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="请选择系">
      <el-select v-model="gradeForm.did" placeholder="系"
                 @change="updateSessions(gradeForm.did)">
        <el-option
            v-for="item in departments"
            :key="item.did"
            :label="item.name"
            :value="item.did">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="请选择年级">
      <el-select v-model="gradeForm.session" placeholder="年级" @change="updateClasses(gradeForm.did,gradeForm.session)">
        <el-option
            v-for="item in sessions"
            :key="item.session"
            :label="item.session"
            :value="item.session">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="请选择班级">
      <el-select v-model="gradeForm.sid" placeholder="班级" @change="updateStudents(gradeForm.sid)">
        <el-option
            v-for="item in classes"
            :key="item.sid"
            :label="item.name"
            :value="item.sid">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="请选择学生" required="true">
      <el-select v-model="gradeForm.number" placeholder="学生">
        <el-option
            v-for="item in students"
            :key="item.number"
            :label="item.name+'('+item.number+')'"
            :value="item.number">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="请选择课程" required="true">
      <el-select v-model="gradeForm.cid" placeholder="课程">
        <el-option
            v-for="item in courses"
            :key="item.cid"
            :label="item.title"
            :value="item.cid">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="请输入分数" required="true">
      <el-input-number v-model="gradeForm.mark" :min="0" :max="100" label="分数"/>
    </el-form-item>
    <el-form-item>
      <el-row :gutter="0" style="width: 100%" justify="center">
        <el-col :span="12">
          <el-button type="primary" @click="updateGrade()">提交</el-button>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  setup() {
    // todo
    return {}
  },
  data() {
    return {
      gradeForm: {
        fid: "",
        did: "",
        session: "",
        sid: "",
        number: "",
        cid: "",
        mark: 0,
      },
      faculties: [
        {
          fid: 1,
          name: "计算机科学与工程学院",
        },
        {
          fid: 2,
          name: "数学与计算科学学院",
        }
      ],
      departments: [
        {
          did: 1,
          name: "计算机科学与技术",
        },
        {
          did: 2,
          name: "软件工程",
        }
      ],
      sessions: [
        '21',
        '20',
        '19',
        '18'
      ],
      classes: [
        {
          sid: 1,
          name: "计算机科学与技术1班",
        },
        {
          sid: 2,
          name: "计算机科学与技术2班",
        }
      ],
      students: [
        {
          number: "2005010705",
          name: "张三",
        },
        {
          number: "2005010706",
          name: "李四",
        }
      ],
      courses: [
        {
          cid: 1,
          title: "Java",
        },
        {
          cid: 2,
          title: "数学",
        }
      ]
    }
  },
  methods: {
    updateDepartments(fid) {
      // todo
      this.departments = []
      this.gradeForm.did = ""
      this.$axios.get("/mid/departments", {
        params: {
          fid: fid,
        },

        headers: {
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        if (res.data['code'] === 200) {
          this.departments = res.data.data
        } else {
          this.$message.error(res.data['msg'])
        }
      }).catch(err => {
        if (err.response.status == 401) {
          this.$message.error("权限不足")
        } else {
          this.$message.error("服务器错误")
        }
      })
    },
    updateSessions(did) {
      // todo
      this.sessions = []
      this.gradeForm.session = ""
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
        this.updateCourses(did)
      }).catch(err => {
        if (err.response.status == 401) {
          this.$message.error("权限不足")
        } else {
          this.$message.error("服务器错误")
        }
      })
    },
    updateClasses(did, session) {
      // todo
      this.classes = []
      this.gradeForm.sid = ""
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
      }).catch(err => {
        if (err.response.status == 401) {
          this.$message.error("权限不足")
        } else {
          this.$message.error("服务器错误")
        }
      })
    },

    updateStudents(sid) {
      // todo
      this.students = []
      this.gradeForm.number = ""
      this.$axios.get("/mid/students", {
        params: {
          sid: sid,
        },

        headers: {
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        console.log(res.data.data)
        this.students = res.data.data
      }).catch(err => {
        if (err.response.status == 401) {
          this.$message.error("权限不足")
        } else {
          this.$message.error("服务器错误")
        }
      })
    },
    updateCourses(did) {
      // todo
      this.courses = []
      this.gradeForm.cid = ""
      this.$axios.get("/mid/courses", {
        params: {
          did: did,
        },

        headers: {
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        console.log(res.data.data)
        this.courses = res.data.data
      }).catch(err => {
        if (err.response.status == 401) {
          this.$message.error("权限不足")
        } else {
          this.$message.error("服务器错误")
        }
      })
    },

    updateGrade() {
      // 传递number、cid、mark更新分数，保证三者均在
      if (this.gradeForm.number != "" && this.gradeForm.cid != "" && this.gradeForm.mark != "") {
        this.$axios({
          method: 'post',
          url: '/grade/add',
          data: {
            number: this.gradeForm.number,
            cid: this.gradeForm.cid,
            mark: this.gradeForm.mark,
          },
          headers: {
            "token": this.$cookies.get('LyFiveToken')
          }
        }).then(res => {
          console.log(res.data)
          if (res.data.code == 200) {
            this.$message.success("更新成功")
          } else {
            this.$message.error("更新失败")
          }
        }).catch(err => {
          if (err.response.status == 401) {
            this.$message.error("权限不足")
          } else {
            this.$message.error("服务器错误")
          }
        })
      } else {
        this.$message.error("请填写完整信息")
      }
    },
  },
  created() {
    // todo
    this.faculties = []
    this.departments = []
    this.sessions = []
    this.classes = []
    this.students = []
    this.courses = []
    this.gradeForm.sid = ""
    this.gradeForm.cid = ""
    this.gradeForm.grade = ""
    this.gradeForm.did = ""
    // 获取学院
    this.$axios.get("/mid/faculties", {
      headers: {
        "token": this.$cookies.get('LyFiveToken')
      }
    }).then(res => {
      console.log(res.data.data)
      this.faculties = res.data.data
    }).catch(err => {
      if (err.response.status == 401) {
        this.$message.error("权限不足")
      } else {
        this.$message.error("服务器错误")
      }
    })
  }
})
</script>

<style scoped>
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
