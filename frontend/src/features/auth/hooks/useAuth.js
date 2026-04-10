import { useContext, useEffect } from "react"
import { AuthContext } from "../auth.context"
import { login, logout, register, getUser } from "../services/auth.api"

export const useAuth = () => {

    const context = useContext(AuthContext)
    const { loading, user, setLoading, setUser } = context

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            setUser(data.user)
        } catch {

        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
        } catch {

        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
        } catch {

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const getandsetUser = async () => {
            try {
                const data = await getUser()
                setUser(data.user)
            } catch (err) { } finally {
                setLoading(false)
            }
        }

        getandsetUser()
    }, [])

    return ({ handleLogin, handleLogout, handleRegister, user, loading })
}