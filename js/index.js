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
    var tableLabels = ["Competencia", "Nivel", "Descriptor de la competencia", "Valor numérico"];
    var competencesLabels = ["Tecnológica", "Pedagógica", "Comunicativa", "Gestión", "Investigativa"];
    var competenceLevelLabels = ["Innovador", "Integrador", "Explorador"];
	var messages={
        "Tecnológica": ["Reconoce un amplio espectro de herramientas tecnológicas y algunas formas de integrarlas a la práctica educativa.", "Aplica el conocimiento de una amplia variedad de tecnologías en el diseño de ambientes de aprendizaje innovadores y para plantear soluciones a problemas identificados en el contexto.", "Utiliza diversas herramientas tecnológicas en los procesos educativos, de acuerdo a su rol, área de formación, nivel y contexto en el que se desempeña."],
        "Pedagógica": ["Identifica nuevas estrategias y metodologías mediadas por las TIC, como herramienta para desempeño profesional.", "Lidera experiencias significativas que involucran ambientes de aprendizaje diferenciados de acuerdo a las necesidades e intereses propias y de los estudiantes.", "Propone proyectos y estrategias de aprendizaje con el uso de TIC para potenciar el aprendizaje de los estudiantes." ],
        "Comunicativa": ["Emplea diversos canales y lenguajes propios de las TIC para comunicarse con la comunidad educativa.", "Participa en comunidades y publica sus producciones textuales en diversos espacios virtuales y a través de múltiples medios digitales, usando los lenguajes que posibilitan las TIC.", "Desarrolla estrategias de trabajo colaborativo en el contexto escolar a partir de su participación en redes y comunidades con el uso de las TIC."],
        "Gestión": ["Organiza actividades propias de su quehacer profesional con el uso de las TIC.", "Propone y lidera acciones para optimizar procesos integrados de la gestión escolar.", "Integra las TIC en procesos de dinamización de las gestiones directiva, académica, administrativa y comunitaria de su institución." ],
        "Investigativa": ["Usa las TIC para hacer registro y seguimiento de lo que vive y observa en su práctica, su contexto y el de sus estudiantes.", "Construye estrategias educativas innovadoras que incluyen la generación colectiva de conocimientos.", "Lidera proyectos de investigación propia y con sus estudiantes."],
    }
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
			  label=getDescriptor(competencesLabels[row],teacherData.results[row]);
			  break;
		  case 3:
              label = teacherData.results[row];
              break;
          default:
              label = "No existe";
      }
      return label;
    }
	
	function getDescriptor(key,score){
		if((score >= 0) && (score <= 18)){
			return messages[key][2];
		}
		if((score > 18 ) && (score <= 30)){
			return messages[key][1];
		}
		if((score >= 30) && (score <= 36)){
			return messages[key][0];
		}
		return "Fuera de Rango";
	}
	
    function getCompetenceLevel(score) {
        return ((score >= 0) && (score <= 18))? competenceLevelLabels[2]: ((score > 18 ) && (score <= 30))? competenceLevelLabels[1] : ((score >= 30) && (score <= 36))? competenceLevelLabels[0] : "Fuera de Rango";
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
              label: "Explorador",
              fill: true,
              backgroundColor: "rgba(204, 204, 255, 0.5)",
              data: [18,18,18,18,18]
            },
            {
              label: "Integrador",
              fill: true,
              backgroundColor: "rgba(216, 216, 255, 0.5)",
              data: [30,30,30,30,30]
            },
            {
              label: "Innovador",
              fill: true,
              backgroundColor: "rgba(229, 229, 255, 0.5)",
              data: [36,36,36,36,36]
            }

          ]
        },
        options: {
          scale: {
              ticks: {
                  min: 0,
                  max: 36
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
