class ProjectList {
    projects = [];

    constructor(type, sectionId) {
        this.listType = type;
        this.listSection = document.getElementById(sectionId);
        console.log(listSection)
        this.readProjects(listSection);
    }

    readProjects(section) {
        const projects = section.GetElementsByTagName('li');

        for (const el of projects) {
            this.projects.push(new Project(el.id));
        }
        console.log(projects);
    }
}

class Project {
    constructor(id) {
        this.id = id;
    }
}

class App {
    static init() {
        const activeList = new ProjectList(
            'Active Projects',
            'active-projects'
        );
        const finishedList = new ProjectList(
            'Finished Projects',
            'finished-projects'
        );
    }

}

class Tooltip {}

App.init();
