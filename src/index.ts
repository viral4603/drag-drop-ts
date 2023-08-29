import {RenderComponent} from "./comman/render-component"
import { ProjectInput } from "./comman/project-input"
import { ProjectList } from "./comman/project-list"
/** import style in webpack */
import "./assets/css/app.css"

const form = new RenderComponent('app','project-input')
form.attach('afterbegin')
const projectInput = new ProjectInput()

const activeProjectList = new ProjectList('app','project-list','active')
activeProjectList.attach('beforeend')
activeProjectList.renderContent()

const finshedProjectList = new ProjectList('app','project-list','finished')
finshedProjectList.attach('beforeend')
finshedProjectList.renderContent()
