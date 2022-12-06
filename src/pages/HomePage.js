import React,{useState ,useEffect,useContext}from "react";
import { Auth } from "../App";

export default function HomePage(){
let [books,setBooks]=useState([])
let {token} = useContext(Auth)


    let getBooks = async()=>{
        let response = await fetch('http://127.0.0.1:8000/bookshelf/',{
            method:'GET',
            headers:{
                'Authorization':'Bearer ' + String(token.access)
            } 
        })
        let data = await response.json()
        setBooks(data)
    }

    let addBooks = async(e)=>{
        let response = await fetch('http://127.0.0.1:8000/bookshelf/add/',{
            method:'POST',
            headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(token.access)
            },
            body:JSON.stringify({'title':e.target.title.value,'author':e.target.author.value,'description':e.target.description.value})
        })
        let data = await response.json()
        console.log(data)

    }

    useEffect(()=>{getBooks()},[])
    console.log(books)
    return(
        <div>
        {books.map(book=>(<p>Title:{book.title}| By:{book.author}|Desc:{book.description}</p>))}
        <form onSubmit={addBooks}>
        <input type='text' placeholder="Enter title" name="title"></input>
        <input type='text' placeholder="Enter Author" name="author"></input>
        <textarea name="description" placeholder="Enter Description"></textarea>
        <input type='submit'></input>
        </form>
        </div>
    )
}