class DOMHelper {
    static moveElement(elementId, newDestinationSelector) {
        const element = document.getElementById(elementId);
        const destinationElement = document.querySelector(
            newDestinationSelector
        );
        destinationElement.append(element);
    }

    static clearEventListeners(element) {
        const clonedElement = element.cloneNode(true);
        element.replaceWith(clonedElement);
        return clonedElement;
    }
}

class Component {
    constructor(hostElementId, insertBefore = false) {
        if(hostElementId) {
            this.hostElement = document.getElementById(hostElementId);
        } else {
            this.hostElement = document.body;
        }
        this.insertBefore = insertBefore;
    }
    attach() {
        this.hostElement.insertAdjacentElement(this.insertBefore ? 'afterbegin' : 'beforeend', this.element);
    }

    detach() {
        if(this.element) {
           this.element.remove(); 
        }
    }
}

class Tooltip extends Component {
    constructor(closeNotifierFunction) {
        super();
        this.closeNotifier = closeNotifierFunction;
        this.create();
    }

    create() {
        const tooltipElement = document.createElement('div');
        tooltipElement.className = 'card';
        tooltipElement.textContent = 'Test';
        tooltipElement.addEventListener('click', this.closeToolTip.bind(this));
        this.element = tooltipElement;
    }

    closeToolTip() {
        this.detach();
        this.closeNotifier();
    }
}

class Project {
    hasActiveTooltip = false;

    constructor(id, updateProjectListFunction, type) {
        this.id = id;
        this.updateProjectListHandler = updateProjectListFunction;
        this.connectSwitchButton(type);
        this.connectMoreInfoButton();
    }

    connectMoreInfoButton() {
        this.moreInfoBtn = document.querySelectorAll(`#${this.id} button`)[0];
        this.moreInfoBtn.addEventListener('click', this.moreInfoBtnHandler);
    }

    connectSwitchButton(type) {
        let switchBtn = document.querySelectorAll(`#${this.id} button`)[1];
        switchBtn = DOMHelper.clearEventListeners(switchBtn);
        switchBtn.textContent =
            type === 'Active Projects' ? 'Finish' : 'Activate';
        switchBtn.addEventListener(
            'click',
            this.updateProjectListHandler.bind(null, this.id)
        );
    }

    moreInfoBtnHandler() {
        if (this.hasActiveTooltip) {
            return;
        }
        const tooltip = new Tooltip(() => {
            this.hasActiveTooltip = false;
        });
        tooltip.attach();
        this.hasActiveTooltip = true;
    }

    update(updateProjectListFunction, type) {
        this.updateProjectListHandler = updateProjectListFunction;
        this.connectSwitchButton(type);
        this.type = type;
    }
}

class ProjectList {
    projects = [];

    constructor(type, sectionId) {
        this.listType = type;
        this.listSection = document.getElementById(sectionId);
        this.readProjects(this.listSection);
    }

    setSwitchHandler(switchHandlerFunction) {
        this.switchHandler = switchHandlerFunction;
    }

    readProjects(section) {
        const listNodes = section.querySelectorAll('li');

        for (const el of listNodes) {
            this.projects.push(
                new Project(el.id, this.switchProject.bind(this), this.listType)
            );
        }
    }

    addProject(project) {
        this.projects.push(project);
        DOMHelper.moveElement(project.id, `#${this.listSection.id}`);
        project.update(this.switchProject.bind(this), this.listType);
    }

    switchProject(projectId) {
        this.switchHandler(this.projects.find((p) => p.id === projectId));
        this.projects = this.projects.filter((p) => p.id !== projectId);
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
        activeList.setSwitchHandler(finishedList.addProject.bind(finishedList));
        finishedList.setSwitchHandler(activeList.addProject.bind(activeList));
    }
}

App.init();
