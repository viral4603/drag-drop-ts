export class RenderComponent<T extends HTMLElement, U extends HTMLElement> {
    /** template element that hold html*/
    public templateElement: HTMLTemplateElement;
    /** host elemement that render fragment element */
    public hostElement: T;
    /** render document fragment in host element */
    public renderElement: U;
    constructor(hostElementID: string, templateId: string) {
        this.hostElement = document.getElementById(hostElementID) as T;
        this.templateElement = document.getElementById(templateId) as HTMLTemplateElement;
        const importedNode = document.importNode(this.templateElement.content, true) as DocumentFragment;
        this.renderElement = importedNode.firstElementChild as U;
    }

    /**
     * attach element into host element
     * @param position where to add new element 
     */
    public attach(position: InsertPosition): void {
        this.hostElement.insertAdjacentElement(position, this.renderElement)
    }
}
