<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  components: {
    UserItem
  },
  data() {
    return {
      teamName: '',
      members: [],
    };
  },
  inject: ["teams", "users"],
  created () {
    console.log(this.$route);
    const teamId = this.$route.params.teamId
    const team = this.teams.find(team => team.id == teamId)
    const member = this.users.reduce((acc, curr) => {
      if(team && team.members.includes(curr['id'])){
        acc = [...acc, curr]
      }
      return acc
    }, [])
    this.teamName = team && team.name
    this.members = member
  },
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>