'use client'
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import db from "../../firebase"
import {Container, Grid, Card, CardActionArea, CardContent, Typography} from '@mui/material'
import {useRouter, useSearchParams} from 'next/navigation'

export default function Flashcard() {
    //Get query parameter
    const searchParams = useSearchParams()
    const search = searchParams.get('id')
    
    useEffect(() => {}, [search])
    return <></>
}