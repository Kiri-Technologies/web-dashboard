<template>
  <section class="flex justify-center mt-4">
    <div class="card shadow-lg w-4/5">
      <div class="card-body">
        <bread-crumb>
          <template v-slot:default>
            Akun
          </template>
          <template v-slot:menuName>
            {{ menuName }}
          </template>
        </bread-crumb>

        <profile-form
          @changeIsUpdate="changeIsUpdate"
        >
        </profile-form>
      </div>
    </div>
  </section>
</template>

<script>
import ProfileForm from '../../../components/molecules/forms/ProfileForm.vue';
export default {
  data(){
    return{
      isUpdate: false
    }
  },
  components: {
    ProfileForm
  },
  computed: {
    menuName(){
      if (this.isUpdate) {
        return 'Perbarui Informasi Akun';
      }else {
        return 'Detail Akun';
      }
    }
  },
  methods: {
    changeIsUpdate(isUpdateState){
      this.isUpdate = isUpdateState;
    }
  }
};
</script>

