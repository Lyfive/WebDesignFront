<template>
  <el-container style="height: 100%">
    <el-aside width="400px">
      <el-form ref="gradeForm" :model="gradeForm" label-width="auto" class="center">
        <el-form-item label="学院">
          <el-col :span="14">
            <el-select filterable v-model="gradeForm.fid" placeholder="学院" @change="updateDepartments(gradeForm.fid)">
              <el-option
                  v-for="item in faculties"
                  :key="item.fid"
                  :label="item.name"
                  :value="item.fid">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="8">
            <el-button type="primary" @click="showFaculty">修改</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="系">
          <el-col :span="14">
            <el-select filterable v-model="gradeForm.did" placeholder="系"
                       @change="updateSessions(gradeForm.did)">
              <el-option
                  v-for="item in departments"
                  :key="item.did"
                  :label="item.name"
                  :value="item.did">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="8">
            <el-button v-show="gradeForm.fid" type="primary" @click="showDepartment">修改</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="年级">
          <el-col :span="14">
            <el-select filterable v-model="gradeForm.session" placeholder="年级"
                       @change="updateClasses(gradeForm.did,gradeForm.session)">
              <el-option
                  v-for="item in sessions"
                  :key="item.session"
                  :label="item.session"
                  :value="item.session">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="8">
            <el-button v-show="gradeForm.did" type="primary" @click="showSession">修改</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="班级">
          <el-col :span="14">
            <el-select filterable v-model="gradeForm.sid" placeholder="班级">
              <el-option
                  v-for="item in classes"
                  :key="item.sid"
                  :label="item.name"
                  :value="item.sid">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="8">
            <el-button v-show="gradeForm.session" type="primary" @click="showClass">修改</el-button>
          </el-col>

        </el-form-item>
        <el-form-item label="系课程">

          <el-col :span="14">
            <el-select filterable v-model="gradeForm.cid" placeholder="课程">
              <el-option
                  v-for="item in dc"
                  :key="item.cid"
                  :label="item.title"
                  :value="item.cid">
              </el-option>
            </el-select>
          </el-col>

          <el-col :span="2"></el-col>
          <el-col :span="8">
            <el-button v-show="gradeForm.did" type="primary" @click="showDC">修改</el-button>
          </el-col>

        </el-form-item>
        <el-form-item label="全部课程">

          <el-col :span="14">
            <el-select filterable v-model="gradeForm.cid" placeholder="全部课程">
              <el-option
                  v-for="item in courses"
                  :key="item.cid"
                  :label="item.title"
                  :value="item.cid">
              </el-option>
            </el-select>
          </el-col>

          <el-col :span="2"></el-col>
          <el-col :span="8">
            <el-button type="primary" @click="showCourses">修改</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-aside>
    <el-main>
      <el-table
          ref="multipleTableRef"
          :data=List.arr
          table-layout="fixed"
      >
        <el-table-column
            v-for="item in ListName.config"
            :prop="item.prop"
            :label="item.label"
        >
        </el-table-column>
        <el-table-column
            align="center"
        >
          <template #header>
            操作
            <el-button type="success" size="small" @click="clickAdd">添加</el-button>
          </template>
          <template #default="scope">
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
    </el-main>
  </el-container>

  <el-dialog
      title="添加学院"
      v-model="dialog[0]"
  >
    <el-form ref="form" :model="addFacultyForm" label-width="auto">
      <el-form-item label="学院名称">
        <el-input v-model="addFacultyForm.name" placeholder="请输入学院名称"/>
      </el-form-item>
      <el-form-item label="学院代码">
        <el-input v-model="addFacultyForm.code" placeholder="请输入两位学院代码数字（如：05）"/>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="dialog[0] = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <el-dialog
      title="添加系"
      v-model="dialog[1]"
  >
    <el-form ref="form" :model="addDepartmentForm" label-width="auto">
      <el-form-item label="系名称">
        <el-input v-model="addDepartmentForm.name" placeholder="请输入系名"/>
      </el-form-item>
      <el-form-item label="系代码">
        <el-input v-model="addDepartmentForm.code" placeholder="请输入两位系代码数字（如：01）"/>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="dialog[1] = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <el-dialog
      title="添加系年级"
      v-model="dialog[2]"
  >
    <el-form ref="form" :model="addSessionForm" label-width="auto">
      <el-form-item label="系年级">
        <el-input v-model="addSessionForm.session" placeholder="请输入两位系年级数字（如：20）"/>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="dialog[2] = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <el-dialog
      title="添加班级"
      v-model="dialog[3]"
  >
    <el-form ref="form" :model="addClassForm" label-width="auto">
      <el-form-item label="班级名称">
        <el-input v-model="addClassForm.name" placeholder="请输入班级名称（如：计算机科学与技术七班）"/>
      </el-form-item>
      <el-form-item label="班级代码">
        <el-input v-model="addClassForm.scode" placeholder="请输入两位班级数字代码（如：07）"/>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="dialog[3] = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <el-dialog
      title="添加系课程"
      v-model="dialog[4]"
  >
    <el-form ref="form" :model="addDCForm" label-width="auto">
      <el-form-item>
        <el-select v-model="addDCForm.cid" placeholder="请选择课程">
          <el-option
              v-for="item in courses"
              :key="item.cid"
              :label="item.title"
              :value="item.cid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="dialog[4] = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <el-dialog
      title="添加课程"
      v-model="dialog[5]"
  >
    <el-form ref="form" :model="addCourseForm" label-width="auto">
      <el-form-item>
        <el-input v-model="addCourseForm.title" placeholder="请输入课程名"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="dialog[5] = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {defineComponent, reactive} from 'vue'

