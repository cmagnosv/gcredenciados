function createDataset(fields, constraints, sortFields) {
	var rm_ds_chave 	= DatasetFactory.getDataset("rm_ds_chave", null, null, null);
	var chave			= rm_ds_chave.getValue(0, "CHAVE");
	var codColigada     = rm_ds_chave.getValue(0, "CODCOLIGADA");
	
	// Se existir alguma constraint,  pega o valor
	var IDCNT;
    if (constraints!=null && constraints.length) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "IDCNT") { 
            	IDCNT = constraints[i].initialValue;
            }
        }
    }
    

	// Parametros de acessoa ao Servico.	
	var serviceName 	= "wsECMhml";						
	var servicePackage	= "org.tempuri.WsECM";

	//Parametros passados para o Metodo da classe.
//	var codColigada		= 1;			
	var codConsulta		= "FLUIG043";
	var codSistema		= "T";
	var filter 			= "<params>" +
								"<IDCNT>"+IDCNT+"</IDCNT>" + //a chave deve ser no pad
						"</params>";
	var schema			= false;


	//Colunas do DataSet.
	var COLUNAS = new Array("VALORPAGO","IDCNT");
	var dataset = DatasetBuilder.newDataset();
	for (var i=0; i < COLUNAS.length; i++ ) {
		dataset.addColumn(COLUNAS[i]);
	}

	//Instanciando o servico e utilizando os metodos por autenticacao basica.
	var servico = ServiceManager.getService(serviceName);
    var serviceHelper = servico.getBean();
    var instancia = servico.instantiate(servicePackage);
    var ws = instancia.getWsECMSoap();
	var result = ws.consultaSentencaSQL(codColigada, codConsulta, codSistema, filter, schema, chave);
	var jsonObj = getTagsByName(result, 'Row');
	
	//Linhas do DataSet.
	if(jsonObj.length > 0){
		for(var i=0;i<jsonObj.length;i++){
			var row = [];
			for(var j=0;j<COLUNAS.length;j++){
				var field = COLUNAS[j].toUpperCase(); 
				var tags = getTagsByName(jsonObj[i],field); 
				var regex = new RegExp('(<'+field+'>|<\/'+field+'>)','g');
				row.push(tags[0].replace(regex,''));
			}
			dataset.addRow(row);
		}
	}
	return dataset;	
}


function getTagsByName(stringXML, tagName){
	var linarize = stringXML.replace("\n","").replace("\r","");
	var regex = new RegExp('<'+tagName+'>(.*?)<\/'+tagName+'>','g');
	var tags = linarize.match(regex);
	if(tags == null){
		log.warn('@getTagsByName : Tag '+tagName+' nao foi encontrada no retorno da consulta.');
		return [''];
	}
	else return tags;
}