
const url = "../static/data/Major_Crime_Indicators_Open_Data.geojson"


function init(){
  dropDown = d3.select("#selDataset");

  d3.json(url).then((data)=>{
    let years = [];
    
    let valueData = data.features;
    
    for(let i = 0; i < valueData.length; i++){
      if (!years.includes(valueData[i].properties["REPORT_YEAR"])){
        years.push(valueData[i].properties["REPORT_YEAR"]);
      }
    };

    for(let i = 0; i < years.length; i++){
      dropDown.append("option")
      .text(years[i])
      .property("value", years[i])
    };

    let sampleOne = years[0];
    buildPieChart(sampleOne);
    buildLineChart(sampleOne)
  })
}

function buildLineChart(sample){
  d3.json(url).then((data)=>{
    let valueData = data.features;
    let value = valueData.filter(result => result.properties["REPORT_YEAR"] == sample)
    let months = ["January","February","March","April","May","June","July", "August", "September", "October", "November", "December"]
    let totalYData = []
    for(let month of months){
      let filteredData = value.filter(result => result.properties["REPORT_MONTH"] == month)
      totalYData.push(filteredData.length)
    }
    let task = {}
    let majorCrimes = ["Assault", "Break and Enter", "Auto Theft", "Robbery", "Theft Over"];
    majorCrimes.forEach(category => {
      let filtered = value.filter(result => result.properties["MCI_CATEGORY"]==category);
      task[category] = []
      months.forEach(month => {
        let secondFilter = filtered.filter(results => results.properties["REPORT_MONTH"]==month);
        task[category].push(secondFilter.length)
      })
    });
    

    let trace = [{
      x: months,
      y: totalYData,
      mode: "scatter",
      name: "Total Major Crimes",
      line: {
        color: "rgb(128,0,0)",
        width: 1
      }
    },{
      x: months,
      y: task.Assault,
      mode: "scatter",
      name: "Assault",
      line: {
        color: "rgb(60,25,0)",
        width: 1
      }
    },{
      x: months,
      y: task["Break and Enter"],
      mode: "scatter",
      name: "Break and Enter",
      line: {
        color: "rgb(13,15,54)",
        width: 1
      }
    },{
      x: months,
      y: task["Auto Theft"],
      mode: "scatter",
      name: "Auto Theft",
      line: {
        color: "rgb(141,15,22)",
        width: 1
      }
    },{
      x: months,
      y: task["Robbery"],
      mode: "scatter",
      name: "Robbery",
      line: {
        color: "rgb(131,141,22)",
        width: 1
      }
    },{
      x: months,
      y: task["Theft Over"],
      mode: "scatter",
      name: "Theft Over",
      line: {
        color: "rgb(22,151,44)",
        width: 1
      }
    }]
    
    let layout= {
      title: "Major Crime by Month" + year,
      xaxis:{
        title: "Month"
      },
      yaxis: {
        title: "Number of crimes"
      },
      legend: {
        y: 0.5,
        traceorder:"reversed",
        font: {size:16},
        yref:"paper"
      }
    };

    Plotly.newPlot("line", trace, layout)
    
  })
}

function buildPieChart(sample){
  d3.json(url).then((data)=>{
    let valueData = data.features;
    let value = valueData.filter(result => result.properties["REPORT_YEAR"] == sample)

    let allValues = {};
    
    const months = ["January","February","March","April","May","June","July", "August", "September", "October", "November", "December"]
    let majorCrimes = ["Assault", "Break and Enter", "Auto Theft", "Robbery", "Theft Over"];

    majorCrimes.forEach(crime => {
      let crimeFilter = value.filter(result => result.properties["MCI_CATEGORY"]=crime);
      allValues[crime] = [];
      months.forEach(month =>{
        let monthFilter = crimeFilter.filter(result => result.properties["REPORT_MONTH"]==month);
        allValues[crime].push(monthFilter.length);
      }) 
    })

    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    function getRandomRGBString() {
      const red = getRandomNumber(0, 255);
      const green = getRandomNumber(0, 255);
      const blue = getRandomNumber(0, 255);
      return `rgb(${red},${green},${blue})`;
    }
    
    const rgbArray = [];
    
    for (let i = 0; i < 12; i++) {
      rgbArray.push(getRandomRGBString());
    }

   var trace = [{
    values: allValues["Assault"],
    labels: months,
    type: "pie",
    name: "Assault",
    title: "Assault",
    marker: {
      colors: rgbArray
    },
    domain: {
      row: 0,
      column: 0
    },
    hoverinfo: "label+percent+name",
    textinfo: "none"
   },{
    values: allValues["Break and Enter"],
    labels: months,
    type: "pie",
    name: "Break and Enter",
    title: "Break and Enter",
    marker: {
      colors: rgbArray
    },
    domain: {
      row: 0,
      column: 1
    },
    hoverinfo: "label+percent+name",
    textinfo: "none"
   }, {
    values: allValues["Auto Theft"],
    labels: months,
    type: "pie",
    name: "Auto Theft",
    title: "Auto Theft",
    marker: {
      colors: rgbArray
    },
    domain: {
      row: 1,
      column: 0
    },
    hoverinfo: "label+percent+name",
    textinfo: "none"
   }, {
    values: allValues["Robbery"],
    labels: months,
    type: "pie",
    name: "Robbery",
    title: "Robbery",
    marker: {
      colors: rgbArray
    },
    domain: {
      row: 1,
      column: 1
    },
    hoverinfo: "label+percent+name",
    textinfo: "none"
   }, {values: allValues["Theft Over"],
   labels: months,
   type: "pie",
   name: "Theft Over",
   title: "Theft Over",
   marker: {
     colors: rgbArray
   },
   domain: {
     row: 2,
     column: 0
   },
   hoverinfo: "label+percent+name",
   textinfo: "none"}]
   var layout = {
    title: "Major Crime by month" + year,
    height: 800,
    width: 800,
    grid: {rows: 3, columns: 2}
  };

    Plotly.newPlot('pie', trace, layout)
  })
}

function optionChanged(value){
  buildLineChart(value);
  buildPieChart(value)
}

init()