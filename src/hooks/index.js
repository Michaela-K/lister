// import moment from 'moment'
import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { onSnapshot, collection } from 'firebase/firestore';


export const useTodos = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTodos(data);
        });

        return () => unsubscribe(); // Cleanup

    }, [db]);

    return todos;
};


// export function useProjects(todos){
//     const [projects, setProjects] = useState([])

//     function calculateNumOfTodos(projectName, todos){
//         //filter returns an array where the condition is true
//       return todos.filter(todo => todo.projectName === projectName).length
//     }

//     useEffect(() => {
//         let unsubscribe = db
//         .collection('projects')
//         .onSnapshot( snapshot => {
//             const data = snapshot.docs.map( doc => {
//               const projectName = doc.data().name;
//                 return {
//                     id : doc.id,
//                     name : projectName,
//                     numOfTodos: calculateNumOfTodos(projectName, todos)
//                 }
//             })
//             setProjects(data)
//         })

//         return () => {unsubscribe()}
//     }, [])

//     return projects
// }
