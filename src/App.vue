<template>
  <div id="app">
    <router-view></router-view>
    <vGallery ref="vGallery"></vGallery>
  </div>
</template>

<script>

import vGallery from './components/gallery/Gallery'

export default {

  components: {
    vGallery
  },

  name: 'app'
}
</script>
