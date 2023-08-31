import { ProjectStatus, Project } from "./model"
class ProjectState {
    public projects: Project[] = [];
    public listner: Function[] = [];
    private static instance: ProjectState;
    /** make consturctor private because we want single instace throught whole application */
    private constructor() {

    }

    /**
     * return single tone instace of project state.
     */
    public static getInstance(): ProjectState {
        if (!this.instance) {
            this.instance = new ProjectState()
        }
        return this.instance
    }
    /**
     * add project to project list and update UI.
     * @param title title of project
     * @param description decription about project
     * @param people number of people work in this project
     */
    public addProject(title: string, description: string, people: string) {
        const uniqueId = Math.random().toFixed(10)
        const project = new Project(uniqueId, title, description, people, ProjectStatus.Active)
        this.projects.push(project)
        this.updateListener()
    }

    /**
     * register listner function that will invoke while change were made in project list.
     * @param listner listner function 
     */
    public addListener(listner: Function) {
        this.listner.push(listner)
    }

    /**
     * invoke listener function which, registered in listener list
     */
    private updateListener() {
        for (const listenerFunction of this.listner) {
            listenerFunction(this.projects.slice())
        }
    }
    /**
     * find draged project and droped into target.
     * @param projectId project Id of draged project
     * @param newStatus status of draged project
     */
    public moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find((item: Project) => item.id === projectId)
        if (project && project.status !== newStatus) {
            project.status = newStatus
            this.updateListener()
        }
    }
};

const projectState = ProjectState.getInstance()
export { projectState, ProjectStatus, Project };