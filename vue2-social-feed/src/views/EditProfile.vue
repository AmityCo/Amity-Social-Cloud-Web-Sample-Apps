<template>
  <MainLayout class="edit-profile" title="Edit Profile">
    <a slot="navleft" onclick="history.back()">Cancel</a>
    <a slot="navright" @click="onsubmit">Done</a>
    <div class = "edit-profile-grid">
      <UploadButton class = "avatar-editor"  @success="onupload" :max="1">
        <Avatar :id="model.avatarFileId" class = "large" />
        <a class = "primary-color"><strong>Change Profile Photo</strong></a>
      </UploadButton>
      <label class = "info-editor">Username</label><input :value="model.userId" placeholder="Username" class = "info-editor" disabled />
      <label class = "info-editor">Name</label><input v-model="draft.displayName" placeholder="Name" class = "info-editor"/>
      <label class = "info-editor">Bio</label><textarea v-model="draft.description" placeholder="" class = "info-editor" />
    </div>
  </MainLayout>
</template>

<script>

import { UserRepository } from '@amityco/js-sdk'

import MainLayout from '@/layouts/Main'
import Avatar from '@/components/Avatar'
import UploadButton from '@/components/UploadButton'

export default {
  components: {
    MainLayout,Avatar, UploadButton
  },

  props: {
    inputName: String,
    inputAvatar: String,
    inputBio: String
  },

  computed: {
    id: ({ $store }) => $store.state.user.userId
  },

  data() {
    return {
      model: null,
      draft: {},
    }
  },

  watch: {
    model(newVal) {
      this.syncDraft(newVal);
    },
  },

  methods: {
    syncDraft(model){
        this.draft.displayName = model.displayName
        this.draft.description = model.description
        console.log("MODEL ",model)
    },
    onupload(files) {
      console.log("Setting ",files[0].fileId);
      this.$store.dispatch('updateUserInfo', {
        avatarFileId: files[0].fileId
      })
    },
    onsubmit(){
      // console.log("MODEL ",this.model, " draft", this.draft);
      let toBeSubmit = {};
      if(this.draft?.displayName !== this.model.displayName){
        // client.setDisplayName(this.draft.displayName)
        toBeSubmit.displayName = this.draft.displayName;
        // console.log("updating display name to ",this.draft.displayName)
      }
      if(this.draft?.description !== this.model.description){
        // client.setDescription(this.draft.description)
        toBeSubmit.description = this.draft.description;
        // console.log("updating description name to ",this.draft.description)
      }
      if(Object.keys(toBeSubmit).length > 0)
        this.$store.dispatch('updateUserInfo', toBeSubmit)
      history.back();
    }
  },
  created() {
    // Query user information from repository
    this.liveObject = new UserRepository().userForId(this.id)
    this.liveObject.on('dataUpdated', model =>{
      this.model = model
      });
    this.model = this.liveObject.model
    this.syncDraft(this.model);
    console.log("USER MO ",this.model)
  },

  beforeDestroy() {
    this.liveObject?.dispose()
  }
}
</script>
<style lang="stylus" scoped>
.edit-profile
  nav a
    font-weight: bold;
    font-size: 1.2rem;



.edit-profile-grid
  display grid 
  grid-template-columns 25% 50% 25%
  grid-template-rows fit-content(10rem) fit-content(20rem) fit-content(20rem) fit-content(20rem) fit-content(20rem)
  padding-top 2rem
  border-top: 1px solid #EFEFEF;

  .avatar-editor
    justify-content: center;
    text-align: center;
    align-content: center;
    align-items: center;
    grid-column: 2;
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
    a
      font-font-weight bold
      margin-top 1rem

  .info-editor
    grid-column: 2/span 2;
    line-height: 100%;
    padding: 1.15rem 0rem 1.15rem 1rem;
    font-size: 1.2rem;
    display: flex;
    align-items: center;

  label.info-editor
    grid-column: 1;
  
  textarea.info-editor  
    line-height 120%
  
  input.info-editor, textarea.info-editor
    grid-column: 2 / span 2;
    border-bottom: 1px solid var(--borderColor);
  
  input.info-editor:last-of-type, label.info-editor:last-of-type, textarea.info-editor:last-of-type
    border-bottom: 1px solid var(--borderColor);

  label.info-editor:first-of-type, input.info-editor:first-of-type
    border-top: 1px solid var(--borderColor);
</style>
