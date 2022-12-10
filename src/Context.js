import React,{createContext, useState} from 'react';

import plants from './consts/plants';

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [cartCount, setCartCount] = useState(0);

    const [cartData, setCartData] = useState(plants);

    const [cost,setCost] = useState(0.00);

    // const [admStats,setAdmStats] = useState(false);

    // const [duserName,setDuserName] = useState('');
    // const [dEmail,setDemail] = useState('');

    // const [user_id,setUser_id] = useState('');

    // const [authFavorites_id,setAuthFavorites_id] = useState('');
    // const [favoriteAdded,setFavoriteAdded] = useState(true);

    // const [actType,setActType] = useState('');
    // const [actDuration,setActDuration] = useState('');


    return(
        <AuthContext.Provider
            value={{
                cartCount, 
                setCartCount,
                cartData, 
                setCartData,
                cost,
                setCost,
                // signIn: () => {
                    
                //     setStatus(true)
                //   },
                // signOut: () => {
                //     setStatus(false)
                //   },
                // login: async (email,password) =>{
                //     try{
                //         await auth().signInWithEmailAndPassword(email,password)
                        
                //     } catch(e){
                //         console.log(e);
                //     }
                // },
                // register: async (name,email, password) =>{
                //     try{
                //         await auth().createUserWithEmailAndPassword(email, password)
                //         .then(()=>{

                //             firestore().collection('users').doc(auth().currentUser.uid)
                //             .set({
                //                 name:'',
                //                 about:'',
                //                 userImage:null,
                //                 email:email,
                //                 createdAt:firestore.Timestamp.fromDate(new Date())

                //             })
                //             .catch(error =>{
                //                 console.log('Error creating user in firestore: ', error);
                //             })
                //         })

                //         .catch(error =>{
                //             console.log('something went wrong signing up: ', error);
                //         });
                //     } catch(e){
                //         console.log(e);
                //     }
                // },
                // logout: async () => {
                //     try{
                //         await auth().signOut();
                //     } catch(e){
                //         console.log(e)
                //     }
                // }

            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
