import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import db from "../../firebase"
import {Container, Grid, Card, CardActionArea, CardContent, Typography} from '@mui/material'
import {useRouter} from 'next/navigation'

export default function Flashcard() {
    //Get query parameter
    const router = useRouter()
    const {id} = router.query
    console.log(id)
    return <></>
}