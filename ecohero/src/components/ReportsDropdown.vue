<template>
  <div>
      <div class = "menu" @click="isOpen = !isOpen">
          {{title}}
          <svg viewBox="0 0 1030 638" width="0">
              <path d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q240 33 24.5t-7 43.5z" fill = "#FFF"> </path>
          </svg> 

            <transition name="fade" appear>
                <div class = "sub-menu" v-if="isOpen">
                    <div class="menu-item">
                        <router-link to="/reportsDepartment">Department Level</router-link>
                    </div>
                    <div class="menu-item">
                        <router-link to="/reportsCompany">Company Level</router-link>
                    </div>
                
                   <!-- <div class="menu-item">
                        <Logout ref="customLogout"/>
                        <button id="logout" @click="runLogout">Logout</button>
                    </div>-->
                </div>
            </transition>

        </div>
    </div>
</template>

<script>
import {getAuth, onAuthStateChanged} from "firebase/auth";
import Logout from "@/components/Logout.vue"


export default {
    name: 'Dropdown',
    components: Logout,
    props: ['title', 'items'],
    data() {
        return {
            isOpen: false 
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        })
    },

    methods: {
        runLogout(){
            this.$refs.customLogout.signOut()
        },
    },

    

}
</script>

<style>
.menu.sub-menu{
    position: absolute;
    background-color: black;
    top: calc(100% + 18px);
    left: 50%;
    width: "max-width";
    transform: translateX(-50%);
    border-radius:0px 0px 16px 16px ;
   
}

.fade-enter-active,
.fade-leave-active{
    transition: all .5s ease-out;
}

.fade-enter,
.fade-leave-to{
    opacity: 0;
}

</style>


