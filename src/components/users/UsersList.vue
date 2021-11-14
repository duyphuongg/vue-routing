<template>
  <button @click="handlePush">Push</button>
  <button @click="handleBack">Back</button>
  <button @click="handleForward">Forward</button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  methods: {
    handlePush() {
      this.$router.push("/teams")
    },
    handleBack(){
      this.$router.back()
    },
    handleForward(){
      this.$router.forward()
    }
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>