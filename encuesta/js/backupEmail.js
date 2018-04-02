

function onFormSubmit(e) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var email = e.namedValues['Correo Electrónico'][0];
  var name = e.namedValues['Nombre'][0];
  var message='funcioneeeee '

  var categoriesIndices = {
        "Tecnologica": [11, 17, 2, 22, 23, 27, 28, 29, 32, 34, 35, 44, 52, 60, 83, 87, 89, 9],
        "Pedagógica": [5, 10, 88, 82, 85, 72, 71, 62, 55, 51, 47, 38, 33, 26, 18, 15, 31, 12],
        "Comunicativa": [1, 14, 36, 49, 57, 65, 7, 86, 42, 73, 24, 77, 20, 39, 30, 4, 69, 81],
        "Gestión": [13, 8, 41, 67, 75, 79, 48, 90, 25, 46, 54, 58, 64, 78, 19, 3, 37, 61],
        "Investigativa": [59, 80, 6, 84, 21, 40, 45, 53, 63, 76, 68, 74, 16, 70, 56, 66, 43, 50],
    }

   var messages={
        "Tecnologica": ["Reconoce un amplio espectro de herramientas tecnológicas\n y algunas formas de integrarlas a la práctica educativa.","Utiliza diversas herramientas tecnológicas en los procesos\n educativos, de acuerdo a su rol, área de formación, nivel y\n contexto en el que se desempeña.","Aplica el conocimiento de una amplia variedad de\n tecnologías en el diseño de ambientes de aprendizaje\n innovadores y para plantear soluciones a problemas\n identificados en el contexto"],
        "Pedagógica": ["Identifica nuevas estrategias y metodologías mediadas por\n las TIC, como herramienta para su desempeño profesional.","Propone proyectos y estrategias de aprendizaje con el uso\n de TIC para potenciar el aprendizaje de los estudiantes.","Lidera experiencias significativas que involucran ambientes\n de aprendizaje diferenciados de acuerdo a las necesidades\n e intereses propios y de los estudiantes." ],
        "Comunicativa": ["Emplea diversos canales y lenguajes propios de las TIC\n para comunicarse con la comunidad educativa.", "Desarrolla estrategias de trabajo colaborativo en el contexto\n escolar a partir de su participación en redes y comunidades\n con el uso de las TIC.", "Participa en comunidades y publica sus producciones\n textuales en diversos espacios virtuales y a través de\n múltiples medios digitales, usando los lenguajes que\n posibilitan las TIC."],
        "Gestión": ["Organiza actividades propias de su quehacer profesional\n con el uso de las TIC.","Integra las TIC en procesos de dinamización de las\n gestiones directiva, académica, administrativa y comunitaria\n de su institución.","Propone y lidera acciones para optimizar procesos\n integrados de la gestión escolar." ],
        "Investigativa": ["Usa las TIC para hacer registro y seguimiento de lo que\n vive y observa en su práctica, su contexto y el de sus\n estudiantes.", "Lidera proyectos de investigación propia y con sus\n estudiantes.", "Construye estrategias educativas innovadoras que incluyen\n la generación colectiva de conocimientos."],
    }

  var answers = [];

  for (var key in e.namedValues) {
    var index = key.match(/\d+/g);
     if (index) {
            answers[index] = {
                "question": key,
                "value": e.namedValues[key][0]
            };
        }
  }


  var consolidated = {"name":name.replace(/\s+/g, "%20")}

  for (var key in categoriesIndices) {
    consolidated[key.toLowerCase().substring(0,3)] = categoriesIndices[key].map(function(key) {
      return parseInt(answers[key]["value"])
    }).reduce(function(total, value) {
    return total + value;});
  };

  var params = Object.keys(consolidated).reduce(function(q,key){
    return q + key + "=" + consolidated[key] + "&";
  },"?")


  //yes... you can concatenate all in the same lines, but it's more readable
  var table="<table border=\"1\"><tr><th>Compentencia</th><th>Categoria</th><th>Cualitativo</th><th>Cuantitativo</th></tr>";

  for (var key in categoriesIndices) {
    var temp=key.toLowerCase().substring(0,3);
    table=table+"<tr>";
    table=table+"<td>"+key+"</td>";
    if(parseInt(consolidated[temp])<=18){
      table=table+"<td>Explorador</td><td>"+messages[key][0]+"</td>";
    }else {
      if(parseInt(consolidated[temp])>30){
        table=table+"<td>Innovador</td><td>"+messages[key][1]+"</td>";
      } else{
        table=table+"<td>Integrador</td><td>"+messages[key][2]+"</td>";
      }
    }
    table=table+"<td>"+consolidated[temp]+"</td></tr>";
  }
  table=table+"</table>";


  var url = "https://cier-centro.github.io/competencias-tic/" + params;
  var giteiUrl = "http://www.gitei.edu.co/";
  var footerImageUrl = giteiUrl + "competencias-tic/encuesta/img/giunal.png";

  var graphUrl='https://chart.googleapis.com/chart?cht=r&chs=500x500&chd=t:72,72,72,72,72,72%7C60,60,60,60,60,60%7C36,36,36,36,36,36%7C'+(consolidated['tec']*2)+','+(consolidated['ped']*2)+','+(consolidated['com']*2)+','+(consolidated['ges']*2)+','+(consolidated['inv']*2)+','+(consolidated['tec']*2)+'&chco=97CBEF30,6F9ED380,0036FFA0,FF9900&chls=1.0,1.0,0.0%7C1.0,1.0,0.0%7C1.0,1.0,0.0%7C2.0,4.0,0.0&chxt=x&chxl=0:%7CTecnol%C3%B3gica%7CPedag%C3%B3gica%7CComunicativa%7CGesti%C3%B3n%7CInvestigativa&chm=B,97CBEF30,0,1.0,5.0%7CB,6F9ED380,1,1.0,5.0%7CB,0036FFA0,2,1.0,5.0%7CB,FF9900C0,3,1.0,5.0&chdlp=t&chdl=Innovador|Integrador|Explorador|'+name;
  Logger.log('La url esta bien!');
  //var graphBlob = UrlFetchApp.fetch(graphUrl).getBlob().setName("graphBlob");

  //var htmlEmail='<p>pruebaaaaaaa</p><iframe src=\"'+url+'\"></iframe> <p>fiiiiinnnn</p>'

  //https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf
  //MailApp.sendEmail(email, "fuuuu", message,{htmlbody:htmlEmail});
  MailApp.sendEmail(email, "Evaluación competencias TIC", message,{htmlBody: 'Hola \nEl resultado de tu prueba <br><br> <img src='+graphUrl+'><br><br>'+ table+'<br><br> tambien estan disponibles <a href=' + url + '>AQUI</a>'+'<br><br><a href="'+ giteiUrl + '"><img src=' + footerImageUrl + '></a>'});

}

 function loadJSFromHTMLFile() {
  eval(UrlFetchApp.fetch('https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js').getContentText());
 }
