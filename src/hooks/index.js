import moment from 'moment'
import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { onSnapshot, collection, query } from 'firebase/firestore';


export const useTodos = () => {
    const [todos, setTodos] = useState([]);
    console.log("useTodos effect called")
    
    useEffect(() => {
        const q = query(collection(db,'todos'))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log("Subscribed")
            setTodos(data);
        });
        
        return () => unsubscribe(); // Cleanup
        
    }, []);
    
    // console.log(todos.filter(todo => todo.projectName === "personal").length)
    return todos;
};


export function useProjects(){
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'projects'), (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    name: doc.data().name
                };
            });
            setProjects(data);
        });

        return () => {unsubscribe()}
    }, [])

    return projects
}


export function useFilterTodos(todos, selectedProject){
    const [filteredTodos, setFilteredTodos] = useState([])

    useEffect( () => {
        let data;
        const todayDateFormated = moment().format('MM/DD/YYYY')

        if(selectedProject === 'Today'){
            data = todos.filter(todo => todo.date === todayDateFormated)
        }else if(selectedProject === 'Next 7 Days'){
            data = todos.filter(todo => {
                //these two are a JS date object using moment
                const todoDate = moment(todo.date, 'MM/DD/YYYY')
                const todayDate = moment(todayDateFormated, 'MM/DD/YYYY')

                //moment calculates the diff between todoDate and todayDate in number of 'days'
                const diffDays = todoDate.diff(todayDate, 'days')

                return diffDays >=0 && diffDays < 7
            })
        }else if( selectedProject === 'All Days'){
            data = todos
        }else{
            //if none of the above is true, filter by project
            data = todos.filter(todo => todo.projectName === selectedProject)
        }

        setFilteredTodos(data)
    }, [todos, selectedProject])

    return filteredTodos
}


export function useProjectsWithStats(todos, projects){
    const [projectsWithStats, setProjectsWithStats] = useState([])

    useEffect( () => {
        const data = projects.map( project => {
            return {
                numOfTodos : todos.filter( todo => todo.projectName === project.name && !todo.checked ).length,
                ...project  //old properties -> id, name
            }
        })
        
        setProjectsWithStats(data)
    }, [todos, projects])  //recalculate the num of todos only if the project has been changed

    return projectsWithStats
}











//WHY WAS THIS CODE MODIFIED ABOVE - the code below is not able to have the correct number of todos next to each project when the user checks it off as completed or vice versa
// export function useProjects(todos){
//     const [projects, setProjects] = useState([])

//     function calculateNumOfTodos(projectName, todos){
//         //filter returns an array where the condition is true
//       return todos.filter(todo => todo.projectName === projectName).length
//     }

//     useEffect(() => {
//         const unsubscribe = onSnapshot(collection(db, 'projects'), (snapshot) => {
//             const data = snapshot.docs.map((doc) => {
//                 const projectName = doc.data().name;
//                 return {
//                     id: doc.id,
//                     name: projectName,
//                     numOfTodos: calculateNumOfTodos(projectName, todos),
//                 };
//             });
//             setProjects(data);
//         });

//         return () => {unsubscribe()}
//     }, [todos])

//     return projects
// }