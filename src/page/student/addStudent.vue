<template>
  <el-form ref="form" :model="studentForm" label-width="80px">
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

</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  data() {
    return {
      studentForm: {
        number: '',
        name: '',
        sex: '',
        birthday: '',
      }
    }
  },
  setup() {
    // todo
    return {}
  },

})
</script>

<style lang='stylus' scoped></style>
