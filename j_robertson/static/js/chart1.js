const ct3 = document.getElementById('line1Canvas').getContext('2d')

const labels = ["January","February","March","April","May","June","July", "August", "September", "October", "November", "December"]

const colors = {
    'Assault': {
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)'
    },
    'Break and Enter': {
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)'
    },
    'Robbery': {
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)'
    },
    'Auto Theft': {
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)'
    },
    'Theft Over': {
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)'
    }
};


const myChart = new Chart(ct3, {
    data: {
        datasets: [{type:"line",
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,}],
        labels: labels
    }
});



document.getElementById('year').addEventListener('change', function(event) {
    const year = event.target.value;
    console.log("Selected year:", year); 
    fetch(`/api/monthly_crime_rate/${year}`)
        .then(response => response.json())
        .then(data => {
            function sorting(a, b) {
                if (a.year !== b.year) {
                  return a.mci_category - b.mci_category;
                } else {
                  const monthToNumber = {
                    "January": 1,
                    "February": 2,
                    "March": 3,
                    "April": 4,
                    "May": 5,
                    "June": 6,
                    "July": 7,
                    "August": 8,
                    "September": 9,
                    "October": 10,
                    "November": 11,
                    "December": 12
                  };
                  return monthToNumber[a.month] - monthToNumber[b.month];
                };
            };
            data.sort(sorting);
            console.log(data)
            let months = ["January","February","March","April","May","June","July", "August", "September", "October", "November", "December"]
            let crimes = {}
            const offenseTypes = [...new Set(data.map(item => item.mci_category))];

            offenseTypes.forEach(crime => {
                crimes[crime]= [];
                let filter1= data.filter(result => result.mci_category == crime);
                months.forEach(month => {
                    let filter2 = filter1.filter(result => result.month == month);
                    crimes[crime].push(filter2.length)
                })
            } )
            
            let info = []
            console.log(crimes)
            const newDataSets = []
            
            for(let i = 0; i < crimes.length; i++){
                info.push(crimes[i])
                console.log(info)
                let charting = {
                    type: 'line',
                    label: offenseTypes[i],
                    data: info[i],
                    backgroundColor: colors[offenseTypes[i]].backgroundColor,
                    borderColor: colors[offenseTypes[i]].borderColor,
                    borderWidth: 1,
                    
                };
                    newDataSets.push(charting)
        };
            console.log(newDataSets[0])
        myChart.data.datasets.push(newDataSets[0])
        myChart.update()
    })
                                 

});
            
        // .catch(error => {
        //     console.error("Error fetching data: ", error )
        // })


  