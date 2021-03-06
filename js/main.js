
        d3.json("https://raw.githubusercontent.com/Nekogulu/SX-W/master/data/streetsall.json", function(error, json) {
            if (error) throw error;
        d3.json("https://raw.githubusercontent.com/Nekogulu/SX-W/master/data/deathsage.json",function(error, deaths) {
              if (error) throw error;  

            var width = 700,
                height = 850;

//放大缩小（不可用）     
/*
 function zoomed() {
      var t = d3.event.translate;
      s = d3.event.scale; 
      var h = 0;

      t[0] = Math.min(
        (width/height)  * (s - 1), 
        Math.max( width * (1 - s), t[0] )
      );

      t[1] = Math.min(
        h * (s - 1) + h * s, 
        Math.max(height  * (1 - s) - h * s, t[1])
      );

      zoom.translate(t);
      if(s === 1 && mouseClicked) {
        rotateMap(d3.mouse(this)[0])
        return;
      }

      g.attr("transform", "translate(" + t + ")scale(" + s + ")");

      //adjust the stroke width based on zoom level
      d3.selectAll(".boundary")
        .style("stroke-width", 1 / s);
      
      //toggle state/USA visability
      if(s > 1.5) {
        states
          .classed('hidden', false);
        usa
          .classed('hidden', true);
        canada
          .classed('hidden', true);
      } else {
      states
        .classed('hidden', true);
      usa
        .classed('hidden', false);
      canada
        .classed('hidden', false);
    }
  }
                var zoom = d3.behavior.zoom()
                            .scaleExtent([1, 20])
                            .on("zoom", zoomed);
*/

            var svg2 = d3.select("body").append("svg").attr("width", 100).attr("height", height);
            var svg = d3.select("body").append("svg").attr("width", width).attr("height", height);
                
           
            var deathdays = [
                {"label": "19-Aug","number": 1},{"label": "20-Aug","number": 1},{"label": "21-Aug","number": 1},{"label": "22-Aug","number": 0},
                {"label": "23-Aug","number": 1},{"label": "24-Aug","number": 1},{"label": "25-Aug","number": 0},{"label": "26-Aug","number": 1},
                {"label": "27-Aug","number": 1},{"label": "28-Aug","number": 1},{"label": "29-Aug","number": 1},{"label": "30-Aug","number": 8},
                {"label": "31-Aug","number": 56},{"label": "1-Sep","number": 143},{"label": "2-Sep","number": 116},{"label": "3-Sep","number": 54},
                {"label": "4-Sep","number": 46},{"label": "5-Sep","number": 36},{"label": "6-Sep","number": 20},{"label": "7-Sep","number": 28},
                {"label": "8-Sep","number": 12},{"label": "9-Sep","number": 11},{"label": "10-Sep","number": 5},{"label": "11-Sep","number": 5},
                {"label": "12-Sep","number": 1},{"label": "13-Sep","number": 3},{"label": "14-Sep","number": 0},{"label": "15-Sep","number": 1},
                {"label": "16-Sep","number": 4},{"label": "17-Sep","number": 2},{"label": "18-Sep","number": 3},{"label": "19-Sep","number": 0},
                {"label": "20-Sep","number": 0},{"label": "21-Sep","number": 2},{"label": "22-Sep","number": 1},{"label": "23-Sep","number": 1},
                {"label": "24-Sep","number": 1},{"label": "25-Sep","number": 1},{"label": "26-Sep","number": 1},{"label": "27-Sep","number": 1},
                {"label": "28-Sep","number": 0},{"label": "29-Sep","number": 0}
            ];


                // create a first guess for the projection
                var center = d3.geo.centroid(json)
                var scale  = 80;
                var offset = [width/2, height/2];
                var projection = d3.geo.mercator().scale(scale).center(center)
                    .translate(offset);

                // create the path
                var path = d3.geo.path().projection(projection);

                // using the path determine the bounds of the current map and use 
                // these to determine better values for the scale and translation
                var bounds  = path.bounds(json);
                var hscale  = scale*width  / (bounds[1][0] - bounds[0][0]) -180 ;
                var vscale  = scale*height / (bounds[1][1] - bounds[0][1]) ;
                var scale   = (hscale < vscale) ? hscale : vscale;
                var offset  = [width - (bounds[0][0] + bounds[1][0])/2, height - (bounds[0][1] + bounds[1][1]+200)/2];
                center1 = center;
                scale1 = scale;
                offset1 =  offset;

                // new projection
                projection = d3.geo.mercator().center(center)
                    .scale(scale).translate(offset);
                path = path.projection(projection);   

                var points = json.features.filter(function(d){return d.geometry.type == "Point";});
                var lines = json.features.filter(function(d){return d.geometry.type == "LineString";});
                var workHouse = json.features.filter(function(d){return d.properties.name == "WorkHouse";});
                var brewery = json.features.filter(function(d){return d.properties.name == "Brewery";});

                var pointSvg = svg.append("g").attr("class", "point");
                var lineSvg = svg.append("g").attr("class", "lineString");
                var workHosueSvg = svg.append("g").attr("class", "workHouse");
                var brewerySvg = svg.append("g").attr("class", "brewery");
                var deathSvg = svg.append("g").attr("class", "deaths");
                var deathdaySvg = svg2.attr("class", "deathdays");  

             

              lineSvg.selectAll("path")
                    .data(lines)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    .style("stroke-width", "2")
                    .style("stroke", "black");
//显示街道名字                            
/*                                            
              lineSvg.selectAll("text")
                    .data(json.features)
                    .enter()
                    .append("svg:text")
                    .text(function(d){
                        return d.properties.name;
                    })
                    .attr("x", function(d){
                        return path.centroid(d)[0];
                    })
                    .attr("y", function(d){
                        return  path.centroid(d)[1];
                    })
                    .attr("text-anchor","middle")
                    .attr('font-size','6pt');
*/

            pointSvg.selectAll("rect")
                    .data(points)
                    .enter()
                    .append("rect")
                    .attr("width", 10)
                    .attr("height", 10)
                    .attr("transform", function(d) {
                             /*whatever transformation that needs to be done*/
                            return "translate(" + projection(d.geometry.coordinates) + ")";
                        })
                    .style("opacity", "1.0")
                    .style("fill", "black")
                    .style("stroke-width", "1")
                    .style("stroke", "black")
                    .classed("pin", true);

              workHosueSvg.selectAll("path")
                    .data(workHouse)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    .style("stroke-width", "1")
                    .style("stroke", "black")
                    .style("fill", "yellow");
//显示名字
/*
              workHosueSvg.selectAll("text")
                    .data(workHouse)
                    .enter()
                    .append("svg:text")
                    .text(function(d){
                        return d.properties.name;
                    })
                    .attr("x", function(d){
                        return path.centroid(d)[0];
                    })
                    .attr("y", function(d){
                        return  path.centroid(d)[1];
                    })
                    .attr("text-anchor","middle")
                    .attr('font-size','6pt');
*/
              brewerySvg.selectAll("path")
                    .data(brewery)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    .style("stroke-width", "1")
                    .style("stroke", "black")
                    .style("fill", "pink");
//显示名字
/*
              brewerySvg.selectAll("text")
                    .data(brewery)
                    .enter()
                    .append("svg:text")
                    .text(function(d){
                        return d.properties.name;
                    })
                    .attr("x", function(d){
                        return path.centroid(d)[0];
                    })
                    .attr("y", function(d){
                        return  path.centroid(d)[1];
                    })
                    .attr("text-anchor","middle")
                    .attr('font-size','6pt');
           
             var deathSvgEnter = deathSvg.enter();
                    deathSvgEnter.append("circle")
                    .attr("r", 2)
                    .attr("transform", function(d) {
                             //whatever transformation that needs to be done
                            return "translate(" + projection(d.geometry.coordinates) + ")";
                        })
                    .style("fill", "red")
                    .style("stroke-width", "1")
                    .style("stroke", "black")
                    .classed("pin", true);   
               deathSvg.exit().remove(); 
*/
             deathdaySvg.selectAll("foreignObject")
                        .data(deathdays)
                        .enter()
                        .append("foreignObject")
                        .attr("width", width)
                        .attr("height",height)
                        .attr("x", 0)
                        .attr("y", function(d,i){return (i)*20;})
                        .append("xhtml:body")
                        .html(function(d){ return "<form><input type=checkbox class=deathdaysFilter id="+d.label+" />"+d.label+"</form>"});
            d3.selectAll(".deathdaysFilter").on("change", updateDeaths);
            updateDeaths();

            function updateDeaths(){                    
                    var choices = [];
                    d3.selectAll(".deathdaysFilter").each(function(d){
                        cb = this; 
                        if(cb.checked){
                            choices.push(cb.id);
                        }
                    });
      
                    if(choices.length > 0){
                        newData = deaths.features.filter(function(d){return choices.includes(d.properties.deathday);})
                            
                       
                        
                    } else {
                        newData = deaths.features;     
                    } 
                    
                   
                    newRows = deathSvg.selectAll("circle")
                                    .data(newData,function(d){return d.id;});
                    newRows.enter()
                            .append("circle")
                            .attr("r", 2)
                            .attr("transform", function(d) {
                                //whatever transformation that needs to be done
                                return "translate(" + projection(d.geometry.coordinates) + ")";
                            })
                            .style("fill", "red")
                            .style("stroke-width", "1")
                            .style("stroke", "black")
                            .classed("pin", true);    
                    
                    newRows.exit().remove();   

               
            }   

    }); 
  });