class DOMHelper {
    static moveElement(elementId, newDestinationSelector) {
        const element = document.getElementById(elementId);
        const destinationElement = document.querySelector(
            newDestinationSelector
        );
        destinationElement.append(element);
        element.scrollIntoView({ behavior: 'smooth' });
    }

    static clearEventListeners(element) {
        const clonedElement = element.cloneNode(true);
        element.replaceWith(clonedElement);
        return clonedElement;
    }
}

class Component {
    constructor(hostElementId, insertBefore = false) {
        if (hostElementId) {
            this.hostElement = document.getElementById(hostElementId);
        } else {
            this.hostElement = document.body;
        }
        this.insertBefore = insertBefore;
    }
    attach() {
        this.hostElement.insertAdjacentElement(
            this.insertBefore ? 'afterbegin' : 'beforeend',
            this.element
        );
    }

    detach() {
        if (this.element) {
            this.element.remove();
        }
    }
}

class Tooltip extends Component {
    constructor(closeNotifierFunction, text, hostElementId) {
        super(hostElementId);
        this.closeNotifier = closeNotifierFunction;
        this.text = text;
        this.create();
    }

    create() {
        const tooltipElement = document.createElement('div');
        tooltipElement.className = 'card';

        const toolTipTemplate = document.getElementById('tooltip');
        const toolTipBody = document.importNode(toolTipTemplate.content, true);

        toolTipBody.querySelector('p').textContent = this.text;
        tooltipElement.append(toolTipBody);

        const hostElPosLeft = this.hostElement.offsetLeft;
        const hostElPosTop = this.hostElement.offsetTop;
        const hostElPosHeight = this.hostElement.clientHeight;
        const parentElScroll = this.hostElement.parentElement.scrollTop;

        const x = hostElPosLeft + 20;
        const y = hostElPosTop + hostElPosHeight - 10 - parentElScroll;

        tooltipElement.style.position = 'absolute';
        tooltipElement.style.left = x + 'px';
        tooltipElement.style.top = y + 'px';

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
        this.connectDrag();
    }

    connectMoreInfoButton() {
        this.moreInfoBtn = document.querySelectorAll(`#${this.id} button`)[0];
        this.moreInfoBtn.addEventListener(
            'click',
            this.moreInfoBtnHandler.bind(this)
        );
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

    connectDrag() {
        document
            .getElementById(this.id)
            .addEventListener('dragstart', (event) => {
                event.dataTransfer.setData('text/plain', this.id);
                event.dataTransfer.effectAllowed = 'move';
            });
    }

    moreInfoBtnHandler() {
        if (this.hasActiveTooltip) {
            return;
        }
        const projectElement = document.getElementById(this.id);
        const tooltip = new Tooltip(
            () => {
                this.hasActiveTooltip = false;
            },
            projectElement.dataset.extraInfo,
            this.id
        );
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
        this.connectDroppable();
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

    connectDroppable() {
        const list = this.listSection.querySelector('ul');

        list.addEventListener('dragenter', (event) => {
            if (event.dataTransfer.types[0] === 'text/plain') {
                list.parentElement.classList.add('droppable');
                event.preventDefault();
            }
        });
        list.addEventListener('dragover', (event) => {
            if (event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
            }
        });

        list.addEventListener('dragleave', (event) => {
            if (
                event.relatedTarget.closest(`#${this.listSection.id} ul`) !==
                list
            ) {
                list.parentElement.classList.remove('droppable');
            }
        });

        list.addEventListener('drop', (event) => {
            const projId = event.dataTransfer.getData('text/plain');
            if (!this.projects.find((p) => p.id === projId)) {
                document
                    .getElementById(projId)
                    .querySelector('button:last-of-type')
                    .click();
                event.preventDefault(); // not needed
            }
        });
    }

    addProject(project) {
        this.projects.push(project);
        DOMHelper.moveElement(project.id, `#${this.listSection.id} ul`);
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

        // setTimeout(this.startAnalytics, 5000)
    }

    static startAnalytics() {
        const anlyticsScript = document.createElement('script');
        anlyticsScript.src = 'assets/scripts/analytics.js';
        anlyticsScript.defer = true;
        document.head.append(anlyticsScript);
    }
}

App.init();
