//posts 

app.get("/posts",(req,res)=>{
    res.send("hi to posts");
});
app.get("/posts/:id",(req,res)=>{
    res.send("hi to id posts");
});
app.post("/posts",(req,res)=>{
    res.send("hi to  post posts");
});
app.delete("/posts/:id",(req,res)=>{
    res.send("hi to delete  posts");
});