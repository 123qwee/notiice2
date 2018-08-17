<template>
  <el-dialog class="nitoce-gallery" :title="title" :visible.sync="visible" size="full">
    <el-carousel :initial-index="index" indicator-position="outside" :height="height">
      <el-carousel-item v-for="(item,index) in imageUrls" :key="index">
        <div class="carousel-img-wrap" :style="{lineHeight:height}">
          <img :src="item" alt="">
        </div>
      </el-carousel-item>
    </el-carousel>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      height: 0,        // 当前走马灯组件默认高度
      title: "",        // 当前弹出组件标题
      visible: false,   // 当前弹出组件是否可见
      imageUrls: [],    // 当前走马灯加载图片列表
      index: 0          // 当前走马灯组件默认展示索引页
    }
  },
  mounted() {
    this.$bus.$on('triScreenResize', (value) => {
      this.height = (document.body.clientHeight - 110) + 'px'
    });

    // 计算图片展示高度
    this.height = (document.body.clientHeight - 110) + 'px'
  }
}
</script>

<style>
.carousel-img-wrap {
  height: 100%;
  text-align: center;
  cursor: pointer;
}

.carousel-img-wrap img{
  height: 100%;
}

.nitoce-gallery .el-dialog--full{
  border-radius: 0;
}

.nitoce-gallery .el-dialog__header{
  background-image: none;
}
</style>
