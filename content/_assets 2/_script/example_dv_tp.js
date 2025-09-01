function someFunction() {

  dv = app.plugins.plugins.dataview.api
  tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object

  let cur = dv.pages('"Daily Notes/2023-10"')
  return `${cur}`
}


module.exports = someFunction