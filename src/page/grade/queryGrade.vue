<template>
  <el-container style="height: 100%">
    <el-header height="75px">
      <el-row justify="center" style="height: 100%;">
        <el-col :span="24">
          <el-form :inline="true" :model="formFind" class="center" style="width: 100%;">
            <el-form-item label="信息输入：">
              <el-input v-model="formFind.message" placeholder="请输入待检索信息"/>
            </el-form-item>
            <el-form-item label="检索方式">
              <el-select v-model="formFind.model" placeholder="检索选择">
                <el-option label="学号检索" value="1"/>
                <el-option label="姓名检索" value="2"/>
                <el-option label="姓名检索(模糊查询)" value="3"/>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onFindSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-header>
    <el-container style="height: 90%">
      <el-aside width="50%" height="100%">
        <el-table
            :data=gradesData
            style="width: 100%"
        >
          <el-table-column
              prop="number"
              label="学号"
              width="120">
          </el-table-column>
          <el-table-column
              prop="name"
              label="姓名"
          >
          </el-table-column>
          <el-table-column
              align="center"
              label="操作"
              width="240"
          >
            <template #default="scope">
              <el-button type="success" @click="showGrade(scope.$index)">成绩展示</el-button>
              <el-button type="primary" @click="download(scope.$index)">成绩导出</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-aside>
      <el-main>
        <el-row style="height: 100%;width: 100%">
          <el-col id="display-area" style="width: 100%;height:100%"></el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import {defineComponent} from 'vue';
// 引入echarts
import * as echarts from 'echarts'

function grade(number, name, grades) {
  return {
    number: number,
    name: name,
    grades: grades
  }
}


export default defineComponent({
  setup() {
    // todo
    return {}
  },
  data() {
    return {
      gradesData: [
        {
          "number": "2005010702",
          "name": "李1",
          "grades": [
            {
              "title": "体育",
              "mark": 90
            },
            {
              "title": "英语",
              "mark": 90
            },
            {
              "title": "Java",
              "mark": 90
            },
            {
              "title": "数学",
              "mark": 90
            }
          ]
        },
        {
          "number": "2005010701",
          "name": "李映飞",
          "grades": [
            {
              "title": "Java",
              "mark": 94
            },
            {
              "title": "数学",
              "mark": 93
            },
            {
              "title": "英语",
              "mark": 70
            },
            {
              "title": "体育",
              "mark": 80
            }
          ]
        }],
      formFind: {
        message: "",
        model: "",
        open: "No",
      },
      option: {
        title: {
          text: '示例'
        },
        tooltip: {},
        legend: {
          data: ['成绩']
        },
        yAxis: {
          data: ['Java', '数学', '英语', '体育']
        },
        xAxis: {
          position: 'top'
        },
        series: [
          {
            name: '成绩',
            type: 'bar',
            seriesLayoutBy: 'column',
            data: [90, 90, 90, 80],
            itemStyle: {
              color: () => {
                return this.Color()
              }
            }
          }
        ]
      },
    }
  },
  mounted() {
    // 初始化gradesData
    this.$axios({
      methods: 'get',
      url: '/grade/find',
      params: {
        number: '%'
      },
      headers: {
        'token': this.$cookies.get('LyFiveToken')
      }
    })
        .then(res => {
          console.log(res)
          if (res.data.code === 200) {
            this.gradesData = res.data.gradesData;
          } else {
            this.gradesData = [];
          }
        })
        .catch(err => {
          if (err.response.status == 401) {
            this.$message.error('登录已过期，请重新登录');
            this.$cookies.remove('LyFiveToken');
            this.$router.push('/login');
          }
          this.gradesData = [];
        })
  },
  methods: {
    download(index) {
      this.$axios({
        method: 'get',
        url: '/grade/create',
        params: {
          number: this.gradesData[index].number,
        },
        responseType: 'blob',
        headers: {
          'token': this.$cookies.get('LyFiveToken')
        }
      }).then(res => {
        console.log(res)
        let blob = new Blob([res.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = '成绩.xlsx'
        link.target = '_blank'
        link.click()
        window.URL.revokeObjectURL(link.href)
      }).catch(err => {
        if (err.response.data.code == 401) {
          this.$message.error('登录已过期，请重新登录');
          this.$cookies.remove('LyFiveToken');
          this.$router.push('/login');
        } else {
          this.$message.error("下载失败")
        }
      })
    },
    showGrade(index) {
      let showData = this.gradesData[index];
      this.option["title"]["text"] = showData.name + "的成绩";
      this.option["yAxis"]["data"] = showData.grades.map(item => item.title);
      this.option["series"][0]["data"] = showData.grades.map(item => item.mark);
      const myChart = echarts.init(document.getElementById('display-area'));
      // 指定图表的配置项和数据
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option);
    },
    onFindSubmit() {
      // todo
      // 根据model和message查询
      // model为1学号查询，model为2姓名查询
      if (this.formFind.model === "1") {
        this.$axios({
          methods: 'get',
          url: '/grade/find',
          params: {
            number: this.formFind.message
          },
          headers: {
            'token': this.$cookies.get('LyFiveToken')
          }
        })
            .then(res => {
              console.log(res)
              if (res.data.code === 200) {
                this.gradesData = res.data.gradesData;
              } else {
                this.gradesData = [];
              }
            })
            .catch(err => {
              if (err.response.data.code == 401) {
                this.$message.error('登录已过期，请重新登录');
                this.$cookies.remove('LyFiveToken');
                this.$router.push('/login');
              } else {
                this.$message.error("查询失败")
              }
              this.gradesData = [];
            })
      } else if (this.formFind.model === "2" || this.formFind.model === "3") {
        if (this.formFind.model === "3") {
          this.formFind.open = "Yes"
        } else {
          this.formFind.open = "No"
        }
        this.$axios({
          methods: 'get',
          url: '/grade/query',
          params: {
            name: this.formFind.message,
            open: this.formFind.open
          },
          headers: {
            'token': this.$cookies.get('LyFiveToken')
          }
        })
            .then(res => {
              if (res.data.code == 200) {
                this.gradesData = res.data.gradesData;
              } else {
                this.$message.error(res.data["msg"])
                this.gradesData = [];
              }
            })
            .catch(err => {
              if (err.response.data.code == 401) {
                this.$message.error('登录已过期，请重新登录');
                this.$cookies.remove('LyFiveToken');
                this.$router.push('/login');
              } else {
                this.$message.error("查询失败")
              }
              this.gradesData = [];
            })
      }
    },
    //颜色对象
    Color() {
      this.r = Math.floor(Math.random() * 255);
      this.g = Math.floor(Math.random() * 255);
      this.b = Math.floor(Math.random() * 255);
      return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',1)';
    }
  }
})
</script>

<style scoped>

.data-progress .el-progress--line {
  margin-bottom: 15px;
  width: 450px;
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
