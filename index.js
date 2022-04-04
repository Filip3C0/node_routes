const { response } = require("express")
const express = require("express")
const uuid = require("uuid")
const port = 3000
const app = express()
app.use(express.json())

const requests = []

const checkUserId = (request, response, next) =>{
    const {id} = request.params
    const index = requests.findIndex(Request => Request.id === id)
    if(index < 0){
        return response.status(404).json({message:"Request Not Found"})
    }
    
    request.userIndex = index
    request.userId = id
    next()

}

app.get('/requests', (request, response)=>{
    return response.json(requests)
})

app.post('/requests', (request, response)=>{
    const {order, clientName, price, status} = request.body
    const newResquest = {id:uuid.v4(),order,clientName,price,status}

    requests.push(newResquest)
    return response.status(201).json(newResquest)
})

app.put('/requests/:id', checkUserId,(request, response)=>{
   
    const {order, clientName, price, status} = request.body

    const index = request.userIndex
    
    const id = request.userId 

    const updatedRequest = {id,order,clientName, price,status}

  
   
    requests[index] = updatedRequest
    return response.json(updatedRequest)
})

app.delete('/requests/:id',checkUserId, (request, response)=>{
    const index = request.userIndex 
    
    requests.splice(index,1)
    
    return response.status(204).json()
})


app.listen(port, ()=>{
    console.log(`Server started on port ${port} 🚀`)
})