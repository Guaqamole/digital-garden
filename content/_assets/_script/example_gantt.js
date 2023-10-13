function my_function () {

   // return `Message from my script: ${msg}`;

    const Mermaid = `gantt
            title Gantt Chart
            dateFormat  YYYY-MM-DD
            axisFormat %b %e
            `;
    let ganttOutput = "파이썬 두문제 풀기     :done, 2023-10-11 , 2023-10-12\n"
    let today = new Date().toISOString().slice(0, 10); 
    ganttOutput += ". :active, " + today + ", " + today + "\n\n";

    let gantt = "```mermaid\n" + Mermaid + ganttOutput + "\n```";

    return `${gantt}`
}

module.exports = my_function;