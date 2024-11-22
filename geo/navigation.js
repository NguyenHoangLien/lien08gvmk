// 

function showObject(objectName) {
  // Set visibility to true for the target object
  ggbApp.setVisible(objectName, true);
  ggbApp.evalCommand(`ZoomIn(${objectName})`);
}

function hideObject(objectName) {
  // Set visibility to false for the target object
  ggbApp.setVisible(objectName, false);
}

function resetView() {
  // Reset view to initial configuration or fit all objects
  ggbApp.reset();
}

// Example function to toggle between objects
function toggleObject(objectName) {
  let isVisible = ggbApp.getVisible(objectName);
  ggbApp.setVisible(objectName, !isVisible);
}
