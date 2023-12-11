import React, { createContext, useState } from 'react'
import { useTodos, useProjects, useFilterTodos, useProjectsWithStats, useLoggedInUser} from '../hooks'

const TodoContext = createContext()

function TodoContextProvider({children}){
    const defaultProject = 'today'
    const [selectedProject, setSelectedProject] = useState(defaultProject)
    const [selectedTodo, setSelectedTodo] = useState(undefined)

    const todos = useTodos()
    const projects = useProjects()
    const projectsWithStats = useProjectsWithStats(todos, projects)
    const filteredTodos = useFilterTodos(todos, selectedProject)
    const loggedInUser = useLoggedInUser()

    return (
        <TodoContext.Provider
            value={
                {
                    defaultProject,
                    selectedProject,
                    setSelectedProject,
                    todos: filteredTodos,
                    projects : projectsWithStats,
                    selectedTodo,
                    setSelectedTodo,
                    user: loggedInUser,
                }
            }
        >
            {children}
        </TodoContext.Provider>
    )
}

export { TodoContextProvider, TodoContext }