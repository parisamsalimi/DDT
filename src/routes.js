import Home from "./pages/Home/Home.vue";
import CreateHouse from "./pages/CreateHouse/CreateHouse.vue";
import HouseDetails from "./pages/HouseDetails/HouseDetails.vue";
import AboutUs from "./pages/AboutUs/AboutUs.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/create", name: "Create", component: CreateHouse },
  { path: "/house/:id", name: "HouseDetails", component: HouseDetails },
  { path: "/about", name: "AboutUs", component: AboutUs },
  { path: "/edit/:id", name: "EditHouse", component: CreateHouse },
];

export default routes;
