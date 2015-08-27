#target photoshop

if (documents.length) {
	var descriptor = app.getCustomOptions("sequentialSave");
	var settings = {
		"outputFolder": descriptor.getString(app.stringIDToTypeID("outputFolder"))
	}

	var folderPath = Folder(settings.outputFolder);
	var fileNameStart = activeDocument.name + '-';
	var fileNameEnd = '.jpg';

	var fileList = folderPath.getFiles(fileNameStart + '*' + fileNameEnd);
	folderPath += '/';

	var lastNumber = 0;
	for (var i = 0; i < fileList.length; i++) {
		var fileNumber = parseInt(fileList[i].toString().slice(folderPath.length + fileNameStart.length, -fileNameEnd.length));
		if (fileNumber > lastNumber) {
			lastNumber = fileNumber;
		}
	}

	var historyState = activeDocument.activeHistoryState;
	activeDocument.flatten();
	activeDocument.resizeImage(UnitValue(500, 'px'));

	var saveFile = File(folderPath + fileNameStart + (lastNumber + 1) + fileNameEnd);
	/*
	var options = new JPEGSaveOptions();
	options.embedColorProfile = true;
	options.formatOptions = FormatOptions.STANDARDBASELINE;
	options.matte = MatteType.NONE;
	options.quality = 1;
	activeDocument.saveAs(saveFile, options, true, Extension.LOWERCASE);
	*/

	var options = new ExportOptionsSaveForWeb();
	options.quality = 70;
	options.format = SaveDocumentType.JPEG;
	options.optimized = true;
	activeDocument.exportDocument(saveFile, ExportType.SAVEFORWEB, options);

	activeDocument.activeHistoryState = historyState;
}
