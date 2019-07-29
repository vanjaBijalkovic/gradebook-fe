<template>
  <div>
    {{diaries}}
  </div>
</template>

<script>
import { diariesService } from '@/services/DiariesService'

export default {
  data() {
    return {
      diaries: []
    };
  },
  created() {
    diariesService.getAll()
      .then(response => {
        this.diaries = response.data;
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>
