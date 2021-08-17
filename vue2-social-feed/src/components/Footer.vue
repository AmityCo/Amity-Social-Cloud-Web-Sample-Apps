<template>
  <div class="footer">
    <div class="footer-item-1" @mousedown="onMenuClicked('home')">
      <HomeIcon :active="activeTab == 'home'" />
    </div>
    <UploadButton class="footer-item-3" @success="onupload">
      <CameraIcon />
    </UploadButton>
    <div class="footer-item-5" @mousedown="onMenuClicked('me')">
      <Avatar :active="activeTab == 'me'" :id="user.avatarFileId" />
    </div>
  </div>
</template>


<script>
import UploadButton from "@/components/UploadButton";
import HomeIcon from "@/components/icons/HomeIcon";
import CameraIcon from "@/components/icons/CameraIcon";
import Avatar from "@/components/Avatar";
import ThemeManager from "@/components/ThemeManager";

const TAB_LINKS = {
  home: "/posts",
  me: "/me",
};

export default {
  components: {
    UploadButton,
    HomeIcon,
    Avatar,
    CameraIcon,
    ThemeManager,
  },
  computed: {
    user: ({ $store }) => $store.state.user,
  },
  data: () => ({
    activeTab: "home",
  }),
  methods: {
    onupload(files) {
      const str = JSON.stringify(files);
      const b64 = btoa(str);

      this.$router.push({
        path: "/create",
        query: { data: b64 },
      });
    },
    onMenuClicked(tabName) {
      this.$router.push({ path: TAB_LINKS[tabName] });
      // this.refreshActiveTab();
    },
    refreshActiveTab() {
      const path = location.hash.substring(1);
          console.log("path "+path);
      for (let tabName in TAB_LINKS) {
        if (TAB_LINKS[tabName] == path) {
          console.log("Setting active tab as "+tabName);
          this.activeTab = tabName;
        }
      }
    },
  },
  watch: {
    $route: function () {
      console.log("ROUTE CHANGED");
      this.refreshActiveTab();
    },
  },
};
</script>

<style lang="stylus" scoped>
.footer 
  padding-bottom: env(safe-area-inset-bottom);
  position: fixed;
  bottom: 0;
  width: 100%;
  height: calc(3.8rem + env(safe-area-inset-bottom));
  background: var(--schemeColor)
  display: grid;
  border-top: 1px solid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-areas: 'btn1 btn2 btn3 btn4 btn5';
  border-color var(--themeColor) !important
  div 
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
    -webkit-touch-callout: none !important;
    &>*
      fill var(--textColor) !important

  .footer-item-1 {
    grid-area: btn1;
  }

  .footer-item-2 {
    grid-area: btn2;
  }

  .footer-item-3 {
    grid-area: btn3;
  }

  .footer-item-4 {
    grid-area: btn4;
  }

  .footer-item-5 {
    grid-area: btn5;
  }


@media all and (display-mode: standalone) {
  .footer {
    padding-bottom: 65px;
  }
}
</style>