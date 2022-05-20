<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6"></el-col>
      <el-col :span="6">
        <el-input v-model="number" placeholder="请输入学号"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary">查询</el-button>
      </el-col>
      <el-col :span="5">
        <el-dialog
            title="请输入学生信息"
            v-model="dialogAdd"
            width="30%"
        >
          <el-form ref="addForm" :model="studentForm" label-width="80px">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="studentForm.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-input v-model="studentForm.sex" placeholder="请输入性别"></el-input>
            </el-form-item>
            <el-form-item label="出生日期" prop="birthday">
              <el-date-picker
                  v-model="studentForm.birthday"
                  type="date"
                  placeholder="选择出生日期"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
              />
            </el-form-item>
            <el-form-item label="班级" prop="class">
              <el-input v-model="studentForm.class" placeholder="请输入班级"></el-input>
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
        <el-button type="primary" @click="addStudent()">添加学生</el-button>
      </el-col>
      <el-col :span="2">
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
      style="width: 100%">
    <el-table-column
        prop="number"
        label="学号"
        align="center"
        width="180">
    </el-table-column>
    <el-table-column
        prop="name"
        label="姓名"
        align="center"
        width="120">
    </el-table-column>
    <el-table-column
        prop="sex"
        label="性别"
        align="center"
        width="90">
    </el-table-column>
    <el-table-column
        prop="birthday"
        label="生日"
        align="center"
        width="180">
    </el-table-column>
    <el-table-column
        prop="class"
        label="班级"
        align="center"
        width="240">
    </el-table-column>
    <el-table-column
        label="操作"
        align="center"
        width="150"
    >
      <template #default="scope">
        <el-button
            type="primary"
            size="small"
            @click="handleEdit(scope.$index)">
          编辑
        </el-button>
        <el-dialog
            title="请输入修改学生信息"
            v-model="dialogModify"
            width="30%"
        >
          <el-form ref="form" :model="studentForm" label-width="80px">
            <el-form-item label="学号" prop="number">
              <el-input v-model="studentForm.number" placeholder="请输入学号" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="studentForm.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-input v-model="studentForm.sex" placeholder="请输入性别"></el-input>
            </el-form-item>
            <el-form-item label="出生日期" prop="birthday">
              <el-date-picker
                  v-model="studentForm.birthday"
                  type="date"
                  placeholder="选择出生日期"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
              />
            </el-form-item>
            <el-form-item label="班级" prop="class">
              <el-input v-model="studentForm.class" placeholder="请输入班级"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogModify = false">取 消</el-button>
            <el-button type="primary" @click="handleSubmit(scope.$index)">确 定</el-button>
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

function student(number, name, sex, birthday, Class) {
  return {
    number: number,
    name: name,
    sex: sex,
    birthday: birthday,
    class: Class,
  }
}

export default defineComponent({
  data() {
    return {
      number: "",
      studentList: [student('2005010705', '李映飞', '男', '2002-11-15', '20计算机科学与技术七班'), student("2005010704", "LyFive", "男", "2002-11-15", "20计算机科学与技术七班")],
      dialogModify: false,
      dialogAdd: false,
      showDelete: false,
      done: false,
      studentForm: student(),
    }
  },
  setup() {
    // todo
    return {}
  },
  methods: {
    handleEdit(index) {
      // todo
      console.log(index)
      this.dialogModify = true
      let stu = this.studentList[index]
      this.studentForm = student(stu.number, stu.name, stu.sex, stu.birthday, stu.class)
    },
    handleSubmit(index) {
      // todo
      this.studentList[index] = this.studentForm
      this.dialogModify = false
    },
    handleDelete(index) {
      // todo
    },
    handleDeleteChecked() { // 删除选中的行
      // todo
      let numbers = []
      for (let i = 0; i < this.$refs.multipleTableRef.getSelectionRows().length; i++) {
        numbers.push(this.$refs.multipleTableRef.getSelectionRows()[i].number)
      }
      console.log(numbers)
    },
    handleAdd() {
      // todo
      // 将表单信息传上去
      this.dialogAdd = false
    },
    isShow() {
      // todo
      console.log(this.$refs.multipleTableRef.getSelectionRows().length)
      this.$refs.multipleTableRef.getSelectionRows().length === 0 ? this.showDelete = false : this.showDelete = true
    },
    addStudent() {
      // todo
      this.dialogAdd = true
      this.studentForm = student()
    },
  },
})
</script>

<style lang='stylus' scoped></style>
