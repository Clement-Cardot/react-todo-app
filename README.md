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

# Features
## To-Do Lists
A To-Do List is a collection of tasks with a title. 

### Features :
- Create lists with or without tasks
- Remove a list
- Change the title of a list

## Tasks
A task is a collection of properties:
- Title
- Description
- Kanban tag (To Do, In Progress, Testing, Done)
- Priority tag (Low, Medium, High)
- Custom Tag

### Features :
- Edit the title of a task
- Mark a task as done
- Mark a task as undone
- Change the priority tag of a task
- Add or change the custom tag of a task
- Change the KanBan tag of a task
- Open the task details page

## Custom Tags
A custom tag is a tag that can be added to a task.
It has a name, a background color and a text color.

### Features :
- Create custom tags

## Views
- To-Do List View
- Kanban Board View
- Task Details View

## Improvements
- Make the Light/Dark mode property persistent
- Add a search bar to the To-Do list view
- align tags in the To-Do list view
- Allow the user to delete a custom tag