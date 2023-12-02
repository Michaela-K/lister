// import moment from 'moment'
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
        
    }, [db]);
    
    // console.log(todos.filter(todo => todo.projectName === "personal").length)
    return todos;
};


export function useProjects(todos){
    const [projects, setProjects] = useState([])

    function calculateNumOfTodos(projectName, todos){
        //filter returns an array where the condition is true
      return todos.filter(todo => todo.projectName === projectName).length
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'projects'), (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                const projectName = doc.data().name;
                return {
                    id: doc.id,
                    name: projectName,
                    numOfTodos: calculateNumOfTodos(projectName, todos),
                };
            });
            setProjects(data);
        });

        return () => {unsubscribe()}
    }, [todos])

    return projects
}
