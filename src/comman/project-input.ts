import { projectState } from "./project-state"
export class ProjectInput {
    formElement: HTMLFormElement;
    titleElement: HTMLInputElement;
    descriptionElement: HTMLInputElement;
    peopleElement: HTMLInputElement;

    constructor() {
        this.formElement = document.querySelector('.project-form') as HTMLFormElement;
        this.titleElement = document.querySelector('#title') as HTMLInputElement;
        this.descriptionElement = document.querySelector('#description') as HTMLInputElement;
        this.peopleElement = document.querySelector('#people') as HTMLInputElement;
        this.configure()
    }
    /**
     * add listener to form element
     */
    public configure() {
        this.formElement.addEventListener('submit', (event: SubmitEvent) => {
            event.preventDefault()
            if (this.validateForm()) {
                this.addProject()
            }
        })
    }

    /**
     * add project to the project List
     */
    public addProject(): void {
        projectState.addProject(this.titleElement.value, this.descriptionElement.value, this.peopleElement.value)
        this.clearFields()
    }

    /**
     * validate form inputs
     */
    public validateForm() {
        if (!this.titleElement.value) {
            throw Error('please provide title')
        }
        if (!this.descriptionElement.value) {
            throw Error('please add description')
        }
        if (+this.peopleElement.value === 0) {
            throw Error('number of people should be more than 1')
        }
        return true
    }
    /**
     * clear forms field after submit form
     */
    public clearFields(): void {
        this.titleElement.value = '';
        this.descriptionElement.value = '';
        this.peopleElement.value = '';
    }

}