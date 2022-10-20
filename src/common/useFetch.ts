import { useState } from "react"
import assert from "http-assert"

export type FetchOption = {
    token: string
}
export const useFetch = (url: string, options?: FetchOption) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | undefined>()

    const fetchGet = async <T>(params?: Record<string, string>): Promise<T> => {
        setLoading(true)
        try {
            const searchParams = new URLSearchParams(params)
            const res = await fetch(`${url}?${searchParams.toString()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${options?.token}`
                },
            })
            assert(res.ok, res.status)
            const data = await res.json()
            setLoading(false)
            return data
        } catch (e) {
            setError(e as Error)
            throw e
        } finally {
            setLoading(false)
        }
    }

    const fetchPost = async <T>(params?: unknown): Promise<T> => {
        setLoading(true)
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${options?.token}`
                },
                body: JSON.stringify(params),
            })
            assert(res.ok, res.status)
            const data = await res.json()
            setLoading(false)
            return data
        } catch (e) {
            setError(e as Error)
            throw e
        } finally {
            setLoading(false)
        }
    }

    const fetchPut = async <T>(params?: unknown): Promise<T> => {
        setLoading(true)
        try {
            const res = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${options?.token}`
                },
                body: JSON.stringify(params),
            })
            assert(res.ok, res.status)
            const data = await res.json()
            setLoading(false)
            return data
        } catch (e) {
            setError(e as Error)
            throw e
        } finally {
            setLoading(false)
        }

    }

    const fetchPatch = async () => {
        setLoading(true)
        try {
            const res = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${options?.token}`
                },
            })
            assert(res.ok, res.status)
            const data = res.json()
            return data
        } catch (e) {
            setError(e as Error)
        } finally {
            setLoading(false)
        }
    }

    const fetchDelete = async () => {
        setLoading(true)
        try {
            const res = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${options?.token}`
                },
            })
            assert(res.ok, res.status)
            const data = res.json()
            setLoading(false)
            return data
        } catch (e) {
            setError(e as Error)
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, fetchGet, fetchPost, fetchDelete, fetchPut, fetchPatch }
}
