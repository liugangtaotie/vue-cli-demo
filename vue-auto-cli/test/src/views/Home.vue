<template>
  <div>
    <div class="home-model">
      <van-notice-bar
        text="Technology is the common soul of the people who developed it."
        left-icon="volume-o"
      />

      <!--swipe 轮播图-->
      <van-swipe class="my-swipe mt10" :autoplay="3000" indicator-color="white">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
    </div>

    <van-grid class="flex flex_around" :gutter="10" :column-num="3">
      <van-grid-item icon="photo-o" text="文字" @click="gotoSubOne" />
      <van-grid-item icon="photo-o" text="文字" @click="gotoSubReact" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>

    <van-grid class="mt10" :gutter="10">
      <van-grid-item v-for="value in 4" :key="value" icon="photo-o" text="Text" />
    </van-grid>

    <van-divider />

    <div class="flex flex_center single">
      store的count数据 <span class="ml20 f30 t2">{{ num }}</span>
    </div>

    <div class="flex flex_center">
      <van-button class="flex mt10" type="primary" @click="onClickAdd">add +</van-button>
      <van-button style="margin-left: 10px" class="flex mt10" type="primary" @click="onClickSub"
        >dec -</van-button
      >
    </div>
    <Footer :content="0" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "@COM/Footer.vue";

@Component({
  name: "Home",
  components: { Footer },
})
export default class Home extends Vue {
  [x: string]: any;
  private user = "";
  private num = 0;

  mounted() {}

  // 跳转sub-first
  gotoSubOne() {
    history.pushState(null, "sub-first", "/sub-first");
  }

  gotoSubReact() {
    history.pushState(null, "sub-react", "/sub-react");
  }

  // +1
  onClickAdd() {
    ++this.num;
  }

  // -1
  onClickSub() {
    --this.num;
  }
}
</script>

<style lang="less" scoped>
.home-model {
  width: 100%;
  padding: 10px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #2abc6d;
}
</style>
