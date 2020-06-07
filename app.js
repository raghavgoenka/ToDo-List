
const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const app=express();



var items=["Buy Food" ,"Cook Food","Eat Food"];
let workitems=[];
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://raghav-goenka:raghav33@cluster0-lmp9x.mongodb.net/todolistDB",{useNewUrlParser:true,useUnifiedTopology:true, useFindAndModify: false});


const itemsSchema={
    name:String
};

const Item=mongoose.model("Item",itemsSchema);

const item1=new Item({
    name:"Welcome to your todolist"
});
 
const item2=new Item({
    name:"Hit the + button to add a new item"
});
 
const item3=new Item({
    name:"<-- Hit this to delete an item"
});

const defaultItems=[item1,item2,item3];



app.get("/",function(req,res){

    var today=new Date();

    var options ={
        weekday: "long",
        day:"numeric",
        month:"long"
    };
    var day=today.toLocaleDateString("en-US",options);

    var currentDay=today.getDay();

    Item.find({},function(err,foundItems){
        if(foundItems.length===0){
            Item.insertMany(defaultItems,function(err){
                if(err) {
                    console.log(err);
                }
                else {
                    console.log("Successfully saved default items to DB.");
                }
              });
            res.redirect("/");
        }
        else{
        res.render("list",{listTitle:day,newListItem:foundItems});
        }
    });
      
});

app.post("/",function(req,res){
    
   const itemName= req.body.newItem;

   const item  =new Item({
    name:itemName
   }) ;
  item.save();
  res.redirect("/");
});


app.get("/work",function(req,res){

    res.render("list",{listTitle:"Work",newListItem:workitems});

});
app.post("/work",function(req,res){
    
    res.redirect("/work");

});

app.post("/delete",function(req,res){
    const Itemid=req.body.deleteItem;
    console.log(Itemid);
    Item.findByIdAndRemove(Itemid, function(err){

        if(!err) {
            console.log("Successfully deleted item");
            res.redirect("/");
        }
    });

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port,function(){
    console.log("Server started on port 3000");
});