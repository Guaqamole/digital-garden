async function namkyu_notice () {
   const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object
   const text = await tp.system.prompt("Namkyu: How's your day?")
   new Notice(text, 5000)

   return `Something Sent to Notice. Check upper right.`
}

module.exports = namkyu_notice;