var start=d3.select("#count")
var inp=d3.select("input")

var words=[""]
var count=0;
start.on('click',()=>{
    count++;
    var check=[];
    d3.event.preventDefault();
    console.log(words[0]);
    var str=inp.property("value")+words[0];
    //console.log(words)
    words.push(inp.property("value"))
    var arr=str.split("").filter(val=>val!==" ");
    var arrf=arr.reduce(function(accumulator,nextValue){
        if(arr.includes(nextValue)){
            if(nextValue in accumulator){
                accumulator[nextValue]++;
            }else{
                accumulator[nextValue]=1;
                check.push(nextValue)
            } 
        }
        return accumulator;
    },{})
    console.log(words)
    d3.select("#letters")
        .selectAll("div")
        .remove()
    d3.select("#letters")
        .select("p")
        .text("Analysis of phrase number "+count)

    if(count>1){
        d3.select("#comp").text("Number of new letters="+finddiff(check))
    }    
    var listItems=d3.select("#letters")
        .selectAll("div")
        .data(check)
        
    listItems.enter()
        .append("div")
        .text((d)=> d)
        .classed("inner",true)
        d3.selectAll(".inner")
            .style("background-color","yellow")
            .style("display","inline-block")
            .style("width","50px")
            .style("height",function(d){
                //console.log(10*arrf[d]+"px")
                return 50+(10*arrf[d])+"px"
            })
    inp.property("value","")
    words.shift()
})

function finddiff(arr2){
    var arr1=words[0].split("")
    var same=0;
    for(var x=0;x<arr2.length;x++){
        if(arr1.includes(arr2[x])){
            same++;
        }
    }
    return arr2.length-same;
}