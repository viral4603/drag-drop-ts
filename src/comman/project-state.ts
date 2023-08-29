enum ProjectStatus {
    Active,
    Finished
}
class Project {
    constructor(public id: string,
        public title: string,
        public description: string,
        public people: string | number,
        public status: ProjectStatus) {

    }
}
class ProjectState {
    public projects: Project[] = [];
    public listner: any[] = [];
    private static instance: ProjectState

    private constructor() {

    }

    /**
     * get single tone instance of project state
     */
    public static getInstance(): ProjectState {
        if (!this.instance) {
            this.instance = new ProjectState()
        }
        return this.instance
    }
    /**
     * add project to the project List
     */
    public addProject(title: string, description: string, people: string) {
        const uniqueId = Math.random().toFixed(10)
        const project = new Project(uniqueId, title, description, people, ProjectStatus.Active)
        this.projects.push(project)

        for (const listnerFunction of this.listner) {
            listnerFunction(this.projects.slice())
        }
    }

    /**
     * add Listner it will invoke while made changes in project list
     */
    public addListner(listner: Function) {
        this.listner.push(listner)
    }
};

const projectState = ProjectState.getInstance()
export { projectState , ProjectStatus,Project};