<template>
  <el-upload
      ref="uploadRef"
      action="/user/upload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
  >
    <el-icon>
      <Plus/>
    </el-icon>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <h4>头像预览</h4>
    <el-image :src="dialogImageUrl" style="width: 200px;height: 200px;" alt="Preview Image"/>
    <template #footer>
      <el-button type="primary" @click="submit">提交修改</el-button>
    </template>
  </el-dialog>

</template>

<script>
import {Plus} from '@element-plus/icons-vue'

export default {
  components: {
    Plus
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      uploadFile: '',
      fileList:
          [
            {
              name: '47f9f39376e7a419bef260e6749cb121.jpg',
              url: 'http://127.0.0.1:8080/static/img/47f9f39376e7a419bef260e6749cb121.jpg',
            },
            {
              name: '30616305ef290e389d9019a0683a8046.jpg',
              url: 'http://127.0.0.1:8080/static/img/30616305ef290e389d9019a0683a8046.jpg',
            }
          ],
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.uploadFile = file
      this.dialogVisible = true
    },
    submit() {
      const formData = new FormData()
      if (this.uploadFile.raw != null) {
        formData.append('img', this.uploadFile.raw)
      } else {
        console.log(this.uploadFile.url)
        const re = /\/static\/img.*/
        formData.append('url', re.exec(this.uploadFile.url)[0])
      }
      formData.append('id', this.$cookies.get('LyFive').id)
      this.$axios({
        method: 'post',
        url: '/user/upload',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          "token": this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        this.$message.success('上传成功')
        this.$store.commit('setAvatar', res.data["url"])
        console.log(res.data)
        this.dialogVisible = false
      })
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
</style>