import {Project } from "./modules/Project.ts";
import { User } from ".modules/User.ts";
import type {MemberCategory,TaskPriority, TaskStatus } from "./modules/task.ts"
import "./styles/style.css";
import { createIcons, House, ChartNoAxesColumnIncreasing, MessageSquare, Folder } from "lucide";

createIcons({
  icons: {
    House,
    ChartNoAxesColumnIncreasing,
    MessageSquare,
    Folder,
  },
});