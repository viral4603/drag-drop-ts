export interface Draggable {
    dragStartHandler(event: DragEvent, projectId: string): void;
}

export interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}

export enum ProjectStatus {
    Active,
    Finished
}

export class Project {
    constructor(public id: string,
        public title: string,
        public description: string,
        public people: string | number,
        public status: ProjectStatus) {

    }
}