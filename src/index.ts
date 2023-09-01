import { Component } from "./components/render-component"
import { ProjectInput } from "./components/project-input"
import { ProjectList } from "./components/project-list"
/** import style in webpack */
import "./assets/css/app.css"

const form = new Component('app', 'project-input')
form.attach('afterbegin')
new ProjectInput()

const activeProjectList = new ProjectList('app', 'project-list', 'active')
activeProjectList.attach('beforeend')
activeProjectList.renderContent()

const finshedProjectList = new ProjectList('app', 'project-list', 'finished')
finshedProjectList.attach('beforeend')
finshedProjectList.renderContent()
