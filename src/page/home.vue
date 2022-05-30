<template>
  <el-row :gutter="0" style="height: 100%;">
    <el-col :span="12" id="population">
    </el-col>
    <el-col :span="12">
      <el-card
          class="box-card"
          style="align-items: center;text-align: center;"
          shadow="hover"
      >
        <template #header>
          <div class="card-header" style="text-align: center">
            <el-image :src="system.head" fit="cover" style="width: 140px;height: 140px;"/>
          </div>
        </template>
        <el-descriptions title="系统描述" column="1" border>
          <el-descriptions-item label="用户权限" align="center">
            {{ system.level }}
          </el-descriptions-item>
          <el-descriptions-item label="用户名" align="center">
            {{ system.username }}
          </el-descriptions-item>
          <el-descriptions-item label="系统访问次数" align="center">
            {{ system.visitsNumber }}
          </el-descriptions-item>
          <el-descriptions-item label="系统运行时间" align="center">
            {{ runTime }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import {defineComponent} from 'vue'
import * as echarts from 'echarts'

export default defineComponent({
  data() {
    return {
      option: {
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['学院数量', '系数量', '班级数量', '课程数量', '学生数量', '成绩数量'],
        },
        tooltip: {},
        title: {
          text: '系统收录信息',
          left: 'center',
          top: 'center',
        },
        series:
            [
              {
                type: 'pie',
                radius: ["40%", "70%"],
                data: [0, 0, 0, 0, 0, 0],
              }
            ]
      },
      system: {
        head: 'https://github.githubassets.com/apple-touch-icon-144x144.png',
        level: "系统管理员",
        username: 'lzj',
        createTime: '2019-12-12:12:12:12',
        version: '1.0.0',
        visitsNumber: 100,
        population: {
          facultyNumber: 2,
          departmentNumber: 6,
          classNumber: 10,
          courseNumber: 10,
          studentNumber: 100,
          gradeNumber: 500,
        },
      },
      date: '2019-12-12:12:12:12',
      runTime: '',
    }
  },
  mounted() {
    this.system = this.$cookies.get('LyFive')
    this.showPopulation()
    this.date = (Date.now() - Date.parse(this.system.createTime)) / 1000;
    setInterval(() => {
      this.date++
      let days = Math.floor(this.date / (24 * 3600));
      //计算出小时数
      let leave1 = this.date % (24 * 3600)   //计算天数后剩余的毫秒数
      let hours = Math.floor(leave1 / 3600);
      if (hours < 10) {
        hours = '0' + hours
      }
      //计算相差分钟数
      let leave2 = leave1 % 3600;        //计算小时数后剩余的毫秒数
      let minutes = Math.floor(leave2 / 60);
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      //计算相差秒数
      let seconds = Math.round(leave2 % 60);
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      this.runTime = days + "天" + hours + "时" + minutes + "分" + seconds + "秒"
    }, 1000)

    const myChart = echarts.init(document.getElementById('population'));
    window.onresize = function () {
      myChart.resize();
    };
  },
  created() {
    // console.log(this.$cookies.get('LyFive'))
    // console.log(this.$cookies.get('LyFiveToken'))

  },
  methods: {
    showPopulation() {
      // todo
      this.option.series[0].data = [
        {value: this.system.population.facultyNumber, name: "学院数量"},
        {value: this.system.population.departmentNumber, name: "系数量"},
        {value: this.system.population.classNumber, name: "班级数量"},
        {value: this.system.population.courseNumber, name: "课程数量"},
        {value: this.system.population.studentNumber, name: "学生数量"},
        {value: this.system.population.gradeNumber, name: "成绩数量"},
      ]
      echarts.init(document.getElementById('population')).setOption(this.option)
    },

  },
})
</script>

<style scoped>
#main-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

#main-box span {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  height: 100%;
  width: 100%;
}

</style>
    