let APIKEY="AIzaSyB3Ud03ggOpviaE3Oyu0YrBe7Rr1dkqFpk"


//to search video and display data on homepage

const searchVideos = async () => {
    try {
        const q = document.getElementById("query").value

        const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${q}%202&key=${APIKEY}`)

        const data = await res.json()

        append(data.items)
        console.log(data.items)

    } catch (err) {
        console.log(err)
    }
}


const append = (videos) => {
    let show_videos = document.getElementById("show_videos")
    show_videos.innerHTML = null

    videos.forEach(({ id: { videoId }, snippet: { title } }) => {
        let div = document.createElement("div")
        div.setAttribute("id","div")

        let iframe = document.createElement("iframe")
        iframe.src = `https://www.youtube.com/embed/${videoId}`
        iframe.width = "96%"
        iframe.height = "70%"
        iframe.allow = "fullscreen"

        let name = document.createElement("div")
             name.setAttribute("id","title")
        name.innerText = title;


        let dataa = {
            title,
            videoId
        }

        div.append(iframe, name)

        div.onclick = () => {
            showVideo(dataa)
        }

        show_videos.append(div)
    })
}

const showVideo = (dataa) => {
    window.location.href = "showvideo.html"
    localStorage.setItem("video", JSON.stringify(dataa))
}

// For Sidebar open and close

var flag=false

function opensidebar(){
if(flag==false){
    document.getElementById("sidediv").style.display="block"
document.getElementById("visiblesidediv").style.display="none"
document.getElementById("navbelowdiv").style.marginLeft="230px"
flag=true
}
else{
    document.getElementById("sidediv").style.display="none"
document.getElementById("visiblesidediv").style.display="block"
document.getElementById("navbelowdiv").style.marginLeft="100px"
flag=false
}
}



//to show popular videos on youtube

Showpopular()
function Showpopular(){
 
fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=IN&key=${APIKEY}`)
.then(function(res){
    return res.json()
})
.then(function(res){
    appendd(res.items)
 console.log("res",res.items)
})
.catch(function(err){
    console.log("err",err)
})
}


const appendd = (videos) => {
    let show_videos = document.getElementById("show_videos")
    show_videos.innerHTML = null

    videos.forEach(({ id, snippet: { title } }) => {
        let div = document.createElement("div")
        div.setAttribute("id","div")

        let iframe = document.createElement("iframe")
        iframe.src = `https://www.youtube.com/embed/${id}`
        iframe.width = "96%"
        iframe.height = "70%"
        iframe.allow = "fullscreen"

        let name = document.createElement("div")
             name.setAttribute("id","title")
        name.innerText = title;


        let dataa = {
            title,
            id  
        }

        div.append(iframe, name)

        div.onclick = () => {
            showVideoo(dataa)
        }

        show_videos.append(div)
    })
}


// popup after hovering on navbar symbol

function popup(){
let popup = document.getElementById("myPopup");
popup.classList.toggle("show");
}

function popupp(){
let popup = document.getElementById("myPopupp");
popup.classList.toggle("show");
}

function popuppp(){
let popup = document.getElementById("myPopuppp");
popup.classList.toggle("show");
}

function popupppp(){
let popup = document.getElementById("myPopupppp");
popup.classList.toggle("show");
}

function homepage(){
    window.location.href="index.html"
}

                                          //For Diplay Search result inside search div
                                          
async function searchdiv(){


    try{
        let query=document.getElementById("query").value

        let url=(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${query}%202&key=${APIKEY}`)

        let res= await fetch(url)

        let data=await res.json()
        // showinsearchdiv(data)
        console.log("For search btn",data)
        return data
    }
    catch(err){
        console.log("err",err)
    }
}

function showinsearchdiv(data){

let data1=data.items
document.getElementById("B").style.display="block"
document.getElementById("navbelowdiv").style.zIndex="-1"

document.getElementById("B").innerHTML=null

 data1.map(function(elem){

    let mainn=document.createElement("div")
    mainn.setAttribute("id","mainn")

    divname=document.createElement("div")
    divname.innerText="•"+" "+elem.snippet.title

    mainn.append(divname)
    document.getElementById("B").append(mainn)
 })   
}

function removesearchdiv(){
    document.getElementById("B").style.display="none"
    document.getElementById("navbelowdiv").style.zIndex="1"
}

//Added Debouncing in search

async function combineboth(){
    let data=await searchdiv()
    console.log("data",data)

    showinsearchdiv(data)
}


let id;
function debouncing(func,delay){
 if(id){
    clearTimeout(id)
 }
 id=setTimeout(function(){
     func()
 },delay)
}



                                // to add voice recognition


let query=document.getElementById("query").value
let queryy=document.getElementById("query")


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

if (SpeechRecognition) {
    console.log("Support")

    let micBtn=document.getElementById("record")
let micIcon=micBtn.querySelector("i")


    const recognition = new SpeechRecognition()
    recognition.continuous=true
    recognition.lang="en"

    micBtn.addEventListener("click", micBtnClick)

        function micBtnClick() {

            if (micIcon.classList.contains("fa-microphone")) {

                recognition.start()
            }
            else {
                recognition.stop()
            }
        }
        recognition.addEventListener("start", startSpeechrecognition)

        function startSpeechrecognition() {
            console.log("startSpeechrecognition active")
            micIcon.classList.remove("fa-microphone")
            micIcon.classList.add("fa-microphone-slash")
            queryy.focus() 
        }

        recognition.addEventListener("end", endSpeechrecognition)

        function endSpeechrecognition() {
            console.log("startSpeechrecognition disable")
            micIcon.classList.remove("fa-microphone-slash")
            micIcon.classList.add("fa-microphone")
            queryy.focus()
        }

        recognition.addEventListener("result", resultSpeechrecognition)

        function resultSpeechrecognition(event){
            console.log(event)
            const transcript=event.results[0][0].transcript
            queryy.value=transcript
            // setTimeout(function(){
            //     debouncing(combineboth,2000)
            // },1000)
        }
    }
    else {
        console.log("Not supported ")
    }
