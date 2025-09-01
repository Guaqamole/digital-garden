dv = app.plugins.plugins.dataview.api
tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object

function textParser(taskText, noteCreationDate, parentEndDate) {
    const emojis = ["📅", "⏳", "🛫", "➕", "✅", "⏫", "🔼", "🔽"];

    // Helper function to find the index of the next emoji
	function nextEmojiIndex(startIndex) {
	    const indices = emojis.map(emoji => {
	        const index = taskText.indexOf(emoji, startIndex + 1);
	        // Exclude emojis that are before the current position
	        return index > startIndex ? index : taskText.length;
	    });
	    return Math.min(...indices);
	}

	let addText
	let scheduledText
	let startText
    // Helper function to extract the date after a given emoji
	    function extractDate(emoji) {
	    const start = taskText.indexOf(emoji);
	    if (start < 0) {
	        return "";
	    }
	    let date
	    
	    if (match = taskText.slice(start + 1).match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))(\s|$)/)){
		    return match[0]
	    }
	    // Look for relative ranges. Expects a number followed by text where the text is passed to moment and can be one of the keys or shorthand mentioned here https://momentjs.com/docs/#/manipulating/add/
	    if (match = taskText.slice(start +1).match(/([0-9]+) ?([a-zA-Z]+)(\s|$)/)) {
		    return moment(startText||scheduledText||parentEndDate||addText).add(match[1],match[2]).format('YYYY-MM-DD')
	    }
	    return "";
	}

    const DueText = extractDate("📅");
    scheduledText = extractDate("⏳");
    startText = extractDate("🛫");
    addText = extractDate("➕");
    const doneText = extractDate("✅");

    let h = taskText.indexOf("⏫");
    let m = taskText.indexOf("🔼");
    let l = taskText.indexOf("🔽");
    let PriorityText="";
    if(h>=0){
        PriorityText="High";
    }
    if(m>=0){
        PriorityText="Medium";
    }
    if(l>=0){
        PriorityText="Low";
    }
    
    const emojisIndex = emojis.map(emoji => taskText.indexOf(emoji)).filter(index => index >= 0);
    let words;
    if (emojisIndex.length > 0) {
        words = taskText.slice(0, Math.min(...emojisIndex)).split(" ");
    } else {
        words = taskText.split(" ");
    }
    
    // Remove the #task tag
    words = words.filter((word) => (word) !== "#task");
    // Put subsequent tags in []
    let newWords = words.map(
        (word) => word.startsWith("#") ? `[${word.slice(1)}]` : word);
    // Join the words back together
    let nameText = newWords.join(" ");

    return {
        add: addText,
        done: doneText,
        due: DueText,
        name: nameText,
        priority: PriorityText,
        scheduled: scheduledText,
        start: startText
    };
}

function loopGantt (pageArray, showDone){
    let queryGlobal = "";
    let today = new Date().toISOString().slice(0, 10);

	// Loop through the pages looking for tasks
    let i;
    for (i = 0; i < pageArray.length; i+=1) {
        let taskQuery = "";
        if (!pageArray[i].file.tasks || pageArray[i].file.tasks.length === 0) { 
            continue;
        }
		// Add a section for the page if tasks are found
        queryGlobal += "section "+pageArray[i].file.name+"\n\n"
        let taskArray = pageArray[i].file.tasks;
        let taskObjs = [];
        //let noteCreationDate = pageArray[i].created.includes(" ") ? pageArray[i].created.split(" ")[0] : pageArray[i].created;
        let noteCreationDate = moment(pageArray[i].file.ctime).format('YYYY-MM-DD')
        var parentEndDate = {};
        // Loop through the tasks
        let j;
        for (j = 0; j < taskArray.length; j+=1){
            taskObjs[j] = textParser(taskArray[j].text, noteCreationDate, parentEndDate[taskArray[j].parent]);
            let theTask = taskObjs[j];
            if (theTask.name === "") continue; // Skip if task name is empty
            // Skip done tasks if showDone is false
            if (!showDone && theTask.done) continue;
            let startDate = theTask.start || theTask.scheduled || theTask.add || parentEndDate[taskArray[j].parent] || noteCreationDate || today;
            let endDate = theTask.done || theTask.due || theTask.scheduled;
            if (!endDate) {
                if (startDate >= today) {  // If start date is in the future
                    let weekLater = new Date(startDate);
                    weekLater.setDate(weekLater.getDate() + 7);
                    endDate = weekLater.toISOString().slice(0, 10);
                } else {  // If start date is in the past
                    endDate = today;
                }
            }
            parentEndDate[taskArray[j].line]=endDate;
            if (theTask.done){
                taskQuery += theTask.name + `    :done, ` + startDate + `, ` + endDate + `\n\n`;
            } else if (theTask.due){
                if (theTask.due < today){
                    taskQuery += theTask.name  + `    :crit, ` + startDate + `, ` + endDate + `\n\n`;
                } else {
                    taskQuery += theTask.name  + `    :active, ` + startDate + `, ` + endDate + `\n\n`;
                }
            } else if (theTask.scheduled){
                if (startDate <= today){
                    taskQuery += theTask.name + `    :active, ` + startDate + `, ` + endDate + `\n\n`;
                } else {
                    taskQuery += theTask.name + `    :inactive, ` + startDate + `, ` + endDate + `\n\n`;
                }
            } else {
                taskQuery += theTask.name  + `    :active, ` + startDate + `, ` + endDate + `\n\n`;
            }
        }
        queryGlobal += taskQuery;
    }
    return queryGlobal;
}

async function create_gantt() {

	const Mermaid = `gantt
        title Gantt Chart
        dateFormat  YYYY-MM-DD
        axisFormat %b %e
        `;

    const page = await tp.system.prompt("트래킹할 Task들의 폴더 경로를 적어주세요 (예시: Daily Notes/2023-10 )")

	let pages = dv.pages('"' + page + '"');

	let filteredPages = pages;
	let showDone = true;
	let ganttOutput = loopGantt(filteredPages, showDone);

	//add dummy task so that today's date is always shown:
	let today = new Date().toISOString().slice(0, 10); 
	ganttOutput += ". :active, " + today + ", " + today + "\n\n";

	return "```mermaid\n" + Mermaid + ganttOutput + "\n```"
}

module.exports = create_gantt;