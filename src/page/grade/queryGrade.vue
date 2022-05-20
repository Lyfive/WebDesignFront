<template>
  <el-container>
    <el-header>
      <el-form :inline="true" :model="formFind" class="demo-form-inline">
        <el-form-item label="信息输入：">
          <el-input v-model="formFind.message" placeholder="请输入待检索信息"/>
        </el-form-item>
        <el-form-item label="检索方式">
          <el-select v-model="formFind.model" placeholder="检索选择">
            <el-option label="学号检索" value="1"/>
            <el-option label="姓名检索" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onFindSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-container>
      <el-aside width="400px">
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
              width="120"
          >
            <template #default="scope">
              <el-button type="success" @click="showGrade(scope.$index)">成绩展示</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-aside>
      <el-main>
        <div id="display-area" style="width: 450px;height: 450px">
        </div>
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
      },
      colors: [
        '#FF9900',
        '#99CC00',
        '#0099CC',
        '#FF3300',
        '#FFCC00',
        '#0066CC',
        '#CC0066',
      ],
      option: {
        title: {
          text: '示例'
        },
        tooltip: {},
        legend: {
          data: ['成绩']
        },
        xAxis: {
          data: ['Java', '数学', '英语', '体育']
        },
        yAxis: {},
        series: [
          {
            name: '成绩',
            type: 'bar',
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
  },
  methods: {
    showGrade(index) {
      let showData = this.gradesData[index];
      this.option["title"]["text"] = showData.name + "的成绩";
      this.option["xAxis"]["data"] = showData.grades.map(item => item.title);
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
      console.log(this.formFind)
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
</style>
