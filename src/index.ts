import {RenderComponent} from "./components/render-component"
/** import style in webpack */
import "./assets/css/app.css"

const form = new RenderComponent('app','project-input')
form.attach()
