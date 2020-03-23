d3.select("#reset")
    .on("click",()=>{
        d3.selectAll(".inner")
            .remove();
        d3.select("#phrase")
            .text("");
        d3.select("#count")
            .text("")
    })
d3.select("form")
    .on("submit",()=>{
        d3.event.preventDefault();
        var inp=d3.select("input")
        var text=inp.property("value")
        var listItems=d3.select("#letters")
        .selectAll("div")
        .data(getFrequencies(text),(d)=>{
            return d.character;
        })
        
    listItems.classed("new",false)
        .exit()
        .remove();
    
    listItems.enter()
        .append("div")
        .classed("inner",true)
        .classed("new",true)
        .text((d)=> d.character)
        .merge(listItems)
            .style("background-color","yellow")
            .style("display","inline-block")
            .style("line-height","20px")
            .style("margin-right","5px")
            .style("width","20px")
            .style("height",function(d){
                //console.log(10*arrf[d]+"px")
                return d.count*20 + "px";
            })
        d3.select("#phrase")
            .text("Analysis of: "+text)
        d3.select("#count")
            .text("new characters: "+letters.enter().nodes().length+")")
        inp.property("value","")
    })


function getFrequencies(str){
    var sorted=str.split("").sort();
    var data=[];
    for(var i=0;i<sorted.length;i++){
        var last=data[data.length-1];
        if(last && last.character==sorted[i]){
            last.count++;
        }
        else{
            data.push({character:sorted[i],count: 1})
        }
    }
    return data;
}