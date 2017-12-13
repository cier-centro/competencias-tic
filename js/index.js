window.onload = function(){

    console.log(getUrlParameter("tec"))
    var teacherData = {
      name: getUrlParameter("name")||"SIN NOMBRE",
      results: [getUrlParameter("tec"),
                getUrlParameter("ped"),
                getUrlParameter("com"),
                getUrlParameter("ges"),
                getUrlParameter("inv")]
    }
    var tableLabels = ["Competencia", "Nivel", "Valor numérico"];
    var competencesLabels = ["Tecnológica", "Pedagógica", "Comunicativa", "Gestión", "Investigativa"];
    var competenceLevelLabels = ["Innovador", "Integrador", "Explorador"];
    var graphicContainer = document.getElementById("radar-chart");
    var myRadarChart = createChart();
    putTeacherName();
    createTeacherTable();

    function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1];
        }
    }
    return 0;
    };
    function putTeacherName() {
        var teacherLabel = document.getElementById("teacher-name");
        teacherLabel.appendChild(document.createTextNode("Docente " + teacherData.name));
    }
    function createTeacherTable() {
        var resultsTable = document.getElementById('teacher-data');
        var teacherTable = getTeacherTable();
        resultsTable.appendChild(teacherTable);
    }
    function getTeacherTable() {
        var tableElement = getTableWithProperties('100%', 'table table-striped text-center');
        var tHeadElement = getTableHead();
        var tbodyElement = getTableBodyWithContent();
        tableElement.appendChild(tHeadElement);
        tableElement.appendChild(tbodyElement);
        return tableElement;
    }
    function getTableWithProperties(width, tableClass) {
        var table = document.createElement('table');
        table.style.width = width;
        table.setAttribute('class', tableClass);
        return table;
    }
    function getTableHead() {
        var tHead = document.createElement('thead');
        var trHead = getTableHeadRowsWithLabels();
        tHead.appendChild(trHead);
        return tHead;
    }
    function getTableHeadRowsWithLabels() {
        var trHead = document.createElement('tr');
        for (var colTable = 0; colTable < tableLabels.length; colTable++) {
            var th = document.createElement('th');
            th.setAttribute('class', "text-center");
            th.appendChild(document.createTextNode(tableLabels[colTable]));
            trHead.appendChild(th);
        }
        return trHead;
    }
    function getTableBodyWithContent() {
        var tbody = document.createElement('tbody');
        for (var rowTable = 0; rowTable < competencesLabels.length; rowTable++) {
            var tr = document.createElement('tr');
            for (var colTable = 0; colTable < tableLabels.length; colTable++) {
                    var td = document.createElement('td');
                    td.appendChild(document.createTextNode(getColumnLabel(colTable, rowTable)));
                    tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        return tbody;
    }
    function getColumnLabel(column, row) {
      var label;
      switch (column) {
          case 0:
              label = competencesLabels[row];
              break;
          case 1:
              label = getCompetenceLevel(teacherData.results[row]);
              break;
          case 2:
              label = teacherData.results[row];
              break;
          default:
              label = "No existe";
      }
      return label;
    }
    function getCompetenceLevel(score) {
        return ((score >= 0) && (score < 100/3))? competenceLevelLabels[0]: ((score >= 100/3) && (score < 200/3))? competenceLevelLabels[1] : ((score >= 200/3) && (score <= 100))? competenceLevelLabels[2] : "Fuera de Rango";
    }
    function createChart() {
      return new Chart(graphicContainer, {
        type: 'radar',
        data: {
          labels: competencesLabels,
          datasets: [
            {
              label: "Docente " + teacherData.name,
              fill: true,
              backgroundColor: "rgba(255,99,132,0.4)",
              borderColor: "rgba(255,99,132,1)",
              pointBorderColor: "#fff",
              pointBackgroundColor: "rgba(255,99,132,1)",
              data: teacherData.results
            },
            {
              label: "Innovador",
              fill: true,
              backgroundColor: "rgba(204, 204, 255, 0.5)",
              data: [33.33,33.33,33.33,33.33,33.33]
            },
            {
              label: "Integrador",
              fill: true,
              backgroundColor: "rgba(216, 216, 255, 0.5)",
              data: [66.66,66.66,66.66,66.66,66.66]
            },
            {
              label: "Explorador",
              fill: true,
              backgroundColor: "rgba(229, 229, 255, 0.5)",
              data: [100,100,100,100,100]
            }

          ]
        },
        options: {
          scale: {
              ticks: {
                  suggestedMin: 0,
                  suggestedMax: 100
              }
          },
          title: {
            display: true,
            text: 'Pentágono de Competencias TIC'
          }
        }
      });
    }

};
function printPage() {
    window.print();
}
