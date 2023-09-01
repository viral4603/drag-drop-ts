
import { Component } from "./render-component"
import { DragTarget, Draggable } from "../model/drag-drop"
import { Project } from "../model/project"
import { projectState } from "../state/project-state"
import { ProjectStatus } from "../util/enum"
export class ProjectList extends Component<HTMLElement, HTMLTemplateElement> implements Draggable, DragTarget {
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

        projectState.addListener((projects: Project[]) => {
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
     * add project id to transfer data and allow move effect
     * @param event drag event 
     * @param projectId project id that will transfer while dragging
     */
    dragStartHandler(event: DragEvent, projectId: string): void {
        event.dataTransfer!.setData('text/plain', projectId);
        event.dataTransfer!.effectAllowed = 'move';
    }
    /**
     * remove class from element if drag item will draged out side of it's area
     * @param _ not going to use default parameter
     */
    dragLeaveHandler(_: DragEvent): void {
        const listElement = this.renderElement.querySelector('ul')!
        listElement.classList.remove('droppable')
    }
    /**
     * add class to target element in which, list will be drop
     * @param event drag event 
     */
    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault()
            const liElement = this.renderElement.querySelector('ul')!
            liElement.classList.add('droppable')
        }
    }

    /**
     * drop dragble item into target
     * @param event drag event
     */
    dropHandler(event: DragEvent): void {
        const projectId = event.dataTransfer!.getData('text/plain')
        projectState.moveProject(projectId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished)
    }

    /**
     * render list content in host element 
     */
    public renderContent() {
        const listId = `${this.type}-projects-list`
        this.renderElement.querySelector('ul')!.id = listId;
        this.renderElement.querySelector('h2')!.textContent = this.type.toUpperCase() + '  PROJECTS'
    }
    /**
     * render list of project in host element
     */
    public renderProject() {
        const elmenet = document.getElementById(`${this.type}-projects-list`);
        elmenet.innerHTML = '';
        for (const project of this.assignProject) {
            const listElement = document.createElement('li')

            listElement.innerHTML = `<h2>${project.title}</h2>
            <p>Person Worked: ${project.people}</p>
            <p>${project.description}</p>`

            listElement.setAttribute('draggable', 'true')

            listElement.addEventListener('dragstart', (dragStartEvent: DragEvent) => {
                this.dragStartHandler(dragStartEvent, project.id)
            });

            elmenet.appendChild(listElement)
        }
    }
}