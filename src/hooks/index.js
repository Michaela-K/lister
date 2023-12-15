import moment from 'moment'
import { useState, useEffect } from 'react'
import { auth, db } from '../firebase'
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export function useLoggedInUser() {
    const [user, setUser] = useState("")
    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
        } else {
            console.log("Logged out");
            setUser(null);
        }
        });
    
        return () => unsubscribe();
    }, []);

  return user;
}


export const useTodos = () => {
    const [todos, setTodos] = useState([]);
    const user = useLoggedInUser()
    
    useEffect(() => { 
        if (user) {
            const q = query((collection(db,'todos')), where('userId', '==', user.uid))
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTodos(data);
            });
            
            return () => unsubscribe(); 
        } else {
            setTodos([]);
        }
        
    }, [user]);
    
    return todos;
};


export function useProjects(){
    const [projects, setProjects] = useState([])
    const user = useLoggedInUser()

    useEffect(() => {
        if (user) {
        const q = query((collection(db,'projects')), where('userId', '==', user.uid))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    name: doc.data().name,
                    userId: doc.data().userId
                };
            });
            setProjects(data);
        });

        return () => {unsubscribe()}
        } else{
            setProjects([]);
        }
    }, [user])

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
                const todoDate = moment(todo.date, 'MM/DD/YYYY')
                const todayDate = moment(todayDateFormated, 'MM/DD/YYYY')
                const diffDays = todoDate.diff(todayDate, 'days')

                return diffDays >=0 && diffDays < 7
            })
        }else if( selectedProject === 'All Days'){
            data = todos
        }else{
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
                ...project 
            }
        })
        
        setProjectsWithStats(data)
    }, [todos, projects])  

    return projectsWithStats
}