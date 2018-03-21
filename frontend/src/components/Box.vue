<template>
  <div class="box" style="style" :style="outline">
    <img src="../assets/add.png" alt="" v-if="this.info === null" @click="focus" />
    <div class="container" v-else>
      <div class="title">
        <div class="name">
          {{info.name}}
        </div>
        <div class="code">
          {{info.code}}
        </div>
        <div class="wics">
          {{info.wics}}
        </div>
        <div class="volume">
          {{info.volume}}
        </div>
      </div>
      <div class="content">
        <div class="per">
          PER : {{info.per}}
        </div>
        <div class="per_job">
          업종PER : {{info.per_job}}
        </div>
        <div class="consensus">
          <img src="../assets/con_1.png" v-if="parseInt(info.consensus) === 1">
          <img src="../assets/con_2.png" v-else-if="parseInt(info.consensus) === 2">
          <img src="../assets/con_3.png" v-else-if="parseInt(info.consensus) === 3">
          <img src="../assets/con_4.png" v-else-if="parseInt(info.consensus) === 4">
          <img src="../assets/con_5.png" v-else-if="parseInt(info.consensus) === 5">
        </div>
        <br>
        <div class="chart-container" style="">
          <canvas :id="'chart' + index"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Box',
  data () {
    return {
      isLoaded: false,
      myChart: null
    }
  },
  props: {
    index: Number,
    info: Object
  },
  methods: {
    focus: function () {
      if (this.info === null) {
        this.$emit('focused', this.index)
      }
    }
  },
  computed: {
    outline: function () {
      if (this.info === null) {
        return 'border: 1rem #DEDEDE dashed'
      } else {
        return 'border: 1rem #555 solid'
      }
    },
    circleStyle: function () {
      console.log({
        width: parseInt(this.info.assets[7].replace(',', '')) / 10000 + 'px',
        height: parseInt(this.info.assets[7].replace(',', '')) / 10000 + 'px'
      })
      return {
        width: parseInt(this.info.assets[7].replace(',', '')) / 10000 + 'px',
        height: parseInt(this.info.assets[7].replace(',', '')) / 10000 + 'px'
      }
    }
  },
  updated: function () {
    var canvas = document.getElementById('chart' + this.index)
    var ctx = canvas.getContext('2d')
    if (this.myChart !== null) {
      this.myChart.destroy()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    this.$chart.defaults.global.legend.display = false
    // this.$chart.defaults.global.tooltips.enabled = false
    this.myChart = new this.$chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['외인지분율(%)', '그 외'],
        datasets: [{
          data: [parseFloat(this.info.foreigner_percentage), 100 - parseFloat(this.info.foreigner_percentage)],
          backgroundColor: [
            ['rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'][this.index],
            'rgba(0, 0, 0, 0)'
          ],
          borderWidth: 0
        }]
      }
    })
  }
}
</script>
<style scoped>
  * {
    font-family: "Nanum Gothic", sans-serif;
  }
  .box {
    min-height: 50%;
    margin: .05rem;
    background-color: white;
    border-radius: 1rem;
    display: inline-block;
  }
  .box > img {
    position: relative;
    height: 30%;
    left: 40%;
    top: 34%;
  }
  .box input {
    position:relative;
    height: 20%;
    width: 60%;
    left: 20%;
    top: 39%;
  }
  .container {
    width:100%;
    height:100%;
  }
  .title {
    margin-left: .5rem;
    padding: .5rem 1rem .5rem .25rem;
    width: 90%;
    font-size: 1.5rem;
    border-bottom: 1px solid #CCC;
    overflow: hidden;
  }
  .content {
    margin-left: .5rem;
    padding: 0rem 1rem .5rem .25rem;
  }
  .name {
    color: #555;
    margin-right: .25rem;
    font-size: 1.5rem;
    font-weight: bold;
    display: inline;
  }
  .code {
    color: #5E5E5E;
    margin-right: .25rem;
    font-size: 1rem;
    display: inline;
  }
  .wics {
    color: #BEBEBE;
    font-size: 1rem;
    display: inline;
  }
  .volume {
    float:right;
  }
  .per {
    font-weight: bold;
    color: #5E5E5E;
    padding: 0;
    margin: 0;
    padding-right: .25rem;
    font-size: .75rem;
    display: inline;
    border-right: 1px solid #CCC;
  }
  .per_job {
    font-weight: bold;
    color: #5E5E5E;
    padding: 0;
    margin: 0;
    padding-left: .7rem;
    padding-right: .25rem;
    font-size: .75rem;
    display: inline;
    border-right: 1px solid #CCC;
  }
  .consensus {
    padding: 0;
    margin: 0;
    padding-left: .7rem;
    padding-right: .25rem;
    display: inline;
  }
  .consensus > img {
    height: 100%;
    position: relative;
    top:.5rem;
  }
  .chart-container {
    margin: 0;
    margin-top: 10%;
    height: 80%;
    width: 50%;
    display: inline-block;
  }
  .chart-text {
    display: inline;
    position: relative;
    text-align: center;
    left: 42%;
    top: 9.75vh;
    font-stretch: expanded;
  }
  .sticker {
    display:inline-block;
  }
</style>
