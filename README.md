# To-Do App

This project is a simple to-do app made with React.

## Dependencies
- [React](https://react.dev)
- [React Router](https://github.com/remix-run/react-router)
- [Bootstrap 5.3](https://getbootstrap.com)
- [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)  (Drag and Drop)
- [react-circular-progressbar](https://github.com/kevinsqi/react-circular-progressbar)
- [@anatoliygatt/dark-mode-toggle](https://github.com/anatoliygatt/dark-mode-toggle)

## Installation

```bash
npm install
```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
```

## Features
### To-Do List View
- Create lists with or without tasks
- Add task to a list
- Delete task from a list
- Delete a list
- Edit a list
- Edit a task
- Mark a task as done
- Mark a task as undone
- Change the priority tag of a task
- Add or change the tag of a task
- Add a new tag
- Change the KanBan tag of a task
- Open the task details page

### Kanban Board View
- Select the To-Do list to display in the Kanban board
- Drag and drop tasks between Kanban columns (To Do, In Progress, Testing, Done)
- Change the priority tag of a task
- Add or change the tag of a task
- Open the task details page

### Task Details View
- Edit task's Kanban tag, priority tag, tag
- Change task's description

## Improvements
- Make the Light/Dark mode property persistent
- Add a search bar to the To-Do list view
- ???