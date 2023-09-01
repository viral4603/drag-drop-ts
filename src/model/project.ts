import { ProjectStatus } from "../util/enum";

export class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: string | number,
        public status: ProjectStatus) { }
}