<template>
  <div>
    <!--  -->
    <div class="search-bar">
      <van-row gutter="5">
        <van-col span="3"><img
            :src="locationIcon"
            width="80%"
            class="location-icon"
          /></van-col>
        <van-col span="16">
          <input
            type="text"
            class="search-input"
          />
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!--  -->
    <div class="swiper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item
          v-for="(banner,index) in bannerPicArray"
          :key="index"
        >
          <img
            v-lazy="banner.imageUrl"
            width="100%"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 横向图标 -->
    <div class="type-bar">
      <van-loading
        type="spinner"
        v-show="loadingShow"
        color="white"
      />
      <div
        v-for="(cate,index) in category"
        :key="index"
      >
        <img
          v-lazy="cate.image"
          width="90%"
        />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!-- 广告 -->
    <div class="ad-banner">
      <img
        v-lazy="adBanner.PICTURE_ADDRESS"
        width="100%"
      >
    </div>
    <!-- 循环 -->
    <!-- 商品推荐 -->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide
            v-for=" (item ,index) in recommendGoods"
            :key="index"
          >
            <div class="recommend-item">
              <img
                :src="item.image"
                width="80%"
              />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}} (￥{{item.mallPrice|moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

        <!-- 不规则的布局 -->
    <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
    <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
    <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>
 <!-- 热卖商品 -->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-row gutter="0">
          <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
            <goods-info :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>

</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import axios from 'axios'
import url from '@/serviceAPI.config'
import { toMoney } from '@/filter/moneyFilter.js'
import goodsInfo from '../component/goodsInfoComponent'
import 'swiper/dist/css/swiper.css'
import floorComponent from './../component/floorComponent'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfo
  },
    filters: {
    //moneyFilter自己写一个方法
    moneyFilter(money) {
      return toMoney(money)
    }
  },
  data() {
    //这里存放数据
    return {
      locationIcon: require('&/images/location.png'), //图标
      loadingShow: false,
      bannerPicArray: [ //轮播图
        { imageUrl: require('&/images/banner1.jpg') },
        { imageUrl: require('&/images/banner2.jpg') },
        { imageUrl: require('&/images/banner3.jpg') },
        { imageUrl: require('&/images/banner4.jpg') },
      ],
      category: [],
      adBanner: '',       //广告图片、
      recommendGoods: [],
      swiperOption: {
        loop: true, //无线循环 滚动
        slidesPerView: 3, //页面视觉呈现多少个
        // direction: 'vertical', //设置竖排显示
        // slidesPerView: 'auto', // 设置同屏显示的数量，默认为1，这里使用auto是随意的意思。
        // freeMode: true, //普通模式：slide滑动时只滑动一格，并自动贴合wrapper，设置为true则变为free模式，slide会根据惯性滑动可能不止一格且不会贴合。
        // mousewheel: true, //开启鼠标滚轮控制Swiper切换。可设置鼠标选项，或true使用默认值。
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
       hotGoods: [] //热卖商品
    }
  },
  //监听属性 类似于data概念
  computed: {

  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.loadingShow = true,
      axios({
        url: url.getShoppingMallInfo,
        method: 'get',
      }).then(response => {
        this.category = response.data.data.category;
        this.adBanner = response.data.data.advertesPicture //获得广告图片
        this.recommendGoods = response.data.data.recommend
        this.floor1 = response.data.data.floor1//楼层1数据
        this.floor2 = response.data.data.floor2//楼层2数据
        this.floor3 = response.data.data.floor3//楼层3数据
        this.floorName = response.data.data.floorName
         this.hotGoods = response.data.data.hotGoods           //热卖商品
        this.loadingShow = false;
      }).catch((error) => {
        this.loadingShow = false
      })
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style>
.search-bar {
  height: 2.2rem;
  overflow: hidden;
  background-color: #e5017d;
  line-height: 2.2rem;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid 1px !important ;
  background-color: #e5017d;
  color: #fff;
}
.location-icon {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}

/** 清楚浮动 **/
.swiper-area {
  width: 20rem;
  clear: both;
}
/* css3 横向布局 */
.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex; /*采用flex布局*/
  flex-direction: row; /* 以行进行排列 */
  flex-wrap: nowrap; /* 不换行*/
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
  flex: 1; /*平等分布*/
}

/* 商品推荐 */
.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}

.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}

.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
.hot-goods {
  padding-bottom: 60px;
}
</style>
