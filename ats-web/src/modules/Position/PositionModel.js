class ProjectModel {
    constructor() {
        this.id = 0;
        this.name = '';
    }
}

export default class PositionModel {
    constructor() {
        this.id = 0;
        this.title = '';
        this.experience = 0;
        this.no_of_openings = 0;
        this.project_id = null;
        this.grade = '';
        this.skills = '';
        this.status = '';
        this.projects = [new ProjectModel()];
    }
}