<template>
  <div class = "hls-container">
    <div class="live-container"><span class="live-label">LIVE CHAT</span><a :href="livechatUrl" class="join-label">JOIN</a></div>
    <vplayer :playerOptions="vOption" @onpause="pause" @onseeking="onseeking" @onseeked="onseeked" />
  </div>
</template>

<script>
import { vplayer } from "vue-hls-player";
export default {
  components: { vplayer },
  name: "HLSPlayer",
  props: {
    streamUrl: String,
    livechatUrl: String,
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      vOption: {
        type: "application/x-mpegURL", //媒体类型，m3u8请给application/x-mpegURL或者application/vnd.apple.mpegURL，其他的会默认为普通音视频，注：微信不支持m3u8
        src: this.streamUrl, //视频地址
        preload: true, //是否预下载，默认为true
        autoplay: false,
        isLoop: false, //是否循环，默认不循环
        controls: "progress,current,durration", //显示的控件,volume只有视频有，没有配置controls项则全部显示。progress:进度条；current:已播放时长；durration：音视频长度；volume：音量
        crossOrigin: false, //设置视频的 CORS 设置。
      },
    };
  },

  methods: {
    pause(e) {
      console.log(e);
    },
    onseeking(e) {
      console.log(e);
    },
    onseeked(e) {
      console.log(e);
    },
  },
};
</script>
<style>
.live-container {
  width: 100%;
    background: #38be8d;
    height: 38px;
}
.live-label {
  background: red;
    font-size: 1rem;
    color: white;
    padding: 4px 5px;
    font-weight: bold;
    display: inline-block;
    float:left;
    margin-top: 8px;
    margin-left: 5px;
    border-radius: 4px;
}
.join-label{
  background: none;
  border: 1px solid;
    font-size: 1.1rem;
    color: white;
    padding: 4px 10px;
    font-weight: bold;
    display: inline-block;
    float: right;
    margin-top: 6px;
    margin-right: 7px;
    border-radius: 4px;
}
.hls-container{
}
.vplayer video{
  max-height: 100vw;
    background: black;
    object-fit: cover;
    object-position: 50% 50%;
}
.player__controls--durration, .player__controls--progress, .player__controls--current{
  display: none;
}
</style>