import {RenderComponent} from "./comman/render-component"
import { ProjectInput } from "./comman/project-input"
/** import style in webpack */
import "./assets/css/app.css"

const form = new RenderComponent('app','project-input')
form.attach()
const projectInput = new ProjectInput()

