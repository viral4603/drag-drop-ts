
import { RenderComponent } from "./render-component"
import { projectState, ProjectStatus, Project } from "./project-state"
export class ProjectList extends RenderComponent<HTMLElement, HTMLTemplateElement> {
    public assignProject: Project[] = [];
    constructor(hostElement: string, templetElement: string, private type: 'active' | 'finished') {
        super(hostElement, templetElement);
        this.renderElement.id = `${this.type}-projects`
        projectState.addListner((projects: Project[]) => {

            const filterProject = projects.filter((items: Project) => {
                if (this.type === 'active') {
                    return items.status === ProjectStatus.Active
                }
                else {
                    return items.status === ProjectStatus.Finished
                }
            })

            this.assignProject = filterProject
            this.renderProject()
        })

    }

    /**
     * render content in list 
     */
    public renderContent() {
        const listId = `${this.type}-projects-list`
        this.renderElement.querySelector('ul')!.id = listId;
        this.renderElement.querySelector('h2')!.textContent = this.type.toUpperCase() + '  PROJECTS'
    }
    /**
     * render list of project
     */
    public renderProject() {
        const elmenet = document.getElementById(`${this.type}-projects-list`);
        elmenet.innerHTML = '';
        for (const project of this.assignProject) {
            const liElement = document.createElement('li')
            liElement.innerHTML = project.title
            elmenet.appendChild(liElement)
        }
    }

}