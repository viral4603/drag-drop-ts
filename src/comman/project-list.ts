
import { RenderComponent } from "./render-component"
export class ProjectList extends RenderComponent<HTMLElement, HTMLTemplateElement> {
    constructor(hostElement: string, templetElement: string, private type: 'active' | 'finished') {
        super(hostElement, templetElement);
        this.renderElement.id = `${this.type}-projects`
    }

    /**
     * render content in list 
     */
    public renderContent() {
        const listId = `${this.type}-projects-list`
        this.renderElement.querySelector('ul')!.id = listId;
        this.renderElement.querySelector('h2')!.textContent = this.type.toUpperCase() + '  PROJECTS'
    }

}