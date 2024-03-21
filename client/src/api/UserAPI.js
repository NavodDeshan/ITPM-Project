import {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isUser, setIsUser] = useState(false)
    const [isPc, setIsPc] = useState(false)
    const [isPm, setIsPm] = useState(false)
    const [isSupervisor, setIsSupervisor] = useState(false)
    const [isCoSupervisor, setIsCoSupervisor] = useState(false)
    const [isExaminor, setIsExaminor] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])

    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    res.data.role === 0 ? setIsUser(true) : setIsUser(false)
                    res.data.role === 2 ? setIsPc(true) : setIsPc(false)
                    res.data.role === 3 ? setIsPm(true) : setIsPm(false)
                    res.data.role === 4 ? setIsSupervisor(true) : setIsSupervisor(false)
                    res.data.role === 5 ? setIsCoSupervisor(true) : setIsCoSupervisor(false)
                    res.data.role === 6 ? setIsExaminor(true) : setIsExaminor(false)

                    setCart(res.data.cart)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()
            
        }
    },[token])

    

    const addCart = async (product) => {
        if(!isLogged) return alert("Please login to continue buying")

        const check = cart.every(item =>{
            return item._id !== product._id
        })

        if(check){
            setCart([...cart, {...product, quantity: 1}])

            await axios.patch('/user/addcart', {cart: [...cart, {...product, quantity: 1}]}, {
                headers: {Authorization: token}
            })

        }else{
            alert("This product has been added to cart.")
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        isUser: [isUser, setIsUser],
        isPc: [isPc, setIsPc],
        isPm: [isPm, setIsPm],
        isSupervisor: [isSupervisor, setIsSupervisor],
        isCoSupervisor: [isCoSupervisor, setIsCoSupervisor],
        isExaminor: [isExaminor, setIsExaminor],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory]
    }
}

export default UserAPI
 