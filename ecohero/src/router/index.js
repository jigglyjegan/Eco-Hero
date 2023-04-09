import { createRouter, createWebHistory } from "vue-router";
import About from "@/views/About.vue";
import ChangeLimit from "@/views/ChangeLimit.vue";
import ChangePass from "@/views/ChangePass.vue";
import ContactUs from "@/views/ContactUs.vue";
import Data from "@/views/Data.vue";
import ForgetPass from "@/views/ForgetPass.vue";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import NotFound from '@/views/NotFound.vue';
import Overview from '@/views/Overview.vue';
import Registration from '@/views/Registration.vue';
import Reports from "@/views/Reports.vue";
import ReportsCompany from '@/views/ReportsCompany.vue'
import ReportsDepartment from '@/views/ReportsDepartment.vue'


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/about",
    name: "About",
    component: About,
  },

  {
    path: "/changeLimit",
    name: "ChangeLimit",
    component: ChangeLimit,
  },  
  
  {
    path: "/changePass",
    name: "ChangePass",
    component: ChangePass,
  },

  {
    path: "/contactUs",
    name: "ContactUs",
    component: ContactUs,
  },
  
  {
    path: "/data",
    name: "Data",
    component: Data,
  },

  {
    path: "/forgetPass",
    name: "ForgetPass",
    component: ForgetPass,
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
  },

  {
    path: "/overview",
    name: "Overview",
    component: Overview,
  },
  
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
  },

  {
    path: "/reports",
    name: "Reports",
    component: Reports,
  },

  {
    path: "/reportsDepartment",
    name: "ReportsDepartment",
    component: ReportsDepartment,
  },

  {
    path: "/reportsCompany",
    name: "ReportsCompany",
    component: ReportsCompany,
  },

  { // Keep this at the bottom, and delete this comment when the project is done. 
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
