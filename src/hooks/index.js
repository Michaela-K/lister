import moment from 'moment'
import { useState, useEffect } from 'react'
import { auth, db } from '../firebase'
import { onSnapshot, collection, query } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';


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

export function useLoggedInUser() {
    const [user, setUser] = useState("")
    //CHECK IF USER IS SIGNED IN
    useEffect(() => {

        //Functions like onAuthStateChanged that involve asynchronous operations might not complete immediately. Placing them inside a useEffect ensures they don't interfere with the normal component rendering process. It helps manage the timing of when certain operations should occur in the component lifecycle.
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("Context - Logged in as ", user);
            setUser(user)
        } else {
            console.log("Logged out");
        }
        });
    
        // Cleanup function to unsubscribe when the component is unmounted
        return () => unsubscribe();
        //The cleanup function returned by useEffect is used to unsubscribe or clean up resources when the component is unmounted. This helps prevent memory leaks and ensures that there are no lingering subscriptions or operations after the component is no longer in use.
    }, []); // Empty dependency array ensures it runs once on mount

  return user;
}

// MOUNTING:
// Component mounts.
// useEffect runs because of the empty dependency array.
// onAuthStateChanged subscribes to authentication state changes.

// UNMOUNTING:
// Component is about to unmount.
// Cleanup function returned by useEffect is executed.
// onAuthStateChanged unsubscribes from authentication state changes.
// This pattern is especially crucial when dealing with event listeners or subscriptions to avoid memory leaks and unexpected behavior. It ensures that you clean up resources associated with the component when it's no longer needed.
 











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