function student(number, name, sex, birthday, Class, Session) {
  return {
    number: number,
    name: name,
    sex: sex,
    birthday: birthday,
    class: Class,
    session: Session,


  }
}

export default defineComponent({
  data() {
    return {
      number: "",
      List: reactive({arr: []}),
      ListName: reactive({
        config: [
          {
            prop: "name",
            label: "学院名称",
          }
        ]
      }),
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
      dc: [
        {
          cid: 1,
          title: "Java",
        },
        {
          cid: 2,
          title: "数学",
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
        }],

      mode: -1,
      dialog: [false, false, false, false, false, false],
      addFacultyForm: {
        name: "",
        code: "",
      },
      addDepartmentForm: {
        id: "",
        name: "",
        code: "",
      },
      addSessionForm: {
        did: "",
        session: "",
      },
      addClassForm: {
        did: "",
        session: "",
        scode: "",
        name: "",
      },
      addCourseForm: {
        title: "",
      },
      addDCForm: {
        did: "",
        cid: "",
      }
    }
  },
  created() {
    this.faculties = []
    this.departments = []
    this.sessions = []
    this.classes = []
    this.students = []
    this.dc = []
    this.courses = []
    this.gradeForm.sid = ""
    this.gradeForm.cid = ""
    this.gradeForm.grade = ""
    this.gradeForm.did = ""
    this.updateFaculties()
    this.getAllCourses()
  },
  mounted() {
  },
  methods: {
    getAllCourses() {
      this.$axios.get('/education/courses', {
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        this.courses = res.data.data
        console.log(res)
      }).catch(err => {
        if (err.response.status == 401) {
          this.$message.error('登录已过期，请重新登录')
          this.$cookies.remove('LyFiveToken')
          this.$router.push('/login')
        }
      })
    },
    clickAdd() {
      if (this.mode >= 0) {
        console.log("test")
        switch (this.mode) {
          case 1:
            this.addDepartmentForm.id = this.gradeForm.fid
            break;
          case 2:
            this.addSessionForm.did = this.gradeForm.did
            break;
          case 3:
            this.addClassForm.did = this.gradeForm.did
            this.addClassForm.session = this.gradeForm.session
            break;
          case 4:
            this.addDCForm.did = this.gradeForm.did
            break;
        }
        this.dialog[this.mode] = true;
      }

    },
    clearDepartments() {
      this.departments = []
      this.gradeForm.did = ""
    },
    clearSessions(){

    },
    handleDelete(row) {
      // todo
      // 删除索引处
      console.log(row)
      this.List.arr.splice(this.List.arr.indexOf(row), 1)
      switch (this.mode) {
        case 0:
          break;
        case 1:
          this.deleteDepartment(row.did)
          break;
        case 2:
          this.deleteSession(this.gradeForm.did, row.session)
          break;
        case 3:
          this.deleteClass(row.sid)
          break;
        case 4:
          this.deleteDC(this.gradeForm.did, row.cid)
          break;
        case 5:
          this.deleteCourse(row.cid)
          break;
      }
    },
    handleAdd() {
      // todo
      // 将表单信息传上去
      this.dialog[this.mode] = false;
      switch (this.mode) {
        case 0:
          this.addFaculty(this.addFacultyForm.name, this.addFacultyForm.code)
          break;
        case 1:
          this.addDepartment(this.addDepartmentForm.id, this.addDepartmentForm.name, this.addDepartmentForm.code)
          break;
        case 2:
          this.addSession(this.addSessionForm.did, this.addSessionForm.session)
          break;
        case 3:
          this.addClass(this.addClassForm.did, this.addClassForm.session, this.addClassForm.scode, this.addClassForm.name)
          break;
        case 4:
          this.addDC(this.addDCForm.did, this.addDCForm.cid)
          break;
        case 5:
          this.addCourse(this.addCourseForm.title)
          break;
      }
    },

    isCode(str) {
      const num = Number(str)
      if (isNaN(num) || str.length !== 2 || num < 0 || num > 99) {
        return false
      }
      return true
    },

    addFaculty(name, code) {
      if (!this.isCode(code)) {
        this.$message.error("请输入两位数字")
        return
      }
      this.$axios({
        method: "post",
        url: '/education/faculty',
        data: {
          name: name,
          code: code
        },
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("添加成功")
          this.updateFaculties()
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        console.log(err.response)
        if (err.response.status == 401) {
          this.$message.error("权限不足")
        } else {
          this.$message.error('服务错误')
        }
      })
    },
    addDepartment(id, name, code) {
      if (!this.isCode(code)) {
        this.$message.error("请输入两位数字")
        return
      }
      this.$axios({
        method: "post",
        url: '/education/department',
        data: {
          id: id,
          name: name,
          code: code
        },
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("添加成功")
          this.updateDepartments(id)
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        console.log(err.response)
        if (err.response.status == 401) {
          this.$message.error("权限不足")
        } else {
          this.$message.error('服务错误')
        }
      })
    },
    addSession(did, session) {
      if (!this.isCode(session)) {
        this.$message.error("年级只能为两位数字")
        return
      }
      this.$axios({
        method: "post",
        url: '/education/session',
        data: {
          did: did,
          session: session
        },
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("添加成功")
          this.updateSessions(did)
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        console.log(err.response)
        if (err.response.status == 401) {
          this.$message.error("权限不足")
        } else {
          this.$message.error('服务错误')
        }
      })
    },
    addClass(did, session, scode, name) {
      if (!this.isCode(scode)) {
        this.$message.error("请输入两位数字")
        return
      }
      console.log(did, session, scode, name)
      this.$axios({
        method: "post",
        url: '/education/class',
        data: {
          did: did,
          session: session,
          scode: scode,
          name: name
        },
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("添加成功")
          this.updateClasses(did, session)
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        console.log(err.response)
        if (err.response.status == 401) {
          this.$message.error("权限不足")
        } else {
          this.$message.error('服务错误')
        }
      })
    },
    addDC(did, cid) {
      this.clear()
      this.$axios({
        method: "post",
        url: '/education/dc',
        data: {
          did: did,
          cid: cid
        },
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("添加成功")
          this.updateDC(did)
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        console.log(err.response)
        if (err.response.status == 401) {
          this.$message.error("权限不足")
        } else {
          this.$message.error('服务错误')
        }
      })
    },
    addCourse(title) {
      this.$axios({
        method: "post",
        url: '/education/course',
        data: {
          title: title
        },
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("添加成功")
          this.getAllCourses()
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        console.log(err.response)
        if (err.response.status == 401) {
          this.$message.error("权限不足")
        } else {
          this.$message.error('服务错误')
        }
      })
    },

    deleteFaculty(fid) {
      this.$axios({
        method: "delete",
        url: '/education/faculty',
        data: {
          id: fid
        },
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("删除成功")
          this.updateFaculties()

        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        console.log(err.response)
        if (err.response.status == 401) {
          this.$message.error("权限不足")
        } else {
          this.$message.error('服务错误')
        }
      })
    },
    deleteDepartment(did) {
      this.$axios({
        method: "delete",
        url: '/education/department',
        data: {
          id: did
        },
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("删除成功")
          this.updateDepartments(this.gradeForm.fid)
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        console.log(err.response)
        if (err.response.status == 401) {
          this.$message.error("权限不足")
        } else {
          this.$message.error('服务错误')
        }
      })
    },
    deleteSession(did, session) {
      this.$axios({
        method: "delete",
        url: '/education/session',
        data: {
          did: did,
          session: session
        },
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("删除成功")
          this.updateSessions(did)
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        console.log(err.response)
        if (err.response.status == 401) {
          this.$message.error("权限不足")
        } else {
          this.$message.error('服务错误')
        }
      })
    },
    deleteClass(sid) {
      this.$axios({
        method: "delete",
        url: '/education/class',
        data: {
          id: sid
        },
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("删除成功")
          this.updateClasses(this.gradeForm.did, this.gradeForm.session)
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        console.log(err.response)
        if (err.response.status == 401) {
          this.$message.error("权限不足")
        } else {
          this.$message.error('服务错误')
        }
      })
    },
    deleteDC(did, cid) {
      this.$axios({
        method: "delete",
        url: '/education/dc',
        data: {
          did: did,
          cid: cid
        },
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("删除成功")
          this.updateDC(did)
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        console.log(err.response)
        if (err.response.status == 401) {
          this.$message.error("权限不足")
        } else {
          this.$message.error('服务错误')
        }
      })
    },
    deleteCourse(cid) {
      this.$axios({
        method: "delete",
        url: '/education/course',
        data: {
          id: cid
        },
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("删除成功")
          this.getAllCourses()
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        console.log(err.response)
        if (err.response.status == 401) {
          this.$message.error("权限不足")
        } else {
          this.$message.error('服务错误')
        }
      })
    },

    clear() {
      this.List.arr = [];
      this.ListName.config = [];
      this.mode = -1;
    },

    updateFaculties() {
      this.clear()
      this.$axios.get("/mid/faculties", {
        headers: {
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        this.faculties = res.data.data
        // this.clear()
        return true
      }).catch(err => {
        console.log(err.response)
        if (err.response.status == 401) {
          this.$message.error("权限不足")
        } else {
          this.$message.error('服务错误')
        }
        return true
      })
    },
    updateDepartments(fid) {
      // todo
      this.clear();
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
        console.log(res.data.data)
        this.departments = res.data.data
      })
    },
    updateSessions(did) {
      // todo
      this.clear();
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
        this.updateDC(did)
      })
    },
    updateDC(did) {
      // todo

      this.dc = []
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
        this.dc = res.data.data
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
      this.clear();
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
      })
    },

    showFaculty() {
      this.List.arr = this.faculties
      this.ListName.config = [{
        prop: "name",
        label: "学院名称"
      }]
      this.mode = 0;
    },
    showDepartment() {
      this.List.arr = this.departments
      this.ListName.config = [
        {
          prop: "name",
          label: "系名"
        }
      ]
      this.mode = 1;
    },
    showSession() {
      let showSession = []
      for (let i = 0; i < this.sessions.length; i++) {
        showSession.push({session: this.sessions[i]})
      }
      console.log(showSession)
      this.List.arr = this.sessions;
      this.ListName.config =
          [
            {
              prop: "session",
              label: "年级"
            }
          ]
      this.mode = 2;
    },
    showClass() {
      this.List.arr = this.classes
      this.ListName.config = [
        {
          prop: "name",
          label: "班级名称"
        }
      ]
      this.mode = 3;
    },
    showDC() {
      this.List.arr = this.dc
      this.ListName.config = [
        {
          prop: "title",
          label: "课程标题"
        }
      ]
      this.mode = 4;
    },
    showCourses() {
      this.List.arr = this.courses
      this.ListName.config = [
        {
          prop: "title",
          label: "课程标题"
        }
      ]
      this.mode = 5;
    },

    get(data) {
      return new Promise(function (resolve, reject) {
        if (data) {
          resolve(data)
        } else {
          reject(new Error("data is null"))
        }
      })
    }
  }
})
</script>

<style lang='stylus' scoped></style>
