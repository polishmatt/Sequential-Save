#target photoshop

var outputFolder = Folder.selectDialog("Select a folder to output to");
var descriptor = new ActionDescriptor();
descriptor.putString(app.stringIDToTypeID("outputFolder"), outputFolder.toString());
app.putCustomOptions("sequentialSave", descriptor, true);

