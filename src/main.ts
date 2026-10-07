
import "./styles/style.css";
import { createIcons, House, ChartNoAxesColumnIncreasing, MessageSquare, Folder } from "lucide";
import { renderProjects } from "./ui/renderProjects.js";
import { getData  } from "./modules/firebaseRequests.js";


createIcons({
  icons: {
    House,
    ChartNoAxesColumnIncreasing,
    MessageSquare,
    Folder,
  },
});

async function init() {
    const projects = await getData("projects");

    console.log(projects);

    renderProjects(projects);
}

init();