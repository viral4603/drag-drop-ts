
import { RenderComponent } from "./render-component"
import { projectState, ProjectStatus, Project } from "./project-state"
import { DragTarget, Draggable } from "./model"
export class ProjectList extends RenderComponent<HTMLElement, HTMLTemplateElement> implements Draggable, DragTarget {
    public assignProject: Project[] = [];
    constructor(hostElement: string, templetElement: string, private type: 'active' | 'finished') {
        super(hostElement, templetElement);
        this.renderElement.id = `${this.type}-projects`
        this.configure()

    }
    /**
     * configure basic elements
     */
    public configure(): void {
        this.renderElement.addEventListener('dragover', this.dragOverHandler.bind(this))
        this.renderElement.addEventListener('dragleave', this.dragLeaveHandler.bind(this))
        this.renderElement.addEventListener('drop', this.dropHandler.bind(this))

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
    /** Drag target events */

    dragOverHandler(event: DragEvent): void {
        const liElement = this.renderElement.querySelector('ul')!
        liElement.classList.add('droppable')
    }

    dropHandler(event: DragEvent): void {
        throw new Error("Method not implemented.");
    }

    dragLeaveHandler(event: DragEvent): void {
        const liElement = this.renderElement.querySelector('ul')!
        liElement.classList.remove('droppable')
    }

    /** Drag start events */
    dragStartHandler(event: DragEvent): void {
    }

    dragEndHandler(event: DragEvent): void {
        console.log('drag end', event)
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

            liElement.innerHTML = `<h2>${project.title}</h2>
            <p>Person Worked: ${project.people} </p>
            <p>${project.description}</p>`

            liElement.setAttribute('draggable', 'true')

            liElement.addEventListener('dragstart', this.dragStartHandler);
            liElement.addEventListener('dragend', this.dragEndHandler);

            elmenet.appendChild(liElement)
        }
    }


}